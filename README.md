# 形集 FORME

一个以作品集与创意展示为起点的精品网站模板库。包含形集平台和二十四套独立模板。每套均有三个完整页面，涵盖首页、详情或工作区、关于或设置，支持在线预览和完整源码 ZIP 下载。

| 模板 | 适用方向 | 视觉特点 |
| --- | --- | --- |
| 间野 FIELDWORK | 空间与创意工作室 | 自然色、留白与编辑排版 |
| 暗场 NOIR | 摄影与影像展览 | 暗色画布与大幅影像 |
| 物间 OBJECT | 独立平面设计 | 黄绿色与大胆文字构图 |
| 构间 MONO | 建筑事务所 | 石墨细线、图版与项目索引 |
| 拾器 TERRE | 陶艺手作 | 陶土色、衬线与器物图版 |
| 序列 CHAPTER | 时尚影像与艺术指导 | 杂志刊头、酒红色与人像编排 |
| 海岸 TIDELINE | 旅行与自然摄影 | 海蓝色、地平线与旅记 |
| 错位 OFFSET | 平面海报与字体实验 | 钴蓝、原生图形与错位排字 |
| 橙场 ORBIT | 工业产品与家具设计 | 银灰、橙色与技术图版 |
| 流序 RELAY | 科技产品与协作工具 | 浅青产品界面与可操作的工作流 |
| 慢调 SLOWBAR | 咖啡与餐饮品牌 | 砖红复古招贴与风味菜单 |
| 噪点 OFFBEAT | 音乐企划与现场活动 | 洋红海报与可切换的活动编排 |
| 青屿 VERDANT | 植物生活与花园工作室 | 薄荷绿、植物近景与曲线构图 |
| 栈点 STACK | 开发者与技术作品集 | 炭黑琥珀终端与文件阅读器 |
| 观物 MUSE | 文化展馆与独立展览 | 朱红、中文衬线与策展目录 |
| 栖泊 HAVEN | 精品旅宿与度假空间 | 满幅酒店摄影与房型图册 |
| 衡量 GAUGE | 运营与数据工作台 | 蓝灰侧栏、联动统计与可筛选表格 |
| 页间 FOLIO | 独立刊物与内容出版 | 黑白报刊、多栏与专题长文 |
| 余息 EASE | 轻运动与生活工作室 | 粉杏色海报与课程编排 |
| 跳格 HOP | 创意工具与趣味作品集 | 高对比色块与可编辑像素画 |
| 一课 LESSON | 在线课程与学习工具 | 紫色课程书架与章节阅读区 |
| 回映 REEL | 电影、音乐与创意影像档案 | 真实三维光盘、金属翻面与斜向浏览 |
| 漫游 RAMBLE | 创意工作室与插画作品集 | 原创手绘台灯、游走小人与互动标记 |
| 纵深 DEPTH | 创意作品与品牌空间展 | 六章节完整空间穿梭、立体排字与项目索引 |

## 开始运行

项目名称为「形集 FORME」，包标识为 `forme`。本机项目目录为 `D:\形集-FORME`。

需要 Node.js 20.9 或更新版本。本次实际验证使用 Node.js 24.11.0。

```sh
npm install
npm run build
npm start
```

打开 http://127.0.0.1:3000 。开发时运行 `npm run dev`。构建会自动更新全部模板下载包和从真实 CSS 提取的配色数据。若只需要重新生成下载包，运行 `node scripts/package-kits.mjs`。

## 已实现

- `/` 为创意展馆：首页精选六套作品，支持按钮、键盘方向键和横向拖动；GSAP 编排切换动画，跟随系统减少动态效果设置，无自动轮播。
- `/templates` 为独立模板库：中英文搜索、分类、收藏、排序与每页 12 套分页；筛选状态保存在 URL，可复制、刷新或返回继续浏览。
- 模板目录按顺序等宽排列：1600px 起四列、701–1599px 三列、700px 及以下两列；单个搜索结果和收藏筛选同样从左侧开始。
- 模板卡片提供快速预览弹层，可切换桌面/手机、进入详情、打开完整预览或下载。详情页内可预览各套的三个页面，返回时恢复目录筛选与浏览位置。
- 搜索栏支持一键清除与 Esc 清空，清除后保持输入焦点；搜索与收藏控件适配浅色、深色和手机布局。
- 本地收藏，以及与 URL 同步的收藏视图。
- 系统、浅色、深色主题；手机导航菜单。
- 二十四套完整模板，各含三个页面，共 72 个模板页面；桌面与手机交互预览。
- 第三批提供房型预算、数据筛选与 CSV 导出、刊物字号切换、课表筛选、像素绘画与 PNG 导出，以及课程章节和本地学习进度；课程进度支持同一浏览器内的标签页同步。
- 与预览共用源码的独立 Next.js 下载包，包含本地素材、字体、README、DESIGN、AGENTS 和来源说明。
- 使用指南、设计标准、素材来源页面。
- 本地反馈保存与 JSON 导出。反馈未发送到服务器。

