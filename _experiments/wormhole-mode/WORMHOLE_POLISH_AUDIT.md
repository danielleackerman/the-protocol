# Wormhole Mode — Design Polish Audit

**Branch:** `experiment/protocol-design-lab`
**HEAD inspected:** `eec65c0c4e308470c4014fd221c583f5d2b57d86` (`fix(wormhole): clean up mode style system`)
**Scope:** `_experiments/wormhole-mode/` only. No files outside this folder are referenced.
**Status:** Audit only. No edits made. No patch produced.

This audit was made by reading every file in `_experiments/wormhole-mode/` at HEAD: the CSS pair (1438 + 135 lines), the seven top-level pages, all ten level pages, and the lab JS. Everything below is grounded in line numbers in `wormhole-dark.css` unless otherwise noted.

---

## 1. Executive Summary

The cleanup pass succeeded structurally — the override piles are gone, the H3/row-key collisions are resolved at natural specificity, and the level directory is now a real systemic class. What's left is a **type-and-treatment problem**, not an architecture problem.

**The five things actually wrong, in order of how much they hurt the page:**

1. **Mono runs at one size for seven different roles.** `--font-mono` resolves to `.62rem` (sometimes `.58–.68rem` with rounding) for the brand sub-label, page kickers, panel kickers, nav links, sequence labels, state labels, reference keys, status labels, AND the operation-card sequence index. These are three distinct registers (page-meta / row-eyebrow / data-cell) collapsed onto one shelf. This is the single biggest visible problem.
2. **Sans body runs about one notch hot, with no clear small/default/lede ladder.** The body, lede, support-copy, seq-body, reference-row value, and reference-paragraph all live within a `.94–1.05rem` band with line-heights between `1.34` and `1.55`. Reference prose specifically reads loose (`line-height: 1.44`, `max-width: 48rem`) — too breathy for what's meant to be documentation.
3. **The Reference panels read with two competing kicker mechanisms.** Every level page now does `panel-kicker: "Reference"` immediately followed by `<h2>Reference</h2>`. The C2 decision in the CSS comment (line 987) said "the documentation register is carried by the kicker, not by a private H2" — but the HTML still ships both. The H2 is redundant.
4. **State values on the Switchboard are typographically subordinate to their labels.** `state-label` is mono uppercase tracked at `.62rem` with the bronze gold-label color. `state-value.state-on` inherits the same color as `state-value`, with no weight or color differentiation — `--wh-copy-strong` at default sans weight `430`. The "ON" is the operative payload of the row and it currently looks like a continuation of the label rather than the answer.
5. **Buttons run two completely different typographic registers without a clear taxonomy.** Action buttons (`.button`, `.page-actions a`, form submits) use display italic Cormorant at `.98rem` weight 600. Mono chips (`.command-chip`, `.utility-link`, `.plain-link`) use mono uppercase at `.66rem` weight 850. The two registers are sound, but the assignment is leaky — saved-command chips use one, "Open" affordances use another, and the system isn't documented anywhere except the CSS itself.

The H1/H2-feel-bigger-on-mobile complaint is partially real but it's mostly a **density** problem — H1 cap at desktop is `3.95rem`, mobile is `clamp(2rem, 9vw, 3.15rem)`, and the cinematic-hero modifier scales by 13vw on mobile vs 8.5vw desktop. The math doesn't make headings *larger* on mobile, but the panel padding shrinks aggressively at 640px (line 1306, `padding: 18px`) so the heading-to-edge ratio inflates and that's what reads as "oversized."

---

## 2. Typography System Audit

### The mono token is doing seven jobs at one size

Every selector below resolves to `--font-mono` at roughly `.62rem`:

| Selector | Size | Weight | Tracking | Role |
|---|---|---|---|---|
| `.brand__sub` | `.62rem` | `800` | `.13em` | brand identity sub-label |
| `.kicker, .panel-kicker, label > span` | `.62rem` | `850` | `.145em` | section-header eyebrow |
| `.site-nav a, .theme-toggle, .mobile-nav a` | `.69rem` | `800` | `.11em` | global nav link |
| `.seq-label, .state-label, .reference-key, .status-label, .flat-row > strong` | `.62rem` | `800` | `.09em` | row-key terminal label |
| `.operation-card .seq-label` | `.68rem` | `900` | `.12em` | sequence row eyebrow (overrides above) |
| `.operation-card .seq-index` | `.62rem` | `720` | `.04em` | sequence row number |
| `.status-strip .status-label` | `.58rem` | `760` | `.12em` | status strip eyebrow (override) |
| `.inline-chip` | `.68rem` | inherit | `.11em` | inline metadata chip |

The roles really live in **three registers** that should be visually separable:

- **Page-meta register** — kickers, breadcrumbs, panel labels. Tiny, tracked, very quiet. Speaks: "this is what the next thing is."
- **Row-eyebrow register** — seq-label, state-label, reference-key. The terminal-style left column of a data table. Speaks: "this is the term."
- **Data-cell register** — seq-index, status-label, code chips. Tabular, monospace acting as data. Speaks: "this is a value."

Right now those three registers all pile onto `.62rem` with weights 720–900 doing the differentiation, and weight at that size barely reads. The seq-label at `.68rem` weight 900 is the only one that breaks free, and it does so via an operation-card override rather than systemically.

There is also no mono ladder at all above `.69rem`. The biggest mono token in the system is the nav link at `.69rem`. That means anywhere you'd want a stand-alone mono moment — a code block presented as a feature, a section eyebrow for a hero, a number callout — there's no token to reach for and the design just borrows from the small shelf.

