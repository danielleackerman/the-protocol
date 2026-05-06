# Wormhole-Inspired Style Spec for The Protocol

## Source

Primary inspiration: `phenomenalm.com/the-wormhole`

This spec translates the inspiration page into a distinct **Protocol design direction**. It is not a clone brief.

Do not copy:
- logo
- photography
- exact layout
- exact copy
- exact animations
- exact brand marks
- exact sales structure

Borrow only the visual grammar:
- black / white contrast
- declarative manifesto typography
- compressed, ritualized section rhythm
- phase-based progression
- repeated entry-point CTAs
- cinematic threshold energy
- sparse pages with high emotional force
- editorial luxury restraint

---

# 01. Design Thesis

The Protocol should feel like an **operating chamber**.

Not a dashboard.
Not a utility console.
Not a neon cyber interface.
Not a beige workbook.

The style should communicate:

```txt
enter the structure
run the sequence
collapse hesitation
install the command
seal the state
```

The interface should feel like a threshold: clean, severe, cinematic, and intentional.

---

# 02. Mode Concept

Use two modes, but do not treat them as generic “dark” and “light.”

## Dark Mode: Chamber

Chamber is the primary immersive mode.

It should feel like:

```txt
black room
white command
ritual threshold
luxury landing page
identity transmission
high-contrast manifesto
```

## Light Mode: Field

Field is the readable / operational mode.

It should feel like:

```txt
ivory field
printed manual
clear decision page
warm editorial surface
ritual workbook
```

## UI Labels

Preferred labels:

```txt
CHAMBER
FIELD
```

Acceptable fallback labels:

```txt
DARK
LIGHT
```

Avoid:

```txt
Utility
Signal
Cyber
Theme 1
Theme 2
```

---

# 03. Visual Keywords

Use these as the creative north star:

```txt
black
ivory
white
threshold
portal
compression
field
chamber
entry
lock
transmission
ritual
architecture
proof
decision
leap
```

Avoid these as style drivers:

```txt
neon
dashboard
teal system
magenta breach
sci-fi arcade
Epcot space font
gray app shell
generic glassmorphism
```

---

# 04. Color System

## Dark / Chamber Tokens

```css
:root {
  --wh-void: #030201;
  --wh-black: #070504;
  --wh-ink: #11100d;
  --wh-charcoal: #17130f;

  --wh-white: #ffffff;
  --wh-ivory: #fff8ec;
  --wh-bone: #efe5d5;
  --wh-muted: rgba(255, 248, 236, .68);

  --wh-gold: #c9a45c;
  --wh-gold-hot: #f0c46a;
  --wh-bronze: #8a6532;
  --wh-clay: #a9685d;

  --wh-border: rgba(255, 248, 236, .16);
  --wh-border-strong: rgba(240, 196, 106, .42);
}
```

## Light / Field Tokens

```css
:root {
  --wh-field: #f7efe1;
  --wh-paper: #fffaf0;
  --wh-paper-warm: #efe0ca;

  --wh-text: #14110d;
  --wh-text-soft: #3a3025;
  --wh-muted-light: #6f6255;

  --wh-gold-light: #a97e32;
  --wh-gold-soft: #dfc18b;
  --wh-clay-light: #b87968;

  --wh-light-border: rgba(20, 17, 13, .16);
  --wh-light-border-strong: rgba(169, 126, 50, .38);
}
```

## Color Rules

Use:

```txt
black / ivory = main identity
white = command clarity
gold = threshold / active / selected / entry
clay = body warmth / warning / emphasis
```

Do not use:

```txt
cyan as main structure
magenta as main atmosphere
green / red dashboard states
gray panel soup
```

---

# 05. Background Atmosphere

## Chamber Background

Dark mode should be near-black but not flat.

