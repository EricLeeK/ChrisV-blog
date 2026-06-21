# 项目介绍营销化改写实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 基于 9 个 GitHub 仓库的真实代码与功能，将博客项目卡片摘要和详情页正文改写为按项目类型调节营销强度的中文介绍。

**架构：** 保持现有 Astro Content Collections 和 Markdown 页面结构不变，仅修改 `src/content/projects/*.md` 的 frontmatter `description` 与正文。应用型项目采用用户收益导向，开发者工具采用效率与集成导向，科研项目采用问题、方法与实验价值导向。

**技术栈：** Astro 6、Markdown、Astro Content Collections、中文技术文案规范。

---

## 文件结构

- 修改：`src/content/projects/grsai-studio.md` — 图像生成与内容发布工作台介绍。
- 修改：`src/content/projects/toonvocab.md` — 单词学习应用介绍。
- 修改：`src/content/projects/nihongo-study-tutorweb.md` — 日语学习辅导应用介绍。
- 修改：`src/content/projects/v-life.md` — AI 生活管理平台介绍。
- 修改：`src/content/projects/supertt-skills.md` — AI 编程技能库介绍。
- 修改：`src/content/projects/syncrag-skill.md` — 大规模 Agent 技能检索系统介绍。
- 修改：`src/content/projects/auto-opt-pinn.md` — PINN 架构自动搜索研究介绍。
- 修改：`src/content/projects/st-pinn.md` — 时空分解 PINN 研究介绍。
- 修改：`src/content/projects/jax-fem4geo.md` — 可微岩土有限元研究介绍。

### 任务 1：改写应用型项目

- [x] **步骤 1：改写 GrsAI Studio**

在 `src/content/projects/grsai-studio.md` 中体现图片生成、参考图库、任务历史、漫画候选、微信草稿发布和 API 节点故障转移。

- [x] **步骤 2：改写 ToonVocab**

在 `src/content/projects/toonvocab.md` 中体现文章选词、AI 三语加工、发音、收藏、测验、图像记忆和 AVIF 压缩。

- [x] **步骤 3：改写 Nihongo Study TutorWeb**

在 `src/content/projects/nihongo-study-tutorweb.md` 中体现课程目录、词汇语法、SRS、跟读、口试录音与 AI 反馈。

- [x] **步骤 4：改写 V-Life**

在 `src/content/projects/v-life.md` 中体现生活数据聚合、日程、财务、热量、目标、项目、积分激励，以及 AI 面板、CLI 和 MCP 接入。

### 任务 2：改写开发者工具项目

- [x] **步骤 1：改写 SuperTT Skills**

在 `src/content/projects/supertt-skills.md` 中准确说明当前仓库重点是 `tt-vibe-coding-tutor`，突出地图优先、数据流追踪和 AI 辅助实践。

- [x] **步骤 2：改写 SynCRAG Skill**

在 `src/content/projects/syncrag-skill.md` 中体现一次性合成查询、多向量索引、零 Token 运行时、Python API、FastAPI 和 34,396 项技能评测。

### 任务 3：改写科研项目

- [x] **步骤 1：改写 Auto-opt-PINN**

在 `src/content/projects/auto-opt-pinn.md` 中体现 DNN、KAN、Attention 混合基因、遗传搜索、并行评估、缓存与 Burgers 基准。

- [x] **步骤 2：改写 ST-PINN**

在 `src/content/projects/st-pinn.md` 中体现空间系数网络与固定时间基分解、多项式和 Fourier 基、PINNacle 集成及多类 PDE 实验。

- [x] **步骤 3：改写 JAX-FEM4Geo**

在 `src/content/projects/jax-fem4geo.md` 中体现 Drucker–Prager 塑性、顶点正则化、增量有限元、三轴试验和 AD/FD 梯度验证。

### 任务 4：内容与构建验证

- [x] **步骤 1：扫描旧正文**

运行：

```bash
rg -n "尝试让 PINN|一个为图像生成 API|探索如何将 JAX|基于 Gemini API 构建|把时间和空间分开|收集并分享与 AI|一个可插拔的 RAG|用可爱的卡通界面|基于 React \\+ Supabase 的个人生活数据中心" src/content/projects
```

预期：无匹配，确认旧的一句话正文已经全部替换。

- [x] **步骤 2：检查页面篇幅**

运行：

```bash
for f in src/content/projects/*.md; do printf '%s ' "$f"; wc -m < "$f"; done
```

预期：每个文件均显著长于原始版本，正文具备完整介绍结构。

- [x] **步骤 3：运行生产构建**

运行：

```bash
npm run build
```

预期：Astro 构建成功，生成 9 个 `/projects/<slug>/index.html` 页面。

- [x] **步骤 4：检查 Git 差异**

运行：

```bash
git diff --check
git diff --stat
```

预期：无空白错误，差异仅包含规格、计划和 9 个项目 Markdown 文件。
