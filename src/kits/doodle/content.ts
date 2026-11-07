export type IdeaCategory = "all" | "objects" | "play" | "places";
export type Idea = { id: string; title: string; english: string; category: Exclude<IdeaCategory, "all">; kind: "lamp" | "pencil" | "cloud" | "cup"; description: string; thought: string; material: string; color: string };

export const content = {
  brand: "漫游", wordmark: "RAMBLE", email: "hello@ramble.example",
  nav: { home: "随便逛逛", project: "点子商店", about: "关于漫游", label: "漫游主导航" },
  common: { skip: "跳到主要内容", copy: "复制邮箱", copied: "示例邮箱已复制。", copyError: "未能复制，请手动选择上方邮箱。", disclosure: "漫游是一个虚构创意工作室。所有作品均为原创概念演示。", back: "回去接着逛", next: "再看一个", emailNote: "示例邮箱，仅用于演示", open: "看看这个点子", close: "收起详情" },
  home: {
    eyebrow: "一个不太正经的创意工作室",
    title: ["把无聊，", "变成好玩。"], intro: "点一下空地，让好奇心开花。",
    cta: "去点子商店", note: "好点子，正在散步。", lampNote: "给想象力，开一盏灯。",
    help: "点击空地种一朵花，也可以按下方按钮。", canvasLabel: "可互动的手绘漫游广场", keyboard: "按 Enter 种花，空格暂停或继续。",
    density: "今天多热闹？", densityLabels: ["安静一点", "刚刚好", "热闹一点"], people: "位小小漫游者",
    less: "减少漫游者", more: "增加漫游者", pause: "歇一会儿", resume: "接着漫游", reset: "重新开始", plant: "种一朵花", static: "静态漫游", reduced: "已按系统设置减少动态效果。", resetNotice: "广场已重新开始。", plantNotice: "花开了，小小漫游者正在靠近。", fallback: "此浏览器不支持动画画布，仍可欣赏插画并浏览全部页面。",
    bubbles: ["去看看？", "好点子！", "慢慢来。", "花开啦", "想到了！", "今天真好", "一起走吧", "借点灵感"],
  },
  project: {
    title: "小点子，\n有大用处。", intro: "把习以为常的东西重新看一遍。有些会发光，有些只是让人笑一下。",
    categories: [{ id: "all", label: "全部点子" }, { id: "objects", label: "日常物件" }, { id: "play", label: "随手玩玩" }, { id: "places", label: "想象空间" }] as { id: IdeaCategory; label: string }[],
    filterLabel: "按点子类型筛选", selected: "正在看", concept: "原创概念", thought: "如果这样呢？", material: "想把它做成", detailLabel: "点子详情", result: "个点子", empty: "暂时没有这一类点子。", returnAll: "看看全部点子", shopNote: "这里收藏想法，暂不售卖实物。",
  },
  ideas: [
    { id: "little-light", title: "一点点光", english: "A LITTLE LIGHT", category: "objects", kind: "lamp", description: "一盏比房子还大的台灯，把每个路过的小念头照得亮亮的。", thought: "当台灯不再只属于书桌，城市里会不会多一块允许发呆的地方？我们给它一片空地，让人们带着没有想完的事情来坐坐。", material: "公共艺术 / 互动场景", color: "paper" },
    { id: "pencil-park", title: "铅笔长椅", english: "TAKE A LINE", category: "places", kind: "pencil", description: "把一支铅笔横过来，刚好够几个朋友坐下聊聊。", thought: "画线的工具也能成为一条休息的线。在这个公园里，橡皮擦是靠枕，削下来的木屑是给小鸟的屋顶。", material: "空间装置 / 城市家具", color: "yellow" },
    { id: "cloud-pocket", title: "口袋天气", english: "POCKET WEATHER", category: "play", kind: "cloud", description: "今天心情晴，偶尔有一点不想长大的云。", thought: "天气预报也可以由心情决定。点击云朵收集一阵雨，把它留给下一次需要安静的午后。", material: "互动绘本 / 数字玩具", color: "paper" },
    { id: "cup-garden", title: "杯子花园", english: "ROOM TO GROW", category: "objects", kind: "cup", description: "咖啡喝完以后，让一个小花园接着醒来。", thought: "一只杯子能装多少个春天？从一片叶子开始，让熟悉的轮廓里发生一点意料之外的生长。", material: "插画系列 / 物件提案", color: "paper" },
  ] as Idea[],
  about: {
    title: "认真做点\n不一样的事。", intro: "我们相信，好奇心是一种很实用的能力。它让一盏台灯变成广场，让一只杯子长出花园。",
    storyTitle: "漫游，没有标准路线。", story: ["漫游是为那些暂时说不清楚的想法，留出的一小块地方。我们画画、观察、试着把熟悉的事物挪一挪，看看世界会不会因此多一点趣味。", "在这里，走慢一点没关系，拐错弯也可能有收获。一个人的小问题，也许正好是另一个人好故事的开头。"],
    principles: [{ title: "从日常开始", text: "杯子、台灯、路边的一张长椅，平常的东西值得再看一眼。" }, { title: "让人参与进来", text: "留一个可以点击、可以改变、可以带走小惊喜的位置。" }, { title: "给想法一点时间", text: "先把它画下来，再试一次。也许下一笔，故事就出现了。" }],
    contact: "有个奇怪的好点子？", contactBody: "先写下来。等到你的工作室上线，把这里换成真正能找到你的地址。", return: "我再去逛一圈", caption: "一只熟悉的杯子，也能长出一个小小的春天。",
  },
  scene: { initialDensity: 1, densities: [20, 36, 54], framesPerSecond: 30, maxPixelRatio: 1.5, markLimit: 9, attractSeconds: 12, mobileBreakpoint: 768, palette: { ink: "#24251f", paper: "#f6f5ed", yellow: "#f3db76", shadow: "#dbdcd3", light: "#eceee2" } },
};
