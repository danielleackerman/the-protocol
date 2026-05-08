# Wormhole Polish — Implementation Summary

**Branch:** `experiment/protocol-design-lab`
**Baseline HEAD:** `eec65c0c4e308470c4014fd221c583f5d2b57d86`
**Patch file:** `wormhole-polish.patch`
**Verified:** `git apply --check` passes against the exact baseline above.

```bash
git apply --check wormhole-polish.patch
git apply wormhole-polish.patch
```

---

## Exact files changed

```
 _experiments/wormhole-mode/index.html                           |   4 +-
 _experiments/wormhole-mode/levels/level-01-gateway.html         |   5 +-
 _experiments/wormhole-mode/levels/level-02-daily-operation.html |   5 +-
 _experiments/wormhole-mode/levels/level-03-firewall.html        |  11 +-
 _experiments/wormhole-mode/levels/level-04-switchboard.html     |   6 +-
 _experiments/wormhole-mode/levels/level-05-command-line.html    |   6 +-
 _experiments/wormhole-mode/levels/level-06-save-state.html      |   9 +-
 _experiments/wormhole-mode/levels/level-07-location.html        |  11 +-
 _experiments/wormhole-mode/levels/level-08-sovereign-codex.html |  27 +-
 _experiments/wormhole-mode/levels/level-09-render-confirmation.html |   8 +-
 _experiments/wormhole-mode/levels/level-10-seal.html            |  15 +-
 _experiments/wormhole-mode/wormhole-dark.css                    | 412 ++++++++++++++++-----
 12 files changed, 368 insertions(+), 151 deletions(-)
```

**Files NOT touched (per constraint):**
- `_experiments/wormhole-mode/wormhole-light.css` — kept as theme overrides only. Every new structural rule consumes theme tokens (`--wh-text`, `--wh-label`, `--wh-copy`, etc.) that already exist in both light and dark. No light edit was needed.
- `_experiments/wormhole-mode/wormhole-lab.js` — purely behavioral.
- `_experiments/wormhole-mode/levels.html`, `overview.html`, `bank.html`, `custom.html`, `wormhole-preview.html` — markup was already systemic; the CSS changes flow through automatically. Custom form buttons get the form-submit treatment via the new `.utility-form button` selector — no HTML class needed there.
- Any file outside `_experiments/wormhole-mode/`.

---

## CSS sections changed (`wormhole-dark.css`)

All edits are **in place** in the canonical declarations. No PASS blocks. No bottom-appended override piles. No page-specific selectors.

### 1. Type ladder tokens (added)
Added a named token block inside the existing `html[data-skin="signal"]` shared structural tokens block. Three parallel scales:

- **Mono scale:** `--wh-mono-eyebrow-sm`, `--wh-mono-eyebrow`, `--wh-mono-data`, `--wh-mono-chip` (size + weight + tracking each). Replaces the seven roles that all collapsed to `.62rem`.
- **Sans scale:** `--wh-sans-micro`, `--wh-sans-body`, `--wh-sans-prose` (with `--wh-sans-prose-measure: 42rem`), `--wh-sans-lede`, `--wh-sans-value`, plus a `--wh-sans-value-strong-weight: 600` for active state values.
- **Strong global emphasis weight:** `--wh-strong-weight: 560` (down from the previous hardcoded 620), so an all-`<strong>` paragraph reads as accentuated, not as a bold wall.

### 2. Brand sub, kicker, nav, footer (consume tokens)
`.brand__sub`, `.kicker`, `.panel-kicker`, `label > span`, `.site-nav a`, `.theme-toggle`, `.mobile-menu-toggle`, `.mobile-nav a`, `.footer` — all now route through `--wh-mono-eyebrow-sm-*` or `--wh-mono-eyebrow-*` tokens. No hardcoded `.62rem` / `.69rem` / `.7rem`.

### 3. Lede / paragraphs / strong
`.lede`, `.support-copy` consume `--wh-sans-lede-*` tokens. Global `p`, `li` consume `--wh-sans-body-*` tokens. `strong` uses `--wh-strong-weight`.

