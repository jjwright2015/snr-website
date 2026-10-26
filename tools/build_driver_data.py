#!/usr/bin/env python3
"""Build driver_data.json for the Driver Profiles page.

Inputs : results.csv (dfs-sheets/history/data/results.csv in the Pick'em/DFS project),
         historical_standings.json (Seasons 1-5) + Season 6 from app.js `historicalData`,
         old drivers.html (optional, for SimRacerHub driver ids).
Usage  : python3 tools/build_driver_data.py path/to/results.csv
"""
import csv, json, re, sys, collections, statistics
ROOT = __file__.rsplit('/tools/', 1)[0]
rows = list(csv.DictReader(open(sys.argv[1], newline='')))
for r in rows:
    for k in ('season','round','started','start_pos','finish_pos','laps_led','incidents','dnf','dq','fastest_lap','cust_id'):
        r[k] = int(float(r[k] or 0))
    r['dfs_total'] = float(r['dfs_total'] or 0)
    r['laps_complete'] = int(float(r['laps_complete'] or 0))
rows = [r for r in rows if r['started']]            # a start = at least one lap
rows.sort(key=lambda r: (r['season'], r['round']))

# standings: S1-S5 from JSON, S6 from app.js
st = json.load(open(f'{ROOT}/historical_standings.json'))
m = re.search(r'const historicalData = (\{.*?\});\n', open(f'{ROOT}/app.js').read(), re.S)
hd = json.loads(m.group(1))
standings = {}
for k, v in hd.items():
    standings[int(k.replace('season',''))] = v
for k, v in st.items():
    standings.setdefault(int(k.replace('season','')), v)
S = {}  # (season, driver) -> row
for s, lst in standings.items():
    for e in lst: S[(s, e['driver'])] = e
champs = {s: lst[0]['driver'] for s, lst in standings.items()}

# SimRacerHub ids from the old page
srh = {}
try:
    old = open(f'{ROOT}/drivers.html').read()
    for mm in re.finditer(r'"id":\s*(\d+),\s*"name":\s*"([^"]+)"', old): srh[mm.group(2)] = int(mm.group(1))
except Exception: pass

def agg(rs):
    n = len(rs)
    if not n: return None
    f = [r['finish_pos'] for r in rs]
    return dict(starts=n, wins=sum(x==1 for x in f), top5=sum(x<=5 for x in f), top10=sum(x<=10 for x in f),
        poles=sum(r['start_pos']==1 for r in rs), lapsLed=sum(r['laps_led'] for r in rs),
        avgFinish=round(sum(f)/n,2), avgStart=round(sum(r['start_pos'] for r in rs)/n,2),
        best=min(f), dnf=sum(r['dnf'] for r in rs), fastest=sum(r['fastest_lap'] for r in rs),
        avgInc=round(sum(r['incidents'] for r in rs)/n,2), dfsAvg=round(sum(r['dfs_total'] for r in rs)/n,1))

by = collections.defaultdict(list)
for r in rows: by[r['cust_id']].append(r)
drivers = []
for cid, rs in by.items():
    name = rs[-1]['driver']
    c = agg(rs)
    seasons = {}
    for s in sorted({r['season'] for r in rs}):
        a = agg([r for r in rs if r['season']==s]); e = S.get((s, name))
        if e: a.update(pos=e['pos'], points=e['points'], champion=(champs.get(s)==name))
        seasons[s] = a
    trk = {}
    for t in sorted({r['track'] for r in rs}):
        tr = [r for r in rs if r['track']==t]; a = agg(tr)
        a['type'] = tr[0]['track_type']; trk[t] = a
    types = {t: agg([r for r in rs if r['track_type']==t]) for t in sorted({r['track_type'] for r in rs})}
    titles = [s for s in seasons if champs.get(s)==name]
    ranked = [(a['pos'], -a['wins'], s) for s, a in seasons.items() if 'pos' in a and a['starts']>=3]
    best_season = min(ranked)[2] if ranked else None
    best_tracks = sorted([(t,a) for t,a in trk.items() if a['starts']>=3], key=lambda x: (x[1]['avgFinish'], -x[1]['wins']))[:5]
    drivers.append(dict(id=cid, name=name, srh=srh.get(name), career=c, seasons=seasons, tracks=trk, types=types,
        titles=titles, bestSeason=best_season, bestTracks=[t for t,_ in best_tracks],
        recent=[r['finish_pos'] for r in rs[-5:]], first=rs[0]['race_id'], last=rs[-1]['race_id'],
        active=rs[-1]['season']==max(r['season'] for r in rows)))

drivers.sort(key=lambda d: -d['career']['starts'])
json.dump(dict(generated='from results.csv S1-S6', seasonsCount=max(champs), champions=champs,
    carBySeason={1:'Gen 4',2:'Next Gen / Xfinity',3:'Xfinity',4:'Next Gen',5:'Gen 4',6:'Xfinity'},
    drivers=drivers), open(f'{ROOT}/driver_data.json','w'), separators=(',',':'))
print(len(drivers),'drivers', 'champs', champs)
