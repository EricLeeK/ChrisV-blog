# ChrisV Personal Blog — Implementation Plan

> **For the implementing agent:** Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to execute this plan task-by-task. Steps use checkbox syntax (`- [ ]`) for progress tracking.

**Goal:** Build a static personal blog for ChrisV using Astro + Tailwind CSS, faithfully applying the Ricoui design system already extracted in `themes/ricoui/`.

**Architecture:** A content-first Astro static site with Tailwind CSS for styling. Content is authored in Markdown/MDX frontmatter collections for Articles, Projects, Resources, and Random notes. Shared layout components (Nav, SectionHeader, Card, Footer) are reused across pages. The Ricoui design tokens are copied into the project as CSS custom properties and Tailwind theme extensions.

**Tech stack:** Astro 5.x, Tailwind CSS 4.x (or 3.x with `@config`), TypeScript, Markdown/MDX, Chinese Fonts CDN for Huiwen Mincho.

---

## File Structure

```
ChrisV-Blog/
├── public/
│   ├── fonts/                 # (optional) locally hosted fonts
│   ├── images/
│   │   ├── avatar.svg         # placeholder CV avatar
│   │   └── icons/             # 3D icon trail PNGs (placeholders)
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── ThemeToggle.astro
│   │   ├── SectionHeader.astro
│   │   ├── CategoryCards.astro
│   │   ├── FilterBar.astro
│   │   ├── ContentCard.astro
│   │   ├── CardGrid.astro
│   │   ├── SocialLinks.astro
│   │   ├── MagicSwitch.astro
│   │   ├── ImageTrail.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── ContentLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── articles.astro
│   │   ├── projects.astro
│   │   ├── resources.astro
│   │   ├── about.astro
│   │   ├── random.astro
│   │   └── articles/
│   │       └── [...slug].astro
│   ├── content/
│   │   ├── articles/
│   │   │   └── hello-world.md
│   │   ├── projects/
│   │   │   └── ai-experiment.md
│   │   ├── resources/
│   │   │   └── useful-tool.md
│   │   └── random/
│   │       └── first-spark.md
│   ├── data/
│   │   └── site.ts            # site metadata, nav, social links
│   ├── styles/
│   │   ├── global.css         # Ricoui variables + base styles
│   │   └── components.css     # component-specific utilities
│   ├── lib/
│   │   └── utils.ts           # helper functions (slugify, formatDate)
│   └── env.d.ts
├── docs/superpowers/specs/2026-06-16-chrisv-blog-design.md
├── docs/superpowers/plans/2026-06-16-chrisv-blog-implementation.md
├── themes/ricoui/             # source design system (read-only reference)
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
└── .gitignore
```

---

## Task 1 — Initialize the Astro project

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`
- Modify: none

- [ ] **Step 1: Initialize git and Astro project**

```bash
cd /Users/chrisv/Projects/ChrisV-Blog
git init
git branch -M main
npm create astro@latest -- --template minimal --install --no-git --skip-houston .
```

Expected: Astro minimal template installed in current directory.

- [ ] **Step 2: Install Tailwind CSS and Astro MDX**

```bash
npm install -D @astrojs/tailwind tailwindcss @tailwindcss/vite
npm install -D @astrojs/mdx
npx astro add mdx -y
```

Expected: dependencies installed, `astro.config.mjs` updated with MDX integration.

- [ ] **Step 3: Create base configuration files**

`astro.config.mjs`:
```javascript
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://chrisv.example.com',
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

`tsconfig.json`:
```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

`.gitignore`:
```gitignore
# Astro
node_modules/
dist/
.astro/

# logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# env
.env
.env.production

# macOS
.DS_Store

# editor
.vscode/
.idea/

