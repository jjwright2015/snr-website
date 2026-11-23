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
    { label: 'Schedule',    href: 'schedule.html' },   // page embeds SimRacerHub; season id is set inside schedule.html
    { label: 'Standings',   page: 'standings' },                 // home page (hash route)
    { label: 'Drivers',     href: 'drivers.html', hidden: true }, // hidden for now
    { label: "Pick'em",     href: 'https://pickem.snrleague.com/#/', external: true, hidden: true }, // hidden for now; free fantasy lineup game (points only) in the Pick'em app
    { label: 'Records',     href: 'records.html', hidden: true }, // hidden for now
    { label: 'History',     page: 'history',      hidden: true }, // hidden for now
    { label: 'Rules',       page: 'rules' },                     // home page (hash route)
    { label: 'Join',        href: 'join.html', cta: true }
  ];

  var SEASON_LINE = 'Season 7 — iRacing';
  var COPYRIGHT   = '© 2027 Saturday Night Racing League. All rights reserved.';
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
})();
