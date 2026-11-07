# 形集 FORME 验证记录

这是初版三套模板的历史记录。当前九套模板版本的新增验证见 [expansion-verification.md](expansion-verification.md)。

本记录对应 2026-11-06 至 2026-11-07 的本地首版交付。运行环境为 Windows、Node.js 24.11.0、Next.js 16.4.5、React 19.3.1。README 声明的 Node.js 20.9 最低版本未在该版本运行时实测。

## 功能与构建

| 检查 | 结果与范围 |
| --- | --- |
| `npm test` | 6 项通过，0 项失败；中英文搜索、分类与收藏交集、空结果、下载包内容、预览源码一致性、非法模板路径拒绝 |
| `npm run typecheck` | 通过，无 TypeScript 错误 |
| `npm run build` | 通过；生成 20 个预渲染条目，含系统错误页与图标，不能等同于 20 个业务页面 |
| 间野独立下载包 | 解压、安装依赖、独立生产构建通过 |
| 暗场独立下载包 | 解压、安装依赖、独立生产构建通过 |
| 物间独立下载包 | 解压、安装依赖、独立生产构建通过 |

自动化测试源文件为 [catalog.test.mjs](../tests/catalog.test.mjs) 和 [package.test.mjs](../tests/package.test.mjs)。最终测试与类型检查输出保存在 [evidence/tests.txt](evidence/tests.txt) 和 [evidence/typecheck.txt](evidence/typecheck.txt)。首次测试失败阶段的原始日志未保留，本记录不将其作为已核验的交付证据。

三个模板均包含首页、项目详情、关于页面。打包器直接使用 `src/kits/` 中的实际预览组件、内容与 CSS，避免维护第二套下载用页面。交付时再次核对 ZIP 内所有文件与已独立构建目录中的文件：组件、样式、素材等逐字节一致；三份 `tsconfig.json` 只有键顺序及换行差异，解析后的配置值相同。结果见 [evidence/summary.json](evidence/summary.json)。

## 真实浏览器检查

使用 Chromium / Playwright 检查桌面 1440px 与手机 390px 布局，完成 15 条路由 × 2 种视口的 30 次检查：均返回 HTTP 200、每页一个 H1、无横向文档溢出、无已加载图片损坏。这里的路由检查不代表穷尽所有设备、所有交互状态。

以下流程已在浏览器验证：

- 分类与搜索组合筛选、无结果状态恢复。
- 收藏保存、刷新后恢复，以及 URL 导航与收藏视图同步。
- 详情页桌面/手机预览切换、iframe 内的项目页面导航。
- 实际下载 ZIP；三个生产下载地址均返回 HTTP 200。
- 反馈本地保存、刷新恢复、JSON 导出内容匹配；修改字段后旧导出状态失效。
- 手机导航菜单、平台主题切换、手机模板缩略图的可见键盘焦点。
- 最终生产首页检查中未出现浏览器控制台错误。

间野模板的在线预览与独立项目在相同视口截图比较：通道差值大于 8 的像素为 0；精确差异仅位于滚动条边缘的一列。该结果支持这一模板在本次环境中的显示一致性，不表示所有浏览器逐像素一致。

交互检查为本次开发时实际执行的浏览器流程；随项目保存的 `npm test` 仅运行上表列出的 6 项自动化测试，不会自动重放这些浏览器流程。

## Lighthouse

审计工具版本为 Lighthouse 13.6.0，对象为本地生产首页 `http://127.0.0.1:3000/`，采用桌面配置。

| 审计轮次 | 结果 |
| --- | --- |
| 2026-11-06 23:51（北京时间），完整审计 | Performance 99，Accessibility 96，Best Practices 100，SEO 100；LCP 0.9 秒、CLS 0、TBT 0 毫秒 |
| 2026-11-06 23:59（北京时间），无障碍专项复查 | Accessibility 100，无失败的自动检查项 |

两轮之间修复了色板元素的语义角色与标志链接的可访问名称。性能、最佳实践与 SEO 分数来自第一轮，未将其描述为最后一轮重新测得的结果。审计摘要含准确时间及设置，见 [evidence/summary.json](evidence/summary.json)。

本地实验室分数不代表公网真实用户性能，也不等于完整 WCAG 合规或人工可访问性验收。自动化分数无法判断页面是否好看。

## 审查修正

独立源码审查发现的问题已完成以下修正，并由主任务作相应核验：

- 间野页脚小字对比度不足：将 muted 色值调整为 `#596559`，在页脚底色上约为 4.79:1，在页面底色上约为 5.35:1。
- 收藏视图与 URL 状态不同步：修复导航后的状态更新。
- 反馈刷新后不恢复、修改字段后仍可导出旧值：修复读取、校验与状态失效逻辑。
- 手机缩略图焦点被裁切：在外层容器提供可见焦点轮廓。
- 测试命令依赖 TypeScript 原生加载与 shell 通配符：显式注册 `tsx`，并列出两个测试文件；最终 Windows / Node 24 测试通过。

独立审查为源码审查，没有被记作第二次浏览器测试或第二次构建验证。

## 交付范围与限制

这是可运行的本地版本，尚未部署公网。收藏与反馈存储于当前浏览器；反馈不会发送到服务器。平台暂以免费试用呈现，正式模板授权、品牌名称及域名尚未定稿。

三套示例工作室和案例均为虚构演示。摄影、字体和图标的来源见 [SOURCES.md](../SOURCES.md)。未进行目标用户盲测、付费意愿验证或与 StyleKit / 美叶的审美质量对比，因此不作优于参考网站的结论。设计规范能给后续 AI 修改提供约束，但不能保证模型永远遵守或完全消除风格变化。

## 依据

- 产品范围：[design.md](design.md)。
- 项目实现与复现方法：[README.md](../README.md)、[打包器](../scripts/package-kits.mjs)。
- 本地实测结果：[evidence/summary.json](evidence/summary.json)、[测试输出](evidence/tests.txt)、[类型检查输出](evidence/typecheck.txt)。
- 对比度标准：[WCAG 2.2 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)。
- 审计方法说明：[Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/)、[Playwright screenshots](https://playwright.dev/docs/test-snapshots)。
- 产品参考及素材地址：[SOURCES.md](../SOURCES.md)。
