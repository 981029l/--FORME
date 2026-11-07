export const content = {
  brand: "慢调", wordmark: "SLOWBAR", email: "hello@slowbar.example",
  nav: { home: "店门口", project: "咖啡手记", about: "关于慢调", contact: "聊一聊" },
  common: { skip: "跳至正文", navigation: "慢调网站导航", arrow: "↗", back: "回到店门口" },
  home: {
    title: ["好咖啡，", "慢慢来。"], body: "一杯熟悉的味道，一张愿意久坐的椅子。把今天的空白，留给自己。", action: "翻开咖啡手记",
    imageCaption: "COFFEE, COMPANY & A LITTLE TIME", strap: ["咖啡要认真", "日子可以松一点", "TAKE YOUR TIME"],
    storyTitle: "街角的位子，\n留给不赶时间的你。", storyBody: "推门，闻到咖啡。找一个舒服的角落，把手机暂时放到一边。我们想象的慢调，是日常里可以轻轻停靠的一站。", storyAction: "关于慢调", storyCaption: "理想小店的空间参考 / 公开图库摄影",
    noteTitle: "好喝没有标准答案。", noteBody: "浓一点、淡一点，带一点奶香，或只喝咖啡本来的味道。下一杯，就从自己的喜欢开始。", noteAction: "调一杯自己的手冲",
  },
  menu: {
    title: "今天，想喝点什么？", subtitle: "一份小小的风味菜单。", label: "风味菜单分类", note: "概念菜单，仅作风味搭配展示。", result: "当前菜单：",
    categories: [
      { id: "coffee", label: "经典咖啡", items: [{ name: "慢调拿铁", english: "HOUSE LATTE", detail: "浓缩咖啡与牛奶，温柔的坚果香。", serving: "热 / 冰" }, { name: "长黑咖啡", english: "LONG BLACK", detail: "干净、直接，把烘焙香气留在杯里。", serving: "热 / 冰" }, { name: "当日手冲", english: "FILTER COFFEE", detail: "慢慢注水，慢慢认识一支豆子。", serving: "热" }] },
      { id: "alternatives", label: "换种口味", items: [{ name: "燕麦拿铁", english: "OAT LATTE", detail: "燕麦的谷物香，与咖啡平静地相遇。", serving: "热 / 冰" }, { name: "可可牛奶", english: "COCOA & MILK", detail: "浓郁的可可，适合想喝点甜的时候。", serving: "热" }, { name: "柠檬气泡水", english: "LEMON SODA", detail: "柠檬与细小的气泡，清爽一点。", serving: "冰" }] },
      { id: "bakery", label: "搭一口甜", items: [{ name: "黄油吐司", english: "BUTTER TOAST", detail: "烤得微脆的边，融化的黄油。", serving: "一片" }, { name: "肉桂卷", english: "CINNAMON ROLL", detail: "肉桂与糖香，适合慢慢撕开吃。", serving: "一只" }, { name: "原味司康", english: "PLAIN SCONE", detail: "朴素的麦香，配一杯热拿铁。", serving: "一份" }] },
    ],
  },
  project: {
    kicker: "THE SLOWBAR BREW NOTES", title: ["一杯手冲，", "慢慢找到喜欢。"], intro: "不用一次就冲得完美。先记录，再尝一口，下次只调整一件事。", caption: "从一杯熟悉的咖啡，开始练习感受风味。",
    equipmentTitle: "先把桌面准备好。", equipment: ["滤杯与滤纸", "手冲壶", "电子秤", "磨豆机", "喜欢的咖啡豆"], equipmentNote: "以下配方是家用手冲的起点。不同豆子、研磨和滤杯，都值得再试一次。",
    stepsTitle: "把过程，分成三个小段。", steps: [{ number: "01", title: "温杯，润纸", body: "用热水润湿滤纸并温热分享壶，倒掉这部分水。加入咖啡粉，轻轻摇平。" }, { number: "02", title: "少量注水，等待", body: "先注入约粉重两倍的水，让粉层湿润。等待约 30 秒，观察气泡与粉层的变化。" }, { number: "03", title: "继续注水，慢慢品尝", body: "分两到三次平稳注水至目标水量，避免水流直接冲到滤纸边缘。稍微放凉后，尝一口并记住感受。" }],
    tasteTitle: "下一杯，只改一点点。", tasteNotes: [{ title: "喝起来偏苦", body: "可以试着磨粗一点，或略微降低水温。其余条件先保持不变。" }, { title: "喝起来偏淡", body: "可以减少总水量，或试着磨细一点，再比较口感。" }],
    disclosure: "本页是概念品牌的入门冲煮笔记。配方用于探索个人口味，照片为图库参考，不对应在售饮品。",
  },
  brew: {
    title: "你的手冲小配方", intro: "选择粉量和粉水比，先把水量算清楚。", doseLabel: "咖啡粉量", ratioLabel: "粉水比", doseUnit: "克", ratioPrefix: "1 : ", doses: [15, 20, 30], ratios: [{ value: 15, label: "1 : 15 · 浓一点" }, { value: 16, label: "1 : 16 · 平衡" }, { value: 17, label: "1 : 17 · 轻一点" }], defaultDose: 15, defaultRatio: 16,
    resultLabel: "目标注水量", waterUnit: "g", bloomLabel: "闷蒸水量约", bloomUnit: "g（包含在总水量中）", note: "水温可从 90–94°C 开始尝试。这里的水量是注入的水重，成品咖啡会少一些。",
  },
  about: {
    kicker: "A NEIGHBOURHOOD COFFEE CONCEPT", title: ["慢一点，", "也很好。"], intro: "慢调是一间想象中的街角咖啡馆。关于咖啡，也关于我们怎样度过一个普通的下午。", caption: "木椅、绿植、暖灯光，构成我们喜欢的小店气氛。",
    storyTitle: "不必特别的一天，\n也值得认真对待。", story: ["我们喜欢小店里那些熟悉的声音：磨豆机转起来，杯碟轻轻碰在一起，门被下一位客人推开。它们让时间有了可以触摸的形状。", "所以慢调的菜单不需要很长，位子不需要很多。把咖啡做得清楚，把空间留得舒服，让每个来到这里的人，都能按自己的节奏坐一会儿。"],
    principlesTitle: "一间小店的三个念头。", principles: [{ number: "一", title: "把味道说清楚", body: "用能听懂的词介绍咖啡，认真回应每一种口味。" }, { number: "二", title: "把椅子留舒服", body: "让光线、音乐与座位，照顾一个人或一桌人的时光。" }, { number: "三", title: "把日常过扎实", body: "从一杯咖啡、一块点心、一句问候开始，不必用力。" }],
    closingTitle: "在一杯咖啡的时间里，\n重新遇见日常。", closingBody: "这里没有实际门店地址与营业安排。慢调的故事，是一份可以继续生长的咖啡品牌概念。",
  },
  contact: { title: "下次见，\n不用赶。", body: "关于咖啡，或一个小店的想法。", label: "演示联系邮箱", copy: "复制演示邮箱", copied: "演示邮箱已复制。", fallback: "暂时无法复制，请选中上方邮箱手动复制。", note: "慢调 SLOWBAR 为虚构演示品牌。", closing: "GOOD COFFEE. EASY DAYS." },
  assets: {
    coffee: { src: "/assets/coffee.jpg", alt: "木桌上排列着三杯带拉花的牛奶咖啡，周围摆着绿色盆栽", width: 1600, height: 2400 },
    room: { src: "/assets/cafe-room.jpg", alt: "咖啡馆内的木桌、编织椅、绿植与吊灯，后方是写着饮品名称的黑板", width: 1600, height: 1097 },
  },
} as const;
