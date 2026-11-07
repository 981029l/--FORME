# FORME 主站展馆改版

用户选择方案 A：让主站成为创意展馆，并将不断增长的模板目录移至独立页面。保留现有 24 套模板、72 个模板页面和独立下载方式。

## 路由与操作

- `/`：六件精选作品。上一件/下一件、缩略图、左右方向键和横向拖动切换；模板库和分类入口连接完整目录。
- `/templates`：每页 12 套；中英文搜索、分类、收藏、精选/最近加入/名称排序。`q`、`category`、`sort`、`page`、`view` 同步到 URL。
- 快速预览：卡片底部打开弹层，内含一个真实 iframe；桌面和手机尺寸切换，支持关闭按钮、背景点击和 Escape。关闭后焦点返回打开按钮。
- `/templates/[slug]`：在详情页切换三个模板页面；可打开独立完整预览、下载源码。从目录进入的详情保留安全的本地返回地址，返回后恢复目录条件和位置。
- 旧的 `/#collection` 与 `/?view=favorites#collection` 自动转入新目录。

收藏使用原有 `forme-favorites` 本地存储；目录位置使用 sessionStorage。无后端或账户同步。导航、详情、指南、设计标准、来源和反馈使用统一主站外壳。

## 视觉与实现

保留 FORME 字标、Manrope 字体和浅黄绿强调色。大字号中文引导、深色作品展台、相邻作品侧影、编号索引构成首页。目录使用侧栏分类和规则网格：1600px 起四列，701–1599px 三列，700px 及以下两列。

GSAP 时间线编排图像、英文作品名和介绍切换；通过 `@gsap/react` 管理组件生命周期。没有自动轮播，跟随系统减少动态效果设置，纵向触摸保留原生滚动。主站新增样式限定在 `.site-shell` 或组件作用域内。各套模板仍使用原来的独立实现，GSAP 不加入它们的下载依赖。

选品、动效和文案在 `src/content/showroom.ts`，目录配置在 `src/content/catalog.ts`，共享导航在 `src/config/site.ts`。浏览器端预览始终使用 `src/kits/` 的真实组件。

## 来源

- [Framer Marketplace](https://www.framer.com/marketplace/templates/)：实际查看搜索、分类、排序与翻页，参考目录组织。
- [Webflow Templates](https://webflow.com/templates)：实际查看精选、新模板与完整目录入口，参考策展与检索的分工。
- [GSAP Timeline](https://gsap.com/docs/v3/GSAP/gsap.timeline()/)：动画序列与重叠控制。
- [GSAP React](https://gsap.com/resources/React/)：作用域与生命周期清理。
- 完整图片、字体和已有模板参考见 [SOURCES.md](../SOURCES.md)。本次展馆使用项目已有的真实模板截图。

这些参考说明设计与技术依据，不证明审美或转化率优于参考站。

## 验收

2026-11-07（Asia/Shanghai），在本机 Chrome/Chromium 与生产服务 `http://127.0.0.1:3000` 实测；记录起始时间 `2026-11-06T20:45:17.268Z`（UTC）。

| 检查 | 结果 | 证据 |
|---|---|---|
| 筛选、URL、目录注册、独立源码与导出 | 56 项通过，0 失败 | [测试日志](evidence/showroom-tests.txt) |
| 生产构建与 TypeScript | 通过，生成 105 个静态条目 | [构建日志](evidence/showroom-build.txt) |
| 页面布局与自动可访问性 | 34 个页面/尺寸/主题组合全部通过 | [页面记录](evidence/showroom-pages.json) |
| 搜索、收藏、分页、预览、导航与返回位置 | 34 项通过 | [交互记录](evidence/showroom-flows.json) |
| 展馆动效、触摸、宽屏、弹层与旧模板路由 | 30 项通过 | [补充记录](evidence/showroom-extra.json) |
| 原有模板完整性 | 104 个模板源文件与改版前备份逐字节一致 | [模板与下载验证](evidence/showroom-downloads.json) |
| 24 个独立 ZIP | 生产下载 HTTP 200；CRC、源码字节一致；均未添加 GSAP | [模板与下载验证](evidence/showroom-downloads.json) |

页面检查覆盖展馆、目录、模板详情、指南、标准、来源与反馈，在 1440、768、390、320px 宽度下检查状态码、唯一 h1/main、横向溢出、图片加载和 axe 的 WCAG A/AA 规则；补充检查 1440/390px 深色模式。最终均无规则命中。1920px 目录为四列，单一搜索结果仍从左侧开始。快速预览另在 1440/390/320px 验证布局及 axe。自动规则检查不等同于完整的可访问性审查。

实际操作覆盖六件选品、首尾循环、连续九次切换、键盘、鼠标拖动、动画中途离开、运行中切换减少动态设置，以及原生触摸事件驱动的横划与纵向滚动。目录验证中文和英文搜索、与分类及收藏的交集、排序、空结果、刷新、清除、页码归位；弹层验证单 iframe、设备尺寸、背景关闭、Escape（包括 iframe 内焦点）、焦点还原。详情返回和浏览器后退均恢复了 URL 与原滚动位置，实测样例为 1007px → 1007px。

本轮修复了手机收藏入口被旧样式隐藏、显示标签与朗读名称不一致，以及减少动态设置切回时重复播放已完成动画的问题。手机搜索字号提高到 16px。查看了最终桌面、手机、深色和弹层截图。原模板的源文件未改动，另抽查了回映、漫游、纵深的全部三个预览路由。

本次触摸为 Chromium 模拟，未在实体手机和 Safari 上实测；独立模板没有重新逐套安装构建，本次验证了全部 ZIP 内容和下载，之前版本的独立构建记录仍保留在各模板验收文档中。

复现脚本：[页面](evidence/showroom-pages.cjs)、[目录流程](evidence/showroom-flows.cjs)、[展馆与补充](evidence/showroom-extra.cjs)。脚本保存的是本机验收环境，其他机器运行需调整项目、Chrome 和 axe 路径。`FORME_BASE` 可指定服务地址。JSON 中的 `height` 为页面滚动高度。

截图：[桌面展馆](evidence/showroom-home-1440-light.png)、[手机展馆](evidence/showroom-home-390-light.png)、[桌面目录](evidence/showroom-templates-1440-light.png)、[手机目录](evidence/showroom-templates-390-light.png)、[快速预览](evidence/showroom-quick-1440.png)。
