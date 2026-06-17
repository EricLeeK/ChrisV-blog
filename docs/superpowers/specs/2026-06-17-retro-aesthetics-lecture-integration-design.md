# 逆行之美学讲座系列集成设计

## 目标

将 `/Users/chrisv/Media_factory/逆行美学讲座-HTML/` 下的 10 页 HTML 讲解页面集成到 Astro 个人博客中，并在每页顶部添加返回博客的导航条。

## 关键决策

| 决策项 | 用户选择 | 说明 |
|--------|----------|------|
| 返回目标 | 博客主页 `/` | 通用、安全 |
| 导航条风格 | 沿用博客主题 | 用户一眼识别为博客导航 |
| 导航条位置 | 顶部通栏 | 结构清晰，像应用内导航 |
| 导航条信息 | 只显示系列名称 | 简洁，不抢内容风头 |
| 主题适配 | 保持浅色，与 HTML 页面统一 | HTML 页面本身是浅米色纸张风格 |
| 导航条样式 | 实底浅米色条 | 与页面纸张色系统一，边界清晰 |

## 整体架构

```
public/
  lectures/
    retro-aesthetics/
      nav-bar.html                 # 共享导航条片段
      lecture-guide-block1.html    # 注入导航条后的完整页面
      lecture-guide-block2.html
      ...
      lecture-guide-block10.html

src/
  content/
    articles/
      retro-aesthetics.md          # 博客入口卡片
  content.config.ts                # 增加 externalUrl 字段
  components/
    ContentCard.astro              # 支持 externalUrl 跳转
    CardGrid.astro                 # 同上
```

## 数据流

1. 用户访问 `/articles` 或首页 → 看到 `retro-aesthetics.md` 渲染的卡片。
2. 点击卡片 → 跳转到 `/lectures/retro-aesthetics/lecture-guide-block1.html`。
3. HTML 页面顶部显示浅色返回条 → 点击“回博客”回到 `/`。
4. 系列内部的“上一块 / 下一块”分页链接保持原样工作。

## URL 设计

| 页面 | URL |
|------|-----|
| 博客入口卡片 | `/articles` 或 `/` |
| 系列第一页 | `/lectures/retro-aesthetics/lecture-guide-block1.html` |
| 系列第 N 页 | `/lectures/retro-aesthetics/lecture-guide-blockN.html` |

## 数据模型变更

在 `src/content.config.ts` 的 `articles` schema 中增加可选字段：

```typescript
externalUrl: z.string().optional(),
```

当文章存在 `externalUrl` 时，文章卡片直接链接到该地址，而不是默认的 `/articles/[slug]`。

## 导航条设计

### 视觉

- 位置：页面最顶部，通栏。
- 背景：`#efeadd`（浅米色，与页面纸张色系一致）。
- 底边：`1px solid #e0d8c8`。
- 高度：约 56px（含 padding）。
- 内容：左侧“← 回博客”按钮，中间系列名称“逆行之美学”，右侧留白保持居中平衡。

### HTML 结构

```html
<div class="lecture-nav-bar">
  <a href="/" class="lecture-nav-back">← 回博客</a>
  <span class="lecture-nav-title">逆行之美学</span>
  <span class="lecture-nav-spacer"></span>
</div>
```

### CSS

```css
.lecture-nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 24px;
  background: #efeadd;
  border-bottom: 1px solid #e0d8c8;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif;
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
  width: 80px; /* 与按钮宽度大致相同，保持标题居中 */
}

@media (max-width: 640px) {
  .lecture-nav-bar {
    padding: 12px 16px;
  }
  .lecture-nav-spacer {
    display: none;
  }
}
```

## 注入方式

由于 HTML 页面已有完整 `<html>`、`<head>`、`<body>` 结构，导航条将直接插入到每个文件的 `<body>` 开头。

为避免手动修改 10 个文件出错，使用一个 Node 脚本自动注入：

1. 读取 `nav-bar.html` 片段。
2. 遍历 `lecture-guide-block1.html` ~ `lecture-guide-block10.html`。
3. 在每个文件的第一个 `<body>` 标签后插入导航条片段。
4. 写回文件。

脚本只执行插入操作，不改动页面其他内容。

## 文件改动清单

### 新增文件

- `public/lectures/retro-aesthetics/`
  - `nav-bar.html`
  - `lecture-guide-block1.html` ~ `lecture-guide-block10.html`
- `src/content/articles/retro-aesthetics.md`
- `scripts/inject-lecture-nav.js`（可选，用于注入导航条）

### 修改文件

- `src/content.config.ts`
  - 在 `articles` schema 中增加 `externalUrl: z.string().optional()`。
- `src/components/ContentCard.astro`
  - 支持 `externalUrl` 属性，优先使用外部链接。
- `src/components/CardGrid.astro`
  - 将 `externalUrl` 传递给 `ContentCard`。

## 实现注意事项

1. **HTML 页面 viewport**：原页面使用 `width=1200`，在移动设备上不会自适应。本次集成不改此设置，保持原有排版。
2. **链接路径**：`lecture-guide-blockN.html` 内部的相对链接（如 `lecture-guide-block2.html`）在复制到 `public/lectures/retro-aesthetics/` 后仍然有效。
3. **深色模式**：导航条保持浅色，不跟随博客深色模式，因为 HTML 页面整体是浅色纸张风格。
4. **SEO**：HTML 页面作为静态文件，搜索引擎仍可正常抓取。
5. **可扩展性**：未来新增系列时，可复用相同的 `externalUrl` 字段和注入脚本。

## 未决问题

- 入口文章的封面图需要用户提供，或暂时使用占位图。
