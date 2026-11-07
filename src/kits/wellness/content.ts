export const content = {
  brand: "余息", wordmark: "ease.", email: "hello@ease.example",
  nav: { home: "自在练习", project: "练习笔记", about: "余息的想法", contact: "打个招呼" },
  common: { skip: "跳至正文", navigation: "余息网站导航", arrow: "↗", back: "回到自在练习", minute: "分钟", separator: " · ", plus: "+" },
  home: {
    kicker: "MOVEMENT, AT YOUR OWN PACE", title: ["给身体一点", "自由时间。"], body: "伸个懒腰，换口呼吸。练习可以从今天的一点点开始。", action: "看看本周练习", smallNote: "不追赶，\n也在向前。",
    introTitle: "动得舒服，\n比做得标准更重要。", introBody: "余息把运动放回日常。一张垫子，一段留给自己的时间，不必比较，也不用急着达到什么。", introAction: "从一份练习笔记开始",
    practicesTitle: "今天，想怎样动一动？", practices: [{ title: "打开身体", english: "MOBILITY", body: "从轻柔的关节活动开始，慢慢找到今天舒服的范围。" }, { title: "跟着呼吸", english: "SLOW FLOW", body: "让简单的动作连起来，给注意力一个安静的落点。" }, { title: "留一点空白", english: "REST", body: "坐一坐，放松肩膀。休息也是练习的一部分。" }],
    closingTitle: "今天的一点点，\n就很好。", closingBody: "余息不是一场挑战。这里欢迎每一种节奏，也欢迎随时休息的你。", closingAction: "认识余息",
  },
  schedule: {
    title: "把一小段时间，留给自己。", intro: "按日子和练习类型，找到适合今天的节奏。", label: "练习日选择", dayLabel: "选择练习日", typeLabel: "练习类型", defaultDay: "mon", defaultType: "all", allLabel: "全部类型", resultLabel: "场练习", emptyTitle: "今天，留一点空白。", emptyBody: "这个日子暂时没有所选类型的练习。换一个日子，或看看全部安排。", reset: "查看全部安排", note: "示例周课表，展示课程内容与时间安排，不开放预约。", action: "阅读完整练习笔记",
    days: [{ id: "all", label: "整周" }, { id: "mon", label: "周一" }, { id: "tue", label: "周二" }, { id: "wed", label: "周三" }, { id: "thu", label: "周四" }, { id: "fri", label: "周五" }, { id: "sat", label: "周六" }, { id: "sun", label: "周日" }],
    types: [{ id: "all", label: "全部类型" }, { id: "mobility", label: "基础活动" }, { id: "flow", label: "舒展流动" }, { id: "rest", label: "静坐收尾" }],
    sessions: [
      { id: "mon-flow", day: "mon", type: "flow", time: "07:30", title: "晨间舒展", duration: 20, level: "轻缓节奏", location: "垫上练习" },
      { id: "mon-mobility", day: "mon", type: "mobility", time: "18:30", title: "下班后，松一松", duration: 15, level: "入门友好", location: "站姿与坐姿" },
      { id: "tue-rest", day: "tue", type: "rest", time: "20:00", title: "给一天收个尾", duration: 10, level: "静态休息", location: "坐姿练习" },
      { id: "wed-flow", day: "wed", type: "flow", time: "07:30", title: "慢一点的流动", duration: 20, level: "轻缓节奏", location: "垫上练习" },
      { id: "thu-mobility", day: "thu", type: "mobility", time: "18:30", title: "肩背与日常活动", duration: 15, level: "入门友好", location: "站姿与坐姿" },
      { id: "fri-rest", day: "fri", type: "rest", time: "20:00", title: "周末前的空白", duration: 10, level: "静态休息", location: "坐姿练习" },
      { id: "sat-flow", day: "sat", type: "flow", time: "09:00", title: "周末自在流动", duration: 20, level: "轻缓节奏", location: "垫上练习" },
      { id: "sat-mobility", day: "sat", type: "mobility", time: "10:30", title: "从活动关节开始", duration: 15, level: "入门友好", location: "站姿与坐姿" },
    ],
  },
  project: {
    kicker: "SMALL PRACTICES, EVERYDAY", title: ["慢慢来，", "身体会告诉你。"], intro: "三份简单的练习笔记。先选一种节奏，再给自己一个舒服的开始。", caption: "海边日落中的伸展瞬间，作为练习氛围参考。",
    selectorLabel: "选择练习笔记", selectedLabel: "当前练习笔记：", equipmentTitle: "开始之前", stepsTitle: "这一段时间，可以这样过。", guideTitle: "记住这件小事", defaultPractice: "flow",
    practices: [
      { id: "mobility", title: "基础活动", english: "EASY MOBILITY", duration: 15, intro: "用小幅度、缓慢的动作活动肩、手腕与脚踝。无需追求最大的角度，留意身体给出的反馈。", equipment: ["一张稳定、不带滑轮的椅子", "平整防滑的地面", "方便活动的衣物与饮用水"], steps: [{ title: "先安稳地坐下来", duration: 3, body: "双脚落地，坐在稳定的椅子上。让肩膀自然放松，保持平常的呼吸，轻轻活动手指与脚趾。" }, { title: "慢慢活动关节", duration: 8, body: "轮流转动手腕与脚踝，再轻轻抬起、落下肩膀。每个动作从小幅度开始，左右都照顾到；动作之间随时停下来。" }, { title: "起身，走几步", duration: 4, body: "扶稳椅背缓慢起身，在安全的空间走几步。回到舒适站姿，感受身体现在的状态，再决定是否继续。" }], reminder: "椅子要稳定，动作保持轻缓。无需用力拉扯关节，也不用和别人比较活动范围。" },
      { id: "flow", title: "舒展流动", english: "SLOW FLOW", duration: 20, intro: "把轻柔伸展与简单站姿连起来，让动作跟随自然呼吸。每一个过渡都可以放慢，每一段都可以休息。", equipment: ["一张铺在防滑地面上的练习垫", "手臂可以向两侧伸展的空间", "一把可扶稳的椅子（可选）"], steps: [{ title: "站稳，找到呼吸", duration: 4, body: "双脚自然分开，膝盖保持轻松。目光平视，做几次平常的呼吸，再缓缓抬起和落下手臂，幅度以舒服为准。" }, { title: "轻轻伸展，缓慢转换", duration: 10, body: "在舒适范围内交替向两侧伸展手臂，再做轻柔侧伸。接着向前迈一小步，重心缓慢前后移动，左右交替，需要时扶住椅背。" }, { title: "坐下，让节奏慢下来", duration: 6, body: "慢慢坐到椅子上或垫子上，选择舒服的坐姿。轻轻活动肩膀与双手，随后安静坐一会儿。结束前先动一动脚，再缓慢起身。" }], reminder: "照片里的体式不是本笔记的练习要求。无需完成深度后弯或高难度姿势，动作始终以舒适、稳定为前提。" },
      { id: "rest", title: "静坐收尾", english: "A MOMENT OF REST", duration: 10, intro: "给一天留一个不需要完成任何事的片刻。坐得舒服，呼吸自然，让注意力回到眼前。", equipment: ["一张稳定的椅子或舒适坐垫", "安静、通风且温度适宜的位置", "需要时可以披上的薄外套"], steps: [{ title: "找一个舒服的位置", duration: 2, body: "在椅子或坐垫上坐稳，让手自然放在腿上。眼睛可以轻轻闭上，也可以看向前方固定的一处。" }, { title: "保持自然呼吸", duration: 5, body: "不用刻意延长呼吸或屏住气。留意衣物触碰皮肤、双脚接触地面的感觉。注意力走开时，轻轻带回即可。" }, { title: "慢慢回到日常", duration: 3, body: "活动手指与脚趾，看看周围，再轻轻转动肩膀。给自己一点过渡时间，起身后喝一口水。" }], reminder: "静坐不需要排空想法。若坐着不舒服，可以调整姿势、睁眼或直接结束。" },
    ],
    safetyTitle: "让练习适合今天的自己。", safetyBody: "以上是一般性的轻活动与休息笔记，不是医疗或康复方案。出现疼痛、头晕或其他不适时停止练习；有伤病、孕期或特殊身体状况时，先向合适的专业人员了解适合自己的活动方式。",
    questionsTitle: "第一次练习，常见的小疑问", questions: [{ title: "需要把整段时间做满吗？", body: "不需要。时间只是示例安排。可以从几分钟开始，随时休息或提前结束，下一次再根据感受调整。" }, { title: "动作做不到怎么办？", body: "缩小幅度、扶稳椅背，或跳过这个动作。舒适与稳定比完成动作更重要，避免勉强或忍痛继续。" }, { title: "练习前后要准备什么？", body: "先确认地面防滑、周围没有障碍物，穿方便活动的衣服。练习后缓慢起身，按自己的需要补充饮水。" }],
  },
  about: {
    kicker: "A LITTLE ROOM FOR YOURSELF", title: ["日子很满，", "给自己留点余息。"], intro: "余息是一间想象中的日常运动工作室。我们关心的，是人怎样在忙碌生活里，多照顾自己一点。",
    storyTitle: "从一次伸懒腰开始。", story: ["有时候，我们把运动想得太完整：一整套装备、一大段时间、一个必须达到的目标。于是，开始反而成了最难的事。", "余息想把这件事放轻一点。先动一动肩膀，站起来走几步，给自己几分钟安静。小小的练习，也有属于它的分量。"],
    valuesTitle: "我们喜欢的练习方式", values: [{ title: "有选择", body: "站着、坐着、扶一把椅子。为不同状态保留不同的做法。" }, { title: "有余地", body: "让休息与暂停自然发生，不用努力证明自己。" }, { title: "有日常", body: "少一点仪式门槛，让练习可以出现在普通的一天。" }],
    placeTitle: "理想中的空间，\n先让人松一口气。", placeBody: "光线柔和，地面平整，有地方放一杯水，也有位置安静坐着。人来到这里，不需要先成为更好的谁。", placeNote: "余息尚无实际工作室、课程地址或营业安排。", closing: "一点点，\n也算数。",
  },
  contact: { title: "一起，把节奏放轻。", body: "一个关于练习与日常的小想法，也值得聊聊。", label: "演示联系邮箱", copy: "复制演示邮箱", copied: "演示邮箱已复制。", fallback: "暂时无法复制，请选中邮箱手动复制。", note: "余息 EASE 为虚构演示品牌；课程与时间为示例，摄影为图库氛围参考。", closing: "MAKE ROOM FOR YOU." },
  assets: {
    movement: { src: "/assets/wellness.jpg", alt: "海边日落下，一位练习者在垫子上伸展身体，人物形成深色剪影", width: 1600, height: 1009 },
    coast: { src: "/assets/coast.jpg", alt: "贴近水面的蓝色海浪起伏，远处是淡色的海平线与天空", width: 1600, height: 1067 },
    room: { src: "/assets/interior.jpg", alt: "日光照进摆有白色扶手椅、棕色沙发和绿色植物的客厅", width: 1800, height: 1350 },
  },
} as const;
