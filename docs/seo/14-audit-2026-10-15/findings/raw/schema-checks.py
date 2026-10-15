import json, re, html as H, subprocess, struct, collections, sys
sys.stdout.reconfigure(encoding='utf-8')
d = json.load(open('ld.json', encoding='utf-8'))


def norm(s):
    s = s.replace('’', "'").replace('‘', "'").replace('“', '"').replace('”', '"').replace('\xa0', ' ').replace('‑', '-')
    return re.sub(r'\s+', ' ', s).strip()


def vis(h):
    h = re.sub(r'<script.*?</script>|<style.*?</style>|<template.*?</template>', '', h, flags=re.S)
    return norm(H.unescape(re.sub(r'<[^>]+>', ' ', h)))


def flat(b, out):
    if isinstance(b, list):
        for x in b:
            flat(x, out)
    elif isinstance(b, dict):
        if '@graph' in b:
            flat(b['@graph'], out)
        else:
            out.append(b)


raw = {n: open('html/%s.html' % n, encoding='utf-8').read() for n in d}
V = {n: vis(raw[n]) for n in d}
nodes = {n: [] for n in d}
for n, b in d.items():
    flat(b, nodes[n])

print('== PHONES / ADDRESS visible (all pages) ==')
for s in ['+880', '01843', '1843', '+1 (813', '813', 'Dhaka', 'St. Petersburg', 'Petersburg', '7901', 'Ste 300', '33702', 'Mohammadpur', '1207', 'Florida', 'Bangladesh']:
    pages = [n for n in V if s in V[n]]
    print(repr(s), len(pages), 'pages', pages[:4])
for n in ['contact', 'home']:
    for m in re.finditer(r'.{40}(1843).{30}', V[n]):
        print(n, 'phone ctx:', m.group(0)); break
    for m in re.finditer(r'.{40}(813).{30}', V[n]):
        print(n, 'phone2 ctx:', m.group(0)); break
for n in ['terms', 'privacy', 'contact']:
    for m in re.finditer(r'.{60}(Arrowbin LLC).{80}', V[n]):
        print(n, 'LLC ctx:', m.group(0)); break

print('== hours visible? ==')
for n in V:
    m = re.search(r'(\d{1,2}(:\d\d)?\s?(am|pm|AM|PM)|business hours|Mon(day)?\s?[-–]\s?Fri)', V[n])
    if m:
        print(n, m.group(0), '|', V[n][max(0, m.start() - 40):m.end() + 40])

print('== BREADCRUMB names vs visible ==')
for n in d:
    for nd in nodes[n]:
        if nd.get('@type') == 'BreadcrumbList':
            items = nd['itemListElement']
            pos = [i['position'] for i in items]
            ok = pos == list(range(1, len(items) + 1))
            bad = [i['name'] for i in items if norm(i['name']) not in V[n]]
            print(n, 'n=', len(items), 'pos ok', ok, 'names not in page:', bad, 'last:', items[-1]['item'])
print('home breadcrumb present:', any(nd.get('@type') == 'BreadcrumbList' for nd in nodes['home']))
print('== home canonical ==')
print(re.findall(r'<link rel="canonical" href="(.*?)"', raw['home']))

print('== speakable selectors ==')
cnt = 0
for n in d:
    for nd in nodes[n]:
        if 'speakable' in nd:
            cnt += 1
            sels = nd['speakable']['cssSelector']
            miss = [s for s in sels if (s.startswith('#') and 'id="%s"' % s[1:] not in raw[n]) or (s == 'h1' and '<h1' not in raw[n])]
            if miss:
                print(n, 'speakable selector missing', miss)
print('speakable on', cnt, 'nodes')

print('== visible dates in posts ==')
months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
fm = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


def pats(y, m, dd):
    mi = int(m) - 1
    out = []
    for nm in (months[mi], fm[mi]):
        out += ['%s %d, %s' % (nm, int(dd), y), '%d %s %s' % (int(dd), nm, y)]
    return out


for n in d:
    if not n.startswith('blog__'):
        continue
    bp = [x for x in nodes[n] if x.get('@type') == 'BlogPosting'][0]
    y, m, dd = bp['datePublished'].split('-')
    y2, m2, d2 = bp['dateModified'].split('-')
    pv = [p for p in pats(y, m, dd) if p in V[n]]
    mv = [p for p in pats(y2, m2, d2) if p in V[n]]
    tm = re.findall(r'<time[^>]*datetime="([^"]+)"[^>]*>(.*?)</time>', raw[n], re.S)
    print(n[6:], 'pub', bp['datePublished'], 'vis', pv[:1], '| mod', bp['dateModified'], 'vis', mv[:1], '| time tags', [(a, re.sub('<[^>]+>', '', b)[:22]) for a, b in tm][:3])

print('== author byline visible ==')
for n in d:
    if n.startswith('blog__'):
        print(n[6:46], 'Shishir' in V[n], 'Md. Shishir Ahmed' in V[n])

