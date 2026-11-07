export const content = {
  brand: "间野", wordmark: "FIELDWORK", email: "hello@fieldwork.example",
  nav: { home: "首页", project: "精选项目", about: "关于间野", contact: "联系" },
  contact: { title: "好的故事，\n从一次交谈开始。", body: "聊一处空间、一种感受，或一个还未成形的想法。", label: "演示联系邮箱", copy: "复制演示邮箱", copied: "已复制", fallback: "请选中邮箱手动复制", note: "间野为虚构演示工作室，邮箱仅用于模板展示。" },
  home: { eyebrow: "独立创意工作室 · 空间与视觉", title: ["让空间，", "回到生活。"], intro: "在建筑、自然与日常之间，寻找恰如其分的表达。", action: "探索精选项目", featured: "留白之家", projectType: "空间叙事 / 视觉提案", projectIntro: "一处居所，一种慢下来的可能。让光、材质和生活本身成为主角。", detail: "查看完整项目", statement: "我们相信，好的设计\n为感受留下余地。", statementBody: "间野以观察开始，以清晰的表达收尾。从一个空间的气质，到一套视觉语言，让不同尺度的设计说同一种话。", about: "认识间野", photoNote: "在自然中，寻找设计的节奏。" },
  project: { kicker: "空间叙事 / 概念项目", title: "留白之家", subtitle: "把日常，放回空间的中心。", facts: [{ label: "项目性质", value: "自主概念提案" }, { label: "设计内容", value: "空间叙事、视觉方向、影像编辑" }, { label: "主题", value: "光线、材质与居住" }], introTitle: "少一些安排，\n多一些自在。", intro: "留白之家是一项关于居住的概念练习。我们把光线视为最重要的材料，以自然的肌理和松弛的留白，重新梳理人与空间的关系。", approachTitle: "让光线带路", approach: "视觉提案从一天中的光影变化展开：用舒展的画面保留空间的呼吸，用克制的文字表达材质的温度。照片为公开授权素材，用于呈现设计方向，并非工作室实拍项目。", caption: "自然光、朴素材质与开放的动线，构成居住的底色。", resultTitle: "从空间到视觉，\n一种连贯的感受。", result: "从暖白与深绿的色彩关系，到宽松的版面节奏，表达始终围绕安静、真实、可感知的生活。", back: "返回精选项目" },
  about: { kicker: "关于间野", title: ["观察日常，", "设计恰好。"], intro: "我们是一间虚构的独立创意工作室，用这套作品集探索空间、影像与视觉设计的关系。", statement: "从真实的感受出发。", body: "我们关心人怎样走进一个空间，怎样停留，怎样记住它。设计不必占满每个角落，却需要在每个选择里保有一致的判断。", processTitle: "一起工作的方式", steps: [{ title: "观察与倾听", text: "从场所、使用者与日常细节中，找到值得被表达的核心。" }, { title: "梳理与构想", text: "将感受转化为明确的视觉方向，校准内容、材质与尺度。" }, { title: "设计与推敲", text: "在真实的使用场景里反复检查，让每个细节服务于整体。" }], services: "品牌视觉 / 空间叙事 / 艺术指导 / 影像编辑" },
  assets: {
    interior: { src: "/assets/interior.jpg", alt: "自然光照入室内，家具与材质呈现安静的空间层次", width: 1800, height: 1350 },
    architecture: { src: "/assets/architecture.jpg", alt: "建筑立面与几何结构在日光下形成清晰的明暗关系", width: 1800, height: 1200 },
    forest: { src: "/assets/forest.jpg", alt: "绿色林木与自然光构成富有层次的森林景观", width: 1800, height: 1199 },
  },
} as const;
