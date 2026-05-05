## Design Audit + Redesign Brief

**Project:** _The Protocol_  
**Audit basis:** reviewed the current `index.html` from your archive

---

## Executive Read

Your instinct is **right**:

The current build is trying to do **two jobs at once**:

- **Immediate-use tool**
    
- **Full conceptual reference manual**
    

Right now those are living in the same long accordion page, which creates friction.

The redesign should shift to:

- **Page 1 = do the thing now**
    
- **Other pages = explain, deepen, support**
    
- **Navigation = always easy to move forward and back**
    
- **Visual system = cleaner, quieter, more premium**
    

---

# 1) Audit of the Current Version

## What the current site is doing now

The current file is essentially a **single-page system** with:

- a top nav for **Levels 01–10**
    
- a **Quick Start / Daily Run**
    
- a sequence of **accordion/detail panels**
    
- a **Custom Personal Configuration** section
    
- highly styled level panels with interactive controls/cards
    

I found **12 `details/summary` accordion sections**:

- Quick Start
    
- Levels 01–10
    
- Custom Personal Configuration
    

So the core UX issue is real and structural, not just cosmetic.

---

## What is working

## Strong foundation

There is already a usable information system here:

- the **level logic** is clear
    
- the **Daily Run** concept is strong
    
- the levels give the system a sense of progression
    
- the interface already has a **distinct identity**
    
- the content seems modular enough to split into pages
    

## Good raw material for a redesign

You already have the right ingredients:

- a strong **ritual / operational** framing
    
- a clear **home action flow**
    
- a clear set of **reference modules**
    
- visual motifs that can be refined rather than reinvented
    

---

## What is not working

## 1) The information architecture is mixed

The biggest issue:

**Action content** and **reference content** are blended together.

That makes the user do too much work to answer basic questions like:

- What do I do right now?
    
- Where do I go if I need the full explanation?
    
- How do I get back once I’ve gone deeper?
    

### Result:

The page feels like both a **control panel** and a **manual**, but it is not cleanly behaving as either one.

---

## 2) Accordion UX is creating friction

The accordion pattern is causing exactly the problem you described:

- long page height
    
- open sections push content far down
    
- closing a section often requires **scrolling back up**
    
- it is easy to lose your place
    
- on mobile, this gets worse fast
    

### Why this matters

Accordions are okay for **small FAQ chunks**.  
They are bad for **large, multi-card, high-importance content blocks**.

In your case, each level is too substantial to live comfortably inside one long accordion stack.

---

## 3) Mobile usability is weaker than it should be

Even with some fixes, the current architecture still creates mobile problems:

- too much vertical travel
    
- too much nested content in one flow
    
- weak sense of “where am I now?”
    
- weak return path
    
- too much dependence on scrolling as the primary navigation mechanic
    

### Core issue

Mobile needs **short loops**, not one giant page.

---

## 4) The current visual language is too busy for the job

The current site has a lot of intensity and signal, but not enough restraint.

Likely user experience effect:

- more “styled” than “usable”
    
- not enough calm hierarchy
    
- too many simultaneous visual ideas
    
- interface can feel crowded rather than controlled
    

That is why your instinct toward:

- **gray chrome**
    
- **ivory warmth**
    
- **tasteful red**
    
- **cleaner structure**
    

is a strong direction.

---

## 5) The hierarchy needs clearer prioritization

Not all information should feel equally important.

Right now, the system needs stronger separation between:

- **primary actions**
    
- **secondary tools**
    
- **deep explanations**
    
- **reference/archive material**
    

### What should feel primary

The **Daily Run** and immediate-use pathways.

### What should feel secondary

The long-form explanations of each level.

---

## 6) Return navigation is not strong enough

You explicitly said you want it to be **easy to access and go back**.

That is the right priority.

The current build depends too much on:

- page scrolling
    
- accordion memory
    
- anchor jumps
    

Instead, the redesign should support:

- persistent top nav
    
- page-level navigation
    
- breadcrumbs
    
- clear “Back to Daily Run” or “Back to Overview” buttons
    
- previous / next links between level pages
    

---

## 7) There is no proper light/dark theme system yet

I did not find a real theme-toggle system in the current build.

So if you want:

- **light**
    
- **dark**
    
- persistent theme memory
    

that should be treated as a **first-class redesign feature**, not an afterthought.

---

# 2) Core Diagnosis

## The main problem in one sentence

**The current build overuses a single long-page disclosure model for content that really wants a multi-page task-first structure.**

---

# 3) Redesign Direction

## Main strategic shift

Move from:

