# Wormhole → Root Migration Walkthrough

A step-by-step guide for promoting `_experiments/wormhole-mode/` to the live root site, with the previous Utility and Signal sites safely archived.

**Repo:** `the-protocol`
**Branch you start from:** `chore/wormhole-root-migration-audit`
**HEAD you start from:** `46a29ab` (`feat(wormhole): polish protocol design lab (#3)`)
**Patch file:** `wormhole-promote-to-root.patch`

---

## What this migration does

- Wormhole files move out of `_experiments/wormhole-mode/` and become the live root site.
- The old root Utility site is archived to `_archive/utility/` (still browsable, not deleted).
- Signal mode is archived from `_experiments/signal-mode/` to `_archive/signal/` (still browsable).
- Unused stuff in Wormhole (`font/` folder, folder-level `CHANGELOG.md`, `_file_ops/` audits, `wormhole-preview.html`) is deleted.
- `_experiments/` folder is removed entirely.
- All happens in **one atomic commit** so the live site never serves a broken state.

---

## Before you start — read this once

- This is reversible. Two ways: a git tag pinned before you start, and `git revert` on the migration commit afterward.
- The patch is binary-aware (fonts). You must apply it with `git apply --binary`.
- The localStorage key `the-protocol.bank.items.v12` is shared across all three modes. Any data you've already saved in any mode survives the migration — it lives in your browser, not in the repo.
- After merge to `main`, GitHub Pages CDN can take up to 10 minutes to update. Don't panic if you see the old site briefly.

---

## Step 0 — Pin a safety tag

This is your insurance. If anything goes wrong later, you can roll back to this exact state with one command.

```bash
git fetch origin
git tag pre-wormhole-root-migration 46a29ab
git push origin pre-wormhole-root-migration
```

Verify the tag exists on GitHub: visit `https://github.com/danielleackerman/the-protocol/tags` — you should see `pre-wormhole-root-migration`.

If you ever need to roll back the entire migration:
```bash
git checkout main
git reset --hard pre-wormhole-root-migration
git push --force-with-lease origin main
```

---

## Step 1 — Make a fresh working branch off the audit branch

The audit branch (`chore/wormhole-root-migration-audit`) is your planning artifact. Don't put migration commits on it. Make a new branch:

```bash
git checkout chore/wormhole-root-migration-audit
git pull
git checkout -b feat/wormhole-promote-to-root
```

You now have a clean branch named `feat/wormhole-promote-to-root` ready for the migration commit.

---

## Step 2 — Save the patch file locally

You should have `wormhole-promote-to-root.patch` from the assistant. Save it somewhere outside the repo so it isn't accidentally committed:

```bash
# example
mv ~/Downloads/wormhole-promote-to-root.patch ~/wormhole-promote-to-root.patch
```

Verify the file is present and not zero bytes:
```bash
ls -la ~/wormhole-promote-to-root.patch
```

Should show roughly 360 KB.

---

## Step 3 — Dry-run the patch before applying

This tells you whether the patch will apply cleanly without changing anything yet:

```bash
git apply --check --binary ~/wormhole-promote-to-root.patch
```

Expected output: nothing. No output means it applies clean.

If you see errors, **stop**. Don't proceed. Go back and check that:
- You're on `feat/wormhole-promote-to-root` branched from `46a29ab`
- The patch file isn't corrupted (re-download it)
- `git status` is clean (no uncommitted changes)

---

## Step 4 — Apply the patch

```bash
git apply --binary ~/wormhole-promote-to-root.patch
```

Expected output: nothing. The working tree is now in the target state. Nothing is committed yet.

---

## Step 5 — Verify the resulting tree before committing

Run these checks. Each line should print a `✓`. If any prints `✗` or shows an error, **do not commit** — run `git reset --hard HEAD` to undo and start over.

```bash
test -f index.html && echo "✓ root index.html present"
test -f wormhole-dark.css && echo "✓ wormhole-dark.css at root"
test -f wormhole-light.css && echo "✓ wormhole-light.css at root"
test -f wormhole-lab.js && echo "✓ wormhole-lab.js at root"
test -d levels && echo "✓ levels/ at root" && ls levels/ | wc -l
# expect 10
test -d _archive/utility && echo "✓ Utility archived"
test -f _archive/utility/index.html && echo "✓ archived utility index"
test -f _archive/utility/assets/css/protocol.css && echo "✓ archived utility CSS"
test -f _archive/utility/assets/js/protocol.js && echo "✓ archived utility JS"
test -d _archive/signal && echo "✓ Signal archived"
test -f _archive/signal/signal-dark.css && echo "✓ archived signal CSS"
test ! -d _experiments && echo "✓ _experiments removed"
test ! -d assets && echo "✓ root /assets removed"
test -f .nojekyll && echo "✓ .nojekyll preserved (so _archive/ is served)"
```

Then verify all CSS/JS references resolve at their new paths:

```bash
echo "=== Live root pages ==="
for f in index.html overview.html levels.html custom.html bank.html; do
  for ref in $(grep -oE '(href|src)="[^"]+\.(css|js)"' "$f" | grep -oE '"[^"]+"' | tr -d '"'); do
    [ -e "$ref" ] && echo "  ✓ $f → $ref" || echo "  ✗ MISSING: $f → $ref"
  done
done

echo "=== Live level pages ==="
for f in levels/level-*.html; do
  for ref in $(grep -oE '(href|src)="[^"]+\.(css|js)"' "$f" | grep -oE '"[^"]+"' | tr -d '"'); do
    abs="$(dirname "$f")/$ref"
    [ -e "$abs" ] && echo "  ✓ $f → $ref" || echo "  ✗ MISSING: $f → $ref"
  done
done

echo "=== Archived Utility ==="
for f in _archive/utility/index.html _archive/utility/levels/level-01-gateway.html; do
  for ref in $(grep -oE '(href|src)="[^"]+\.(css|js)"' "$f" | grep -oE '"[^"]+"' | tr -d '"'); do
    abs="$(dirname "$f")/$ref"
    [ -e "$abs" ] && echo "  ✓ $f → $ref" || echo "  ✗ MISSING: $f → $ref"
  done
done

echo "=== Archived Signal ==="
for f in _archive/signal/index.html _archive/signal/levels/level-01-gateway.html; do
  for ref in $(grep -oE '(href|src)="[^"]+\.(css|js)"' "$f" | grep -oE '"[^"]+"' | tr -d '"'); do
    abs="$(dirname "$f")/$ref"
    [ -e "$abs" ] && echo "  ✓ $f → $ref" || echo "  ✗ MISSING: $f → $ref"
  done
done
```

Every line should print `✓`. If any prints `✗`, stop and reset.

---

## Step 6 — Local browser test

Spin up a tiny static server in the repo root:

```bash
python3 -m http.server 8000
```

In your browser, click through every page. Open DevTools → Network panel and watch for any 404s.

| URL | What to verify |
|---|---|
| `http://localhost:8000/` | Wormhole Daily Run loads. Theme toggle works. Mobile menu works. |
| `http://localhost:8000/overview.html` | Wormhole overview, no 404s. |
| `http://localhost:8000/levels.html` | Wormhole levels index. Click each level link. |
| `http://localhost:8000/levels/level-01-gateway.html` | Wormhole level page, CSS loaded. |
| `http://localhost:8000/levels/level-10-seal.html` | Same. |
| `http://localhost:8000/custom.html` | Type a Run Sequence under Money. Click Save. Status says "Run Sequence saved." |
| `http://localhost:8000/bank.html` | Category grid shows. Click Money. Drill view shows the Run Sequence. Click Run Sequences chip. Filters work. |
| `http://localhost:8000/_archive/utility/` | Old Utility browsable. |
| `http://localhost:8000/_archive/utility/index.html` | Old Utility Daily Run loads. |
| `http://localhost:8000/_archive/utility/levels/level-01-gateway.html` | Old Utility level page loads. |
| `http://localhost:8000/_archive/signal/index.html` | Old Signal mode loads. |
| `http://localhost:8000/_archive/signal/levels/level-01-gateway.html` | Old Signal level page loads. |

Stop the server with Ctrl+C when done.

---

## Step 7 — Stage and commit atomically

```bash
git status --short
```

You should see ~79 entries. They are exactly the file operations the patch performed.

Stage everything:
```bash
git add -A
```

Commit with a clear message:
```bash
git commit -m "feat: promote Wormhole to root, archive Utility and Signal

- Move _experiments/wormhole-mode/ contents to repo root
- Archive previous root Utility site to _archive/utility/
- Archive _experiments/signal-mode/ to _archive/signal/
- Drop unused Wormhole font/, CHANGELOG.md, _file_ops/, wormhole-preview.html
- All path references verified at live root, _archive/utility, _archive/signal"
```

Confirm the commit landed:
```bash
git log -1 --oneline
git rev-parse --short HEAD
```

---

## Step 8 — Push the branch

```bash
git push -u origin feat/wormhole-promote-to-root
```

GitHub will print a URL to open a PR.

---

## Step 9 — Open and merge the PR

On GitHub:

1. Open the PR: base = `main`, compare = `feat/wormhole-promote-to-root`.
2. Title: `feat: promote Wormhole to root, archive Utility and Signal`.
3. Description: paste the commit message body.
4. Review the file list. You'll see ~79 files. Most are renames (R) and content swaps. Don't be alarmed by the size.
5. Merge. **Use "Squash and merge" or "Rebase and merge"** — they produce a single commit on `main` matching the intent. Don't use "Create a merge commit" (it adds noise).

---

## Step 10 — Verify GitHub Pages

After merge to `main`, GitHub Pages rebuilds automatically. The CDN can take up to 10 minutes.