### Sans runs hot with no ladder

| Selector | Size | Line | Weight |
|---|---|---|---|
| `body` | inherited | `1.55` | inherited |
| `.lede, .support-copy` | `clamp(.95rem, 1.15vw, 1.05rem)` | `1.48` | `450` |
| `p, li` | inherited | `1.44` | default |
| `.seq-body / value column` | `clamp(.94rem, 1.18vw, 1.02rem)` | `1.42` | `480` |
| `.reference-section p, li` | `.96rem` | `1.44` | `430` |
| `.reference-section .reference-value, .flat-row > :last-child` | `.94rem` | `1.34` | `430` |
| `.reference-section .reference-key, .flat-row > strong` (NOT mono — this is sans heading) | `.80rem` | `1.16` | `800` | 

Three observations:

- **There's no "small sans" tier.** Sans goes from inline-chip-mono back up to `.94rem` body. Anything that wants to be quiet but readable inside a panel has nowhere to land.
- **Reference paragraphs are bigger and looser than seq-body.** `.96rem / 1.44` against `.94rem (capped 1.02) / 1.42`. This is exactly backward — operation prose is the thing you read while doing, reference prose is the thing you scan. The leading on reference should be tighter than operation, not looser.
- **The reference row-key style at `.80rem` weight 800 sans is the loud bold the brief flagged.** This is the `.reference-section .flat-row > strong` and `.reference-key` selector at `wormhole-dark.css:1013–1026`. It uses `--font-heading` (Avenir Next sans) at weight 800 — basically a black sans cap — and that's what produces the "shouty" feeling in Reference rows. See §5.

### Headings are calm; the breakpoint *feels* off because of density

The H1 declaration at line 457 is `clamp(2.1rem, 4.35vw, 3.95rem)`. The mobile override at line 1309 is `clamp(2rem, 9vw, 3.15rem)`. **The mobile cap is smaller than the desktop cap.** Headings do not actually grow on mobile.

But — three things conspire to make it read as if they do:

1. The `9vw` middle term in the mobile clamp hits hard on phones in the 360–414px range. At 414px, `9vw = 37.26px ≈ 2.33rem`. That's smaller than desktop's `4.35vw` middle term, which at 1100px gives `47.85px ≈ 2.99rem`. Headings are smaller in absolute terms. They just *feel* big because…
2. **Panel padding drops from `clamp(18px, 2.8vw, 34px)` to a flat `18px` at 640px.** The heading-to-edge ratio expands sharply. A `2.33rem` H1 inside `18px` padding has more visual presence than a `2.99rem` H1 inside `34px` padding.
3. **The cinematic-hero modifier escalates faster on mobile.** Desktop cinematic uses `clamp(3.4rem, 8.5vw, 6.8rem)`. Mobile cinematic is `clamp(2.6rem, 13vw, 4.4rem)` — the middle term jumped from `8.5vw` to `13vw`. At 414px that's `53.82px ≈ 3.36rem` vs desktop at 1100px `93.5px ≈ 5.84rem`. Smaller, but *much* closer to the cinematic ceiling on a phone than on a laptop. The hero feels disproportionate to its container.

Fix: reduce the mobile heading vw multiplier and *raise* the mobile panel padding floor by ~6–8px. Don't shrink the hero — give it more breathing room.

### What's actually missing from the type system

A clear semantic ladder. Right now the file declares H1 / H2 / H3 and a bunch of opaque selectors. Nothing in the CSS says "here's the page-meta scale, here's the row-eyebrow scale, here's the prose scale." That's why the same `.62rem` token keeps showing up in seven roles — there's no other shelf to put things on.

---

## 3. Button / Action System Audit

The system actually has a solid **two-register split** already, it's just unnamed and applied unevenly.

### What's there

**Display action button** (`.button`, `.page-actions a`, `.switch-add-row button`, `.command-input-row button`, `.ledger-item__actions button`, `.prev-next-nav a`) — wormhole-dark.css:604–630
- Cormorant Garamond italic, `.98rem`, weight 600
- 4px radius, calm border, calm bg gradient
- Min height `2.05rem`, padding `.44rem .82rem`

**Mono chip** (`.command-chip`, `.utility-link`, `.plain-link`) — wormhole-dark.css:633–656
- IBM Plex Mono uppercase, `.66rem`, weight 850, tracking `.10em`
- 4px radius, same border + bg as display button
- Min height `1.85rem`, padding `.38rem .68rem`

These are good. The italic Cormorant button is a *signature* — it's the most distinct thing in the system and it actually feels like the wormhole brand. Don't touch the look. Touch the assignment.

### Problems with assignment

1. **Saved-command chips on Custom and Command Line aren't classified.** On `levels/level-05-command-line.html:71–75`, the three template buttons use `class="command-chip"` — correct. On `custom.html:35`, the equivalent template buttons (`<button data-template-target="customCommandText" data-template-value="Deal closed today.">Deal closed today.</button>`) have **no class at all**. They fall through to the catch-all `.button, button` rule and render as italic Cormorant display buttons containing "Deal closed today." — which looks wrong because saved phrases want to be quiet chips, not page-action buttons.

