import { Suspense } from "react";
import { SiteShell } from "@/components/SiteShell";
import { Catalog } from "@/components/Catalog";

export const metadata = { title: "模板库", description: "浏览形集的完整网站模板，按风格筛选、预览与收藏，找到自己的创作起点。" };

export default function Templates() {
  return <SiteShell><main id="main"><Suspense fallback={<div className="library-loading section-wrap" role="status"><span>THE COLLECTION</span><h1>正在打开模板库。</h1></div>}><Catalog /></Suspense></main></SiteShell>;
}