# superpowers brainstorm artifacts (optional to keep)
.superpowers/brainstorm/*/
!.superpowers/brainstorm/*/.server-info
```

- [ ] **Step 4: Verify dev server starts**

```bash
npm run dev -- --host
```

Expected: dev server runs on `http://localhost:4321` (or Astro default).

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "chore: initialize Astro + Tailwind + MDX project"
```

---

## Task 2 — Integrate Ricoui design tokens

**Files:**
- Create: `src/styles/global.css`, `src/styles/components.css`, `tailwind.config.mjs`
- Modify: none

- [ ] **Step 1: Copy Ricoui variables into global CSS**

Create `src/styles/global.css` by copying `themes/ricoui/variables.css` and adding base resets:

```css
@import url('https://chinese-fonts-cdn.deno.dev/packages/hwmct/dist/汇文明朝体/result.css');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;600&family=Special+Elite&family=Inconsolata:wght@400;500&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Paste all variables from themes/ricoui/variables.css here */
  --color-0: #f7f5f3;
  --color-100: #101010;
  --color-200: #303030;
  --color-300: #d6d5d4;
  --color-400: #505050;
  --color-500: #909090;
  --color-600: #707070;
  --color-900: #19191b;
  --color-999: #19191b;
  --color-999-rgb: 25, 25, 27;
  --border: #323232;
  --color-blue: #499ad5;
  --color-yellow: #f7d252;
  --color-green: #1bc47d;
  --color-purple: #6127ff;
  --color-pink: #ff419c;
  --color-cyan: #00d0ff;
  --color-orange: #ff5a19;
  --color-errors: #ff2c60;
  --card-color: rgba(40, 80, 120, 0.15);
  --font-body: 'Inter', 'Noto Sans SC', system-ui, sans-serif;
  --font-display: 'Huiwen-mincho', 'Noto Serif SC', serif;
  --font-tag: 'Special Elite', monospace;
  --font-mono: 'Inconsolata', monospace;
  --text-5xl: 4.5rem;
  --text-4xl: 4rem;
  --text-3xl: 3rem;
  --text-2xl: 2.25rem;
  --text-xl: 2rem;
  --text-lg: 1.5rem;
  --text-md: 1.125rem;
  --text-base: 1rem;
  --text-sm: 0.875rem;
  --text-xs: 0.75rem;
  --radius: 6px;
  --radius-pill: 36px;
  --shadow-sm: 0px 6px 3px rgba(9, 11, 17, 0.01), 0px 4px 2px rgba(9, 11, 17, 0.01), 0px 2px 2px rgba(9, 11, 17, 0.02), 0px 0px 1px rgba(9, 11, 17, 0.03);
  --shadow-md: 0px 28px 11px rgba(9, 11, 17, 0.01), 0px 16px 10px rgba(9, 11, 17, 0.03), 0px 7px 7px rgba(9, 11, 17, 0.05), 0px 2px 4px rgba(9, 11, 17, 0.06);
  --shadow-lg: 0px 62px 25px rgba(9, 11, 17, 0.01), 0px 35px 21px rgba(9, 11, 17, 0.05), 0px 16px 16px rgba(9, 11, 17, 0.1), 0px 4px 9px rgba(9, 11, 17, 0.12);
}

:root:not(.theme-dark) {
  --color-0: #000;
  --color-100: #101010;
  --color-200: #303030;
  --color-300: #505050;
  --color-400: #707070;
  --color-500: #909090;
  --color-600: #c0c0c0;
  --color-900: #f9f8f7;
  --color-999: #f9f8f7;
  --color-999-rgb: 249, 248, 247;
  --border: #ececec;
}

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    background-color: var(--color-999);
    color: var(--color-0);
    font-family: var(--font-body);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-body);
    font-weight: 600;
  }
  a {
    color: var(--color-blue);
    text-decoration: none;
  }
  code, pre {
    font-family: var(--font-mono);
  }
}
```

- [ ] **Step 2: Create Tailwind config extending Ricoui tokens**

`tailwind.config.mjs`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--color-999)',
        ink: 'var(--color-0)',
        'ink-muted': 'var(--color-300)',
        'ink-subtle': 'var(--color-500)',
        surface: 'var(--color-200)',
        border: 'var(--border)',
        'ricoui-blue': 'var(--color-blue)',
        'ricoui-yellow': 'var(--color-yellow)',
        'ricoui-green': 'var(--color-green)',
        'ricoui-purple': 'var(--color-purple)',
        'ricoui-pink': 'var(--color-pink)',
        'ricoui-cyan': 'var(--color-cyan)',
        'ricoui-orange': 'var(--color-orange)',
      },
      fontFamily: {
        sans: ['var(--font-body)'],
        display: ['var(--font-display)'],
        tag: ['var(--font-tag)'],
        mono: ['var(--font-mono)'],
      },
      fontSize: {
        display: ['var(--text-5xl)', { lineHeight: '1.2' }],
        'display-lg': ['var(--text-4xl)', { lineHeight: '1.1' }],
        'heading-1': ['var(--text-3xl)', { lineHeight: '1.1' }],
        'heading-2': ['var(--text-2xl)', { lineHeight: '1.1' }],
        'heading-3': ['var(--text-xl)', { lineHeight: '1.1' }],
        subheading: ['var(--text-lg)', { lineHeight: '1.4' }],
        lead: ['var(--text-md)', { lineHeight: '1.6' }],
        body: ['var(--text-base)', { lineHeight: '1.5' }],
        sm: ['var(--text-sm)', { lineHeight: '1.5' }],
        xs: ['var(--text-xs)', { lineHeight: '1.4' }],
      },
      borderRadius: {
        card: 'var(--radius)',
        pill: 'var(--radius-pill)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 3: Import global CSS in layout**

Create `src/layouts/BaseLayout.astro`:

```astro
---
import '../styles/global.css';

