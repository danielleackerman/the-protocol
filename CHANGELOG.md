# Changelog

## v2 Corrective Pass — Typography, Daily Run, and CLI Recovery

### Fixed

- Fixed local display font loading by adding `@font-face` for the existing Space Age font.
- Added a true terminal/mono typography layer for labels, status text, command lines, breadcrumbs, and utility UI.
- Fixed run-on text issues in Daily Run and migrated legacy sections by restoring block/stack/chip formatting.
- Fixed switchboard rows so names and `ON` states no longer collapse together.
- Fixed mobile action cards that were taking too much vertical space.
- Fixed Level 10 mobile stacking through the shared responsive legacy-content rules.
- Fixed dark-mode red, replacing the bright tomato tone with a deeper oxblood/garnet accent.

### Changed

- Compressed `index.html` into a true immediate-action Daily Run page.
- Removed the duplicate migrated Quick Start block from the homepage.
- Shifted button styling from red-filled buttons to neutral chrome/ivory controls with red text accents.
- Rebalanced hierarchy so red primarily appears on headings, labels, numerals, and interface text.
- Reduced oversized hero spacing across pages.
- Added sharper CLI/console styling without turning the site into a fake hacker interface.

### Added

- `CHANGELOG.md`
- `_file-ops/v2 corrective/Design-Dev-Correction-Brief.md`
- `_file-ops/v2 corrective/CSS-HTML-Fix-List.md`
- `_file-ops/v2 corrective/Prioritized-Punch-List.md`

### Preserved

- Multi-page static structure.
- Existing level content and migrated interactive logic.
- Existing font files in `assets/fonts/` are referenced but not bundled in the generated package.
