# 九套模板扩展验证

日期：2026-11-07（北京时间）。本次从三套扩展到九套模板，新增构间、拾器、序列、海岸、错位和橙场，每套三个完整页面。平台当前共 27 个模板页面与 9 个详情页面。

## 构建与自动化

Windows / Node.js 24.11.0，Next.js 16.4.5，React 19.3.1。未在 Node.js 20.9 运行时实测。

| 检查 | 结果 |
| --- | --- |
| `npm test` | 16 项通过，0 项失败 |
| `npm run typecheck` | 通过；最终生产构建也完成了 TypeScript 检查 |
| `npm run build` | 通过，生成 44 个预渲染条目，包含系统页和图标 |
| 六个新 ZIP 独立安装与构建 | 全部通过；海报最后一次无障碍修正后另行重建通过 |
| 新下载包与独立构建目录比较 | 文件一致；允许 JSON 格式与键顺序不同，但要求解析后的配置值一致 |

新增测试覆盖目录、注册表与源文件夹一致性，以及所有九套模板的完整导出、素材包含、预览源码一致性、三个页面在独立与平台两种路径下的导航与主标题。初次接入前记录了 7 项预期失败；最终 16 项通过。测试代码见 [kits.test.mjs](../tests/kits.test.mjs)，实际输出见 [tests.txt](evidence/expansion/tests.txt)。

独立构建不是仅对平台构建结果的推断：六个 ZIP 分别解压到独立目录、安装依赖并运行 `npm run build`。打包核对结果与各项目构建 ID 见 [summary.json](evidence/expansion/summary.json)。

## 浏览器结果

- 本地生产地址：`http://127.0.0.1:3000`。
- 九套模板的首页、项目、关于与平台详情页，在 1440px 和 390px 两种视口完成 **72 次路由检查**：HTTP 200、每页一个 H1、无横向页面溢出，预览页无损坏图片。
- 新六套的 **36 个预览页面/视口组合**执行 axe 的 WCAG 2 A/AA 与 WCAG 2.1 A/AA 标签检查。修正后所选自动检查未报告违规。
- 实际目录显示九套模板，三个分类各三套；中文「陶艺」和英文「tideline」搜索匹配正确。
- 新模板收藏在刷新后恢复，收藏筛选与 URL 同步。
- 六个详情页均实际切换为 390px 手机预览，并在 iframe 内打开项目与关于页面。
- 六个新增 ZIP 均通过实际浏览器下载；下载文件 SHA-256 与服务器上的对应文件一致。
- 六套演示邮箱的复制按钮均实际运行，复制内容与页面显示一致。
- 上述生产路由检查与交互检查的浏览器错误记录均为 0。

路由结果见 [production-routes.json](evidence/expansion/production-routes.json)，交互结果见 [flows.json](evidence/expansion/flows.json)，新增页面最终无障碍及布局记录见 [new-routes.json](evidence/expansion/new-routes.json)。这些是开发时实际执行的浏览器检查；`npm test` 不会自动重放浏览器流程。

所有新增封面都由真实预览页面截图生成。检查了六套桌面构图和手机首屏，修复了海报标题在手机上将「有形」拆开的断行问题。

## 已修正问题

- 海岸局部浅蓝灰背景上的辅助文字对比度不足：统一调整 muted 色值为 `#4b6770`。
- 错位橙底文字与浅底橙字对比度不足：分别增加深蓝叠印色和深橙文字色。
- 错位海报链接的名称与可见文字不一致：让拆行字母组成完整单词，并为图版各段提供一致的文字边界和名称。
- 错位手机标题断行不完整：两段标题保持完整独立的行。
- 下载设计说明包含开发机器路径：改为 README、AGENTS、SOURCES 和独立项目中的可用路径。

独立源码审查未发现其他需要修复的代码问题。审查者没有运行浏览器或构建，以上运行结果来自主任务的实际验证。

## 边界与来源

本次验证为本地 Chromium 检查，没有进行公网部署、全浏览器兼容性验证或真实用户审美对比。axe 未报告违规不等于完整的 WCAG 人工验收。本次没有重新测量 Lighthouse 性能分数，初版的性能数字不作为扩展版的测量结果。

收藏与反馈仍只保存在浏览器本地；反馈没有发送到服务器。素材、品牌与项目演示说明见 [SOURCES.md](../SOURCES.md)。完整运行方法与九套模板目录见 [README.md](../README.md)。

方法参考：[Playwright](https://playwright.dev/docs/intro)、[axe-core](https://github.com/dequelabs/axe-core)、[WCAG 文字对比度](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)。产品与审美参考仍为 [StyleKit](https://www.stylekit.top/zh/styles) 和 [美叶](https://meiye.art/)，未将实现结果表述为审美优于参考网站。
