# Precise CSS/HTML Fix List — File by File

## `assets/css/protocol.css`

### Font system

- Added `@font-face` for `ProtocolSpace` using `../fonts/space age.ttf`.
- Added semantic font variables:
  - `--font-display`
  - `--font-ui`
  - `--font-mono`
- Switched utility/interface labels to `--font-mono`.

### Color system

- Tuned light-mode red to a deeper protocol red.
- Tuned dark-mode red to oxblood/garnet:
  - `--color-accent: #a43d49`
  - `--color-accent-dark: #7a2631`
- Reduced heavy filled-red button usage.

### Header/nav

- Kept the sticky header.
- Made nav labels mono and cleaner.
- Active nav state is now light/chrome with red text instead of a red fill.

### Buttons

- Buttons are now chrome/ivory neutral controls with red text.
- `.button--primary`, `.action-link`, `.level-card__link`, and `.page-actions a:first-child` no longer become heavy filled red pills.

### Daily Run

- Added `.daily-run-console`.
- Added `.daily-run__head`.
- Added `.daily-run-actions`.
- Added `.status-bar`.
- Reduced mobile card height and padding.

### CLI/interface formatting

- Added `.line-stack` to force one instruction per line.
- Added `.chip-list` for compact switch fields.
- Added `.command-line` for mono command surface.

### Migrated legacy sections

- Added display and spacing rules for:
  - `.quick-lines`
  - `.quick-switches`
  - `.l2-sequence__status`
  - `[class*="status"]`
  - `.switchboard-grid`
  - `.switch-row`
  - `.switch-row__name`
  - `.switch-row__state`
- Prevented `AbundanceON` and similar collapsed text issues.

### Mobile

- Reduced page hero padding.
- Reduced action-card padding.
- Converted mobile action cards to a compact two-column internal layout: number + content.
- Ensured legacy grids stack cleanly on mobile.

## `index.html`

### Removed

- Removed the large narrating hero structure.
- Removed the duplicate migrated Quick Start Source block.

### Added / changed

- Added compact `daily-run-console` page top.
- Put the five direct sequence actions first.
- Preserved the copy behavior with `id="copyQuickStart"`.
- Converted defaults into a proper stacked line group.
- Converted switches into chip-list formatting.
- Converted command into a mono `code.command-line` block.
- Kept breach as a concise follow-up card.
- Kept explanation links below the action sequence.

## `IMPLEMENTATION_NOTES.md`

- Updated notes to describe the corrective pass.
- Documented that the package references but does not bundle font files.

## `CHANGELOG.md`

- Added a new changelog documenting the v2 corrective pass.

## `_file-ops/v2 corrective/Design-Dev-Correction-Brief.md`

- Added design/dev brief explaining the correction goals and non-negotiables.

## `_file-ops/v2 corrective/CSS-HTML-Fix-List.md`

- Added this precise file-by-file fix list.

## `_file-ops/v2 corrective/Prioritized-Punch-List.md`

- Added commit-order punch list for applying/reviewing the corrective pass.
