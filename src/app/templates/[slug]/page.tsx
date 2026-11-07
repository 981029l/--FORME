import { notFound } from "next/navigation";
import Link from "next/link";
import { DownloadSimple, ArrowUpRight, Check } from "@phosphor-icons/react/dist/ssr";
import { templates, getTemplate } from "@/content/templates";
import { SiteShell } from "@/components/SiteShell";
import { PreviewPanel } from "@/components/PreviewPanel";
import { CatalogBackLink } from "@/components/CatalogBackLink";
import { Suspense } from "react";
export function generateStaticParams() { return templates.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return { title: `${getTemplate(slug)?.name ?? "模板"}完整网站模板` }; }
export default async function TemplateDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const template = getTemplate(slug);
  if (!template) notFound();
  return <SiteShell><main id="main" className="detail-main section-wrap"><Suspense fallback={<Link className="back-link" href="/templates">返回模板库</Link>}><CatalogBackLink /></Suspense><div className="detail-heading"><div><div className="detail-kicker"><span>ARCHIVE / {String(templates.findIndex(item => item.slug === slug) + 1).padStart(2, "0")}</span>{template.tags.slice(0, 2).join(" / ")}</div><h1>{template.name}<span>{template.english}</span></h1><p>{template.description}</p></div><div className="detail-download"><a className="button button-dark" href={`/downloads/${slug}.zip`} download><DownloadSimple size={20} />下载完整模板</a><span>免费使用 · 含源码与设计规范</span></div></div><PreviewPanel slug={slug} name={template.name} pages={template.pages} /><div className="detail-content"><section><h2>这套设计的性格</h2><p className="detail-character">{template.character}</p><div className="color-samples">{template.palette.map(color => <div key={color}><i style={{ backgroundColor: color }} /><code>{color.toUpperCase()}</code></div>)}</div><ul className="plain-list">{template.details.map(item => <li key={item}><Check size={19} />{item}</li>)}</ul></section><section><h2>拿到手，就能继续。</h2><p>在线预览与下载包使用同一份模板代码。页面内容集中管理，方便替换为您的项目。</p><div className="package-pages">{template.pages.map((page, index) => <a href={`/preview/${slug}${index === 1 ? "/project" : index === 2 ? "/about" : ""}`} target="_blank" rel="noreferrer" key={page}>{page}<ArrowUpRight size={19} /></a>)}</div><p className="muted">下载包包含 README、设计规范、AI 修改说明和素材来源。演示品牌与项目为虚构示例。</p><Link className="text-link" href="/guide">查看开始使用的方法 <ArrowUpRight size={18} /></Link></section></div></main></SiteShell>;
}