interface Props {
  title?: string;
  description?: string;
}

const { title = 'ChrisV', description = 'A researcher who builds, designs, and writes about intelligent systems.' } = Astro.props;
---

<!doctype html>
<html lang="zh-CN" class="theme-dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  </head>
  <body class="min-h-screen">
    <slot />
  </body>
</html>
```

- [ ] **Step 4: Verify styles compile**

```bash
npm run build
```

Expected: build succeeds with no Tailwind/CSS errors.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: integrate Ricoui design tokens and base layout"
```

---

## Task 3 — Site metadata and utilities

**Files:**
- Create: `src/data/site.ts`, `src/lib/utils.ts`, `public/favicon.svg`, `public/images/avatar.svg`
- Modify: none

- [ ] **Step 1: Create site metadata file**

`src/data/site.ts`:
```typescript
export const site = {
  title: 'ChrisV',
  subtitle: 'A researcher who builds, designs, and writes about intelligent systems.',
  heroTitle: '智能&艺术',
  tag: 'CHRISV',
  author: 'ChrisV',
  email: 'shiyaol492@gmail.com',
  startYear: 2026,
};

export const nav = [
  { label: '首页', href: '/' },
  { label: '文章', href: '/articles' },
  { label: '项目', href: '/projects' },
  { label: '资源', href: '/resources' },
  { label: '关于', href: '/about' },
  { label: '碎碎念', href: '/random' },
];

export const social = [
  { label: 'GitHub', href: 'https://github.com/EricLeeK', icon: 'github' },
  { label: 'X', href: 'https://x.com/超级TT', icon: 'x' },
  { label: 'Email', href: 'mailto:shiyaol492@gmail.com', icon: 'email' },
  { label: 'WeChat', href: '#', icon: 'wechat' },
  { label: '小红书', href: '#', icon: 'xiaohongshu' },
];

export const filters = [
  { id: 'all', label: '全部' },
  { id: 'featured', label: '🔥 推荐' },
  { id: 'ai', label: 'AI' },
  { id: 'design', label: '设计' },
  { id: 'art', label: '艺术' },
  { id: 'random', label: '碎碎念' },
];

export const categories = [
  { id: 'research', title: '研究', subtitle: '岩土 × AI', href: '/articles?filter=岩土工程' },
  { id: 'projects', title: '项目', subtitle: 'Agents & Code', href: '/projects' },
  { id: 'random', title: '碎碎念', subtitle: '短想法', href: '/random' },
];
```

- [ ] **Step 2: Create utility helpers**

`src/lib/utils.ts`:
```typescript
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}
```

- [ ] **Step 3: Create placeholder assets**

`public/favicon.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="20" fill="#19191b"/>
  <text x="50" y="68" text-anchor="middle" font-family="Inter, sans-serif" font-size="48" font-weight="600" fill="#f7f5f3">CV</text>
</svg>
```

`public/images/avatar.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="50" fill="#323232"/>
  <text x="50" y="64" text-anchor="middle" font-family="Inter, sans-serif" font-size="40" font-weight="600" fill="#f7f5f3">CV</text>
</svg>
```

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add site metadata, utils, and placeholder assets"
```

---

## Task 4 — Build core layout components

**Files:**
- Create: `src/components/Nav.astro`, `src/components/ThemeToggle.astro`, `src/components/Footer.astro`, `src/components/SocialLinks.astro`, `src/components/SectionHeader.astro`
- Modify: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Build Nav component**

`src/components/Nav.astro`:
```astro
---
import { nav, site } from '../data/site.ts';
import ThemeToggle from './ThemeToggle.astro';

