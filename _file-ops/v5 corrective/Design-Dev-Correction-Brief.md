# V5 Design / Dev Correction Brief

## Problem

V4 improved the CLI direction but still overused red, made command rows too uniform, and left several migrated cards with collapsed inline text. The public level pages also used redundant `Explication` plus `Explanation` language.

## Correction

- Green becomes the brand/display color for H1, H2, and the site brand.
- Red is reserved for semantic danger/breach states only.
- Console rows use mono for system labels and UI text for spoken/readable command body.
- Remaining rule and step groups are converted into structured grid rows.
- Level reference headings are cleaned: `Reference` + page-specific title.

## Acceptance Criteria

- H1, H2, and brand display text render green.
- Red appears only in breach/danger contexts, not general labels or buttons.
- Command sequence text no longer appears as one same-font block.
- Save State, Command Line, Location, and Render Confirmation rule stacks no longer run together.
- No level page says both `Explication` and `Explanation`.
