# Wormhole Mode Polish — Changelog

Every patch produced in this chat session, in order. Five iterations.
Each row shows the baseline it applied to and the visible commit it
landed as in the repo (where applicable).

| # | Patch | Baseline | Landed as | Status |
|---|---|---|---|---|
| 0 | (audit only — no code) | `eec65c0` | — | superseded |
| 1 | `wormhole-polish.patch` | `eec65c0` | `0b953a8` | ✓ landed |
| 2 | `wormhole-polish-2.patch` | `0b953a8` | `5ee071e` | ✓ landed |
| 3 | `wormhole-polish-3.patch` | `5ee071e` | `aecf027` | ✓ landed |
| 4 | `wormhole-polish-4.patch` | `aecf027` | `4714b4d` | ✓ landed |
| 5 | `wormhole-polish-5.patch` | `4714b4d` | — | this patch |

---

## 0 · Audit pass (no code)

Output: `WORMHOLE_POLISH_AUDIT.md` — diagnosis only, no edits.

Identified five core problems before any code was written:
1. Mono running at one size (.62rem) for seven different roles
2. Sans body running ~one notch hot with no clear small/default/lede ladder
3. `REFERENCE` H2 redundancy on every level page (kicker + H2 both saying "Reference")
4. State values on Switchboard subordinate to their labels (whisper-emphasis)
5. Buttons using two registers without a clear taxonomy

---

## 1 · `wormhole-polish.patch` — initial system pass
**Applied:** `eec65c0` → committed as `0b953a8`
**Files:** 12 files / +368 / −151

### CSS (`wormhole-dark.css`)
- Added named **type-ladder tokens**: 4 mono tiers (`--wh-mono-eyebrow-sm`, `eyebrow`, `data`, `chip`) + 6 sans tiers (`micro`, `body`, `prose`, `lede`, `value`, `value-strong`) + `--wh-strong-weight`
- Routed every existing scattered literal `font-size: .62rem` / `.94rem` / `.66rem` etc. through these tokens
- Mobile clamps tightened: H1 `9vw→7.5vw`, cinematic `13vw→10.5vw`, H2 `7vw→6.2vw`, panel padding floor `18px→22px`
- New `.button--form` rule + auto-target selectors for `.utility-form button`, `.switch-add-row button`, `.command-input-row button`, `.law-form button`, `.peak-form button`, `.three-part-form button`, `.ledger-item__actions button` — form submits no longer use page-action italic
- New `.standing-decree-list` rule (display-italic Cormorant for declarations on Level 08)
- New `.law-block` rule (kicker-led architectural law container, replaces unstyled `<h4>`)
- New `.module-note` micro sans tier
- New `.lead-term` inline pattern for prose with leading-word emphasis
- Reference row keys went from sans-bold-cap (loud) to terminal mono (calm)
- Reference paragraph leading tightened: max-width `48rem→42rem`, line `1.44→1.36`
- State emphasis: `.state-on / .status-active / .status-complete / .status-ready` got weight + full-opacity color + hairline left-accent on rows containing them
- Span-stack inside row values: `seq-body > span { display: block }` system-level fix, with mini-state inline-flex exception
- `<strong>` weight reduced from 620 to 560 globally

### HTML (per-page changes)
- **Reference H2 redundancy collapsed** on every level page. Kicker `REFERENCE` stays; H2 becomes the actual subject (`Access Event`, `System Definition`, `Save Protocol Active`, `Seat Above the Seat`, `Sovereign Codex Active`, `Render Confirmation Active`, `Root Install`, etc.)
- All-bold paragraph wrappers removed across Levels 06, 07, 09, 10
- Quote noise → `<code>` on Levels 06, 07 (commands wrapped properly)
- Standing decrees on Level 08: `<p><strong>...</strong></p>` wall → `.flat-list.standing-decree-list`
- Architectural laws on Level 08: `<h4>Law 01</h4>` → kicker-led `.law-block`
- Form labels: `<span class="status-label">` misuse → proper `<label>` (Levels 04 and 05)
- Daily Run "Breach" / "Open Firewall" got `class="button button--hot"`
- Level 01 Save Receipt got `class="button button--form"`

### Light CSS / Lab JS / other modes
- Untouched

---

