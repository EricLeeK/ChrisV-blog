# ChrisV Personal Blog — Design Specification

**Date:** 2026-06-16  
**Status:** Approved for implementation  
**Design source:** Ricoui design system (`themes/ricoui/`)  
**Tech stack:** Astro + Tailwind CSS  
**Default theme:** Ricoui dark-first (`#19191b` canvas, off-white text, yellow CTA)

---

## 1. Overview

A personalized dark editorial blog for **ChrisV**, a geotechnical engineering graduate student who builds, designs, and writes about intelligent systems (AI, agents, NLP, design, and art). The visual language is borrowed directly from the Ricoui design system: near-black canvas, expressive Huiwen Mincho display titles, pill filters, masonry card grids, and a playful cursor-following 3D icon trail.

This spec intentionally focuses on **information architecture, visual system, and component behavior**. Final typography, exact spacing, and polish will be applied using the tokens already documented in `themes/ricoui/DESIGN.md`, `variables.css`, and `theme.css`.

---

## 2. Goals

- Establish ChrisV’s online presence as a hybrid researcher/creator.
- Make it easy to browse writing (Articles), work (Projects), curated links (Resources), and short thoughts (碎碎念).
- Keep the Ricoui aesthetic intact while personalizing content and navigation.
- Ship as a static Astro site that can be hosted on Vercel/Netlify/GitHub Pages.

---

## 3. Target Audience

- Researchers and engineers interested in AI/agent applications in civil/geotechnical fields.
- Designers and developers looking for cross-disciplinary thinking.
- Friends, collaborators, and potential sponsors.

---

## 4. Sections / Information Architecture

| Section | Path | Purpose |
|---------|------|---------|
| 首页 Home | `/` | Hero, category entry cards, filtered masonry grid of latest posts and projects. |
| 文章 Articles | `/articles` | Long-form writing: AI, design, art, geotechnical research, reflections. |
| 项目 Projects | `/projects` | Portfolio cards: AI experiments, creative coding, design systems, research tools. |
| 资源 Resources | `/resources` | Curated papers, tools, bookmarks, inspiration, reading list. |
| 关于 About | `/about` | Bio, background, interests, contact, social links. |
| 碎碎念 Random | `/random` | Short thoughts, sparks, reading snippets, micro-updates. |

### Navigation order
1. 首页
2. 文章
3. 项目
4. 资源
5. 关于
6. 碎碎念
7. Theme toggle

---

## 5. Page-by-Page Design

### 5.1 Home `/`

**Layout (Ricoui-style):**
1. Sticky navigation
2. Hero section
3. Three category entry cards (研究 / 项目 / 碎碎念)
4. Pill filter bar
5. Masonry card grid of latest content
6. Footer

**Hero content:**
- Tag: `CHRISV` (uppercase pill, Special Elite style)
- Title: `智能&艺术` (Huiwen Mincho, 72px → responsive)
- Subtitle: `A researcher who builds, designs, and writes about intelligent systems.`
- Social icons: GitHub, X, Email, WeChat, 小红书

**Category cards:**
- 研究 — 岩土 × AI
- 项目 — Agents & Code
- 碎碎念 — 短想法

**Filter pills:**
- 全部
- 🔥 推荐
- AI
- 设计
- 艺术
- 碎碎念

**Card grid:**
- Uses Ricoui `WorkCard` component.
- 2:3 aspect ratio thumbnails.
- Tags, title, optional “推荐” badge, meta line, arrow link.
- Content mixed from Articles + Projects + Random.

### 5.2 Articles `/articles`

- Hero tag: `ARTICLES`
- Title: `文章`
- Description: writing about AI agents, NLP, design, art, and research.
- Filter pills: AI · 设计 · 艺术 · 岩土工程 · 碎碎念
- Masonry grid of article cards only.

### 5.3 Projects `/projects`

- Hero tag: `PROJECTS`
- Title: `项目`
- Description: experiments with AI agents, NLP pipelines, creative coding, and design systems.
- Filter pills: AI Agents · NLP · Creative Coding · Design · Research Tools
- Masonry grid of project cards only.

### 5.4 Resources `/resources`

- Hero tag: `RESOURCES`
- Title: `资源`
- Description: curated tools, papers, bookmarks, and inspiration.
- Possible sub-sections/cards: 论文 · 工具 · 灵感 · 书架

### 5.5 About `/about`

- Hero tag: `ABOUT`
- Title: `关于我`
- Description: background and contact.
- Content blocks:
  1. Avatar + name + one-liner bio.
  2. Paragraph: `Current geotechnical engineering graduate student with a side passion for AI, agents, NLP, and design.`
  3. Social/contact cards: GitHub, X, Email, WeChat, 小红书.
  4. Optional: now page / current interests / reading list.

### 5.6 Random `/random`

- Hero tag: `RANDOM`
- Title: `碎碎念`
- Description: short thoughts, sparks, and reading excerpts.
- Stream of small cards or timeline entries.

---

## 6. Visual System

### 6.1 Colors

Use Ricoui dark tokens exactly as documented in `themes/ricoui/variables.css`:

| Token | Value | Usage |
|-------|-------|-------|
| `--color-999` | `#19191b` | Page background |
| `--color-0` | `#f7f5f3` | Primary text |
| `--color-300` | `#d6d5d4` | Secondary text |
| `--color-500` | `#909090` | Muted text |
| `--color-100` | `#101010` | Active nav / card title |
| `--color-200` | `#303030` | Borders |
| `--border` | `#323232` | Card borders |
| `--color-blue` | `#499ad5` | Links, “推荐” badge |
| `--color-yellow` | `#f7d252` | Primary CTA hover glow |
| `--color-green` | `#1bc47d` | Success / tag |

