#!/usr/bin/env python3
"""Build the SNR news section.

Every story is its own page at the site root: news-<slug>.html. Each page carries
its details in a <script type="application/json" id="art-meta"> block. This script
reads those pages and rebuilds:
  * news.html        - the News index (featured story + card grid)
  * index.html       - the three home-page news cards
  * each story page  - its "More news" strip

Usage (from the repo root):
  python3 scripts/build_news.py            # rebuild index, home cards, More news
  python3 scripts/build_news.py --migrate  # one-time: split the old single-page news.html into story pages

New story: copy any news-*.html page, change the art-meta JSON, headline, image and
body, then run this script.
"""
import glob, html, json, os, re, sys
from datetime import datetime

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = 'https://snrleague.com/'
os.chdir(ROOT)

def strip(t):
    return html.unescape(re.sub(r'<[^>]+>', '', t)).strip()

def excerpt(t, n=170):
    t = re.sub(r'\s+', ' ', strip(t))
    return t if len(t) <= n else t[:n].rsplit(' ', 1)[0].rstrip(',;:—-') + '…'

def slugify(title, words=9):
    w = re.sub(r'[^a-z0-9 ]+', ' ', strip(title).lower().replace('&', ' and ')).split()
    return '-'.join(w[:words])

def read_minutes(body_html):
    return max(1, round(len(strip(body_html).split()) / 200))

def image_fit(path):
    try:
        from PIL import Image
        w, h = Image.open(path).size
        return 'cover' if 1.6 <= w / h <= 1.95 else 'contain'
    except Exception:
        return 'cover'

# ---------------------------------------------------------------- page template
HEAD = '''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title_txt} — Saturday Night Racing League</title>
  <meta name="description" content="{desc}">
  <link rel="canonical" href="{url}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Saturday Night Racing League">
  <meta property="og:title" content="{title_txt}">
  <meta property="og:description" content="{desc}">
  <meta property="og:image" content="{img_abs}">
  <meta property="og:url" content="{url}">
  <meta property="article:published_time" content="{date_iso}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{title_txt}">
  <meta name="twitter:description" content="{desc}">
  <meta name="twitter:image" content="{img_abs}">
  <link rel="stylesheet" href="style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Saira:ital,wght@0,400;0,500;0,600;0,700;0,800;1,700;1,800;1,900&family=Saira+Condensed:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="icon" href="favicon.svg" type="image/svg+xml">
  <link rel="icon" href="favicon.ico" sizes="any">
  <link rel="apple-touch-icon" href="apple-touch-icon.png">
  <meta name="theme-color" content="#0b0f14">
</head>
<body class="article-page">
<div id="site-nav"></div>
<script src="site-chrome.js"></script>
'''

PAGE = HEAD + '''
<main class="standalone-page art-page">
  <article class="art">
    <a class="art-back" href="news.html">&larr; All news</a>
    <div class="art-kicker">{label}</div>
    <h1 class="art-title">{title}</h1>
    <div class="art-byline"><time datetime="{date_iso}">{date}</time> &middot; SNR League &middot; {mins} min read</div>
    <figure class="art-hero{fit_cls}"><img src="{image}" alt="{image_alt}"></figure>
    <div class="art-body">
{body}
    </div>
    <div class="art-actions">
{buttons}      <button type="button" class="btn btn-outline art-share" data-title="{title_attr}">Share</button>
    </div>
  </article>
  <!-- MORE-NEWS:START --><!-- MORE-NEWS:END -->
</main>

<script type="application/json" id="art-meta">
{meta}
</script>
<div id="site-footer"></div>
<script src="site-chrome.js"></script>
<script>
document.documentElement.setAttribute('data-theme', 'dark');
(function () {{
  var hb = document.getElementById('hamburger'), nl = document.getElementById('navLinks');
  if (hb && nl) hb.addEventListener('click', function () {{ hb.classList.toggle('open'); nl.classList.toggle('open'); }});
  // Share: the phone's share sheet where available, otherwise copy the link
  var b = document.querySelector('.art-share');
  if (b) b.addEventListener('click', function () {{
    var url = location.href.split('#')[0], t = b.getAttribute('data-title');
    if (navigator.share) {{ navigator.share({{ title: t, url: url }}).catch(function () {{}}); return; }}
    var done = function () {{ var o = b.textContent; b.textContent = 'Link copied'; setTimeout(function () {{ b.textContent = o; }}, 1800); }};
    if (navigator.clipboard) navigator.clipboard.writeText(url).then(done, function () {{ prompt('Copy this link:', url); }});
    else prompt('Copy this link:', url);
  }});
}})();
</script>
</body>
</html>
'''

def meta_of(path):
    m = re.search(r'<script type="application/json" id="art-meta">\s*(\{.*?\})\s*</script>', open(path, encoding='utf-8').read(), re.S)
    return json.loads(m.group(1)) if m else None

