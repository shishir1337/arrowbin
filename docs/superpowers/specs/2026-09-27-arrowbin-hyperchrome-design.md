# Arrowbin "Hyperchrome" — brand + homepage revamp

Date: 2026-09-27 · Scope: Phase 1 (identity) + Phase 2 (homepage). Phase 3 = every other route on this system.

## Brief (from the founder)
Modern maximalism, futuristic, creative. Every section unpredictable, each with a "wow" moment. Awwwards-level polish, fully responsive, premium UX.
**Banned:** a dark-theme base, cream/beige, green of any shade, emphasising the two offices, client names in the hero.

## Identity
- **Mark:** a notched arrowhead that reads as a capital **A** (triangular counter cut out), plus one square **bit** in the notch, for "arrow" + "bin(ary)". A single solid shape, so it survives 16px.
- **Wordmark:** lowercase `arrowbin` in Anybody (wide, heavy). Footer uses uppercase ARROWBIN.
- **Favicon/app icon:** ultraviolet rounded tile, white arrowhead, pink bit.

## Colour: light, saturated, no dark bands
| token | hex | role |
|---|---|---|
| frost | `#F1F2F7` | page base (cool, never warm) |
| paper | `#FFFFFF` | cards |
| ink | `#0E0B24` | text only |
| ultra | `#3B2BFF` | primary / colour band |
| plasma | `#FF4DA6` | secondary / colour band |
| sun | `#FFD23F` | highlight / colour band |
| flare | `#FF6B3D` | small accents |
| lilac | `#CFC4FF` | soft fills |

Contrast moments use **saturated colour bands** (ultra, plasma, sun) instead of dark sections.

## Type
- Display: **Anybody** variable (wdth 50–150, wght 100–900). The width axis is animated for kinetic type.
- Body: **Geist**. Labels/meta: **Geist Mono**.

## Motion stack
Lenis (smooth scroll) ↔ GSAP ScrollTrigger (pin/scrub) + SplitText, raw WebGL for the hero, Canvas2D for the arrow field. Custom cursor on fine pointers only. Every effect has a `prefers-reduced-motion` fallback with content fully visible.

## Homepage sequence (each has one signature moment)
0. **Preloader** (once per session): ultraviolet screen, 000→100 counter, mark builds, curtain wipes up.
1. **Hero**: liquid-chrome WebGL gradient that follows the cursor; giant headline whose letters stretch (wdth) as the cursor passes, auto-wave on touch.
2. **Crossed tapes**: two rotated marquees (ultra + plasma) crossing in an X; speed and direction follow scroll velocity.
3. **Manifesto**: a big paragraph where words fill from ghost to ink as you scroll, with inline shape "pills".
4. **Services**: pinned horizontal track of 8 colour panels, each with its own generative art; vertical stack on mobile.
5. **Numbers** (sun band): giant outlined numerals that fill and count up.
6. **Work**: sticky stacking project cards that scale back as the next one lands; "VIEW" cursor.
7. **Process**: an SVG arrow path draws with scroll through 4 steps.
8. **Why (bento)**: live interactive tiles (your-time clock, typing code, tech orbit, weekly-demo calendar).
9. **Testimonials** (plasma band): draggable card deck.
10. **FAQ**: big accordion.
11. **CTA**: a field of hundreds of tiny arrowheads that all point at the cursor; magnetic "Book a call" orb.
12. **Footer**: giant ARROWBIN whose letters expand as it enters.

## Constraints kept
Structural SEO unchanged (metadata, JSON-LD, sitemap, llms.txt, routes). CSP `img-src 'self'` means local images only. Old token names are kept so un-migrated pages stay readable on the light palette until Phase 3.
