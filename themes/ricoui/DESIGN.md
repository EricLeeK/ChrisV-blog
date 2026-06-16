# Ricoui — Style Reference
> A dark, editorial designer portfolio where Chinese calligraphy meets code.

**Theme:** dark (with class-based light mode)

Ricoui's design system is built around a near-black editorial canvas that lets typography and 3D illustration take center stage. The dominant impression is one of restrained drama: deep charcoal backgrounds, warm off-white text, and a single expressive display typeface — 汇文明朝体 (Huiwen Mincho) — used for page titles. The rest of the interface is set in Inter / Noto Sans SC, giving a clean, modern counter-rhythm to the classical headings. Color is used sparingly but intentionally: a soft blue (`--color-blue`) for links and recommendation badges, a warm yellow (`--color-yellow`) for primary CTAs and the "Magic Click" switch, and a small set of functional accents (green, purple, pink, cyan, orange) for category tags and social cards. Depth is created through layered shadows, translucent navigation, and a full-screen 3D icon trail that follows the cursor. The signature break is the mix of Ming-dynasty-style calligraphy with utility-first engineering details: pill filters, GitHub-style social proof, and a theme toggle that slides like a physical switch.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Ink | `#f7f5f3` | `--color-0` | Primary headings and emphasized body text |
| Ink Muted | `#d6d5d4` | `--color-300` | Secondary text, card meta, descriptions |
| Ink Subtle | `#909090` | `--color-500` | Tertiary text, captions, hover states |
| Ink Faint | `#707070` | `--color-600` | Disabled or least-prominent details |
| Canvas | `#19191b` | `--color-999` | Primary page background in dark mode |
| Canvas RGB | `25, 25, 27` | `--color-999-rgb` | Raw RGB for translucent overlays |
| Surface 1 | `#101010` | `--color-100` | Card titles, active nav text |
| Surface 2 | `#303030` | `--color-200` | Borders, dividers, subtle backgrounds |
| Surface 3 | `#505050` | `--color-400` | Footer text, muted UI |
| Divider | `#272f3f` | `--color-divider` | Section divider lines |
| Border | `#323232` | `--border` | Card borders, hairlines |
| Border RGB | `49, 48, 53` | `--border-color` | Raw border RGB |
| Blue | `#499ad5` | `--color-blue` | Links, recommendation badges, active accents |
| Blue Light | `#73abf9` | `--color-primary-light` | Hover blues |
| Blue Lighter | `#e0ecfd` | `--color-primary-lighter` | Very light blue tints |
| Yellow | `#f7d252` | `--color-yellow` | Primary CTA background, Magic Click glow |
| Yellow Dark | `#ecba0e` | `--color--dark-yellow` | CTA hover state |
| Green | `#1bc47d` | `--color-green` | Success, category tags |
| Purple | `#6127ff` | `--color-purple` | Decorative accents |
| Pink | `#ff419c` | `--color-pink` | Decorative accents |
| Cyan | `#00d0ff` | `--color-cyan` | Decorative accents |
| Orange | `#ff5a19` | `--color-orange` | Decorative accents |
| Error | `#ff2c60` | `--color-errors` | Error states |
| Card BG | `rgba(40, 80, 120, 0.15)` | `--card-color` | Subtle card surface tint |
| Card BG Active | `rgba(60, 90, 125, 0.3)` | `--card-color-selected` | Selected card surface |
| Translucent Overlay | `hsla(0, 0%, 64%, 0.75)` | `--accent-overlay` | Navigation scrim, toggle track |
| Subtle Overlay | `hsla(0, 0%, 9%, 0.33)` | `--accent-subtle-overlay` | Subtle dark overlays |

### Decorative / Gradient

| Name | Value | Token | Role |
|------|-------|-------|------|
| Subtle Gradient | `linear-gradient(150deg, #19191b 19%, #f7f5f3 150%)` | `--gradient-subtle` | Background gradient accents |
| Accent Gradient | `linear-gradient(150deg, #ececec, #606060, #ececec)` | `--gradient-accent` | Title/text gradient in dark mode |
| Orange Accent Gradient | `linear-gradient(150deg, #ca7879, #606060, #ececec)` | `--gradient-accent-orange` | Warm variant gradient |
| Stroke Gradient | `linear-gradient(180deg, #707070, #303030)` | `--gradient-stroke` | Divider / stroke gradients |
| Text Gradient | `linear-gradient(90deg, #f29914 15%, #0bbbe3 76%)` | `.text-gradient` | Special gradient text |

