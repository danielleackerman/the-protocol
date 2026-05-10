# Wormhole Mode — Audit (read-only)

**Branch:** `experiment/protocol-design-lab`
**HEAD:** `f9839b3d8f5f5fc863e67006fe1d8c96ed5d7ab7` (`f9839b3`)
**Scope:** `_experiments/wormhole-mode/` only. Utility mode untouched.
**Mode:** Audit only. No file edits proposed in this document. No patch.

---

## 1. Executive Summary

Wormhole mode has a usable design intent — editorial serif, mono labels, calm panels, gold/clay tonal palette — but the CSS expressing that intent has fractured into **four sequential override layers stacked inside one file**, plus a near-complete clone of those layers in the light file. The result is a stylesheet where:

- 627 selector lines in `wormhole-dark.css` re-style the same base components two and three times each
- 28 `!important` declarations in dark, 28 more in light, mostly resolving conflicts the file is fighting against itself
- 55 of 56 light-mode design tokens are silently overridden by a duplicate token block lower in the same file
- the most decorated section in the CSS — the level directory — is targeted by an ID (`#preview-levels`) that exists only on the lab/preview page and **does not apply to the live `levels.html`**
- one PASS block tries to retroactively fix the live page using a `.panel.state-card .state-row:has(.utility-link--open[href*="level-"])` selector, which is functionally a second page-specific selector wearing a class disguise
- breadcrumbs are already gone from markup (good) and there is no `.breadcrumb` CSS to clean (also good — that one item is already done)
- the buttons, H1 stack, and H3-vs-row-key hierarchy have each been "fixed" twice — once in the original V1 layer, once in a later PASS block — and the conflicts between them produce the inconsistencies you see on the page

The structural problem is not the visual direction. The visual direction is fine. The structural problem is that **`wormhole-dark.css` is four files concatenated into one, and `wormhole-light.css` is two files concatenated, and neither has had its earlier layer pruned.** Until that's collapsed, every new "fix" lands on top of the override pile and the system gets more brittle, not less.

---

## 2. Design Critique

### Hierarchy

H1, H2, H3 are each defined two or three times, and the second/third declaration wins.

- **H1.** First declared at `dark.css:455` as `clamp(4rem, 12vw, 10rem)` Cormorant serif, line-height `.82`, letter-spacing `-.055em`, with a heavy text-shadow. Re-declared at `dark.css:1125` as `clamp(2.1rem, 4.35vw, 3.95rem)`, line-height `1.06`, no shadow. The cinematic-scale H1 the V1 layer designed (`10rem` ceiling) is dead — the smaller, calmer V2 H1 wins. This is not necessarily wrong but it is unintentional: the file still contains the cinematic styling you can no longer see.
- **H2.** First declared at `dark.css:468` as Cormorant serif, `clamp(2rem, 5vw, 4.2rem)`, **uppercase**, `letter-spacing: -.035em`. Re-declared at `dark.css:1138` as Cormorant **italic**, `clamp(1.75rem, 3.4vw, 2.45rem)`, **`text-transform: none`**. The two declarations contradict each other on case (uppercase vs sentence case), style (roman vs italic), and size. Production wins, but again — contradictory rules coexist in the file, and any new H2 selector with the same specificity has a 50/50 chance of inheriting the wrong one.
- **H3.** First declared at `dark.css:479` as `var(--font-heading)` (Avenir/sans), `.96rem`, weight 800, **uppercase**, `letter-spacing: .08em`. Re-declared at `dark.css:1157` as `.88rem`, `letter-spacing: .01em`, `text-transform: none`. Then **declared a third time** at `dark.css:1902` (PASS block) as `var(--font-display)` (Cormorant), italic, `clamp(1.18rem, 2vw, 1.55rem)`, **with `!important` on every property**. The third declaration is a complete re-design of H3 from scratch — switching font family, italicizing, growing the size by ~50% — and it had to use `!important` because both prior declarations were still in the file fighting it. **This is the single biggest hierarchy clarity win available**, but it currently reads as override soup rather than design.

The H3-vs-row-key complaint in the brief is a direct consequence: row keys (`.seq-label`, `.state-label`, `.reference-key`, `.flat-row strong`) are mono uppercase tracked metadata, and H3 in its **original** form (`dark.css:479`) was *also* mono-ish uppercase tracked metadata. They looked identical because they were styled identically. The PASS block at `1902` corrects this by making H3 an italic Cormorant subsection heading — but the original H3 rule is still in the file at `479`, so the PASS block can only win by force.

### Spacing / rhythm

Three separate places set H1 spacing and they disagree:

- `dark.css:457` — `margin-bottom: 18px`
- `dark.css:1127` — `margin: 0 0 var(--wh-space-4)` (`18px`)
- `dark.css:2052` — `margin-bottom: 10px` (PASS block)

The PASS block at line 2052 is the tightening you actually want for the Gateway hero rhythm. But because it's the *fourth* H1 spacing declaration in the file, every time someone needs to adjust it they have to find which layer they're editing. That's how PASS-block-five gets born.

The Gateway hero rhythm complaint is real but its root is structural, not spacing-tuning:

- **`signal-hero` is a lab-only class.** Every `.signal-hero` rule in `dark.css` (lines 410–428, 1284–1318, 1791–1803) only applies to `wormhole-preview.html`. It does NOT apply to `index.html`, `levels/level-01-gateway.html`, or any production page. The production pages use plain `.identity` for the hero. So the careful Gateway rhythm rules at `dark.css:1297–1318` (`.signal-hero > .kicker { margin-bottom: 28px; }`, `.signal-hero h1 { margin-bottom: 20px; line-height: 1.08; }`, etc.) **never execute on the page where Gateway lives**. This is why Gateway looks equidistant — none of the rhythm rules are reaching it.

The Operation rhythm fix at `dark.css:1376–1410` (`.operation-card`, `.panel:has(.sequence)`) does correctly apply because every operation panel uses the `operation-card` class. That rhythm is plausibly working. The complaint that Operation feels equidistant is more likely about the lede-vs-h2-vs-kicker grouping than about the row block.

### Buttons / actions

Buttons are declared in **four** places:

- `dark.css:536` — original V1 pill: `min-height: 39px`, `border-radius: 999px`, `padding: 9px 14px`, mono uppercase, hover-lifts with shadow + transform
- `dark.css:1234` — PASS attempt #1: `min-height: 2.18rem`, **`border-radius: 4px`**, `box-shadow: none`, font shifts to display italic
- `dark.css:1248` — same PASS, separate rule restating the display-italic font for `.button`/`.page-actions a`/`.prev-next-nav a`
- `dark.css:2015` — PASS attempt #2 (Action Button System): `min-height: 2.05rem`, `padding: .44rem .78rem`, `border-radius: 4px`, display italic — basically a refinement of attempt #1 with slightly different metrics

