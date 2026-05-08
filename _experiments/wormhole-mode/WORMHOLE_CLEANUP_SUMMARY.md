# Wormhole Cleanup — Implementation Summary

**Branch:** `experiment/protocol-design-lab`
**Pre-patch HEAD:** `f9839b3d8f5f5fc863e67006fe1d8c96ed5d7ab7`
**Patch file:** `wormhole-cleanup.patch` (apply with `git apply` from repo root)

---

## Exact files changed

```
 _experiments/wormhole-mode/index.html                   |    7 +-
 _experiments/wormhole-mode/levels.html                  |    2 +-
 _experiments/wormhole-mode/levels/level-01-gateway.html |    2 +-
 _experiments/wormhole-mode/wormhole-dark.css            | 1903 +++++++-----
 _experiments/wormhole-mode/wormhole-light.css           |  451 ++--
 _experiments/wormhole-mode/wormhole-preview.html        |    4 +-
 6 files changed, 697 insertions(+), 1672 deletions(-)
```

**Net: −975 lines.** No file outside `_experiments/wormhole-mode/` is touched. Utility mode, parent `assets/css/protocol.css`, parent `levels/*.html`, fonts, and `wormhole-lab.js` are all unmodified.

The 9 production level HTML files (`level-02` through `level-10`) and the support pages (`overview.html`, `custom.html`, `bank.html`) are unmodified. Their thin markup was already correct and the systemic CSS now reaches them without per-page hooks.

---

## Old CSS layers removed

### `wormhole-dark.css` — was 2089 lines, now 1438

Removed:

1. **V1 typography block** (old lines 448–488) — the original H1/H2/H3 declarations that were silently overridden by V2.
2. **V1 row-key block** (old lines 645–657) — the `.seq-label/.state-label/.reference-key/.status-label` cluster styled at `.72rem` gold-label, superseded by the muted-mono treatment.
3. **V1 button block** (old lines 536–589) — the original `border-radius: 999px` pill with `min-height: 39px`, mono uppercase, hover-lift transform.
4. **V1 panel base partial** (old lines 348–407) — the duplicate panel padding and box-shadow rules superseded by V2.
5. **V1 row-as-card block** (old lines 606–699) — the per-row card with rounded corners, inset highlight, and hover transform that produced the "chunky nested cards" feel.
6. **`.signal-hero` lab-only declarations** (old lines 410–428, 949–951, 1284–1318, 1791–1803) — replaced by the systemic `.identity--hero` modifier.
7. **`#preview-levels` block** (old lines 719–756, 987–991, 1637–1696, 1858–1864, 1884–1892) — replaced by the systemic `.level-directory` class.
8. **`.panel.state-card .state-row:has(.utility-link--open[href*="level-"])` selectors** (old lines 1502, 1643, 1659, 1675, 1693, 1859, 1885, 1890) — the page-specific workaround that string-matched URLs. Now superseded by `.level-directory` semantic class.
9. **PASS BLOCK 1** (old lines 993–1893, "WORMHOLE CLEAN STYLE SYSTEM") — its content folded into the canonical typography/panel/row/button/operation-card/reference sections at their correct positions in the file.
10. **PASS BLOCK 2** (old lines 1895–1986, "WORMHOLE GLOBAL H3 / ROW-KEY HIERARCHY FIX") — its 21 `!important` declarations on H3 and row-keys are gone. The H3 italic-Cormorant rule now lives in the typography ladder; the muted-mono row-key rule lives in the row foundation. Both win on natural specificity now that the V1 declarations are deleted.
11. **PASS BLOCK 3** (old lines 1988–2043, "WORMHOLE ACTION BUTTON SYSTEM") — folded into the canonical button section.
12. **PASS BLOCK 4** (old lines 2046–2088, "WORMHOLE H1 STACK RHYTHM") — `margin-bottom: 10px` and the `h1 + .lede` collapse rule are now part of the canonical H1 declaration.
13. **Duplicate hover-lift `transform: translateY(-1px)` rules** on panels, rows, and buttons — removed across the board for the calmer, less twitchy feel.