## Tokens — Typography

### Inter / Noto Sans SC — Primary sans for body, UI, and navigation · `--font-body`
- **Substitute:** system-ui, -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif
- **Weights:** 100-900 (variable)
- **Sizes:** 12px, 14px, 15px, 16px, 18px, 20px, 24px, 32px, 36px, 48px, 64px, 72px
- **Line height:** 1.0-1.6 depending on role
- **Letter spacing:** 0.2px default body, 1px for uppercase tags
- **Role:** Body copy, navigation, buttons, card titles, filters

### 汇文明朝体 (Huiwen Mincho) — Editorial display typeface for page titles · `--font-huiwen`
- **Source:** `https://chinese-fonts-cdn.deno.dev/packages/hwmct/dist/汇文明朝体/result.css`
- **CSS family name:** `Huiwen-mincho`
- **Substitute:** "Noto Serif SC", "Songti SC", "SimSun", serif
- **Weights:** 400
- **Sizes:** 48px-72px (responsive down to 36px on mobile)
- **Line height:** 1.2
- **Letter spacing:** normal
- **Role:** Hero/page titles only ("设计&编程", "关于我"). Creates the classical editorial personality.

### Special Elite — Typewriter accent for small uppercase tags · `--font-type`
- **Substitute:** "Courier New", monospace
- **Weights:** 400
- **Sizes:** 13px
- **Line height:** 1
- **Letter spacing:** 1px
- **Role:** Page tags like "PORTFOLIO", "ABOUT" — uppercase, pill-shaped, typewriter feel

### Inconsolata — Code and monospace content · `--font-mono`
- **Substitute:** "SFMono-Regular", Menlo, Monaco, Consolas, monospace
- **Weights:** 200-900
- **Sizes:** 14px
- **Line height:** 1.5
- **Role:** Inline code, code blocks

### Type Scale

| Role | Size | Line Height | Letter Spacing | Token |
|------|------|-------------|----------------|-------|
| display | 72px (4.5rem) | 1.2 | normal | `--text-5xl` |
| display-lg | 64px (4rem) | 1.1 | normal | `--text-4xl` |
| heading-1 | 48px (3rem) | 1.1 | normal | `--text-3xl` |
| heading-2 | 36px (2.25rem) | 1.1 | normal | `--text-2xl` |
| heading-3 | 32px (2rem) | 1.1 | normal | `--text-xl` |
| subheading | 24px (1.5rem) | 1.4 | normal | `--text-lg` |
| lead | 18px (1.125rem) | 1.6 | normal | `--text-md` |
| body | 16px (1rem) | 1.5 | 0.2px | `--text-base` |
| body-sm | 14px (0.875rem) | 1.5 | normal | `--text-sm` |
| caption | 12px (0.75rem) | 1.4 | 1px uppercase | `--text-xs` |

## Tokens — Spacing & Shapes

**Base unit:** 8px

**Density:** comfortable

### Spacing Scale

| Name | Value | Token |
|------|-------|-------|
| 1 | 4px | `--radius-small` (also used as micro spacing) |
| 2 | 8px | `--cell` |
| 3 | 12px | derived |
| 4 | 16px | `--gap` |
| 5 | 20px | `--gutter` |
| 6 | 24px | derived |
| 8 | 32px | derived |
| 12 | 48px | card-list vertical margin |
| 16 | 64px | `--size-top`, `--size-bottom` |

### Border Radius

| Element | Value |
|---------|-------|
| cards / figures | 6px (`--radius`) |
| small UI | 4px (`--radius-small`) |
| buttons | 8px (`--button-rounded`) |
| pill buttons / tags | 36px / 72px (`--button-rounded-full`) |
| filter tags | 32px |
| title tags | 36px |
| avatar | 50% |
| theme toggle | 999rem |

### Shadows