2. **Form submit buttons (`Add Switch`, `Save Command`, `Add`, `Run`) use the display italic style.** The CSS specifically targets `.switch-add-row button` and `.command-input-row button` to inherit the `.button` family (line 606–608). On the Switchboard page that means "Add" appears in italic Cormorant next to a plain text input. On Command Line "Run" appears in italic Cormorant next to "state the outcome as already done…". The display style was designed for page-level actions ("Copy Run", "Levels", "Open Firewall") — assigning it to inline form submits creates a mismatch where the most ornate styling lives next to the most utilitarian field.

3. **The `.utility-link--open` "Open" affordance on the level directory uses the mono chip.** This is correct and looks great — quiet, tabular, terminal-feeling. But the same role on other pages (Source ↗, Open Firewall, prev-next nav) uses display italic. So the same thing — a small navigational affordance — has two looks.

4. **No "primary / hot" distinction is exposed in HTML.** The `.button--hot` modifier exists (line 659) but is only applied in `wormhole-preview.html:46` (the lab preview file). On the production Daily Run page, "Breach" is a regular `.button` that links to `levels/level-03-firewall.html` — losing the visual urgency the modifier was built for. Same on Level 03 itself where "Open Firewall" should be the hot button.

5. **Header utility buttons (theme toggle, mobile menu) are styled identically to nav links.** Line 263–280 applies one rule to `.site-nav a, .theme-toggle, .mobile-menu-toggle, .mobile-nav a`. That's structurally tidy, but the theme toggle is a different thing from a nav link and the lack of any affordance to say "this toggles" makes the ☼ glyph look orphaned in the corner. Not a critical fix, but worth a class-level distinction.

### Suggested taxonomy

Three button roles, no more:

- **Page action** — italic Cormorant display button. For "Copy Run", "Open Firewall", level prev/next, page-actions list. Reach for this when the action is the page-level affordance.
- **Form submit** — same shape, but plain sans (Inter) at `.86rem` weight 600, no italic. Visually adjacent to inputs. For "Add Switch", "Save Command", "Run", "Save Receipt", "Save Peak". Lower visual weight than page action, higher than chip.
- **Mono chip** — already exists, keep as-is. For saved templates, "Open" affordances, utility links, copy/delete on ledger items.

Then `--hot` is a token shift that applies to any of the three.

---

## 4. Command Table / Sequence Audit

The operation-card grid is the strongest thing in the system. The grid math (line 842–855) is right, the row hover is calm, and the `seq-index` declassed-from-chip move (line 857–878) is exactly the right call.

What's wrong is mostly **too many marks per row** because the HTML supplies them and the CSS amplifies them.

### Quotation noise on Save State and Location

**Level 06 Save State** rows literally read:
```html
<span class="seq-body">
  <span>Say out loud: "This is a peak."</span>
  <span>The recognition is the first half of the save.</span>
</span>
```
The seq-body is already a styled-out command surface; wrapping the command in nested quotation marks is redundant **and** creates two punctuation marks the eye trips over (`out loud: "This is a peak."`). The colon is doing the work; the quotes are visual noise.

Same pattern on Level 06 step 03 (`"Save state. This is the new baseline. Restore here on drift."`), step 04 (`"Save complete. Anchor locked."`), and on **Level 07 step 03**:
```html
<span><strong>Abundance is the law.</strong></span>
<span><strong>Magnetism is the law.</strong></span>
<span><strong>Overflow is the law.</strong></span>
```
Here the `<strong>` is being asked to do what a code-block treatment should do. The `--wh-copy-strong` color the strong inherits is barely distinct from `--wh-copy` — that's intentional in the system but it means the bold text just thickens slightly without setting itself apart, which reads as "shouty" without the payoff of "elevated."

### What sequence rows actually want

The seq-body has a perfectly good `<code>` treatment already (line 916–926, mono on a tinted bg). The Daily Run page uses it correctly for `EXECUTE: [specific outcome as already done]`. Level 06 and Level 07 are passing literal command strings as quoted prose instead of as code.

Recommendation: when a row body *is* the command itself (not commentary about the command), wrap it in `<code>` and drop the quotes. When it's commentary ("Notice three sensory details: …"), let it be plain seq-body. The visual distinction between "here is the line you say" and "here is what to do" is exactly what the design currently lacks on these pages.

### Mono label sizing on operation-card

The override at line 886–897 lifts the seq-label to `.68rem` weight 900 from the global `.62rem` weight 800 — that's the right move and the only place in the system where a mono label feels properly weighted. **Make this the primary row-eyebrow size globally**, not a one-off escalation inside operation-card.

The status-strip override pulls the same label down to `.58rem` weight 760 (line 947–955). That's too small — the status row already reads as secondary register because of position; it doesn't also need to whisper. `.62rem` would be plenty.

### Index column is calm — keep it

The de-chipped seq-index (line 858–878) is excellent. Don't add anything to it. It does its job.

---

## 5. Reference / Documentation Audit

This is where the brief's "shouty bold" complaint lives, and the cause is specific: `wormhole-dark.css:1013–1026`.

```css
html[data-skin="signal"] .reference-section .flat-row > strong,
html[data-skin="signal"] .reference-section .reference-key,
html[data-skin="signal"] .reference-section .state-label {
  display: block;
  color: var(--wh-copy-strong);
  font-family: var(--font-heading);   /* sans, NOT mono */
  font-size: .80rem;
  font-weight: 800;
  letter-spacing: .005em;
  line-height: 1.16;
  text-transform: none;
  word-break: normal;
  hyphens: none;
}
```

