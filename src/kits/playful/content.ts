export const content = {
  brand: "跳格", wordmark: "HOP", email: "play@hop.example",
  nav: { home: "游乐场", project: "像素工作台", about: "关于跳格" },
  common: { skip: "跳至内容", navigation: "主导航", arrow: "↗", back: "回到游乐场", disclosure: "跳格为虚构创意工作室。像素作品为本站原创演示，所有编辑与导出均在本机完成。", logo: ["10101110110", "10101010101", "11101010110", "10101010100", "10101110100"] },
  home: {
    label: "一个可以动手的创意游乐场", title: ["小格子，", "大主意。"], intro: "不必等到灵感来。先给一个方格换个颜色。",
    editorTitle: "这朵花，\n你说了算。", editorIntro: "选个颜色，点一格试试。再点同一格，就把它擦掉。", action: "打开完整工作台", galleryTitle: "小作品，大脾气。", galleryIntro: "从一朵花到一束闪电，用同一套方格试出不同的性格。", galleryLabel: "原创像素练习",
    statement: ["把“万一呢”，", "变成“试一下”。"], statementBody: "做一点没有标准答案的小东西。颜色可以重选，方格可以重画，意外也可以留下。", aboutAction: "跳格的玩法",
  },
  editor: {
    title: "像素画布", canvas: "8 行 8 列的像素画布", help: "方向键移动，空格或回车上色。Tab 可离开画布。再次涂同一种颜色即可擦除。", compactHelp: "点按方格上色；键盘用方向键移动，空格或回车上色。", paletteLabel: "换一组气氛", colorLabel: "选择画笔颜色", selectedLabel: "当前画笔", row: "第", column: "行，第", cellEnd: "列", updated: "已更新", erased: "已擦除", reset: "重置画布", resetDone: "画布已恢复为当前原作。", presets: "从一个原作开始", load: "载入", loaded: "已载入原作：", export: "导出 PNG", exporting: "正在生成 PNG…", exported: "PNG 已生成，下载已开始。", exportError: "浏览器暂时无法导出。作品仍保留在画布中，请稍后重试。", defaultStatus: "作品仅保留在当前页面，离开前可导出保存。", size: 8, exportSize: 800, filename: "hop-pixel-art.png", gridLabel: "8 × 8 / 原创画布", homeStatus: "大胆改，随时可以重置。", projectTitle: ["画小一点，", "想远一点。"], projectIntro: "64 个方格，一整张属于你的作品。选择原作、调整配色，再把它画成自己的样子。", projectLabel: "像素工作台 / 本地创作", noteTitle: "你的画，真的能带走。", noteBody: "PNG 导出会把当前每一格的颜色绘制成 800 × 800 像素的图片。没有账号，也不上传作品。刷新或离开页面会清除本次编辑。", tipsTitle: "三步，开始玩。", tips: [{ title: "选一个起点", body: "花、来客或闪电，都是本站原创的 8 × 8 像素练习。载入会替换当前画布。" }, { title: "改变一小格", body: "选择画笔后点按方格；再点相同颜色会擦除。用空白色也可以直接擦除。" }, { title: "把意外留下", body: "换一组配色看看，满意后导出真实 PNG。每一格都是你最终看到的颜色。" }],
  },
  palettes: [
    { name: "晴天", colors: [{ name: "空白", hex: "#fff6bf" }, { name: "晴黄", hex: "#ffe83e" }, { name: "电蓝", hex: "#383bdd" }, { name: "软紫", hex: "#b5a0f7" }, { name: "墨黑", hex: "#171343" }, { name: "纸白", hex: "#fffef4" }] },
    { name: "糖果", colors: [{ name: "空白", hex: "#fcebf5" }, { name: "桃粉", hex: "#f883bc" }, { name: "葡萄", hex: "#763ca3" }, { name: "青柠", hex: "#d9ed69" }, { name: "墨黑", hex: "#231735" }, { name: "纸白", hex: "#fffef4" }] },
    { name: "夜游", colors: [{ name: "空白", hex: "#202053" }, { name: "柠黄", hex: "#f5ef71" }, { name: "天蓝", hex: "#78c6ee" }, { name: "暮紫", hex: "#baa0f5" }, { name: "纸白", hex: "#fffef4" }, { name: "墨黑", hex: "#171343" }] },
  ],
  artworks: [
    { id: "bloom", name: "不急着开花", type: "一朵有棱角的小花", alt: "原创像素花：方块花瓣围着花心，两片叶子在笔直的花茎两侧展开", rows: ["00022000", "00211200", "02111120", "00211200", "00044000", "00344300", "03344330", "00044000"] },
    { id: "visitor", name: "路过的来客", type: "给好奇心一个表情", alt: "原创像素来客：方块身体、两只小眼睛和一对竖起的触角", rows: ["02000020", "00200200", "02222220", "22522522", "22222222", "20222202", "20000002", "00200200"] },
    { id: "spark", name: "念头闪了一下", type: "让灵感拐个直角", alt: "原创像素闪电：一束闪电在方格中折出鲜明的锯齿轮廓", rows: ["00002200", "00022000", "00220000", "02222220", "00022200", "00222000", "02220000", "02200000"] },
  ],
  about: {
    label: "关于跳格 / 一种创作练习", title: ["好奇心，", "不用打草稿。"], intro: "跳格是一间虚构的图形工作室，也是一份认真玩耍的邀请。我们把小小的规则，变成可以不断尝试的空间。", specimen: "方格很小，可能性不小。", storyTitle: "先做出来，\n再看看。", story: ["我们喜欢纸上的涂改，也喜欢屏幕上的撤回。好的念头不总是完整地到来，有时只是一个颜色、一处空白，或某个歪打正着的转角。", "所以，跳格从最小的单位开始。一格一格地试，让想法在手上变得具体。这些练习没有客户委托与商业成绩，只有可以亲自修改的原创小作品。"],
    rulesTitle: "这里的几条小规则。", rules: [{ label: "好奇", title: "先问一句“如果呢”", body: "如果把花瓣换成蓝色，如果让闪电变得柔和，画面会发生什么？" }, { label: "动手", title: "只改一格也算开始", body: "不用掌握整套工具。一个明确的小动作，就能给下一个动作提供方向。" }, { label: "留白", title: "没画满也没关系", body: "空白是构图的一部分。删去一格，有时比再添一格更有意思。" }],
    closing: "轮到你，\n跳一格。", closingBody: "带上一个念头，或者什么也不带。从空白与颜色之间，找到自己的玩法。", action: "去像素工作台",
  },
  contact: { title: "有个古怪的好主意？", body: "留个开场白，给下一次想象。", label: "演示联系邮箱", copy: "复制演示邮箱", copied: "演示邮箱已复制。该地址仅作展示。", fallback: "暂时无法自动复制，请选中上方邮箱手动复制。", signature: "小小一格，也能有戏。" },
} as const;
