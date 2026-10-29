/* Site polish: countdown, Hall of Champions, Season 6 final standings, collapsible news recaps. */
(function () {
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* ---- Season 7 countdown ---- */
  var cd = document.getElementById('raceCountdown');
  if (cd) {
    var target = Date.parse(cd.getAttribute('data-target'));
    var cells = {}; cd.querySelectorAll('[data-u]').forEach(function (el) { cells[el.getAttribute('data-u')] = el; });
    var pad = function (n) { return n < 10 ? '0' + n : String(n); };
    var tick = function () {
      var ms = target - Date.now();
      if (ms <= 0) { cd.innerHTML = '<div class="countdown-live">Green flag &mdash; it&rsquo;s race night!</div>'; return false; }
      var t = Math.floor(ms / 1000);
      cells.d.textContent = Math.floor(t / 86400); cells.h.textContent = pad(Math.floor(t % 86400 / 3600));
      cells.m.textContent = pad(Math.floor(t % 3600 / 60)); cells.s.textContent = pad(t % 60);
      return true;
    };
    if (tick()) { var iv = setInterval(function () { if (!tick()) clearInterval(iv); }, 1000); }
  }

  /* ---- Hall of Champions (from seasonChampions in app.js) ---- */
  var hall = document.getElementById('hallOfChampions');
  if (hall && typeof seasonChampions !== 'undefined') {
    var counts = {};
    Object.keys(seasonChampions).forEach(function (s) { var d = seasonChampions[s].driver; counts[d] = (counts[d] || 0) + 1; });
    hall.innerHTML = Object.keys(seasonChampions).sort(function (a, b) { return b - a; }).map(function (s) {
      var c = seasonChampions[s];
      return '<div class="champ-tile"><div class="champ-season">Season ' + s + '</div><div class="champ-name">' + esc(c.driver) +
        (counts[c.driver] > 1 ? ' <span class="champ-x">&times;' + counts[c.driver] + '</span>' : '') + '</div>' +
        '<div class="champ-meta">' + Number(c.points).toLocaleString() + ' pts &middot; ' + c.wins + ' win' + (c.wins === 1 ? '' : 's') + '</div></div>';
    }).join('');
  }

  /* ---- Season 6 final standings on the Standings page ---- */
  var s6 = document.getElementById('s6Final');
  if (s6 && typeof historicalData !== 'undefined' && historicalData.season6) {
    var rows = historicalData.season6.slice(0, 10).map(function (r) {
      return '<tr><td>' + r.pos + '</td><td>' + esc(r.driver) + '</td><td>' + r.points + '</td><td>' + r.wins + '</td></tr>';
    }).join('');
    s6.innerHTML = '<p class="s6-note">Season 7 standings will appear here after Race 1. Final Season 6 standings:</p>' +
      '<table class="s6-table"><thead><tr><th>Pos</th><th>Driver</th><th>Pts</th><th>Wins</th></tr></thead><tbody>' + rows + '</tbody></table>';
  }

  /* ---- Collapsible news recaps ---- */
  var cards = document.querySelectorAll('.news-card');
  cards.forEach(function (card, i) {
    var body = card.querySelector('.news-body'); if (!body) return;
    var onHome = !!card.closest('#page-home');
    if (!onHome && i === 0) return;                     // newest recap on the news page stays open
    var bc = body.querySelector('.news-broadcast');
    body.classList.add('is-collapsed');
    var btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'news-toggle'; btn.setAttribute('aria-expanded', 'false'); btn.textContent = 'Read full recap';
    btn.addEventListener('click', function () {
      var open = body.classList.toggle('is-collapsed') === false;
      btn.setAttribute('aria-expanded', String(open)); btn.textContent = open ? 'Show less' : 'Read full recap';
    });
    body.after(btn);
    if (bc) { bc.classList.add('news-broadcast-out'); btn.after(bc); }
  });
})();
