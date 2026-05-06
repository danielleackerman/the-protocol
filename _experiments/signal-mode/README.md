# Signal Mode Lab

This folder is an isolated experiment for building a v0-inspired Signal visual skin on top of the current Utility HTML structure.

## Isolation rule

Do not edit or import production files for this lab pass:

- `index.html`
- `levels/*.html`
- `assets/css/protocol.css`
- `assets/js/protocol.js`

The lab files live only in:

```txt
_experiments/signal-mode/
```

## Files in this pass

- `SIGNAL_STYLE_SPEC.md` — design authority copied from the provided Signal Mode style spec and normalized to the requested filename.
- `signal-preview.html` — isolated preview page using copied/representative Utility sections.
- `signal-dark.css` — shared experimental structure plus Signal Dark variables and dark skin rules.
- `signal-light.css` — Signal Light variable overrides and light skin adjustments loaded after `signal-dark.css`.
- `README.md` — this file.

## What was copied or represented from Utility

The preview preserves the production Utility class vocabulary and page structure patterns:

- `site-header`, `site-header__inner`, `brand`, `site-nav`, `mobile-nav`, `header-actions`
- `shell`, `page-shell`, `identity`, `kicker`, `lede`, `controls`, `page-actions`
- `panel`, `operation-card`, `danger-card`, `navigation-card`, `state-card`, `bank-controls`
- `sequence`, `seq-row`, `seq-index`, `seq-label`, `seq-body`
- `status-strip`, `status-row`, `status-label`, `status-value`
- `reference-section`, `ref-block`, `flat-list`, `flat-row`
- `state-table`, `state-row`, `state-label`, `state-value`, `utility-link`
- `switch-add-row`, `command-input-row`, `template-list`, `command-chip`
- `bank-filter-grid`, form labels, inputs, selects

## What is experimental only

The following are Signal-only design experiments:

- black/cyan/magenta transmission background in dark mode
- pale cyan/pink glass atmosphere in light mode
- glass panel surfaces and inner rows
- outlined/glowing display H1 treatment
- cyan active borders and controlled signal glow
- magenta/red danger and hot-action accents
- preview-only dark/light selector
- local fragment links instead of production page links
- inline preview script for theme switching and mobile menu testing

## Font note

The v0 source included Space Age font assets. Font files are intentionally not included in this lab export. The CSS uses a display stack beginning with `Space Age`, then falls back to other futuristic/system fonts if the font is not available in the local repo.

## Production migration note

Do not wire this into the live site yet. The next safe step is visual review in `_experiments/signal-mode/signal-preview.html`, then a separate integration plan after the Signal skin is approved.
