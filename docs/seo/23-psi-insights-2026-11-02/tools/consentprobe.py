"""Cookie banner region check: local host vs the live host name.
python -I consentprobe.py PORT
Live-host cases serve https://arrowbin.com from the local server and answer
the trace themselves; every other outside request (GA, Clarity...) is aborted."""
import sys
from playwright.sync_api import sync_playwright
port = sys.argv[1]
cases = [
    ("localhost, Berlin", f"http://localhost:{port}/", "Europe/Berlin", None),
    ("localhost, New York", f"http://localhost:{port}/", "America/New_York", None),
    ("arrowbin.com, New York, edge says DE", "https://arrowbin.com/", "America/New_York", "DE"),
    ("arrowbin.com, Berlin, edge says US", "https://arrowbin.com/", "Europe/Berlin", "US"),
]
with sync_playwright() as p:
    b = p.chromium.launch()
    for label, url, tz, loc in cases:
        ctx = b.new_context(timezone_id=tz, viewport={"width": 1280, "height": 800})
        pg = ctx.new_page()
        traces, errors = [], []
        pg.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
        def route(r, _req=None, loc=loc):
            u = r.request.url
            if "/cdn-cgi/trace" in u:
                traces.append(u)
                if loc: return r.fulfill(status=200, body=f"ip=1.2.3.4\nloc={loc}\n")
                return r.continue_()
            if u.startswith("https://arrowbin.com/"):
                resp = r.request.frame.page.request.fetch(f"http://localhost:{port}/" + u[len("https://arrowbin.com/"):], headers={"sec-fetch-dest": r.request.headers.get("sec-fetch-dest", "empty")}, max_redirects=0)
                return r.fulfill(response=resp)
            if u.startswith(f"http://localhost:{port}/"):
                return r.continue_()
            return r.abort()
        pg.route("**/*", route)
        pg.goto(url, wait_until="load")
        pg.mouse.move(400, 300)
        pg.wait_for_timeout(5000)
        region = pg.evaluate("sessionStorage.getItem('ab-consent-region')")
        shown = pg.locator('[aria-labelledby="cookie-consent-title"]').count() > 0
        print(f"{label:40s} banner={shown!s:5s} region={region} trace_requests={len(traces)} console_errors={[e for e in errors if 'ERR_FAILED' not in e][:2]}")
        ctx.close()
    b.close()
