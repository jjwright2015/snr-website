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
    { label: 'Odds',        href: 'https://pickem.snrleague.com/#/', external: true }, // odds are posted in the Pick'em app
    { label: 'Records',     href: 'records.html', hidden: true }, // hidden for now
    { label: 'History',     page: 'history',      hidden: true }, // hidden for now
    { label: 'Rules',       page: 'rules' },                     // home page (hash route)
    { label: 'Join',        href: 'join.html', cta: true }
  ];

  var SEASON_LINE = 'Season 7 — iRacing';
  var COPYRIGHT   = '© 2027 Saturday Night Racing League. All rights reserved.';
  var SPONSOR     = 'Presented by M&amp;J Distributors &middot; Matco Tools';

  var file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  var onHome = file === '' || file === 'index.html';
  var hash = (location.hash || '').replace('#', '') || 'home';

  function hrefFor(it) {
    if (it.href) return it.href;
    return onHome ? '#' + it.page : 'index.html#' + it.page;
  }
  function isActive(it) {
    if (it.external) return false;
    if (it.href) return it.href.toLowerCase() === file;
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
    '      <img src="assets/snr-logo-new.png" alt="SNR Logo" class="nav-logo">\n' +
    '      <div class="nav-brand-text">\n' +
    '        <span class="brand-name">Saturday Night Racing</span>\n' +
    '        <span class="brand-series">Cup Series</span>\n' +
    '      </div>\n' +
    '    </a>\n' +
    '    <button class="hamburger" id="hamburger" aria-label="Toggle navigation">\n' +
    '      <span></span><span></span><span></span>\n' +
    '    </button>\n' +
    '    <div class="nav-links" id="navLinks">\n' +
    '      ' + links + '\n' +
    '      <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme">\n' +
    '        <svg class="icon-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>\n' +
    '        <svg class="icon-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>\n' +
    '      </button>\n' +
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
    '        <img src="assets/snr-logo-new.png" alt="SNR Logo" class="footer-logo">\n' +
    '        <div>\n' +
    '          <strong>Saturday Night Racing Cup Series</strong>\n' +
    '          <p>' + SEASON_LINE + '</p>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '      <div class="footer-links">\n        ' + footLinks + '\n      </div>\n' +
    '    </div>\n' +
    '    <div class="footer-bottom">\n' +
    '      <p class="footer-sponsor">' + SPONSOR + '</p>\n' +
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
