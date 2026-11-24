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

  /* arriving from a home-page news card (news.html#story-id): open that recap and bring it into view */
  var target = location.hash && document.getElementById(location.hash.slice(1));
  if (target && target.classList.contains('news-card')) {
    var b = target.querySelector('.news-toggle');
    if (b && b.getAttribute('aria-expanded') === 'false') b.click();
    setTimeout(function () { target.scrollIntoView({ block: 'start' }); window.scrollBy(0, -80); }, 50);
  }
})();

/* Next race strip on the home page + hero badge, from schedule_data.json */
(function () {
  // Season 7 schedule not announced yet: keep the next-race strip and the dated badge off.
  // On release: set this to true, un-hide Schedule in site-chrome.js, and restore the hero badge/buttons in index.html.
  var SCHEDULE_RELEASED = false;
  if (!SCHEDULE_RELEASED) return;
  var box = document.getElementById('nextRace');
  var badge = document.getElementById('heroBadge');
  if (!box && !badge) return;
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  fetch('schedule_data.json', { cache: 'no-cache' }).then(function (r) { return r.json(); }).then(function (d) {
    var now = Date.now();
    var races = d.events.filter(function (e) { return e.round; });
    // a race stays "next" until 4 hours after the green flag
    var next = races.filter(function (e) { return new Date(e.start).getTime() + 4 * 3600e3 > now; })[0];
    var first = races[0];
    if (badge) {
      if (!next) badge.innerHTML = 'Season ' + d.season + ' complete &mdash; see the results &rarr;';
      else if (next === first) badge.innerHTML = 'Season ' + d.season + ' starts ' + new Date(first.start).toLocaleDateString('en-US', { month: 'long', day: 'numeric', timeZone: 'America/New_York' }) + ' at ' + esc(first.track.replace(/ (International )?(Superspeedway|Speedway|Raceway|Motor Speedway)$/, '')) + ' &rarr;';
      else badge.innerHTML = 'Season ' + d.season + ' &middot; Race ' + next.round + ' of ' + races.length + ' up next &rarr;';
    }
    if (!box || !next) return;
    var t = new Date(next.start);
    // league times are Eastern; show the race in ET like the rest of the site
    var ET = { timeZone: 'America/New_York' };
    var day = t.toLocaleDateString('en-US', Object.assign({ weekday: 'short', month: 'short', day: 'numeric' }, ET));
    var tm = t.toLocaleTimeString('en-US', Object.assign({ hour: 'numeric', minute: '2-digit' }, ET)) + ' ET';
    var kick = 'Next race &middot; Round ' + next.round + ' of ' + races.length + (next.label ? ' &middot; ' + esc(next.label) : '');
    var title = next.name && next.name !== next.track ? esc(next.name) : esc(next.track);
    var sub = next.name && next.name !== next.track ? esc(next.track) : '';
    var last = next.history && next.history.last ? 'Last SNR winner here: <strong>' + esc(next.history.last.name) + '</strong> (Season ' + next.history.last.season + ')' : (next.label === 'SNR Debut' ? 'First SNR race at this track' : '');
    box.innerHTML =
      '<div class="nr-logo">' + (next.logo ? '<img src="' + esc(next.logo) + '" alt="' + esc(next.track) + ' logo">' : '') + '</div>' +
      '<div class="nr-main">' +
        '<span class="nr-kick">' + kick + '</span>' +
        '<h2 class="nr-title">' + title + '</h2>' +
        (sub ? '<p class="nr-track">' + sub + (next.type ? ' &middot; ' + esc(next.type) : '') + '</p>' : (next.type ? '<p class="nr-track">' + esc(next.type) + '</p>' : '')) +
        '<p class="nr-when">' + day + ' &middot; ' + tm + '</p>' +
        (last ? '<p class="nr-last">' + last + '</p>' : '') +
      '</div>' +
      '<div class="nr-side">' +
        '<div class="nr-count" aria-live="off"><div><b id="nrD">0</b><span>Days</span></div><div><b id="nrH">0</b><span>Hrs</span></div><div><b id="nrM">0</b><span>Min</span></div></div>' +
        '<div class="nr-btns"><a class="btn btn-primary" href="schedule.html">Full schedule</a><a class="btn btn-outline" href="https://www.youtube.com/VSPEED" target="_blank" rel="noopener">Watch live</a></div>' +
      '</div>';
    box.hidden = false;
    function tick() {
      var ms = Math.max(0, t.getTime() - Date.now());
      var m = Math.floor(ms / 60000);
      document.getElementById('nrD').textContent = Math.floor(m / 1440);
      document.getElementById('nrH').textContent = Math.floor(m % 1440 / 60);
      document.getElementById('nrM').textContent = m % 60;
      if (ms === 0) box.querySelector('.nr-count').innerHTML = '<div class="nr-live">Racing now &mdash; watch live on VSPEED</div>';
    }
    tick(); setInterval(tick, 30000);
  }).catch(function () {});
})();