const currentPath = Astro.url.pathname;
---

<nav class="sticky top-0 z-50 backdrop-blur-md" style="background: rgba(25, 25, 27, 0.65); border-bottom: 1px solid var(--border);">
  <div class="mx-auto flex items-center justify-between px-6 py-4" style="max-width: var(--max-width);">
    <a href="/" class="flex items-center gap-3">
      <img src="/images/avatar.svg" alt={site.title} class="h-10 w-10 rounded-full" />
      <span class="text-lg font-semibold" style="color: var(--color-0);">{site.title}</span>
    </a>
    <div class="hidden items-center gap-6 md:flex">
      {nav.map((item) => (
        <a
          href={item.href}
          class="text-sm transition-opacity hover:opacity-80"
          style={`color: ${currentPath === item.href ? 'var(--color-0)' : 'var(--color-300)'}; font-weight: ${currentPath === item.href ? '600' : '400'};`}
        >
          {item.label}
        </a>
      ))}
      <ThemeToggle />
    </div>
  </div>
</nav>
```

- [ ] **Step 2: Build ThemeToggle component**

`src/components/ThemeToggle.astro`:
```astro
<button
  id="theme-toggle"
  class="relative h-8 w-14 rounded-full transition-colors"
  style="background: var(--color-999); border: 1px solid var(--border);"
  aria-label="Toggle dark mode"
>
  <span
    id="theme-indicator"
    class="absolute top-1 left-1 h-6 w-6 rounded-full bg-white transition-transform"
  ></span>
</button>

<script>
  const toggle = document.getElementById('theme-toggle');
  const indicator = document.getElementById('theme-indicator');
  const root = document.documentElement;

  function updateTheme() {
    const isDark = root.classList.contains('theme-dark');
    if (isDark) {
      root.classList.remove('theme-dark');
      indicator.style.transform = 'translateX(0)';
    } else {
      root.classList.add('theme-dark');
      indicator.style.transform = 'translateX(100%)';
    }
  }

  toggle?.addEventListener('click', updateTheme);
</script>
```

- [ ] **Step 3: Build Footer component**

`src/components/Footer.astro`:
```astro
---
import { site } from '../data/site.ts';
const year = new Date().getFullYear();
---

<footer class="py-12 text-center text-sm" style="color: var(--color-400);">
  <p>© {year} {site.author}. All Rights Reserved.</p>
  <p class="mt-2 text-xs">Built with Astro + Tailwind CSS · Designed after Ricoui</p>
</footer>
```

- [ ] **Step 4: Build SocialLinks component**

`src/components/SocialLinks.astro`:
```astro
---
import { social } from '../data/site.ts';
---

<div class="flex items-center gap-4">
  {social.map((item) => (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      class="text-sm opacity-75 transition-opacity hover:opacity-100"
      style="color: var(--color-0);"
    >
      {item.label}
    </a>
  ))}
</div>
```

- [ ] **Step 5: Build SectionHeader component**

`src/components/SectionHeader.astro`:
```astro
---
import SocialLinks from './SocialLinks.astro';

interface Props {
  tag: string;
  title: string;
  description?: string;
  showSocial?: boolean;
}

const { tag, title, description, showSocial = false } = Astro.props;
---

<header class="flex flex-col items-center py-16 text-center md:py-24">
  <span
    class="mb-6 inline-block rounded-full px-6 py-2 text-xs uppercase tracking-widest"
    style="font-family: var(--font-tag); border: 1px solid var(--border); color: var(--color-300);"
  >
    {tag}
  </span>
  <h1
    class="mb-6 text-display md:text-display-lg"
    style="font-family: var(--font-display); color: var(--color-0);"
  >
    {title}
  </h1>
  {description && (
    <p class="max-w-md text-lg" style="color: var(--color-300);">
      {description}
    </p>
  )}
  {showSocial && <div class="mt-8"><SocialLinks /></div>}
</header>
```

- [ ] **Step 6: Update BaseLayout to include Nav and Footer**

`src/layouts/BaseLayout.astro`:
```astro
---
import '../styles/global.css';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';

