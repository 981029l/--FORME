"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Desktop, DeviceMobile, DownloadSimple, X } from "@phosphor-icons/react";
import { type Template } from "@/content/templates";
import { catalogConfig } from "@/content/catalog";
import { site } from "@/config/site";
import { captureCatalogPosition } from "@/lib/catalog-session";

type QuickPreviewProps = { template: Template; catalogUrl: string; trigger: HTMLButtonElement; onClose: () => void };

export function QuickPreview({ template, catalogUrl, trigger, onClose }: QuickPreviewProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const iframe = useRef<HTMLIFrameElement>(null);
  const frameCleanup = useRef<(() => void) | null>(null);
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [size, setSize] = useState<{ width: number; height: number }>({ width: catalogConfig.preview.initialWidth, height: site.viewport.height });
  const { text } = catalogConfig;
  const target = site.viewport[device];
  const scale = Math.min(size.width / target, 1);

  useEffect(() => {
    const modal = dialog.current;
    if (!modal) return;
    const previousOverflow = document.body.style.overflow;
    modal.showModal();
    document.body.style.overflow = "hidden";
    const observer = new ResizeObserver(entries => { const { width, height } = entries[0].contentRect; if (width && height) setSize({ width, height }); });
    if (stage.current) observer.observe(stage.current);
    return () => {
      observer.disconnect();
      frameCleanup.current?.();
      if (modal.open) modal.close();
      document.body.style.overflow = previousOverflow;
      if (trigger.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [trigger]);

  function close() { dialog.current?.close(); }
  function bindFrameEscape() {
    frameCleanup.current?.();
    const frameWindow = iframe.current?.contentWindow;
    if (!frameWindow) return;
    const handleEscape = (event: KeyboardEvent) => { if (event.key === "Escape") { event.preventDefault(); close(); } };
    frameWindow.addEventListener("keydown", handleEscape);
    frameCleanup.current = () => frameWindow.removeEventListener("keydown", handleEscape);
  }

  return <dialog ref={dialog} className="quick-preview" aria-labelledby={catalogConfig.preview.titleId} aria-describedby={catalogConfig.preview.descriptionId} onClose={() => { if (!dialog.current?.open) onClose(); }} onCancel={event => { event.preventDefault(); close(); }} onClick={event => { if (event.target === event.currentTarget) close(); }}>
    <div className="quick-preview-content">
      <header className="quick-preview-header"><div className="quick-preview-name"><p>{text.preview}</p><h2 id={catalogConfig.preview.titleId}>{template.name}<span>{template.english}</span></h2></div><div className="quick-preview-devices" role="group" aria-label={text.previewDevice}><button type="button" aria-pressed={device === "desktop"} onClick={() => setDevice("desktop")}><Desktop size={18} aria-hidden="true" /><span>{text.desktop}</span></button><button type="button" aria-pressed={device === "mobile"} onClick={() => setDevice("mobile")}><DeviceMobile size={18} aria-hidden="true" /><span>{text.mobile}</span></button></div><button className="quick-preview-close" type="button" aria-label={text.closePreview} onClick={close} autoFocus><X size={22} aria-hidden="true" /></button></header>
      <p className="quick-preview-description" id={catalogConfig.preview.descriptionId}>{template.description}</p>
      <div className={`quick-preview-stage is-${device}`} ref={stage}><div className="quick-preview-window" style={{ width: target * scale, height: size.height }}><iframe ref={iframe} onLoad={bindFrameEscape} title={`${template.name}${device === "desktop" ? text.desktop : text.mobile}${text.preview}`} src={`${catalogConfig.previewPath}/${template.slug}`} style={{ width: target, height: size.height / scale, transform: `scale(${scale})` }} /></div></div>
      <footer className="quick-preview-footer"><Link className="quick-preview-detail" href={`${catalogConfig.path}/${template.slug}?from=${encodeURIComponent(catalogUrl)}`} onClick={() => captureCatalogPosition(catalogUrl)}>{text.details}<ArrowRight size={17} aria-hidden="true" /></Link><span className="quick-preview-help">{text.previewHelp}</span><div><a href={`${catalogConfig.previewPath}/${template.slug}`} target="_blank" rel="noreferrer">{text.fullPreview}<ArrowUpRight size={16} aria-hidden="true" /></a><a className="quick-preview-download" href={`${catalogConfig.downloadPath}/${template.slug}.zip`} download><DownloadSimple size={17} aria-hidden="true" />{text.download}</a></div></footer>
    </div>
  </dialog>;
}