| Name | Value | Token |
|------|-------|-------|
| shadow-sm | `0px 6px 3px rgba(9, 11, 17, 0.01), 0px 4px 2px rgba(9, 11, 17, 0.01), 0px 2px 2px rgba(9, 11, 17, 0.02), 0px 0px 1px rgba(9, 11, 17, 0.03)` | `--shadow-sm` |
| shadow-md | `0px 28px 11px rgba(9, 11, 17, 0.01), 0px 16px 10px rgba(9, 11, 17, 0.03), 0px 7px 7px rgba(9, 11, 17, 0.05), 0px 2px 4px rgba(9, 11, 17, 0.06)` | `--shadow-md` |
| shadow-lg | `0px 62px 25px rgba(9, 11, 17, 0.01), 0px 35px 21px rgba(9, 11, 17, 0.05), 0px 16px 16px rgba(9, 11, 17, 0.1), 0px 4px 9px rgba(9, 11, 17, 0.12)` | `--shadow-lg` |
| CTA glow | `0 0 24px 11px rgba(247, 210, 82, 0.75)` | inline on `.post-btn:hover` |
| Magic glow | `0 0 12px 6px rgba(var(--train-color-rgb), 0.3)` | inline on `.train-switch button` |

### Layout

- **Section gap:** 64px (`--size-top` / `--size-bottom`)
- **Card padding:** internal 0 (image flush), footer margin 12px top/bottom
- **Element gap:** 16px (`--gap`)
- **Max content width:** 90% (`--max-width`), capped by inner padding:
  - ≥1440px: 108px inner padding
  - 1280px-1439px: 96px inner padding
  - 1024px-1279px: 48px inner padding
  - ≤811px: 24px inner padding
  - ≤576px: 16px inner padding
- **Grid:** custom flex grid (`col-1a` … `col-12a`) with 16px gutters; homepage cards use `col-xs-1a col-md-2a col-lg-3a col-xxl-4a`

## Components

### Sticky Navigation
**Role:** Primary wayfinding, persistent across all pages.
- position: sticky; top: 0; z-index: 9999
- backdrop-filter: saturate(300%) blur(5px)
- background: rgba(25, 25, 27, 0.65) (uses `--color-999-rgb`)
- height: auto, links vertically centered
- layout: logo/avatar left, nav links right, theme toggle far right
- links: `--color-300` default, `--color-100` active/bold
- avatar: 40px × 40px circle

### Page Title (SectionHeader)
**Role:** Hero typography; establishes page identity.
- tag: uppercase pill, 13px Special Elite, border 1px `--color-700`, radius 36px, padding 8px 22px 4px
- h1: 72px/4.5rem Huiwen Mincho (`--font-huiwen`), weight 500, line-height 1.2
- description: 16px/1.6, max-width 480px, centered, color `--color-300`
- responsive: 64px ≤1440px, 56px ≤767px, 48px ≤575px