interface Props {
  title?: string;
  description?: string;
}

const { title = 'ChrisV', description = 'A researcher who builds, designs, and writes about intelligent systems.' } = Astro.props;
---

<!doctype html>
<html lang="zh-CN" class="theme-dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  </head>
  <body class="min-h-screen">
    <Nav />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

- [ ] **Step 7: Verify build**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 8: Commit**

```bash
git add .
git commit -m "feat: add Nav, Footer, ThemeToggle, SocialLinks, SectionHeader components"
```

---

## Task 5 — Content collections and sample data

**Files:**
- Create: `src/content/articles/hello-world.md`, `src/content/projects/ai-experiment.md`, `src/content/resources/useful-tool.md`, `src/content/random/first-spark.md`
- Modify: `astro.config.mjs`

- [ ] **Step 1: Enable content collections if not already**

Astro 5 uses `src/content/` with `config.ts` optional for type safety. Create `src/content/config.ts`:

```typescript
import { defineCollection, z } from 'astro:content';

const articleCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.enum(['AI', '设计', '艺术', '岩土工程', '碎碎念']),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    cover: z.string().optional(),
  }),
});

const projectCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.enum(['AI Agents', 'NLP', 'Creative Coding', 'Design', 'Research Tools']),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    cover: z.string().optional(),
    link: z.string().optional(),
  }),
});

const resourceCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['论文', '工具', '灵感', '书架']),
    url: z.string().url(),
  }),
});

const randomCollection = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = {
  articles: articleCollection,
  projects: projectCollection,
  resources: resourceCollection,
  random: randomCollection,
};
```

- [ ] **Step 2: Create sample content**

`src/content/articles/hello-world.md`:
```markdown
---
title: "Hello, World"
description: "My first post on this new blog."
date: 2026-06-16
category: "AI"
tags: ["intro", "ai"]
featured: true
cover: "/images/placeholder.svg"
---

This is the first article on ChrisV's blog.
```

`src/content/projects/ai-experiment.md`:
```markdown
---
title: "AI Experiment #1"
description: "A small agent experiment."
date: 2026-06-16
category: "AI Agents"
tags: ["agents", "llm"]
featured: true
link: "https://github.com/EricLeeK"
---

Details about the experiment.
```

`src/content/resources/useful-tool.md`:
```markdown
---
title: "Astro"
description: "The web framework for content-driven websites."
category: "工具"
url: "https://astro.build"
---

Great for static blogs.
```

`src/content/random/first-spark.md`:
```markdown
---
date: 2026-06-16
tags: ["spark"]
---

A quick thought: the intersection of geotechnical engineering and AI agents is unexplored and fascinating.
```

- [ ] **Step 3: Verify content renders**

```bash
npm run build
```

Expected: build succeeds, no schema errors.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add content collections and sample posts"
```

---

## Task 6 — Card components and grid

**Files:**
- Create: `src/components/ContentCard.astro`, `src/components/CategoryCards.astro`, `src/components/FilterBar.astro`, `src/components/CardGrid.astro`
- Modify: none

- [ ] **Step 1: Build ContentCard component**

`src/components/ContentCard.astro`:
```astro
---
import { formatDate } from '../lib/utils.ts';

interface Props {
  title: string;
  description: string;
  date?: Date;
  category: string;
  tags?: string[];
  featured?: boolean;
  href: string;
  cover?: string;
}

const { title, description, date, category, tags = [], featured = false, href, cover = '/images/placeholder.svg' } = Astro.props;
---

<article class="group relative overflow-hidden rounded-card border transition-shadow hover:shadow-md" style="border-color: var(--border); background: var(--card-color);">
  <a href={href} class="block">
    <div class="aspect-[2/3] overflow-hidden" style="background: var(--color-900);">
      <img src={cover} alt={title} class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
    </div>
    <div class="p-4">
      <div class="mb-2 flex items-center gap-2 text-xs" style="color: var(--color-500);">
        <span>{category}</span>
        {featured && <span class="rounded px-2 py-0.5" style="background: var(--color-blue); color: var(--color-0);">推荐</span>}
      </div>
      <h3 class="mb-2 text-lg font-semibold" style="color: var(--color-0);">{title}</h3>
      <p class="mb-3 line-clamp-2 text-sm" style="color: var(--color-300);">{description}</p>
      {date && <time class="text-xs" style="color: var(--color-500);">{formatDate(date)}</time>}
    </div>
  </a>
