# V11 Plain Utility Replacement

This pass replaces the visible page templates instead of stacking CSS overrides.

## Intent

- Plain masculine utility interface.
- No Space Age display typography.
- No oatmeal beige wash.
- No hero-card theater.
- No card-inside-card reference sections.
- Mobile-first rows, dividers, controls.

## Replaced

- `assets/css/protocol.css`
- `index.html`
- `overview.html`
- `levels.html`
- `custom.html`
- all `levels/level-*.html`

## Acceptance

Run:

```bash
grep -n "action-grid\|action-card\|daily-run-console\|legacy-content" index.html levels/level-01-gateway.html levels/level-04-switchboard.html levels/level-05-command-line.html
```

The command should return nothing for these rebuilt pages.
