/* Site polish: countdown, Hall of Champions, Season 6 final standings, collapsible news recaps. */
(function () {
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* ---- Season 6 final standings on the Standings page ---- */
  var s6 = document.getElementById('s6Final');
  if (s6 && typeof historicalData !== 'undefined' && historicalData.season6) {
    var list = typeof topStandings === 'function' ? topStandings(historicalData.season6) : historicalData.season6.slice(0, 43);
    var rows = list.map(function (r) {
      return '<tr><td>' + r.pos + '</td><td>' + esc(r.driver) + '</td><td>' + r.points + '</td><td>' + r.wins + '</td><td>' + r.top5 + '</td><td>' + r.top10 + '</td></tr>';
    }).join('');
    s6.innerHTML = '<p class="s6-note">Season 7 standings will appear here after Race 1. Final Season 6 standings (top ' + list.length + '):</p>' +
      '<div class="s6-scroll"><table class="s6-table"><thead><tr><th>Pos</th><th>Driver</th><th>Pts</th><th>Wins</th><th>Top 5</th><th>Top 10</th></tr></thead><tbody>' + rows + '</tbody></table></div>';
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