### `wormhole-light.css` — was 458 lines, now 135

Removed:

1. **First light token block** (old lines 7–104) — the warmer-gold palette with `#a97e32` bronze, `#8a5f19` gold-hot, gold glows. 55 of 56 of its tokens were silently overridden by the second block; only `--wh-h*` tokens survived but were not in active use. Net visual change: zero.
2. **Trailing override scraps for old block 1** (old lines 106–145) — `.identity::after`/`.panel::after`/`.reference-section::after`, `.signal-hero::before`, `#preview-levels .state-row` light overrides, input focus glow override. All tuned to the gold palette that block 2 already abandoned.
3. **PASS BLOCK 1 light** (old lines 146–262, "WORMHOLE CLEAN LIGHT THEME") — content kept; banner removed; merged with the surviving theme overrides as one block at the top of the file.
4. **PASS BLOCK 2 light** (old lines 264–355, H3/row-key fix) — byte-for-byte duplicate of dark.css's PASS #2. Deleted whole. The structural rules now live in `wormhole-dark.css` once and adapt to either theme via `var(--wh-heading)`, `var(--wh-muted)` etc.
5. **PASS BLOCK 3 light** (old lines 357–412, button system) — byte-for-byte duplicate of dark.css's PASS #3. Deleted whole.
6. **PASS BLOCK 4 light** (old lines 415–457, H1 rhythm) — byte-for-byte duplicate of dark.css's PASS #4. Deleted whole.

---

## New style-system sections in `wormhole-dark.css`

The file is now organized in this top-to-bottom order, with one declaration per concept:

| Section | Lines | Purpose |
|---|---|---|
| Header banner & architecture rules | 1–18 | Single source of truth notice |
| Font tokens (`:root`) | 20–25 | Theme-agnostic font stacks |
| Shared structural tokens (`html[data-skin="signal"]`) | 28–58 | Radius, page width, header height, spacing scale, row index/label cols, dividers |
| Dark theme tokens | 61–142 | Full dark palette + atmosphere + shadows + button colors |
| Universal base | 144–192 | Body, links, form-element font inheritance, selection |
| Header / nav / mobile-nav | 194–293 | One declaration set; pill→6px radius nav controls |
| Layout shell | 295–315 | `.shell`, `.page-shell`, `.layout-two`, panel grids |
| Panels | 317–369 | `.identity`, `.panel`, `.reference-section` — single border/radius/atmosphere/hairline definition; `.danger-card` is a token shift only |
| **`.identity--hero` modifier** | 371–414 | Systemic hero rhythm: kicker→H1→lede→actions spacing, replaces `.signal-hero` |
| **Typography ladder** | 416–502 | H1 (calm) / H1 cinematic / H2 (italic display) / H3 (italic display, distinct from row-keys) / kicker / lede / p — each declared once |
| **Action system** | 504–594 | One primary button declaration set, one mono-chip variant, one hot-context modifier — covers `.button`, `.page-actions a`, `.command-chip`, `.utility-link`, `.plain-link`, `.prev-next-nav a`, `.switch-add-row button`, `.command-input-row button`, `.ledger-item__actions button` |
| **Row foundation** | 596–664 | `.sequence`/`.state-table`/`.reference-table`/`.flat-list` etc as grid containers; `.seq-row`/`.state-row`/`.flat-row` etc as hairline-separated rows (no per-row card) |
| Row keys (mono uppercase, muted) | 666–676 | Visually subordinate to H3 |
| Row values (body family, readable) | 678–694 | Carry the explanatory content |
| Semantic state colors | 696–711 | `.state-on/.status-active/.status-complete/.status-ready` strong; `.status-breach/.status-denied/.status-firewall` clay |
| **Operation card / command table** | 713–842 | `.operation-card` and `.panel:has(.sequence)` — index col quiet, label col mono labelled, body col readable, status-strip secondary |
| Reference section | 844–924 | Documentation register: kicker visible (no `display: none`), H2 uses global style, ref-block flattened to plain content groups |
| **`.level-directory` modifier** | 926–966 | Systemic class for chamber lists. Used on `levels.html`, `wormhole-preview.html`, and any future chamber-list page |
| Forms | 968–1019 | Inputs/select/textarea single declaration |
| Custom/Bank generated content | 1021–1053 | `.signal-form-block`, `.ledger-item`, `.empty-state`, `.inline-chip` |
| Footer | 1055–1064 | Mono uppercase calm |
| Responsive 860px | 1067–1102 | Single block, header collapse, sequence row simplification |
| Responsive 640px | 1104–1213 | Single block, all typography rescales here |
| Responsive 390px | 1215–1238 | Narrow-mobile sequence and reference row collapse |