### 6.2 Typography

- **Display title:** 汇文明朝体 (Huiwen Mincho) via `https://chinese-fonts-cdn.deno.dev/packages/hwmct/dist/汇文明朝体/result.css`
  - Fallback: Noto Serif SC
  - Sizes: 72px desktop → 64px ≤1440px → 56px ≤767px → 48px ≤575px
- **Body / UI:** Inter + Noto Sans SC
- **Tags:** Special Elite uppercase
- **Mono:** Inconsolata for code

### 6.3 Spacing & Radius

- Base unit: 8px
- Section gap: 64px
- Card radius: 6px
- Pill radius: 36px
- Button radius: 8px (default), 36px (CTA)

### 6.4 Shadows

Use Ricoui layered shadows (`--shadow-sm`, `--shadow-md`, `--shadow-lg`).

---

## 7. Components

### 7.1 Sticky Navigation

- Glassmorphism: `backdrop-filter: saturate(300%) blur(5px)`
- Background: `rgba(25, 25, 27, 0.65)`
- Left: `CV` avatar + `ChrisV` text
- Right: nav links + theme toggle
- Active link: bold / `--color-100`

### 7.2 SectionHeader

- Uppercase pill tag
- Large Huiwen Mincho title
- Centered description paragraph
- Optional social icons below

### 7.3 Category Cards

- Three cards in a row on desktop
- 1 column on mobile
- Subtle hover lift
- Links to respective sections

### 7.4 Filter Bar

- Horizontal scrollable on mobile
- Pill buttons
- Active state: light background (`#f4f3f0`), dark text
- Transition: `0.35s cubic-bezier(0.075, 0.82, 0.165, 1)`

### 7.5 Work / Content Card

- 2:3 thumbnail
- Type tags
- Title + optional “推荐” badge
- Meta line (date, category, read time)
- Arrow link icon

### 7.6 Social / Contact Cards

- Platform color accent
- Icon + label
- Links open in new tab

### 7.7 Theme Toggle

- Circular sliding toggle
- Sun / Moon icons
- Dark mode default

### 7.8 Magic Click / 3D Icon Trail

- Keep Ricoui’s cursor-following 3D icon trail.
- Triggered by a small “Magic Click” switch near the logo.
- Cycles through states: DESIGN → SKILL → NEED3D → OFF.
- Hidden on mobile.

---

## 8. Content Model

### 8.1 Article

```yaml
---
title: string
date: ISO date
category: AI | 设计 | 艺术 | 岩土工程 | 碎碎念
tags: string[]
featured: boolean
description: string
cover: string # image path
---
```

### 8.2 Project

```yaml
---
title: string
date: ISO date
category: AI Agents | NLP | Creative Coding | Design | Research Tools
tags: string[]
featured: boolean
description: string
cover: string
link: string # demo / repo URL
---
```

### 8.3 Random Note

```yaml
---
date: ISO date
tags: string[]
---
```

Body is short text, possibly with an image.

### 8.4 Resource

```yaml
---
title: string
category: 论文 | 工具 | 灵感 | 书架
url: string
description: string
---
```

---

## 9. Interactions

| Element | Hover | Active | Focus |
|---------|-------|--------|-------|
| Nav link | opacity/color change | bold active state | visible outline |
| Filter pill | background lightens | inverted active state | visible outline |
| Card | image scale 1.05, shadow lift | — | visible outline |
| CTA button | darker yellow + glow | scale 0.97 | ring |
| Social icon | opacity 1.0, brand color | — | ring |
| Theme toggle | — | slides indicator | — |

---

## 10. Responsive Breakpoints

Use Ricoui breakpoints:

- ≥1440px: 108px inner padding, 4-column grid
- 1280px–1439px: 96px inner padding
- 1024px–1279px: 48px inner padding, 3-column grid
- 768px–1023px: 24px inner padding, 2-column grid
- <768px: 16px inner padding, 1-column grid, hide 3D icon trail

---

## 11. Assets Needed

| Asset | Source | Status |
|-------|--------|--------|
| Avatar / logo | Placeholder `CV` circle | Replace later |
| Project thumbnails | Placeholder images initially | Replace with real screenshots |
| Article covers | Placeholder or Unsplash | Replace with real visuals |
| 3D icon trail images | Reuse Ricoui-style transparent PNGs | Source or create 5–8 icons |
| Huiwen Mincho font | Chinese Fonts CDN | Already documented |

---

## 12. Do’s and Don’ts

### Do
- Keep the dark Ricoui canvas as default.
- Use Huiwen Mincho only for page titles (`智能&艺术`, `关于我`, etc.).
- Use `#f7f5f3` for primary text on dark backgrounds.
- Reserve yellow for the primary CTA and Magic Click glow.
- Use 6px radius for cards and 36px for pills/CTAs.
- Maintain 64px section spacing.
- Implement theme toggle and dark mode as default.

### Don’t
- Use Huiwen Mincho for body or UI text.
- Add saturated accent backgrounds on large areas.
- Remove the 3D icon trail without replacing it with another playful element.
- Exceed 480–640px line measure for body paragraphs.
- Skip mobile responsiveness.

---

## 13. Open Questions / Future Work

- Final avatar / logo image.
- Specific inaugural articles and projects to seed the site.
- Exact social platform URLs (GitHub: `EricLeeK`, X: `超级 TT`).
- Whether to add an RSS feed or newsletter signup.
- Whether to add a `/now` page.

---

## 14. Approval

Design approved by ChrisV on 2026-06-16.
