# Wormhole Mode — Changelog

## protocol-design-lab polish pass

Targeted fixes to bring the Wormhole experimental pages in line with the
canonical Protocol polish pass. Scope: `_experiments/wormhole-mode/` only.

### Changes

- **Source buttons added** to:
  - Firewall (`https://www.instagram.com/p/DXlyEa_E4LE/`)
  - Save Peak State (`https://www.instagram.com/p/DXttDu5Tmj1/`)
  - Location Protocol (`https://www.instagram.com/p/DXwCTrET1BN/`)
  - Sovereign Codex (`https://www.instagram.com/p/DXyvhbOTg-G/`)
  - Render Confirmation (`https://www.instagram.com/p/DX054hygkmg/`)
  - The Seal (`https://www.instagram.com/p/DX3mlxUAev4/`)
- **Firewall renamed** from "Firewall Command" to "Firewall Protocol"
  (kicker line + operation card heading).
- **Firewall typography enlarged** on the Command Line reference card:
  sub-headings, key/value rows, and Command Authority items now read
  as deliberate interface copy rather than tiny metadata.
- **Seal compact rows implemented** via tightened `.status-strip
  .status-row` padding and leading. Wormhole already used a 2-column
  label/value grid; this reduces excess vertical space without
  disturbing other row types. The same change applies automatically
  to other Wormhole pages using the `.status-strip` pattern.
- **Header subtitle (lede) reduced** a few points globally via the
  shared `--wh-sans-lede-size` token. Affects every Wormhole page.
- **Light-mode dark flash reduced** by:
  - Adding a synchronous inline `<script>` to every Wormhole page's
    `<head>` that reads the stored theme from localStorage and sets
    `data-theme` before first paint.
  - Pinning a solid background color on `html[data-skin="signal"]`
    (light) and `html[data-skin="signal"][data-theme="dark"]` (dark)
    so the very first paint is correct even before CSS variables
    resolve. Dark mode and the toggle are unchanged.

### Files touched

- `_experiments/wormhole-mode/wormhole-dark.css` — new `WH-V1` block
  appended at end of file.
- `_experiments/wormhole-mode/levels/level-03-firewall.html` — rename
  + Source button + theme-init.
- `_experiments/wormhole-mode/levels/level-06-save-state.html` —
  Source button + theme-init.
- `_experiments/wormhole-mode/levels/level-07-location.html` — Source
  button + theme-init.
- `_experiments/wormhole-mode/levels/level-08-sovereign-codex.html` —
  Source button + theme-init.
- `_experiments/wormhole-mode/levels/level-09-render-confirmation.html`
  — Source button + theme-init.
- `_experiments/wormhole-mode/levels/level-10-seal.html` — Source
  button + theme-init.
- All other Wormhole pages (`index.html`, `overview.html`,
  `levels.html`, `custom.html`, `bank.html`,
  `wormhole-preview.html`, and the remaining level pages) — theme-init
  inline script only.
