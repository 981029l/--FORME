# 形集：展馆首页与独立模板库

用户已选择方案 A，授权重构主站展示方式。延续形集字标、近白与墨色、浅黄绿色和自托管 Manrope；方向为面向设计敏感创作者的数字展馆。DESIGN_VARIANCE 8 / MOTION_INTENSITY 7 / VISUAL_DENSITY 4。实测原首页高 5803px（桌面）及 11049px（手机），24 套全量堆叠；基线见 outputs/forme-main-site-audit.md。

## 页面与行为

- `/`：一个可切换的精选展馆。大幅真实模板截图、前后作品边缘、标题和编号、上一件/下一件、缩略图索引；鼠标拖动、触摸横划和键盘方向键等效。GSAP 时间线编排切换，无自动轮播。首屏可进入选中模板详情或独立模板库。首页仅少量分类和使用入口，不渲染全量 24 张卡片。
- `/templates`：独立浏览页，12 套一页。桌面分类侧栏、固定搜索/排序工具栏，手机紧凑两列及水平分类。URL 保存 q/category/sort/page/view，搜索和分类重置页码，非法值安全回退。排序为精选/最新/名称。收藏继续使用已有 localStorage 键。支持空结果、清空、分页。
- 快速预览：原生模态 dialog，唯一激活 iframe，可切桌面/手机，关闭/Escape 恢复触发按钮焦点；支持完整预览、详情和下载。
- 详情保持 `/templates/[slug]`，返回目录保留查询与滚动位置；增加首页/项目/关于的预览页面切换。现有 `/preview/*` 与 ZIP 内容保持模板自身独立。
- 全局外壳：新导航“展馆 / 模板库 / 使用指南 / 设计标准”，更新收藏地址；指南、标准、来源、反馈与详情共享新的排字、间距和外壳。旧 `/#collection` 与 `/?view=favorites#collection` 在浏览器中兼容转到模板库。

## 实现边界

GSAP 与 @gsap/react 只用于主站。主站新样式在 `.site-shell`、`.showroom`、`.library`、`.quick-preview` 等范围内，保留模板样式和根 scroll-padding 行为。不同时加载 24 个 iframe，不使用远程字体，不新增后端。

业务常量放在 site.ts 和各功能内容配置，主题继续使用 CSS tokens。组件卸载清理动画；减少动态设置下直接切换。首屏、内容与按钮在初始 HTML 中可见，增强不以 JS 动画为可见前提。所有图片用本地已记录来源的真实模板截图。

## 集成契约

- 首页组件 `Showroom`：`src/components/Showroom.tsx`，命名导出，无参数；自带局部样式导入。主任务在 Home 的 SiteShell/main 内使用。
- 目录组件 `Catalog`：保持现有命名导出；内部渲染目录标题与内容，主任务在 `/templates` 的 SiteShell/main/Suspense 内使用。
- `CatalogBackLink`：`src/components/CatalogBackLink.tsx`，无参数命名导出，主任务放进详情 Suspense；负责安全解析目录来源及恢复入口。
- 目录返回默认 `/templates`；详情允许 `?from=`，仅接受同源 `/templates` 路径及其查询，外部/协议相对路径丢弃。
- 主任务负责 site.ts、外壳、路由、详情预览、平台样式、文档与集成验收。并行组件任务不得编辑上述共享文件。

## 验收

核心测试：筛选交集、排序稳定性、非法页码、URL 往返与不信任返回路径。浏览器检查 1440/768/390/320px，浅/深色、减少动态、中文长标题、无横溢出。人工看展馆首屏、选中切换和手机布局。操作验证筛选/分页/收藏/预览焦点/页面切换/返回位置/旧链接。抽查原互动模板的滚动和下载；49 项现有测试保持通过，新增有意义的状态测试。构建、ZIP 字节与 CRC 验证后更新完整源码包。

## 来源

- https://www.framer.com/marketplace/templates/：分类、搜索、排序与分页组织参考。
- https://webflow.com/templates：精选、新模板及分类入口参考。
- https://gsap.com/docs/v3/GSAP/gsap.timeline()/：时间线编排。
- https://gsap.com/resources/React/：React 中作用域与清理。

视觉构图为本项目原创，不复制参考网站素材或源码。
