/* ──────────────────────────────────────────────────────────────────────────
   Shared navigation + footer for every page.
   Edit the lists below and the change appears on ALL pages.

   To bring a hidden page back, delete its `hidden: true` line.
   To add a page, add one line to NAV.
   ────────────────────────────────────────────────────────────────────────── */
(function () {
  var NAV = [
    { label: 'Home',        page: 'home' },                      // home page (hash route)
    { label: 'Latest News', href: 'news.html' },
    { label: 'Schedule',    href: 'schedule.html' },   // SimRacerHub embed for now; the Season 7 page (schedule-s7.html) replaces it on release
    { label: 'Standings',   page: 'standings' },                 // home page (hash route)
    { label: 'Drivers',     href: 'drivers.html', hidden: true }, // hidden for now
    { label: "Pick'em",     href: 'https://pickem.snrleague.com/#/', external: true, hidden: true }, // hidden for now; free fantasy lineup game (points only) in the Pick'em app
    { label: 'Records',     href: 'records.html', hidden: true }, // hidden for now
    { label: 'History',     page: 'history',      hidden: true }, // hidden for now
    { label: 'Rules',       page: 'rules' }                      // home page (hash route)
  ];

  /* "I want to…" menu (top right). Put the real link in `href`.
     An item whose href is empty is left out; 'TODO' shows a "link needed" tag (review only). */
  var PAYPAL_URL  = 'https://www.paypal.com/paypalme/saturdaynightracing';   // league PayPal link for entry fees
  var SPONSOR_URL = 'https://tally.so/r/RWDV2l';   // where sponsor enquiries go (email as mailto:, a form, or Discord)
  var DISCORD_URL = '';       // Discord invite link; empty = not shown
  var YOUTUBE_URL = 'https://www.youtube.com/VSPEED';
  /* An item can show a small logo after its note: logo: { src: 'assets/…', alt: 'Name' } */
  var WANT = [
    { label: 'Apply to the league',     href: 'join.html',     note: 'Driver application' },
    { label: 'Pay my entry fee',        href: PAYPAL_URL,      note: 'Secure payment via', logo: { src: 'assets/brand/paypal-yellow.png', alt: 'PayPal' }, external: true },
    { label: 'Become a sponsor',        href: SPONSOR_URL,     note: 'Sponsorship request form', external: true },
    { label: 'Watch races live',        href: YOUTUBE_URL,     note: 'Saturdays 10 PM ET on', logo: { src: 'assets/sponsors/vspeed.png', alt: 'VSPEED' }, external: true },
    { label: 'Join our Discord',        href: DISCORD_URL,     note: 'League chat & announcements', external: true }
  ];

  var SEASON_LINE = 'Season 7 — iRacing';
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
    if (it.href) return base(it.href) === file;
    return onHome && it.page === hash;
  }
  var visible = NAV.filter(function (i) { return !i.hidden; });

  var links = visible.map(function (it) {
    var cls = 'nav-link' + (it.cta ? ' nav-join-btn' : '') + (isActive(it) ? ' active' : '');
    var dp = it.page && onHome ? ' data-page="' + it.page + '"' : '';
    var ext = it.external ? ' target="_blank" rel="noopener"' : '';
    return '<a href="' + hrefFor(it) + '" class="' + cls + '"' + dp + ext + '>' + it.label + '</a>';
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

  var navHtml =
    '<nav class="main-nav" id="mainNav">\n' +
    '  <div class="nav-inner">\n' +
    '    <a href="' + (onHome ? '#home' : 'index.html#home') + '" class="nav-brand">\n' +
    '      <img src="assets/brand/snr-sticker.svg" alt="Saturday Night Racing League" class="nav-logo nav-sticker" width="196" height="43">\n' +
    '      <span class="nav-series-tag">Cup Series</span>\n' +
    '    </a>\n' +
    '    <button class="hamburger" id="hamburger" aria-label="Toggle navigation">\n' +
    '      <span></span><span></span><span></span>\n' +
    '    </button>\n' +
    '    <div class="nav-links" id="navLinks">\n' +
    '      ' + links + '\n' +
    '      ' + wantHtml + '\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</nav>';

  var footLinks = visible.map(function (it) {
    var ext = it.external ? ' target="_blank" rel="noopener"' : '';
    return '<a href="' + hrefFor(it) + '"' + ext + '>' + it.label + '</a>';
  }).join('\n        ');

  var footHtml =
    '<footer class="site-footer">\n' +
    '  <div class="footer-inner">\n' +
    '    <div class="footer-top">\n' +
    '      <div class="footer-brand">\n' +
    '        <img src="assets/brand/snr-avatar.svg" alt="SNR" class="footer-logo footer-avatar" width="64" height="64">\n' +
    '        <div>\n' +
    '          <strong>Saturday Night Racing Cup Series</strong>\n' +
    '          <p>' + SEASON_LINE + '</p>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '      <div class="footer-links">\n        ' + footLinks + '\n      </div>\n' +
    '    </div>\n' +
    '    <div class="footer-social">\n' +
    '      <a href="' + YOUTUBE_URL + '" target="_blank" rel="noopener" class="footer-social-link"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.7 15.1V8.9l5.8 3.1z"/></svg>Watch on VSPEED</a>\n' +
    (DISCORD_URL ? '      <a href="' + DISCORD_URL + '" target="_blank" rel="noopener" class="footer-social-link"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.6 1.3a18.4 18.4 0 0 0-5.6 0L8.6 3a19.7 19.7 0 0 0-4.9 1.5C.6 9.1-.3 13.6.1 18.1a19.9 19.9 0 0 0 6 3l1.3-2a12.9 12.9 0 0 1-2-1l.5-.4a14.2 14.2 0 0 0 12.2 0l.5.4a12.9 12.9 0 0 1-2 1l1.3 2a19.8 19.8 0 0 0 6-3c.5-5.2-.8-9.7-3.6-13.7zM8.3 15.3c-1.2 0-2.2-1.1-2.2-2.4s1-2.4 2.2-2.4 2.2 1.1 2.2 2.4-1 2.4-2.2 2.4zm7.4 0c-1.2 0-2.2-1.1-2.2-2.4s1-2.4 2.2-2.4 2.2 1.1 2.2 2.4-1 2.4-2.2 2.4z"/></svg>Join our Discord</a>\n' : '') +
    '    </div>\n' +
    '    <div class="footer-bottom">\n' +
    (SPONSOR ? '      <p class="footer-sponsor">' + SPONSOR + '</p>\n' : '') +
    '      <p>' + COPYRIGHT + '</p>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</footer>';

  function mount(id, html) {
    var el = document.getElementById(id);
    if (el) el.outerHTML = html;
  }
  mount('site-nav', navHtml);
  mount('site-footer', footHtml);

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