- **Single-page accordion reference system**
    

to:

- **Multi-page action-first interface**
    

---

## New guiding principle

**Action first. Explanation second.**

That means:

- the first page should help the user **run the protocol now**
    
- deeper pages should help the user **understand the protocol better**
    
- the user should never feel trapped inside a scroll tunnel
    

---

# 4) Design Brief

## Project goal

Redesign _The Protocol_ into a cleaner, easier-to-use, multi-page experience that prioritizes **immediate action**, reduces scrolling fatigue, improves mobile usability, and introduces a more refined **light/dark visual system**.

---

## Primary objectives

### 1) Make the first page immediately usable

The home page should function like a **daily operational console**, not a theory page.

### 2) Reduce long-scroll fatigue

Move deep content out of accordions and into dedicated pages.

### 3) Improve mobile clarity

Create shorter, cleaner page flows with obvious return paths.

### 4) Refine the aesthetic

Use a cleaner visual system built around:

- **chrome gray / graphite**
    
- **soft ivory warmth**
    
- **tasteful red accents**
    

### 5) Add a proper theme toggle

Support both **light and dark modes**, with persistence.

### 6) Make navigation reversible

Users should always be able to:

- know where they are
    
- return to the prior layer
    
- jump back to the main action page easily
    

---

## Primary user experience

The redesign should feel like:

- **controlled**
    
- **clear**
    
- **deliberate**
    
- **ritualized but usable**
    
- **premium, not flashy**
    
- **technical but warm**
    

---

## Tone and feel

Not:

- gamer neon
    
- overly futuristic clutter
    
- overdecorated “dashboard chaos”
    

Instead:

- **clean operational interface**
    
- subtle chrome / brushed metal sensibility
    
- warm restraint from ivory
    
- red used with discipline for emphasis
    

---

# 5) Proposed Information Architecture

## Recommended site structure

## Page 1 — Daily Run / Home

This becomes the main action page.

### Include:

- Daily Run steps
    
- immediate command flow
    
- breach / emergency shortcut
    
- quick links to deeper sections
    
- current-state or daily-use modules only
    

### Purpose:

**Do the protocol now.**

---

## Page 2 — Protocol Overview

A concise overview page.

### Include:

- what the system is
    
- how the levels relate
    
- the overall sequence
    
- visual map of Levels 01–10
    

### Purpose:

**Understand the structure at a glance.**

---

## Pages 3–12 — Individual Level Pages

One page per level.

### Structure:

- level summary
    
- purpose
    
- when to use it
    
- full explanation
    
- examples / inputs / outputs
    
- related actions
    
- “Back to Daily Run”
    
- “Previous / Next Level”
    

### Purpose:

**Deep explanation without long accordion overload.**

---

## Page 13 — Custom Configuration

A dedicated page for:

- personal defaults
    
- switches
    
- laws
    
- saved commands
    
- confirmations
    

### Purpose:

**Manage personalized setup separately from daily execution.**

---

## Optional page — Quick Reference / Cheat Sheet

A condensed page with:

- short commands
    
- defaults
    
- level map
    
- emergency run order
    

### Purpose:

**Fast lookup without reading long explanatory content.**

---

# 6) Recommended Navigation Model

## Global navigation

Use a **sticky top header** with a small number of clear destinations:

- Daily Run
    
- Overview
    
- Levels
    
- Custom
    
- Theme Toggle
    

If needed, “Levels” can open a compact dropdown or an index page.

---

## Page-level navigation

Every deeper page should include:

- **breadcrumb**  
    Example: `Home / Levels / Level 05`
    
- **Back to Daily Run** button
    
- **Previous / Next** level navigation
    
- optional **On this page** mini jump nav if content gets long
    

---

## Mobile behavior

On mobile:

- keep header compact
    
- use a simple menu or bottom sheet
    
- keep one strong CTA visible:
    
    - **Back to Daily Run**
        
    - or **Open Levels**
        

Do **not** rebuild the long accordion pattern on mobile.

---

# 7) Content Model Recommendation

## Split content into two modes

## A) Action mode

Short, direct, operational.

Use for:

- Daily Run
    
- breach action
    
- commands
    
- quick defaults
    
- fast instructions
    

### Format:

- short cards
    
- numbered steps
    
- concise buttons
    
- minimal text
    

---

## B) Reference mode

Longer, explanatory, contextual.

Use for:

- level pages
    
- definitions
    
- rationale
    
- examples
    
- deeper conceptual framing
    

### Format:

- short sections
    
- anchored headings
    
- expandable sub-notes only if needed
    
