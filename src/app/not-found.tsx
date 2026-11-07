import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";
export default function NotFound() { return <SiteShell><main id="main" className="not-found"><h1>这个页面还没有形状。</h1><p>链接可能已经改变，可以回模板库继续浏览。</p><Link href="/templates" className="button button-dark">返回模板库</Link></main></SiteShell>; }
