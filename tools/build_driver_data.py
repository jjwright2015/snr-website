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

# league records
def top(key, n=1, minstarts=0, rev=True, val=None):
    pool = [d for d in drivers if d['career']['starts']>=minstarts]
    f = val or (lambda d: d['career'][key])
    return sorted(pool, key=f, reverse=rev)[:n]
rec = {}
def put(k, label, d, v): rec[k] = dict(label=label, driver=d['name'], value=v)
d=top('wins')[0]; put('wins','Career wins',d,d['career']['wins'])
d=top('poles')[0]; put('poles','Career poles',d,d['career']['poles'])
d=top('top5')[0]; put('top5','Career top 5s',d,d['career']['top5'])
d=top('lapsLed')[0]; put('lapsLed','Career laps led',d,d['career']['lapsLed'])
d=top('fastest')[0]; put('fastest','Career fastest laps',d,d['career']['fastest'])
d=top('avgFinish',minstarts=30,rev=False)[0]; put('avgFinish','Best career avg finish (30+ starts)',d,d['career']['avgFinish'])
best=max(((a['wins'],d['name'],s) for d in drivers for s,a in d['seasons'].items()))
rec['seasonWins']=dict(label='Wins in a season',driver=best[1],value=best[0],season=best[2])
best=max(((a['lapsLed'],d['name'],s) for d in drivers for s,a in d['seasons'].items()))
rec['seasonLaps']=dict(label='Laps led in a season',driver=best[1],value=best[0],season=best[2])
best=max(((a['poles'],d['name'],s) for d in drivers for s,a in d['seasons'].items()))
rec['seasonPoles']=dict(label='Poles in a season',driver=best[1],value=best[0],season=best[2])
# win streak
streak = {}; cur = (None,0); bestst=(0,None)
for rid in sorted({r['race_id'] for r in rows}, key=lambda x: (int(re.match(r'S(\d+)R',x).group(1)), int(x.split('R')[1]))):
    w = next((r['driver'] for r in rows if r['race_id']==rid and r['finish_pos']==1), None)
    cur = (w, cur[1]+1) if w and w==cur[0] else (w, 1 if w else 0)
    if cur[1]>bestst[0]: bestst=(cur[1],cur[0])
rec['streak']=dict(label='Consecutive wins',driver=bestst[1],value=bestst[0])
rec['champions']={str(s):c for s,c in champs.items()}
for d in drivers:
    d['records']=[k for k,v in rec.items() if isinstance(v,dict) and v.get('driver')==d['name'] and k!='champions']

drivers.sort(key=lambda d: -d['career']['starts'])
json.dump(dict(generated='from results.csv S1-S6', seasonsCount=max(champs), champions=champs,
    carBySeason={1:'Gen 4',2:'Next Gen / Xfinity',3:'Xfinity',4:'Next Gen',5:'Gen 4',6:'Xfinity'},
    records=rec, drivers=drivers), open(f'{ROOT}/driver_data.json','w'), separators=(',',':'))
print(len(drivers),'drivers', 'champs', champs)