```css
html[data-theme="dark"] body {
  background:
    radial-gradient(ellipse at 50% -10%, rgba(240, 196, 106, .18), transparent 34rem),
    radial-gradient(circle at 8% 18%, rgba(169, 104, 93, .14), transparent 26rem),
    radial-gradient(circle at 92% 10%, rgba(201, 164, 92, .12), transparent 28rem),
    linear-gradient(180deg, #0d0a07 0%, #050403 58%, #020201 100%);
}
```

The page should read as:

```txt
black first
warm light second
no decorative noise
no cyber grid
```

## Field Background

Light mode should feel like paper with atmosphere.

```css
html[data-theme="light"] body {
  background:
    radial-gradient(ellipse at 50% -12%, rgba(223, 193, 139, .38), transparent 34rem),
    radial-gradient(circle at 0% 0%, rgba(184, 121, 104, .14), transparent 24rem),
    radial-gradient(circle at 100% 8%, rgba(169, 126, 50, .14), transparent 28rem),
    linear-gradient(135deg, #fffaf0 0%, #f7efe1 48%, #efe0ca 100%);
}
```

The page should read as:

```txt
ivory
warm
editorial
readable
not washed out
```

---

# 06. Typography System

The inspo depends heavily on declarative language and stark hierarchy. The Protocol should do the same.

## Recommended CSS Variables

```css
:root {
  --font-display: "Cormorant Garamond", "Bodoni 72", "Didot", Georgia, serif;
  --font-body: "Inter", "Avenir Next", "Helvetica Neue", Arial, sans-serif;
  --font-mono: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace;
}
```

## Display Type

Use for:

```txt
hero title
major manifesto statements
section openers
large command moments
```

Treatment:

```css
font-family: var(--font-display);
font-size: clamp(4rem, 11vw, 10rem);
line-height: .82;
letter-spacing: -.055em;
text-transform: uppercase;
```

Rules:

```txt
large
high contrast
editorial
severe
spacious
not sci-fi
not cute
```

## Body Type

Use for:

```txt
instructions
level descriptions
reference text
saved items
longer operational copy
```

Treatment:

```css
font-family: var(--font-body);
font-size: clamp(1rem, 1.2vw, 1.15rem);
line-height: 1.55;
```

Rules:

```txt
clear
readable
short line lengths
no long horizontal runs
```

## Mono Type

Use for:

```txt
labels
kickers
buttons
nav
phase tags
status rows
metadata
```

Treatment:

```css
font-family: var(--font-mono);
font-size: .72rem;
letter-spacing: .14em;
text-transform: uppercase;
```

---

# 07. Layout Rhythm

The inspiration page uses a strong long-scroll rhythm:

```txt
statement
short paragraph
entry point
statement
phase
proof
entry point
FAQ / close
```

Translate this into The Protocol as:

```txt
identity statement
daily operation
level path
custom controls
saved ledger
seal / close
```

## Section Rules

Each major section should have:

```txt
one strong headline
one short supporting paragraph
one clear action or state
one visual boundary
```

Avoid:

```txt
dense dashboards
wide walls of copy
too many equal-weight cards
large blocks without a decision point
```

---

# 08. Hero System

The hero is the strongest visual moment.

## Required Hero Ingredients

```txt
large declarative H1
short kicker
one compressed lede
one primary CTA
one secondary link only if necessary
subtle portal / oval motif
```

## Hero Copy Shape

Do not use paragraphs that explain too much.

Use short declarative lines:

```txt
ENTER THE PROTOCOL.
RUN THE DAILY TRANSMISSION.
SAVE THE PEAK.
RAISE THE FLOOR.
```

## Hero Layout

```css
.identity,
.hero {
  min-height: clamp(520px, 72vh, 860px);
  display: grid;
  align-content: center;
  gap: clamp(1.2rem, 2.5vw, 2.4rem);
}
```

## Portal Motif

Use one of these lightly:

```txt
oval ring
eclipse
thin orbit line
gold seam
black aperture
white threshold
```

Do not scatter motifs everywhere.

