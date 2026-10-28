---
name: ChrisV
description: 统一主站环境中的编辑式内容与独立书信排版
colors:
  primary-main: "#96603c"
  canvas: "#faf8f3"
  ink: "#302d27"
  ink-muted: "#736c60"
  border: "#ded9cf"
  paper: "#fffdf8"
  wash: "#f0ece3"
  primary-main-dark: "#d5aa82"
  canvas-dark: "#1b1c1c"
  ink-dark: "#e6e1d6"
  ink-muted-dark: "#aaa69b"
  border-dark: "#3e403d"
  paper-dark: "#252624"
  wash-dark: "#30312e"
typography:
  display:
    fontFamily: "Fraunces, Huiwen-mincho, Noto Serif SC, Songti SC, SimSun, serif"
    fontSize: "clamp(44px, 5.5vw, 68px)"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-.025em"
  headline:
    fontFamily: "Fraunces, Huiwen-mincho, Noto Serif SC, Songti SC, SimSun, serif"
    fontSize: "clamp(36px, 4.5vw, 56px)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-.025em"
  title:
    fontFamily: "var(--font-system)"
    fontSize: "21px"
    fontWeight: 550
    lineHeight: 1.55
    letterSpacing: "-.02em"
  body:
    fontFamily: "var(--font-system)"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 2
  letter-body:
    fontFamily: "Songti SC, Noto Serif SC, STSong, serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 2.15
  label:
    fontFamily: "var(--font-system)"
    fontSize: "12px"
    fontWeight: 400
rounded:
  reading-small: "3px"
  reading-control: "4px"
  reading-content: "5px"
spacing:
  compact: "8px"
  control: "12px"
  toolbar: "16px"
  content: "24px"
  row-gap: "28px"
  row: "32px"
components:
  reading-button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.reading-content}"
    padding: "10px 18px"
  reading-button-secondary:
    textColor: "{colors.ink}"
    rounded: "{rounded.reading-content}"
    padding: "10px 18px"
  reading-view-selected:
    backgroundColor: "{colors.wash}"
    textColor: "{colors.ink}"
    rounded: "{rounded.reading-control}"
    width: "38px"
    height: "38px"
  reading-search:
    textColor: "{colors.ink}"
    padding: "10px 2px"
  note-paper:
    backgroundColor: "{colors.paper}"
    padding: "46px 62px 30px"
---

# Design System: ChrisV

“优秀博客转存”与文稿、项目、手记同级，沿用编辑式列表和长文阅读版式。首页入口为四列，手机为两列；转译详情在标题下说明原作作者、站点、日期与译者，提供原文及完整 HTML 存档入口。中文配图按正文顺序保留，使用统一正文宽度和波浪目录，不引入来源网站的全站导航、营销页脚或 CSS。

## Overview

**Creative North Star: "同一张工作台上的文稿与书信"**

本文件记录已实现的主站统一视觉： 首页、文稿、项目、资源、关于和手记共享底色、墨色、容器、导航与页脚。ChrisV 名称、真实头像和既有展示字体保留；[Ricoui 参考](themes/ricoui/DESIGN.md) 是历史来源，当前规则以本文件和实际源码为准。

共享颜色由 [global.css](src/styles/global.css) 定义，[reading.css](src/styles/reading.css) 的阅读变量引用这组全局颜色，[site.css](src/styles/site.css) 承接首页、关于、资源及公共布局。主站默认使用这一环境；文稿和项目以平面列表与正文组织信息，手记在相同背景上保留独立纸张材料。

**Key Characteristics:**

- 全站使用暖中性色底、少量棕色交互强调和完整深浅色对应。
- 展示字保留汇文明朝体的中文性格，阅读正文依内容类型分工。
- 内容入口保持平面、细线和小封面；信纸用叠层与柔影表达纸张，目录波浪响应真实滚动。

## Colors

主站使用统一的暖中性色；彩色头像和封面保留内容自己的色彩。

### Primary

- **暖棕强调色**：`primary-main` 用于链接悬停、选中分类、阅读进度、目录轨迹与当前标记、首字和展开入口。深色主题使用对应的浅棕色。

### Neutral

