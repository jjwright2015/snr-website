/* Home page, Season 7 theme: partners box, flip race card, schedule ticker.
   The schedule switch lives in site-chrome.js (SCHEDULE_RELEASED); until then the card shows the
   defending champion and the all-time leaders, and the ticker and schedule button stay hidden. */
(function () {
  var SNR = window.SNR || {};
  var released = !!SNR.scheduleReleased;
  var $ = function (id) { return document.getElementById(id); };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function fmt(n) { return Number(n).toLocaleString('en-US'); }

  /* The home view hides the shared partners strip (the hero has its own) */
  function syncView() {
    var h = (location.hash || '').replace('#', '');
    document.body.classList.toggle('home-view', !h || h === 'home');
  }
  syncView(); window.addEventListener('hashchange', syncView);

  /* Partners box in the hero */
  var pb = $('hxPartners');
  if (pb && SNR.partners) {
    var first = SNR.partners[0], rest = SNR.partners.slice(1);
    pb.insertAdjacentHTML('beforeend', '<div class="hx-partners-top">' + SNR.partnerHtml(first) + '</div>' +
      '<div class="hx-partners-row">' + rest.map(SNR.partnerHtml).join('') + '</div>');
  }

  /* Before the announcement: no schedule button */
  if (!released) {
    var sb = document.querySelector('.hx-sched'); if (sb) sb.remove();
  } else {
    var wb = document.querySelector('.hx-watch'); if (wb) wb.remove();
  }

  var ICON_FLIP = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 0 1 15.5-6.2L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15.5 6.2L3 16"/><path d="M3 21v-5h5"/></svg>';
  var ICON_BACK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 0 1 15.5-6.2L21 8"/><path d="M21 3v5h-5"/></svg>';
  var TITLE_FOOT = '<div class="fc-foot"><span>Presented by</span><img src="assets/sponsors/banksy-wordmark.png" alt="Banksy\'s SimGarage"></div>';

  function shortTrack(e) {
    var f = (e.logo || '').split('/').pop().replace(/\.png$/, '');
    return f ? f.replace(/-/g, ' ').toUpperCase() : String(e.track || '').toUpperCase();
  }
  function statsKey(e, stats) {
    if (/2008/.test(e.note || '') && stats['Atlanta Motor Speedway (2008)']) return 'Atlanta Motor Speedway (2008)';
    return stats[e.track] ? e.track : null;
  }

  /* All-time career leaders, from driver_data.json */
  function careerHtml(dd) {
    var cats = [['Wins', 'wins'], ['Laps led', 'lapsLed'], ['Top 5s', 'top5'], ['Top 10s', 'top10'], ['Poles', 'poles'], ['Starts', 'starts']];
    var races = dd.drivers.reduce(function (n, d) { return n + (d.career.wins || 0); }, 0);
    return '<span class="fc-sub">Career leaders &middot; Seasons 1&ndash;' + esc(dd.seasonsCount) + '</span><div class="fc-lead-grid">' +
      cats.map(function (c) {
        var top = dd.drivers.slice().sort(function (a, b) { return (b.career[c[1]] || 0) - (a.career[c[1]] || 0); }).slice(0, 3);
        return '<div class="fc-lead fc-lead-y"><span class="fc-lead-l">' + c[0] + '</span>' + top.map(function (d, j) {
          return '<div class="fc-lead-r"><span>' + esc(d.name) + '</span><b' + (j ? '' : ' class="y"') + '>' + fmt(d.career[c[1]] || 0) + '</b></div>';
        }).join('') + '</div>';
      }).join('') + '</div>';
  }

  /* At this track, from track_stats.json (rows per driver) + schedule_data history */
  function trackHtml(e, rows, short) {
    var h = e.history || {};
    if (!rows || !rows.length) {
      return '<span class="fc-sub">' + esc(short) + '</span><p class="fc-note">' +
        (h.races ? esc(h.races) + ' SNR races here. Last winner: ' + esc(h.last && h.last.name) : 'The SNR Cup Series has never raced here before. A brand-new winner is guaranteed.') + '</p>';
    }
    var winners = rows.filter(function (r) { return r.wins > 0; }).sort(function (a, b) { return b.wins - a.wins || b.laps_led - a.laps_led; });
    var best = function (k) { var m = Math.max.apply(null, rows.map(function (r) { return r[k] || 0; })); var who = rows.filter(function (r) { return (r[k] || 0) === m; }); return { m: m, who: who }; };
    var tile = function (label, k) {
      var b = best(k); if (!b.m) return '';
      var names = b.who.length > 2 ? b.who.length + ' drivers' : b.who.map(function (r) { return r.driver.split(' ').slice(-1)[0]; }).join(' · ');
      if (b.who.length === 1) names = b.who[0].driver;
      return '<div class="fc-lead fc-lead-b"><span class="fc-lead-l">' + label + '</span><span class="fc-lead-n">' + esc(names) + '</span><b class="y">' + fmt(b.m) + (b.who.length > 1 && b.who.length <= 2 ? ' each' : '') + '</b></div>';
    };
    var lastHtml = h.last ? '<div class="fc-last"><span class="fc-lead-l">Most recent winner</span><b>' + esc(h.last.name) + '</b><span class="fc-last-s">Season ' + esc(h.last.season) + '</span></div>' : '';
    return lastHtml +
      '<span class="fc-sub">Winners here &middot; ' + esc(h.races || '') + (h.races ? ' SNR races' : '') + '</span>' +
      '<div class="fc-wins">' + (winners.length ? winners.slice(0, 8).map(function (r) {
        return '<div class="fc-win"><span>' + esc(r.driver) + '</span><b>' + r.wins + (r.wins === 1 ? ' win' : ' wins') + '</b></div>';
      }).join('') : '<div class="fc-win"><span>No winners yet</span></div>') + '</div>' +
      '<div class="fc-lead-grid fc-lead-3">' + tile('Most laps led', 'laps_led') + tile('Most top 5s', 'top5') + tile('Most top 10s', 'top10') + '</div>';
  }

  function cardShell(front, backTitle, tabs, panes) {
    return '<div class="fc-in">' +
      '<div class="fc-face fc-front" role="button" tabindex="0" aria-label="Flip card">' + front + '</div>' +
      '<div class="fc-face fc-back">' +
        '<div class="fc-head fc-head-back"><span class="fc-back-title">' + backTitle + '</span><button type="button" class="fc-backbtn" data-flip>' + ICON_BACK + 'Back</button></div>' +
        (tabs.length > 1 ? '<div class="fc-tabs" role="tablist">' + tabs.map(function (t, i) { return '<button type="button" role="tab" class="fc-tab' + (i ? '' : ' on') + '" data-tab="' + i + '" aria-selected="' + (i ? 'false' : 'true') + '">' + t + '</button>'; }).join('') + '</div>' : '') +
        panes.map(function (p, i) { return '<div class="fc-pane" data-pane="' + i + '"' + (i ? ' hidden' : '') + '>' + p + '</div>'; }).join('') +
        TITLE_FOOT +
      '</div></div>';
  }

  function wireCard(card) {
    var inner = card.querySelector('.fc-in'), rot = 0, lean = 0;
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    var apply = function () { inner.style.transform = 'rotateY(' + (rot + lean) + 'deg)'; };
    var flipped = function () { return Math.round(rot / 180) % 2 !== 0; };
    var flip = function () {
      rot += lean < 0 ? -180 : 180; lean = 0;
      card.classList.toggle('flipped', flipped());
      if (reduce) inner.style.transition = 'none';
      apply();
    };
    card.querySelector('.fc-front').addEventListener('click', flip);
    card.querySelector('.fc-front').addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); } });
    card.querySelectorAll('[data-flip]').forEach(function (b) { b.addEventListener('click', function (e) { e.stopPropagation(); flip(); }); });
    card.querySelectorAll('.fc-tab').forEach(function (t) {
      t.addEventListener('click', function (e) {
        e.stopPropagation();
        card.querySelectorAll('.fc-tab').forEach(function (x) { x.classList.toggle('on', x === t); x.setAttribute('aria-selected', String(x === t)); });
        card.querySelectorAll('.fc-pane').forEach(function (p) { p.hidden = p.getAttribute('data-pane') !== t.getAttribute('data-tab'); });
      });
    });
    // tapping the empty part of the back flips it back too
    card.querySelector('.fc-back').addEventListener('click', function (e) { if (!e.target.closest('button, a')) flip(); });
    if (!reduce && window.matchMedia && matchMedia('(hover: hover) and (pointer: fine)').matches) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect(), l = (e.clientX - r.left) < r.width / 2 ? -10 : 10;
        if (flipped()) l = -l;
        if (l !== lean) { lean = l; apply(); }
      });
      card.addEventListener('mouseleave', function () { lean = 0; apply(); });
    }
  }

  var card = $('raceCard');
  var get = function (u) { return fetch(u, { cache: 'no-cache' }).then(function (r) { return r.json(); }); };
  var wantSchedule = released ? get('schedule_data.json') : Promise.resolve(null);
  Promise.all([wantSchedule, get('track_stats.json').catch(function () { return {}; }), get('driver_data.json')]).then(function (res) {
    var sd = res[0], stats = res[1], dd = res[2];
    if (!card) return;
    if (!sd) {
      /* Before the announcement: defending champion */
      var jb = dd.drivers.filter(function (d) { return d.name === 'Joshua Banks'; })[0];
      var s6 = jb && jb.seasons && jb.seasons[String(dd.seasonsCount)];
      var stat = function (v, l) { return '<div class="fc-stat"><b>' + esc(v) + '</b><span>' + l + '</span></div>'; };
      var front = '<div class="fc-head"><span>Season 7 &middot; 2027</span><span>Coming soon</span></div>' +
        '<div class="fc-main"><span class="fc-kick">Defending champion</span>' +
        '<span class="fc-big">Joshua Banks</span>' +
        '<span class="fc-date">2&times; SNR Cup Series champion</span>' +
        (s6 ? '<div class="fc-stats">' + stat(s6.wins, 'Wins') + stat(s6.top5, 'Top 5s') + stat(fmt(s6.lapsLed), 'Laps led') + '</div><span class="fc-sub">Season ' + esc(dd.seasonsCount) + ' &middot; title won at Kansas</span>' : '') +
        '<span class="fc-count">Schedule announcement coming soon</span>' +
        '<span class="fc-tap">' + ICON_FLIP + 'Tap for all-time leaders</span></div>' + TITLE_FOOT;
      card.innerHTML = cardShell(front, 'All-time leaders', ['All-time league'], [careerHtml(dd)]);
      card.classList.add('fc-pre');
      wireCard(card);
      return;
    }
    var now = Date.now();
    var races = sd.events.filter(function (e) { return e.round; });
    var next = races.filter(function (e) { return new Date(e.start).getTime() + 4 * 3600e3 > now; })[0] || races[races.length - 1];
    var short = shortTrack(next);
    var title = next.name && next.name !== next.track ? next.name : short;
    var head = 'Next race &middot; Round ' + next.round;
    var tag = next.label || (next.chase ? 'The Chase' : '');
    var start = new Date(next.start);
    var dateTxt = start.toLocaleDateString('en-US', { timeZone: 'America/New_York', weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }).replace(',', ' ·').toUpperCase() +
      ' · ' + start.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: 'numeric', minute: '2-digit' }) + ' ET';
    var front2 = '<div class="fc-head"><span>' + head + '</span><span>' + esc(tag) + '</span></div>' +
      '<div class="fc-main"><span class="fc-big">' + esc(title) + '</span>' +
      '<img class="fc-logo" src="' + esc(next.logo) + '" alt="' + esc(next.track) + '">' +
      '<span class="fc-date">' + esc(dateTxt) + '</span>' +
      '<span class="fc-count" id="fcCount"></span>' +
      '<span class="fc-tap">' + ICON_FLIP + 'Tap for ' + esc(short.toLowerCase()) + ' history</span></div>' + TITLE_FOOT;
    var key = statsKey(next, stats);
    card.innerHTML = cardShell(front2, esc(short) + ' history', ['At ' + esc(short.toLowerCase())], [trackHtml(next, key ? stats[key] : null, short)]);
    wireCard(card);
    var cnt = $('fcCount');
    var tick = function () {
      var left = start.getTime() - Date.now();
      if (left <= 0) { cnt.textContent = left > -4 * 3600e3 ? 'Racing now · live on VSPEED' : ''; return; }
      var d = Math.floor(left / 864e5), h = Math.floor(left / 36e5) % 24, m = Math.floor(left / 6e4) % 60;
      cnt.textContent = 'Green flag in ' + d + (d === 1 ? ' day' : ' days') + ' · ' + h + ' hrs · ' + m + ' min';
    };
    tick(); setInterval(tick, 30000);

    /* Schedule ticker */
    var tk = $('schedTicker');
    if (tk) {
      var items = races.map(function (e) {
        var d = new Date(e.date + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' }).toUpperCase();
        var t = e.name && e.name !== e.track ? e.name : (e.label || '');
        if (/^Chase Race (\d)/.test(t)) t = t.replace('Chase Race', 'Chase');
        if (t === 'Championship Finale') t = 'Finale';
        if (t === 'Memorial Day Weekend') t = '';
        return '<span class="tk-item' + (e === next ? ' now' : '') + '"><span class="tk-when">R' + e.round + ' &middot; ' + d + '</span><span class="tk-track">' + esc(shortTrack(e)) + '</span>' + (t ? '<span class="tk-tag">' + esc(t) + '</span>' : '') + '</span>';
      }).join('');
      tk.innerHTML = '<div class="tk-inner"><a class="tk-title" href="schedule.html"><span class="hx-check" aria-hidden="true"></span>2027 Schedule</a><span class="tk-bar" aria-hidden="true"></span>' +
        '<div class="tk-view"><div class="tk-track-row">' + items + items + '</div></div>' +
        '<a class="tk-sponsor" href="https://www.youtube.com/@BanksySimGarage" target="_blank" rel="noopener"><span>Presented by</span><img src="assets/sponsors/banksy-wordmark.png" alt="Banksy\'s SimGarage"></a></div>';
      tk.hidden = false;
    }
  }).catch(function () {});
})();