## 目录

| 路径 | 用途 |
| --- | --- |
| src/config/site.ts | 品牌、导航、分类、存储键与预览尺寸 |
| src/content/templates.ts | 模板介绍与目录数据 |
| src/content/showroom.ts / catalog.ts | 展馆选品、动效参数、分页与目录文案 |
| src/components/Showroom.tsx / Catalog.tsx | 展馆与独立模板库 |
| src/content/palettes.json | 构建时从每套 theme.css 自动生成，不手动维护 |
| src/app/tokens.css | 平台主题、字体与通用设计变量 |
| src/kits/ | 二十四套独立模板的组件、内容、CSS、设计规范及组件注册表 |
| src/app/preview/ | 使用真实模板组件的预览路由 |
| scripts/package-kits.mjs | 从原始模板构建独立 ZIP |
| public/downloads/ | 构建生成的模板下载包 |
| public/previews/ | 在真实浏览器中截取的模板首页缩略图 |
| SOURCES.md | 实际参考链接、图片地址、字体与图标来源 |
| docs/ | 需求、实现计划和检查结果 |

## 改模板和扩展目录

先改 `src/kits/{slug}/content.ts` 中的内容和素材路径；设计变量位于相应 `theme.css`，页面复用 `Template.tsx`。每套模板 CSS 有独立根作用域，平台主题不会改变模板的品牌视觉。

新增一套模板时，遵守 `src/kits/types.ts` 的 `TemplateProps` 契约，提供 `Template.tsx`、`content.ts`、`theme.css` 与 `DESIGN.md`；登记模板介绍，在 `src/kits/registry.ts` 注册组件，并在 `KitRenderer.tsx` 导入该套 CSS。根 CSS 的 `--前缀-bg`、`--前缀-ink`、`--前缀-muted` 是目录色板的唯一来源。重新截取真实首页预览图后运行构建。注册表、目录数据和文件夹的一致性由自动化测试检查。额外的本地 .ts/.tsx/.css 组件会随模板一起打包；可选 dependencies.json 分别列出 dependencies 和 devDependencies 名称，版本必须存在于平台 package.json 的对应字段。回映通过这一声明携带 Three.js，其他模板不增加该依赖。漫游使用 Canvas 原创绘图，纵深使用 CSS 透视和滚动镜头，两者不新增平台依赖；漫游独立包通过声明携带现有的 Phosphor 图标库。

## 验证

```sh
npm test
npm run typecheck
npm run build
```

测试覆盖筛选交集、搜索、空结果、目录注册、所有模板的下载包完整性、源码一致性、三页导航和素材打包，以及非法路径校验。首版记录见 `docs/verification.md`，九套扩展版记录见 `docs/expansion-verification.md`。第二批六种风格扩展及交互说明见 `docs/variety-expansion.md`。第三批构图与应用场景扩展见 `docs/spectrum-expansion.md`。回映的参考复刻范围、交互与验收见 `docs/reel-recreation.md`。漫游和纵深两套方案 A 的范围、操作和验收见 `docs/interactive-duo.md`。自动化结果不等同于审美优于竞品的证据，真实用户对比仍待开展。

主站展馆改版的操作、来源与本轮生产验证见 [showroom-redesign.md](docs/showroom-redesign.md)。

## 发布前需要明确

当前是可运行的本地版本，尚未部署公网。反馈目前只在浏览器本地保存；公开收集反馈需要配置接收服务。模板暂按免费本地试用展示，正式模板授权条款、品牌名称、域名及素材使用由维护者在发布前确认。所有演示工作室与案例均为虚构，联系按钮只复制明确标注的演示地址。

## 来源

完整清单见 [SOURCES.md](SOURCES.md)。产品形式参考 [StyleKit](https://www.stylekit.top/zh/styles)，审美与内容呈现参考 [美叶](https://meiye.art/)。新版主站的策展与目录分工参考 [Framer Marketplace](https://www.framer.com/marketplace/templates/) 和 [Webflow Templates](https://webflow.com/templates)，范围和操作见 [主站改版记录](docs/showroom-redesign.md)。模板与平台代码为本项目新编写，未复制参考网站源码。
