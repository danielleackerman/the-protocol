# Multi-Page Redesign Package

**For:** _The Protocol_  
**Goal:** easier use, cleaner aesthetic, faster daily access, no scroll-trap accordion system

---

# 1. Page-by-Page Site Map

## Recommended structure

```txt
/
├── index.html                         Daily Run / Immediate Actions
├── overview.html                      System overview / how the protocol works
├── levels.html                        Level index / map of Levels 01–10
├── levels/
│   ├── level-01-gateway.html
│   ├── level-02-daily-operation.html
│   ├── level-03-firewall.html
│   ├── level-04-switchboard.html
│   ├── level-05-command-line.html
│   ├── level-06-save-state.html
│   ├── level-07-location.html
│   ├── level-08-sovereign-codex.html
│   ├── level-09-render-confirmation.html
│   └── level-10-seal.html
├── custom.html                        Custom configuration / defaults
└── assets/
    ├── css/
    │   └── protocol.css
    ├── js/
    │   └── protocol.js
    └── fonts/
```

## Core rule

**Homepage = action.**  
**Other pages = explanation.**

The user should not have to open a huge accordion to run the system.

---

# 2. Global Navigation Model

## Desktop header

```txt
┌────────────────────────────────────────────────────────────┐
│ THE PROTOCOL          Daily Run | Overview | Levels | Custom │
│                                           Light/Dark Toggle │
└────────────────────────────────────────────────────────────┘
```

## Mobile header

```txt
┌──────────────────────────────┐
│ THE PROTOCOL        ☰   ◐    │
└──────────────────────────────┘

Menu opens:
- Daily Run
- Overview
- Levels
- Custom
```

## Required navigation behavior

Every page needs:

- **top nav**
    
- **theme toggle**
    
- **Back to Daily Run** button on all non-home pages
    
- **Previous / Next** navigation on level pages
    
- clear active page state
    

---

# 3. Page Wireframe Brief

---

# Page 1 — `index.html`

## Daily Run / Immediate Actions

## Purpose

This is the operating console.  
This page should answer:

> “What do I do right now?”

It should not try to explain the whole system.

---

## Wireframe

```txt
┌──────────────────────────────────────────────┐
│ HEADER                                       │
│ The Protocol       Daily Run Overview Levels │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ HERO / ACTION PANEL                          │
│ Daily Run                                    │
│ Run the daily transmission.                  │
│                                              │
│ [Start Daily Run] [Breach Protocol]          │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ DAILY SEQUENCE                               │
│ 1. Declare the Seat                          │
│ 2. Run Defaults                              │
│ 3. Set Switches                              │
│ 4. Issue One Command                         │
│ 5. Log the Receipt                           │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ BREACH CARD                                  │
│ Run this the moment you feel the breach.     │
│ [Open Firewall Protocol]                     │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ QUICK ACCESS GRID                            │
│ [Levels] [Custom Defaults] [Seal] [Overview] │
└──────────────────────────────────────────────┘
```

---

## Content to include

### Hero

- `Daily Run`
    
- `Run the daily transmission.`
    
- concise 1–2 sentence explanation max
    

### Primary action cards

- Declare the Seat
    
- Run Defaults
    
- Set Switches
    
- Issue One Command
    
- Log the Receipt
    

### Emergency shortcut

- Breach / Firewall card
    
- Link to Level 03
    

### Quick links

- Full Protocol Overview
    
- Level Index
    
- Custom Defaults
    
- Level 10 Seal
    

---

## Content to remove from homepage

Move all long explanations off the homepage:

- full Level 01–10 explanations
    
- long conceptual blocks
    
- detailed laws / render theory / codex material
    
- oversized accordions
    

---

# Page 2 — `overview.html`

## Protocol Overview

## Purpose

This page explains the system at a high level.

It should answer:

> “What is this system and how do the levels relate?”

---

## Wireframe

```txt
┌──────────────────────────────────────────────┐
│ HEADER                                       │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ PAGE TITLE                                   │
│ Protocol Overview                           │
│ The system in one map.                       │
│ [Back to Daily Run]                          │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ SYSTEM SUMMARY                               │
│ Short explanation of The Protocol            │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ LEVEL MAP                                    │
│ 01 Gateway       06 Save State               │
│ 02 Operation     07 Location                 │
│ 03 Firewall      08 Codex                    │
│ 04 Switchboard   09 Confirmation             │
│ 05 Command       10 Seal                     │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ HOW TO USE THIS SITE                         │
│ Daily Run first. Levels when needed.         │
│ Custom page for personal configuration.      │
└──────────────────────────────────────────────┘
```

---

