#!/usr/bin/env python3
"""Build records_data.json (league records, top 3 per category incl. ties for 3rd).
Usage: python3 tools/build_records_data.py path/to/results.csv
Streak rule: a streak is counted over the races a driver ENTERED (skipped races do not break it).
The only exception is 'Consecutive races entered', which is by definition about league races in a row.
"""
import csv, json, sys, collections
ROOT = __file__.rsplit('/tools/', 1)[0]
R = list(csv.DictReader(open(sys.argv[1], newline='')))
for r in R:
    for k in ('season','round','started','start_pos','finish_pos','laps_led','incidents','dnf','dq','fastest_lap','laps_complete','race_laps','cust_id','chase'):
        r[k] = int(float(r[k] or 0))
    for k in ('dfs_finish','dfs_place_diff','dfs_laps_led','dfs_fastest_lap','dfs_incidents','dfs_clean','dfs_total'):
        r[k] = float(r[k] or 0)
R = [r for r in R if r['started']]
races = sorted({(r['season'], r['round']) for r in R}); IDX = {x: i for i, x in enumerate(races)}
for r in R: r['i'] = IDX[(r['season'], r['round'])]
LAST = races[-1]
FINALES = {(1,20),(2,20),(3,15),(4,19),(5,17),(6,22)}
by = collections.defaultdict(list)
for r in R: by[r['cust_id']].append(r)
for v in by.values(): v.sort(key=lambda r: r['i'])
NAME = {cid: v[-1]['driver'] for cid, v in by.items()}
RID = lambda r: f"S{r['season']}R{r['round']}"
def span(a, b):
    if a['season'] == b['season']:
        return f"Season {a['season']}, Races {a['round']}–{b['round']}" if a is not b else f"Season {a['season']}, Race {a['round']}"
    return f"Season {a['season']} Race {a['round']} – Season {b['season']} Race {b['round']}"

def ranked(entries, high=True):
    """entries: dict(id,value,detail). top 3 + everyone tied with 3rd."""
    entries = sorted(entries, key=lambda e: e['value'], reverse=high)
    if not entries: return []
    cut = entries[min(2, len(entries) - 1)]['value']
    keep = [e for e in entries if (e['value'] >= cut if high else e['value'] <= cut)]
    out = []
    for n, e in enumerate(keep):
        e['rank'] = 1 + next(j for j, x in enumerate(keep) if x['value'] == e['value'])
        out.append(e)
    return out

cats = []
def add(tab, key, title, unit, entries, high=True, note=None, fmt=None, holders=True):
    rk = ranked([e for e in entries if e['value'] is not None], high)
    cats.append(dict(tab=tab, key=key, title=title, unit=unit, note=note, fmt=fmt, holders=holders, entries=rk))

def streaks(pred, contiguous=False):
    out = []
    for cid, rs in by.items():
        best = (0, None, None); cur = []; prev = None
        for r in rs:
            if pred(r) and (not contiguous or not cur or r['i'] == prev + 1): cur.append(r)
            elif pred(r): cur = [r]
            else: cur = []
            prev = r['i']
            if len(cur) > best[0]: best = (len(cur), cur[0], cur[-1])
        if best[0]: out.append(dict(id=cid, value=best[0], detail=span(best[1], best[2])))
    return out

ST = 'Streaks'
add(ST,'st_win','Consecutive Wins','wins',streaks(lambda r: r['finish_pos']==1))
add(ST,'st_t5','Consecutive Top 5s','races',streaks(lambda r: r['finish_pos']<=5))
add(ST,'st_t10','Consecutive Top 10s','races',streaks(lambda r: r['finish_pos']<=10))
add(ST,'st_pole','Consecutive Poles','poles',streaks(lambda r: r['start_pos']==1))
add(ST,'st_t5s','Consecutive Top-5 Starts','races',streaks(lambda r: r['start_pos']<=5))
add(ST,'st_led','Consecutive Races Leading a Lap','races',streaks(lambda r: r['laps_led']>0))
add(ST,'st_clean','Consecutive Incident-Free Races','races',streaks(lambda r: r['incidents']==0))
add(ST,'st_inc2','Consecutive Races With 2 or Fewer Incidents','races',streaks(lambda r: r['incidents']<=2))
add(ST,'st_dnf','Consecutive Races Running at the Finish','races',streaks(lambda r: r['dnf']==0))
add(ST,'st_iron','Iron Man: Consecutive Races Entered','races',streaks(lambda r: True, contiguous=True),
    note='Counts league races in a row with no missed race.')

SR = 'Single Race'
def single(f, flt=lambda r: True, detail=None):
    return [dict(id=r['cust_id'], value=f(r), detail=f"{r['track']} · Season {r['season']}, Race {r['round']}" + (detail(r) if detail else ''))
            for r in R if flt(r)]