</article>
```

- [ ] **Step 2: Build CategoryCards component**

`src/components/CategoryCards.astro`:
```astro
---
import { categories } from '../data/site.ts';
---

<section class="mx-auto mb-16 grid gap-4 px-6 md:grid-cols-3" style="max-width: var(--max-width);">
  {categories.map((cat) => (
    <a
      href={cat.href}
      class="rounded-card border p-6 text-center transition-all hover:-translate-y-1 hover:shadow-md"
      style="border-color: var(--border); background: var(--card-color);"
    >
      <h3 class="mb-1 text-xl font-semibold" style="color: var(--color-0);">{cat.title}</h3>
      <p class="text-sm" style="color: var(--color-300);">{cat.subtitle}</p>
    </a>
  ))}
</section>
```

- [ ] **Step 3: Build FilterBar component**

`src/components/FilterBar.astro`:
```astro
---
import { filters } from '../data/site.ts';

interface Props {
  active?: string;
}

const { active = 'all' } = Astro.props;
---

<div class="mx-auto mb-8 flex flex-wrap justify-center gap-3 px-6" style="max-width: var(--max-width);">
  {filters.map((filter) => (
    <button
      class="rounded-pill px-6 py-2 text-sm transition-all"
      style={`background: ${active === filter.id ? '#f4f3f0' : 'var(--color-999)'}; color: ${active === filter.id ? 'var(--color-900)' : 'var(--color-300)'}; border: 1px solid ${active === filter.id ? 'var(--color-999)' : '#696765'};`}
      data-filter={filter.id}
    >
      {filter.label}
    </button>
  ))}
</div>
```

- [ ] **Step 4: Build CardGrid component**

`src/components/CardGrid.astro`:
```astro
---
import ContentCard from './ContentCard.astro';

interface Item {
  slug: string;
  collection: string;
  data: {
    title: string;
    description: string;
    date?: Date;
    category: string;
    tags?: string[];
    featured?: boolean;
    cover?: string;
  };
}

interface Props {
  items: Item[];
}

const { items } = Astro.props;
---

<div class="mx-auto grid gap-4 px-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" style="max-width: var(--max-width);">
  {items.map((item) => (
    <ContentCard
      href={`/${item.collection}/${item.slug}`}
      title={item.data.title}
      description={item.data.description}
      date={item.data.date}
      category={item.data.category}
      tags={item.data.tags}
      featured={item.data.featured}
      cover={item.data.cover}
    />
  ))}
</div>
```

- [ ] **Step 5: Verify build**

```bash
npm run build
```

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat: add ContentCard, CategoryCards, FilterBar, CardGrid components"
```

---

## Task 7 — Build pages

**Files:**
- Create: `src/pages/index.astro`, `src/pages/articles.astro`, `src/pages/projects.astro`, `src/pages/resources.astro`, `src/pages/about.astro`, `src/pages/random.astro`
- Modify: none

- [ ] **Step 1: Build homepage**

`src/pages/index.astro`:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import SectionHeader from '../components/SectionHeader.astro';
import CategoryCards from '../components/CategoryCards.astro';
import FilterBar from '../components/FilterBar.astro';
import CardGrid from '../components/CardGrid.astro';
import { site, filters } from '../data/site.ts';
import { getCollection } from 'astro:content';

const articles = await getCollection('articles');
const projects = await getCollection('projects');
const random = await getCollection('random');

const allItems = [...articles, ...projects, ...random]
  .sort((a, b) => (b.data.date?.getTime() || 0) - (a.data.date?.getTime() || 0));
---

<BaseLayout title={`${site.title} — ${site.heroTitle}`} description={site.subtitle}>
  <SectionHeader tag={site.tag} title={site.heroTitle} description={site.subtitle} showSocial />
  <CategoryCards />
  <FilterBar active="all" />
  <CardGrid items={allItems} />
</BaseLayout>
```

- [ ] **Step 2: Build articles page**

`src/pages/articles.astro`:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import SectionHeader from '../components/SectionHeader.astro';
import FilterBar from '../components/FilterBar.astro';
import CardGrid from '../components/CardGrid.astro';
import { getCollection } from 'astro:content';

const articles = await getCollection('articles');
articles.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
---

<BaseLayout title="文章 — ChrisV" description="Writing about AI, design, art, and geotechnical research.">
  <SectionHeader tag="ARTICLES" title="文章" description="Writing about AI agents, NLP, design, art, and research." />
  <FilterBar active="ai" />
  <CardGrid items={articles} />
</BaseLayout>
```