## 2 · `wormhole-polish-2.patch` — corrective targeted fixes
**Applied:** `0b953a8` → committed as `5ee071e`
**Files:** 3 files / +116 / −19

### What was wrong from polish-1
- Reference row eyebrows ended up smaller than Operation seq-labels (`.62rem` vs `.68rem` — same role, two sizes)
- Switchboard state-name (`Abundance`) was in row-key style (small mono), making the actual item read smaller than the eyebrow label `STATE` above the panel
- Reference paragraph spacing still felt too wide (line-height tightened, but `<p> + <p>` margin stayed at default 1em-each)
- "THE SEAT ABOVE THE SEAT" wrapped cramped in the row-key column
- Mid-paragraph `<strong>Signals:</strong>` on Level 09 read as a bold lump
- Command Line live-message status row was missing the `status-value` class so the message rendered unstyled

### Fixed
- **Row-key tokens unified at `.68rem` `--wh-mono-eyebrow-*`**: all row-key contexts (sequence, state, reference, flat, status, ledger) speak one size and one warm-bronze color
- **Switchboard variant** `.state-card .state-table .state-row`: state-name reads as readable sans item, ON reads as strong mono badge. Row geometry inverted so the state name leads. Plus the row-active accent suppressed under `.state-card` (every row is on, so the accent had no signal value)
- Reference paragraph margins zeroed; controlled 10px gap re-added between sibling paragraphs and table↔paragraph boundaries
- Reference flat-row column widened: `minmax(8.4rem, .30fr)` → `minmax(9.2rem, .34fr)`
- `<strong>Signals:</strong>` → `<span class="lead-term">Signals</span>`
- Command Line: `status-value` class added to the live message; reordered so live status sits right under the input, not below templates
- Light CSS: untouched

---

## 3 · `wormhole-polish-3.patch` — row-key vs eyebrow inversion fix
**Applied:** `5ee071e` → committed as `aecf027`
**Files:** 1 file / +47 / −33

### What was wrong from polish-2
The user said: row keys are still too small and too quiet, eyebrows are bigger than they should be — backwards.

I had been routing row keys through the same `--wh-mono-eyebrow-*` token as page kickers, treating them as a single tier. They're different roles: kickers are panel metadata (quiet), row keys are content peers to their value (need presence).

### Fixed
- Added `--wh-mono-rowkey-*` token tier (separate from eyebrow): `.76rem / weight 800 / .08em tracking`
- Row keys (`.seq-label / .state-label / .reference-key / .status-label / .flat-row > strong / .ledger-item__meta`) consume rowkey tokens with `color: var(--wh-text)` (full ivory)
- Operation-card seq-label and reference-section row-keys both use the new tier
- Levels directory: dropped italic (per user instruction at the time — later reverted)
- Gateway hero: removed `min-height: clamp(340px, 52vh, 640px)` so hero sizes to content
- Light CSS: untouched

---

## 4 · `wormhole-polish-4.patch` — corrective hierarchy pass
**Applied:** `aecf027` → committed as `4714b4d`
**Files:** 3 files / +91 / −36

### What was wrong from polish-3
- Row keys at `.76rem / 800 / full-ivory` outpunched H3 italic Cormorant. "DO NOT MANIFEST" and "DO NOT HEAL" read as command badges louder than the H3 above them. Documentation hierarchy crushed.
- Reference body at `.94rem` competed with the now-loud row keys
- "Gate level..." support copy still oversized — sharing the lede tier
- Gateway H1 cinematic `clamp(3.4rem, 8.5vw, 6.8rem)` made Gateway feel like a different species from the rest of the system
- Hero rhythm equidistant (kicker→H1→lede→buttons all ~22px apart) — no grouping
- Level directory was reverted to roman in polish-3 because user said "it was serif" — actually they wanted italic serif preserved (later this got mis-re-flipped)
- Seal Declaration read different because its operation-card has no `.sequence` element — the page reads as loose prose where every other operation page reads as structured rows

