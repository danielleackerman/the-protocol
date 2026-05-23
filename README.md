# The Protocol — Pass 01 Deliverable

Content integration pass: Wormhole (6-day sequence) + Age Reversal (5-level protocol).

## What's in this bundle

51 files matching the diff exactly:

- **2 new top-level pages:** `wormhole.html`, `age-reversal.html`
- **11 new subpages:** `wormhole/day-01.html` … `day-06.html`, `age-reversal/level-01.html` … `level-05.html`
- **1 modified CSS:** `wormhole-dark.css` (+36 lines, in-place `.media-block` component)
- **15 modified existing pages:** all 5 top-level pages + all 10 level pages (each +4 lines: 2 new nav items × 2 nav blocks)
- **22 media assets:** 11 MP3s, 6 PDFs, 5 MP4s in `assets/audio/wormhole/`, `assets/docs/wormhole/`, `assets/video/age-reversal/`

## How to apply to your repo

This bundle mirrors the repo's directory structure. To apply:

```bash
# From your active repo root:
cp -r /path/to/the-protocol-pass-01/* .
```

That copies the new files into place and overwrites the 16 modified files
(15 HTML pages + `wormhole-dark.css`) with the new versions.

After copy, verify:

```bash
git status --short
git diff --stat
```

You should see 51 changes matching `pass-01-diffstat.txt`.

## How to preview locally before applying

```bash
cd /path/to/the-protocol-pass-01
python3 -m http.server 8080

# Then open:
# http://localhost:8080/
# http://localhost:8080/wormhole.html
# http://localhost:8080/age-reversal.html
# http://localhost:8080/wormhole/day-01.html
# http://localhost:8080/age-reversal/level-01.html
```

The bundle is self-contained — all media is included, so you can preview
the full site behavior identically to how it will run in the repo.

## What changed in the modified files

Each of the 15 existing HTML files received exactly the same edit:
2 new anchor tags inserted between `Levels` and `Custom` in both
`site-nav` and `mobile-nav`. The is-active state was preserved correctly
per page.

`wormhole-dark.css` received one in-place addition (the `.media-block`
component) just before the existing "Run Sequence cards" comment.
No tokens, colors, or existing rules were modified.

## Files in this folder

- `pass-01.patch` — full unified diff (2,062 lines, applies cleanly with `git apply`)
- `pass-01-diffstat.txt` — file-by-file insertion count
- `pass-01-status.txt` — git status short output

## Alternate apply path: using the patch

If you'd rather apply the diff than copy files:

```bash
cd /path/to/your/repo
git apply /path/to/pass-01.patch
```

Note: the patch contains only text files (HTML + CSS). It does **not**
include the 22 binary media assets — those must be copied from
`assets/` in this bundle.

## Defer to Pass 2

Top nav now has 7 buttons (Overview · Daily Run · Levels · Wormhole ·
Age Reversal · Custom · Bank). It functions correctly but may feel
tight on narrower viewports. The drawer / pop-out redesign is the
intended Pass 2.
