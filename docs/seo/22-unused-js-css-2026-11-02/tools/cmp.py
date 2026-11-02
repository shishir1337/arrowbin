"""Before/after table from two folders of unused.py Lighthouse reports.

python -I cmp.py   (reads cmp-before-m, cmp-after-m, cmp-before-d, cmp-after-d)
Columns: JS transferred, number of scripts, unused JS (raw, from
script-treemap-data), what PageSpeed flags under "Reduce unused JavaScript",
and CSS transferred.
"""
import json,glob,os,sys
def load(d):
    r={}
    for f in glob.glob(d+'/*.json'):
        j=json.load(open(f,encoding='utf8')); a=j['audits']
        items=a['network-requests']['details']['items']
        js=[i for i in items if i.get('resourceType')=='Script']
        css=[i for i in items if i.get('resourceType')=='Stylesheet']
        nodes=(a.get('script-treemap-data',{}).get('details') or {}).get('nodes',[])
        un=sum(n.get('unusedBytes',0) for n in nodes if '/_next/' in n['name'])
        raw=sum(n.get('resourceBytes',0) for n in nodes if '/_next/' in n['name'])
        uj=a['unused-javascript']; flagged=sum(i['wastedBytes'] for i in (uj.get('details') or {}).get('items',[]))
        r[os.path.basename(f).rsplit('-',1)[0]]=dict(perf=round((j['categories']['performance']['score'] or 0)*100),
            jsT=sum(i.get('transferSize',0) for i in js)/1024, jsN=len(js), raw=raw/1024, un=un/1024, flag=flagged/1024,
            cssT=sum(i.get('transferSize',0) for i in css)/1024, tbt=a['total-blocking-time']['numericValue'], lcp=a['largest-contentful-paint']['numericValue']/1000)
    return r
for form in ['m','d']:
    b,a=load(f'cmp-before-{form}'),load(f'cmp-after-{form}')
    print('MOBILE' if form=='m' else 'DESKTOP')
    print(f"{'page':45s} {'JS transfer KiB':>17s} {'JS files':>9s} {'unused JS KiB (raw)':>21s} {'PSI-flagged KiB':>16s} {'CSS KiB':>12s}")
    T=[0,0,0,0]
    for k in sorted(b):
        x,y=b[k],a[k]
        print(f"{k:45s} {x['jsT']:7.1f} -> {y['jsT']:6.1f} {x['jsN']:4d}->{y['jsN']:3d} {x['un']:9.1f} -> {y['un']:7.1f} {x['flag']:7.1f} -> {y['flag']:5.1f} {x['cssT']:5.1f}->{y['cssT']:5.1f}")
        T[0]+=x['jsT'];T[1]+=y['jsT'];T[2]+=x['un'];T[3]+=y['un']
    n=len(b); print(f"{'AVERAGE':45s} {T[0]/n:7.1f} -> {T[1]/n:6.1f} {'':9s} {T[2]/n:9.1f} -> {T[3]/n:7.1f}")
