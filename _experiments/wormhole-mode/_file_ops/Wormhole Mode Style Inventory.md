# Wormhole Mode Style Inventory

## Page Identity Styles

- **H1 / Page Title**
  - Selector: `h1`
  - Example: `GATEWAY`
  - Style: large display serif, uppercase, strong page identity

- **Hero Kicker**
  - Selector: `.kicker`, `.panel-kicker`
  - Example: `LEVEL 01 / INSTALL COMMAND SEQUENCE`
  - Style: small mono uppercase metadata label

- **Hero Lede**
  - Selector: `.lede`
  - Example: `Enter the Protocol.`
  - Style: short support copy beneath H1

- **Hero Actions**
  - Selector: `.page-actions a`, `.button`
  - Example: `Daily Run`, `Levels`, `Source ↗`
  - Style: compact editorial action buttons

---

## Section Heading Styles

- **H2 / Section Title**
  - Selector: `h2`
  - Examples:
    - `Install Command Sequence`
    - `Reference`
    - `Reality Control Panel`
    - `How to use it`
  - Style: consistent display serif italic section heading

- **H3 / Subsection Heading**
  - Selector: `h3`
  - Examples:
    - `Panel Functions`
    - `Strict Constraints`
    - `System Output`
    - `Seat Map`
    - `Operating Difference`
    - `Render Confirmations`
  - Style: subsection divider, clearly stronger than row labels

- **Panel Kicker**
  - Selector: `.panel-kicker`
  - Examples:
    - `OPERATION`
    - `LEVEL MAP`
    - `REFERENCE`
  - Style: small mono metadata above a section title

---

## Copy Styles

- **Support Copy**
  - Selector: `.support-copy`
  - Example: `Gate level: complete the install by speaking the commands out loud.`
  - Style: secondary explanatory text

- **Lede Copy**
  - Selector: `.lede`
  - Example: `The interface is now yours to operate.`
  - Style: short introduction/support line

- **Body Copy**
  - Selector: `p`, `li`
  - Style: normal readable text

- **Strong Inline Copy**
  - Selector: `strong`
  - Style: emphasis only, not fake heading styling

---

## Panel / Container Styles

- **Hero Panel**
  - Selector: `.signal-hero`
  - Role: main Gateway identity panel
  - Style: largest atmospheric container

- **Standard Panel**
  - Selector: `.panel`
  - Role: primary content container
  - Style: shared Wormhole card/panel surface

- **Identity Panel**
  - Selector: `.identity`
  - Role: intro/title panel
  - Style: same panel family as `.panel`

- **Reference Section**
  - Selector: `.reference-section`
  - Role: documentation/reference container
  - Style: panel surface with documentation rhythm

---

## Command Sequence Styles

- **Command Table**
  - Selector: `.sequence`
  - Role: command list container
  - Style: structured command table

- **Command Row**
  - Selector: `.seq-row`
  - Role: one command line
  - Style: aligned table row

- **Command Row Number**
  - Selector: `.seq-index`
  - Example: `01`, `02`, `03`
  - Style: quiet row index, not badge

- **Command Label**
  - Selector: `.seq-label`
  - Example: `EXECUTE`
  - Style: mono uppercase command label

- **Command Text**
  - Selector: `.seq-body`
  - Example: `I am inside The Protocol.`
  - Style: primary command text, readable but not over-heavy

---

## Row / Table Styles

- **Flat List**
  - Selector: `.flat-list`
  - Role: simple documentation list container

- **Flat Row**
  - Selector: `.flat-row`
  - Role: key/value documentation row

- **State Table**
  - Selector: `.state-table`
  - Role: state/info row container

- **State Row**
  - Selector: `.state-row`
  - Role: state/info row

- **Reference Table**
  - Selector: `.reference-table`
  - Role: reference key/value table

- **Reference Row**
  - Selector: `.reference-row`
  - Role: documentation key/value row

- **Status Strip**
  - Selector: `.status-strip`
  - Role: secondary status container

- **Status Row**
  - Selector: `.status-row`
  - Role: secondary status line

---

## Row Text Styles

- **Row Key**
  - Selectors:
    - `.reference-key`
    - `.state-label`
    - `.status-label`
    - `.flat-row strong`
  - Examples:
    - `Switches`
    - `Commands`
    - `Codex`
    - `Premise`
    - `Identity`
  - Style: quiet table term, not heading

- **Row Value**
  - Selectors:
    - `.reference-value`
    - `.state-value`
    - `.status-value`
    - `.flat-row > :last-child`
  - Style: explanation/content side of a row

---

## Navigation / Action Styles

- **Primary Button**
  - Selector: `.button`
  - Style: Wormhole action button

- **Page Action Link**
  - Selector: `.page-actions a`
  - Style: top-level page action

- **Utility Link**
  - Selector: `.utility-link`
  - Style: compact functional link

- **Plain Link**
  - Selector: `.plain-link`
  - Style: quieter functional link


- **Previous / Next Link**
  - Selector: `.prev-next-nav a`
  - Style: footer navigation action

---

## Form / Input Styles

- **Input**
  - Selector: `input`
  - Style: Wormhole form field

- **Select**
  - Selector: `select`
  - Style: Wormhole dropdown field

