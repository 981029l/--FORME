# 纵深 DEPTH

## 参考范围与原创内容

用户指定的 [71three / Latest work](https://71three.com/latest-work) 是空间推进、层叠设备、摄影过场与浅色至深色转场的 UI 参考。参考范围包括整个滚动旅程，而非只做开场。品牌、文案、页面代码、设备结构、屏幕排版和六份项目提案均为本项目原创；不使用参考站的客户作品、摄影、人物抠图、商标、字体或源代码。

六个项目是明确标识的虚构概念，不能改成未经证实的客户案例、采访、奖项或业务结果。摄影使用项目已有本地 Unsplash 资源；原始 URL、许可和字体出处在 SOURCES.md。页面展示图库中的人物、建筑或房间，不代表演示工作室创造或拥有这些实物。

## 视觉语法

- 近白 `#f7f7f4`、墨黑 `#0f1113`、灰色 `#616466` 为基础；赤陶海报、海水与摄影颜色由对应章节提供。颜色不用于重复的营销卡片。
- 使用本地 Manrope，中文回退 PingFang SC / Microsoft YaHei。宽幅无衬线文字、非对称设备与有真实远近关系的照片是主角；导航保持小而清楚。
- 首页包含抵达、构形、潮汐、人物、入夜、未完六幕。首幕的手机拥有独立背板、金属边缘、屏幕与原创概念内容；其余章节由摄影、海报、文字和轨道组成，全部在同一透视世界中。
- 普通滚动推动相机沿 Z 轴前进。每幕间隔 1800 个世界单位，单独图层有额外纵深与角度；近处物体逐渐越过视口，下一幕从远处进入。不要替换为六张普通卡片的淡入。
- 摄影过场使用海面背板衔接海水场景；第四幕以后逐渐转入深色，并连续接到可正常浏览的作品目录。

## 文件与可调参数

- `content.ts`：品牌、导航文案、项目资料、摄影地址、设备屏幕内容、章节和相机配置。
- `Scene.tsx`：独立的 CSS 3D 空间、原创设备、原生滚动映射、相机阻尼和六幕静态回退。
- `Template.tsx`：首页目录、项目详情、关于与邮箱复制。
- `theme.css`：全部样式限制在 `.kit-depth` 内。三项主要色板保持 `--dp-bg`、`--dp-ink`、`--dp-muted` 的字面十六进制值，供下载工具读取。

## 操作与完整页面

章节锚点补偿宿主页面的 scroll-padding-top，使平台预览与独立包都能对准同一相机位置。初始化空间布局后重新定位已请求的章节或作品目录锚点，防止服务器静态布局的高度影响详情页返回位置。最后一幕的大标题先淡出，结束语再出现，时机由 content.ts 的 closing 字段集中配置。

首页滚轮、触控、Page Down 或浏览器原生滚动推动旅程，没有劫持 wheel/touch 事件。底部六个章节链接直接跳到测量后的准确相机位置；跳过体验链接到作品目录。作品目录和页脚均可重新体验。所有实际链接、按钮都在 `aria-hidden` 的纯视觉世界之外。

作品页用 `?project=littoral`、`form-study`、`common-ground`、`still-route`、`nocturne`、`open-distance` 选择不同提案；未知值回退第一项。下一件作品依次循环，返回目录保留当前模板路径。三页固定导航始终使用传入的 `basePath`，不依赖平台路由别名。

联系操作只复制 `hello@depth.example`，成功与失败都会显示状态，不发送消息。用户可直接选择邮箱作为剪贴板不可用时的替代方式。

## 可访问性与性能

每页一个 main、一个 h1。首页 h1 是完整语义标题，空间里的巨型标题属于纯视觉内容；静态章节保留六个可阅读 h2。章节导航、作品链接、跳过体验、重播与邮箱复制均可键盘操作，焦点可见。固定主导航与章节控件始终有实色背板。

没有 JavaScript、浏览器不支持 CSS 3D 或开启减少动态效果时，直接展示六幕正常文档流章节、摄影和目录；没有长滚动空白。手机使用更短透视距离、重新布置的画幅和更小的设备，保留原生触摸滚动。

相机与逐帧数值在 useEffect 闭包内运算，React 只在章节变化时更新。requestAnimationFrame 在到达滚动目标、页面隐藏、舞台离开视口时休眠；卸载清理 RAF、监听器、媒体查询、ResizeObserver 与 IntersectionObserver。无需 WebGL、Three.js 或额外依赖，因此不存在 WebGL 初始化失败导致内容消失的路径。

可观测状态位于 `.dp-journey`：`data-renderer` 为 css3d/static/fallback，`data-progress` 为 0—1，`data-camera` 为相机 Z 坐标，`data-chapter` 为当前章节，`data-frames` 为绘制帧数，`data-visible` 为舞台可见状态。纯视觉世界位于 `.dp-camera`，各层使用 `[data-depth]`，每幕使用 `[data-world-chapter]`。

## 实现依据

- [MDN perspective](https://developer.mozilla.org/en-US/docs/Web/CSS/perspective) 与 [transform-style](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-style)：透视投影与保留三维上下文。
- [MDN requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame)：跟随刷新率的阻尼更新与取消。
- [MDN prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)：静态阅读模式。
- [MDN IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) 与 [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)：可见性休眠及正确的滚动距离测量。
- [MDN Clipboard.writeText](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText)：只复制演示联系地址。
