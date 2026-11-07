# 搜索栏局部改进

2026-11-07，针对用户反馈的搜索框外观进行修改。

原控件缺少统一外框，搜索图标在输入框之外；全站焦点规则只围住输入区，产生突出的方形描边。现在图标、输入区和清除按钮放在同一个圆角容器里，聚焦反馈作用于整个容器。收藏改为同高度的图标加文字按钮。

搜索仍支持名称、英文名和标签。增加 Esc 清空，清除后保留输入焦点；中文输入法处于组合输入时，Esc 不触发自定义清空。清除按钮占位固定，出现时不改变搜索栏宽度。手机输入字体为 16px，控件高度 46px。

## 实际验证

- 生产构建通过，包含 TypeScript 检查。
- 在本地生产网站验证中英文搜索、无结果、清除、Esc、输入法组合事件、键盘焦点与收藏筛选。
- 320、390、768、1024、1440px 五种视口无页面横向溢出。
- 检查浅色、深色与聚焦状态截图。
- 搜索控件范围的 axe 所选 WCAG 2 / 2.1 A、AA 自动检查未报告违规；浏览器错误为 0。

这是 Chromium 中的局部检查，不是全站或所有浏览器的完整可访问性认证。结果见 [search-result.json](evidence/search-result.json)，构建输出见 [search-build.txt](evidence/search-build.txt)。

## 依据

- 当前实现：[Catalog.tsx](../src/components/Catalog.tsx)、[globals.css](../src/app/globals.css)、[tokens.css](../src/app/tokens.css)。
- 焦点容器语义：[MDN :focus-within](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-within)。
- 输入标签关联：[MDN label](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label)。
- 浏览器检查：[Playwright](https://playwright.dev/docs/intro)；自动无障碍检查：[axe-core](https://github.com/dequelabs/axe-core)。