### 4. Module note (new)
`.module-note` — micro sans tier for the per-section hints on `custom.html` ("Group ON states by life area." etc.). Previously had no styling and fell through to default `p`.

### 5. Button taxonomy (restructured)
Three roles + one urgency modifier:
- **`.button` / `.page-actions a` / `.prev-next-nav a`** — page-action display italic. The signature button.
- **`.button--form`** (new) + auto-targets `.utility-form button`, `.switch-add-row button`, `.command-input-row button`, `.law-form button`, `.peak-form button`, `.three-part-form button`, `.ledger-item__actions button` — sans, weight 600, smaller, calmer. Sits next to inputs without competing.
- **`.command-chip` / `.utility-link` / `.plain-link`** + auto-targets `.template-list button`, `.command-template-list button` — quiet mono chip. So unclassed template buttons in `custom.html` ("Deal closed today." etc.) automatically render as quiet chips, not as italic display buttons.
- **`.button--hot`** — token shift, applies to any of the three. Already engages on `.danger-card` context.

Hover/focus selectors updated to cover all three roles + their auto-targets.

### 6. Row foundation (consume tokens)
Row keys (`.seq-label`, `.state-label`, `.reference-key`, `.status-label`, `.flat-row > strong`, `.ledger-item__meta`) consume `--wh-mono-eyebrow-sm-*` tokens. Row values (`.seq-body`, `.state-value`, `.reference-value`, `.status-value`, `.flat-row > :last-child`, `.ledger-item__text`) consume `--wh-sans-value-*` tokens.

### 7. Span-stack inside row values (system-level fix)
`.seq-body > span`, `.state-value > span`, `.reference-value > span`, `.flat-row > :last-child > span` get `display: block` with a 4px stacking gap. Replaces the implicit-wrap pattern that produced the `AbundanceON` / collapsed-line bugs. Mini-state lists (which intentionally stay inline with `<span>label</span><b>ON</b>`) get an explicit `display: inline-flex` exception.

### 8. State emphasis (the operative payload)
`.state-on`, `.status-active`, `.status-complete`, `.status-ready`, `[aria-pressed="true"]` get `color: var(--wh-text)` (full-opacity ivory, up from the .92-alpha whisper) + `font-weight: var(--wh-sans-value-strong-weight)` + `letter-spacing: .005em`. Palette stays locked — no green/red. Differentiation is weight + ivory text against muted-ivory baseline values.

Plus: rows that *contain* an active-state value get `box-shadow: inset 2px 0 0 var(--wh-border-active)` and `padding-left: 10px`. The Switchboard rows now read as live at a glance, without color hue.

Negative states (`.status-breach`, `.status-denied`, `.status-firewall`, `.status-pending`, `.access-denied`) get the same `font-weight` treatment so they have parity with positive states.

### 9. Operation card sequence (consume tokens)
`.operation-card .seq-index` consumes `--wh-mono-data-*` tokens. `.operation-card .seq-label` consumes `--wh-mono-eyebrow-*` tokens (the calmer .68rem) — no longer a one-off escalation; it's the same row-eyebrow as everywhere else. Body and code consume sans-value tokens.

### 10. Status strip (consume tokens)
`.status-strip .status-label` now uses `--wh-mono-eyebrow-sm-*` tokens (was a special `.58rem` whisper). The strip's secondary register comes from its position; it doesn't need to also whisper smaller.

### 11. Reference section — the big calm-down
`.reference-section .flat-row > strong`, `.reference-section .reference-key`, `.reference-section .state-label` — replaced the loud sans-bold-cap (Avenir Next, .80rem, weight 800) with terminal mono via `--wh-mono-eyebrow-sm-*` tokens. The whole system now speaks one row-eyebrow language across operation-card / state-table / reference-table / flat-list.

`.reference-section p, li` — line-height tightened from `1.44` to `1.36`, max-width tightened from `48rem` to `42rem` via `--wh-sans-prose-*` tokens. Reference reads as documentation, not as floaty editorial.

`.reference-section .ref-block + .ref-block` — margin-top widened from `8px` to `22px` so the now-flatter ref-blocks (no more H3 inside every one of them on most pages) get real separation.

