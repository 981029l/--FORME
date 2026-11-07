# 漫游 RAMBLE

## 设计方向

一套完整的原创创意工作室网站，包含漫游首页、点子商店和关于页面。首页是可以参与的手绘广场，不含游戏经济、输赢、支付或账户系统。设计读法：面向创意工作室访客的互动作品集，用纸张、墨线、巨大日常物件与慢行人物表现好奇心。DESIGN_VARIANCE 9 / MOTION_INTENSITY 7 / VISUAL_DENSITY 4。采用原生 CSS 与 React，不模拟任何官方设计系统。

品牌固定为奶油纸背景、深灰黑墨、淡黄色强调。CSS 颜色由 `.kit-doodle` 下的 `--do-*` 变量控制；Canvas 颜色与运行参数集中在 `content.ts` 的 `scene`。纸白与亮度一致的浅黄是同一浅色主题。用户指定纸上黑白手绘风格，因此不做反色夜间模式。按钮使用轻微不规则轮廓与硬边墨色投影；这两点是参考交互语言的明确组成部分。

## 内容和资产

`content.ts` 集中管理品牌、导航、全部主要文案、邮箱、项目资料、人物数量、帧率、像素比和气泡内容。英文品牌为普通系统字体字母做轻微角度变化，中文正文优先系统中文无衬线。继承导出包内的 Manrope 字体作为拉丁正文，不依赖远程字体。手写注释使用本地 Segoe Print / 楷体字体栈，不复制参考站字体。

`Artwork.tsx` 的台灯、铅笔长椅、口袋天气和杯子花园均为本模板原创 SVG 插画。台灯采用多关节轮廓、排线、重描线、平面投影与有限黄色灯光。`Scene.tsx` 的六种小人、花朵及气泡为原创 Canvas 绘图。未使用或下载参考站人物、鞋子、品牌、文本、代码或其他资产。SVG 用于用户明确要求的原创插画，功能图标统一使用已安装的 `@phosphor-icons/react`。

所有品牌与项目都是清楚标记的虚构概念。没有客户墙、交易量、评价或真实业绩。`hello@ramble.example` 是保留的示例域名，复制按钮只写剪贴板，不发送消息。发布前替换 `content.ts` 的品牌资料和邮箱。

## 页面和控制

- `Template({ page, basePath })` 支持 `home`、`project`、`about`。空 `basePath` 可独立运行。每页一个 `main`、一个 `h1`，完整互链导航。
- 首页点击 Canvas 空地或聚焦画布按 Enter 种花。可见“种一朵花”按钮是同等的非画布入口；最多保留 9 朵。花朵吸引附近小人一段时间。
- “今天多热闹”增减按钮分别切换 20、36、54 人，抵达边界禁用对应按钮。
- “歇一会儿 / 接着漫游”或聚焦画布按空格切换动画。“重新开始”清空花朵并重置人物，保留当前人数设置。
- 点子商店提供全部 / 日常物件 / 随手玩玩 / 想象空间筛选，选中作品后更新 `?idea=` 并移动到详情；直接链接支持选定项目。详情可以收起和切换下一件作品。
- 关于页和点子商店页底部提供示例邮箱复制，包含成功与失败状态反馈。

## 动效、性能与降级

连续运动在隔离的 Canvas 叶子组件内完成，不通过 React state 更新帧。帧率上限 30 FPS，像素比上限 1.5，最多 54 人和 9 朵花。静态大插画由 SVG 一次渲染。人物路径、比例和服饰由可复现种子生成，不使用远程媒体、网络 API 或重型 3D 依赖。

`prefers-reduced-motion` 下停止自动运动，展示明确“静态漫游”状态；仍可种花和使用导航。页面不可见或画布离开视口也会停止 RAF，恢复时重置时间戳，避免大步跳跃。组件卸载取消 RAF、断开 ResizeObserver / IntersectionObserver，并移除媒体查询、visibility 与指针监听。无法取得 2D 上下文时保留原创 SVG 和网站全部页面，并显示文本说明。

系统动态偏好由媒体查询 `change` 事件的 `event.matches` 更新本地快照，动画和按钮使用同一次事件的状态；不在 RAF 中重复读取实时 `MediaQueryList.matches`。回归检查需要在同一页面反复切换减少动态效果、验证帧停止与恢复，并确认系统偏好切换不会清除用户主动暂停，暂停时种花仅重绘一次。

移动布局在 768px 以下重排标题、灯具与控件，320px 保留全部导航和操作，允许矮屏纵向滚动。人物与气泡随宽度缩小。所有按钮有可见标签或可访问名称，保留明显焦点。插画是装饰视觉，由附近真实文本承载意义。静态 DOM 在脚本未启用时保留导航、主内容和所有项目。

## 验证接口

- `.do-scene`: `data-frames`、`data-paused`、`data-people`、`data-marks`。
- `.do-home`: `data-density`、`data-marks`。
- `.do-idea-grid`: `data-category`；`.do-idea-card`: `data-idea`。
- `.do-idea-detail`: `data-selected-idea`；详情按钮 `aria-expanded`。
- 可按按钮名称测试种花、人数、暂停、重置、复制；按全部 / 类别名称测试筛选。

## 来源与范围

- 用户选定的视觉和交互参考：[dontlookup.app](https://dontlookup.app/)。仅借鉴纸上黑白轮廓、巨大主体与微型人物的尺度对比、对话气泡和硬边控件；其所有原始图像、文案和代码均未使用。参考图由主任务直接观察。
- 本项目现有集成契约：`src/kits/types.ts`、`src/kits/cinema/Template.tsx`、`tests/kits.test.mjs`、`scripts/package-kits.mjs`。只沿用站内三页接口与导出机制。
- 设计方法参考：本地 `design-taste-frontend/SKILL.md`，根据已明确的手绘需求调整其默认配色、插画和硬阴影规则。
- [Phosphor React](https://github.com/phosphor-icons/react)：功能图标，保留包许可。
- [Manrope](https://github.com/sharanda/manrope)：导出机制随包提供的 OFL 字体，保留 `Manrope-OFL.txt`。

修改视觉或运行参数后检查桌面、320px 手机、减少动态效果、键盘操作和浏览器切换；通过平台构建与导出验证后再发布。功能改动同步根 README 与本文件。