- **底色与墨色**：`canvas` 与 `ink` 是页面和正文的成对变量，源码对应 `--color-999` 与 `--color-0`。
- **次级文字与细线**：`ink-muted` 服务日期、说明和标签，源码对应 `--color-300`；`border` 服务分隔线、表格和目录轨道。
- **信纸与浅底**：`paper` 对应 `--color-100`，区分信纸表面；`wash` 对应 `--color-200`，用于选中视图、行内代码和表头。
- 每个共享颜色都具有 `-dark` 对应值；根元素的 `theme-dark` 类切换颜色，角色和层级保持一致。

**The Shared Canvas Rule.** 主站各页面使用同一组底色、墨色、细线与强调色；页面类型通过内容结构和材料区分，不另起背景体系。

## Typography

**Display Font:** Fraunces / 汇文明朝体，后备为 Noto Serif SC、Songti SC、SimSun、serif；继承当前全局展示字体栈。

**Body Font:** 主站界面、文稿、项目和关于正文使用全局 `--font-system` 系统无衬线栈；手记正文使用 Songti SC / Noto Serif SC / STSong / serif。

**Label/Mono Font:** 日期、标签和工具栏使用系统栈；代码继承全局 `--font-mono`。

### Hierarchy

- **Display**：首页使用 frontmatter 的展示级，移动端（≤700px）为（44px）；通用页面和列表标题使用 headline，移动端为（38px）。
- **Headline**：文稿与项目详情标题为（clamp(30px, 3.6vw, 46px) / 1.42 / 500）；手记标题为（clamp(28px, 3vw, 38px) / 1.55），移动端为（28px）。首页区块、资源分组及资源标题使用（22–28px）的响应式层级。
- **Title**：列表条目使用 frontmatter 的标题级；移动端紧凑列表为（18px / 1.6），网格为（16px）。
- **Body**：正文通常为（16–18px）；文稿和项目采用 frontmatter 的正文级，移动端为（16px / 1.95），关于正文为（17px / 2），移动端（16px）；手记采用独立正文级，移动端为（17px / 2.1）。
- **Label**：日期、说明、导航和工具栏采用（11–15px）的小字层级；目录百分比与少数移动元信息为（10px）。这些是已实现的功能分工，不要求所有文字收敛成固定的四步字阶；正文不会继承元信息的小字号。

**The Two Reading Voices Rule.** 文稿和项目正文使用无衬线，手记正文使用衬线；两种正文不因共享 Markdown 来源而统一成一种排版。

## Layout

主站容器居中，导航与页面内容共用（min(1080px, 100% − 80px)）；≤700px 时左右各留（20px）。主要间距使用 frontmatter 中的重复步长，但源码也按内容关系使用非等步长，不强制套入八点网格。

首页以介绍和作者入口开篇，后接三列内容入口、复用的近期内容行与手记摘要。关于页为作者侧栏与最大（680px）的双语正文，资源页为分类侧栏和链接行。≤900px 收紧侧栏与间距，≤700px 将介绍、关于与资源组改为单列；三类首页入口继续横向并列。

文稿与项目默认紧凑列表：日期、正文、小封面分列；无封面时保留对齐。网格视图桌面三列，≤700px 两列。移动端日期移至整行，搜索框独占一行，其余筛选保留原生选择控件。

详情正文最大列宽为（760px）；有目录时右侧配（200px）目录列与（64px）间隔。≤1000px 改为居中单列，并以正文前的原生折叠目录承接导航。桌面目录固定在（top: 114px），正文锚点为固定导航预留滚动位置。

手记首页最大宽度为（930px），独立详情为（890px）；信纸内边距由桌面的（46px 62px 30px）变为移动端的（28px 24px 24px）。全站导航在≤700px分为品牌、主题切换一行和完整链接一行。

## Elevation & Depth

主站以纯色底、细线与留白分组，不再铺设旧主题照片背景。共享导航使用接近实色的底色透明层（.94）与模糊（12px），滚动时保持内容与导航的层级。

信纸使用真实的低角度叠层与柔影：主纸张（`0 12px 36px -18px rgb(41 30 17 / .25)`），表层细影（`0 2px 6px rgb(41 30 17 / .06)`）。后层轻微旋转（桌面1deg、移动端.65deg）。这是纸张原生材料表现，不是硬偏移阴影。

**The Material Depth Rule.** 内容列表和公共页面保持平面；叠层与投影承担信纸的材料表达，不推广为所有容器的默认外观。

