# 逆行之美学讲座系列集成实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 将本地 `逆行美学讲座-HTML` 文件夹中的 10 页 HTML 讲解页面集成到 Astro 博客，在每页顶部添加返回博客主页的导航条，并在博客文章列表中以外链卡片形式展示入口。

**架构：** HTML 页面作为静态文件放入 `public/lectures/retro-aesthetics/`，通过 Node 脚本统一注入共享导航条片段；博客侧通过新增 `externalUrl` 字段让文章卡片直接外链到 HTML 系列首页。

**技术栈：** Astro 6, TypeScript, Tailwind CSS 4, Node.js 脚本

---

## 文件结构

### 新增文件

- `public/lectures/retro-aesthetics/lecture-guide-block1.html` ~ `lecture-guide-block10.html`
  - 从 `/Users/chrisv/Media_factory/逆行美学讲座-HTML/` 复制而来，并注入导航条。
- `public/lectures/retro-aesthetics/nav-bar.html`
  - 共享导航条 HTML + CSS 片段。
- `scripts/inject-lecture-nav.js`
  - 将 `nav-bar.html` 注入到指定目录下每个 HTML 文件的 `<body>` 开头。
- `src/content/articles/retro-aesthetics.md`
  - 博客入口文章，frontmatter 包含 `externalUrl`。

### 修改文件

- `src/content.config.ts`
  - `articles` schema 增加 `externalUrl: z.string().optional()`。
- `src/components/ContentCard.astro`
  - 增加 `externalUrl?: string` prop；存在时卡片链接到外部 URL。
- `src/components/CardGrid.astro`
  - 从 item 数据中提取 `externalUrl` 并传给 `ContentCard`。

---

## 任务 1：复制 HTML 文件到 public 目录

**文件：**
- 创建：`public/lectures/retro-aesthetics/lecture-guide-block1.html` ~ `lecture-guide-block10.html`

- [ ] **步骤 1：创建目标目录并复制文件**

```bash
mkdir -p public/lectures/retro-aesthetics
cp /Users/chrisv/Media_factory/逆行美学讲座-HTML/lecture-guide-block*.html public/lectures/retro-aesthetics/
```

- [ ] **步骤 2：确认 10 个文件已复制**

```bash
ls -1 public/lectures/retro-aesthetics/lecture-guide-block*.html | wc -l
```

预期输出：`10`

- [ ] **步骤 3：Commit**

```bash
git add public/lectures/retro-aesthetics/
git commit -m "chore: copy retro-aesthetics lecture HTML files to public"
```

---

## 任务 2：创建共享导航条片段

**文件：**
- 创建：`public/lectures/retro-aesthetics/nav-bar.html`

- [ ] **步骤 1：写入导航条片段**

```html
<div class="lecture-nav-bar">
  <a href="/" class="lecture-nav-back">← 回博客</a>
  <span class="lecture-nav-title">逆行之美学</span>
  <span class="lecture-nav-spacer"></span>
</div>

<style>
  .lecture-nav-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 14px 24px;
    background: #efeadd;
    border-bottom: 1px solid #e0d8c8;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif;
  }

  .lecture-nav-back {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 14px;
    background: #f7f5ef;
    border: 1px solid #e0d8c8;
    border-radius: 6px;
    color: #2b2319;
    font-size: 14px;
    text-decoration: none;
    transition: background 0.2s ease, border-color 0.2s ease;
  }

  .lecture-nav-back:hover {
    background: #fff;
    border-color: #d0c8b8;
  }

  .lecture-nav-title {
    font-size: 14px;
    color: #5c4f3d;
    font-family: "Noto Serif SC", "Noto Serif", serif;
  }

  .lecture-nav-spacer {
    width: 80px;
  }

  @media (max-width: 640px) {
    .lecture-nav-bar {
      padding: 12px 16px;
    }
    .lecture-nav-spacer {
      display: none;
    }
  }
</style>
```

- [ ] **步骤 2：确认文件内容**

```bash
cat public/lectures/retro-aesthetics/nav-bar.html | head -5
```

预期输出：`<div class="lecture-nav-bar">`

- [ ] **步骤 3：Commit**

```bash
git add public/lectures/retro-aesthetics/nav-bar.html
git commit -m "feat: add shared lecture navigation bar fragment"
```

---

## 任务 3：编写并运行注入脚本