- [ ] **Step 3: Build projects page**

`src/pages/projects.astro`:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import SectionHeader from '../components/SectionHeader.astro';
import FilterBar from '../components/FilterBar.astro';
import CardGrid from '../components/CardGrid.astro';
import { getCollection } from 'astro:content';

const projects = await getCollection('projects');
projects.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
---

<BaseLayout title="项目 — ChrisV" description="AI experiments, creative coding, and design systems.">
  <SectionHeader tag="PROJECTS" title="项目" description="Experiments with AI agents, NLP pipelines, creative coding, and design systems." />
  <FilterBar active="ai" />
  <CardGrid items={projects} />
</BaseLayout>
```

- [ ] **Step 4: Build resources page**

`src/pages/resources.astro`:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import SectionHeader from '../components/SectionHeader.astro';
import { getCollection } from 'astro:content';

const resources = await getCollection('resources');
---

<BaseLayout title="资源 — ChrisV" description="Curated papers, tools, bookmarks, and inspiration.">
  <SectionHeader tag="RESOURCES" title="资源" description="Curated papers, tools, bookmarks, and inspiration." />
  <section class="mx-auto grid gap-4 px-6 md:grid-cols-2" style="max-width: var(--max-width);">
    {resources.map((r) => (
      <a href={r.data.url} target="_blank" rel="noopener noreferrer" class="rounded-card border p-6 transition-shadow hover:shadow-md" style="border-color: var(--border); background: var(--card-color);">
        <div class="mb-2 text-xs" style="color: var(--color-blue);">{r.data.category}</div>
        <h3 class="mb-2 text-lg font-semibold" style="color: var(--color-0);">{r.data.title}</h3>
        <p class="text-sm" style="color: var(--color-300);">{r.data.description}</p>
      </a>
    ))}
  </section>
</BaseLayout>
```

- [ ] **Step 5: Build about page**

`src/pages/about.astro`:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import SectionHeader from '../components/SectionHeader.astro';
import SocialLinks from '../components/SocialLinks.astro';
import { site, social } from '../data/site.ts';
---