- no giant accordion stack
    

---

# 8) Visual Design Brief

## Visual direction

### Core palette

A restrained palette built around:

- **Chrome / gunmetal gray**
    
- **soft ivory / warm off-white**
    
- **deep red / oxblood / brick red accents**
    

### Suggested use

- **gray/chrome** = main surfaces, frames, structure
    
- **ivory** = warmth, readability, body surfaces
    
- **red** = headings, action buttons, key emphasis
    

---

## Important restraint rule

Red should be **accentive**, not everywhere.

Good uses:

- page titles
    
- key buttons
    
- active states
    
- selected nav state
    
- important labels
    

Avoid:

- large red body text blocks
    
- too many red borders at once
    
- making every control “urgent”
    

---

## Light mode

Should feel:

- bright but not clinical
    
- warm, not yellow
    
- structured, not sterile
    

Think:

- brushed silver
    
- ivory paper
    
- charcoal text
    
- deep muted red accents
    

---

## Dark mode

Should feel:

- rich and calm
    
- readable
    
- premium
    
- slightly architectural
    

Think:

- graphite / carbon
    
- softened ivory text
    
- low-glare surfaces
    
- red accents used sparingly
    

---

## Chrome treatment

If you use “chrome,” keep it **subtle**.

That means:

- light gradients
    
- soft edge sheen
    
- minimal bevel suggestion
    
- no tacky metallic gimmicks
    

The effect should read as **refined materiality**, not literal chrome novelty.

---

# 9) Component Recommendations

## Home / Daily Run components

- hero/action header
    
- daily sequence cards
    
- breach shortcut card
    
- quick command card
    
- fast links to deeper pages
    
- “continue to full explanation” links
    

---

## Reference page components

- summary header
    
- step cards
    
- explanation blocks
    
- examples / output cards
    
- back / next navigation
    
- sticky mini TOC if needed
    

---

## Theme system components

- light/dark toggle in header
    
- theme persisted in local storage
    
- proper semantic tokens for:
    
    - background
        
    - surface
        
    - text
        
    - accent
        
    - border
        
    - button
        
    - hover/focus
        

---

# 10) UX Rules for the Redesign

## Must-have rules

- **No giant accordion stack as the primary information architecture**
    
- **Primary action page must stay concise**
    
- **Every deep page must have a clear return path**
    
- **Mobile must not require long reverse scrolling**
    
- **Theme toggle must be global and persistent**
    
- **Navigation labels should be plain and readable**
    
- **Deep content should be chunked into sections, not dumped**
    

---

# 11) Recommended Sitemap

## Minimum viable multi-page version

- `/` — Daily Run
    
- `/overview` — Protocol Overview
    
- `/levels` — Levels Index
    
- `/levels/01-gateway`
    
- `/levels/02-daily-operation`
    
- `/levels/03-firewall`
    
- `/levels/04-switchboard`
    
- `/levels/05-command-line`
    
- `/levels/06-save-state`
    
- `/levels/07-location`
    
- `/levels/08-sovereign-codex`
    
- `/levels/09-render-confirmation`
    
- `/levels/10-seal`
    
- `/custom` — Personal Configuration
    

---

# 12) Priority Recommendations

## Highest priority

1. **Split into multiple pages**
    
2. **Make Daily Run the homepage**
    
3. **Remove the current accordion-first structure**
    
4. **Add persistent return navigation**
    
5. **Establish the new visual system**
    

## Second priority

6. **Add theme toggle**
    
7. **Refine labels and page hierarchy**
    
8. **Create a levels index page**
    
9. **Standardize card and button styles**
    

## Third priority

10. **Add polish**
    
11. **Add state memory / saved preferences**
    
12. **Add small convenience interactions**
    

---

# 13) Final Recommendation

## Best direction

Yes — **redesign this as a multi-page system**.

That is the correct move.

Do **not** try to solve the current experience by endlessly refining the accordions.  
That would be patching the wrong level of the problem.

The redesign should center on this model:

- **Homepage = Immediate Actions**
    
- **Secondary pages = Full Explanation**
    
- **Navigation = always reversible**
    
- **Aesthetic = cleaner, calmer, more premium**
    

---

## Suggested next deliverables

I can do either of these next:

- **Build a page-by-page site map + wireframe brief**
    
- **Write a full implementation brief for Claude/dev use**
    

If you want, I’ll do the next step as:

## **Multi-Page Redesign Plan**

with:

- page list
    
- what goes on each page
    
- nav structure
    
- component list
    
- visual direction tokens
    
- implementation order