This rule deliberately escapes the mono row-key treatment used everywhere else (line 749–762). Inside reference panels, row keys go from "small mono uppercase tracked" to "sans, .80rem, weight 800, sentence-case, no tracking." That's a sans-bold-cap-height treatment — the loudest thing in the whole panel. Then it's applied to terms like "Switches", "Commands", "Codex", "Premise", "Identity", "Therefore" — which then sit at the front of every flat-row in every reference card across the site.

**The fix is conceptual:** decide whether reference row-keys want to be terminal (mono uppercase, calm) or editorial (sans sentence-case, but quiet, not heavy). The current state is "editorial *and* heavy" which is the worst combination — it has the loudness of a heading but isn't one.

Two coherent options:

- **Editorial + quiet:** keep sans, drop weight to 580–620, drop size to `.78rem`, give it `--wh-label` color instead of `--wh-copy-strong`. Reads as a definition list term.
- **Terminal + small caps:** match the operation-card row-key treatment exactly — mono `.62rem` weight 800 tracking `.09em` with `--wh-muted`. Reads consistently with the rest of the system.

I'd push for the second. The system already has a strong row-eyebrow language; the reference panel is the only place it abandons it.

### Reference paragraph leading

`wormhole-dark.css:1038–1044`:
```css
.reference-section p, .reference-section li {
  max-width: 48rem;
  font-size: .96rem;
  font-weight: 430;
  line-height: 1.44;
}
```

Three nudges:

- `max-width: 48rem` is wide. At a `.96rem` base that's roughly `460–480px` of measure, which is ~75–85 characters per line. The editorial sweet spot is 60–75. Reduce to `42rem` (matches the lede max-width on line 559).
- `line-height: 1.44` is too breathy for documentation. The seq-body operation prose runs `1.42` and *that's* the prose you actually read while doing. Reference should be tighter, not looser. Try `1.36–1.40`.
- `font-weight: 430` is a non-standard variable-font axis value that, on systems without Inter Variable installed, renders as `400`. That's fine, but the Inter `350–450` band is where Inter loses density on screen — pages start to feel "cottony." A `font-weight: 420` or even staying at `400` with a tighter line-height would feel more authoritative.

### Reference redundancy

Every level Reference panel ships with this header stack:

```html
<p class="panel-kicker">Reference</p>
<h2>Reference</h2>
```

The CSS comment at line 987 explicitly notes the **intended decision** — "Reference shows its kicker. The documentation register is carried by the kicker label, not by a private H2 style." The kicker is supposed to do the labeling. The H2 is supposed to be the *substantive* heading underneath ("Operator Responsibility" or "Receipt Logic" or whatever).

But every page just sets the H2 to the literal string `"Reference"`, duplicating the kicker. Levels 03, 04, 06, 07, 08, 09, 10 all do this. The only level pages that don't are Level 02 (which also does it — line 77), Level 05 Command Line (which also does it — line 81), and Level 01 Gateway (which also does it — line 78). So all of them.

What the H2 *should* hold is the substantive section title — "System Definition", "Operator Responsibility", "Configuration Principle" — and the H3s underneath should hold the sub-sections. Right now H3 is doing what H2 should be doing, and H2 is just echoing the kicker.

This is a **content fix, not a CSS fix.** The CSS for reference H2 (line 991–993) just sets margin. The HTML is where the duplication lives.

Two ways to fix without rewriting copy:

- **Drop the H2 entirely.** Kicker + H3s. The reference panel becomes flatter and faster. Risk: it reads less like a heading hierarchy.
- **Promote the first H3 to the H2.** "System Definition" becomes the H2; the rest stay H3s. Most pages have a clear primary section that earns this.

Either is systemic; either can be done in one HTML pass.

### Other reference notes

- The `<h4>Law 01</h4>` etc on Level 08 (`level-08-sovereign-codex.html:124, 134, 141`) have no CSS rule. They render as default browser sans-bold. There's no H4 in the type ladder. Either add one or change to a kicker / row label.
- The `.standing-decree-list` on Level 08 (line 80–86 of that file) wraps `<p><strong>...</strong></p>` per decree. The strong inside p inherits weight 620 — not bad, but five paragraphs of bold-only-text in a row reads like a heap. Better as a `flat-list` of single-cell rows, or as a single block with `.lede`-level treatment.
- Level 09 has `<span><code><strong>CONFIRMATION RECEIVED.</strong></code></span>` — three nested elements doing the same thing. The `<code>` already has its tinted background and mono weight; the strong adds nothing. Drop the strong.

---

## 6. State / Switchboard Audit

The Switchboard page is where the brief flagged "ON values are an afterthought." The CSS confirms the diagnosis.

`wormhole-dark.css:786–793`:
```css
html[data-skin="signal"] .state-on,
html[data-skin="signal"] .status-active,
html[data-skin="signal"] .status-complete,
html[data-skin="signal"] .status-ready,
html[data-skin="signal"] [aria-pressed="true"] {
  color: var(--wh-copy-strong);
}
```

`var(--wh-copy-strong)` is `rgba(247, 241, 231, .92)`. The default `.state-value` already uses `var(--wh-copy)` which is `rgba(247, 241, 231, .76)`. The only difference between an "ON" state and a baseline state is **16% opacity on the same ivory.** That is not an emphasis; that's a whisper.

Compounding this: the `.state-label` for "Abundance", "Magnetism" etc is mono uppercase tracked weight 800 in `--wh-label` color. The `.state-value` ON sits in default sans weight `430` (inherited from the row-value rule line 769–777). So the row reads as **strong-mono-label : weak-sans-value** — exactly the inversion of what you'd expect on a switchboard, where the value is the answer.