Net effect: the radius shifts from `999px` → `4px` → `4px`. The font shifts from mono uppercase → display italic. The size shrinks from `39px` → `2.05rem` (~33px). The original pill design is dead but its rule is still there. The button-feel inconsistency between Gateway, Operation footer, and Reference comes from the fact that some places engage the third PASS rule (`.prev-next-nav a` is in the third PASS rule's selector list) while `.command-chip`, `.utility-link`, `.plain-link` end up running with the *mono* override at `2034` rather than the *display italic* override at `2015`. Mono uppercase chips next to display italic buttons in the same row is exactly the inconsistency you flagged.

### Command table

The command table is the cleanest part of the file structurally. The `:has(.sequence)` rule at `dark.css:1378` is doing the heavy lifting and it works: index column quiet (`.62rem` muted), label column mono labelled, body column readable serif-prose. The visual problem there is mostly cascading from the row-key vs H3 collision above, plus a markup inconsistency:

- `index.html` writes status rows as `<div class="seq-row seq-row--status">` inside `.status-strip`
- `levels/level-01-gateway.html` writes them as `<div class="status-row">` inside `.status-strip`
- The PASS block at `dark.css:1498` styles `.status-strip .status-row` and `.status-strip .state-row` but **not** `.status-strip .seq-row--status`

Result: status rows look correct on level pages but inherit the bigger `.seq-row` 3-column grid on `index.html`, where they probably look like full-width sequence rows instead of compact status pairs. This is markup drift, fixable in HTML.

### Reference / documentation

`reference-section` looks like an afterthought because of two stacking decisions:

1. The `.reference-section > .panel-kicker:first-child { display: none; }` rule at `dark.css:1549` hides the "Reference" kicker. So the section opens with H2 "Reference" alone, with no metadata orientation above it. That's a deliberate choice but it removes the rhythm cue the other panels have.
2. The original `dark.css:366` reference-section padding was `clamp(22px, 4vw, 38px)`. The PASS at `dark.css:1546` overrides to `clamp(24px, 3.4vw, 40px)`. Tiny delta but illustrates the same problem: nothing in this file gets defined once.

Reference H3s are now correctly italic-Cormorant subsections (PASS at `dark.css:1557`), but the H2 inside `.reference-section` is the *same* H2 as elsewhere — which means the "Reference" label feels heavier than it should because the global H2 is editorial display Cormorant italic. There's no "this is documentation, treat it quietly" register applied. The fix is a documentation-toned H2 variant that the reference section can opt into via class, not via a private selector.

### Row key vs H3 (the brief's central complaint)

Pre-PASS, the row-key family (`.seq-label`, `.state-label`, `.status-label`, `.reference-key`, `.ledger-item__meta`) all rendered at `.72rem`, weight 900, gold color, tracked `.13em`, mono uppercase (`dark.css:645–657`). H3 in its first declaration (`dark.css:479`) rendered at `.96rem`, weight 800, gold color (via `--wh-heading`), tracked `.08em`, sans uppercase. They lived in adjacent visual registers separated only by ~33% size and a font swap that was barely visible. The PASS block at `1902` separates them correctly:

- H3 → italic Cormorant `clamp(1.18rem, 2vw, 1.55rem)`, sentence case, `letter-spacing: -.012em`
- Row keys → mono `.62rem`, weight 800, tracked `.09em`, uppercase, **muted color**, NOT label-gold

This is the right system. It's just expressed as a forced override instead of as the system itself. Once the original H3 and row-key declarations are removed, the `!important`s become unnecessary.

---

## 3. CSS Architecture Audit

### File-level shape

| File | Lines | `data-skin="signal"` selectors | `!important` count | PASS blocks |
|---|---|---|---|---|
| `wormhole-dark.css` | 2089 | 627 | 28 | 4 |
| `wormhole-light.css` | 458 | 102 | 28 | 4 |

### PASS blocks in `wormhole-dark.css`

Marked by `=========================` banner comments:

| # | Lines | Title | Function |
|---|---|---|---|
| Pre | 1–992 | (untitled, original V1 layer) | full system as first authored |
| 1 | 993–1893 | `WORMHOLE CLEAN STYLE SYSTEM` — "Replacement consolidation: one authority for Wormhole styles" | second full authoring pass; redefines tokens, typography, panels, rows, command table, status strip, reference, level directory, forms, responsive |
| 2 | 1895–1986 | `WORMHOLE GLOBAL H3 / ROW-KEY HIERARCHY FIX` | re-declares H3, row-keys, row values with `!important` to force separation |
| 3 | 1988–2043 | `WORMHOLE ACTION BUTTON SYSTEM` — "Restore compact editorial action buttons globally" | re-declares all action buttons a third time |
| 4 | 2046–2088 | `WORMHOLE H1 STACK RHYTHM` — "Tighten H1-to-support-copy spacing globally" | re-declares H1 margins a third time, plus `h1 + .lede`/`h1 + p` collapse |

Every PASS block is honest in its comment about being a fix layer. None of them deletes the layer it's correcting. That's the "patched instead of designed" feeling.

### PASS blocks in `wormhole-light.css`

| # | Lines | Title | Function |
|---|---|---|---|
| Pre | 1–145 | (untitled, original light token layer) | first set of light tokens |
| 1 | 146–262 | `WORMHOLE CLEAN LIGHT THEME` — "Theme overrides only. Shared hierarchy lives in wormhole-dark.css" | **second full set of light tokens. Silently overrides 55 of 56 tokens from the first block** |
| 2 | 264–355 | `WORMHOLE GLOBAL H3 / ROW-KEY HIERARCHY FIX` | **byte-for-byte duplicate of dark.css PASS #2** |
| 3 | 357–412 | `WORMHOLE ACTION BUTTON SYSTEM` | **byte-for-byte duplicate of dark.css PASS #3** |
| 4 | 415–457 | `WORMHOLE H1 STACK RHYTHM` | **byte-for-byte duplicate of dark.css PASS #4** |

**The H3, button, and H1 PASS blocks are duplicated whole between the two files.** They are not light-specific. They are global structural rules pasted into the light file because that was the fastest way to make them apply when the brain was tired. They use no light-specific colors (the `var(--wh-heading)` etc tokens already adapt). Deleting the duplicates from `wormhole-light.css` would change nothing visible.

### Token duplication inside `wormhole-light.css` (quantified)

Two `html[data-skin="signal"][data-theme="light"]` blocks define the same token namespace:

- Block 1: lines 7–104 — 56 tokens (gold `#a97e32`, gold-hot `#8a5f19`, hero shadows with gold glow)
- Block 2: lines 152–226 — 58 tokens (muted bronze `#8f8778`, gold-hot `#6f675a`, calmer shadows)

Tokens in **both** blocks: 55 (block 2 wins for all of them — the file's "current" light palette is the second block's calmer bronze, not the first block's warmer gold)
Tokens **only** in block 1: 0 unique structural ones (only `--wh-h*` family if anything; trivial)
Tokens **only** in block 2: `--wh-row-divider`, `--wh-row-divider-soft`, `--wh-row-hover` (the row-divider system added in PASS #1)

**Block 1 of `wormhole-light.css` is dead weight.** Removing lines 7–104 plus the related `::after` and `::before` overrides at 106–145 would not change rendering; block 2 already redefines everything. The only reason to keep block 1 around right now is the warmer-gold palette it represents, which the project visibly chose to step away from.

### Page-specific selectors

Live in the file:

- `dark.css:719, 723, 737, 745, 754, 987` — `#preview-levels .state-table`, `.state-row`, `.state-label--link`, `.utility-link--open`. **`#preview-levels` is only present on `wormhole-preview.html`**, which is the lab page. These rules cannot reach the production `levels.html`.
- `dark.css:1502` — `.panel:has(.sequence) .state-row:not(#preview-levels .state-row)`. Negation against the preview ID — page-specific by exclusion.
- `dark.css:1637, 1642, 1658, 1674, 1692, 1858, 1884, 1889` — `#preview-levels .state-row` + `.panel.state-card .state-row:has(.utility-link--open[href*="level-"])`. The second selector is the workaround that actually makes the production levels page render correctly. It hard-codes the assumption that production level rows contain a link whose `href` includes `level-`. This is functionally a page-specific selector wearing a class costume; it targets only the levels directory by string-matching against the URL.
- `light.css:122, 129` — same `#preview-levels` page-specific selectors duplicated in light mode.

The brief's "no `#preview-levels`-style page fixes" rule is presently violated by 14 selectors across both files.

### Lab-only selectors that ship with production

These classes appear only in `wormhole-preview.html` but get full style treatment in `wormhole-dark.css`:

- `.signal-hero` — lines 410–428, 949–951, 1284–1318, 1791–1803
- `.signal-lab-actions` — lines 526–535, 1226–1233, 1994–2005
- `.signal-panel-grid` — lines 334–340, 888–893, 1746–1751
- `.signal-form-block` — lines 612, 678–683, 1699–1713 (this one is also used by 2 production HTML files via the `signal-form-block` class — but these are inside `wormhole-preview.html`)
- `#preview-overview`, `#preview-daily-run`, etc. — the kicker/hero rhythm rules (`.signal-hero > .kicker { margin-bottom: 28px; }`) that the brief asks for

The brief says fix Gateway hero rhythm globally. The current code does fix it — for the lab page. The production Gateway hero (`section.identity` on `levels/level-01-gateway.html`) inherits only the generic `.identity` rules, not the considered hero rhythm.

### Selectors that should be consolidated

| Concept | Currently declared at (dark.css) | Notes |
|---|---|---|
| `h1` typography | 455, 1125, 2052 | Three layers; only the second wins for size, only the third for margin |
| `h2` typography | 468, 1138 | First says uppercase roman, second says sentence-case italic — second wins |
| `h3` typography | 479, 1157, 1902 | Three layers; third wins via `!important` |
| Row-key cluster (`.seq-label`, `.state-label`, etc) | 645, 1168, 1926 | Three layers; third wins via `!important` |
| Buttons (`.button`, `.page-actions a`, etc) | 536, 1234, 1248, 2015 | Four layers; effective rendering is a mash-up of the third and fourth |
| H1 margin | 457, 1127, 2052 | Three values: 18px, 18px, 10px |
| Panel padding | 363, 1107, … | Two layers; second wins |
| Reference-section padding | 367, 1107, 1546 | Three values |
| `.controls`/`.page-actions` flex | 533, 1226, 1994 | Three duplicate flex declarations |
| `.signal-hero` block | 410–428, 1284–1318 | Lab-only target; both layers exist, one is `min-height: 520–860px`, the other `340–640px` |
| `#preview-levels` block | 719–756, 987–991, 1637–1696, 1858–1864, 1884–1892 | Five separate stanzas for one ID |
| Token block (light) | light.css:7–104 vs 152–226 | Two complete palettes; block 2 wins on 55/56 tokens |
| H3/row-key/button/H1 PASS blocks | dark.css 1895–2088 vs light.css 264–457 | Three of four PASS blocks duplicated whole between files |

### `!important` overuse

All 28 `!important`s in `wormhole-dark.css` are concentrated in PASS blocks 2 and 4, plus a handful in 3:

- PASS #2 (H3/row-key fix): 21
- PASS #3 (button system): 0 (this one didn't need them — button selectors had no equally-specific predecessor)
- PASS #4 (H1 rhythm): 0 (same)
- Mobile media queries inside PASS #2: 7

`!important` is being used because the original V1 H3 rule (`dark.css:479`) and the V2 H3 rule (`dark.css:1157`) are still in the file, and the PASS author needed to outrank them without surgery. Once those two are deleted, every `!important` in the H3/row-key fix becomes droppable.

---

## 4. Breadcrumb Audit

### Markup

`grep -rn 'class="breadcrumb"' _experiments/wormhole-mode/*.html _experiments/wormhole-mode/levels/*.html` returns **zero matches**. Verified across all 14 wormhole HTML files (1 root index, 1 levels, 1 overview, 1 custom, 1 bank, 10 level pages, 1 preview). Breadcrumbs have already been removed from markup correctly — *not* hidden via CSS.

### CSS

`grep -n 'breadcrumb' wormhole-dark.css wormhole-light.css` returns **zero matches**. There is no `.breadcrumb` selector to clean. Both files are already clean on this point.

### Conclusion

**No action needed for breadcrumbs.** This item is already done correctly. The brief's concern that breadcrumbs may have "returned" is unfounded as of `f9839b3`. (For reference: the parent branch `main` at `assets/css/protocol-basic.css` does still have a `.breadcrumb` styling rule and breadcrumb markup in its `levels/*.html`, but those files are not in the wormhole-mode tree.)

---

## 5. Style-System Correction Plan

This is the proposed target architecture. **Not** the patch — the patch comes after approval.

### File responsibility split

`wormhole-dark.css` becomes the **structural file**:

- design tokens (`--font-*`, `--wh-radius*`, `--wh-page`, `--wh-space-*`, `--wh-row-*`)
- dark-theme color tokens (`html[data-skin="signal"][data-theme="dark"]` block, single instance)
- base: `*`, `body`, `a`, focus styles, selection
- header / nav / mobile-nav
- layout shell (`.shell`, `.page-shell`, `.layout-two`, etc)
- panels (`.identity`, `.panel`, `.reference-section`)
- typography (h1, h2, h3, kicker, lede, support-copy, p)
- buttons (one declaration set, no PASS layers)
- row/table foundation (`.sequence`, `.flat-list`, `.state-table`, `.reference-table`, `.status-strip` — and their rows)
- operation card / command table
- reference section
- forms
- responsive media queries

**One declaration per concept.** No duplicate token block. No PASS banners.

`wormhole-light.css` becomes a **theme-only file**:

- single `html[data-skin="signal"][data-theme="light"]` token block (the calmer bronze palette, current block 2 of light.css)
- the small handful of light-specific surface adjustments that genuinely need different math from dark (the `.identity::after` divider opacity, the `.signal-hero::before` portal layer's lighter values, input focus glow). Approximately 30 lines, not 458.

No structural rules. No H3 declaration. No button declaration. No H1 declaration. No row-key declaration. Those live in `wormhole-dark.css` and use tokens that the light file flips.

### H1 system

```
font-family:    var(--font-display)   (Cormorant Garamond)
font-size:      clamp(2.1rem, 4.35vw, 3.95rem)
font-weight:    600
font-style:     normal
text-transform: uppercase
letter-spacing: -.028em
line-height:    1.06
margin:         0 0 10px
text-shadow:    none
color:          var(--wh-heading)
max-width:      760px
```

`h1 + .lede`, `h1 + .support-copy`, `h1 + p` get `margin-top: 0` so the support copy hugs the title — this is already what PASS #4 does, just keep it.

Remove the cinematic `clamp(4rem, 12vw, 10rem)` H1 and its `text-shadow`. They aren't in use.

### H2 system

```
font-family:    var(--font-display) italic
font-size:      clamp(1.75rem, 3.4vw, 2.45rem)
font-weight:    600
font-style:     italic
text-transform: none
letter-spacing: -.018em
line-height:    1.04
margin:         0 0 18px
color:          var(--wh-heading)
max-width:      760px
```

One H2, used by every panel's primary section heading. **No `.reference-section h2` variant. No `.operation-card h2` variant.** The panel-kicker provides the meta orientation above; the H2 carries the section name.

If the Reference section needs to feel quieter than Operation, **the panel kicker carries that distinction** (`Reference` vs `Operation`), not the H2 itself. Or introduce an opt-in modifier class `.h2--documentation` (sentence-case, lighter weight, color `var(--wh-copy-strong)` instead of `var(--wh-heading)`) that the reference section H2 uses voluntarily. That keeps the global H2 system intact and gives Reference an explicit tone register.

### H3 system

```
font-family:    var(--font-display) italic
font-size:      clamp(1.18rem, 2vw, 1.55rem)
font-weight:    600
font-style:     italic
text-transform: none
letter-spacing: -.012em
line-height:    1.08
margin-top:     30px         (h2+h3 / lede+h3 / panel>h3:first-child → 18px)
margin-bottom:  14px
color:          var(--wh-heading)
```

This is exactly what PASS #2 already does. The change is: delete the two earlier H3 declarations (lines 479, 1157), keep only this one, and drop every `!important`.

H3 sits between the Cormorant-italic display H2 and the mono row-key. Same family as H2, smaller size, same italic. Visually unmistakable as a subsection heading.

### Kicker / panel-kicker system

```
font-family:    var(--font-mono)
font-size:      .62rem
font-weight:    850
text-transform: uppercase
letter-spacing: .145em
line-height:    1.15
color:          var(--wh-kicker)
margin:         0 0 8px
```

Already correct in PASS #1 (`dark.css:1168`). Just consolidate.

`.panel-kicker.is-danger` keeps its clay color override. That's fine — it's a semantic state modifier, not a page-specific override.

### Support copy / lede system

```
.lede:
  font-family:  var(--font-body)
  font-size:    clamp(.90rem, 1.1vw, .98rem)
  font-weight:  450
  font-style:   normal
  letter-spacing: .003em
  line-height:  1.44
  color:        var(--wh-copy)
  max-width:    42rem
  margin:       0 0 18px
```

The `Gate level: complete the install...` line on level pages already uses `<p class="lede">`. With this style it reads correctly as support copy: clearly secondary to the H2 above it, clearly distinct from the row-keys below it, no possibility of being mistaken for a heading. **No HTML change needed.**

`.support-copy` aliases `.lede`. (Or equivalently, the production HTML stops using `.support-copy` and standardizes on `.lede`, which is what it already does.)

### Row key vs row value system

Row keys (`.seq-label`, `.state-label`, `.reference-key`, `.status-label`, `.flat-row > strong`, `.ledger-item__meta`):

```
font-family:    var(--font-mono)
font-size:      .62rem
font-weight:    800
text-transform: uppercase
letter-spacing: .09em
line-height:    1.2
color:          var(--wh-muted)        (NOT --wh-label, NOT gold — quiet, not decorative)
```

Row values (`.seq-body`, `.state-value`, `.reference-value`, `.status-value`, `.flat-row > :last-child`):

```
font-family:    var(--font-body)
font-size:      .94rem
font-weight:    430
line-height:    1.38
color:          var(--wh-copy)
```

Status state modifiers (`.status-active`, `.status-complete`, `.status-ready`, `.state-on`) keep their `color: var(--wh-copy-strong)` and `border-color: var(--wh-border-active)` semantic emphasis. Danger states (`.status-breach`, `.status-denied`, `.status-firewall`) keep their alert border. These are semantic, not page-specific.

### Command table system

The `:has(.sequence)` declaration in PASS #1 (lines 1376–1491) is correct. Lift it cleanly:

- `.operation-card` and `.panel:has(.sequence)` get the same row treatment (both selectors stay because some panels are operation-cards, some are firewall danger-cards-with-sequences, and both should render the table consistently)
- 3-column grid: `var(--wh-row-index-col)` (2.5ch) / `var(--wh-row-label-col)` (clamp 5.8–7rem) / `1fr`
- index column quiet — `.62rem`, `.78` opacity, mono, tabular-nums, NO chip border, NO gold pill
- label column mono, `.64rem`, weight 900, tracked
- body column readable serif-prose, `clamp(.92rem, 1.18vw, 1rem)`, weight 470
- rows separated by hairline dividers, no rounded card on each row, no per-row shadow

Drop the original V1 row treatment at `dark.css:606–699` (the version that gives every row its own card with a hover lift). That's the chunky-nested-cards problem in the brief.

### Buttons / actions system

One declaration:

```
.button, .page-actions a, .command-chip, .switch-add-row button,
.command-input-row button, .ledger-item__actions button,
.utility-link, .plain-link, .prev-next-nav a {
  min-height: 2.05rem;
  padding: .44rem .78rem;
  border: 1px solid var(--wh-button-border);
  border-radius: 4px;
  background: var(--wh-button-bg);
  color: var(--wh-button-text);
  font-family: var(--font-display);
  font-size: .96rem;
  font-style: italic;
  font-weight: 600;
  letter-spacing: .015em;
  line-height: 1;
  text-transform: none;
  cursor: pointer;
  transition: border-color .18s, background .18s, box-shadow .18s;
}
```

Mono variant for chip-style controls (`.command-chip`, `.utility-link`, `.plain-link`):

```
font-family:    var(--font-mono);
font-size:      .66rem;
font-style:     normal;
font-weight:    850;
letter-spacing: .10em;
text-transform: uppercase;
```

Hot variant (`.button--hot`, `.danger-card .button`, `.seq-row--firewall .button`): `border-color: var(--wh-border-alert)`, `background: var(--wh-hot-button-bg)`. Same shape, different palette.

Remove the V1 pill (`border-radius: 999px`, `min-height: 39px`, mono uppercase). It's superseded.

### Panel / reference system

Three panel families share one base:

- `.identity` — page-top hero panel
- `.panel` — operation card (and its variants `.danger-card`, `.warning-card`, `.navigation-card`, `.state-card`, `.bank-controls`, etc — all just colour-modifier classes)
- `.reference-section` — documentation panel

All three: same border, same radius, same backdrop-filter, same `::before` atmosphere overlay, same `::after` top hairline. Differences live only in semantic modifier classes that change the border/background tokens — `.danger-card { --wh-border-default: var(--wh-border-alert); }` style.

The `.reference-section > .panel-kicker:first-child { display: none; }` rule (current `dark.css:1549`) is a deliberate aesthetic choice. Keep it, but make the choice explicit: the Reference panel uses an inline H2 only, no kicker. That's a documentation register. Worth keeping.

### Level directory system

Replace the `#preview-levels` selectors with a class. The wormhole-mode `levels.html` already uses `<section class="panel state-card">` containing `<div class="state-table">` of `<div class="state-row">` rows. Two paths:

**Option A (zero HTML change):** target the structure that already exists. Drop all `#preview-levels` rules. Use the `.panel.state-card .state-table` selector — that's class-based, works on the production levels page today, requires no markup change.

**Option B (one HTML change, cleaner long-term):** add `class="level-directory"` to the `.state-table` on `levels.html`, and use `.level-directory` as the target selector. Cleaner semantic, no string-matching against `href*="level-"`.

Either option also allows removing the lab-only `#preview-levels` block from the lab page or making the lab page use the same class.

Lab/preview page (`wormhole-preview.html`) is for development. It can adopt the production class names and stop being a special CSS target. Right now the file is the largest source of page-specific CSS in the project.

### Dark / light responsibility split — concrete

`wormhole-dark.css` after consolidation should be approximately:

- 1 token block for `:root` font tokens (~5 lines)
- 1 dark-theme `html[data-skin="signal"][data-theme="dark"]` block (~70 lines)
- 1 `html[data-skin="signal"]` shared structural block: spacing tokens, page width, radius tokens (~20 lines)
- base + header + nav (~150 lines)
- layout + panels (~80 lines)
- typography (h1, h2, h3, kicker, lede, p) — one declaration per element (~80 lines)
- buttons — one declaration set (~40 lines)
- rows + tables foundation (~70 lines)
- operation card / command table specifics (~80 lines)
- reference section specifics (~50 lines)
- forms (~40 lines)
- level directory (~30 lines)
- responsive (~120 lines)

Estimated: ~830 lines instead of 2089. ~60% reduction with no rendering change once the original V1 layer is collapsed into the V2 layer.

`wormhole-light.css` after consolidation should be approximately:

- 1 light-theme token block (~70 lines)
- light-specific surface adjustment overrides where the math genuinely differs from dark (~30 lines)

Estimated: ~100 lines instead of 458. ~78% reduction.

---

## 6. Files That Need Changes

| File | Why |
|---|---|
| `_experiments/wormhole-mode/wormhole-dark.css` | Collapse V1 layer (lines 1–992) into V2 layer (993–1893). Fold PASS #2 (H3/row-key) into the typography section. Fold PASS #3 (buttons) into the button section. Fold PASS #4 (H1 rhythm) into the H1 section. Drop all `!important` after the prior duplicate declarations are removed. Replace `#preview-levels` selectors with `.panel.state-card .state-table`-based or `.level-directory`-based selectors. Decide on `.signal-hero`: either delete (lab-only, not reaching production) or make production hero use it. |
| `_experiments/wormhole-mode/wormhole-light.css` | Delete first token block (lines 7–145). Delete all three duplicated PASS blocks (264–457) — these belong in the dark/structural file as global rules, not in the light file. Keep only the second token block and the light-specific surface adjustments (atmosphere overlay opacity, focus glow, etc). |
| `_experiments/wormhole-mode/index.html` | One markup correction: status-strip currently uses `<div class="seq-row seq-row--status">` (lines 83–89) which inherits the 3-column command-table grid. Change to `<div class="status-row">` to match the level pages and engage the status-strip rule. |
| `_experiments/wormhole-mode/levels.html` | (Optional) add `class="level-directory"` to the `.state-table` to enable the cleaner class-based selector. Skip if going with option A above. |
| `_experiments/wormhole-mode/wormhole-preview.html` | (Optional) replace `id="preview-levels"`, `id="preview-daily-run"`, etc with the production class names so the lab page exercises the real CSS, not its own private styles. Also remove `class="signal-hero"` if Gateway hero rhythm is to be applied via `.identity` directly. |
| `_experiments/wormhole-mode/levels/level-01-gateway.html` through `level-10-seal.html` | **No structural changes required.** The markup is consistent and uses the right class names. Heading hierarchy (h1 / h2 / h2 / h3...h3) is correct on every level page. |
| `_experiments/wormhole-mode/overview.html`, `custom.html`, `bank.html` | No changes required. |
| `_experiments/wormhole-mode/wormhole-lab.js` | No CSS-related changes required. The JS only injects ledger items, theme dataset, and mobile-nav class — no class names that would be affected by the CSS consolidation. |

---

## 7. Proposed Patch Strategy

The patch should be sequenced so each step is independently verifiable. **Not produced in this audit step. This is the proposed sequence for the implementation step that follows audit approval.**

### Step 1 — Cosmetic-equivalent collapse of `wormhole-dark.css`

Smallest risk, biggest cleanup.

- Delete the V1 typography block (lines 448–488: original h1/h2/h3) — superseded by V2 typography (1125–1166) which is already what renders.
- Delete the V1 row-key block (lines 645–657) — superseded by V2 row treatment (1334–1364).
- Delete the V1 button block (lines 536–589) — superseded by V2 button treatment (1234–1281) and PASS #3 (2015–2043).
- Delete the V1 panel base (lines 348–407) where padding/shadow/`::before`/`::after` is overridden by V2 panel base (1100–1122). Keep the V1 declarations that V2 doesn't touch.
- Delete the V1 `.signal-hero` block (410–428) plus its responsive piece (949–951) **OR** move it to apply to `.identity` (and decide whether the cinematic `.signal-hero` is the wormhole-mode hero or not).
- Delete the V1 row-treatment-as-cards block (606–699) — superseded by V2 hairline rows (1334–1374).
- Delete the V1 reference section padding (366–368) — superseded.
- Delete the V1 `#preview-levels` block (719–756, 987–991) — replace with class-based level-directory selector.

**At this point: no PASS blocks have been touched yet, no `!important` changes yet, no rendering change.** File goes from ~2089 lines to ~1400. Pure dead-code removal.

### Step 2 — Fold PASS #2 (H3/row-key) into the typography section, drop `!important`

Once Step 1 has removed the V1 H3 and row-key declarations that PASS #2 was overriding, PASS #2 doesn't need `!important` anymore. Rewrite the H3 rule and row-key cluster as the single declaration in the typography section. Delete the PASS banner.

**Verify visually:** open every page, confirm H3 still reads as italic Cormorant subsection, row keys still read as muted mono uppercase metadata.

### Step 3 — Fold PASS #3 (buttons) into the button section

Same pattern. The button rule at line 2015 is the one rendering. Move it up into the button section, delete the PASS banner.

### Step 4 — Fold PASS #4 (H1 rhythm) into the H1 section

`margin-bottom: 10px` and the `h1 + .lede`/`h1 + .support-copy` collapse rules go into the H1 declaration block. Delete the banner.

### Step 5 — Replace `#preview-levels` with class-based selector

Decide between Option A (`.panel.state-card .state-table`) and Option B (add `.level-directory` class to markup, target that). Option A is zero-HTML-change. Option B is cleaner semantically.

If Option B, the HTML edit on `levels.html` is one attribute. Update `wormhole-preview.html` to match (or remove its `id="preview-levels"` and let it be styled by the same class).

### Step 6 — Collapse `wormhole-light.css`

- Delete lines 7–104 (first token block) and lines 106–145 (the `::after` and `signal-hero::before` overrides that go with that block — they're tuned to the gold palette that block 2 has already abandoned).
- Delete lines 264–457 (the three duplicated PASS blocks). Their content is now in `wormhole-dark.css` as global rules and applies to both themes via the token system.
- Keep lines 152–262 — the calmer-bronze token block, `.site-header` shadow, `.identity::after`/`.panel::after`/`.reference-section::after` divider opacity, `.signal-hero::before` portal layer, `.signal-form-block`/`.ledger-item` inset highlight, input focus glow.

**Verify visually:** toggle theme on every page, confirm light mode still reads as the calmer bronze (current state, unchanged).

### Step 7 — Fix the status-strip markup on `index.html`

Replace `<div class="seq-row seq-row--status">` with `<div class="status-row">` for the three status rows. This makes index.html match the level pages and engage the existing `.status-strip .status-row` styling rather than the 3-column sequence-row grid.

### Step 8 — Optional: bring lab page in line with production

Replace `id="preview-levels"`, `id="preview-daily-run"`, `class="signal-hero"`, `class="signal-lab-actions"`, `class="signal-panel-grid"` in `wormhole-preview.html` with whatever class names production uses. Then remove the corresponding `.signal-*` rules from `wormhole-dark.css` if they no longer have any consumer. The lab page should test the real CSS, not a private fork of it.

### Total expected diff after all steps

- `wormhole-dark.css`: ~2089 → ~830 lines, 0 `!important`, 0 PASS banners, 0 page-specific selectors.
- `wormhole-light.css`: 458 → ~100 lines, 0 `!important`, 0 PASS banners.
- One markup change in `index.html` (status rows).
- Optionally one class-name change in `levels.html` and class/id sweep in `wormhole-preview.html`.

No design-token changes, no font-family changes, no rendering changes on the production pages once the dead-code branches are removed.

---

## 8. Verification Plan

After patch implementation, before merging:

```bash
# 1. Serve the experiment locally
cd <repo-root>
python3 -m http.server 8080

# 2. In a separate terminal — confirm zero PASS banners remain
grep -n '====' _experiments/wormhole-mode/wormhole-dark.css
grep -n '====' _experiments/wormhole-mode/wormhole-light.css
# Expected: empty for both.

# 3. Confirm zero !important remain (or document any that legitimately need to stay)
grep -c '!important' _experiments/wormhole-mode/wormhole-dark.css
grep -c '!important' _experiments/wormhole-mode/wormhole-light.css
# Expected: 0 / 0 (target). Any >0 should be justified inline with a comment.

# 4. Confirm zero page-specific ID selectors remain in CSS
grep -nE 'html\[data-skin="signal"\][^{]*#preview-' _experiments/wormhole-mode/wormhole-dark.css
grep -nE 'html\[data-skin="signal"\][^{]*#preview-' _experiments/wormhole-mode/wormhole-light.css
# Expected: empty. The level directory should be class-based.

# 5. Confirm no breadcrumb regression
grep -rn 'class="breadcrumb"' _experiments/wormhole-mode/
grep -n 'breadcrumb' _experiments/wormhole-mode/wormhole-dark.css _experiments/wormhole-mode/wormhole-light.css
# Expected: empty for all four greps.

# 6. Confirm the light file no longer has duplicate token blocks
grep -nE '^html\[data-skin="signal"\]\[data-theme="light"\] \{' _experiments/wormhole-mode/wormhole-light.css
# Expected: exactly 1 line.

# 7. Visual walkthrough — open each page in dark and light
open http://localhost:8080/_experiments/wormhole-mode/
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
open http://localhost:8080/_experiments/wormhole-mode/wormhole-preview.html
```

### Visual checklist per page

For each page, verify:

- [ ] H1 reads as Cormorant uppercase, calm scale (not the cinematic 10rem version)
- [ ] H2 reads as Cormorant italic sentence-case, one consistent treatment everywhere
- [ ] H3 reads as Cormorant italic, smaller than H2, clearly separated from row-keys
- [ ] Row keys (Switches, Commands, Codex, Clearance, Premise, Identity, Therefore) read as quiet mono uppercase metadata, NOT as headings
- [ ] Row values read as readable serif-prose, clearly more prominent than row keys
- [ ] Page kicker (e.g. `LEVEL 01 / INSTALL COMMAND SEQUENCE`) reads as small mono metadata above H1
- [ ] Gateway hero (`level-01`): kicker → H1 → lede → action buttons reads as a designed stack with clear groupings, not equidistant lines
- [ ] Operation card: panel-kicker hugs the H2 (small gap), H2 has breathing room above the lede, lede has separation from the command table — three distinct rhythm steps
- [ ] Command rows: index column quiet, label mono labelled, body readable; rows separated by hairlines, not nested cards
- [ ] Status rows on `index.html` look like compact label/value pairs (the markup fix) — not full-width sequence rows
- [ ] Level directory on `levels.html`: links read cleanly, level names render as cinematic display rows, "Open" button visually subordinate
- [ ] Reference section on every level page: H2 "Reference" reads as a documentation heading (lighter register than Operation), H3 subsections clearly italic-Cormorant, ref-block rows hairline-separated
- [ ] Buttons on every page: same shape, same radius, same family. No mix of pill + 4px-radius button in the same row.
- [ ] Footer mono uppercase, calm.

### Theme toggle

- [ ] Click the `☼` toggle on each page: every panel, button, row, kicker, value adapts to the calmer bronze light palette. No element should remain in dark-mode color (would indicate a missing token or a hard-coded color in a structural rule).

### Mobile (DevTools at 380px)

- [ ] Header collapses to mobile nav
- [ ] H1 reduces to ~3rem
- [ ] H2 reduces to ~1.85rem
- [ ] Row grids collapse cleanly (status rows: 1 column; sequence rows: 2 columns with index + body)
- [ ] Buttons are tappable size, full-width inside `.controls`/`.page-actions`
- [ ] Level directory rows still work as 1fr / max-content on mobile

### Diff sanity

- [ ] `git diff --stat` shows the deletions are concentrated in `wormhole-dark.css` and `wormhole-light.css` and a small markup change in `index.html`
- [ ] No file outside `_experiments/wormhole-mode/` is touched
- [ ] No font file deleted; `font/space age.ttf`, `font/space age.otf`, `font/Space.txt` untouched

---

## End of audit

No edits have been made to the repo. `f9839b3` is unchanged. Awaiting approval before proceeding to implementation.