## Shapes

信纸为直角纸面，后层有细线轮廓。小封面与视图按钮使用轻圆角，详情封面、项目入口与代码块使用内容圆角；半径见 frontmatter。分类采用下划线状态，正文标签采用直接文字链接。首页入口和资源行以细线分组；圆形头像、主题开关和线性 SVG 图标维持共同形状语言。

## Components

### Buttons

项目与讲义入口为紧凑矩形文字按钮；主操作使用墨色底、反白文字，次操作使用细线边框。悬停转为强调色；主站链接、按钮、输入框、选择框和目录 summary 均有（2px）强调色键盘焦点轮廓，偏移（5px）。

### Inputs / Fields

搜索字段透明、无独立卡片背景，与筛选共同处于上下细线之间。标签、排序及手记标签筛选保留原生 select。列表／网格按钮以浅底与文字颜色表示选中；分类用强调色文字和下划线表示选中，状态由 `aria-pressed` 提供。

### Navigation

共享导航保留头像、名称、现有入口和主题切换，当前页面文字加重，移动端增加下划线。导航与正文使用同一容器；页脚以细线封口，桌面左右排布版权与短句，移动端纵向排列。详情顶部有返回入口，底部有相邻内容或继续阅读入口。

### Reading Outline

目录收录正文的二、三级标题。文字旁的（32px）SVG 轨道用细线表示章节范围，强调色轨迹和圆点表示当前位置，标题行显示正文百分比，当前章节以强调色和字重区分并提供 `aria-current`。

滚动为局部波浪注入能量，圆点以弹簧运动趋近章节间的阅读位置；波浪集中在圆点附近，停滚后衰减并收直，空闲不持续逐帧刷新。目录隐藏或页面进入后台时停止，减少动态效果偏好直接更新位置并保持直线。桌面使用右侧固定目录，≤1000px复用同一组件进入原生 details；章节链接始终保持原生锚点跳转。

### Editorial Entry

首页近期内容、文稿和项目列表复用同一内容行。日期使用等宽数字；标题和摘要构成主链接，小封面是内容辅助。摘要最多两行，分类和阅读类型／时长降为次级信息。悬停让标题与小箭头响应；箭头轻移（2px），过渡为（180ms ease-out）。正文标签为 `#标签` 文本链接。资源使用同样的细线关系，改为标题、说明、真实域名和外链图标。

### Longform

二至四级标题建立正文层级；段落、列表、引用、代码和表格均有独立排版。代码支持复制，表格放入可键盘聚焦的横向滚动区域。顶部细进度条只表达当前正文的滚动进度。减少动态效果偏好关闭过渡、动画和平滑滚动，目录位置仍可读取。

### Note Paper

日期与期数位于纸面顶端，标题后接衬线正文，落款向右对齐。署名继承既有 Fraunces 字体，以斜体表现作者签名，不扩展成新字体规范。首页预览和独立详情共用纸张组件；预览末端渐隐并提供展开链接，完整正文在详情可读。天气、心情和封面只在内容实际提供时出现。

## Do's and Don'ts

### Do:

- **Do** 让首页、关于、资源与内容页面共享同一底色、颜色角色、容器和公共组件，同时保留两种正文分工。
- **Do** 保留真实封面、Markdown 内容和已有功能入口；通过日期、标题、目录和链接表达阅读关系。
- **Do** 同步维护深浅主题与移动端布局，并保留明确的焦点和选中状态。
- **Do** 让目录波浪关联真实阅读位置，停滚后收敛，减少动态效果时保留静态位置反馈。

### Don't:

- **Don't** 为主站页面另起旧照片背景或独立配色；信纸的材料差异由纸面自身表达。
- **Don't** 给没有对应内容的条目补造封面、心情、天气、阅读量或评论。
- **Don't** 将页面引导短句、装饰性小字或旧主题示例里的 eyebrow 当作新页面必须继承的标题层级。

## 封面完整性

封面按原图比例显示，不使用固定高度或 16:10 等其他容器比例裁剪。紧凑列表仅限制宽度，高度自适应；网格和详情同样保持原图比例。绝大多数封面约为 16:9，博客转存中的特殊宽图也应完整保留。封面不使用会裁掉边缘的悬停放大。
