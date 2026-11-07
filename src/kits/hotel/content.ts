export const content = {
  brand: "栖泊", wordmark: "HAVEN", email: "stay@haven.example",
  nav: { home: "栖泊之间", project: "房间与停留", about: "关于此地", contact: "联系栖泊" },
  common: { skip: "跳至正文", navigation: "栖泊网站导航", arrow: "↗", back: "回到栖泊之间", currency: "¥", locale: "zh-CN", separator: " · ", plus: "+" },
  home: {
    title: "此刻，只管停留。", body: "把行程留白。让一夜好眠、一阵晚风，成为旅途的一部分。", action: "找到喜欢的房间",
    introTitle: "有些地方，\n适合什么也不安排。", intro: "栖泊想象一处靠近水岸的休憩之所。推开窗，有光；合上书，有风。你可以出发，也可以只是好好坐一会儿。",
    lookbookTitle: "把日常，住得从容。", lookbookIntro: "温暖的木、柔和的光，以及可以独处的角落。",
    spaces: [
      { image: "room", title: "一间安静的卧室", body: "从木色与织物开始，让休息成为房间最重要的事。", caption: "卧室氛围参考" },
      { image: "lounge", title: "一个向光的角落", body: "给阅读与闲聊留出位置。窗外的时间，慢慢流过。", caption: "起居空间参考" },
    ],
    eveningTitle: "黄昏，不必赶往下一站。", eveningBody: "沿着水边散步，看天色一点点变蓝。回到屋里时，灯已经亮了。", eveningAction: "读读此地的想法",
  },
  project: {
    kicker: "ROOMS FOR UNHURRIED DAYS", title: "选一间房，\n留几天时间。", intro: "庭院里的清静，或窗边的日光。按照自己的节奏，想象一次简单的停留。",
    selectorLabel: "选择房型", selectedLabel: "当前房型：", detailsTitle: "房间里的小事", photoNote: "图库照片用于呈现空间氛围。房型与配置为概念设定。",
    rooms: [
      { id: "courtyard", name: "庭院大床房", english: "COURTYARD ROOM", image: "room", description: "向内看，是柔软的床与暖色木墙；向外看，是一小片被绿意围住的天空。适合把一天交还给安静。", rate: 980, specs: [{ label: "概念面积", value: "32 m²" }, { label: "床型", value: "一张大床" }, { label: "入住人数", value: "1–2 位" }, { label: "空间偏好", value: "庭院与独处" }], features: ["一处面向绿植的休息角", "可遮光窗帘与床头阅读灯", "独立卫浴与基础洗护", "热水壶、茶具与饮用水"] },
      { id: "sunlight", name: "日光套房", english: "SUNLIGHT SUITE", image: "lounge", description: "把睡眠与起居轻轻分开。醒来后不急着出门，在窗边喝一杯茶，读到书里下一章再说。", rate: 1380, specs: [{ label: "概念面积", value: "48 m²" }, { label: "床型", value: "一张大床" }, { label: "入住人数", value: "1–2 位" }, { label: "空间偏好", value: "日光与阅读" }], features: ["独立起居区与窗边座椅", "可遮光窗帘与床头阅读灯", "独立卫浴与基础洗护", "茶具、书架与小餐桌"] },
    ],
    estimate: { title: "给停留留个预算。", intro: "选择晚数，看看概念房费如何变化。", nightLabel: "停留晚数", nights: [1, 2, 3, 4, 5, 6, 7], defaultNights: 2, nightUnit: "晚", rateLabel: "概念每晚房费", totalLabel: "概念房费合计", calculationSeparator: " × ", note: "仅计算所选房型的示例单晚价格 × 晚数，不含餐饮、交通或其他费用；不代表可售房价，也不生成预订。" },
    rhythmTitle: "住下以后，\n慢慢熟悉这里。", rhythms: [{ time: "清晨", title: "从一扇窗开始", body: "拉开窗帘，给自己留一点不看手机的时间。" }, { time: "午后", title: "出门，也可以不出门", body: "散步、阅读，或在熟悉的椅子上小憩。行程由自己决定。" }, { time: "入夜", title: "把声音放轻", body: "调暗灯光，让房间回到适合休息的节奏。" }],
    questionsTitle: "停留之前", questions: [{ title: "可以在这里预订房间吗？", body: "栖泊是虚构旅宿概念，目前没有实体房源、可订日期或支付服务。房型与预算工具用于展示一次停留的选择过程。" }, { title: "可以带宠物或加床吗？", body: "这些条件需要在真实运营时由旅宿方逐项确认。概念房型暂按 1–2 位成人设计，未设加床和宠物服务。" }, { title: "图片对应哪间客房？", body: "页面使用公开图库摄影作为空间与目的地氛围参考，不代表栖泊拥有图片中的酒店、房间或设施。" }],
  },
  about: {
    kicker: "A PLACE TO PAUSE", title: "离日常远一点，\n离自己近一点。", intro: "栖泊是一份关于停留的提案。它从水岸、房间与日常细节出发，想象旅宿可以有的样子。", photoCaption: "从水面与天光里，寻找目的地的节奏。",
    storyTitle: "目的地，\n也可以是一种节奏。", story: ["我们喜欢旅行里不被计划的部分：早起时的光，回程路上的风，一本在窗边读完的书。它们很小，却常常留得很久。", "所以栖泊把空间留得简单，把时间还给住下的人。不用每一分钟都值得分享，只要这一刻，让自己舒服。"],
    valuesTitle: "一处旅宿的三个心愿", values: [{ title: "让休息自然发生", body: "用清楚的动线、恰好的照明与舒服的座位，照顾来到房间后的每一步。" }, { title: "把风景留在身边", body: "窗边、庭院与水岸，都值得慢一点经过。空间不会比自然更喧闹。" }, { title: "对每次相遇认真", body: "把信息说清楚，尊重不同的生活节奏。让停留少一点负担。" }],
    destinationTitle: "下一站，\n留在想象里。", destinationBody: "这份提案尚未对应实际城市或地址。未来的栖泊，也许会在一段适合步行的水岸，等一位愿意慢下来的旅人。",
  },
  contact: { title: "关于下一次停留。", body: "欢迎交换一个旅宿或空间的想法。", label: "演示联系邮箱", copy: "复制演示邮箱", copied: "演示邮箱已复制。", fallback: "暂时无法复制，请选中邮箱手动复制。", note: "栖泊 HAVEN 为虚构旅宿概念。摄影为图库氛围参考，非自有物业。", closing: "STAY A LITTLE LONGER." },
  assets: {
    room: { src: "/assets/hotel-room.jpg", alt: "暖木色卧室中摆着深灰床品的大床，窗外是带绿色植物的小露台", width: 1600, height: 1067 },
    pool: { src: "/assets/hotel-pool.jpg", alt: "蓝调傍晚的泳池映出灯光，水边是酒店餐厅建筑、遮阳伞与躺椅", width: 1600, height: 1600 },
    lounge: { src: "/assets/interior.jpg", alt: "日光照进摆有白色扶手椅、棕色沙发和绿色植物的客厅", width: 1800, height: 1350 },
    coast: { src: "/assets/coast.jpg", alt: "贴近水面的蓝色海浪起伏，远处是淡色的海平线与天空", width: 1600, height: 1067 },
  },
} as const;
