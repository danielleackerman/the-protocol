# V13 - Levels Page Polish

## Changes

- Removed the redundant `Chambers` heading.
- Converted level labels from inert text into links to the matching level page.
- Preserved no-underline treatment on linked level text.
- Gave the `Open` buttons a stronger graphite utility color so the action is clearer.

## Acceptance check

```bash
grep -n "Chambers" levels.html
grep -n "state-label--link" levels.html
```

Expected:
- `Chambers` should return no results.
- `state-label--link` should appear for each level row.
