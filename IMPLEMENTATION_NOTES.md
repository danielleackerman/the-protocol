# The Protocol — Multi-Page Redesign Implementation

Generated static site from the prior single-page accordion build.

## Changed structure

- `index.html` is now Daily Run / Immediate Actions.
- `overview.html` explains the system at a high level.
- `levels.html` replaces the old accordion stack with a level index.
- `levels/level-01-gateway.html` through `levels/level-10-seal.html` hold full level content.
- `custom.html` holds Custom Personal Configuration.
- `assets/css/protocol.css` contains the chrome / ivory / red visual system.
- `assets/js/protocol.js` contains theme toggle, mobile menu, and migrated interaction logic.

## Design notes

- No giant accordion stack remains as the main information architecture.
- Every deeper page has a Back to Daily Run path.
- Level pages have previous / next navigation.
- Light/dark theme is persisted with `localStorage`.
- Font assets from the source archive were intentionally not bundled in this generated download.

## Suggested commit message

`feat: redesign protocol as multi-page daily-run system`