## New style-system sections in `wormhole-light.css`

| Section | Lines | Purpose |
|---|---|---|
| Header banner | 1–13 | "Theme tokens only — structural rules in wormhole-dark.css" notice |
| Light theme tokens | 15–95 | One token block, calmer-bronze palette, includes row-divider tokens that the dark file doesn't override |
| Light-specific surface math | 97–135 | `.site-header` shadow, `::after` divider opacity, `.identity--hero::before` lighter portal layer, `.signal-form-block`/`.ledger-item` and input inset highlights, focus glow |

That's the entire light file. Zero structural rules. Zero PASS blocks. Zero duplicate token blocks.

---

## HTML changes (only the four approved edits)

```html
<!-- 1. _experiments/wormhole-mode/index.html — fix status-strip semantic markup -->
<!-- BEFORE -->
<div class="seq-row seq-row--status">
  <span class="seq-index seq-index--blank" aria-hidden="true">00</span>
  <span class="seq-label">Status</span>
  <span class="seq-body"><span class="status-value status-ready">Ready</span></span>
</div>
<!-- AFTER -->
<div class="status-row">
  <span class="status-label">Status</span>
  <span class="status-value status-ready">Ready</span>
</div>

<!-- 2. _experiments/wormhole-mode/levels/level-01-gateway.html — apply systemic hero modifier -->
<!-- BEFORE -->
<section class="identity">
<!-- AFTER -->
<section class="identity identity--hero">

<!-- 3. _experiments/wormhole-mode/levels.html — apply systemic level-directory class -->
<!-- BEFORE -->
<div class="state-table">
<!-- AFTER -->
<div class="state-table level-directory">

<!-- 4. _experiments/wormhole-mode/wormhole-preview.html — replace lab-only signal-hero with systemic class; add level-directory -->
<!-- BEFORE -->
<section class="identity signal-hero" id="preview-daily-run">
<div class="state-table">
<!-- AFTER -->
<section class="identity identity--hero" id="preview-daily-run">
<div class="state-table level-directory">
```

The `id="preview-levels"` and `id="preview-daily-run"` on the lab page are kept as in-page anchor link targets (the lab nav scrolls to them) but no longer carry styling. Styling now comes from `.identity--hero` and `.level-directory`.

---

## How to verify breadcrumbs are gone

```bash
# In repo root, on branch experiment/protocol-design-lab with patch applied:

# 1. No breadcrumb markup in any wormhole HTML
grep -rln 'class="breadcrumb"' _experiments/wormhole-mode/
# Expected output: empty

grep -rln 'breadcrumb' _experiments/wormhole-mode/*.html _experiments/wormhole-mode/levels/*.html
# Expected output: empty

# 2. No breadcrumb selector in either CSS
grep -n 'breadcrumb' _experiments/wormhole-mode/wormhole-dark.css _experiments/wormhole-mode/wormhole-light.css
# Expected output: empty

# 3. Confirm nothing was hidden via display:none either
grep -nE '\.breadcrumb|\.crumb' _experiments/wormhole-mode/*.css
# Expected output: empty
```

All three commands return empty after the patch is applied. Breadcrumbs are removed at the markup layer, not hidden via CSS — and there is no breadcrumb CSS to remove (the cleaned files never had any).

