import type { Metadata } from "next";
import "./globals.css";
import "./tokens.css";
import { site } from "@/config/site";

export const metadata: Metadata = { title: { default: "形集 FORME · 有性格的网站模板", template: "%s · 形集 FORME" }, description: site.description };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="zh-CN" data-scroll-behavior="smooth" suppressHydrationWarning><body>{children}</body></html>;
}
