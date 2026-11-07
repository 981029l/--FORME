"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { List, ArrowUpRight } from "@phosphor-icons/react";
import { site } from "@/config/site";

export function SiteNavigation() {
  const pathname = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);
  const links = site.navigation.map(item => <Link href={item.href} key={item.href} aria-current={pathname === item.href || (item.href === "/templates" && pathname.startsWith("/templates/")) ? "page" : undefined} onClick={() => { if (menu.current) menu.current.open = false; }}>{item.label}<span aria-hidden="true">↗</span></Link>);
  return <><nav className="desktop-navigation" aria-label="主导航">{links}</nav><details className="mobile-menu" ref={menu}><summary aria-label="展开主导航"><List size={22} /></summary><nav aria-label="手机主导航">{links}<Link href="/templates?view=favorites" onClick={() => { if (menu.current) menu.current.open = false; }}>我的收藏<ArrowUpRight size={16} /></Link></nav></details></>;
}