add(SR,'sr_led','Most Laps Led in a Race','laps',single(lambda r: r['laps_led'], detail=lambda r: f" · of {r['race_laps']} laps"))
add(SR,'sr_pct','Highest Share of Laps Led','%',single(lambda r: round(100*r['laps_led']/r['race_laps'],1), lambda r: r['race_laps']>0, detail=lambda r: f" · {r['laps_led']} of {r['race_laps']} laps"), fmt='pct')
add(SR,'sr_comeback','Biggest Comeback Win (Started Furthest Back)','start',single(lambda r: r['start_pos'], lambda r: r['finish_pos']==1, detail=lambda r: ' · started P%d'%r['start_pos']), fmt='pos')
add(SR,'sr_gain','Most Positions Gained in a Race','spots',single(lambda r: r['start_pos']-r['finish_pos'], lambda r: r['dnf']==0, detail=lambda r: f" · P{r['start_pos']} to P{r['finish_pos']}"))
add(SR,'sr_inc','Most Incidents in a Race','x',single(lambda r: r['incidents']), holders=False)
dfs = []
for r in R:
    dfs.append(dict(id=r['cust_id'], value=r['dfs_total'], detail=f"{r['track']} · Season {r['season']}, Race {r['round']}",
        dfs=dict(finish=r['finish_pos'], start=r['start_pos'], lapsLed=r['laps_led'], incidents=r['incidents'], fastest=bool(r['fastest_lap']),
                 parts=[['Finish position', r['dfs_finish']], ['Place differential', r['dfs_place_diff']], ['Laps led', r['dfs_laps_led']],
                        ['Fastest lap', r['dfs_fastest_lap']], ['Incidents', r['dfs_incidents']], ['Clean race bonus', r['dfs_clean']]])))
add(SR,'sr_dfs','Highest DFS Score in a Race','pts',dfs,fmt='dfs',note='Click a driver to see how the points were scored.')

CR = 'Career'
def career(f, minstarts=0):
    return [dict(id=cid, value=f(rs), detail=None) for cid, rs in by.items() if len(rs) >= minstarts]
for key, title, f in [
  ('c_starts','Most Starts',lambda rs: len(rs)), ('c_wins','Most Wins',lambda rs: sum(r['finish_pos']==1 for r in rs)),
  ('c_pod','Most Podiums (Top 3)',lambda rs: sum(r['finish_pos']<=3 for r in rs)), ('c_t5','Most Top 5s',lambda rs: sum(r['finish_pos']<=5 for r in rs)),
  ('c_t10','Most Top 10s',lambda rs: sum(r['finish_pos']<=10 for r in rs)), ('c_poles','Most Poles',lambda rs: sum(r['start_pos']==1 for r in rs)),
  ('c_led','Most Laps Led',lambda rs: sum(r['laps_led'] for r in rs)), ('c_fl','Most Fastest Laps',lambda rs: sum(r['fastest_lap'] for r in rs)),
  ('c_polewin','Most Wins From the Pole',lambda rs: sum(r['finish_pos']==1 and r['start_pos']==1 for r in rs)),
  ('c_dom','Most Dominant Wins (Led at Least Half the Race)',lambda rs: sum(r['finish_pos']==1 and r['laps_led']*2>=r['race_laps'] for r in rs)),
  ('c_chase','Most Chase Wins',lambda rs: sum(r['finish_pos']==1 and r['chase'] for r in rs)),
  ('c_nowin_led','Most Laps Led Without a Win',lambda rs: sum(r['laps_led'] for r in rs) if not any(r['finish_pos']==1 for r in rs) else None),
  ('c_nowin_starts','Most Starts Without a Win',lambda rs: len(rs) if not any(r['finish_pos']==1 for r in rs) else None),
  ('c_dnf','Most DNFs',lambda rs: sum(r['dnf'] for r in rs)),
]:
    add(CR,key,title,'',career(f), holders=key not in ('c_dnf','c_nowin_led','c_nowin_starts','c_starts') or key=='c_starts')
add(CR,'c_avg','Best Career Average Finish','',[dict(id=cid, value=round(sum(r['finish_pos'] for r in rs)/len(rs),2), detail=f'{len(rs)} starts') for cid, rs in by.items() if len(rs)>=30],high=False,note='Minimum 30 starts.',fmt='dec')
add(CR,'c_avgstart','Best Career Average Starting Position','',[dict(id=cid, value=round(sum(r['start_pos'] for r in rs)/len(rs),2), detail=f'{len(rs)} starts') for cid, rs in by.items() if len(rs)>=30],high=False,note='Minimum 30 starts.',fmt='dec')
add(CR,'c_clean','Highest Incident-Free Rate','%',[dict(id=cid, value=round(100*sum(r['incidents']==0 for r in rs)/len(rs),1), detail=f'{len(rs)} starts') for cid, rs in by.items() if len(rs)>=30],note='Minimum 30 starts.',fmt='pct')
add(CR,'c_incavg','Fewest Incidents Per Race','',[dict(id=cid, value=round(sum(r['incidents'] for r in rs)/len(rs),2), detail=f'{len(rs)} starts') for cid, rs in by.items() if len(rs)>=30],high=False,note='Minimum 30 starts.',fmt='dec')