### Recommendation: a small but real treatment for active states

The state row is the one place in the system where a **value typographically outranks its label** is correct. Three options, in order of restraint:

1. **Weight + color.** `state-on` becomes weight 600, color stays at `--wh-copy-strong`. Mono is *not* applied — keep sans so it reads as a value, not a label. Already a meaningful upgrade with no new tokens.
2. **Weight + dedicated token.** Add `--wh-state-on` as a token (a slightly warmer ivory like `#f7f1e7` at full opacity, or a hint of gold using the existing `--wh-gold-hot`). Apply alongside weight 600.
3. **Small-caps mono treatment.** Use mono uppercase but at `.78rem` weight 700. This makes the value read as **data**, terminal-style, which fits the OS-aesthetic. Risk: looks too similar to the seq-label.

I'd recommend option 1 + a hint of option 2. Make the ON value visibly distinct from `Configured` / `Online` / `Live indefinitely` (which are all separate states) by leaning on weight first, color second. Don't introduce a green or any positive-feeling hue — the system stays palette-locked on ivory/bronze/clay.

### The status-strip is fine

The status-strip rows on the Daily Run page, Switchboard page, and per-level operation cards are calm and correctly subordinate. Don't change them. Only change `state-row` and the explicit `state-on` / `status-active` / `status-complete` / `status-ready` / `status-denied` / `status-firewall` / `status-pending` semantic states.

The negative states (`status-denied`, `status-firewall`, `status-breach`, `status-pending`, `access-denied`) at line 795–801 already use `--wh-clay`. That's a real differentiation. Mirror that intent on the positive side with the weight-and-token pattern.

---

## 7. Page-by-Page Notes

### `index.html` (Daily Run)
- Hero is `identity` (not `identity--hero`) — calm scale, correct.
- The `.controls` row uses three display-italic buttons. "Breach" should be `.button.button--hot`.
- Sequence row 02 "Defaults" has three nested `<span>`s in seq-body: `<span>My default is overflow.</span><span>My default is magnetism.</span><span>My default is sovereign pace.</span>`. By default these render inline (span is inline). They wrap as one paragraph instead of three lines. If the intent is one-per-line, the spans need `display:block` either via a class or in the system. Currently relies on browser wrapping which is fragile.
- Sequence row 05 "Receipt" same issue: `<span>Confirmation received.</span><span>Notice. Acknowledge. Continue.</span>` runs together as `Confirmation received.Notice. Acknowledge. Continue.`

### `levels.html`
- Single-line minified HTML. Hard to read but structurally clean. The `state-table level-directory` class composition is correct and the level rows render well.

### `overview.html`
- Two reference-section panels back-to-back. Each has the duplicate kicker+H2 pattern (kicker "Structure" + H2 "How to use it", kicker "Interface" + H2 "Reality Control Panel"). These are actually fine — the H2s say something different from the kickers. This is the model the level pages should follow.

### `custom.html`
- All form action buttons (`Add Switch`, `Add Default`, `Save Command`, `Save Law`, `Save Peak`, `Log Receipt`) are unclassed `<button>` elements. They fall through to the generic button rule and render as italic Cormorant. This is the form-submit-vs-page-action mismatch.
- The template buttons (`Deal closed today.`, `Full payment received this week.`) are also unclassed `<button>` and render as italic Cormorant. They should be `.command-chip`. This is the case the brief explicitly flagged: "saved chips like 'Deal closed today.'"
- Module notes (`<p class="module-note">Group ON states by life area.</p>`) — `.module-note` has no CSS rule. Falls through to default `p` styling. Either add a token or use `.support-copy`.

### `bank.html`
- Single-line minified. Filter form uses standard `<select>` and `<input>` — which inherit the styled form rules (line 1117–1130). Good.
- Bank filter grid uses `bank-filter-grid` which composes off `layout-two`-style — line 338. Fine.
- The "Export Bank" button is `.button` — page action, correct.

### `levels/level-01-gateway.html`
- Uses `identity--hero` — only level page that does. This is correct (Gateway is the entry, deserves cinematic register).
- Reference duplicate H2 pattern present.
- The `<textarea id="level01ReceiptInput">` has no label. It works because of the placeholder, but `<label>` is the correct wrapper given how the form system is built.
- "Save Receipt" is unclassed `<button>` — italic Cormorant. Should be form-submit register.

### `levels/level-02-daily-operation.html`
- Cleanest page in the system. Use as a reference template.
- Defaults row uses `<br>` for line breaks instead of nested spans. That's actually fine — `<br>` displays correctly. But it's inconsistent with index.html's nested-span approach for the same content. Pick one.

### `levels/level-03-firewall.html`
- Reference duplicate H2 pattern.
- `<div class="ref-block"><h3>System Output</h3><div class="status-strip">...</div></div>` — embedding a status-strip inside a ref-block is interesting but creates a double-frame: the ref-block already has ::before atmospheric layer, the status-strip has its own border-top. Reads busy.

### `levels/level-04-switchboard.html`
- The state-on emphasis problem (§6) is most visible here.
- The "Add Switch" form uses `<span class="status-label">Add Switch</span>` as a pseudo-label before the input. That's a misuse of `.status-label` — it's not a status. Use a proper `<label>` wrapper.
- `<button id="addLevel04Switch" type="button">Add</button>` — unclassed, italic Cormorant. Form submit register would fit.