# ---------------------------------------------------------------- one-time split
def migrate():
    src = open('news.html', encoding='utf-8').read()
    arts = re.findall(r'<article class="news-card" id="([^"]+)">(.*?)</article>', src, re.S)
    made = []
    for old_id, b in arts:
        title = re.search(r'class="news-headline">(.*?)</h3>', b, re.S).group(1).strip()
        label = re.search(r'news-race-badge">(.*?)</span>', b, re.S).group(1).strip()
        date = re.search(r'news-date">(.*?)</span>', b, re.S).group(1).strip()
        img = re.search(r'<img src="([^"]+)" alt="([^"]*)"', b)
        body = re.search(r'<div class="news-body">(.*)</div>\s*$', b.strip(), re.S).group(1)
        # pull the broadcast/results buttons out of the body; they go in the action row
        buttons = ''
        bc = re.search(r'\s*<div class="news-broadcast">(.*?)</div>', body, re.S)
        if bc:
            body = body.replace(bc.group(0), '')
            for a in re.findall(r'<a [^>]*>.*?</a>', bc.group(1), re.S):
                a = re.sub(r'class="btn (btn-primary|btn-outline) broadcast-btn"', r'class="btn \1"', a)
                a = a.replace('Watch the Full Race Broadcast Here!', 'Watch the race broadcast').replace('View Full Race Results Here', 'Full race results')
                buttons += '      ' + a.strip() + '\n'
        body = '\n'.join('      ' + ln.strip() for ln in body.strip().splitlines() if ln.strip())
        slug = slugify(title)
        d = datetime.strptime(strip(date), '%B %d, %Y')
        first_p = re.search(r'<p>(.*?)</p>', body, re.S)
        meta = {'slug': slug, 'title': title, 'label': label, 'date': date, 'date_iso': d.strftime('%Y-%m-%d'),
                'image': img.group(1), 'image_alt': img.group(2), 'image_fit': image_fit(img.group(1)),
                'excerpt': excerpt(first_p.group(1) if first_p else body), 'minutes': read_minutes(body), 'old_ids': [old_id]}
        fn = 'news-%s.html' % slug
        open(fn, 'w', encoding='utf-8').write(render(meta, body, buttons))
        made.append(fn)
    print('wrote', len(made), 'story pages')

def render(meta, body, buttons):
    title_txt = strip(meta['title'])
    return PAGE.format(
        title_txt=html.escape(title_txt, quote=True), title_attr=html.escape(title_txt, quote=True), desc=html.escape(meta['excerpt'], quote=True),
        url=SITE + 'news-' + meta['slug'], img_abs=SITE + meta['image'], date_iso=meta['date_iso'], date=meta['date'],
        label=meta['label'], title=meta['title'], mins=meta['minutes'], image=meta['image'], image_alt=html.escape(meta['image_alt'], quote=True),
        fit_cls=' contain' if meta['image_fit'] == 'contain' else '', body=body, buttons=buttons,
        meta=json.dumps(meta, ensure_ascii=False, indent=1))

# ---------------------------------------------------------------- index + cards
def card(m, cls='nx-card', more='Read story'):
    fit = ' contain' if m['image_fit'] == 'contain' else ''
    return ('<a class="%s" href="news-%s.html">'
            '<div class="nx-img%s"><img src="%s" alt="%s" loading="lazy"></div>'
            '<div class="nx-body"><div class="nx-kicker">%s</div><h3 class="nx-title">%s</h3>'
            '<p class="nx-ex">%s</p><div class="nx-foot"><time datetime="%s">%s</time><span class="nx-more">%s &rarr;</span></div></div></a>') % (
        cls, m['slug'], fit, m['image'], html.escape(m['image_alt'], quote=True), m['label'], m['title'], html.escape(m['excerpt']), m['date_iso'], m['date'], more)

def replace_between(text, start, end, new):
    a = text.index(start) + len(start); b = text.index(end, a)
    return text[:a] + new + text[b:]

def build():
    stories = [m for m in (meta_of(p) for p in glob.glob('news-*.html')) if m]
    stories.sort(key=lambda m: m['date_iso'], reverse=True)
    # News index
    idx = '\n    <div class="nx-featured">' + card(stories[0], 'nx-card nx-lead') + '</div>\n    <div class="nx-grid">\n' + \
          ''.join('      ' + card(m) + '\n' for m in stories[1:]) + '    </div>\n    '
    redirects = {oid: 'news-%s.html' % m['slug'] for m in stories for oid in m.get('old_ids', [])}
    idx += '<script>/* old links (news.html#story) go to the story page */(function(){var r=%s;var h=location.hash.slice(1);if(h&&r[h])location.replace(r[h]);})();</script>\n    ' % json.dumps(redirects)
    n = open('news.html', encoding='utf-8').read()
    n = replace_between(n, '<!-- NEWS-INDEX:START -->', '<!-- NEWS-INDEX:END -->', idx)
    open('news.html', 'w', encoding='utf-8').write(n)
    # Home cards (first three)
    h = open('index.html', encoding='utf-8').read()
    home = '\n' + ''.join('        ' + card(m, 'hn-card', 'Read more').replace('nx-img', 'hn-img').replace('nx-body', 'hn-body')
                          .replace('nx-kicker', 'hn-badge').replace('nx-title', 'hn-title').replace('nx-ex', 'hn-ex').replace('nx-foot', 'hn-foot')
                          .replace('nx-more', 'hn-more') + '\n' for m in stories[:3]) + '        '
    h = replace_between(h, '<!-- HOME-NEWS:START -->', '<!-- HOME-NEWS:END -->', home)
    open('index.html', 'w', encoding='utf-8').write(h)
    # More news on each story page
    for m in stories:
        fn = 'news-%s.html' % m['slug']
        others = [o for o in stories if o['slug'] != m['slug']][:3]
        more = '\n  <section class="art-more"><div class="art-more-head"><h2>More news</h2><a href="news.html">All news &rarr;</a></div><div class="nx-grid">' + \
               ''.join(card(o) for o in others) + '</div></section>\n  '
        t = open(fn, encoding='utf-8').read()
        open(fn, 'w', encoding='utf-8').write(replace_between(t, '<!-- MORE-NEWS:START -->', '<!-- MORE-NEWS:END -->', more))
    print('built index (%d stories), home cards, More news' % len(stories))

if __name__ == '__main__':
    if '--migrate' in sys.argv:
        migrate()
    build()