### Primary CTA Button (CallToAction)
**Role:** Main call-to-action on article/about pages.
- background: `--color-yellow` (#f7d252)
- color: `#101010`
- padding: 1.125em 2em
- border-radius: 36px
- font-size: 14px, weight 600
- min-width: 144px
- hover: background `#ecba0e`, box-shadow `0 0 24px 11px rgba(247, 210, 82, 0.75)`

### Filter Tags
**Role:** Category filter for the masonry card grid.
- background: `--color-999` in dark mode (`#19191b`)
- border: 1px `--filter-border` (`#696765` dark mode)
- color: `--filter-color` (`#d6d5d4`)
- padding: 10px 24px
- border-radius: 32px
- font-size: 15px
- active: background `#f4f3f0`, color `#19191b`, weight 500
- transition: all 0.35s cubic-bezier(0.075, 0.82, 0.165, 1)

### Work Card
**Role:** Portfolio/article item in the Shuffle.js masonry grid.
- container: responsive 20%-100% width, margin-bottom 1.5rem
- figure: aspect-ratio 2:3 (`padding-bottom: calc(2 * 100% / 3)`), radius 6px, border 1px `--border`, background rgba(0,0,0,0.02)
- image: object-fit cover, hover scale(1.05), transition 0.5s
- type tags: 12px, height 20px, padding 0 10px, radius 4px, color `--color-100`
- title: 18px, weight 600, color `--color-200`, flex with optional "推荐" badge
- badge "推荐": 12px, height 22px, padding 0 8px, radius 4px, background `--color-blue`, color `--color-900`
- meta: 14px, color `--color-300`, single-line ellipsis
- external link icon: 32px arrow, rotates 45° on hover

### Magic Click Switch
**Role:** Easter-egg control for the cursor-following 3D icon trail.
- position: fixed or near logo
- button: 75px width, radius 36px, border 1px train-color
- background: train-color (`#f7d252`, `#4da7e8`, `#1bc47d`, `#dedede`)
- text: 12px, color `--color-100`
- glow: `0 0 12px 6px rgba(var(--train-color-rgb), 0.3)`
- cycles through 4 states: DESIGN → SKILL → NEED3D → OFF

### Theme Toggle
**Role:** Dark/light mode switch.
- circular track, radius 999rem
- background: `--color-999`
- inset box-shadow using `--accent-overlay`
- icons: sun/moon, 2rem × 2rem
- sliding pill indicator using `transform: translateX(100%)` in dark mode

### Social Links
**Role:** Connect block under hero and in about page.
- icons: 20-22px height, default fill `--color-400`
- opacity: 0.75 default, 1.0 on hover
- hover colors per platform: Twitter/X light blue, GitHub `--color-200`, Xiaohongshu #ff2742, Behance #0056ff, Dribbble #d145bf, RSS #ee802f

### Footer
**Role:** Closing sign-off.
- margin-top: 4rem
- padding: 3rem 2rem
- text-align: center
- color: `--color-400`
- font-size: `--text-sm` (14px)

## Surfaces

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 0 | Canvas | `#19191b` | Base page background |
| 1 | Surface 1 | `#101010` | Deepest UI elements, active text |
| 2 | Surface 2 | `#303030` | Borders, dividers |
| 3 | Elevated | `rgba(25, 25, 27, 0.65)` | Sticky nav backdrop |
| 4 | Card Tint | `rgba(40, 80, 120, 0.15)` | Subtle card background |

## Do's and Don'ts

### Do
- Use `#19191b` (`--color-999`) as the default dark canvas background.
- Set primary headings in 汇文明朝体 at 72px/4.5rem for the editorial hero feel.
- Use `#f7f5f3` (`--color-0`) for primary text to maintain high contrast on the dark canvas.
- Reserve `#499ad5` (`--color-blue`) for links, recommendation badges, and interactive accents.
- Use `#f7d252` (`--color-yellow`) only for primary CTAs and the Magic Click switch glow.
- Apply 32px-36px pill radius for tags, filters, and CTA buttons.
- Keep card images in a 2:3 aspect ratio with 6px radius and a subtle 1px border.
- Use Inter / Noto Sans SC for body, navigation, and UI; keep Huiwen Mincho for display titles only.
- Maintain 16px element gaps and 64px section spacing for the comfortable, breathable layout.
- Apply `saturate(300%) blur(5px)` translucent backdrop to the sticky navigation.

### Don't
- Don't use Huiwen Mincho for body text or UI labels — it is display-only.
- Don't place saturated accent colors (`--color-purple`, `--color-pink`, `--color-orange`) on large backgrounds; use them only as small tags or social-card identities.
- Don't use sharp 0px radius on interactive components; the system is consistently rounded.
- Don't let body text exceed a 480-640px measure; keep paragraphs centered or constrained.
- Don't ignore the 8px base grid; spacing values should resolve to multiples of 8.
- Don't render the 3D image trail on mobile (`display: none` below 768px).
- Don't use pure white `#fff` as the default text color; the system uses warm off-whites (`#f7f5f3`, `#f9f8f7`).
- Don't forget the light-mode tokens when implementing the theme toggle.

## Imagery

Imagery on Ricoui is dominated by project thumbnails, 3D icon illustrations, and social-platform identity cards. Project thumbnails use a consistent 2:3 portrait ratio with object-fit cover, giving the masonry grid a magazine-like rhythm. The hero/background layer features a cursor-following "image trail" of 3D icons (bezier, game, hourglass, rocket, etc.) with transparent PNGs and soft drop shadows, adding playful depth without clutter. Social cards on the About page are flat, rounded rectangles with platform-specific brand colors and white icons/text. All imagery sits on the dark canvas, so images with transparent backgrounds or dark-friendly palettes integrate best. The overall treatment is clean, unframed, and modern — illustrations feel like floating objects rather than contained boxes.

## Layout

Ricoui uses a single-column, centered editorial layout with a sticky top navigation and generous vertical spacing. The hero section centers a large Huiwen Mincho title, a typewriter-style tag, a short description, and a row of social icons. Below the hero, the homepage presents three category cards (Collection, Works, GitHub) followed by a pill filter bar and a responsive masonry card grid. Cards flow from 4 columns on extra-wide screens down to 1 column on mobile via a custom `col-*a` flex grid. The About page repeats the hero pattern and then switches to a left-aligned reading column with a profile row and colorful social cards. All pages share the same sticky nav, theme toggle, and footer. Responsive breakpoints are 576px, 767px, 1023px/1024px, 1280px, and 1440px, with inner padding shrinking from 108px to 16px.

## Agent Prompt Guide

Quick Color Reference:
- canvas: `#19191b`
- primary text: `#f7f5f3`
- secondary text: `#d6d5d4`
- accent blue: `#499ad5`
- cta yellow: `#f7d252`
- border: `#323232`

Example Component Prompts:
1. Create a SectionHeader: a centered uppercase "PORTFOLIO" pill tag in 13px Special Elite with 1px border `#4b4b4b` and 36px radius, followed by a 72px Huiwen Mincho title "设计&编程" in `#f7f5f3`, then a 16px description in `#d6d5d4` max-width 480px, and a row of 20px social icons.
2. Create a WorkCard: 2:3 image wrapper with 6px radius and 1px `#323232` border, a header with "- Web -" and "(056)" tags in 12px `#101010`, a title in 18px/600 `#303030` with an optional blue "推荐" badge, and 14px `#909090` meta text.
3. Create a FilterBar: horizontal centered row of pill buttons, 15px text, 32px radius, 10px 24px padding, dark default (`#19191b` bg / `#d6d5d4` text / `#696765` border), active state (`#f4f3f0` bg / `#19191b` text), transition 0.35s cubic-bezier(0.075, 0.82, 0.165, 1).

## Similar Brands

- **Minimal Portfolio Templates** — Shared single-column, centered editorial layouts with large display typography and restrained color.
- **Astro/Tailwind Personal Sites** — Similar dark-first engineering aesthetic with class-based theme toggles and MDX content.
- **Chinese Indie Designer Blogs** — Combine Chinese serif display type with modern sans UI and playful interactive details.
- **GitHub / Vercel Docs** — Similar dark canvas, subtle translucent navigation, and utility-first spacing philosophy.

## Quick Start

### CSS Custom Properties

```css
:root {
  /* Colors — dark mode default */
  --color-0: #f7f5f3;
  --color-50: #f7f5f3;
  --color-100: #101010;
  --color-200: #303030;
  --color-300: #d6d5d4;
  --color-400: #505050;
  --color-500: #909090;
  --color-600: #707070;
  --color-700: #e0e0e0;
  --color-800: #303030;
  --color-900: #19191b;
  --color-999-basis: 225, 31%, 5%;
  --color-999: #19191b;
  --color-999-rgb: 25, 25, 27;
  --border: #323232;
  --border-color: rgb(49, 48, 53);
  --color-divider: #272f3f;
  --color-blue: #499ad5;
  --color-primary-light: #73abf9;
  --color-primary-lighter: #e0ecfd;
  --color-yellow: #f7d252;
  --color-green: #1bc47d;
  --color-purple: #6127ff;
  --color-pink: #ff419c;
  --color-cyan: #00d0ff;
  --color-orange: #ff5a19;
  --color-errors: #ff2c60;
  --card-color: rgba(40, 80, 120, 0.15);
  --card-color-selected: rgba(60, 90, 125, 0.3);
  --accent-overlay: hsla(0, 0%, 64%, 0.75);
  --accent-subtle-overlay: hsla(0, 0%, 9%, 0.33);

  /* Typography */
  --font-body: "Inter", "Noto Sans SC", system-ui, -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif;
  --font-brand: "Inter", "Noto Sans SC", system-ui, -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif;
  --font-type: "Special Elite", system-ui, monospace;
  --font-huiwen: "Huiwen-mincho", "Noto Serif SC", "Songti SC", serif;
  --font-mono: "Inconsolata", "SFMono-Regular", Menlo, Monaco, Consolas, monospace;

  /* Type Scale */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-md: 1.125rem;
  --text-lg: 1.5rem;
  --text-xl: 2rem;
  --text-2xl: 2.25rem;
  --text-3xl: 3rem;
  --text-4xl: 4rem;
  --text-5xl: 4.5rem;

  /* Spacing */
  --cell: 8px;
  --gap: 16px;
  --gutter: 20px;
  --size-top: 64px;
  --size-bottom: 64px;
  --pad-inner: 108px;
  --max-width: 90%;

  /* Radius */
  --radius-small: 4px;
  --radius: 6px;
  --radius-normal: 8px;
  --radius-large: 12px;
  --button-rounded: 8px;
  --button-rounded-full: 72px;

  /* Shadows */
  --shadow-sm: 0px 6px 3px rgba(9, 11, 17, 0.01), 0px 4px 2px rgba(9, 11, 17, 0.01), 0px 2px 2px rgba(9, 11, 17, 0.02), 0px 0px 1px rgba(9, 11, 17, 0.03);
  --shadow-md: 0px 28px 11px rgba(9, 11, 17, 0.01), 0px 16px 10px rgba(9, 11, 17, 0.03), 0px 7px 7px rgba(9, 11, 17, 0.05), 0px 2px 4px rgba(9, 11, 17, 0.06);
  --shadow-lg: 0px 62px 25px rgba(9, 11, 17, 0.01), 0px 35px 21px rgba(9, 11, 17, 0.05), 0px 16px 16px rgba(9, 11, 17, 0.1), 0px 4px 9px rgba(9, 11, 17, 0.12);

  /* Transitions */
  --theme-transition: 0.25s ease-in-out;
}
```

### Tailwind v4

```css
@theme {
  /* Colors */
  --color-ricoui-canvas: #19191b;
  --color-ricoui-ink: #f7f5f3;
  --color-ricoui-ink-muted: #d6d5d4;
  --color-ricoui-ink-subtle: #909090;
  --color-ricoui-surface-1: #101010;
  --color-ricoui-surface-2: #303030;
  --color-ricoui-border: #323232;
  --color-ricoui-divider: #272f3f;
  --color-ricoui-blue: #499ad5;
  --color-ricoui-yellow: #f7d252;
  --color-ricoui-green: #1bc47d;
  --color-ricoui-purple: #6127ff;
  --color-ricoui-pink: #ff419c;
  --color-ricoui-cyan: #00d0ff;
  --color-ricoui-orange: #ff5a19;
  --color-ricoui-error: #ff2c60;
  --color-ricoui-card: rgba(40, 80, 120, 0.15);

  /* Typography */
  --font-ricoui-sans: "Inter", "Noto Sans SC", system-ui, sans-serif;
  --font-ricoui-display: "Huiwen-mincho", "Noto Serif SC", serif;
  --font-ricoui-tag: "Special Elite", monospace;
  --font-ricoui-mono: "Inconsolata", monospace;

  /* Type Scale */
  --text-ricoui-xs: 0.75rem;
  --text-ricoui-sm: 0.875rem;
  --text-ricoui-base: 1rem;
  --text-ricoui-md: 1.125rem;
  --text-ricoui-lg: 1.5rem;
  --text-ricoui-xl: 2rem;
  --text-ricoui-2xl: 2.25rem;
  --text-ricoui-3xl: 3rem;
  --text-ricoui-4xl: 4rem;
  --text-ricoui-5xl: 4.5rem;

  /* Spacing */
  --spacing-ricoui-cell: 8px;
  --spacing-ricoui-gap: 16px;
  --spacing-ricoui-section: 64px;

  /* Radius */
  --radius-ricoui-sm: 4px;
  --radius-ricoui-md: 6px;
  --radius-ricoui-lg: 12px;
  --radius-ricoui-pill: 36px;
}
```
