# 物间 OBJECT

物间是虚构的独立设计工作室，“生长的形状”为自主概念演示。不包含真实客户委托、原创摄影或获奖宣称；上线时只加入能够核验的实际信息。

## 视觉系统

浅黄绿底色搭配炭黑，照片保留色彩，形成自然观察与几何排版的关系。颜色、边距、字体和动效速度集中定义于 `.kit-experimental`。中文标题粗细适中，英文 OBJECT 以大尺度字标提供识别。设计参数：变化 8、动态 4、密度 3。

原生 CSS 八向标记属于品牌图形，不承担按钮或状态含义，已对读屏隐藏。主图使用单角裁切，作品组合错位排列，关于页用横向工作方法条目代替等宽功能卡片。图像始终承担主要叙事。

## 页面与内容

- `Template.tsx` 支持首页、项目详情、关于页；`basePath` 为空时用于独立项目。
- 在 `content.ts` 统一替换品牌、中文文案、演示邮箱、图片路径与替代文字。
- 详情页从观察问题、形式提取到视觉应用完整说明概念项目。
- 联系按钮只复制 `.example` 演示邮箱，具有复制成功或失败的可访问状态提示，不发送数据。

## 修改边界

保留 `.kit-experimental` CSS 作用域与单一黄绿/炭黑系统，不继承平台的主题。禁止加入渐变、装饰性数据指标或虚构客户。主要页面宽度不依赖固定像素，760px 以下显式重排为单列。保留图片尺寸、键盘焦点与减少动态支持。

## 依据与素材

- 源项目规格：`docs/design.md`。
- 模板产品与视觉质量参考：https://www.stylekit.top/zh/templates 、 https://meiye.art/
- CSS 裁切：https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path
- Clipboard API：https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText
- 使用 `leaves.jpg`、`architecture.jpg`、`interior.jpg`，来源与授权见交付包素材说明。模板布局与代码为本项目原创。
