# 优秀博客转存

与文稿、项目、手记并列的独立栏目，地址 `/blog-archive`。存放已翻译好的优秀博客，保留中文配图、作者、来源和原文链接；原作不计作站主原创。

内容入口为 `src/content/blogArchive/*.md`，首页动态读取条目数量，转存也会出现在首页的最新内容中。

每篇使用以下字段：

```yaml
---
title: "中文标题"
description: "中文摘要"
date: 2026-10-27
originalDate: 2026-10-22
category: "主题分类"
tags: ["关键词"]
sourceAuthor: "原作作者"
sourceSite: "原文站点"
sourceUrl: "https://example.com/original"
translator: "ChrisV"
# cover: "/blog-archive/文章标识/cover.jpg"
# htmlFile: "文章标识.html"
# snapshot: "/blog-archive/文章标识/source.html"
---
```

普通内容可以直接在 Markdown 中写译文，二、三级标题自动进入波浪提纲。

已有 HTML 译稿时，把仅含正文的 HTML 片段放进同目录，以 `htmlFile` 指定文件名。正文沿用主站排版，不引入原网站导航、营销页脚与全站 CSS。HTML 标题需要稳定的 id，便于目录跳转；配图放在 `public/blog-archive/文章标识/`，正文使用对应绝对站点路径。

可把完整离线网页放在 `public/blog-archive/文章标识/source.html`，通过 `snapshot` 提供原版存档入口。完整存档与主站阅读版并行保留。

首篇《构建智能体：何时将子智能体并入主智能体循环》已导入中文正文、三张嵌入配图，保存了用户提供的完整 HTML。原作作者 Diane Sarkis，原作日期来自提供的文件；转存日期为加入本站的日期。
