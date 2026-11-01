"""Reverse proxy :3401 -> :3400 that delays responses like the live site.

python -I delayproxy.py [DOC_DELAY=0.25] [SUB_DELAY=0.0]

HTML documents wait DOC_DELAY seconds and every other response SUB_DELAY. With
0.25 and 0.06 the first-paint stall seen on arrowbin.com reproduced locally.
"""
import http.client
import sys
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

DELAY = float(sys.argv[1]) if len(sys.argv) > 1 else 0.25
SUB = float(sys.argv[2]) if len(sys.argv) > 2 else 0.0
HOP = {"connection", "keep-alive", "transfer-encoding", "upgrade", "proxy-connection", "te", "trailer"}


class H(BaseHTTPRequestHandler):
    protocol_version = "HTTP/1.1"

    def log_message(self, *a):
        pass

    def do_GET(self):
        self._go("GET")

    def do_HEAD(self):
        self._go("HEAD")

    def _go(self, method):
        c = http.client.HTTPConnection("127.0.0.1", 3400, timeout=60)
        headers = {k: v for k, v in self.headers.items() if k.lower() not in HOP and k.lower() != "host"}
        headers["Host"] = "localhost:3400"
        c.request(method, self.path, headers=headers)
        r = c.getresponse()
        body = r.read()
        ctype = r.getheader("content-type", "")
        if "text/html" in ctype and "_rsc" not in self.path:
            time.sleep(DELAY)
        else:
            time.sleep(SUB)
        self.send_response(r.status)
        for k, v in r.getheaders():
            if k.lower() in HOP or k.lower() == "content-length":
                continue
            self.send_header(k, v)
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        if method != "HEAD":
            self.wfile.write(body)
        c.close()


ThreadingHTTPServer(("127.0.0.1", 3401), H).serve_forever()
