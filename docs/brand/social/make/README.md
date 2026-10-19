# How the social files are made

The scripts that made week 1's images and reels. For a new week, copy the week 1 scripts, change the content and render.

| Script | Makes |
|---|---|
| `week-01-images.py` | Feed posts (1080×1080 for Facebook, 1080×1350 for Instagram) and stories (1080×1920), as PNG. Fails if any text overflows. |
| `week-01-reels.py` | Reels: one HyperFrames project per reel (HTML + GSAP animation, 1080×1920). |

## Setup (once per computer)

- Python with Playwright (`pip install playwright`, then `playwright install chromium`).
- Node.js 22+ and FFmpeg (`scoop install ffmpeg` on Windows). HyperFrames runs through `npx`, so there's nothing else to install.
- Fonts: the variable `.woff2` files for Anybody, Geist and Geist Mono from Google Fonts (all free, Open Font License), saved as `fonts/anybody.woff2`, `fonts/geist.woff2` and `fonts/geist-mono.woff2`.

## Run

Work in a copy of this folder outside the repo, because the scripts write HTML and render folders next to themselves.

```
python -I week-01-images.py out
python -I week-01-reels.py
npx hyperframes@0.8.176 check projects/reel-01-mvp-cost-per-week
npx hyperframes@0.8.176 render projects/reel-01-mvp-cost-per-week -q high -f 30 -o renders/reel-01-mvp-cost-per-week.mp4
```

Then add a silent audio track (some uploaders reject video with no audio) and export the cover frame:

```
ffmpeg -i renders/REEL.mp4 -f lavfi -i anullsrc=r=48000:cl=stereo -c:v copy -c:a aac -shortest -movflags +faststart REEL.mp4
ffmpeg -ss 2.2 -i REEL.mp4 -frames:v 1 REEL-cover.png
```

HyperFrames is HeyGen's free, open-source HTML-to-video renderer: <https://github.com/heygen-com/hyperframes>.