### `levels/level-05-command-line.html`
- The single page with the most type-system inconsistencies, as the brief notes.
- Mixes `reference-table` / `reference-row` (a different markup pattern than `flat-list` / `flat-row` used elsewhere) — both are valid in the CSS but having two patterns for the same job is friction.
- The `inline-chip-list` at line 104–109 with four `inline-chip` spans renders as pill-shaped chips. This is *almost* the only place in the system that uses `.inline-chip` (1196–1208) and the pill shape (`border-radius: 999px`) is inconsistent with the 4px-radius button system. It looks like an old direction left in.
- "Run" button — italic Cormorant — should be form submit register.
- Template chips correctly use `.command-chip` here. Good.

### `levels/level-06-save-state.html`
- Quotation noise on every sequence row body (§4). Most affected page.
- `<p class="lede"><strong>The installation is complete.</strong></p>` — strong inside lede competes with the lede's own weight (`450`). The strong only goes to `620`. Visible difference is small.
- Reference paragraphs are some of the longest in the system; the leading issue (§5) reads worst here.

### `levels/level-07-location.html`
- Same quotation noise pattern as Level 06 on step 03 with the three "the law" decrees.
- `<p><strong>Operator commands. The seat above the seat authors.</strong></p>` — paragraph entirely inside strong. This is the pattern that produces the "everything is bold" feeling. The whole sentence ends up at weight 620 with no internal hierarchy.

### `levels/level-08-sovereign-codex.html`
- The Standing Decrees section (line 80–86) wraps each decree in `<p><strong>...</strong></p>`. Five bold paragraphs in a row. This is the loudest reading section in the entire site.
- The Architectural Laws section uses `<h4>Law 01</h4>` etc — H4 has no system styling. Default browser styling kicks in, which on most browsers renders as bolder than H3 looks in this design (since the H3 here is italic Cormorant, not bold sans). H4 visually outranks H3 on this page, which is wrong.
- The flat-list pattern of Premise / Identity / Therefore is good — that's the system working as intended.

### `levels/level-09-render-confirmation.html`
- `<span><code><strong>CONFIRMATION RECEIVED.</strong></code></span>` — over-nested (§5).
- `<p><strong>Notice. Acknowledge. Continue.</strong></p>` — same all-bold-paragraph pattern as Level 07.
- `<p><strong>Signals:</strong> a sentence someone says, a repeated number...</p>` — this is the *correct* way to use strong: as a label introducing a list. Good.

### `levels/level-10-seal.html`
- The brief flags this page as feeling different — and it does. It has *the same components* as everywhere else (operation-card with status-strip, reference-section with ref-blocks and flat-lists), but the **content shape is different**: the operation card has no sequence (no `.sequence` element), just three paragraphs and a status-strip. Every other operation card has a sequence.
- Without the sequence, the operation-card padding rules (line 803–807) still trigger because `:has(.sequence)` matches *or* `.operation-card` matches. The padding is fine. But the visual rhythm a page acquires from "kicker → h2 → sequence rows → status" is replaced here by "kicker → h2 → three paragraphs → status." The page feels lighter / less structured because of that, not because of any styling drift.
- Multiple `<p><strong>...</strong></p>` patterns in reference (lines 65, 90, 102, 103). Same all-bold-paragraph problem.
- `<div class="page-actions"><a href="../index.html">Daily Run</a><a href="../levels.html">Levels</a></div>` — minimal. The page ends without a "Source ↗" link. Inconsistent with most other level pages.

### `wormhole-preview.html`
- Lab file. Uses the *correct* `button--hot` for "Breach" (line 46). Production index.html does not. The preview file has features the production has not yet adopted.
- Has a custom `.signal-lab-actions` class on the header actions (line 25 of preview, which overlaps with `.signal-lab-actions` rules in CSS at line 585). This is preview-specific and not used elsewhere — fine for a lab file.

---

## 8. System-Level Fix Plan

Not a patch. A description of the intended end-state.

### Typography ladder (rewrite the type system as a named scale)

Three parallel scales, all expressed as tokens at the top of `wormhole-dark.css`:

**Mono scale** (currently one shelf):
- `--mono-data` — `.62rem`, weight 720, tracking `.04em` — for sequence index, code-as-data
- `--mono-eyebrow-sm` — `.62rem`, weight 800, tracking `.13em` — for kickers, brand sub
- `--mono-eyebrow` — `.68rem`, weight 850, tracking `.11em` — for nav, row-eyebrow (seq-label, state-label, reference-key when terminal-style)
- `--mono-chip` — `.66rem`, weight 850, tracking `.10em` — for command-chip, utility-link

This gives mono four jobs at three sizes with intentional weight differentiation. The current `.62rem`-everywhere collapse goes away.

**Sans scale** (currently runs hot):
- `--sans-micro` — `.82rem`, line `1.32`, weight 480 — for module notes, support-copy in tight contexts
- `--sans-body` — `.94rem`, line `1.40`, weight 430 — for paragraph copy, reference value
- `--sans-prose` — `.96rem`, line `1.36`, weight 420 — for reference-section paragraphs (tighter than current `1.44`)
- `--sans-lede` — `clamp(.96rem, 1.1vw, 1.04rem)`, line `1.46`, weight 460 — for `.lede`, `.support-copy` at panel level
- `--sans-value` — `clamp(.95rem, 1.18vw, 1.02rem)`, line `1.40`, weight 480 — for seq-body, status-value baseline
- `--sans-value-strong` — same size, weight 600 — for state-on values, key emphasized values

Six sans tokens cover everything currently scattered.

