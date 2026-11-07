# 页间 FOLIO

虚构独立刊物，以真正的报刊阅读组织替代通用营销首屏。设计读法：面向愿意深入阅读的中文读者，采用黑白印刷、克制橙色和多栏编排。DESIGN_VARIANCE 6 / MOTION_INTENSITY 2 / VISUAL_DENSITY 6。原生 CSS 编辑设计，不宣称使用外部设计系统。

## 页面

- 首页：大幅 FOLIO 报头；编者信、中心主文、右侧目次形成不等宽三栏；短文支持关键词搜索、主题筛选、清除筛选和原生 details 展开全文。
- 长文：原创概念散文，五节正文；正文目录锚点与标准/大字阅读切换。桌面目录粘性定位，手机移至正文上方。
- 编辑部：刊物立场、编辑角色、内容来源约定与演示联系邮箱。

## 视觉与可访问性

固定浅色主题，所有 CSS 限定于 `.kit-journal`。底色 `--fo-bg`、正文 `--fo-ink`、辅助文字 `--fo-muted` 与唯一橙色强调集中在 CSS 变量。中文宋体与西文 Palatino/Iowan 构成刊物字形；不依赖远程字体或平台主题。正文保留适当行宽与两倍左右行高。栏线与双线报头是印刷语言，不用圆角卡片。320px 起响应式；焦点明显；每页一个 h1/main，三个页面导航具有 aria-current；筛选结果和复制状态可被读屏读取。

## 内容与资产

全部文案、文章、资源路径在 `content.ts`；阅读布局与交互在 `Template.tsx`。文章均为本模板原创概念写作，不含真实采访或伪造新闻人物。摄影仅作空间参考，页脚与长文结尾明确标示。资源为 `/assets/library.jpg` 与 `/assets/workspace.jpg`；具体摄影来源随项目 SOURCES.md 分发。

## 交互与交付

搜索匹配标题、摘要与正文；分类筛选可以叠加搜索；无结果提供清楚说明。目录链接定位实际章节。字号按钮修改正文尺寸并报告按下状态。复制邮箱成功/失败都有状态文字；`.example` 邮箱仅作演示。无外部数据接口或发送行为。打包固定收集 Template.tsx、content.ts、theme.css、DESIGN.md 和共享类型。

## 参考

- CSS 多栏构图使用原生 Grid：https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout
- 原生展开正文：https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details
- 动态结果提示：https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html
