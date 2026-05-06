# Design/Dev Correction Brief — The Protocol v2 Corrective Pass

## Problem statement

The first multi-page redesign correctly solved the architecture problem, but it flattened the interface language. The site became structurally better but visually too generic: missing font hierarchy, missing mono/terminal layer, red-filled buttons, overlarge Daily Run cards, and migrated legacy sections with collapsed text/chip spacing.

## Design intent

Keep the multi-page architecture, but restore the feeling of a refined protocol console:

- cleaner than the original single-page build
- still slightly CLI / terminal / operator-facing
- gray chrome + ivory surfaces
- red as text/hierarchy/accent, not giant button fill
- dark mode red should feel oxblood/garnet, not tomato/coral
- Daily Run should be fast-action first, explanation second

## Non-negotiables

1. Do not return to the old giant accordion page.
2. Do not make the homepage a narration page.
3. Do not let action text collapse inline.
4. Do not make every important control a filled red button.
5. Do not remove the existing fonts from `assets/fonts/`.
6. Do not flatten all chamber-specific interface fragments into generic cards.

## Implemented correction strategy

### Typography

- Added `@font-face` for the existing Space Age font.
- Added semantic font tokens:
  - `--font-display`
  - `--font-ui`
  - `--font-mono`
- Applied mono typography to:
  - breadcrumbs
  - kickers
  - utility labels
  - status bars
  - command lines
  - switch states
  - nav labels
  - buttons

### Daily Run

- Rebuilt the top of `index.html` as a compact console.
- Removed the duplicate migrated Quick Start source block.
- Kept the five main actions at the top.
- Kept copy behavior through `#copyQuickStart`.
- Added compact chip/stack formatting for defaults, switches, command, and receipt lines.

### Color and buttons

- Red now functions primarily as text hierarchy.
- Buttons are now neutral chrome/ivory with red text and accent borders.
- Dark mode red is deeper and less tomato-like.

### Legacy/migrated content

- Added specific CSS for:
  - `.quick-lines`
  - `.quick-switches`
  - `.switch-row`
  - `.switch-row__state`
  - `.command-line`
  - status/message stacks
  - chip lists
- Restored spacing and grouping for migrated content without rebuilding every level page by hand.

## Quality target

The corrected UI should feel like:

- fast to use
- calm but not bland
- operational
- slightly terminal
- readable on mobile
- visually warmer than pure gray
- less flattened than the first redesign pass
