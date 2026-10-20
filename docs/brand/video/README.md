# Arrowbin brand film: "Stuck at 99%"

A 53-second brand video for winning leads. It opens on a progress bar frozen at 99%, the moment every founder burned by a developer recognises. The bar resets, then climbs through how Arrowbin works (a reply within one business day, a free 30-minute call, a fixed estimate within a week, working software every Friday), hits 100% at "launch", and ends on "Book a free call" at arrowbin.com.

| File | Use it for |
|---|---|
| `arrowbin-brand-film-9x16.mp4` | Facebook / Instagram Reels and Stories (1080×1920) |
| `arrowbin-brand-film-9x16-cover.png` | Reel thumbnail |
| `arrowbin-brand-film-16x9.mp4` | Website, YouTube, LinkedIn, the Facebook feed (1920×1080) |
| `arrowbin-brand-film-16x9-cover.png` | YouTube / LinkedIn thumbnail |
| `arrowbin-brand-film-caption.txt` | Post caption for both versions. Keep the sound-effects credit line at the end (three effects are CC BY 4.0). |
| `arrowbin-brand-film.en_US.srt` | Timed English captions (SRT) for both versions: upload as a caption/subtitle file on YouTube, Facebook or LinkedIn (the `.en_US` suffix is the language code Facebook reads from the file name). Same audio timing in 9:16 and 16:9, so one file fits both. |
| `arrowbin-brand-film-transcript.txt` | Plain-text transcript, for platforms that ask to "upload text transcript" (.txt); they sync it to the audio themselves. |

## How it was made

- HyperFrames (HeyGen's open-source HTML-to-video renderer), product-launch-video workflow, on a design spec taken from the live arrowbin.com.
- Voice: HeyGen studio voice "Jonah". Music: a licensed track from HeyGen's library (22b1685a), started 1.6s in so its build lands on step 1 and its ending lands on the logo, ducked under the voice. About 50 sound effects, each timed to its on-screen moment.
- Audio normalised to about -14 LUFS for social platforms.
- Every promise in it is the site's own wording; no client names or numbers.

The editable HyperFrames projects (frames, audio, storyboard, script) are outside the repo at `C:\tmp\brand\arrowbin-promo` (9:16) and `C:\tmp\brand\arrowbin-promo-16x9` (16:9).

## Next time

The founder's notes on this one: a punchier first-second hook, and even tighter editing and audio. See the note in Claude's project memory (`video-quality-bar`).

# Service video 1, custom software: "Copy. Paste. Repeat."

A 55-second glassmorphism promo for the custom software service, the first of the one-service-per-video series. It opens on four glass keycaps slamming CTRL+C / CTRL+V on the beat ("That's not a workflow. That's a hostage situation."), shows orders, customers and a spreadsheet typed twice, cracks the windows on "the tools are wrong", then snaps them into one glass dashboard on the music's drop. It closes on what we build, 6 to 12 weeks, zero seat fees, 100% code ownership, "from $8,000" with a fixed estimate, and "Book a free call" at arrowbin.com.

| File | Use it for |
|---|---|
| `arrowbin-custom-software-9x16.mp4` | Facebook / Instagram Reels and Stories (1080×1920) |
| `arrowbin-custom-software-9x16-cover.png` | Reel thumbnail ("NOT A WORKFLOW.") |
| `arrowbin-custom-software-16x9.mp4` | Website, YouTube, LinkedIn, the Facebook feed (1920×1080) |
| `arrowbin-custom-software-16x9-cover.png` | YouTube / LinkedIn thumbnail |
| `arrowbin-custom-software-caption.txt` | Post caption for both versions. The music/SFX credit line is optional (Pixabay Content License). |
| `arrowbin-custom-software.en_US.srt` | Timed English captions for both versions (same audio timing in 9:16 and 16:9). |
| `arrowbin-custom-software-transcript.txt` | Plain-text transcript for "upload text transcript" (.txt) fields. |

## How it was made

- HyperFrames, product-launch-video workflow. The edit is locked to the music's 140 BPM grid: the four key slams land on beats, the windows snap into the dashboard on the drop, and the final chord lands on the logo.
- Voice: Kokoro `af_heart` (Apache 2.0, generated locally). Music: "Energetic Upbeat Future Bass" by BombinSound, and about 34 sound effects, all from Pixabay (Pixabay Content License: commercial use allowed, no attribution required, no YouTube Content ID claim on the track).
- The music ducks under the voice. The mix is mastered to about -14 LUFS, true peak about -1 dBFS.
- The end card uses the brand app icon exactly as `src/app/icon.svg` draws it (solid Ultraviolet tile, white arrowhead, Plasma bit).

The editable projects are outside the repo at `C:\tmp\brand\cs-copy-paste` (9:16) and `C:\tmp\brand\cs-copy-paste-16x9` (16:9).