**文件：**
- 创建：`scripts/inject-lecture-nav.js`
- 修改：`public/lectures/retro-aesthetics/lecture-guide-block*.html`

- [ ] **步骤 1：编写注入脚本**

```javascript
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, extname } from 'node:path';

const targetDir = 'public/lectures/retro-aesthetics';
const navPath = join(targetDir, 'nav-bar.html');
const navFragment = readFileSync(navPath, 'utf-8');

const files = readdirSync(targetDir).filter(
  (file) => extname(file).toLowerCase() === '.html' && file !== 'nav-bar.html'
);

let injectedCount = 0;

for (const file of files) {
  const filePath = join(targetDir, file);
  let html = readFileSync(filePath, 'utf-8');

  // 跳过已注入的页面
  if (html.includes('lecture-nav-bar')) {
    console.log(`skip ${file}: already injected`);
    continue;
  }

  const bodyOpenIndex = html.toLowerCase().indexOf('<body>');
  if (bodyOpenIndex === -1) {
    console.warn(`skip ${file}: no <body> tag found`);
    continue;
  }

  const insertIndex = bodyOpenIndex + '<body>'.length;
  html = html.slice(0, insertIndex) + '\n' + navFragment + '\n' + html.slice(insertIndex);

  writeFileSync(filePath, html, 'utf-8');
  injectedCount++;
  console.log(`injected ${file}`);
}

console.log(`done: ${injectedCount} file(s) injected`);
```

- [ ] **步骤 2：运行脚本注入导航条**

```bash
node scripts/inject-lecture-nav.js
```

预期输出：

```text
injected lecture-guide-block1.html
...
injected lecture-guide-block10.html
done: 10 file(s) injected
```

- [ ] **步骤 3：验证导航条已插入**

```bash
grep -l "lecture-nav-bar" public/lectures/retro-aesthetics/lecture-guide-block*.html | wc -l
```

预期输出：`10`

- [ ] **步骤 4：再次运行脚本验证幂等性**

```bash
node scripts/inject-lecture-nav.js
```

预期输出：10 行 `skip lecture-guide-blockN.html: already injected`

- [ ] **步骤 5：Commit**

```bash
git add scripts/inject-lecture-nav.js public/lectures/retro-aesthetics/lecture-guide-block*.html
git commit -m "feat: inject navigation bar into all lecture pages"
```

---

## 任务 4：扩展文章 schema 支持外部链接

**文件：**
- 修改：`src/content.config.ts`

- [ ] **步骤 1：在 articles schema 中添加 externalUrl 字段**

找到 `articles` schema，在 `cover` 字段后添加：

```typescript
externalUrl: z.string().optional(),
```

修改后的 articles schema 应类似：

```typescript
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.enum(['AI', '设计', '艺术', '岩土工程', '碎碎念']),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    cover: z.string().optional(),
    externalUrl: z.string().optional(),
  }),
});
```

- [ ] **步骤 2：验证 TypeScript 无错误**

```bash
npx astro check
```

预期：无 schema 相关错误。

- [ ] **步骤 3：Commit**

```bash
git add src/content.config.ts
git commit -m "feat: add externalUrl field to articles schema"
```

---

## 任务 5：创建博客入口文章

**文件：**
- 创建：`src/content/articles/retro-aesthetics.md`

- [ ] **步骤 1：创建入口文章**

```markdown
---
title: "AI特论 · 逆行之美学"
description: "十讲系列：从 LLM 现状、技术爆发，到文化反弹与手工情感的回归。"
date: 2026-06-15
category: "艺术"
tags: ["AI美学", "讲座", "HTML"]
featured: true
cover: "/images/retro-aesthetics-cover.jpg"
externalUrl: "/lectures/retro-aesthetics/lecture-guide-block1.html"
---

《逆行之美学》HTML 讲座系列，共十块，探讨生成式 AI 时代的技术现状与文化反应。
```

- [ ] **步骤 2：确认 frontmatter 被识别**

```bash
npx astro sync
```

预期：成功完成，无错误。

- [ ] **步骤 3：Commit**

```bash
git add src/content/articles/retro-aesthetics.md
git commit -m "feat: add retro-aesthetics lecture entry article"
```

---

## 任务 6：修改 ContentCard 支持 externalUrl

**文件：**
- 修改：`src/components/ContentCard.astro`

- [ ] **步骤 1：在 Props 中添加 externalUrl**

