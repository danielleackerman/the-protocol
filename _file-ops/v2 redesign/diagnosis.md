## diagnosis is correct

This pass **solved structure**, but it **broke the design language**.

What you’re seeing is not you being picky. There are real implementation problems.

---

# Root Causes

## 1. The fonts are not working because they were never actually wired up

Right now the CSS uses:

```css
font-family: Inter, ui-sans-serif, system-ui, ...
```

There is **no `@font-face` block** for your local fonts, and there is **no mono font assignment** anywhere.

### So:

- the **Space Age** files are present in `/assets/fonts/`
    
- but they are **not being loaded**
    
- and there is **no terminal/mono layer** at all
    

That is why the site lost the CLI feeling.

---

## 2. The redesign flattened everything because it used a generic migration wrapper

The new CSS is doing a broad “make all legacy content into cards” move through `.legacy-content`.

That preserved structure enough to split pages, but it **did not preserve chamber-specific typography, spacing, or micro-layout**.

### Result:

- run-on lines
    
- broken grouping
    
- pills/chips turned into plain text
    
- hierarchy lost
    
- command / switchboard / console areas no longer feel like interfaces
    

This is the single biggest visual problem after the font issue.

---

## 3. The homepage is doing too much at the top

You were right about **image 2**.

The top of the page currently has:

- a hero
    
- a subtitle
    
- buttons
    
- then a second action sequence
    
- then the migrated quick-start source below that
    

That is too much.

### The homepage should be:

- **fast**
    
- **tight**
    
- **straight to action**
    

Not narrated.

---

## 4. The accent usage got inverted

You said:

> **I wanted the text red not the buttons**

Correct. Right now the system puts the accent on **button fills**, which makes the UI feel heavier and less refined.

What should happen instead:

- **headings / key labels / numeric markers** = red
    
- **buttons** = chrome / ivory / subtle outline
    
- **active states** = restrained accent use
    
- **not giant filled red pills everywhere**
    

---

## 5. Dark mode red is wrong

Yes — the dark mode red is too bright, too warm, too tomato.

Current dark accent:

- too orange
    
- too “soup”
    
- too loud against graphite
    

You want a **deeper oxblood / garnet / iron-red**, not bright cooked red.

---

# Specific Problems I Can Confirm

## A. Missing font hierarchy

There is currently no meaningful split between:

- display font
    
- main UI sans
    
- mono / terminal / system text
    

That makes the whole interface feel generic.

---

## B. Run-on text and spacing bugs

Examples from your screenshots:

- `overflow.My default is magnetism...`
    
- `AbundanceON`
    
- other collapsed phrases
    

That is happening because the migrated HTML still contains grouped spans and interface fragments, but the new CSS does **not define how those pieces should display**.

So they fall back to inline text and collapse together.

---

## C. Main sequence cards are too big

On mobile the main action cards are taking too much vertical space because of:

- high padding
    
- `min-height`
    
- oversized visual framing
    
- too much dead air above content
    

That makes the homepage slower than it should be.

---

## D. The homepage contains both the new sequence _and_ the old quick-start source

That is one reason it feels redundant and bloated.

The top page should not contain:

- new hero/action sequence
    
- **plus**
    
- a second migrated “source” explanation block
    

That needs to be collapsed into one clean fast-action section.

---

## E. Terminal / CLI tone is missing

Even though the structure became multi-page, the **interaction language** no longer feels like:

- control panel
    
- protocol console
    
- command surface
    
- operator UI
    

It became too soft and generic.

You want:

- slightly terminal
    
- slightly command-line
    
- still clean
    
- not literally hacker green nonsense
    

That’s a typography + component styling issue.

---

# What Should Change First

## Priority 1 — Typography System

Restore a proper 3-tier typography system:

### 1. Display

Use the current branded display font **only where it helps**

- logo / mark
    
- possibly big page titles sparingly
    

### 2. UI Sans

Use a clean sans for body and interface

- Inter or system sans is fine here
    

### 3. Mono / Terminal

Use a true mono stack for:

- command lines
    
- labels
    
- status text
    
- breadcrumbs
    
- numeric chips
    
- small utility text
    
- code-ish interface text
    

### Immediate truth:

There is currently **no mono font in the design system**.

If you don’t want to add a local mono font file yet, use a strong system mono stack first:

- `SFMono-Regular`
    
- `Menlo`
    
- `Monaco`
    
- `Consolas`
    
- `Liberation Mono`
    
- monospace
    

---

## Priority 2 — Rebuild the homepage top section

The homepage should become:

### Top structure

- compact header
    
- one compact **Daily Run panel**
    
- one tight **sequence cell set**
    
- optional small breach panel
    
- links down to explanation
    

### Not this:

- giant hero narration
    
- oversized intro block
    
- duplicate quick-start content underneath
    

### Your instinct is right:

The fast-action sequence should be **at the top**.  
Explanation comes **after**.

---

## Priority 3 — Restore chamber-specific formatting

This is critical.

The redesign needs specific styling for things like:

- `.quick-lines`
    
- `.quick-switches`
    
- command blocks
    