### Fixed
- Row-key tokens dialed back: `.70rem / 760 / .09em / --wh-label` (warm bronze, not full ivory). Still bigger than eyebrow-sm but no longer outweighs H3
- H3 bumped: `clamp(1.18rem, 2vw, 1.55rem) weight 600` → `clamp(1.28rem, 2.15vw, 1.65rem) weight 620`. Italic Cormorant now visibly leads row keys
- Reference prose tier: `.94rem` → `.88rem`
- New `--wh-sans-support-*` token tier (`.86rem / 1.42 line / weight 430`); `.support-copy` split off from `.lede` rule and consumes the new tier
- Reference kicker margin-bottom: `8px` → `4px` (kicker hugs H2 as one unit)
- Gateway: dropped `class="identity--hero"` from HTML so it uses the standard `.identity` panel like every other page
- Levels directory: italic restored (later instruction said this was wrong; corrected in polish-5)
- New `.operation-card--ceremonial` modifier: paragraphs inside get the divider rhythm a sequence card has (top-border between siblings, opening prose at sans-value scale). Applied to Level 10
- Light CSS: untouched

---

## 5 · `wormhole-polish-5.patch` — eyebrow specificity + alignment + roman directory
**Applies to:** `4714b4d`
**Files:** 1 file / +51 / −7

### What was wrong from polish-4
- Eyebrows (`SYSTEM MAP`, `STRUCTURE`, `INTERFACE`) rendered different sizes despite using the same `.kicker / .panel-kicker` rule. Root cause: `.reference-section p` set elsewhere has higher specificity (class + element) than `.panel-kicker` alone (single class), so kickers inside reference panels inherited prose size (.88rem) instead of eyebrow size (.62rem)
- Daily Run mini-state-list rows rendered flush-inline (`AbundanceON / MagnetismON`) because `.mini-state-list > .mini-state { display: inline-flex }` overrode the row-grid. Plus each `.mini-state` was its own grid, so column widths varied per row — ON badges didn't line up across rows even with grid restored
- Levels directory was italic Cormorant; it should be roman Cormorant (upright)

### Fixed
- **Eyebrow specificity**: kicker rule expanded with scoped variants (`.identity > .kicker`, `.panel > .kicker`, `.reference-section > .kicker`, `.operation-card > .kicker` plus `.panel-kicker` versions of each). All eyebrows now genuinely render identical mono `.62rem / 800 / .14em / --wh-kicker` color across every panel context
- **Mini-state column alignment**: `.mini-state-list` becomes the grid container with `grid-template-columns: minmax(7.5rem, max-content) minmax(0, 1fr)`. Each `.mini-state` becomes `display: contents` so its `<span>name</span><b>ON</b>` children flow into the parent grid as cells. Result: column-1 width is shared across all rows, so every ON badge sits at the same x-position
- **Levels directory**: `font-style: italic` → `font-style: normal` (roman Cormorant)
- Light CSS: untouched
- HTML: untouched

---

## Net effect after all five patches

**Token system added:** 4 mono tiers (eyebrow-sm, eyebrow, rowkey, data, chip — actually 5), 6 sans tiers (micro, body, prose, lede, support, value/value-strong), strong weight token.

**Reusable classes added:**
- `.button--form` (form-submit register)
- `.standing-decree-list` (single-cell flat-list variant)
- `.law-block` (kicker-led law container)
- `.module-note` (micro sans tier)
- `.lead-term` (inline lead-word emphasis)
- `.operation-card--ceremonial` (operation-card without a sequence grid)

**HTML patterns standardized across all level pages:**
- Reference panels: kicker + actual subject H2 (no more `Reference / Reference` redundancy)
- All-bold paragraphs unwrapped
- Command quote noise → `<code>`
- Standing decrees → flat-list pattern
- Form submits classified

**System-level fixes that flow through automatically:**
- Mini-state alignment via parent-grid pattern
- Switchboard state inversion via `.state-card` scope
- Reference span-stack via `seq-body > span { display: block }`
- Eyebrow specificity insurance via scoped kicker selectors
- Form button auto-targeting via `.utility-form button` etc.

**Files NOT touched anywhere across all five patches:**
- `wormhole-light.css` (theme overrides only — every change flows through theme tokens defined in both)
- `wormhole-lab.js`
- Anything outside `_experiments/wormhole-mode/`

**No PASS blocks. No bottom-of-file override piles. No page-specific selectors.** Every fix is at the shared-pattern level so a fix on one page applies everywhere the pattern is used.