在 `interface Props` 中 `href` 后添加：

```typescript
externalUrl?: string;
```

在解构赋值中：

```typescript
const {
  title,
  description,
  date,
  category,
  tags = [],
  featured = false,
  href,
  externalUrl,
  cover,
} = Astro.props;
```

- [ ] **步骤 2：使用 externalUrl 作为链接目标**

将 `<a href={href} ...>` 改为：

```astro
<a
  href={externalUrl || href}
  ...
>
```

保留其他 class 和属性不变。`externalUrl` 指向同一站点下的静态页面，不需要在新标签页打开。

- [ ] **步骤 3：验证组件语法**

```bash
npx astro check
```

预期：无类型错误。

- [ ] **步骤 4：Commit**

```bash
git add src/components/ContentCard.astro
git commit -m "feat: support externalUrl in ContentCard"
```

---

## 任务 7：修改 CardGrid 传递 externalUrl

**文件：**
- 修改：`src/components/CardGrid.astro`

- [ ] **步骤 1：从 item 数据中提取 externalUrl**

在 `ContentCard` 调用处添加 `externalUrl`：

```astro
<ContentCard
  title={data.title}
  description={data.description}
  date={data.date}
  category={data.category}
  tags={data.tags}
  featured={data.featured}
  href={item.collection === 'random' ? '/random' : `/${item.collection}/${item.id}`}
  externalUrl={data.externalUrl}
  cover={data.cover}
/>
```

- [ ] **步骤 2：验证 TypeScript 无错误**

```bash
npx astro check
```

预期：无错误。

- [ ] **步骤 3：Commit**

```bash
git add src/components/CardGrid.astro
git commit -m "feat: pass externalUrl from CardGrid to ContentCard"
```

---

## 任务 8：本地验证集成

**文件：**
- 无新增/修改

- [ ] **步骤 1：启动开发服务器**

```bash
npm run dev
```

预期：服务器启动，输出本地 URL，例如 `http://localhost:4321`。

- [ ] **步骤 2：访问博客文章列表**

在浏览器中打开 `http://localhost:4321/articles`。

预期：
- 页面中显示“AI特论 · 逆行之美学”卡片。
- 卡片封面、标题、简介、标签、日期正确。

- [ ] **步骤 3：点击卡片进入 HTML 系列**

点击“AI特论 · 逆行之美学”卡片。

预期：
- 浏览器地址栏变为 `http://localhost:4321/lectures/retro-aesthetics/lecture-guide-block1.html`。
- 页面顶部显示浅米色导航条，左侧有“← 回博客”按钮，中间显示“逆行之美学”。

- [ ] **步骤 4：验证返回博客按钮**

点击“← 回博客”。

预期：页面跳转回 `http://localhost:4321/`。

- [ ] **步骤 5：验证系列内分页**

返回第 1 页，点击“下一块 →”。

预期：跳转到 `lecture-guide-block2.html`，导航条仍然存在。

- [ ] **步骤 6：停止开发服务器**

按 `Ctrl + C` 停止。

- [ ] **步骤 7：运行生产构建验证**

```bash
npm run build
```

预期：构建成功，无错误。

- [ ] **步骤 8：检查构建产物**

```bash
ls -1 dist/lectures/retro-aesthetics/lecture-guide-block*.html | wc -l
```

预期输出：`10`

- [ ] **步骤 9：Commit（如验证通过）**

```bash
git commit --allow-empty -m "chore: verify retro-aesthetics integration locally"
```

---

## 自检

### 规格覆盖度

| 规格需求 | 覆盖任务 |
|----------|----------|
| HTML 页面放入 `public/lectures/retro-aesthetics/` | 任务 1 |
| 共享导航条片段 | 任务 2 |
| 导航条注入到每个 HTML 页面 | 任务 3 |
| 文章 schema 增加 `externalUrl` | 任务 4 |
| 创建博客入口文章 | 任务 5 |
| 卡片支持外链跳转 | 任务 6、任务 7 |
| 本地验证链接、返回、分页 | 任务 8 |

### 占位符扫描

- 无“待定”、“TODO”。
- 无“添加适当的错误处理”等模糊描述。
- 每个代码步骤包含完整代码。
- 命令包含预期输出。

### 类型一致性

- `externalUrl` 在 schema、ContentCard Props、CardGrid 传递中名称一致。
- `lecture-nav-bar` class 在片段和脚本检查中一致。