SE = 'Season'
bs = collections.defaultdict(list)
for r in R: bs[(r['cust_id'], r['season'])].append(r)
def seas(f, minstarts=0):
    return [dict(id=cid, value=f(rs), detail=f'Season {s}') for (cid, s), rs in bs.items() if len(rs) >= minstarts]
for key, title, f in [('s_wins','Most Wins in a Season',lambda rs: sum(r['finish_pos']==1 for r in rs)),
  ('s_pod','Most Podiums in a Season',lambda rs: sum(r['finish_pos']<=3 for r in rs)),
  ('s_t5','Most Top 5s in a Season',lambda rs: sum(r['finish_pos']<=5 for r in rs)),
  ('s_t10','Most Top 10s in a Season',lambda rs: sum(r['finish_pos']<=10 for r in rs)),
  ('s_poles','Most Poles in a Season',lambda rs: sum(r['start_pos']==1 for r in rs)),
  ('s_led','Most Laps Led in a Season',lambda rs: sum(r['laps_led'] for r in rs))]:
    add(SE,key,title,'',seas(f))
add(SE,'s_avg','Best Average Finish in a Season','',[dict(id=cid, value=round(sum(r['finish_pos'] for r in rs)/len(rs),2), detail=f'Season {s}') for (cid,s),rs in bs.items() if len(rs)>=14],high=False,note='Minimum 14 starts in the season.',fmt='dec')
add(SE,'s_clean','Cleanest Season (Incident-Free Rate)','%',[dict(id=cid, value=round(100*sum(r['incidents']==0 for r in rs)/len(rs),1), detail=f'Season {s}') for (cid,s),rs in bs.items() if len(rs)>=14],note='Minimum 14 starts in the season.',fmt='pct')
winners = collections.defaultdict(set)
for r in R:
    if r['finish_pos']==1: winners[r['season']].add(r['cust_id'])
seasonwin = ranked([dict(id=None, name=f'Season {s}', value=len(v), detail=', '.join(sorted(NAME[c] for c in v))) for s, v in winners.items()])
cats.append(dict(tab=SE, key='s_winners', title='Most Different Winners in a Season', unit='winners', note=None, fmt=None, holders=False, entries=seasonwin))

TK = 'Tracks'
bt = collections.defaultdict(list)
for r in R: bt[(r['cust_id'], r['track'])].append(r)
add(TK,'t_wins','Most Wins at a Single Track','wins',[dict(id=cid, value=sum(r['finish_pos']==1 for r in rs), detail=t) for (cid,t),rs in bt.items()])
add(TK,'t_avg','Best Average Finish at a Single Track','',[dict(id=cid, value=round(sum(r['finish_pos'] for r in rs)/len(rs),2), detail=f'{t} · {len(rs)} starts') for (cid,t),rs in bt.items() if len(rs)>=4],high=False,note='Minimum 4 starts at the track.',fmt='dec')
tracks = []
for t in sorted({r['track'] for r in R}):
    rs = [r for r in R if r['track']==t]
    per = collections.defaultdict(list)
    for r in rs: per[r['cust_id']].append(r)
    ent = [dict(id=cid, value=sum(r['finish_pos']==1 for r in v), detail=f"{len(v)} starts · avg finish {sum(r['finish_pos'] for r in v)/len(v):.1f}", sort=(sum(r['finish_pos']==1 for r in v), -sum(r['finish_pos'] for r in v)/len(v))) for cid, v in per.items() if any(r['finish_pos']==1 for r in v)]
    ent.sort(key=lambda e: e['sort'], reverse=True)
    for e in ent: e.pop('sort')
    for n, e in enumerate(ent): e['rank'] = 1 + next(j for j, x in enumerate(ent) if x['value']==e['value'])
    cut = ent[min(2,len(ent)-1)]['value'] if ent else 0
    races_n = len({(r['season'],r['round']) for r in rs})
    tracks.append(dict(track=t, races=races_n, type=rs[0]['track_type'], winners=len({r['cust_id'] for r in rs if r['finish_pos']==1}), entries=[e for e in ent if e['value']>=cut][:6]))
debut = [dict(id=cid, detail=span(rs[0],rs[0])+f" · {rs[0]['track']}") for cid, rs in by.items() if rs[0]['finish_pos']==1]

holders = collections.defaultdict(list)
for c in cats:
    if not c['holders']: continue
    for e in c['entries']:
        if e['rank']==1 and e.get('id'): holders[e['id']].append(c['title'] + (f" ({e['detail']})" if c['tab'] in (SE,) and e.get('detail') else ''))
json.dump(dict(asOf=dict(season=LAST[0], race=LAST[1]), races=len(races), names={str(k): v for k, v in NAME.items()},
    categories=cats, tracks=tracks, debutWinners=debut, holders={str(k): v for k, v in holders.items()}),
    open(f'{ROOT}/records_data.json','w'), separators=(',',':'))
print(len(cats),'categories;', len(tracks),'tracks;', 'as of', LAST)
for c in cats[:12]: print(c['title'], [(NAME.get(e['id'],e.get('name')), e['value'], e['rank']) for e in c['entries']])