## Content to include

- short system summary
    
- what the levels are
    
- how Daily Run relates to the full installation
    
- when to use overview vs levels vs custom
    
- link grid to all main pages
    

---

# Page 3 — `levels.html`

## Levels Index

## Purpose

This is the clean replacement for the old accordion stack.

It should answer:

> “Which level do I need?”

---

## Wireframe

```txt
┌──────────────────────────────────────────────┐
│ PAGE TITLE                                   │
│ Levels                                      │
│ The full installation sequence.              │
│ [Back to Daily Run]                          │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ LEVEL CARD GRID                              │
│                                              │
│ 01 Gateway          Enter the Protocol       │
│ [Open Level]                                │
│                                              │
│ 02 Daily Operation  Run the transmission     │
│ [Open Level]                                │
│                                              │
│ ...                                          │
│                                              │
│ 10 The Seal         Installation complete    │
│ [Open Level]                                │
└──────────────────────────────────────────────┘
```

---

## Level card pattern

Each card should contain:

```txt
Level Number
Level Name
One-line operational description
Primary use case
[Open Level]
```

Example:

```txt
05
Command Line

A command executes at the resolution of the specific.

Use when you need to convert intention into exact instruction.

[Open Level 05]
```

---

# Pages 4–13 — Individual Level Pages

Each level page should follow the same structure.

---

## Standard Level Page Wireframe

```txt
┌──────────────────────────────────────────────┐
│ HEADER                                       │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ BREADCRUMB                                   │
│ Daily Run / Levels / Level 05                │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ LEVEL HERO                                   │
│ 05                                           │
│ Command Line                                 │
│ A command executes at the resolution...      │
│ [Back to Daily Run] [Previous] [Next]        │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ QUICK USE                                    │
│ When to use this level                       │
│ What it does                                 │
│ Immediate action                             │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ FULL EXPLANATION                             │
│ The deeper explanation of this level         │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ PRACTICE / COMMAND / OUTPUT                  │
│ Interactive or static action block           │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ FOOTER NAV                                   │
│ [Previous Level] [Back to Levels] [Next]     │
└──────────────────────────────────────────────┘
```

---

## Required sections on every level page

### 1. Level Hero

- level number
    
- level name
    
- one-line description
    
- primary button back to Daily Run
    

### 2. Quick Use

Short operational summary:

- **Use this when**
    
- **This level does**
    
- **Immediate action**
    

### 3. Full Explanation

This is where the old accordion content goes.

### 4. Practice / Console / Command

Keep any interactive element specific to that level here.

### 5. Related Links

- Back to Daily Run
    
- Back to Levels
    
- Previous Level
    
- Next Level
    

---

# Individual Level Page Notes

## `level-01-gateway.html`

**Purpose:** Enter the Protocol.

Include:

- gateway framing
    
- entry declaration
    
- first activation step
    
- link to Level 02
    

---

## `level-02-daily-operation.html`

**Purpose:** Run the daily transmission.

Include:

- daily rhythm
    
- default operating mode
    
- link back to homepage Daily Run
    

This page should strongly connect to `index.html`.

---

## `level-03-firewall.html`

**Purpose:** Breach response.

Include:

- immediate breach command
    
- what counts as a breach
    
- reset sequence
    
- link from homepage breach card
    

This should be one of the fastest-access pages.

---

## `level-04-switchboard.html`

**Purpose:** Toggle reality areas on.

Include:

- switch model
    
- ON/OFF fields
    
- selected area logic
    
- keep controls simple on mobile
    

---

## `level-05-command-line.html`

**Purpose:** Convert intention into exact instruction.

Include:

- command definition
    
- examples
    
- command builder if existing
    
- clear command output area
    

---

## `level-06-save-state.html`

**Purpose:** Save daily peaks and raise the floor.

Include:

- save state concept
    
- return point
    
- daily peak log
    
- short form output
    

---

## `level-07-location.html`

**Purpose:** Locate the seat above the seat.

Include:

- location model
    
- operator seat distinction
    
- state shift / perspective shift
    
- avoid overlong abstract text blocks
    

---

## `level-08-sovereign-codex.html`

**Purpose:** Laws above the operator.

Include:

- laws
    
- codex structure
    
- decree builder if existing
    
- saved law block
    

---

## `level-09-render-confirmation.html`

**Purpose:** Confirm what the field registered.

Include:

- confirmation logic
    
- receipt / signal / render language
    
- examples
    
- log output
    

---

## `level-10-seal.html`

**Purpose:** Seal the installation.

Include:

- final seal
    
- status
    
- permission
    
- return paths
    
- completion state
    

