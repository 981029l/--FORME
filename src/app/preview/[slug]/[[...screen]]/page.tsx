import { notFound } from "next/navigation";
import { KitRenderer } from "@/components/KitRenderer";
import { templates, getTemplate } from "@/content/templates";
import type { TemplatePage } from "@/kits/types";
export function generateStaticParams() { return templates.flatMap(({ slug }) => [ { slug, screen: [] }, { slug, screen: ["project"] }, { slug, screen: ["about"] } ]); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return { title: `${getTemplate(slug)?.name ?? "模板"}演示` }; }
export default async function Preview({ params }: { params: Promise<{ slug: string; screen?: string[] }> }) {
  const { slug, screen = [] } = await params;
  if (!getTemplate(slug) || screen.length > 1 || (screen[0] && !["project", "about"].includes(screen[0]))) notFound();
  return <KitRenderer slug={slug} page={(screen[0] ?? "home") as TemplatePage} />;
}