---

## How to preview locally

```bash
# 1. Apply the patch and serve
cd <repo-root>                       # repo at f9839b3 on experiment/protocol-design-lab
git apply wormhole-cleanup.patch
python3 -m http.server 8080

# 2. Open the wormhole-mode tree in a browser
open http://localhost:8080/_experiments/wormhole-mode/

# 3. Walk the production pages
open http://localhost:8080/_experiments/wormhole-mode/index.html
open http://localhost:8080/_experiments/wormhole-mode/overview.html
open http://localhost:8080/_experiments/wormhole-mode/levels.html
open http://localhost:8080/_experiments/wormhole-mode/levels/level-01-gateway.html
open http://localhost:8080/_experiments/wormhole-mode/levels/level-04-switchboard.html
open http://localhost:8080/_experiments/wormhole-mode/levels/level-05-command-line.html
open http://localhost:8080/_experiments/wormhole-mode/levels/level-08-sovereign-codex.html
open http://localhost:8080/_experiments/wormhole-mode/levels/level-10-seal.html
open http://localhost:8080/_experiments/wormhole-mode/custom.html
open http://localhost:8080/_experiments/wormhole-mode/bank.html

# 4. The lab page (now exercising the systemic classes, not its own private CSS)
open http://localhost:8080/_experiments/wormhole-mode/wormhole-preview.html
```

### What to verify visually

- **Gateway** (`/levels/level-01-gateway.html`): hero panel is taller than other levels (`.identity--hero` engaged), H1 reads at the cinematic scale (`clamp(3.4rem, 8.5vw, 6.8rem)`), kicker→H1→lede→actions are grouped in a designed stack, not equidistant.
- **Other level pages** (`level-02` through `level-10`): hero is calm and compact (plain `.identity`), H1 at standard scale.
- **Daily Run** (`index.html`): status row reads as a compact "Status / Ready" label/value pair beneath the operation sequence, NOT as a 3-column command-table row.
- **Levels directory** (`/levels.html`): chamber names render as italic-Cormorant display rows, "Open" buttons aligned right, hairline dividers — the systemic `.level-directory` styling applies.
- **Reference panels** on every level page: kicker "Reference" is visible above the H2, the H2 uses the same global style as Operation H2s (no private Reference variant), H3 subsections (`Access Event`, `System Definition`, `Operating Difference` etc) read clearly as italic-Cormorant subsection headings, distinct from the mono-uppercase row keys (`Premise`, `Identity`, `Therefore`, etc).
- **Theme toggle** (☼ button): every page adapts to the calmer-bronze light palette, no element retains a dark-mode color.

---

## Verification checklist (machine)

```bash
cd <repo-root>/_experiments/wormhole-mode

# zero PASS banners
grep -n '====' wormhole-dark.css wormhole-light.css
# expected: empty

# zero !important
grep -c '!important' wormhole-dark.css   # expected: 0
grep -c '!important' wormhole-light.css  # expected: 0

# zero page-specific ID selectors targeting #preview-* in CSS
grep -nE 'html\[data-skin="signal"\][^{]*#preview-' wormhole-dark.css wormhole-light.css
# expected: empty

# light file has exactly one token block
grep -nE '^html\[data-skin="signal"\]\[data-theme="light"\] \{' wormhole-light.css
# expected: exactly 1 line

# no signal-hero class in any production or lab markup
grep -rln 'signal-hero' *.html levels/*.html
# expected: empty

# breadcrumb removal still holds
grep -rln 'breadcrumb' . | grep -v inventory
# expected: empty

# CSS braces balance
node -e "const f=require('fs');for(const p of ['wormhole-dark.css','wormhole-light.css']){let d=0;for(const c of f.readFileSync(p,'utf8'))if(c==='{')d++;else if(c==='}')d--;console.log(p,d===0?'✓':'UNBALANCED '+d)}"
# expected: both ✓
```

All checks pass on the patched tree.