This page should feel calm, final, and less crowded than the current mobile version.

---

# Page 14 — `custom.html`

## Custom Personal Configuration

## Purpose

This is where personal defaults live.

It should answer:

> “What are my saved defaults, switches, commands, and laws?”

---

## Wireframe

```txt
┌──────────────────────────────────────────────┐
│ PAGE TITLE                                   │
│ Custom Configuration                         │
│ Personal defaults for running the Protocol.  │
│ [Back to Daily Run]                          │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ DAILY DEFAULTS                               │
│ Saved beliefs / operating assumptions        │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ SWITCHES                                     │
│ Areas of reality toggled ON                  │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ COMMANDS                                     │
│ Saved command language                       │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ LAWS / CONFIRMATIONS                         │
│ Codex lines and confirmation patterns        │
└──────────────────────────────────────────────┘
```

---

## Content rule

This page can be longer than the homepage, but it should still be chunked into cards, not one giant scroll wall.

---

# 4. Visual System Brief

## Aesthetic direction

**Clean gray chrome + warm ivory + tasteful red.**

The redesign should feel:

- premium
    
- calm
    
- operational
    
- readable
    
- slightly ritualized
    
- not neon
    
- not over-black
    
- not accordion-heavy
    

---

## Suggested color tokens

```css
:root {
  --color-bg: #f4f0e8;
  --color-surface: #fbf8f1;
  --color-surface-2: #e6e1d8;
  --color-chrome: #c4c7c9;
  --color-chrome-dark: #5d6267;
  --color-text: #1d1d1b;
  --color-muted: #6f6a62;
  --color-border: rgba(35, 35, 35, 0.16);

  --color-accent: #9f1f24;
  --color-accent-dark: #6f1418;
  --color-accent-soft: #ead2ce;

  --shadow-soft: 0 18px 50px rgba(20, 20, 20, 0.10);
}
```

## Dark theme tokens

```css
[data-theme="dark"] {
  --color-bg: #121314;
  --color-surface: #1b1d1f;
  --color-surface-2: #25282b;
  --color-chrome: #6f7478;
  --color-chrome-dark: #aeb4b8;
  --color-text: #f3eee5;
  --color-muted: #b7afa4;
  --color-border: rgba(255, 255, 255, 0.14);

  --color-accent: #d2534d;
  --color-accent-dark: #f06a62;
  --color-accent-soft: rgba(210, 83, 77, 0.16);

  --shadow-soft: 0 18px 50px rgba(0, 0, 0, 0.38);
}
```

---

# 5. Component System

## Core components to create

```txt
SiteHeader
PageHero
ActionCard
LevelCard
QuickUsePanel
ReferenceSection
BackLinkBar
PrevNextNav
ThemeToggle
MobileMenu
```

Since this is currently plain HTML/CSS/JS, these do not need to be framework components. They can be repeated HTML patterns with shared classes.

---

## Shared class naming

Use clean, predictable classes:

```css
.site-header
.site-nav
.theme-toggle
.page-shell
.page-hero
.action-grid
.action-card
.level-grid
.level-card
.quick-use
.reference-section
.page-actions
.prev-next-nav
```

Avoid creating a different class system for every level unless necessary.

---

# 6. Implementation Brief for Claude / Developer Use

Copy this into Claude or another dev chat.

````md
# Implementation Brief — The Protocol Multi-Page Redesign

You are redesigning the existing static HTML project **The Protocol**.

This is a structural UX redesign, not a content rewrite. Preserve the existing content and meaning, but reorganize it into a cleaner multi-page system.

## Current problem

The current version is a single long `index.html` using large accordion/detail sections for:
- Daily Run
- Levels 01–10
- Custom Personal Configuration

This creates poor usability:
- too much scrolling
- accordions are too long
- mobile users have to scroll back up to close sections
- action content and explanation content are mixed
- the homepage does not prioritize immediate use clearly enough

## Redesign goal

Create a multi-page static site where:

- `index.html` is the immediate-use **Daily Run** page
- the full explanations move to separate pages
- navigation is simple and reversible
- the aesthetic is cleaner: gray chrome, warm ivory, tasteful red
- light/dark theme toggle is available globally
- mobile experience is short, clear, and easy to navigate

## Required output

Implement the redesign in the actual project files.

Do not produce pseudo-code only. Make real file changes.

## Required file structure

Create or update the project toward this structure:

