export const content = {
  brand: "栈点", wordmark: "STACK", email: "hello@stack.example",
  nav: { home: "概览", project: "项目", about: "关于", contact: "联系" },
  accessibility: { skip: "跳至内容", home: "[s] STACK 栈点 首页", navigation: "主导航", files: "选择阅读文件", reader: "交互文件阅读器", search: "搜索演示笔记" },
  home: {
    label: "设计理解力 × 工程执行力", title: ["把复杂，", "写得清楚。"], intro: "以开发者的方式拆解问题，用设计的方式交付体验。", action: "查看项目", secondary: "关于栈点",
    projectTitle: "把资料，变成线索。", projectBody: "一个关于信息整理的自主概念：按标题与标签，找到需要的那一条。", projectName: "轻量知识索引", projectType: "自主概念 / 前端交互", projectAction: "查看项目",
    practiceTitle: "代码之外，还有交付。", practiceIntro: "把结构、交互和边界一起想清楚。", practice: [
      { key: "interface", title: "界面实现", detail: "从内容层级到组件状态，让界面在不同屏幕上保持清楚。", technology: "React / TypeScript / CSS" },
      { key: "structure", title: "信息组织", detail: "用明确的数据形状与命名，为后续维护留出空间。", technology: "Content model / Typed data" },
      { key: "experience", title: "交互细节", detail: "输入、反馈、空状态与键盘操作，都属于完整的功能。", technology: "Semantic HTML / Accessibility" },
      { key: "handoff", title: "可用交付", detail: "记录运行方式、修改位置和当前限制，让下一次接手更顺利。", technology: "Documentation / Review" },
    ],
  },
  reader: {
    path: "stack / workspace", title: "文件阅读器", directory: "EXPLORER", branch: "个人工作目录", copy: "复制文件", copied: "当前文件内容已复制。", fallback: "无法自动复制，可选中文件内容手动复制。", hint: "选择左侧文件，阅读思路与实现。", lineLabel: "行", previewLabel: "只读预览",
    files: [
      { name: "README.md", kind: "MD", lines: ["# 栈点 / STACK", "", "把复杂的问题，拆成清楚的步骤。", "", "## 工作方式", "理解内容 → 建立结构 → 实现交互", "", "## 这份作品集", "一个虚构开发者的自主概念展示。", "界面、代码与说明，一起交付。", "", "打开 index.ts，看看搜索逻辑。"] },
      { name: "index.ts", kind: "TS", lines: ["type Note = {", "  title: string;", "  tags: string[];", "};", "", "export function findNotes(", "  notes: Note[], query: string", ") {", "  const term = query.trim().toLocaleLowerCase('zh-CN');", "  return notes.filter(note =>", "    [note.title, ...note.tags]", "      .join(' ')", "      .toLocaleLowerCase('zh-CN')", "      .includes(term)", "  );", "}"] },
      { name: "review.md", kind: "MD", lines: ["# 交付前的检查", "", "[ ] 标题能够说清楚页面内容", "[ ] 键盘可以访问全部交互", "[ ] 搜索没有结果时给出说明", "[ ] 图片有明确的替代文本", "[ ] 小屏幕没有横向溢出", "[ ] 联系方式标明演示用途", "", "检查清单是工作方法示例，", "并非本项目的测试结果声明。"] },
    ],
  },
  project: {
    label: "projects / knowledge-index", title: ["一份资料，", "有迹可循。"], intro: "轻量知识索引：将分散的资料整理为可浏览、可搜索的笔记。一个前端交互概念。",
    facts: [{ label: "项目性质", value: "自主概念" }, { label: "关注范围", value: "信息结构与检索" }, { label: "实现材料", value: "React / TypeScript" }],
    problemTitle: "不是存得更多，是找得回来。", problemBody: "当笔记混在不同的位置，搜索前往往要先想起它存在哪里。这个概念把标题、摘要和标签放在同一处，让每条资料都留下一条可识别的线索。",
    demoTitle: "试着找一条线索。", demoBody: "输入标题或标签中的关键词。搜索直接作用于下方演示数据，不会发送请求。",
    searchLabel: "按标题或标签搜索", searchPlaceholder: "试试「交互」或「React」", clear: "清空搜索", resultLabel: "条笔记", emptyTitle: "还没有找到这条线索。", emptyBody: "换一个标题关键词或标签，或清空搜索查看全部笔记。", noteLabel: "本地演示数据",
    notes: [
      { title: "把交互状态写完整", description: "从默认、输入到空结果，为每一步提供清楚反馈。", tags: ["交互", "React"], kind: "开发笔记" },
      { title: "让内容决定组件结构", description: "先整理信息层级，再选择组件边界和页面布局。", tags: ["设计", "内容结构"], kind: "方法记录" },
      { title: "键盘也是一种阅读方式", description: "沿着焦点顺序走一遍，发现鼠标操作容易忽略的问题。", tags: ["无障碍", "交互"], kind: "检查记录" },
      { title: "交付之后，仍然能读懂", description: "明确配置入口、运行步骤与限制，降低后续修改成本。", tags: ["文档", "维护"], kind: "开发笔记" },
    ],
    decisionsTitle: "几项明确的取舍。", decisions: [
      { title: "用最小的数据结构开始", text: "每条笔记只保留标题、摘要、标签和类型。标题与标签参与搜索，摘要负责帮助判断内容是否相关。" },
      { title: "输入之后，直接给出结果", text: "演示数据很小，使用本地筛选即可。清空输入返回完整列表，无结果时保留原输入并提供恢复入口。" },
      { title: "把当前边界写出来", text: "这份原型不包含编辑、账户、持久化或全文搜索。接入真实内容前，需要补充数据来源和权限设计。" },
    ],
    implementationTitle: "实现，保持可读。", implementationBody: "核心筛选逻辑只处理标题与标签。文件阅读器保留实现片段与交付思路，方便对照。",
    closingTitle: "清楚的起点，才能继续。", closingBody: "概念项目的价值，是把问题和边界一起呈现。这里展示的是可操作的本地原型，不代表已经上线的客户产品。", back: "回到概览",
  },
  about: {
    label: "about / profile.md", title: ["写代码，", "也设计交付。"], intro: "栈点是一位虚构开发者的作品集角色，关注清楚的结构、耐用的界面与可以接手的工作成果。",
    storyTitle: "好的实现，始于理解。", story: ["我喜欢在开始写代码之前，把问题再问具体一点：谁会用它？最重要的内容是什么？什么情况下会出错？", "这些问题会变成组件的边界、状态的名称和页面里的提示。它们让设计有依据，也让技术选择有上下文。"],
    methodTitle: "从问题到交付。", method: [
      { number: "01", title: "读懂问题", text: "整理场景、目标与约束，写下这次工作的范围。" },
      { number: "02", title: "搭起结构", text: "先明确内容模型和阅读顺序，再进入视觉和组件实现。" },
      { number: "03", title: "跑通细节", text: "把小屏、键盘、空结果和错误反馈带进同一轮检查。" },
      { number: "04", title: "留下说明", text: "交付运行方式、配置入口与当前限制，方便继续迭代。" },
    ],
    toolboxTitle: "常用的思考工具。", toolbox: ["语义化 HTML", "CSS Grid", "React 状态", "TypeScript 类型", "浏览器检查", "清楚的文档"], toolboxBody: "工具会变化。把信息讲清楚、把边界说完整的习惯，可以一直留下。",
    note: "本页描述的是作品集模板的角色与方法，不构成真实个人履历、工作经历或技能认证。",
  },
  images: { workspace: { src: "/assets/workspace.jpg", alt: "浅色木质桌面上的银色笔记本电脑，屏幕为深色", caption: "从一个清楚的问题开始。" } },
  contact: { prompt: "下一件值得认真做的事。", title: "一起，把它写清楚。", label: "演示联系邮箱", copy: "复制演示邮箱", copied: "演示邮箱已复制。", fallback: "无法自动复制，请选中上方邮箱手动复制。", note: "栈点 STACK 为虚构开发者，所有项目与联系信息仅作模板演示。", closing: "END OF FILE" },
} as const;