- **Textarea**
  - Selector: `textarea`
  - Style: Wormhole long-form field

- **Form Block**
  - Selector: `.signal-form-block`
  - Style: functional form container

---

## Chip / Inline Styles

- **Command Chip**
  - Selector: `.command-chip`
  - Style: compact command/action chip

- **Inline Chip**
  - Selector: `.inline-chip`
  - Style: small inline metadata pill

- **Code**
  - Selector: `code`
  - Style: inline technical/code token

---

## Status Styles

- **Active State**
  - Selectors:
    - `.is-active`
    - `.state-on`
    - `[aria-pressed="true"]`
    - `[aria-selected="true"]`
    - `.status-active`
    - `.status-complete`
    - `.status-ready`
  - Style: selected/active treatment

- **Alert State**
  - Selectors:
    - `.status-breach`
    - `.status-denied`
    - `.status-firewall`
    - `.status-pending`
  - Style: warning/blocked/pending treatment

---

## Header / Navigation Styles

- **Site Header**
  - Selector: `.site-header`
  - Style: sticky top navigation surface

- **Brand**
  - Selector: `.brand`
  - Style: Wormhole identity mark

- **Brand Subline**
  - Selector: `.brand__sub`
  - Style: small metadata line under brand

- **Site Nav**
  - Selector: `.site-nav`
  - Style: desktop nav row

- **Mobile Nav**
  - Selector: `.mobile-nav`
  - Style: responsive nav list

- **Theme Toggle**
  - Selector: `.theme-toggle`
  - Style: theme control button

- **Mobile Menu Toggle**
  - Selector: `.mobile-menu-toggle`
  - Style: responsive menu button

---

## Layout Styles

- **Page Shell**
  - Selector: `.page-shell`, `.shell`
  - Style: main page width and vertical rhythm

- **Two Column Layout**
  - Selector: `.layout-two`
  - Style: two-column content grid

- **Panel Grid**
  - Selector: `.signal-panel-grid`
  - Style: repeated panel layout

- **Config Grid**
  - Selector: `.config-grid`
  - Style: form/settings layout

- **Wide Form Section**
  - Selector: `.form-wide`, `.config-section--wide`
  - Style: full-width grid item

---

## Theme Token Styles

- **Page Background**
  - Token: `--wh-page-bg`

- **Portal Layer**
  - Token: `--wh-portal-layer`

- **Vignette Layer**
  - Token: `--wh-vignette-layer`

- **Panel Background**
  - Token: `--wh-panel-bg`

- **Hero Background**
  - Token: `--wh-hero-bg`

- **Panel Atmosphere**
  - Token: `--wh-panel-atmosphere`

- **Panel Shadow**
  - Token: `--wh-panel-shadow`

- **Hero Shadow**
  - Token: `--wh-hero-shadow`

- **Small Glow**
  - Token: `--wh-small-glow`

---

## Color / Text Tokens

- **Main Text**
  - Token: `--wh-text`

- **Heading Text**
  - Token: `--wh-heading`

- **Muted Text**
  - Token: `--wh-muted`

- **Copy Text**
  - Token: `--wh-copy`

- **Strong Copy**
  - Token: `--wh-copy-strong`

- **Label Text**
  - Token: `--wh-label`

- **Kicker Text**
  - Token: `--wh-kicker`

- **Button Text**
  - Token: `--wh-button-text`

---

## Border / Surface Tokens

- **Default Border**
  - Token: `--wh-border-default`

- **Active Border**
  - Token: `--wh-border-active`

- **Alert Border**
  - Token: `--wh-border-alert`

- **Hero Border**
  - Token: `--wh-hero-border`

- **Inner Border**
  - Token: `--wh-inner-border`

- **Divider**
  - Token: `--wh-divider`

---

## Radius Tokens

- **Main Radius**
  - Token: `--wh-radius`

- **Small Radius**
  - Token: `--wh-radius-sm`

---

## Font Tokens

- **Display Font**
  - Token: `--font-display`
  - Used for: H1, H2, editorial titles

- **Heading Font**
  - Token: `--font-heading`
  - Used for: smaller headings/subheads where needed

- **Body Font**
  - Token: `--font-body`
  - Used for: body copy, support copy, values

- **Mono Font**
  - Token: `--font-mono`
  - Used for: kickers, labels, row keys, command labels

---

## Final Hierarchy

- **H1**
  - `GATEWAY`

- **H2**
  - `Install Command Sequence`
  - `Reference`
  - `Reality Control Panel`
  - `How to use it`

- **H3**
  - `Panel Functions`
  - `Strict Constraints`
  - `System Output`
  - `Seat Map`
  - `Operating Difference`
  - `Render Confirmations`

- **Kicker**
  - `LEVEL 01 / INSTALL COMMAND SEQUENCE`
  - `OPERATION`
  - `LEVEL MAP`

- **Support Copy**
  - `Enter the Protocol.`
  - `Gate level: complete the install by speaking the commands out loud.`

- **Row Key**
  - `Switches`
  - `Commands`
  - `Codex`
  - `Premise`
  - `Identity`
  - `Therefore`

- **Row Value**
  - Explanation text, command text, status value, or documentation content