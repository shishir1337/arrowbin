# How the social files are made

How week 1's images and reels were made. For a new week, copy the image script, change the content and render; make reels with the workflow below.

| Script | Makes |
|---|---|
| `week-01-images.py` | Feed posts (1080×1080 for Facebook, 1080×1350 for Instagram) and stories (1080×1920), as PNG. Fails if any text overflows. |
| Reels | Made with the HyperFrames **faceless-explainer** workflow (see below), not a script in this folder. |

## Reels

Reels are narrated explainers built with HyperFrames' faceless-explainer workflow (the HyperFrames skills are installed in Claude Code):

1. A script and storyboard from one blog article: hook in the first two seconds, one idea per scene, facts only from the article.
2. Voiceover with the local Kokoro voice `af_heart` (or HeyGen voices after `npx hyperframes auth login`), word timings from Parakeet, music from local MusicGen, sound effects from Openverse.
3. Arrowbin's colours and fonts on the creative-mode frame preset; content stays inside the Reels safe area (x 72–1008, y 250–1170).
4. No word-by-word caption strip: the scenes already show the key words.
5. Audio normalised to -14 LUFS; CC BY sound effects credited in the reel's caption.

The HyperFrames project for reel 1 (frames, audio, storyboard) is kept outside the repo at `C:\tmp\v1` (a short path, because the 260-character Windows path limit breaks HyperFrames snapshots and renders in deep folders).

## Setup (once per computer)

- Python with Playwright (`pip install playwright`, then `playwright install chromium`).
- Node.js 22+ and FFmpeg (`scoop install ffmpeg` on Windows). HyperFrames runs through `npx`, so there's nothing else to install.
- Fonts: the variable `.woff2` files for Anybody, Geist and Geist Mono from Google Fonts (all free, Open Font License), saved as `fonts/anybody.woff2`, `fonts/geist.woff2` and `fonts/geist-mono.woff2`.

## Run

Work in a copy of this folder outside the repo, because the scripts write HTML and render folders next to themselves.

```
python -I week-01-images.py out
```

HyperFrames is HeyGen's free, open-source HTML-to-video renderer: <https://github.com/heygen-com/hyperframes>.
