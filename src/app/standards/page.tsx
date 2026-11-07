import { SiteShell } from "@/components/SiteShell";
export const metadata = { title: "设计标准" };
const standards = [
  { title: "先有性格，再有样式", text: "每套模板需要有明确的内容对象和视觉方向。版式、字体、图像与交互共同构成表达；换一个主色，不足以成为另一套模板。" },
  { title: "预览就是交付", text: "在线演示与下载包使用相同的模板组件。展示完整首页、作品详情和关于页面，让您能看到真实的阅读与导航体验。" },
  { title: "好看，也要能继续改", text: "样式集中为主题变量，导航、按钮和内容结构可复用。设计说明解释这些选择，AI 修改时有可查阅的参照。", href: "https://tailwindcss.com/docs/theme", label: "主题变量的实现依据" },
  { title: "让真实内容参与检验", text: "检查中文长标题、图片比例变化和不同内容长度。模板中的项目是演示，换成您的资料后，仍需检查页面的节奏与层级。" },
  { title: "手机上的体验同样完整", text: "将桌面构图调整为适合手机的顺序与尺寸，保留清晰导航、可读文本和足够大的操作区域。减少动态效果设置也应得到尊重。" },
  { title: "变化可见，评价有据", text: "使用截图与交互检查发现意外变化。视觉测试不会替我们判断好看；设计质量还需要真实用户对比和实际使用反馈。", href: "https://playwright.dev/docs/test-snapshots", label: "了解截图比较" },
];
export default function Standards() { return <SiteShell><main id="main" className="document section-wrap"><div className="document-heading"><p className="eyebrow">设计标准</p><h1>让每一套模板，<br />值得被认真使用。</h1><p>这是形集制作与检查模板的标准。设计质量需要持续验证，也欢迎用真实项目来检验它。</p></div><div className="standards-list">{standards.map(item => <section className="standard-item" key={item.title}><h2>{item.title}</h2><p>{item.text}</p>{item.href && <a href={item.href} target="_blank" rel="noreferrer">{item.label} ↗</a>}</section>)}</div></main></SiteShell>; }
