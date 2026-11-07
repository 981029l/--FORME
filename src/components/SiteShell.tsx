import Link from "next/link";
import { ArrowUpRight, BookmarkSimple } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/config/site";
import { ThemeToggle } from "./ThemeToggle";
import { SiteNavigation } from "./SiteNavigation";
import "./platform.css";
export function Wordmark() { return <Link className="wordmark" href="/" aria-label={`${site.name} ${site.english} 首页`}><span className="brand-mark" aria-hidden="true" /><span>{site.name}<small>{site.english}</small></span></Link>; }
export function SiteShell({ children }: { children: React.ReactNode }) {
  return <div className="site-shell">
    <a className="skip-link" href="#main">跳到内容</a>
    <header className="site-header"><Wordmark /><SiteNavigation /><div className="nav-actions"><ThemeToggle /><Link className="saved-link" href="/templates?view=favorites" aria-label="我的收藏"><BookmarkSimple size={18} aria-hidden="true" /><span>我的收藏</span></Link></div></header>
    {children}
    <footer className="site-footer"><div className="footer-top"><div className="footer-signature"><span>一个起点，无数种表达。</span><Link href="/templates">找到你的形状。<ArrowUpRight weight="light" /></Link></div><div className="footer-links"><Link href="/guide">从这里开始<ArrowUpRight size={16} /></Link><Link href="/feedback">留下一点想法<ArrowUpRight size={16} /></Link></div></div><div className="footer-bottom"><Wordmark /><span>© 2026 FORME</span><div><Link href="/guide#license">使用与许可</Link><Link href="/sources">来源说明</Link></div><span className="footer-colophon">为有想法的作品而造。</span></div></footer>
  </div>;
}
