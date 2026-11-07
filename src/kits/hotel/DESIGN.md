# 栖泊 HAVEN

面向喜欢独立旅行与安静空间的人，以精品旅宿图册为方向。满幅蓝调傍晚摄影与 HAVEN 叠字建立首屏；冷灰绿页面、宽间距与错位照片延续空间感。设计参数：DESIGN_VARIANCE 8 / MOTION_INTENSITY 3 / VISUAL_DENSITY 3。

## 构图与主题

- 首页：满幅泳池摄影、巨幅品牌叠字、下方标题与入口；居中理念、错位双照片图册、水岸目的地段落。
- 房间页：双房型选择、照片与房间说明、可计算晚数的概念预算、入住节奏与原生折叠问答。
- 关于页：居中目的地提案、宽幅海面照片、理念与空间愿景。
- 固定浅色主题，所有规则作用于 `.kit-hotel`。色值与间距在 `theme.css` 的 `--hv-*` 变量集中维护。
- 标题使用原生无衬线中文字体；Georgia 仅用于旅宿传统字牌风格的英文品牌与预算数字。未加载远程字体。
- 叠图文字由深色渐变遮罩承托；页面正文、辅助文字与控件均使用实色深绿文字。

## 交互与内容

- 选择庭院大床房或日光套房后，同步更换照片、介绍、配置、单晚价及合计。
- 晚数为 1–7 晚的原生选择器。合计只计算房型示例单晚价 × 晚数，动态结果由 `role="status"` 宣告。
- 价格是明确标记的概念数据，不提交预订、支付或其他请求。
- 联系按钮只复制 `stay@haven.example`；剪贴板失败时提示手动复制，邮箱始终可选择。
- 所有文案、房型数据、价格与素材描述集中在 `content.ts`。替换为真实旅宿时必须核实配置、价格与图片授权。

## 无障碍与响应

每页一个主标题和正文地标，三页导航有当前页状态。按钮、选择器与折叠问答使用原生语义，含跳转正文链接、可见焦点和减少动态设置。图片保留尺寸以减少布局跳动。1440px 展开图册，768px 保留紧凑双列，767px 以下将详情纵向排列；390px 以下预算改为单列，320px 保留全部导航与控件。

## 来源

布局、概念品牌与示例文案为本模板创作。使用本地 `hotel-room.jpg`、`hotel-pool.jpg`、`interior.jpg`、`coast.jpg`，摄影来源与许可见交付包 `SOURCES.md`。照片为图库空间参考，不表示自有酒店或设施。实现使用 React `useState` 与标准 HTML `select`、`details`，参见 [React](https://react.dev/reference/react/useState)、[MDN select](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/select)、[MDN details](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details)。