```txt
/
├── index.html
├── overview.html
├── levels.html
├── custom.html
├── levels/
│   ├── level-01-gateway.html
│   ├── level-02-daily-operation.html
│   ├── level-03-firewall.html
│   ├── level-04-switchboard.html
│   ├── level-05-command-line.html
│   ├── level-06-save-state.html
│   ├── level-07-location.html
│   ├── level-08-sovereign-codex.html
│   ├── level-09-render-confirmation.html
│   └── level-10-seal.html
└── assets/
    ├── css/
    │   └── protocol.css
    └── js/
        └── protocol.js
````

If the current repo already has a different asset organization, preserve anything required to keep the site working, but consolidate the new shared redesign styles into `assets/css/protocol.css` and shared behavior into `assets/js/protocol.js`.

## Core UX rules

1. Do not keep the old giant accordion system as the main structure.
    
2. The homepage must be the Daily Run / Immediate Actions page.
    
3. Long explanations belong on dedicated pages.
    
4. Every non-home page must include a visible **Back to Daily Run** link.
    
5. Every level page must include Previous / Next level navigation.
    
6. The user should never have to scroll far upward just to close or escape a section.
    
7. Mobile navigation must be simple and accessible.
    
8. Preserve existing content meaning unless clearly duplicative.
    
9. Do not flatten all content into one page again.
    

## Page requirements

### 1. `index.html` — Daily Run

Purpose: immediate use.

Include:

- site header
    
- hero section titled `Daily Run`
    
- short subtitle: `Run the daily transmission.`
    
- primary action cards:
    
    - Declare the Seat
        
    - Run Defaults
        
    - Set Switches
        
    - Issue One Command
        
    - Log the Receipt
        
- breach shortcut linking to `levels/level-03-firewall.html`
    
- quick access links:
    
    - Overview
        
    - Levels
        
    - Custom Configuration
        
    - Level 10 Seal
        

Do not include full Level 01–10 explanations on this page.

### 2. `overview.html` — Protocol Overview

Purpose: explain the system at a high level.

Include:

- concise system summary
    
- level sequence overview
    
- how to use the site
    
- links to Daily Run, Levels, and Custom Configuration
    

### 3. `levels.html` — Levels Index

Purpose: replace the old accordion stack.

Include a grid/list of Level 01–10 cards.

Each level card should include:

- level number
    
- level title
    
- one-line description
    
- link to that level page
    

### 4. Individual level pages

Create one page per level.

Each level page must include:

- global header
    
- breadcrumb
    
- level hero
    
- one-line operational description
    
- `Back to Daily Run` button
    
- `Quick Use` section
    
- `Full Explanation` section
    
- any relevant existing interactive/static content for that level
    
- footer navigation:
    
    - Previous Level
        
    - Back to Levels
        
    - Next Level
        

Use this route pattern:

```txt
levels/level-01-gateway.html
levels/level-02-daily-operation.html
levels/level-03-firewall.html
levels/level-04-switchboard.html
levels/level-05-command-line.html
levels/level-06-save-state.html
levels/level-07-location.html
levels/level-08-sovereign-codex.html
levels/level-09-render-confirmation.html
levels/level-10-seal.html
```

### 5. `custom.html` — Custom Configuration

Purpose: hold personal defaults and saved configuration.

Include:

- Daily Defaults
    
- Switches
    
- Commands
    
- Laws / Confirmations
    
- Back to Daily Run
    

## Visual design direction

Use a cleaner, calmer, more premium interface.

Aesthetic:

- gray chrome
    
- graphite
    
- warm ivory
    
- tasteful red accents
    

Avoid:

- neon overload
    
- too-black backgrounds
    
- overly busy gradients
    
- excessive borders
    
- oversized accordions
    

## Required CSS theme tokens

Use semantic CSS variables.

Suggested starting tokens:

```css
:root {
  --color-bg: #f4f0e8;
  --color-surface: #fbf8f1;
  --color-surface-2: #e6e1d8;
  --color-chrome: #c4c7c9;
  --color-chrome-dark: #5d6267;
  --color-text: #1d1d1b;
  --color-muted: #6f6a62;
  --color-border: rgba(35, 35, 35, 0.16);

  --color-accent: #9f1f24;
  --color-accent-dark: #6f1418;
  --color-accent-soft: #ead2ce;

  --shadow-soft: 0 18px 50px rgba(20, 20, 20, 0.10);
}