---

# 09. Panel System

Panels should feel editorial, not app-like.

## Chamber Panels

```css
.panel {
  background:
    linear-gradient(180deg, rgba(255, 248, 236, .06), rgba(255, 248, 236, .025)),
    rgba(7, 5, 4, .78);
  border: 1px solid rgba(255, 248, 236, .16);
  box-shadow:
    0 24px 70px rgba(0, 0, 0, .48),
    inset 0 1px 0 rgba(255, 248, 236, .08);
}
```

## Field Panels

```css
.panel {
  background:
    linear-gradient(180deg, rgba(255, 255, 255, .72), rgba(255, 250, 240, .90));
  border: 1px solid rgba(20, 17, 13, .16);
  box-shadow:
    0 20px 50px rgba(64, 44, 24, .12),
    inset 0 1px 0 rgba(255, 255, 255, .82);
}
```

## Panel Rules

```txt
thin borders
large radius but not bubbly
premium paper / lacquer feeling
no nested dashboard clutter
no random glass cards
```

Suggested radius:

```css
border-radius: 24px;
```

---

# 10. Buttons / CTAs

The inspiration page uses repeated, clear entry points. The Protocol should do the same.

## CTA Language

Use verbs like:

```txt
ENTER
RUN
INSTALL
OPERATE
SAVE
SEAL
LOCK
RETURN
```

## Chamber Button

```css
.button {
  border: 1px solid rgba(240, 196, 106, .42);
  background:
    linear-gradient(180deg, rgba(240, 196, 106, .14), rgba(240, 196, 106, .05));
  color: #fff8ec;
  font-family: var(--font-mono);
  letter-spacing: .13em;
  text-transform: uppercase;
}
```

## Field Button

```css
.button {
  border: 1px solid rgba(169, 126, 50, .38);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, .72), rgba(223, 193, 139, .22));
  color: #14110d;
  font-family: var(--font-mono);
  letter-spacing: .13em;
  text-transform: uppercase;
}
```

## Button Rules

```txt
not chunky
not gray
not neon
not pill-heavy
clear active state
primary CTA repeats at key thresholds
```

---

# 11. Phase / Level System

The inspiration uses phase structure: install, operate, embody, lock.

For The Protocol, use this grammar directly.

## Suggested Protocol Phase Labels

```txt
01 // GATEWAY
02 // DAILY OPERATION
03 // FIREWALL
04 // SWITCHBOARD
05 // COMMAND LINE
06 // SAVE STATE
07 // LOCATION
08 // SOVEREIGN CODEX
09 // RENDER CONFIRMATION
10 // SEAL
```

## Phase Card Layout

Each phase / level card should contain:

```txt
level number
short command title
one-sentence purpose
primary action
state marker
```

Avoid:

```txt
long explanations inside cards
huge blocks of body text
equal visual weight for everything
```

---

# 12. Hover / Selected States

Selected states must visibly light up.

## Chamber Selected State

```css
.is-selected,
[aria-pressed="true"],
.selected {
  border-color: rgba(240, 196, 106, .62);
  background:
    radial-gradient(circle at 50% 0%, rgba(240, 196, 106, .20), transparent 7rem),
    linear-gradient(180deg, rgba(255, 248, 236, .09), rgba(255, 248, 236, .03));
  box-shadow:
    0 0 0 1px rgba(240, 196, 106, .24),
    0 0 34px rgba(240, 196, 106, .16);
}
```

## Field Selected State

```css
.is-selected,
[aria-pressed="true"],
.selected {
  border-color: rgba(169, 126, 50, .52);
  background:
    radial-gradient(circle at 50% 0%, rgba(223, 193, 139, .34), transparent 7rem),
    linear-gradient(180deg, rgba(255, 255, 255, .88), rgba(255, 250, 240, .94));
  box-shadow:
    0 0 0 1px rgba(169, 126, 50, .20),
    0 14px 34px rgba(169, 126, 50, .16);
}
```