### 12. Standing decree list (new pattern)
`.standing-decree-list .flat-row` — full-width, no row-key column. `.standing-decree-list .flat-row > span` — display Cormorant italic at clamp(1.05rem, 1.5vw, 1.22rem). Replaces the `<p><strong>...</strong></p>` wall on Level 08 with a structured flat-list variant.

### 13. Law block (new pattern)
`.law-block` — replaces `<h4>Law 01</h4>` (which had no system styling and rendered as default browser bold sans, visually outranking H3). The law-block uses a kicker-led structure with proper margin separation.

### 14. Inline chip — palette-aligned
`.inline-chip` — radius from `999px` (pill) to `4px` to match the rest of the chip system. Tokens applied for size/weight/tracking.

### 15. Mobile breakpoints
- `.identity, .panel, .reference-section` padding floor: `18px` → `22px` (gives smaller mobile headings more breathing room)
- `h1` mobile clamp: `clamp(2rem, 9vw, 3.15rem)` → `clamp(1.92rem, 7.5vw, 2.85rem)`
- `h1.h1--cinematic, .identity--hero h1` mobile: `clamp(2.6rem, 13vw, 4.4rem)` → `clamp(2.4rem, 10.5vw, 4rem)`
- `h2` mobile: `clamp(1.62rem, 7vw, 2.2rem)` → `clamp(1.5rem, 6.2vw, 2.05rem)`
- `.reference-section` mobile padding-block: `22px` → `26px`
- Mobile row-eyebrow size now routes through `--wh-mono-eyebrow-sm-size` token (was hardcoded `.58rem` — too small).

---

## HTML / content patterns changed

### Reference H2 redundancy (carefully, not blindly)
Every level page used to ship `<p class="panel-kicker">Reference</p>` immediately followed by `<h2>Reference</h2>` — duplicating the kicker. The CSS comment at `wormhole-dark.css:987` ("the documentation register is carried by the kicker, not by a private H2") said this was wrong from the start.

Pattern applied: **kicker stays as `REFERENCE`. The H2 becomes the actual subject of the first ref-block.** The first H3 — which was duplicating that subject — is dropped. The hierarchy now reads:

```
REFERENCE                  ← kicker (the documentation register)
System Definition          ← H2 (the actual subject of this Reference panel)

(intro paragraphs)
H3: Operator Responsibility
H3: Configuration Principle
...
```

Per-level subject promotions:
- **Level 01 Gateway** → H2 `Access Event`
- **Level 02 Daily Operation** → H2 `System Definition`
- **Level 03 Firewall** → H2 `System Definition`
- **Level 04 Switchboard** → H2 `System Definition`
- **Level 05 Command Line** → H2 `System Definition`
- **Level 06 Save State** → H2 `Save Protocol Active`
- **Level 07 Location** → H2 `Seat Above the Seat`
- **Level 08 Sovereign Codex** → H2 `Sovereign Codex Active`
- **Level 09 Render Confirmation** → H2 `Render Confirmation Active`
- **Level 10 Seal** → H2 `Root Install`

### All-bold paragraph wrappers removed
`<p><strong>entire sentence</strong></p>` patterns across Levels 06, 07, 09, 10 were removed. Where the line carried real ceremonial emphasis (Level 10 "Permission granted.", "The wormhole is now open to enter.", the Welcome close), it's now a `<p class="lede">` so the line gets the lede tier of the type ladder — emphasized, but not the brute-bold pattern.

### Quotation noise → `<code>`
Levels 06 and 07: where the row body *is* the command being said (not commentary about it), the literal smart quotes around the command were removed and the command wrapped in `<code>`. So:
- `"This is a peak."` → `<code>This is a peak.</code>`
- `"Save state. This is the new baseline. Restore here on drift."` → `<code>...</code>`
- `"Save complete. Anchor locked."` → `<code>...</code>`
- The three `<strong>X is the law.</strong>` decree spans on Level 07 → `<code>X is the law.</code>` spans

The visual distinction between "here is the line you say" and "here is what to do" is now carried by the code treatment (mono, tinted bg) rather than by quote marks layered on top of nested strong tags.

