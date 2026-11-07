export const content = {
  brand: "物间", wordmark: "OBJECT", email: "hello@object.example",
  nav: { home: "作品", project: "项目详情", about: "我们", contact: "聊聊想法" },
  home: { eyebrow: "独立设计实践", title: ["换个角度，", "重新看见。"], intro: "在物与物之间，找到新的关系。品牌、图像，以及一点有趣的偏差。", action: "打开作品", feature: "生长的形状", featureType: "自然观察 × 视觉实验", featureBody: "从一片叶子的纹理出发，让自然的秩序成为一套鲜活的视觉语言。", viewProject: "查看完整实验", detailCaption: "结构、节奏、重复。灵感藏在每一次靠近里。", statement: ["认真观察。", "大胆玩一下。"], statementBody: "好的想法往往诞生于意料之外。我们让清晰的策略与自由的实验一起发生，把日常事物变成值得记住的表达。", about: "关于物间" },
  project: { label: "自主视觉实验", title: ["生长的", "形状。"], intro: "把自然的秩序，翻译成设计的语言。", facts: [{ label: "项目类型", value: "概念视觉系统" }, { label: "探索范围", value: "艺术指导 / 版式 / 图像编辑" }, { label: "核心线索", value: "有机形态与几何节奏" }], question: "一片叶子，\n能长成什么？", questionBody: "我们放大叶片的线条与重复关系，再将这种结构放进建筑与日常空间。这个概念项目探索同一种视觉规律如何跨越不同的物体。", sectionTitle: "提取，不复制。", sectionBody: "从自然中提取节奏，而不是照搬形状。黄绿与炭黑构成稳定的底色，不规则裁切与明确的网格保留实验的自由。", captions: ["自然的线条，成为构图的起点。", "建筑的几何结构，为自由的图像建立边界。", "日常空间也可以成为视觉实验的现场。"], conclusion: "让熟悉的东西，\n产生新的连接。", note: "本项目是虚构工作室的自主概念演示。摄影素材用于视觉研究，不代表原创摄影或真实客户委托。", back: "回到作品" },
  about: { label: "关于物间", title: ["有想法。", "也有章法。"], intro: "物间是一间虚构的独立设计工作室。这份作品集，记录我们对日常、图像和形式关系的好奇。", statement: "让直觉提出问题，\n让设计给出表达。", body: "我们不急着给风格贴标签。先理解想要传递的内容，再用合适的图像、文字和节奏，让想法清楚地发生。", methods: [{ title: "从观察开始", text: "靠近普通的事物，找到别人习以为常的细节。" }, { title: "给实验留位置", text: "在清晰的方向里试试不同的组合，让意外成为设计的一部分。" }, { title: "把表达做完整", text: "从一张画面到一套系统，照顾每个实际使用的场景。" }], scopeLabel: "我们关注", scope: ["品牌识别", "视觉实验", "艺术指导", "数字体验"] },
  contact: { title: ["下一件有趣的事，", "一起做。"], intro: "带上一个问题，或者一个还没想明白的念头。", label: "演示联系邮箱", copy: "复制演示邮箱", copied: "已复制", fallback: "请选中邮箱手动复制", note: "物间是虚构演示工作室，联系信息仅作展示。" },
  assets: {
    leaves: { src: "/assets/leaves.jpg", alt: "叶片的自然纹理与线条呈现有机的视觉节奏", width: 1800, height: 2699 },
    architecture: { src: "/assets/architecture.jpg", alt: "建筑体块形成清晰的几何秩序与光影对比", width: 1800, height: 1200 },
    interior: { src: "/assets/interior.jpg", alt: "室内家具与空间轮廓构成日常物体之间的关系", width: 1800, height: 1350 },
  },
} as const;