## Hover Rule

Hover may preview the selected state, but it should be quieter.

```txt
hover = invitation
selected = activation
```

---

# 13. Navigation / Header

Header should not feel like a heavy application toolbar.

## Chamber Header

```css
.site-header {
  background: rgba(5, 4, 3, .78);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(255, 248, 236, .12);
}
```

## Field Header

```css
.site-header {
  background: rgba(255, 250, 240, .78);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(20, 17, 13, .12);
}
```

## Nav Rules

```txt
small
precise
uppercase
thin border active states
no loud chips
no cyan signal controls
```

---

# 14. Forms / Custom Controls

Custom controls should feel like command fields, not web forms.

## Inputs

```css
input,
select,
textarea {
  border: 1px solid var(--wh-border);
  background: rgba(255, 248, 236, .04);
  color: inherit;
  font-family: var(--font-body);
}
```

## Focus State

```css
input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: rgba(240, 196, 106, .62);
  box-shadow: 0 0 0 3px rgba(240, 196, 106, .16);
}
```

## Rules

```txt
labels use mono
inputs remain readable
focus is warm gold
no blue browser default ring
no neon glow
```

---

# 15. Light Mode Requirements

Field mode must be fully designed.

It cannot be a weak inversion of Chamber.

## Field Must Have

```txt
warm paper background
black / charcoal text
clear gold active state
paper-card panels
strong readable contrast
same structure as Chamber
```

## Field Must Avoid

```txt
gray-on-beige mush
washed-out panels
low-contrast gold text
random pastel blush
utility gray controls
```

---

# 16. Mobile Rules

The inspiration relies on strong stacked sections. Mobile should embrace that.

## Mobile Requirements

```txt
large hero remains dramatic
line lengths stay short
labels do not crowd
buttons stack cleanly
cards have enough padding
selected states remain obvious
nav does not dominate
```

## Mobile Type

```css
@media (max-width: 720px) {
  h1 {
    font-size: clamp(3.4rem, 18vw, 6.5rem);
    line-height: .86;
  }

  .lede {
    max-width: 32rem;
  }
}
```

---

# 17. Content Tone Rules

The visual direction depends on language rhythm.

Use:

```txt
short sentences
strong declarations
threshold language
command verbs
phase language
binary choice moments
```

Avoid:

```txt
soft coaching language
overexplaining
long paragraph justification
generic wellness copy
generic app instruction copy
```

Good Protocol tone:

```txt
Enter the Protocol.
Run the daily transmission.
Save your daily peaks and raise your floor.
The command executes at the resolution of the specific.
The seal is the return point.
```

---

# 18. Implementation Boundary

This style spec applies only to:

```txt
_experiments/wormhole-mode/
```

Primary implementation files:

```txt
wormhole-dark.css
wormhole-light.css
wormhole-lab.js
index.html
overview.html
levels.html
custom.html
bank.html
levels/*.html
```

Do not change production files until the Wormhole experiment is approved.

---

# 19. Acceptance Criteria

## Chamber Passes If

```txt
the page feels black / ivory / gold
the hero feels like a threshold
selected cells visibly activate
panels feel premium, not gray
the design is cinematic but readable
there is no cyan/magenta Signal residue
```

## Field Passes If

```txt
light mode feels designed
text contrast is strong
panels feel like premium paper
gold active states remain visible
the page feels editorial, not utility beige
```

## Overall Passes If

```txt
the design feels inspired by the reference page
it does not copy the reference page
it still feels like The Protocol
it supports the existing level structure
it gives the project a stronger visual spine
```

---

# 20. Failure Conditions

The pass fails if it looks like:

```txt
Signal with gold added
Utility with beige added
generic luxury template
cyber dashboard
flat black page
over-glowed ritual poster
unreadable editorial experiment
```

The style must be severe, clear, warm, and operational.
