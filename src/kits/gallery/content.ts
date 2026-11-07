export const content = {
  brand: "暗场", wordmark: "NOIR", email: "studio@noir.example",
  nav: { home: "影像", project: "光的切面", about: "关于", contact: "联系" },
  home: { intro: "看见那些，被日常略过的瞬间。", feature: "光的切面", featureType: "建筑 · 光影 · 影像叙事", featureCount: "查看影像系列", secondary: "林间，未命名", secondaryType: "自然观察", third: "有人经过的空间", thirdType: "日常片段", statement: ["影像不是答案。", "是另一种观看。"], body: "暗场收集光线留下的痕迹。从建筑的折角，到林间的空隙，尝试让熟悉的事物重新变得陌生。", about: "走近暗场" },
  project: { kicker: "影像系列 / 概念编辑", title: ["光的", "切面"], subtitle: "当光线经过，空间有了另一种形状。", introTitle: "没有人物的叙事", intro: "这组概念影像编辑将建筑、室内与自然放在同一条观看路径上。关注的不是某个地点，而是光线如何划分画面，如何让一处空白产生情绪。", facts: [{ label: "形式", value: "影像编辑 / 网页展览" }, { label: "主题", value: "空间、边界、明暗" }, { label: "来源", value: "公开授权摄影素材" }], captions: ["建筑的边界，也可以是光的起点。", "在静止的空间里，时间依然流动。", "明暗之间，自然留下了自己的秩序。"], ending: "让观看，\n多停留一会儿。", note: "这是虚构工作室的概念系列。图像使用公开授权素材，演示影像编辑与展览页面的设计方法，不代表原创摄影作品。", back: "返回影像索引" },
  about: { kicker: "关于暗场", title: ["慢一点。", "再看一眼。"], intro: "暗场是一处虚构的影像创作空间，也是一份关于观看的开放练习。", heading: "在明暗之间，\n保留感受的空间。", body: "我们相信，图像的意义并不总是来自解释。它也来自停顿、距离，以及观看者带来的记忆。这份作品集以克制的排版，让画面获得充分的时间。", approachTitle: "我们的观看方式", approaches: [{ name: "观察", text: "从普通的景物出发，不急于为画面命名。" }, { name: "取舍", text: "让光线和结构建立秩序，为没有被拍到的部分留白。" }, { name: "编辑", text: "在图像之间寻找呼应，用次序和距离构成叙事。" }], scope: "影像编辑 / 视觉叙事 / 艺术指导" },
  contact: { title: "保持观看。", intro: "关于影像、展览，或一次尚未发生的合作。", label: "演示联系邮箱", copy: "复制演示邮箱", copied: "已复制", fallback: "请选中邮箱手动复制", note: "虚构演示工作室 · 素材用于设计展示" },
  assets: {
    architecture: { src: "/assets/architecture.jpg", alt: "建筑的几何线条与日光形成强烈的明暗切面", width: 1800, height: 1200 },
    forest: { src: "/assets/forest.jpg", alt: "树木与枝叶交叠，光线穿过森林的间隙", width: 1800, height: 1199 },
    interior: { src: "/assets/interior.jpg", alt: "安静的室内场景中，自然光勾勒出家具与墙面的轮廓", width: 1800, height: 1350 },
  },
} as const;