- output areas
    
- console areas
    
- switch lists
    
- receipt lines
    
- status messages
    

Right now these elements are present in the HTML but not styled properly.

That is why things are collapsing into flat text.

---

## Priority 4 — Rebalance the accent system

Shift from:

- filled red buttons everywhere
    

to:

- red headings
    
- red section labels
    
- red numerals / chips
    
- buttons mostly neutral chrome / ivory
    
- filled red used **rarely**
    

---

## Priority 5 — Fix dark mode palette

Dark mode should use a **deeper cooler red**.

Think:

- oxblood
    
- garnet
    
- dried crimson
    
- iron red
    

Not:

- tomato
    
- coral
    
- bright alert-red
    

---

# Concrete Design Direction I Recommend

## Typography

### Brand / display

Use your decorative font sparingly:

- wordmark
    
- maybe selective large headings only
    

### Body

Use clean sans:

- Inter / system sans
    

### Mono

Use mono for:

- kicker text
    
- breadcrumbs
    
- labels
    
- status strings
    
- command text
    
- button micro-labels if needed
    
- “terminal” UI fragments
    

---

## Homepage layout

## Replace current top with:

### 1. Compact Daily Run header block

Very short:

- title
    
- one line
    
- maybe one utility row
    

### 2. Primary Sequence grid

Tight sequence cards:

- 01 Declare the Seat
    
- 02 Run Defaults
    
- 03 Set Switches
    
- 04 Issue One Command
    
- 05 Log the Receipt
    

These should be compact and fast, not tall billboard cards.

### 3. Optional one breach card

Simple and immediate:

- If Breached → Open Firewall
    

### 4. Explanation below

Then a divider:

- “Full explanation”
    
- overview links
    
- deeper pages
    

---

## Color hierarchy

## What should be red:

- H1 / H2 / H3
    
- card titles
    
- numeric markers
    
- important labels
    
- selected text accents
    

## What should not be mostly red:

- every main button fill
    
- giant call-to-action pills all over the page
    

## Button direction:

- chrome / ivory buttons
    
- red text or red outline
    
- maybe one primary filled action on a page max
    

---

# Specific Fixes the Dev Needs to Make

## 1. Add actual font loading

Add `@font-face` for the local display font.

Example direction:

```css
@font-face {
  font-family: "SpaceAge";
  src: url("../fonts/space age.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}
```

Then define tokens like:

```css
--font-display: "SpaceAge", sans-serif;
--font-ui: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
--font-mono: "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", monospace;
```

---

## 2. Stop using one giant generic legacy-content flattening approach

Keep the multi-page structure, but restore specific formatting for the migrated parts.

At minimum create rules for:

- `.quick-lines span`
    
- `.quick-switches span`
    
- `.quick-command`
    
- `.quick-label`
    
- switchboard item lists
    
- command outputs
    
- receipt/status blocks
    

For example:

- `span { display:block; }` where needed
    
- chip grids instead of inline run-ons
    
- consistent gaps
    

---

## 3. Rebuild the Daily Run page top

Remove or heavily compress:

- large hero narration
    
- duplicate migrated quick-start source block
    

Use **one fast action section** at top.

---

## 4. Reduce mobile card height

The current action cards use too much vertical space.

Reduce:

- padding
    
- `min-height`
    
- excess whitespace above headings
    

---

## 5. Make buttons neutral

Change primary buttons from red fills to:

- neutral surface
    
- red text
    
- subtle border
    
- subtle hover
    

Maybe reserve filled red only for one emergency or high-priority action.

---

## 6. Tune dark red

Replace the dark accent from the current tomato tone to something deeper.

A better starting point would be more like:

```css
[data-theme="dark"] {
  --color-accent: #a63a43;
  --color-accent-dark: #7f2731;
  --color-accent-soft: rgba(166, 58, 67, 0.14);
}
```

Or even a little cooler/darker than that.

---

## 7. Restore slight terminal feeling

Use mono in:

- kickers
    
- breadcrumbs
    
- small labels
    
- status bars
    
- command text
    
- code / outputs
    

Also use:

- tighter utility text
    
- slightly more structured alignment
    
- not over-round everything
    
- more crisp interface rhythm
    

---

# My Audit Summary in One Sentence

The redesign **got the architecture right**, but **the visual and typographic system was rebuilt too generically**, which stripped away the hierarchy, terminal character, and chamber-specific formatting.

---

# Recommended Next Move

## Best next step

Do a **targeted corrective pass**, not a total restart.

That pass should focus on:

- **fonts**
    
- **homepage compression**
    
- **text hierarchy**
    
- **mono / terminal layer**
    
- **button color rebalance**
    
- **dark mode red correction**
    
- **restoring specific formatting to quick-start and switchboard content**
    

---

# If you want, I can do the next step as either:

- **a sharp design/dev correction brief for Claude**
    
- **a precise CSS/HTML fix list file-by-file**
    
- **a prioritized punch list in commit order**
    

My recommendation:

## **Let me write the Claude correction brief next**

because this now needs a **surgical repair pass**, not another abstract design discussion.