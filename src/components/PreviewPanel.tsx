"use client";
import { useEffect, useRef, useState } from "react";
import { Desktop, DeviceMobile, ArrowUpRight } from "@phosphor-icons/react";
import { site } from "@/config/site";
export function PreviewPanel({ slug, name, pages = ["首页", "项目", "关于"] }: { slug: string; name: string; pages?: readonly string[] }) {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [screen, setScreen] = useState(0);
  const [width, setWidth] = useState(1100);
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => { const observer = new ResizeObserver(entries => setWidth(entries[0].contentRect.width)); if (container.current) observer.observe(container.current); return () => observer.disconnect(); }, []);
  const target = site.viewport[device];
  const scale = Math.min(width / target, 1);
  const source = `/preview/${slug}${screen === 1 ? "/project" : screen === 2 ? "/about" : ""}`;
  return <section className="preview-panel" aria-label={`${name}交互预览`}><div className="preview-toolbar"><div className="device-tabs" role="group" aria-label="预览设备"><button aria-pressed={device === "desktop"} onClick={() => setDevice("desktop")}><Desktop size={19} />桌面</button><button aria-pressed={device === "mobile"} onClick={() => setDevice("mobile")}><DeviceMobile size={19} />手机</button></div><a href={source} target="_blank" rel="noreferrer">完整预览 <ArrowUpRight size={17} /></a></div><div className="preview-page-tabs" role="group" aria-label="预览页面">{pages.map((page, index) => <button key={page} onClick={() => setScreen(index)} aria-pressed={screen === index}><span>{String(index + 1).padStart(2, "0")}</span>{page}</button>)}</div><div className={`preview-canvas ${device}`} ref={container}><div className="preview-window" style={{ width: target * scale, height: site.viewport.height * scale }}><iframe title={`${name} · ${pages[screen]} · ${device === "desktop" ? "桌面" : "手机"}预览`} src={source} style={{ width: target, height: site.viewport.height, transform: `scale(${scale})` }} /></div></div><p className="preview-help">这是可以操作的真实页面。切换设备与页面，找到适合自己的表达。</p></section>;
}
