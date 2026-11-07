import { SiteShell } from "@/components/SiteShell";
import { FeedbackForm } from "@/components/FeedbackForm";
export const metadata = { title: "反馈" };
export default function Feedback() { return <SiteShell><main id="main" className="document section-wrap"><div className="document-heading"><p className="eyebrow">反馈</p><h1>好的设计，<br />也需要真实的声音。</h1><p>分享您使用模板的经历，让下一次改进更具体。</p></div><FeedbackForm /></main></SiteShell>; }
