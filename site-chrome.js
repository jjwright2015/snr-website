/* ──────────────────────────────────────────────────────────────────────────
   Shared navigation + footer for every page.
   Edit the lists below and the change appears on ALL pages.

   To bring a hidden page back, delete its `hidden: true` line.
   To add a page, add one line to NAV.
   ────────────────────────────────────────────────────────────────────────── */
(function () {
  /* ONE switch for the Season 7 schedule announcement. false = schedule page, ticker and next-race card stay hidden.
     Add ?preview=release to any page address to see the released version without publishing it. */
  var SCHEDULE_RELEASED = true;   // this branch launches with the schedule announcement
  try { if (/[?&]preview=release\b/.test(location.search)) { SCHEDULE_RELEASED = true; sessionStorage.setItem('snrPreview', '1'); }
        else if (sessionStorage.getItem('snrPreview') === '1') SCHEDULE_RELEASED = true; } catch (e) {}
  window.SNR = window.SNR || {};
  window.SNR.scheduleReleased = SCHEDULE_RELEASED;

  /* Title sponsor, shown in the nav bar, the footer and the home page */
  var TITLE = { name: "Banksy's SimGarage", logo: 'assets/sponsors/banksy-wordmark.png', url: 'https://www.youtube.com/@BanksySimGarage' };

  var NAV = [
    { label: 'News',        href: 'news.html' },
    { label: 'Schedule',    href: 'schedule.html', hidden: !SCHEDULE_RELEASED },   // shows when SCHEDULE_RELEASED is true
    { label: 'Standings',   page: 'standings' },                 // home page (hash route)
    { label: 'Stats', items: [                                   // dropdown: opens on hover (desktop) or tap
      { label: 'Drivers',   href: 'drivers.html',  note: 'Profiles and career stats' },
      { label: 'Records',   href: 'records.html',  note: 'Streaks and all-time bests' },
      { label: 'History',   page: 'history',       note: 'Champions and past seasons' }
    ] },
    { label: 'Fantasy Live', href: 'https://fantasy.snrleague.com/#/', external: true } // SNR Fantasy Live app (presented by Full Throttle Frames)
  ];
  // Rules is its own page (index.html#rules), reached from the "I want to…" menu and the footer
  var RULES = { label: 'Rules', page: 'rules' };

  /* "I want to…" menu (top right). Put the real link in `href`.
     An item whose href is empty is left out; 'TODO' shows a "link needed" tag (review only). */
  var PAYPAL_URL  = 'https://www.paypal.com/paypalme/saturdaynightracing';   // league PayPal link for entry fees
  var SPONSOR_URL = 'https://tally.so/r/RWDV2l';   // where sponsor enquiries go (email as mailto:, a form, or Discord)
  var DISCORD_URL = '';       // Discord invite link; empty = not shown
  var YOUTUBE_URL = 'https://www.youtube.com/VSPEED';
  /* An item can show a small logo after its note: logo: { src: 'assets/…', alt: 'Name' } */
  var WANT = [
    { label: 'Read the rules',          page: 'rules',         note: 'League rulebook' },
    { label: 'Apply to the league',     href: 'join.html',     note: 'Driver application' },
    { label: 'Pay my entry fee',        href: PAYPAL_URL,      note: 'Secure payment via', logo: { src: 'assets/brand/paypal-yellow.png', alt: 'PayPal' }, external: true },
    { label: 'Become a sponsor',        href: SPONSOR_URL,     note: 'Sponsorship request form', external: true },
    { label: 'Watch races live',        href: YOUTUBE_URL,     note: 'Saturdays 10 PM ET on', logo: { src: 'assets/sponsors/vspeed.png', alt: 'VSPEED' }, external: true },
    { label: 'Join our Discord',        href: DISCORD_URL,     note: 'League chat & announcements', external: true }
  ];

  var SEASON_LINE = 'Cup Series presented by ' + TITLE.name;
  var COPYRIGHT   = '© ' + new Date().getFullYear() + ' Saturday Night Racing League. All rights reserved.';
  var SPONSOR     = '';   // title-sponsor credit line; leave empty when there is none

  // Cloudflare serves pages without ".html" (snrleague.com/news), so compare names with the extension stripped
  function base(n) { return (n || '').toLowerCase().replace(/\.html?$/, '') || 'index'; }
  var file = base(location.pathname.split('/').pop());
  var onHome = file === 'index';
  var hash = (location.hash || '').replace('#', '') || 'home';

  function hrefFor(it) {
    if (it.href) return it.href;
    return onHome ? '#' + it.page : 'index.html#' + it.page;
  }
  function isActive(it) {
    if (it.external) return false;
    if (it.href) return base(it.href) === file || (base(it.href) === 'news' && /^news-/.test(file));   // story pages light up Latest News
    return onHome && it.page === hash;
  }
  var visible = NAV.filter(function (i) { return !i.hidden; });
  var flat = [];   // every link, dropdown items included (footer)
  visible.forEach(function (it) { if (it.items) flat = flat.concat(it.items.filter(function (x) { return !x.hidden; })); else flat.push(it); });
  flat.push(RULES);

  function linkHtml(it, cls) {
    var c = cls + (isActive(it) ? ' active' : '');
    var dp = it.page && onHome ? ' data-page="' + it.page + '"' : '';
    var ext = it.external ? ' target="_blank" rel="noopener"' : '';
    return '<a href="' + hrefFor(it) + '" class="' + c + '"' + dp + ext + '>';
  }
  var links = visible.map(function (it) {
    if (it.items) {
      var subs = it.items.filter(function (x) { return !x.hidden; });
      var on = subs.some(isActive);
      return '<div class="nav-drop' + (on ? ' active' : '') + '">' +
        '<button type="button" class="nav-link nav-drop-btn' + (on ? ' active' : '') + '" aria-expanded="false" aria-haspopup="true">' + it.label +
        '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button>' +
        '<div class="nav-drop-menu" role="menu">' + subs.map(function (x) {
          return linkHtml(x, 'nav-drop-item').replace('<a ', '<a role="menuitem" ') + '<span class="ndi-label">' + x.label + '</span>' + (x.note ? '<span class="ndi-note">' + x.note + '</span>' : '') + '</a>';
        }).join('') + '</div></div>';
    }
    return linkHtml(it, 'nav-link' + (it.cta ? ' nav-join-btn' : '')) + it.label + '</a>';
  }).join('\n      ');

  var wantItems = WANT.filter(function (w) { return w.page || w.href; }).map(function (w) {
    var todo = w.href === 'TODO';
    var href = w.page ? hrefFor(w) : (todo ? '#' : w.href);
    var ext = w.external && !todo ? ' target="_blank" rel="noopener"' : '';
    var dp = w.page && onHome ? ' data-page="' + w.page + '"' : '';
    return '<a role="menuitem" class="want-item' + (todo ? ' want-todo' : '') + '" href="' + href + '"' + ext + dp + '>' +
      '<span class="want-label">' + w.label + (w.external && !todo ? ' <span class="want-ext" aria-hidden="true">&#8599;</span>' : '') + '</span>' +
      (todo ? '<span class="want-note want-note-todo">Link needed</span>' : (w.note ? '<span class="want-note">' + w.note + (w.logo ? ' <img class="want-logo" src="' + w.logo.src + '" alt="' + w.logo.alt + '">' : '') + '</span>' : '')) +
      '</a>';
  }).join('');
  var wantHtml =
    '<div class="want" id="wantMenu">' +
      '<button type="button" class="want-btn" id="wantBtn" aria-haspopup="true" aria-expanded="false" aria-controls="wantList">' +
        'I want to&hellip; <svg class="want-chev" viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5"/></svg>' +
      '</button>' +
      '<div class="want-list" id="wantList" role="menu">' + wantItems + '</div>' +
    '</div>';

  var sponsorHtml = function (cls) {
    return '<a class="' + cls + '" href="' + TITLE.url + '" target="_blank" rel="noopener">' +
      '<span class="ts-label">Presented by</span><img src="' + TITLE.logo + '" alt="' + TITLE.name + '" width="664" height="211"></a>';
  };

  var navHtml =
    '<nav class="main-nav" id="mainNav">\n' +
    '  <div class="nav-inner">\n' +
    '    <a href="' + (onHome ? '#home' : 'index.html#home') + '" class="nav-brand" aria-label="Saturday Night Racing League Cup Series, home">\n' +
    '      <img src="assets/brand/snr-badge-wide.svg" alt="" class="nav-badge" width="260" height="145">\n' +
    '      <span class="nav-series">Cup Series</span>\n' +
    '    </a>\n' +
    '    <button class="hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false">\n' +
    '      <span></span><span></span><span></span>\n' +
    '    </button>\n' +
    '    <div class="nav-links" id="navLinks">\n' +
    '      ' + links + '\n' +
    '      ' + wantHtml + '\n' +
    '      ' + sponsorHtml('nav-sponsor nav-sponsor-menu') + '\n' +
    '    </div>\n' +
    '    ' + sponsorHtml('nav-sponsor nav-sponsor-bar') + '\n' +
    '  </div>\n' +
    '</nav>';

  var footLinks = flat.map(function (it) {
    var ext = it.external ? ' target="_blank" rel="noopener"' : '';
    return '<a href="' + hrefFor(it) + '"' + ext + '>' + it.label + '</a>';
  }).join('\n        ');

  var PARTNERS = [
    { name: 'VSPEED', logo: 'assets/sponsors/vspeed-wide.png', url: YOUTUBE_URL, cls: 'p-wide' },
    { name: "Walkin' & Rollin' Costumes", logo: 'assets/sponsors/walkin-rollin-2.png', url: 'https://walkinrollin.org/' },
    { name: 'Clark Print Shop', logo: 'assets/sponsors/clark-print-shop-2.png', url: 'https://www.clarkprintshop.com/' },
    { name: 'TeamBoss', logo: 'assets/sponsors/teamboss-2.png', url: 'https://www.teamboss.net/' },
    { name: 'Full Throttle Frames, sim racing photography', logo: 'assets/sponsors/full-throttle-frames-2.png', url: 'https://x.com/fullthrottle54', cls: 'p-tall' }
  ];
  window.SNR.partners = PARTNERS;
  window.SNR.partnerHtml = function (p) {
    var img = '<img src="' + p.logo + '" alt="' + p.name.replace(/"/g, '&quot;') + '" loading="lazy">';
    return p.url ? '<a class="partner ' + (p.cls || '') + '" href="' + p.url + '" target="_blank" rel="noopener">' + img + '</a>'
                 : '<span class="partner ' + (p.cls || '') + '">' + img + '</span>';
  };

  var footLinks = flat.map(function (it) {
    var ext = it.external ? ' target="_blank" rel="noopener"' : '';
    return '<a href="' + hrefFor(it) + '"' + ext + '>' + it.label + '</a>';
  }).concat(DISCORD_URL ? ['<a href="' + DISCORD_URL + '" target="_blank" rel="noopener">Discord</a>'] : [])
    .concat(['<a href="' + YOUTUBE_URL + '" target="_blank" rel="noopener">YouTube</a>']).join('\n        ');

  var footHtml =
    '<section class="site-partners" aria-label="League partners">\n' +
    '  <div class="site-partners-inner">\n' +
    '    <span class="site-partners-label">Our partners</span>\n' +
    '    <div class="site-partners-row">' + PARTNERS.map(window.SNR.partnerHtml).join('') + '</div>\n' +
    '  </div>\n' +
    '</section>\n' +
    '<footer class="site-footer">\n' +
    '  <div class="footer-checker" aria-hidden="true"></div>\n' +
    '  <div class="footer-inner">\n' +
    '    <div class="footer-top">\n' +
    '      <div class="footer-brand">\n' +
    '        <img src="assets/brand/snr-avatar-round.svg" alt="" class="footer-avatar" width="56" height="56">\n' +
    '        <div>\n' +
    '          <strong>Saturday Night Racing League</strong>\n' +
    '          <p>' + SEASON_LINE + '</p>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '      <nav class="footer-links" aria-label="Footer">\n        ' + footLinks + '\n      </nav>\n' +
    '    </div>\n' +
    '    <div class="footer-bottom">\n' +
    '      <p>' + COPYRIGHT + '</p>\n' +
    '      ' + sponsorHtml('footer-sponsor') + '\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</footer>';

  function mount(id, html) {
    var el = document.getElementById(id);
    if (el) el.outerHTML = html;
  }
  document.documentElement.classList.toggle('schedule-released', SCHEDULE_RELEASED);
  /* Stats dropdown: hover opens it on desktop (CSS); a tap or click toggles it; Esc or a click outside closes it */
  if (!window.__snrDropWired && document.querySelector('.nav-drop')) {
    window.__snrDropWired = true;
    var closeAll = function (except) { document.querySelectorAll('.nav-drop.open').forEach(function (d) { if (d !== except) { d.classList.remove('open'); d.querySelector('.nav-drop-btn').setAttribute('aria-expanded', 'false'); } }); };
    document.querySelectorAll('.nav-drop-btn').forEach(function (b) {
      b.addEventListener('click', function (e) { e.stopPropagation(); var d = b.parentNode; var open = !d.classList.contains('open'); closeAll(d); d.classList.toggle('open', open); b.setAttribute('aria-expanded', String(open)); });
    });
    document.addEventListener('click', function (e) { if (!e.target.closest('.nav-drop')) closeAll(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAll(); });
    document.querySelectorAll('.nav-drop-item').forEach(function (a) { a.addEventListener('click', function () { closeAll(); }); });
  }
  mount('site-nav', navHtml);
  mount('site-footer', footHtml);

  /* Phone menu: the X stays on top of the panel, tapping outside or Esc closes it,
     and the page behind can't scroll while it is open. Pages toggle the 'open' class
     themselves; this watches for it, so it works the same on every page. */
  var nlEl = document.getElementById('navLinks'), hbEl = document.getElementById('hamburger');
  if (nlEl && hbEl && !window.__snrMenuWired) {
    window.__snrMenuWired = true;
    var backdrop = document.createElement('div'); backdrop.className = 'nav-backdrop'; document.body.appendChild(backdrop);
    var lockY = 0, locked = false, lockHash = '';
    var closeMenu = function () { nlEl.classList.remove('open'); hbEl.classList.remove('open'); };
    var sync = function () {
      var open = nlEl.classList.contains('open');
      hbEl.classList.toggle('open', open);
      hbEl.setAttribute('aria-expanded', String(open));
      hbEl.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      backdrop.classList.toggle('show', open);
      if (open && !locked) {
        lockY = window.scrollY; locked = true; lockHash = location.hash;
        document.body.style.top = -lockY + 'px'; document.body.classList.add('menu-open');
      } else if (!open && locked) {
        locked = false; document.body.classList.remove('menu-open'); document.body.style.top = '';
        var html = document.documentElement, sb = html.style.scrollBehavior; html.style.scrollBehavior = 'auto';
        // a menu tap that switched sections (e.g. Rules) starts at the top; otherwise return to where the reader was
        window.scrollTo(0, location.hash !== lockHash ? 0 : lockY); html.style.scrollBehavior = sb;
      }
    };
    new MutationObserver(sync).observe(nlEl, { attributes: true, attributeFilter: ['class'] });
    backdrop.addEventListener('click', closeMenu);
    // a tap anywhere outside the panel and the X (including the top bar) closes it
    document.addEventListener('click', function (e) { if (nlEl.classList.contains('open') && !nlEl.contains(e.target) && !hbEl.contains(e.target)) closeMenu(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nlEl.classList.contains('open')) { closeMenu(); hbEl.focus(); } });
    window.addEventListener('resize', function () { if (window.innerWidth > 768 && nlEl.classList.contains('open')) closeMenu(); });
    sync();
  }

  /* "I want to…" dropdown: click to open, click outside or Esc to close */
  var wm = document.getElementById('wantMenu'), wb = document.getElementById('wantBtn');
  // pages include this file twice (once for the nav, once for the footer): wire the menu only once
  if (wm && wb && !wb.dataset.wired) {
    wb.dataset.wired = '1';
    var setOpen = function (o) { wm.classList.toggle('open', o); wb.setAttribute('aria-expanded', String(o)); };
    wb.addEventListener('click', function (e) { e.stopPropagation(); setOpen(!wm.classList.contains('open')); });
    document.addEventListener('click', function (e) { if (!wm.contains(e.target)) setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && wm.classList.contains('open')) { setOpen(false); wb.focus(); } });
    wm.querySelectorAll('.want-todo').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); }); });
    wm.querySelectorAll('.want-item').forEach(function (a) {
      a.addEventListener('click', function () {
        setOpen(false);
        var nl = document.getElementById('navLinks'), hb = document.getElementById('hamburger');
        if (nl) nl.classList.remove('open'); if (hb) hb.classList.remove('open');
      });
    });
  }
})();
