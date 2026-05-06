# The Protocol — Multi-Page Redesign Implementation Notes

## Current architecture

The site now uses a multi-page static structure:

- `index.html` — Daily Run / Immediate Actions
- `overview.html` — System overview
- `levels.html` — Levels index
- `levels/level-01-gateway.html` through `levels/level-10-seal.html` — individual level pages
- `custom.html` — Custom configuration
- `assets/css/protocol.css` — shared design system and responsive layout
- `assets/js/protocol.js` — theme toggle, mobile navigation, and migrated interactive behavior

## Corrective pass summary

This v2 corrective pass keeps the multi-page architecture but repairs the design flattening from the first redesign pass.

Corrections made:

- Rewired the local Space Age font through `@font-face`.
- Added a real mono/terminal typography layer using a system mono stack.
- Compressed the Daily Run homepage so the sequence starts immediately.
- Removed the duplicate migrated Quick Start block from the homepage.
- Rebalanced accent usage so red primarily lives in text, labels, headings, and numerals rather than heavy filled buttons.
- Changed the dark-mode accent away from bright tomato red toward a deeper oxblood/garnet tone.
- Restored formatting for command lines, switch chips, status lines, quick labels, and switchboard rows.
- Reduced mobile card height and oversized spacing.
- Added a CHANGELOG, correction brief, file-by-file fix list, and prioritized commit punch list.

## Notes

The generated package does **not** include font files. It references the existing repo fonts at:

- `assets/fonts/space age.ttf`

Do not delete the existing font files when applying this patch.

## V3 corrective pass

- Public Overview copy cleaned so it no longer reads like implementation/changelog language.
- Level pages now place the primary action/command panel before explication.
- Header brand font loading strengthened and brand display font applied.
- Migrated label/value spacing corrected to reduce inline run-ons.

## V4 corrective pass

- Converted remaining soft/editorial presentation into a CLI/control-panel grammar.
- Removed repeated Quick Use boilerplate from public level pages.
- Added structured command, key/value, switch, and status row styling.
- Reasserted the display font for H1 and brand use.
- Preserved the multi-page architecture while tightening public page copy.