Visit:

- `https://danielleackerman.github.io/the-protocol/` → should be Wormhole Daily Run
- `https://danielleackerman.github.io/the-protocol/custom.html` → save a Run Sequence
- `https://danielleackerman.github.io/the-protocol/bank.html` → see the saved Run Sequence in its category
- `https://danielleackerman.github.io/the-protocol/_archive/utility/` → old Utility browsable
- `https://danielleackerman.github.io/the-protocol/_archive/signal/` → old Signal browsable

If you hit it too fast and see the old site, hard-refresh (Cmd+Shift+R on Mac) and wait a few more minutes.

---

## Done

You now have:
- Wormhole as the live root site
- Old Utility and Signal preserved at stable archive URLs
- A safety tag (`pre-wormhole-root-migration`) for full rollback
- Clean git history showing exactly what moved where

---

## Rollback procedures (if needed)

### Quick rollback (preserves history)
Revert the migration commit on `main`:
```bash
git checkout main
git pull
git revert <migration-commit-sha>
git push origin main
```

### Hard rollback (rewrites history — only if revert is messy)
Reset to the safety tag:
```bash
git checkout main
git reset --hard pre-wormhole-root-migration
git push --force-with-lease origin main
```

⚠️ Force-push is destructive. Only do this if the revert path doesn't work and you've coordinated with anyone else who has the repo cloned.

### Restore individual files from the archive
The archived sites live forever at `_archive/utility/` and `_archive/signal/`. You can copy individual files back at any time:
```bash
cp _archive/utility/custom.html ./custom.html  # restores old Utility custom page
```

---

## What was deleted (not archived)

These were dropped because they're either unused or duplicated:

| Path | Why dropped |
|---|---|
| `_experiments/wormhole-mode/font/` | Zero `@font-face` rules in any CSS, zero `font/` references in any HTML. Confirmed unused. |
| `_experiments/wormhole-mode/CHANGELOG.md` | Folder-level changelog. Root `CHANGELOG.md` is the canonical one. |
| `_experiments/wormhole-mode/_file_ops/` | 7 internal audit markdowns (WORMHOLE_AUDIT.md, WORMHOLE_POLISH_*.md, etc.). Not site content. |
| `_experiments/wormhole-mode/wormhole-preview.html` | Dev preview page, not part of the live site. |

If you later decide you want any of these back, they exist in git history (and at the safety tag).

---

## What stays untouched at root

These files are at the repo root and the migration does not modify them:

- `.nojekyll` — required for GitHub Pages to serve `_archive/` (paths starting with `_` are normally Jekyll-hidden).
- `.obsidian/` — your editor metadata.
- `CHANGELOG.md` — the canonical root changelog.
- `IMPLEMENTATION_NOTES.md`
- `the-protocol-design-wireframe-notes.md`
- `_file-ops/` — your existing design-ops folder.

---

## Risks recap

| Risk | Mitigation |
|---|---|
| Pages CDN serves the old site briefly after push | Wait up to 10 minutes; hard-refresh. |
| Browser cache shows stale CSS | Hard-refresh (Cmd+Shift+R on Mac). |
| External bookmarks expect old Utility | They get Wormhole at the same URLs. Same data (localStorage key shared). Note in social/communications if needed. |
| `.nojekyll` accidentally deleted | Step 5 explicitly verifies it. |
| Patch fails to apply | Step 3 catches this before any change is made. Reset and retry. |
| Migration commit lands on wrong branch | Step 1 explicitly creates `feat/wormhole-promote-to-root`. Don't commit to the audit branch. |

---

## Why atomic single commit

Every alternative I considered had at least one moment where the live site would 404 a page. Atomic guarantees the swap is instant from the user's perspective: one commit, one Pages rebuild, one new state.

The downside is one large commit. The mitigation is `git mv` preserves history, so blame and log on individual files still work — the commit is just the rename event.

---

## Questions you might have

**Q: Will my Bank data survive?**
A: Yes. localStorage is per-browser, not in the repo. The key `the-protocol.bank.items.v12` is the same across Wormhole, the old Utility, and Signal. Items you've saved appear immediately in the new live site.

**Q: Can someone still link to old Utility?**
A: Yes. Old Utility lives at `https://danielleackerman.github.io/the-protocol/_archive/utility/` — every page works. The root URLs (`/index.html`, `/custom.html`, etc.) now serve Wormhole.

**Q: Why not redirect old URLs to the archive?**
A: You said you didn't want a redirect-only solution. The migration replaces content at root rather than redirecting. Old paths now point to the new (Wormhole) versions.

**Q: What if I want to undo the archive part later?**
A: Delete the `_archive/` folder when you're confident you don't need it. The safety tag still has the original state if needed.

**Q: Where is the safety tag?**
A: `pre-wormhole-root-migration` on the remote, pointing at commit `46a29ab`. It's permanent unless you delete it.