print('== service pages vs visible ==')
for n in d:
    if not n.startswith('services__'):
        continue
    sv = [x for x in nodes[n] if x.get('@type') == 'Service'][0]
    h1 = re.sub('<[^>]+>', '', H.unescape(re.findall(r'<h1[^>]*>(.*?)</h1>', raw[n], re.S)[0]))
    offs = [o['itemOffered']['name'] for o in sv.get('hasOfferCatalog', {}).get('itemListElement', [])]
    missoff = [o for o in offs if norm(H.unescape(o)) not in V[n]]
    aud = [a['audienceType'] for a in sv.get('audience', [])]
    missaud = [a for a in aud if norm(a) not in V[n]]
    proc = [x for x in nodes[n] if x.get('@type') == 'ItemList'][0]
    pn = [i['name'] for i in proc['itemListElement']]
    missp = [p for p in pn if norm(p) not in V[n]]
    extra = sorted(set(sv) - {'@context', '@type', '@id', 'name', 'description', 'url', 'provider', 'areaServed', 'serviceType', 'speakable', 'hasOfferCatalog', 'audience'})
    print(n[10:], '| name', sv['name'], '| h1:', norm(h1)[:50], '| offers', len(offs), 'missing', missoff, '| aud', len(aud), 'missing', len(missaud), '| process', len(pn), 'missing', missp, '| desc', len(sv['description']), '| extra keys', extra)

print('== work list vs visible ==')
wl = [x for x in nodes['work'] if x.get('@type') == 'ItemList'][0]
for it in wl['itemListElement']:
    i = it['item']
    print(i['name'], norm(i['name']) in V['work'], i['url'] in raw['work'])

print('== blog index count ==')
cp = [x for x in nodes['blog'] if x.get('@type') == 'CollectionPage'][0]
print(len(cp['hasPart']), 'hasPart; distinct /blog/ links in html:', len(set(re.findall(r'href="(/blog/[a-z0-9-]+)"', raw['blog']))))

print('== about vs visible ==')
for s in ['Founder', 'Md. Shishir Ahmed', 'shishir@arrowbin.com', '2020', 'Lead Engineer', 'linkedin.com/in/md-shishir-ahmed']:
    print(s, s in V['about'] or s in raw['about'])
print('== sameAs links present in page HTML (home/about) ==')
for s in ['github.com/Arrowbin-LLC', 'facebook.com/arrowbinllc', 'instagram.com/arrowbinllc', 'x.com/Arrowbinllc', 'linkedin.com/in/md-shishir-ahmed', 'linkedin.com/company', 'in/arrowbinllc']:
    print(s, s in raw['home'], s in raw['about'])

print('== asset checks ==')
urls = set(['https://arrowbin.com/logo.png', 'https://arrowbin.com/team/shishir-ahmed.webp'])
for n in d:
    for nd in nodes[n]:
        if nd.get('@type') == 'BlogPosting':
            urls.add(nd['image']['url'])
for u in sorted(urls):
    loc = u.replace('https://arrowbin.com', 'http://localhost:3117')
    r = subprocess.run(['curl', '-s', '-o', 'tmp.bin', '-w', '%{http_code} %{content_type} %{size_download}', loc], capture_output=True, text=True).stdout
    b = open('tmp.bin', 'rb').read()
    dims = ''
    if b[:8] == b'\x89PNG\r\n\x1a\n':
        dims = 'png %dx%d' % struct.unpack('>II', b[16:24])
    print(u.replace('https://arrowbin.com', ''), r, dims)

print('== node counts by @type site-wide ==')
print(collections.Counter(nd.get('@type') for n in d for nd in nodes[n]))

print('== #founder duplicate definitions: do values conflict? ==')
for n in ['about', 'blog__saas-development-cost']:
    defs = []

    def walk(o):
        if isinstance(o, dict):
            if str(o.get('@id', '')).endswith('#founder') and len(o) > 2:
                defs.append(o)
            for v in o.values():
                walk(v)
        elif isinstance(o, list):
            for v in o:
                walk(v)
    for nd in nodes[n]:
        walk(nd)
    print(n, len(defs), 'defs')
    if len(defs) > 1:
        a, b = defs[0], defs[1]
        for k in set(a) | set(b):
            if k.startswith('@c'):
                continue
            if a.get(k) != b.get(k):
                print('   differs', k, a.get(k), '|', b.get(k))

print('== required props per type ==')
req = {'Organization': ['name', 'url', 'logo'], 'WebSite': ['name', 'url'], 'ProfessionalService': ['name', 'address'], 'Service': ['name', 'provider', 'description'], 'BlogPosting': ['headline', 'datePublished', 'author', 'image'], 'CollectionPage': ['name', 'url'], 'ItemList': ['itemListElement'], 'FAQPage': ['mainEntity'], 'BreadcrumbList': ['itemListElement'], 'Person': ['name'], 'AboutPage': ['name', 'url']}
bad = 0
for n in d:
    for nd in nodes[n]:
        for k in req.get(nd.get('@type'), []):
            if k not in nd:
                print(n, nd['@type'], 'missing', k)
                bad += 1
print('missing required:', bad)
allj = {n: json.dumps(d[n]) for n in d}
print('placeholder scan:', [(n, m) for n in d for m in re.findall(r'\[[A-Z][A-Za-z ]+\]|[Ll]orem|TODO|example\.com|undefined', allj[n])][:5])
print('pages with http:// in ld:', [n for n in d if 'http://' in allj[n]])
print('relative urls:', [n for n in d if re.search(r'"(url|item|@id)": "/', allj[n])])
print('parse errors:', [n for n in d for b in d[n] if isinstance(b, dict) and '__error__' in b])
