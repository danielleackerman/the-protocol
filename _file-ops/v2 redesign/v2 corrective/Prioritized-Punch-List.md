# Prioritized Punch List — Commit Order

## Commit 1 — Repair the design system foundation

Suggested commit:

```bash
git add assets/css/protocol.css
git commit -m "style: restore protocol typography and terminal hierarchy"
```

Scope:

- Add `@font-face`.
- Add display/UI/mono font tokens.
- Add mono layer to labels, breadcrumbs, status, commands, nav, and utility UI.
- Correct dark-mode accent red.
- Rebalance buttons away from heavy red fills.

Review checks:

- Brand font loads.
- Mono labels are visible.
- Dark red is not tomato/coral.
- Buttons are not giant red pills.

---

## Commit 2 — Compress Daily Run into true immediate action

Suggested commit:

```bash
git add index.html assets/css/protocol.css
git commit -m "fix: compress daily run into immediate action console"
```

Scope:

- Replace homepage hero with compact Daily Run console.
- Put the five sequence actions at the top.
- Remove duplicate migrated Quick Start block.
- Keep `#copyQuickStart` behavior.
- Keep breach shortcut and deeper links below.

Review checks:

- Homepage gets straight to the sequence.
- No duplicate Daily Run section.
- Copy Daily Run still works.
- Mobile top area is not oversized.

---

## Commit 3 — Restore migrated content formatting

Suggested commit:

```bash
git add assets/css/protocol.css
git commit -m "fix: restore switchboard command and status formatting"
```

Scope:

- Fix `.quick-lines` stacking.
- Fix `.quick-switches` chip layout.
- Fix `.switch-row` display.
- Fix command-line styling.
- Fix status/message stack styling.
- Fix mobile stacking of migrated level grids.

Review checks:

- No `AbundanceON` collapsed text.
- No `overflow.My default` run-ons.
- Switch rows show name and `ON` cleanly.
- Command areas feel mono/CLI.

---

## Commit 4 — Add correction documentation

Suggested commit:

```bash
git add CHANGELOG.md IMPLEMENTATION_NOTES.md "_file-ops/v2 corrective/"
git commit -m "docs: add v2 corrective redesign notes"
```

Scope:

- Add changelog.
- Add design/dev correction brief.
- Add precise CSS/HTML fix list.
- Add prioritized punch list.

Review checks:

- Docs describe why this pass exists.
- Docs distinguish architecture success from visual correction.
- Docs provide enough guidance for future cleanup.

---

## Final local verification

Run:

```bash
python3 -m http.server 8080
```

Check:

- `/`
- `/overview.html`
- `/levels.html`
- `/custom.html`
- `/levels/level-04-switchboard.html`
- `/levels/level-10-seal.html`

Mobile checks:

- Daily Run starts fast.
- Cards are not bloated.
- Switch chips do not run together.
- Level 04 switchboard rows are readable.
- Dark red feels deeper and calmer.
- Buttons are not red-heavy.
