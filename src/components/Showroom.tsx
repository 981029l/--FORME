"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { featuredTemplates, showroom, showroomCategories, showroomTemplateCount } from "@/content/showroom";
import "./showroom.css";

gsap.registerPlugin(useGSAP);

type Selection = { index: number; previous: number | null; direction: number; revision: number };
type Gesture = { id: number; x: number; y: number; axis: "x" | "y" | null };

export function Showroom() {
  const root = useRef<HTMLDivElement>(null);
  const gesture = useRef<Gesture | null>(null);
  const [selection, setSelection] = useState<Selection>({ index: 0, previous: null, direction: 1, revision: 0 });
  const count = featuredTemplates.length;
  const selected = featuredTemplates[selection.index];
  const previous = selection.previous === null ? null : featuredTemplates[selection.previous];
  const before = featuredTemplates[(selection.index + count - 1) % count];
  const after = featuredTemplates[(selection.index + 1) % count];
  const number = (index: number) => String(index + 1).padStart(2, "0");

  const select = (value: number, relative = false) => {
    setSelection(current => {
      const index = ((relative ? current.index + value : value) % count + count) % count;
      if (index === current.index) return current;
      return { index, previous: current.index, direction: relative ? Math.sign(value) : Math.sign(index - current.index), revision: current.revision + 1 };
    });
  };

  useGSAP(() => {
    if (!selection.revision) return;
    const media = gsap.matchMedia();
    let completed = false;
    const finish = () => {
      completed = true;
      setSelection(current => current.revision === selection.revision ? { ...current, previous: null } : current);
    };
    media.add({ motion: "(prefers-reduced-motion: no-preference)", reduce: "(prefers-reduced-motion: reduce)" }, context => {
      if (completed) return;
      if (context.conditions?.reduce) { finish(); return; }
      const timeline = gsap.timeline({ defaults: { ease: showroom.motion.ease }, onComplete: finish });
      timeline
        .addLabel("change", 0)
        .fromTo(".showroom-outgoing", { xPercent: 0, scale: 1, autoAlpha: 1 }, { xPercent: selection.direction * -15, scale: 0.96, autoAlpha: 0, duration: showroom.motion.duration * 0.75 }, "change")
        .fromTo(".showroom-current", { xPercent: selection.direction * 16, scale: 0.96, autoAlpha: 0 }, { xPercent: 0, scale: 1, autoAlpha: 1, duration: showroom.motion.duration }, "change+=0.05")
        .fromTo(".showroom-workmark-text", { yPercent: 65, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: showroom.motion.textDuration }, "change+=0.06")
        .fromTo(".showroom-copy-part", { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: showroom.motion.textDuration, stagger: showroom.motion.stagger }, `change+=${showroom.motion.textDelay}`)
        .fromTo(".showroom-peek-image", { x: selection.direction * 18, autoAlpha: 0.2 }, { x: 0, autoAlpha: 0.65, duration: showroom.motion.duration }, "change");
    }, root);
    return () => media.revert();
  }, { scope: root, dependencies: [selection.revision], revertOnUpdate: true });

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.altKey || event.ctrlKey || event.metaKey || (event.target as HTMLElement).closest("a, input, textarea, select")) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      select(event.key === "ArrowLeft" ? -1 : 1, true);
    }
  };

  const resetGesture = (element: HTMLDivElement) => {
    gesture.current = null;
    element.dataset.dragging = "false";
    element.style.removeProperty("--showroom-drag-x");
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || event.button !== 0 || (event.target as HTMLElement).closest("button, a, input, select, textarea")) return;
    gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY, axis: null };
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const current = gesture.current;
    if (!current || current.id !== event.pointerId) return;
    const x = event.clientX - current.x;
    const y = event.clientY - current.y;
    if (!current.axis && Math.max(Math.abs(x), Math.abs(y)) > showroom.gesture.intentDistance) {
      current.axis = Math.abs(x) > Math.abs(y) * showroom.gesture.axisRatio ? "x" : "y";
      if (current.axis === "x") event.currentTarget.setPointerCapture(event.pointerId);
    }
    if (current.axis !== "x") return;
    event.currentTarget.dataset.dragging = "true";
    const offset = Math.max(-showroom.gesture.maxOffset, Math.min(showroom.gesture.maxOffset, x * showroom.gesture.resistance));
    event.currentTarget.style.setProperty("--showroom-drag-x", `${offset}px`);
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const current = gesture.current;
    if (!current || current.id !== event.pointerId) return;
    const x = event.clientX - current.x;
    const y = event.clientY - current.y;
    if (current.axis === "x" && Math.abs(x) > showroom.gesture.swipeDistance && Math.abs(x) > Math.abs(y) * showroom.gesture.axisRatio) select(x < 0 ? 1 : -1, true);
    resetGesture(event.currentTarget);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return <div className="showroom" ref={root}>
    <section className="showroom-intro">
      <div><h1>{showroom.title.map(part => <span key={part}>{part}</span>)}</h1><p>{showroom.introduction}</p></div>
      <Link className="showroom-library-link" href={showroom.libraryHref}>进入模板库 <span>{showroomTemplateCount}</span><ArrowUpRight size={22} /></Link>
    </section>

    <section className="showroom-exhibit" aria-label="精选模板展馆" aria-roledescription="轮播图" onKeyDown={onKeyDown} data-active-slug={selected.slug} data-transitioning={selection.previous !== null}>
      <div className="showroom-exhibit-top"><p>本期精选 <span>CURATED SELECTION</span></p><div className="showroom-arrows"><button type="button" onClick={() => select(-1, true)} aria-label="上一件作品"><ArrowLeft size={21} /></button><button type="button" onClick={() => select(1, true)} aria-label="下一件作品"><ArrowRight size={21} /></button></div></div>
      <div className="showroom-workmark" aria-hidden="true"><span className="showroom-workmark-text">{selected.english}</span><span className="showroom-workmark-number"><strong>{number(selection.index)}</strong><span>/ {String(count).padStart(2, "0")}</span></span></div>

      <div className="showroom-stage" tabIndex={0} role="group" aria-label={`${selected.name}模板，左右方向键或横向拖动切换作品`} aria-describedby="showroom-instructions" data-dragging="false" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={event => resetGesture(event.currentTarget)} onLostPointerCapture={event => resetGesture(event.currentTarget)}>
        <button type="button" className="showroom-peek showroom-peek-before" onClick={() => select(-1, true)} aria-label={`上一件：${before.name} ${before.english}`} tabIndex={-1}><img className="showroom-peek-image" src={before.cover} alt="" width={1440} height={1000} draggable={false} /><span>{before.english} <ArrowLeft size={17} /></span></button>
        <div className="showroom-frame"><div className="showroom-drag-frame">
          {previous && <img className="showroom-artwork showroom-outgoing" src={previous.cover} alt="" aria-hidden="true" width={1440} height={1000} draggable={false} />}
          <img key={selected.slug} className="showroom-artwork showroom-current" src={selected.cover} alt={`${selected.name} ${selected.english} 模板首页预览`} width={1440} height={1000} draggable={false} fetchPriority="high" />
        </div></div>
        <button type="button" className="showroom-peek showroom-peek-after" onClick={() => select(1, true)} aria-label={`下一件：${after.name} ${after.english}`} tabIndex={-1}><img className="showroom-peek-image" src={after.cover} alt="" width={1440} height={1000} draggable={false} /><span>{after.english} <ArrowRight size={17} /></span></button>
      </div>

      <div className="showroom-selected-info">
        <div className="showroom-copy"><div className="showroom-copy-part showroom-name"><h2>{selected.name}</h2><span>{selected.tags[0]} / {selected.tags[1]}</span></div><p className="showroom-copy-part">{selected.description}</p></div>
        <div className="showroom-actions"><Link href={`/templates/${selected.slug}`} className="showroom-detail-link">查看这套模板 <ArrowUpRight size={20} /></Link><Link href={`/preview/${selected.slug}`} target="_blank" rel="noopener noreferrer" className="showroom-preview-link">完整预览 <ArrowUpRight size={14} /><span className="sr-only">（新窗口）</span></Link></div>
      </div>

      <div className="showroom-bottom"><p id="showroom-instructions">左右拖动，换一种表达。<span>也可使用方向键或下方索引</span></p><div className="showroom-thumbnails" role="group" aria-label="选择精选作品">{featuredTemplates.map((template, index) => <button type="button" key={template.slug} className="showroom-thumbnail" onClick={() => select(index)} aria-label={`选择第 ${number(index)} 件作品：${template.name}`} aria-pressed={index === selection.index} data-slug={template.slug}><span className="showroom-thumbnail-image"><img src={template.cover} width={1440} height={1000} alt="" loading="lazy" draggable={false} /></span><span>{number(index)}</span></button>)}</div><span className="showroom-total">{String(count).padStart(2, "0")} 件精选作品</span></div>
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">第 {selection.index + 1} 件，共 {count} 件：{selected.name}，{selected.english}。</p>
    </section>

    <section className="showroom-categories" aria-labelledby="showroom-categories-title">
      <div className="showroom-category-intro"><h2 id="showroom-categories-title">下一种表达，<br />由您挑选。</h2><p>{showroomTemplateCount} 套完整网站，从喜欢的风格开始。</p><Link href={showroom.libraryHref}>浏览全部模板 <ArrowRight size={20} /></Link></div>
      <div className="showroom-category-grid">{showroomCategories.map(category => <Link className="showroom-category" key={category.id} href={`${showroom.libraryHref}?category=${category.id}`}><span>{category.label}<small>{String(category.count).padStart(2, "0")}</small></span><ArrowUpRight size={21} /></Link>)}</div>
    </section>
  </div>;
}