**Display scale** (already mostly fine):
- H1 calm — current
- H1 cinematic — current, but reduce mobile vw multiplier from 13vw to ~10vw
- H2 — current
- H3 — current
- (no H4 needed; promote H4-content to flat-list rows)

### Heading mobile breakpoint

At 640px:
- H1 standard: `clamp(1.92rem, 7.5vw, 2.85rem)` (down from `9vw, 3.15rem`)
- H1 cinematic: `clamp(2.4rem, 10.5vw, 4rem)` (down from `13vw, 4.4rem`)
- H2: `clamp(1.5rem, 6.2vw, 2.05rem)` (down from `7vw, 2.2rem`)
- Panel padding floor: raise from `18px` to `22px` (give the now-smaller heading room)

### Bold/strong globally

`<strong>` currently lifts to weight 620 from inherited 430. That's a 190-point jump. Reduce to weight 560 from a 420 baseline — a 140-point jump that reads as emphasis without thickening the whole paragraph. The "all-bold paragraph" pages (Level 07, Level 08, Level 09, Level 10) become readable without rewriting copy.

### Row-key treatment

Pick one direction (recommended: terminal mono) and apply it across all row-key contexts:
- `.flat-row > strong`
- `.reference-key`
- `.state-label`  
- `.reference-section .flat-row > strong` (the loud one)
- `.reference-section .reference-key`
- `.reference-section .state-label`

All resolve to `--mono-eyebrow`. The `.reference-section` override at line 1013–1026 gets deleted.

### State emphasis system

`.state-on`, `.status-active`, `.status-complete`, `.status-ready` get:
- `font-weight` from `--sans-value-strong`
- `color: var(--wh-text)` (full opacity ivory, not the .92 alpha)
- Optionally a hairline left-border on the row using `--wh-border-active` to mark it as a live state

`.status-denied`, `.status-firewall`, `.status-breach`, `.status-pending` keep their clay color. Already differentiated.

### Button taxonomy

Three classes, named explicitly:

- `.button` — page action, italic Cormorant. As today.
- `.button--form` — form submit, sans, weight 600, slightly smaller. NEW class.
- `.command-chip` / `.utility-link` — mono chip, as today.

`--hot` modifier applies to all three.

Then in HTML:
- All `<button>` inside `.utility-form, .switch-add-row, .command-input-row, .law-form, .peak-form, .three-part-form` get `class="button button--form"` — or the CSS targets those wrappers and applies form treatment.
- All saved-template buttons in custom.html get `class="command-chip"`.
- Daily Run "Breach" gets `class="button button--hot"`.
- Level 03 "Open Firewall" gets `class="button button--hot"`.

### Reference panel restructure

HTML pass across all level Reference panels:
- Drop `<h2>Reference</h2>`. Keep the `<p class="panel-kicker">Reference</p>`.
- Promote the most substantive H3 to H2 if there's a clear single primary section (Level 04, 06, 09 have this). Otherwise just remove the H2 entirely and let H3s lead.

CSS pass:
- Reduce `.reference-section p, li` line-height to `1.36`, max-width to `42rem`.
- Replace the loud sans row-key (1013–1026) with the terminal mono treatment.

### Quotation cleanup

HTML pass on Level 06 and Level 07:
- Replace `"This is a peak."` with `<code>This is a peak.</code>`. Or with no quotes at all and a code treatment.
- Same for `"Save state. This is the new baseline."`, `"Save complete. Anchor locked."`, the three "the law" decrees on Level 07.

### Standing decree treatment (Level 08)

The `<p><strong>Everything always escalates...</strong></p>` cluster becomes a flat-list:
```html
<div class="flat-list standing-decrees">
  <div class="flat-row"><span>Everything always escalates quickly in my favor.</span></div>
  ...
</div>
```
With a CSS rule that drops the row-key column for this list variant and sets a slightly different value treatment (display Cormorant italic, calm scale).

### Architectural laws (Level 08)

Replace `<h4>Law 01</h4>` with a kicker pattern:
```html
<div class="ref-block law-block">
  <p class="kicker">Law 01</p>
  <div class="flat-list">...</div>
</div>
```
No new H4 in the type system.

---

## 9. Implementation Strategy

Constraints from the brief: no page-specific styling, no PASS blocks, no Utility changes, no light-CSS structural rules, reusable classes only.

### Suggested commit shape

**One CSS commit, one HTML commit, no patch over patch.** Total: 2 commits.

**Commit 1 — `style(wormhole): introduce named type/button tokens and tune state emphasis`**

Edits *in place* in `wormhole-dark.css`:
- Add the mono/sans/display token blocks at the top of the file (in the existing token section, line 28–56). Net add ~25 lines.
- Replace selector-by-selector usage of `font-size: .62rem` etc with the named tokens. Net change: roughly even.
- Update the `.reference-section .flat-row > strong / .reference-key / .state-label` block (1013–1026) to use `--mono-eyebrow`. Delete the sans-bold-cap declaration.
- Update the `.reference-section p, li` rule (1038–1044) for tighter leading.
- Update the `.state-on / .status-active / .status-complete / .status-ready` rule (786–793) to add `font-weight` and full-opacity color.
- Update the H1/H2 mobile clamps in the 640px block.
- Update panel padding floor in the 640px block.
- Add `.button--form` rule alongside the existing `.button` rule.
- No changes to `wormhole-light.css` are needed — all of these flow through the token system. Verify by viewing the light theme after the change; if anything looks off, the light tokens get the targeted addition (probably state-on color).