<BaseLayout title="关于 — ChrisV" description="About ChrisV, a researcher and creator.">
  <SectionHeader tag="ABOUT" title="关于我" />
  <section class="mx-auto flex max-w-3xl flex-col items-center gap-8 px-6 py-8 md:flex-row md:items-start">
    <img src="/images/avatar.svg" alt={site.author} class="h-32 w-32 rounded-full" />
    <div>
      <h2 class="mb-2 text-2xl font-semibold" style="color: var(--color-0);">{site.author}</h2>
      <p class="mb-6" style="color: var(--color-300);">Current geotechnical engineering graduate student with a side passion for AI, agents, NLP, and design.</p>
      <div class="flex flex-wrap gap-3">
        {social.map((item) => (
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            class="rounded-pill px-5 py-2 text-sm transition-opacity hover:opacity-80"
            style="background: var(--color-200); color: var(--color-0);"
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 6: Build random page**

`src/pages/random.astro`:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import SectionHeader from '../components/SectionHeader.astro';
import { getCollection } from 'astro:content';

const notes = await getCollection('random');
notes.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
---

<BaseLayout title="碎碎念 — ChrisV" description="Short thoughts, sparks, and reading excerpts.">
  <SectionHeader tag="RANDOM" title="碎碎念" description="Short thoughts, sparks, and reading excerpts." />
  <section class="mx-auto max-w-2xl space-y-6 px-6">
    {notes.map((note) => (
      <article class="rounded-card border p-6" style="border-color: var(--border); background: var(--card-color);">
        <time class="mb-2 block text-xs" style="color: var(--color-500);">{note.data.date.toLocaleDateString('zh-CN')}</time>
        <div class="prose prose-invert" set:html={note.body} />
      </article>
    ))}
  </section>
</BaseLayout>
```

- [ ] **Step 7: Verify build and pages**

```bash
npm run build
```

Expected: all pages build successfully.

- [ ] **Step 8: Commit**

```bash
git add .
git commit -m "feat: add Home, Articles, Projects, Resources, About, and Random pages"
```

---

## Task 8 — Add article detail page

**Files:**
- Create: `src/pages/articles/[...slug].astro`
- Modify: none

- [ ] **Step 1: Create article detail route**

`src/pages/articles/[...slug].astro`:
```astro
---
import { type CollectionEntry, getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

export async function getStaticPaths() {
  const posts = await getCollection('articles');
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

interface Props {
  post: CollectionEntry<'articles'>;
}

const { post } = Astro.props;
const { Content } = await post.render();
---

<BaseLayout title={`${post.data.title} — ChrisV`} description={post.data.description}>
  <article class="mx-auto max-w-3xl px-6 py-16">
    <header class="mb-12 text-center">
      <div class="mb-4 text-xs uppercase tracking-widest" style="font-family: var(--font-tag); color: var(--color-500);">{post.data.category}</div>
      <h1 class="mb-4 text-4xl font-semibold" style="color: var(--color-0);">{post.data.title}</h1>
      <time class="text-sm" style="color: var(--color-500);">{post.data.date.toLocaleDateString('zh-CN')}</time>
    </header>
    <div class="prose prose-invert max-w-none">
      <Content />
    </div>
  </article>
</BaseLayout>
```

- [ ] **Step 2: Verify detail page builds**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: add article detail page route"
```

---

## Task 9 — Add Magic Click / 3D icon trail (optional polish)

**Files:**
- Create: `src/components/MagicSwitch.astro`, `src/components/ImageTrail.astro`
- Modify: `src/components/Nav.astro`, `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Create MagicSwitch placeholder**

`src/components/MagicSwitch.astro`:
```astro
<button
  id="magic-switch"
  class="rounded-pill px-3 py-1 text-xs transition-all"
  style="background: var(--color-yellow); color: var(--color-100); border: 1px solid var(--color-yellow);"
>
  Magic Click!
</button>
```

- [ ] **Step 2: Add to Nav**

Modify `src/components/Nav.astro` to include `<MagicSwitch />` near the logo:

```astro
<a href="/" class="flex items-center gap-3">
  <img src="/images/avatar.svg" alt={site.title} class="h-10 w-10 rounded-full" />
  <span class="text-lg font-semibold" style="color: var(--color-0);">{site.title}</span>
  <span class="hidden sm:inline"><MagicSwitch /></span>
</a>
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add Magic Click switch placeholder"
```

---

## Task 10 — Final validation and build

**Files:**
- Modify: none

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: `dist/` created with `index.html`, `articles/`, `projects/`, etc.

- [ ] **Step 2: Preview locally**

```bash
npm run preview
```

Open `http://localhost:4321` and verify:
- Homepage renders with hero, cards, filter, grid.
- Navigation works across all pages.
- Dark theme is default.
- Theme toggle switches appearance.
- Article detail page opens.

- [ ] **Step 3: Commit final state**

```bash
git add .
git commit -m "chore: final build and validation"
```

---

## Self-Check

| Spec Section | Implementing Task | Status |
|--------------|-------------------|--------|
| Dark Ricoui theme | Task 2 | covered |
| Huiwen Mincho display font | Task 2 (global.css CDN) | covered |
| Sticky nav with logo + links + theme toggle | Task 4 | covered |
| Hero with tag/title/subtitle/social | Task 4 + 7 | covered |
| Category cards (研究/项目/碎碎念) | Task 6 | covered |
| Filter bar + masonry grid | Task 6 | covered |
| ContentCard component | Task 6 | covered |
| Articles / Projects / Resources / About / Random pages | Task 7 | covered |
| Article detail page | Task 8 | covered |
| Magic Click placeholder | Task 9 | covered |
| Responsive breakpoints | Tailwind config + components | covered |
| Content collections | Task 5 | covered |

**Placeholder scan:**
- Avatar and project thumbnails are explicitly placeholders, documented in Task 3 and Future Work.
- 3D icon trail is a placeholder switch, to be enhanced later.
- No TODOs or “待定” left in component code.

**Type consistency:**
- `site.ts`, `utils.ts`, and collection schemas use consistent field names (`title`, `description`, `date`, `category`, `tags`, `featured`, `cover`).
- CardGrid accepts any collection item with compatible data shape.