[data-theme="dark"] {
  --color-bg: #121314;
  --color-surface: #1b1d1f;
  --color-surface-2: #25282b;
  --color-chrome: #6f7478;
  --color-chrome-dark: #aeb4b8;
  --color-text: #f3eee5;
  --color-muted: #b7afa4;
  --color-border: rgba(255, 255, 255, 0.14);

  --color-accent: #d2534d;
  --color-accent-dark: #f06a62;
  --color-accent-soft: rgba(210, 83, 77, 0.16);

  --shadow-soft: 0 18px 50px rgba(0, 0, 0, 0.38);
}
```

## Required theme behavior

Add a global light/dark toggle.

Behavior:

- default to system preference if no saved preference exists
    
- store selected theme in `localStorage`
    
- apply theme using `data-theme="light"` or `data-theme="dark"` on the document root
    
- toggle must appear in the global header
    
- theme must work on every page
    

## Suggested JS behavior

In `assets/js/protocol.js`:

- initialize saved theme
    
- handle theme toggle
    
- handle mobile nav open/close
    
- keep JS small and non-fragile
    

Do not over-engineer.

## Suggested component classes

Use reusable class names:

```css
.site-header
.site-nav
.theme-toggle
.mobile-menu-toggle
.page-shell
.page-hero
.action-grid
.action-card
.level-grid
.level-card
.quick-use
.reference-section
.page-actions
.prev-next-nav
```

Avoid creating a completely different layout system for every level.

## Mobile requirements

At mobile widths:

- header should be compact
    
- nav can collapse behind a menu button
    
- cards should stack one column
    
- buttons should be easy to tap
    
- body text should not run edge-to-edge
    
- no side-by-side cramped label/value cards
    
- no giant accordion dependency
    

## Content migration instructions

Use the existing `index.html` as the source.

Move content as follows:

- Quick Start / Daily Run content → new `index.html`
    
- Level 01 content → `levels/level-01-gateway.html`
    
- Level 02 content → `levels/level-02-daily-operation.html`
    
- Level 03 content → `levels/level-03-firewall.html`
    
- Level 04 content → `levels/level-04-switchboard.html`
    
- Level 05 content → `levels/level-05-command-line.html`
    
- Level 06 content → `levels/level-06-save-state.html`
    
- Level 07 content → `levels/level-07-location.html`
    
- Level 08 content → `levels/level-08-sovereign-codex.html`
    
- Level 09 content → `levels/level-09-render-confirmation.html`
    
- Level 10 content → `levels/level-10-seal.html`
    
- Custom Personal Configuration → `custom.html`
    

Keep the content recognizable, but remove redundant wrapper clutter created by the accordion structure.

## Design quality bar

The finished result should feel like a clean operational manual/control panel.

Prioritize:

- readability
    
- fast access
    
- strong hierarchy
    
- clean spacing
    
- obvious navigation
    
- warm premium restraint
    

## Acceptance criteria

The redesign is successful when:

- homepage is short and action-first
    
- full explanations are no longer trapped inside one long accordion page
    
- user can reach any level from the Levels page
    
- user can return to Daily Run from every page
    
- theme toggle works globally
    
- mobile view is clean and not cramped
    
- Level 10 seal content stacks cleanly on mobile
    
- visual system uses gray/chrome/ivory/red tastefully
    
- site works as static HTML on GitHub Pages
    

## After implementation

Provide:

1. A short summary of changed files.
    
2. Any content that was moved but not altered.
    
3. Any content that was removed or consolidated.
    
4. Any known limitations.
    
5. Suggested git commit message.
    

````

---

# 7. Recommended Implementation Order

## Phase 1 — Structure first

```txt
1. Create shared CSS and JS files
2. Create global header/nav
3. Create new homepage Daily Run
4. Create Levels index
5. Create one level page as the template
````

Do **not** try to perfectly migrate all levels before the template is right.

---

## Phase 2 — Migrate all level content

```txt
6. Duplicate the level template for Levels 01–10
7. Move old accordion content into the correct pages
8. Add previous/next links
9. Add Back to Daily Run links
```

---

## Phase 3 — Theme and polish

```txt
10. Add light/dark toggle
11. Refine mobile layout
12. Tune spacing, cards, buttons, typography
13. Test all links
14. Remove dead accordion code
```

---

# 8. Suggested Commit Plan

## Best branch name

```bash
git switch -c redesign/multi-page-protocol-ui
```

## Suggested commit messages

First commit:

```bash
git add .
git commit -m "feat: restructure protocol into multi-page layout"
```

Second commit, if theme work is separate:

```bash
git add .
git commit -m "feat: add global light dark theme toggle"
```

Final polish commit:

```bash
git add .
git commit -m "style: refine protocol chrome ivory red visual system"
```

---

# 9. Final Direction

The redesign should not be a prettier version of the current accordion page.

It should be a **different structure**:

```txt
Daily Run = use now
Overview = understand system
Levels = choose depth
Level pages = full explanation
Custom = saved personal operating system
```

That is the cleanest path out of the scroll problem.