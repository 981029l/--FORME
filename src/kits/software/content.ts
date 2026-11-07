export const content = {
  brand: "流序", wordmark: "relay", email: "hello@relay.example",
  nav: { home: "产品", project: "工作流", about: "关于流序", contact: "联系" },
  accessibility: { skip: "跳至内容", home: "relay 流序 首页", navigation: "主导航", workflow: "可操作的工作流演示", filters: "筛选任务", complete: "标记完成", reopen: "重新打开" },
  home: {
    label: "为小团队，理清每一步。", title: ["想法向前，", "协作有序。"],
    intro: "把零散的想法、待办与交接，放进同一个清晰的工作流。", action: "体验工作流", secondary: "了解流序",
    flowTitle: "每一步，都接得住。", flowBody: "从一句想法，到一件完成的事。让下一步始终清楚。",
    steps: [
      { number: "01", title: "收集", text: "先留下想法，不打断手上的工作。", detail: "一个入口" },
      { number: "02", title: "理清", text: "补齐背景，明确这件事的完成标准。", detail: "一份共识" },
      { number: "03", title: "推进", text: "认领下一步，让状态跟上实际进展。", detail: "一次交接" },
      { number: "04", title: "收尾", text: "检查结果，把经验留给下一次。", detail: "一个闭环" },
    ],
    storyTitle: ["少一点来回确认。", "多一点专注时间。"], storyBody: "工作不必占满每一个窗口。我们想让背景、进展和决定留在事情旁边，让人安心回到真正要做的事。", storyAction: "了解流序",
  },
  demo: {
    label: "交互演示", name: "一次网站更新", workspace: "工作空间", projectLabel: "当前项目", taskLabel: "任务清单", description: "勾选任务，看看进展如何改变。",
    filters: [{ id: "all", label: "全部" }, { id: "open", label: "待完成" }, { id: "done", label: "已完成" }],
    tasks: [
      { id: "brief", title: "明确这次更新的目标", detail: "范围与完成标准", owner: "策划" },
      { id: "content", title: "整理首页内容", detail: "标题、描述与素材", owner: "内容" },
      { id: "review", title: "检查移动端体验", detail: "阅读、导航与交互", owner: "设计" },
      { id: "publish", title: "完成发布前检查", detail: "链接、图片与联系方式", owner: "开发" },
    ],
    initialCompleted: ["brief"], completeLabel: "已完成", totalLabel: "项任务", reset: "重置演示", resetStatus: "演示已恢复到初始状态。", updatedStatus: "任务状态已更新。", empty: "这个视图里暂时没有任务。", emptyHelp: "切换筛选，或重置演示重新体验。", local: "改动仅保留在当前页面，不会提交任何数据。", noteTitle: "这次更新的共识", note: "先把内容讲清楚，再让页面更好用。每个任务都能回到同一个目标。",
  },
  project: {
    label: "工作流 / 网站更新", title: ["从一个想法，", "到一次完成。"], intro: "用一个小项目，体验流序如何把目标、分工与进展放在一起。",
    facts: [{ label: "演示场景", value: "小团队网站更新" }, { label: "工作方式", value: "明确目标，再推进任务" }, { label: "体验范围", value: "浏览器中的本地演示" }],
    demoTitle: "亲手推进这件事。", demoBody: "任务可以反复打开或完成。筛选只改变视图，不会丢掉你的进展。",
    decisionsTitle: "流程简单，事情清楚。", decisions: [
      { title: "先给任务一个背景", text: "目标写在清单旁边。接手的人可以知道为什么做，再决定怎样做。" },
      { title: "状态由实际行动决定", text: "完成一项，就勾选一项。进展随任务更新，需要复核的事项也能重新打开。" },
      { title: "把结束也设计进去", text: "发布前检查是一个明确任务。清单完成后，仍然可以重新打开需要复核的事项。" },
    ],
    scopeTitle: "完成，也是一种好交接。", scopeBody: "一张清楚的清单，留下这次做了什么，也提醒下一次从哪里开始。让每一次收尾，都成为下一步的起点。", back: "回到产品",
  },
  about: {
    label: "关于流序", title: ["让工具退后。", "让事情向前。"], intro: "流序关心清晰的协作。从日常工作里最小的一次交接开始，让每个人更容易找到下一步。",
    storyTitle: "我们关心的，是下一步。", storyBody: "一个想法记在哪里？一项任务由谁接手？一次修改怎样才算结束？当这些问题有了清楚的答案，团队就能把注意力留给内容本身。",
    principles: [
      { title: "清楚，比复杂更有用。", text: "先说清楚目标，再选择工具。每一个界面元素，都应该帮助人理解当前这件事。" },
      { title: "进展，应当看得见。", text: "从待办到完成，状态有明确含义，也允许返回。让调整成为工作自然的一部分。" },
      { title: "协作，需要留一点空间。", text: "让信息可以被找到，让交接可以被理解，也让人不必时刻盯着一个窗口。" },
    ],
    scopeTitle: "把信息，放在事情旁边。", scope: [{ label: "开始之前", value: "明确目标，也留好背景。" }, { label: "推进之中", value: "看清任务，知道下一步。" }, { label: "完成之后", value: "复核结果，让交接更安心。" }],
  },
  images: { workspace: { src: "/assets/workspace.jpg", alt: "浅色木质桌面上的银色笔记本电脑，屏幕为深色", caption: "为专注留出空间。" } },
  contact: { title: "把下一步，聊清楚。", intro: "从一个具体的问题开始。", label: "演示联系邮箱", copy: "复制演示邮箱", copied: "演示邮箱已复制。", fallback: "无法自动复制，请选中邮箱手动复制。", note: "流序 RELAY 为虚构产品，项目与联系信息仅作模板演示。", signature: "想法 / 行动 / 完成" },
} as const;
