# Signal Mode Style Spec

Signal Mode is a separate experimental visual skin for **The Protocol**.

It must preserve the current Utility site structure and only change the visual language.

```txt
Utility = production
Signal = experimental
```

Signal work stays isolated in:

```txt
_experiments/signal-mode/
```

Do not connect Signal CSS or JS to the production site until the Signal skin is fully designed, tested, and approved.

---

## 01. Core Principle

Signal Mode is **not** Utility Mode with teal added.

Signal Mode is a separate skin extracted from the v0 visual language.

It must preserve:

```txt
same HTML structure
same pages
same content hierarchy
same operation rows
same reference blocks
same nav order
same localStorage behavior
```

It may change:

```txt
background atmosphere
panel surfaces
borders
glow
button treatment
H1 treatment
typography accents
mode control styling
```

---

## 02. Required Modes

Signal Mode must support two skins:

```txt
Signal Dark
Signal Light
```

These are not simple inversions of each other.

**Signal Dark** comes from the v0 main protocol / transmission style.

**Signal Light** comes from the v0 Custom page / pale signal glass style.

---

## 03. Signal Dark — Visual Target

Signal Dark should feel like:

```txt
protocol transmission
black field
cyan signal
red breach / power accent
glass panels
subtle grid
controlled glow
command interface
```

Signal Dark must not feel like:

```txt
gray utility dark mode
Christmas red / green
neon everywhere
random gradient wash
dashboard clutter
```

### Signal Dark Palette

```css
--signal-void: #030609;
--signal-black-blue: #061014;
--signal-night: #0a1720;
--signal-deep-teal: #0f3d44;
--signal-teal: #1f747b;
--signal-cyan-haze: #68d7d2;
--signal-cyan-hot: #52f0ff;
--signal-red: #ff315d;
--signal-magenta: #ff4d87;
--signal-bone: #f3f1ea;
```

### Signal Dark Background

Use a near-black base with red/cyan field glow.

```css
background:
  radial-gradient(circle at 12% 0%, rgba(255, 49, 93, .18), transparent 26rem),
  radial-gradient(circle at 84% 10%, rgba(104, 215, 210, .18), transparent 30rem),
  linear-gradient(180deg, #071116 0%, #04080b 58%, #020406 100%);
```

The page must read as:

```txt
black base
red / magenta flare upper-left
cyan / teal flare upper-right
deep vertical falloff
no gray oatmeal surfaces
```

### Signal Dark Texture Layer

Use subtle field texture:

```css
body::before {
  background-image:
    linear-gradient(rgba(255, 255, 255, .028) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, .022) 1px, transparent 1px),
    radial-gradient(circle, rgba(255, 255, 255, .14) 1px, transparent 1px);
  background-size: 72px 72px, 72px 72px, 210px 210px;
  opacity: .34;
}
```

Use a very soft scanline / light leak layer:

```css
body::after {
  background:
    linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, .035) 50%, transparent 52%),
    linear-gradient(90deg, rgba(255, 49, 93, .08), transparent 16%, transparent 76%, rgba(104, 215, 210, .08));
  background-size: 100% 5px, 100% 100%;
  mix-blend-mode: screen;
  opacity: .28;
}
```

This should create a **transmission field**, not a decorative pattern.

---

## 04. Signal Light — Visual Target

Signal Light should feel like:

```txt
v0 Custom page
pale signal glass
cyan / pink atmosphere
soft interface
readable teal text
light but still Protocol
```

Signal Light must not feel like:

```txt
beige utility
plain gray
washed-out dashboard
random pastel makeup blog
```

### Signal Light Palette

```css
--signal-light-bg: #e8f2f1;
--signal-light-bg-2: #d2dddd;
--signal-light-surface: rgba(248, 246, 240, .82);
--signal-light-surface-cool: rgba(236, 244, 243, .88);
--signal-light-text: #071116;
--signal-light-text-soft: #18363c;
--signal-light-muted: #4b6468;
--signal-light-teal: #1f747b;
--signal-light-cyan: #52f0ff;
--signal-light-magenta: #b82e55;
```

### Signal Light Background

Use pale cyan/pink signal atmosphere:

```css
background:
  radial-gradient(circle at 0% 0%, rgba(82, 240, 255, .32), transparent 22rem),
  radial-gradient(circle at 100% 0%, rgba(255, 77, 135, .22), transparent 24rem),
  linear-gradient(135deg,
    rgba(238, 252, 248, .95),
    rgba(244, 231, 241, .92) 48%,
    rgba(224, 247, 248, .93));
```

Signal Light should feel:

```txt
misty
glass-like
cool
teal-structured
softly charged
```

---

## 05. Panel Surfaces

### Signal Dark Panels

Dark panels use translucent glass:

```css
background: rgba(5, 14, 18, .72);
border: 1px solid rgba(210, 244, 246, .16);
box-shadow: 0 18px 56px rgba(0, 0, 0, .32);
```

Active / primary panels may use:

```css
border-color: rgba(104, 215, 210, .42);
box-shadow:
  0 22px 70px rgba(0, 0, 0, .42),
  0 0 0 1px rgba(104, 215, 210, .08);
```

Inner areas:

```css
background: rgba(1, 5, 8, .38);
border: 1px solid rgba(210, 244, 246, .14);
box-shadow: inset 0 1px 0 rgba(255, 255, 255, .035);
```

### Signal Light Panels

Light panels use translucent white glass:

```css
border: 1px solid rgba(15, 61, 68, .18);
border-radius: 18px;
background: rgba(255, 255, 255, .58);
box-shadow:
  0 18px 42px rgba(10, 35, 42, .12),
  inset 0 1px 0 rgba(255, 255, 255, .62);
backdrop-filter: blur(10px);
```

### Panel Rules

Panels must remain:

```txt
flat
single-layered
readable
not nested dashboards
not decorative cards inside cards
```

---

## 06. Borders

### Signal Dark Borders

```css
--signal-border-default: rgba(210, 244, 246, .16);
--signal-border-active: rgba(104, 215, 210, .42);
--signal-border-alert: rgba(255, 49, 93, .44);
```

### Signal Light Borders

```css
--signal-light-border: rgba(15, 61, 68, .18);
--signal-light-input-border: rgba(15, 61, 68, .20);
--signal-light-focus-border: rgba(0, 128, 140, .46);
--signal-light-hot-border: rgba(163, 41, 82, .28);
```

### Border Rules

Use:

```txt
cyan / teal for structure
red / magenta for breach, danger, alert, or hot signal only
soft dividers inside sections
stronger dividers between major reference sections
```

Do not make every divider bright.

---

## 07. Glow Level

Signal glow must be controlled.

### Heavy Glow

Only for major hero / field containers:

```css
box-shadow: 0 24px 80px rgba(0, 0, 0, .58);
```

### Panel Glow

```css
box-shadow: 0 18px 56px rgba(0, 0, 0, .32);
```

### Active Cyan Glow

```css
text-shadow: 0 0 10px rgba(82, 240, 255, .26);
box-shadow: inset 0 0 22px rgba(104, 215, 210, .08);
```

### Light Mode Glow

```css
box-shadow:
  0 18px 42px rgba(10, 35, 42, .12),
  inset 0 1px 0 rgba(255, 255, 255, .62);
```

### Glow Rules

```txt
active signal = small cyan glow
alert = red edge only
panels = shadow depth
light mode = glass shadow
no glow on every element
```

---

## 08. Header / Nav

### Signal Dark Header

```css
background: rgba(3, 6, 9, .76);
backdrop-filter: blur(18px);
border-bottom: 1px solid rgba(210, 244, 246, .12);
```

### Signal Nav Items

Default:

```css
background: rgba(255, 255, 255, .025);
border: 1px solid transparent;
color: rgba(243, 241, 234, .86);
```

Hover / active:

```css
border-color: rgba(104, 215, 210, .42);
background: rgba(104, 215, 210, .07);
color: #f3f1ea;
```

### Nav Rules

```txt
mono uppercase
compact
glass header
cyan active edge
red never used for normal nav
```

---

## 09. Buttons

### Signal Dark Button

```css
border: 1px solid rgba(104, 215, 210, .42);
background: rgba(104, 215, 210, .08);
color: #f3f1ea;
font-family: var(--font-mono);
letter-spacing: .11em;
text-transform: uppercase;
```

Alert / hot button:

```css
border-color: rgba(255, 49, 93, .44);
background: rgba(255, 49, 93, .07);
```

### Signal Light Button

```css
border: 1px solid rgba(15, 61, 68, .24);
background:
  radial-gradient(circle at 20% 0%, rgba(82, 240, 255, .30), transparent 5rem),
  rgba(20, 52, 58, .08);
color: #14343a;
```

Hot light button:

```css
border-color: rgba(163, 41, 82, .28);
background:
  radial-gradient(circle at 20% 0%, rgba(255, 77, 135, .22), transparent 5rem),
  rgba(163, 41, 82, .08);
```

### Button Rules

```txt
mono uppercase
thin border
compact
cyan / teal atmosphere
red / magenta only for alert / hot
not chunky gray app buttons
```

