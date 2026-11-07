# 间野 FIELDWORK

间野是虚构的演示工作室；留白之家是概念提案，照片为素材而非已完成客户项目。不添加客户、获奖、履历、营收等未经核实的声明。

## 视觉系统

以暖白、森林绿和自然照片呈现安静的空间叙事。所有主题变量位于 `theme.css` 的 `.kit-editorial`。中文使用系统无衬线，英文展示继承 `--font-display`；无额外字体请求。标题以宽松的两行中文排版，避免装饰性小标签堆叠。

首页采用文字与主图并置、非对称作品组合、工作室陈述三种节奏。详情页具有项目背景、设计方法、图像序列和结论；关于页解释工作方式。图片保持直角，不添加卡片阴影、渐变或浮层标签。设计参数：变化 8、动态 4、密度 3。

## 内容与功能

- 在 `content.ts` 替换品牌、文案、邮箱及图像。公开上线前将所有演示说明替换为真实且可核验的信息。
- `Template.tsx` 接收 `page` 和 `basePath`。只使用普通锚点导航；独立项目传入空字符串即可。
- 联系区只复制 `.example` 演示邮箱，失败时明确提示手动复制。没有发送、订阅或表单后端。
- 图片必须保留有意义的替代文字和宽高属性；首屏图优先加载，其余延迟加载。

## 修改边界

所有选择器必须以 `.kit-editorial` 为作用域。保持暖白背景与森林绿文字，不继承模板库的主题。手机断点 760px，主图、项目详情和联系区改为单列。保留可见键盘焦点与减少动态效果支持。

## 依据与素材

- 项目规格：`docs/design.md`（源项目）。设计为原创模板实现，没有复刻参考网站代码。
- 排版方向参考：https://www.stylekit.top/zh/styles/editorial
- 作品集视觉质量参考：https://meiye.art/
- CSS Grid：https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout
- 动态偏好：https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
- 图片来源与授权见交付包的素材说明。使用 `interior.jpg`、`architecture.jpg`、`forest.jpg`。
