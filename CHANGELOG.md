# Changelog

## v9 corrective pass — basic utility reset

### Changed

- Removed Space Age from the visible UI direction by overriding display typography to the standard UI sans stack.
- Stripped the visual system back toward graphite/chrome utility with only a small ivory warming surface.
- Reframed cards as plain utility panels instead of soft decorative containers.
- Converted Daily Run action cards visually into compact rows.
- Flattened nested reference/legacy content so mobile no longer reads as card-inside-card-inside-card.
- Reduced pill styling and replaced buttons with compact utility controls.

### Fixed

- Reduced the oatmeal/beige visual wash.
- Reduced oversized mobile hero and control scale.
- Reduced visible nesting inside Reference sections.
- Restored semantic color discipline: green for state/success, red for danger/firewall.

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

## v3 corrective pass — page order, typography, public copy

- Moved primary action/command panels to the top of level pages so command sequence appears before explication.
- Rewrote public Overview copy to remove implementation/changelog language.
- Strengthened local display font loading and applied the display face to the brand header.
- Added global spacing rules for migrated label/value patterns to prevent run-ons such as `Do not manifestYou execute` and `SwitchesStanding`.
- Added level action-panel styling for command-first page rhythm.

## v4 corrective pass — CLI/control-panel grammar

- Removed repeated Quick Use boilerplate from level pages.
- Recast primary action panels as console/control surfaces instead of soft editorial cards.
- Removed red gradient cell interiors and flattened panels into a cleaner CLI-style surface.
- Applied the display font to H1 and brand typography.
- Added structured command sequence rows, switchboard rows, key/value rows, and status rows.
- Rewrote Overview and Levels copy toward public protocol language instead of project/change language.


## v5 corrective pass — semantic color and row hierarchy

- Changed brand/display typography color from red to green for H1, H2, and the header brand.
- Restricted red to semantic danger/breach usage instead of general hierarchy.
- Neutralized non-semantic labels, row terms, buttons, borders, and panel rules.
- Reworked command sequence typography so step labels stay mono while spoken command text uses the readable UI font.
- Added structured grid rules for remaining collapsed rows in Command Line, Save State, Location, and Render Confirmation.
- Removed duplicated `Explication` / `Explanation` wording from level reference sections.


## v6 corrective pass — utility console design-system enforcement

### Changed

- Moved Space Age/display typography back to page identity only and set display headers to neutral black/ivory instead of global green.
- Converted the Daily Run action grid into a linear command-console rhythm with rows, dividers, and neutral labels.
- Reworked semantic color usage so green is reserved for `ON`, `ACTIVE`, `READY`, `COMPLETE`, and confirmed/live states.
- Reserved red for breach, denied, unauthorized, and firewall states.
- Neutralized navigation, row numbers, labels, section headings, reference headings, and utility chips.
- Removed duplicate reference headings that repeated the page title inside the Reference section.

### Fixed

- Reduced the Christmas red/green collision by preventing large support-panel display headlines from using semantic colors.
- Fixed inconsistent page-to-page hierarchy by enforcing: page identity, primary operation, status, reference.
- Reduced card-grid/dashboard behavior on Daily Run in favor of a single executable sequence panel.

## v8 corrective pass — mobile de-nesting and utility density

### Changed

- Added mobile-specific de-nesting rules so semantic cards remain on desktop while mobile views flatten inner cards into rows and dividers.
- Reduced mobile hero padding, H1 scale, letter spacing, and page-shell spacing so primary operations appear sooner.
- Converted mobile hero navigation and utility buttons from oversized full-width pills into compact console controls.
- Tightened Daily Run mobile rows without changing the semantic operation-card direction.
- Converted mobile Switchboard rows into a compact state table instead of large nested setting cards.
- Flattened mobile Reference content so inner reference cards become section rows inside one visible shell.

### Fixed

- Reduced card-inside-card nesting on mobile.
- Fixed inflated mobile switch rows, button rows, hero blocks, and reference-card stacks.
- Reduced mobile density problems without changing the v7/v6 semantic-card design direction.

## v11 plain utility replacement

### Changed

- Replaced the patched visual system with a plain mobile-first utility interface.
- Removed visible Space Age/display-font direction from the rebuilt UI.
- Replaced Daily Run dashboard/card grid with a single flat operation sequence.
- Rebuilt all level pages around simple identity, operation, status, reference, and navigation sections.
- Rebuilt Switchboard as a flat state table.
- Rebuilt Command Line as a simple command operation surface.
- Flattened reference sections into blocks and rows instead of nested cards.

### Fixed

- Removed the old `action-grid` / `action-card` homepage structure.
- Removed the obvious card-inside-card nesting from rebuilt level pages.
- Reduced beige/oatmeal visual dominance in favor of graphite/chrome utility.