---

## 10. H1 Treatment

Utility H1 can stay plain / outlined.

Signal H1 should be more atmospheric:

```css
font-family: var(--font-ui);
letter-spacing: -0.045em;
text-transform: uppercase;
-webkit-text-stroke: 1.15px var(--signal-cyan-hot);
color: rgba(82, 240, 255, .10);
text-shadow:
  0 0 34px rgba(104, 215, 210, .18),
  0 0 3px rgba(255, 255, 255, .22);
```

Do not bring back Space Age everywhere yet.

Possible future use:

```txt
Space Age only for brand / hero experiments inside Signal preview
not production Utility
not body copy
```

---

## 11. Typography Accents

### Display / H1

```txt
large identity text
outlined or faintly glowing
not heavy filled block
```

### Mono

Use mono for:

```txt
nav
buttons
kickers
labels
status
command lines
table keys
mode control
```

### Sans

Use sans for:

```txt
paragraphs
instructions
reference text
readable body copy
```

### Accent Color Rules

```txt
cyan-haze = labels / system metadata
cyan-hot = active / selected / live
red-signal = breach / alert / hot power only
magenta = atmosphere or rare emphasis only
bone = dark readable text
deep teal = light readable text
```

---

## 12. Mode Control

The Signal control must not be a random decorative color chip.

It should read as a **branded style selector**.

Recommended control:

```txt
[SIGNAL]
```

With a small internal visual mark:

```txt
cyan / magenta strip
or dark glass mini-swatch
or tiny signal-grid preview
```

Active state:

```txt
cyan border
subtle cyan glow
label remains readable
```

Inactive state:

```txt
neutral header glass
no loud glow
```

The Signal control should feel like:

```txt
brand system control
not toy button
not makeup color chip
```

---

## 13. Selector Architecture

Signal must be fenced.

All Signal CSS must be scoped to:

```css
html[data-skin="signal"][data-theme="dark"] { ... }
html[data-skin="signal"][data-theme="light"] { ... }
html[data-skin="signal"] .panel { ... }
```

Signal must never leak into Utility.

Utility must remain unaffected unless:

```html
<html data-skin="signal">
```

Do not write unscoped rules like:

```css
.panel {
  background: signal-gradient;
}
```

Every Signal rule must start with one of:

```css
html[data-skin="signal"]
html[data-skin="signal"][data-theme="dark"]
html[data-skin="signal"][data-theme="light"]
```

---

## 14. Acceptance Criteria

Signal Dark passes if:

```txt
background feels like v0 dark protocol / transmission
panels read as dark glass
cyan borders define structure
red appears only as atmosphere / alert
H1 feels signal-like
buttons are mono / cyan / glass
Utility mode remains untouched
```

Signal Light passes if:

```txt
background feels like v0 Custom page
pale cyan / pink atmosphere is visible
panels are translucent glass
text is deep teal / black, not gray
magenta is controlled
buttons feel signal-light, not utility gray
Utility mode remains untouched
```

Mode control passes if:

```txt
clearly indicates Signal
does not look tacky
does not overcrowd mobile header
active state is obvious
Utility remains default
```

Failure conditions:

```txt
Signal looks like teal-washed Utility
Signal contaminates Utility
red / green Christmas effect
everything glows
button looks decorative / random
light mode becomes beige / gray
dark mode becomes plain utility dark
```

---

## 15. Implementation Files

Build Signal here first:

```txt
_experiments/signal-mode/
  SIGNAL_STYLE_SPEC.md
  signal-dark.css
  signal-light.css
  signal-preview.html
```

Do not connect to production until approved.

---

## 10. V9.37 Extraction Pass Addendum

The uploaded `v9.37-index.html` is the current visual implementation source for Signal Dark depth and atmosphere.

The Signal lab should extract the following v9.37 rules literally where possible, then map them onto Utility selectors:

```txt
v9 body background stack      -> Signal `body`
v9 body::before texture      -> Signal `body::before`
v9 body::after scanline      -> Signal `body::after`
v9 app-shell                 -> Utility `.site-header`
v9 entry-gate                -> Utility `.signal-hero`
v9 level-summary chamber row -> Utility level directory `.state-row`
v9 l1-block / level cards    -> Utility `.panel`, `.ref-block`, `.seq-row`, `.flat-row`
v9 buttons / inputs          -> Utility `.button`, `.page-actions a`, `input`, `select`
```

Do not copy the v9 layout architecture into production. The rule is:

```txt
v9 = visual source
Utility = structure source
Signal lab = isolated mapping layer
```
