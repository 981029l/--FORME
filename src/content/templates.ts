import palettes from "./palettes.json";
export const templates = [
  {
    slug: "editorial", name: "间野", english: "FIELDWORK", category: "editorial",
    description: "让空间、图像与文字，在留白里建立联系。适合建筑、室内与创意工作室。",
    tags: ["编辑排版", "工作室", "自然", "留白"],
    cover: "/previews/editorial.webp", image: "/assets/interior.jpg",
    palette: palettes.editorial,
    character: "温和的底色、清晰的网格，以及足够让作品呼吸的空间。",
    details: ["不对称的作品布局", "有节制的文字层级", "完整项目叙事"],
    pages: ["工作室首页", "项目案例", "关于与联系"],
  },
  {
    slug: "gallery", name: "暗场", english: "NOIR", category: "gallery",
    description: "收起界面的声音，让影像成为主角。为摄影师与视觉创作者准备的线上展厅。",
    tags: ["影像展览", "摄影", "暗色", "沉浸"],
    cover: "/previews/gallery.webp", image: "/assets/architecture.jpg",
    palette: palettes.gallery,
    character: "暗色画布与大幅影像，用观看节奏组织作品。",
    details: ["影像主导的首屏", "不同尺度的展览编排", "克制的悬停反馈"],
    pages: ["影像首页", "系列作品", "创作者介绍"],
  },
  {
    slug: "experimental", name: "物间", english: "OBJECT", category: "experimental",
    description: "把熟悉的形状重新排列。鲜明的字体、特别的构图，为独立设计者保留表达空间。",
    tags: ["实验设计", "平面", "独立设计师", "个性"],
    cover: "/previews/experimental.webp", image: "/assets/leaves.jpg",
    palette: palettes.experimental,
    character: "让字体参与构图，让图像与色块形成可辨认的节奏。",
    details: ["大胆的文字构图", "独立的项目视觉", "明确的品牌性格"],
    pages: ["个人作品首页", "设计项目", "关于与联系"],
  },
  {
    slug: "architecture", name: "构间", english: "MONO", category: "editorial",
    description: "像阅读一份建筑档案，以线条、尺度和光影梳理空间。适合建筑事务所与空间设计团队。",
    tags: ["建筑档案", "事务所", "网格", "黑白"],
    cover: "/previews/architecture.webp", image: "/assets/architecture.jpg",
    palette: palettes.architecture,
    character: "石墨色细线、精确的项目索引与横向大幅影像，让空间的秩序成为版面的秩序。",
    details: ["建筑图版式的项目索引", "全幅空间影像", "清晰的设计过程与项目资料"],
    pages: ["事务所首页", "建筑概念项目", "工作方法与联系"],
  },
  {
    slug: "ceramic", name: "拾器", english: "TERRE", category: "editorial",
    description: "为器物留下安静的位置。以陶土色、衬线字和近距离影像，呈现手作与材料的细节。",
    tags: ["陶艺手作", "工作室", "器物", "衬线"],
    cover: "/previews/ceramic.webp", image: "/assets/ceramics.jpg",
    palette: palettes.ceramic,
    character: "从陶器的触感出发，使用居中的文字、内嵌图版和缓慢的阅读节奏。",
    details: ["器物主导的留白构图", "陶艺系列与材料叙事", "衬线标题和制作手记"],
    pages: ["陶艺作品首页", "器物系列", "工作室与联系"],
  },
  {
    slug: "fashion", name: "序列", english: "CHAPTER", category: "gallery",
    description: "把作品集做成一本可翻阅的视觉杂志。适合时尚影像、造型策划与艺术指导。",
    tags: ["时尚影像", "艺术指导", "杂志", "人像"],
    cover: "/previews/fashion.webp", image: "/assets/portrait.jpg",
    palette: palettes.fashion,
    character: "大尺度的杂志刊头、酒红色文字与不对称人像图版，让每一组影像拥有自己的章节。",
    details: ["杂志封面式的首屏", "编号与图像共同组织系列", "鲜明的人像与时尚编排"],
    pages: ["影像杂志首页", "概念影像系列", "创作方向与联系"],
  },
  {
    slug: "travel", name: "海岸", english: "TIDELINE", category: "gallery",
    description: "以地平线展开一段影像旅程。为旅行摄影、自然记录与纪实创作者准备的作品集。",
    tags: ["旅行摄影", "自然纪实", "海洋", "日志"],
    cover: "/previews/travel.webp", image: "/assets/coast.jpg",
    palette: palettes.travel,
    character: "开阔的海面、海蓝色文字和旅途手记式的图注，给影像留出长久停留的空间。",
    details: ["横向地平线首屏", "摄影与现场笔记的阅读节奏", "海洋与陆地的系列叙事"],
    pages: ["摄影旅记首页", "自然影像系列", "记录方式与联系"],
  },
  {
    slug: "poster", name: "错位", english: "OFFSET", category: "experimental",
    description: "让文字成为图像，让版面像海报一样有力量。适合平面设计、字体实验与独立视觉工作室。",
    tags: ["平面海报", "字体实验", "钴蓝", "印刷"],
    cover: "/previews/poster.webp", image: "/assets/architecture.jpg",
    palette: palettes.poster,
    character: "钴蓝画布、错位的排字与原创图形作品，把印刷实验转化为完整网站。",
    details: ["文字主导的海报构图", "可编辑的原生图形作品", "鲜明的项目编号与展示尺度"],
    pages: ["平面作品首页", "海报视觉项目", "工作室与联系"],
  },
  {
    slug: "product", name: "橙场", english: "ORBIT", category: "experimental",
    description: "从一件物品的轮廓，读到设计的思考。适合工业产品设计、家具研究与独立设计师。",
    tags: ["工业产品", "家具", "技术图版", "橙色"],
    cover: "/previews/product.webp", image: "/assets/chair.jpg",
    palette: palettes.product,
    character: "银灰底色、橙色标记与产品档案式布局，以清楚的图版呈现形态和材料。",
    details: ["产品影像与技术标签", "结构清楚的设计档案", "材料、形态与使用场景叙事"],
    pages: ["产品设计首页", "家具概念研究", "设计方法与联系"],
  },
  {
    slug: "software", name: "流序", english: "RELAY", category: "product",
    description: "把清晰的工作流变成产品的第一印象。适合协作软件、开发工具与轻量科技产品。",
    tags: ["科技产品", "协作工具", "清透", "交互演示"],
    cover: "/previews/software.webp", image: "/assets/workspace.jpg",
    palette: palettes.software,
    character: "青蓝与墨色、精密的产品排版和可操作的任务演示，用真实交互说明产品。",
    details: ["可操作的工作流演示", "清楚的功能与场景叙事", "轻盈的科技产品语言"],
    pages: ["产品介绍首页", "工作流详情", "团队与联系"],
  },
  {
    slug: "cafe", name: "慢调", english: "SLOWBAR", category: "lifestyle",
    description: "把街角咖啡馆的温度带到屏幕上。复古招贴、真实咖啡影像与可浏览的风味菜单。",
    tags: ["复古咖啡", "餐饮品牌", "砖红", "菜单"],
    cover: "/previews/cafe.webp", image: "/assets/coffee.jpg",
    palette: palettes.cafe,
    character: "砖红与淡黄交织，衬线大字和菜单式构图，让品牌从第一眼就有自己的语气。",
    details: ["咖啡招贴式的品牌首屏", "可切换的风味菜单", "完整的门店与咖啡故事"],
    pages: ["咖啡品牌首页", "菜单与冲煮", "小店与联系"],
  },
  {
    slug: "music", name: "噪点", english: "OFFBEAT", category: "culture",
    description: "让活动信息像一张有节奏的音乐海报。适合独立音乐、现场企划与文化活动。",
    tags: ["音乐活动", "现场文化", "洋红", "海报"],
    cover: "/previews/music.webp", image: "/assets/concert.jpg",
    palette: palettes.music,
    character: "洋红、黑色与大胆排字组成鲜明的活动视觉，演出编排保持清楚可读。",
    details: ["高对比音乐海报首屏", "可切换的活动编排", "完整的企划与集体介绍"],
    pages: ["音乐活动首页", "活动编排", "集体与联系"],
  },
  {
    slug: "botanical", name: "青屿", english: "VERDANT", category: "lifestyle",
    description: "把一片绿色安放进日常。适合植物生活、花园工作室与空间绿植品牌。",
    tags: ["植物生活", "花园工作室", "薄荷绿", "自然"],
    cover: "/previews/botanical.webp", image: "/assets/leaves.jpg",
    palette: palettes.botanical,
    character: "深绿与薄荷色、柔和曲线和植物近景，形成舒展、轻盈的阅读节奏。",
    details: ["大幅植物近景与曲线构图", "可阅读的植物养护提示", "植物与空间的完整叙事"],
    pages: ["植物生活首页", "绿植与养护", "工作室与联系"],
  },
  {
    slug: "developer", name: "栈点", english: "STACK", category: "product",
    description: "用文件、代码和项目过程介绍自己。为开发者与技术创作者准备的深色作品集。",
    tags: ["开发者", "技术作品集", "终端", "琥珀"],
    cover: "/previews/developer.webp", image: "/assets/workspace.jpg",
    palette: palettes.developer,
    character: "炭黑底色、琥珀标记与等宽字体，让作品像一个可浏览的项目目录。",
    details: ["可切换的文件阅读器", "清楚的技术项目叙事", "统一的终端排版与导航"],
    pages: ["开发者首页", "项目案例", "关于与联系"],
  },
  {
    slug: "museum", name: "观物", english: "MUSE", category: "culture",
    description: "以策展的方式组织图像与文字。适合文化展馆、独立展览和艺术空间。",
    tags: ["文化展馆", "独立展览", "朱红", "宋体"],
    cover: "/previews/museum.webp", image: "/assets/museum-room.jpg",
    palette: palettes.museum,
    character: "朱红与近白、中文衬线和展览目录式编排，给作品留出安静而清楚的位置。",
    details: ["文化展览的策展式首屏", "完整的展览与作品介绍", "展馆理念与参观信息"],
    pages: ["展馆首页", "策展详情", "关于展馆"],
  },
  {
    "slug": "hotel",
    "name": "栖泊",
    "english": "HAVEN",
    "category": "lifestyle",
    "description": "用一整幅光影，开启一次慢下来的停留。适合精品旅宿、度假空间与民宿品牌。",
    "tags": [
        "精品旅宿",
        "度假空间",
        "满幅摄影",
        "房型"
    ],
    "image": "/assets/hotel-room.jpg",
    "character": "满幅酒店摄影、克制的叠字与房型图册，让空间的氛围先于介绍抵达。",
    "details": [
        "电影式满幅首屏",
        "可选择的房型与停留估算",
        "完整旅宿与目的地叙事"
    ],
    "pages": [
        "旅宿首页",
        "房型与停留",
        "关于与联系"
    ],
    "cover": "/previews/hotel.webp",
    "palette": palettes.hotel
  },
  {
    "slug": "dashboard",
    "name": "衡量",
    "english": "GAUGE",
    "category": "product",
    "description": "让数据有清楚的位置。带筛选、图表和表格的前端工作台，适合运营与数据产品。",
    "tags": [
        "数据仪表盘",
        "运营工作台",
        "蓝灰",
        "图表"
    ],
    "image": "/assets/workspace.jpg",
    "character": "窄侧栏、蓝灰层次与紧凑的信息密度，图表和统计随示例数据一起更新。",
    "details": [
        "完整侧栏应用布局",
        "联动统计与可筛选明细",
        "可下载的 CSV 数据"
    ],
    "pages": [
        "数据概览",
        "数据明细",
        "使用与设置"
    ],
    "cover": "/previews/dashboard.webp",
    "palette": palettes.dashboard
  },
  {
    "slug": "journal",
    "name": "页间",
    "english": "FOLIO",
    "category": "editorial",
    "description": "像翻开一本独立刊物。报头、多栏与长文阅读，适合杂志、专栏和内容出版。",
    "tags": [
        "独立刊物",
        "长文阅读",
        "报刊",
        "黑白"
    ],
    "image": "/assets/library.jpg",
    "character": "黑白印刷气质、密而有序的多栏版面与清楚的阅读层级，让内容成为页面的主角。",
    "details": [
        "多栏报刊式首页",
        "可筛选的文章目录",
        "完整专题长文与编辑部"
    ],
    "pages": [
        "刊物首页",
        "专题长文",
        "编辑部"
    ],
    "cover": "/previews/journal.webp",
    "palette": palettes.journal
  },
  {
    "slug": "wellness",
    "name": "余息",
    "english": "EASE",
    "category": "lifestyle",
    "description": "给日常留出一点活动与休息的时间。适合轻运动、瑜伽与身心生活工作室。",
    "tags": [
        "轻运动",
        "生活工作室",
        "粉杏",
        "课程表"
    ],
    "image": "/assets/wellness.jpg",
    "character": "粉杏色、圆润文字和舒展的运动影像，配合清楚的课程编排，带来轻松的浏览节奏。",
    "details": [
        "柔和运动海报构图",
        "日期与课程类型筛选",
        "练习介绍与工作室三页"
    ],
    "pages": [
        "轻运动首页",
        "课程与练习",
        "工作室与联系"
    ],
    "cover": "/previews/wellness.webp",
    "palette": palettes.wellness
  },
  {
    "slug": "playful",
    "name": "跳格",
    "english": "HOP",
    "category": "experimental",
    "description": "把每一个小方格，变成新的表达。鲜明色块与可编辑像素作品，适合创意工具和趣味作品集。",
    "tags": [
        "趣味像素",
        "创意工具",
        "色块",
        "可编辑"
    ],
    "image": "/assets/workspace.jpg",
    "character": "块状排字、硬边色块和原创像素画构成轻快的视觉语言，作品可以直接动手修改。",
    "details": [
        "像素与块状字体首屏",
        "键盘可用的像素编辑器",
        "实际 PNG 图片导出"
    ],
    "pages": [
        "像素作品首页",
        "像素创作工具",
        "创作与联系"
    ],
    "cover": "/previews/playful.webp",
    "palette": palettes.playful
  },
  {
    "slug": "education",
    "name": "一课",
    "english": "LESSON",
    "category": "product",
    "description": "从一门小课，开始持续学习。课程目录、章节阅读和进度标记组成完整学习前端。",
    "tags": [
        "在线课程",
        "学习工作区",
        "紫色",
        "章节"
    ],
    "image": "/assets/library.jpg",
    "character": "清楚的课程书架、紫色学习标记与章节侧栏，把发现内容与专注阅读放在同一套规则里。",
    "details": [
        "可筛选的课程目录",
        "可切换的章节阅读器",
        "学习完成标记与进度"
    ],
    "pages": [
        "课程目录",
        "学习工作区",
        "学习计划"
    ],
    "cover": "/previews/education.webp",
    "palette": palettes.education
  },
  {
    slug: "cinema", name: "回映", english: "REEL", category: "gallery",
    description: "像翻找一张熟悉的光盘。可拖动、翻面与浏览的三维影像收藏，适合电影、音乐与创意作品档案。",
    tags: ["3D光盘", "电影感", "交互画廊", "黑白", "Three.js"],
    cover: "/previews/cinema.webp", image: "/assets/coast.jpg", palette: palettes.cinema,
    character: "浅灰颗粒画布、斜向光盘轨道与随视角变化的金属背面，以克制排字把注意力留给影像。",
    details: ["可拖动与翻面的真实三维光盘", "键盘、触摸与作品索引", "完整作品详情与关于页面"],
    pages: ["光盘画廊", "映像详情", "关于与联系"],
  },
  {
    slug: "doodle", name: "漫游", english: "RAMBLE", category: "experimental",
    description: "让想法走出纸面。原创手绘世界里的小人、气泡与可放置的标记，把工作室变成一座灵感游乐场。",
    tags: ["手绘", "互动小人", "创意工作室", "黑白", "插画"],
    cover: "/previews/doodle.webp", image: "/assets/workspace.jpg", palette: palettes.doodle,
    character: "奶油纸面、松弛墨线与淡黄标记，围绕一盏巨型台灯展开可互动的插画场景。",
    details: ["原创台灯与游走人群", "气泡、标记和场景控制", "作品档案与工作室完整三页"],
    pages: ["灵感游乐场", "作品档案", "关于漫游"],
  },
  {
    slug: "depth", name: "纵深", english: "DEPTH", category: "gallery",
    description: "用滚动推动镜头，穿过文字、影像与立体画面。六段连续空间组成完整作品展，最终抵达项目索引。",
    tags: ["空间穿梭", "滚动叙事", "3D透视", "创意作品集", "沉浸式"],
    cover: "/previews/depth.webp", image: "/assets/architecture.jpg", palette: palettes.depth,
    character: "巨幅排字、立体设备与错落影像沿纵深排列，白场、摄影与黑场随镜头连续交替。",
    details: ["六章节完整空间穿梭", "章节导航与跳过体验", "项目详情和关于完整三页"],
    pages: ["空间作品展", "项目详情", "关于纵深"],
  },
];
export type Template = typeof templates[number];
export const getTemplate = (slug: string) => templates.find(template => template.slug === slug);