### Standing decrees → flat-list pattern (Level 08)
The five `<p><strong>...</strong></p>` standing decrees became a `.flat-list.standing-decree-list` with single-cell rows. The new `.standing-decree-list` pattern renders them as display-italic Cormorant standing rules rather than five bold paragraphs in a row.

### `<h4>Law 01</h4>` → `.law-block` kicker pattern (Level 08)
The H4s that had no system styling (rendering as default browser bold sans, visually outranking H3) became:
```html
<div class="law-block">
  <p class="kicker">Law 01</p>
  <div class="flat-list">...</div>
</div>
```

### Form labels (Level 04, Level 05)
`<span class="status-label">Add Switch</span>` (a misuse of `.status-label` for what was actually a form label) → proper `<label>` wrapper. Same on Level 05 "Input".

### Button classification
- **Daily Run** index.html: "Breach" gets `class="button button--hot"`. The firewall card's "Open Firewall" gets `class="button button--hot"`.
- **Level 01** Save Receipt button: `class="button button--form"` (it's wrapped in `.page-actions`, not a form wrapper, so it needs an explicit class to pick up form-submit treatment).
- **Custom page** form submits and template chips: NO HTML changes needed. The new `.utility-form button` and `.template-list button` selectors catch them automatically — exactly what "system-level" means.

### Level 03 redundant nested status-strip
The `<h3>System Output</h3>` ref-block at the bottom of Level 03's Reference section duplicated the operation-card's status-strip data. Removed. The ref-block was ceremonial duplication, not new information.

### `<br>` → span-stack consistency (Level 02)
Level 02's Defaults row used `<br>` for line breaks; index.html and most other pages used nested `<span>`. Standardized on the span pattern (with the system-level CSS rule that block-displays them).

---

## New reusable classes

| Class | Purpose |
|---|---|
| `.button--form` | Form-submit register: sans, calmer, sits next to inputs. Auto-applied to bare `<button>` inside `.utility-form`, `.switch-add-row`, `.command-input-row`, `.law-form`, `.peak-form`, `.three-part-form`, `.ledger-item__actions`. |
| `.standing-decree-list` | Flat-list variant for declarative single-cell rows (Level 08 standing decrees). Display-italic Cormorant. |
| `.law-block` | Kicker-led architectural law container, replaces `<h4>` pattern. |
| `.module-note` | Micro sans tier for per-section hints (Custom page module descriptions). |

No other new classes. Every other change consumes existing classes and adds tokens.

---

## Verification

### Patch applies against the stated baseline
```
$ git rev-parse HEAD
eec65c0c4e308470c4014fd221c583f5d2b57d86
$ git apply --check wormhole-polish.patch
(no output — clean)
$ git apply wormhole-polish.patch
$ git diff --stat HEAD
 12 files changed, 368 insertions(+), 151 deletions(-)
```

### CSS syntax sanity
- 164 `{` / 164 `}` — balanced.
- 0 undefined `var(--...)` references (all consumed tokens are defined in either `wormhole-dark.css` or `wormhole-light.css`).
- 0 `!important` declarations added.
- 0 PASS blocks added.
- 0 page-specific selectors added (no `#level04...`, no `body.level-page .switchboard ...`, etc.).

### Local preview
```bash
python3 -m http.server 8080
```

Then visit:
```
http://localhost:8080/_experiments/wormhole-mode/index.html
http://localhost:8080/_experiments/wormhole-mode/overview.html
http://localhost:8080/_experiments/wormhole-mode/levels.html
http://localhost:8080/_experiments/wormhole-mode/custom.html
http://localhost:8080/_experiments/wormhole-mode/bank.html
http://localhost:8080/_experiments/wormhole-mode/wormhole-preview.html
http://localhost:8080/_experiments/wormhole-mode/levels/level-01-gateway.html
http://localhost:8080/_experiments/wormhole-mode/levels/level-02-daily-operation.html
http://localhost:8080/_experiments/wormhole-mode/levels/level-03-firewall.html
http://localhost:8080/_experiments/wormhole-mode/levels/level-04-switchboard.html
http://localhost:8080/_experiments/wormhole-mode/levels/level-05-command-line.html
http://localhost:8080/_experiments/wormhole-mode/levels/level-06-save-state.html
http://localhost:8080/_experiments/wormhole-mode/levels/level-07-location.html
http://localhost:8080/_experiments/wormhole-mode/levels/level-08-sovereign-codex.html
http://localhost:8080/_experiments/wormhole-mode/levels/level-09-render-confirmation.html
http://localhost:8080/_experiments/wormhole-mode/levels/level-10-seal.html
```

### Specific things to check after applying

**Switchboard (Level 04):** ON values now read as the operative payload. The whole row gets a hairline left-accent (no green/red). Toggle to light and verify the active rows still differentiate.

**Save State (Level 06) and Location (Level 07):** No more nested quotation marks. The lines you say render in `<code>` (mono, tinted bg) — visually distinct from the commentary lines that follow them.

**Command Line (Level 05):** "Run" is now form-submit (sans, weight 600, smaller). The three template chips quietly read as mono chips. Reference row keys (`Switch / Command / Resolution / Timing`) read as terminal mono, not as sans-bold-cap.

**Custom:** All form buttons (`Add Switch`, `Save Command`, etc.) are sans form-submit register without any HTML class added. Saved-template buttons quietly read as mono chips.

**Sovereign Codex (Level 08):** Standing Decrees no longer a wall of bold paragraphs — they're italic display rules in flat-list rows. Architectural Laws use kickers ("Law 01") instead of unstyled H4s.

**Seal (Level 10):** Ceremonial weight preserved through the lede tier on "Permission granted.", "The wormhole is now open to enter.", and the closing "Welcome." — but no more all-bold-paragraph walls.

**Reference panels everywhere:** `REFERENCE / Reference` redundancy is gone. The kicker says `REFERENCE`; the H2 says the actual subject. Hierarchy preserved.

**Mobile (≤414px):** Headings calmer; panel padding raised to 22px so the heading-to-edge ratio doesn't inflate. Cinematic-hero on Gateway proportionate, not pinned-to-the-edges.

**Light theme:** Toggle on every page. Token-driven changes flow through cleanly. State-on values use full-opacity `--wh-text` which in light is `#14110d` — readable.

---

## What was deliberately NOT changed

- **No edits to `wormhole-light.css`.** Every structural change in `wormhole-dark.css` consumes theme tokens that exist in both. Light theme inherits the polish for free.
- **No edits to `wormhole-lab.js`.** Behavior is unchanged.
- **No edits to `levels.html`, `overview.html`, `bank.html`, `custom.html`, `wormhole-preview.html`.** Their markup was either already correct or the system changes flow through automatically (custom form submits, template chips).
- **No PASS blocks. No bottom-appended override piles.** Every edit is in place in the canonical declaration.
- **No page-specific selectors.** No `#preview-...`, no `body.level-page .switchboard ...`, no string-matching URL selectors.
- **No new state colors.** Palette stays locked. State emphasis is via weight + opacity, not hue.
- **The `font/space age.ttf`** file in the folder remains untouched — it's still not referenced by the CSS (the cleanup pass moved to Cormorant Garamond as the display face). Whether to remove it is a separate housekeeping decision.

---

## If a page still looks wrong after applying

The shared pattern is the lever, not a per-page override. The patterns to inspect, in order:

| Symptom | Pattern responsible |
|---|---|
| Heading scale feels off | type ladder (mono/sans/display tokens) + mobile clamps |
| Row key/value look wrong | `--wh-mono-eyebrow-sm-*` and `--wh-sans-value-*` tokens |
| Command sequence typography | `.operation-card .seq-*` + `<code>` treatment |
| Reference prose feels loose or tight | `--wh-sans-prose-*` tokens (`.36` line, `42rem` measure) |
| Button looks like the wrong register | button taxonomy (`.button` / `.button--form` / `.command-chip`) |
| Form control styling drift | `.utility-form button` auto-target |
| State / value emphasis weak | `.state-on` / `.status-active` / `.status-complete` rule (weight + full-opacity color + row left-accent) |

The fix in every case is at the shared pattern level. There are no page-specific hacks in this patch.