**Commit 2 — `fix(wormhole): collapse reference H2 redundancy and classify form buttons`**

HTML edits across all 11 affected pages:
- Drop or repurpose `<h2>Reference</h2>` everywhere.
- Add `class="button button--form"` to all form submit buttons (custom.html, level-04, level-05, level-01).
- Add `class="command-chip"` to template buttons in custom.html.
- Add `class="button button--hot"` to "Breach" on index.html and "Open Firewall" links on the firewall context.
- Replace quoted command strings with `<code>` or unquoted prose on Levels 06, 07.
- Replace `<p><strong>...</strong></p>` Standing Decrees on Level 08 with the flat-list pattern.
- Replace `<h4>Law 01</h4>` etc on Level 08 with the kicker pattern.
- Drop `<strong>` from `<code><strong>...</strong></code>` on Level 09.
- Drop `<strong>` from all-bold paragraphs (lede/p that's entirely strong) on Levels 06, 07, 09, 10.

### What NOT to do

- Don't add a `.state-row--on` class. The semantic state already lives on `.state-value.state-on`. Use it.
- Don't introduce green or red. Stay palette-locked. The state emphasis is via weight + opacity, not hue.
- Don't add a third button class beyond `--form`. Two registers + one modifier is enough.
- Don't normalize `<br>` vs nested-span line-break patterns this pass. They both work. Cosmetic later.
- Don't touch `wormhole-lab.js`. It's purely behavioral and the audit found nothing in it that affects styling.
- Don't add page-specific selectors. If a Level page needs something different, that "something different" is a class that should live in the system.

---

## 10. Verification Plan

```bash
cd /path/to/the-protocol
python3 -m http.server 8080
```

Then visit:

```
http://localhost:8080/_experiments/wormhole-mode/index.html
http://localhost:8080/_experiments/wormhole-mode/overview.html
http://localhost:8080/_experiments/wormhole-mode/levels.html
http://localhost:8080/_experiments/wormhole-mode/custom.html
http://localhost:8080/_experiments/wormhole-mode/bank.html
http://localhost:8080/_experiments/wormhole-mode/levels/level-01-gateway.html
http://localhost:8080/_experiments/wormhole-mode/levels/level-04-switchboard.html
http://localhost:8080/_experiments/wormhole-mode/levels/level-05-command-line.html
http://localhost:8080/_experiments/wormhole-mode/levels/level-06-save-state.html
http://localhost:8080/_experiments/wormhole-mode/levels/level-07-location.html
http://localhost:8080/_experiments/wormhole-mode/levels/level-08-sovereign-codex.html
http://localhost:8080/_experiments/wormhole-mode/levels/level-10-seal.html
```

### Specific things to check after the patch

1. **Switchboard (Level 04):** ON values should now visibly outweigh state labels. Look at the row and the answer to "is this on?" should be the most legible thing.
2. **Save State (Level 06):** Sequence rows should no longer have nested quotation marks. Commands that *are* the line you say should be in mono code treatment; commentary should be plain.
3. **Location (Level 07):** Same as Save State — the "Abundance is the law / Magnetism is the law / Overflow is the law" decree row should not be three nested-strong spans.
4. **Command Line (Level 05):** "Run" button should look like a form submit (sans, calmer), template chips should look like quiet command chips, reference row keys should be terminal-mono not sans-bold.
5. **Custom:** Every form's submit button should look like a form submit. Template buttons ("Deal closed today.") should be quiet chips, not italic display buttons.
6. **Reference panels everywhere:** No level should have `Reference / Reference` stacked. Each should have one heading or none + kicker.
7. **Daily Run mobile (≤414px):** The H1 should not feel oversized relative to the panel. The cinematic-hero should not engage on the Daily Run hero (it's not on this page; just verify it didn't accidentally start engaging).
8. **Gateway mobile (≤414px):** The cinematic-hero H1 should feel proportionate, not pinned-to-the-edges. If it's still feeling tight, the panel padding floor is too low.
9. **Sovereign Codex (Level 08):** The five Standing Decrees should not all be bold paragraphs. The Architectural Laws should not have an H4 visually outranking H3.
10. **Light theme of all of the above:** Verify nothing broke. The state-on color may need a light-theme override (since `--wh-text` in light is `#14110d`).

### Visual A/B suggestion

If you want to compare without committing: branch the audit-suggested CSS as `experiment/wormhole-polish-pass` and load `wormhole-preview.html` from both branches side-by-side. The preview file has all the system components in one page — fastest way to see the difference.

---

## Appendix: things deliberately not in this audit

- **wormhole-lab.js** — purely behavioral. No styling concerns surfaced in inspection. Do not modify.
- **Light theme structural rules** — the brief says "keep light CSS as theme overrides only." Inspection confirms the current light file is exactly this and the cleanup pass already enforced it. The recommendations above flow through tokens; the only thing that *might* need a light-theme follow-up is the state-on full-opacity color, and that's a one-liner.
- **The font files** — `font/space age.ttf` exists in the folder but is not referenced by the CSS (neither dark nor light declares an `@font-face` for it). This may be intentional (the cleanup pass moved away from Space Age in favor of Cormorant Garamond as the display face). If it's a leftover, that's a separate housekeeping task; if it's a planned re-introduction, note it in a future brief.
- **Bank ledger card structure** — the `.ledger-item` block on `bank.html` and inside the custom.html lists is well-built. Not flagged.
- **The `:has(.sequence)` selectors** — these are modern CSS and work in current Safari/Chrome/Firefox. No concern raised.
