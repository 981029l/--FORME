"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { content as c, type DeviceKind, type Project } from "./content";

type PlaneProps = { children: ReactNode; x: number; y: number; z?: number; width?: string; height?: string; rx?: number; ry?: number; rz?: number; className?: string };

function Plane({ children, x, y, z = 0, width, height, rx = 0, ry = 0, rz = 0, className = "" }: PlaneProps) {
  const style = { left: `${x}%`, top: `${y}%`, width, height, "--dp-z": `${z}px`, "--dp-rx": `${rx}deg`, "--dp-ry": `${ry}deg`, "--dp-rz": `${rz}deg` } as CSSProperties;
  return <div className={`dp-layer ${className}`} data-depth={z} style={style}>{children}</div>;
}

export function Phone({ kind, project }: { kind: DeviceKind; project?: Project }) {
  const device = project ? { wordmark: project.title, eyebrow: c.common.disclosure, title: project.name, caption: project.category, action: c.common.view, image: project.image } : c.devices[kind];
  return <div className={`dp-phone dp-phone-${kind}`}><div className="dp-phone-edge" /><div className="dp-phone-back" /><div className="dp-phone-front"><div className="dp-phone-screen"><img src={device.image} alt="" width={800} height={1200} loading="eager" draggable="false" /><div className="dp-phone-island" /><div className="dp-phone-status"><span>9:41</span><span>● ▰</span></div><div className="dp-phone-brand"><strong>{device.wordmark}</strong><span>☰</span></div><div className="dp-phone-copy"><span>{device.eyebrow}</span><strong>{device.title}</strong><p>{device.caption}</p></div><div className="dp-phone-action"><span>{device.action}</span><i>↗</i></div><div className="dp-phone-home" /></div></div></div>;
}

function Photo({ src, className = "", position = "center" }: { src: string; className?: string; position?: string }) {
  return <img className={`dp-photo ${className}`} src={src} alt="" width={1600} height={1067} loading="eager" decoding="async" draggable="false" style={{ objectPosition: position }} />;
}

function Words({ chapter }: { chapter: number }) { return c.chapters[chapter].title.split("\n").map(line => <span key={line}>{line}</span>); }

function World() {
  return <>
    <div className="dp-world-chapter dp-world-arrival" data-world-chapter="0" style={{ transform: "translateZ(0px)" }}>
      <Plane x={50} y={45} z={-180} className="dp-display dp-display-arrival"><Words chapter={0} /></Plane>
      <Plane x={20} y={54} z={170} rx={17} ry={-24} rz={-21} className="dp-device dp-arrival-left"><Phone kind="form" /></Plane>
      <Plane x={79} y={50} z={255} rx={-9} ry={-24} rz={15} className="dp-device dp-arrival-right"><Phone kind="coast" /></Plane>
      <Plane x={50} y={20} z={-20} className="dp-world-eyebrow">{c.home.eyebrow}</Plane>
      <Plane x={50} y={77} z={-100} className="dp-world-intro">{c.home.intro}</Plane>
      <Plane x={9} y={37} z={-270} className="dp-orbit dp-orbit-small"><span /></Plane>
    </div>
    <div className="dp-world-chapter dp-world-form" data-world-chapter="1" style={{ transform: `translateZ(-${c.scene.chapterDepth}px)` }}>
      <Plane x={25} y={48} z={120} width="37vw" height="56vh" ry={16} rz={-7} className="dp-image-plane dp-form-photo"><Photo src="/assets/architecture.jpg" /><span className="dp-photo-label">{c.sceneCopy.formPhoto}</span></Plane>
      <Plane x={74} y={48} z={230} width="27vw" height="55vh" ry={-15} rz={9} className="dp-form-poster"><span>{c.posters.label}</span><strong>{c.posters.form}</strong><span>{c.sceneCopy.formPoster}</span></Plane>
      <Plane x={49} y={48} z={-340} className="dp-display dp-display-form"><Words chapter={1} /></Plane>
      <Plane x={49} y={79} z={-40} className="dp-world-note">{c.sceneCopy.formNote}</Plane>
      <Plane x={6} y={63} z={-360} width="18vw" height="26vh" rz={-9} className="dp-image-plane dp-form-second"><Photo src="/assets/desert.jpg" /></Plane>
    </div>
    <div className="dp-world-chapter dp-world-tide" data-world-chapter="2" style={{ transform: `translateZ(-${c.scene.chapterDepth * 2}px)` }}>
      <Plane x={50} y={50} z={-280} width="106vw" height="108vh" className="dp-image-plane dp-ocean-window"><Photo src="/assets/coast.jpg" /></Plane>
      <Plane x={50} y={46} z={50} className="dp-display dp-display-tide"><Words chapter={2} /></Plane>
      <Plane x={22} y={70} z={230} width="24vw" height="27vh" ry={15} rz={-10} className="dp-image-plane dp-tide-inset"><Photo src="/assets/hotel-pool.jpg" /><span className="dp-photo-label">{c.sceneCopy.tidePhoto}</span></Plane>
      <Plane x={81} y={39} z={160} rx={10} ry={-18} rz={12} className="dp-device dp-tide-phone"><Phone kind="coast" /></Plane>
      <Plane x={50} y={77} z={-90} className="dp-world-note dp-light">{c.sceneCopy.tideNote}</Plane>
      <Plane x={50} y={50} z={400} className="dp-orbit dp-orbit-tide"><span /></Plane>
    </div>
    <div className="dp-world-chapter dp-world-human" data-world-chapter="3" style={{ transform: `translateZ(-${c.scene.chapterDepth * 3}px)` }}>
      <Plane x={22} y={47} z={130} width="27vw" height="66vh" ry={18} rz={-8} className="dp-image-plane dp-human-portrait"><Photo src="/assets/portrait.jpg" position="50% 34%" /><span className="dp-photo-label">{c.sceneCopy.humanPhoto}</span></Plane>
      <Plane x={76} y={54} z={265} width="29vw" height="54vh" ry={-14} rz={7} className="dp-image-plane dp-human-fashion"><Photo src="/assets/fashion.jpg" position="60% center" /><span className="dp-photo-label">{c.sceneCopy.humanFashion}</span></Plane>
      <Plane x={50} y={43} z={-340} className="dp-display dp-display-human"><Words chapter={3} /></Plane>
      <Plane x={48} y={76} z={0} className="dp-human-stamp"><span>{c.posters.humanCaption}</span><strong>{c.sceneCopy.humanStamp}</strong></Plane>
      <Plane x={52} y={19} z={-120} width="13vw" height="18vh" rz={-11} className="dp-image-plane dp-human-detail"><Photo src="/assets/concert.jpg" /></Plane>
    </div>
    <div className="dp-world-chapter dp-world-night" data-world-chapter="4" style={{ transform: `translateZ(-${c.scene.chapterDepth * 4}px)` }}>
      <Plane x={46} y={44} z={-170} className="dp-display dp-display-night"><Words chapter={4} /></Plane>
      <Plane x={26} y={55} z={110} width="36vw" height="45vh" ry={15} rz={-10} className="dp-image-plane dp-night-photo"><Photo src="/assets/hotel-room.jpg" /><span className="dp-photo-label">{c.sceneCopy.nightPhoto}</span></Plane>
      <Plane x={77} y={48} z={230} rx={-6} ry={-26} rz={17} className="dp-device dp-night-phone"><Phone kind="night" /></Plane>
      <Plane x={51} y={51} z={-20} rx={54} rz={-25} className="dp-orbit dp-orbit-night"><span /></Plane>
      <Plane x={50} y={79} z={-100} className="dp-world-note dp-light">{c.sceneCopy.nightNote}</Plane>
    </div>
    <div className="dp-world-chapter dp-world-possibility" data-world-chapter="5" style={{ transform: `translateZ(-${c.scene.chapterDepth * 5}px)` }}>
      <Plane x={50} y={47} z={-210} className="dp-display dp-display-end"><Words chapter={5} /></Plane>
      <Plane x={50} y={46} z={-650} rz={45} className="dp-open-frame"><span /></Plane>
      <Plane x={15} y={37} z={270} width="24vw" height="31vh" ry={16} rz={-12} className="dp-image-plane dp-end-left"><Photo src="/assets/desert.jpg" /></Plane>
      <Plane x={85} y={59} z={130} width="22vw" height="38vh" ry={-15} rz={12} className="dp-image-plane dp-end-right"><Photo src="/assets/forest.jpg" /></Plane>
      <Plane x={51} y={81} z={80} className="dp-world-note dp-light">{c.posters.small}</Plane>
      <Plane x={50} y={48} z={-970} className="dp-end-message">{c.posters.end}<span>↓</span></Plane>
    </div>
  </>;
}

const clamp = (value: number, low = 0, high = 1) => Math.max(low, Math.min(high, value));
const smooth = (from: number, to: number, value: number) => { const t = clamp((value - from) / (to - from)); return t * t * (3 - 2 * t); };

export function Experience() {
  const journeyRef = useRef<HTMLElement>(null), stageRef = useRef<HTMLDivElement>(null), cameraRef = useRef<HTMLDivElement>(null), seaRef = useRef<HTMLDivElement>(null), progressRef = useRef<HTMLSpanElement>(null);
  const [chapter, setChapter] = useState(0);

  useEffect(() => {
    const journey = journeyRef.current!, stage = stageRef.current!, camera = cameraRef.current!, sea = seaRef.current!, progress = progressRef.current!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const supported = CSS.supports("perspective", "1px") && CSS.supports("transform-style", "preserve-3d");
    const planes = Array.from(camera.querySelectorAll<HTMLElement>(".dp-layer")).map(element => ({ element, depth: Number(element.closest<HTMLElement>("[data-world-chapter]")?.dataset.worldChapter ?? 0) * c.scene.chapterDepth - Number(element.dataset.depth), closing: element.classList.contains("dp-display-end") ? "title" : element.classList.contains("dp-end-message") ? "message" : "", visible: true }));
    const state = { current: 0, target: 0, start: 0, distance: 1, time: 0, frames: 0, chapter: 0, visible: true, enabled: false, width: 0 };
    let frame = 0, disposed = false;
    function cancel() { cancelAnimationFrame(frame); frame = 0; state.time = 0; }
    function wake() { if (!disposed && state.enabled && state.visible && !document.hidden && !frame) frame = requestAnimationFrame(render); }
    function sample() { state.target = clamp((window.scrollY - state.start) / state.distance) * c.scene.finalDepth; wake(); }
    function measure() {
      state.start = journey.getBoundingClientRect().top + window.scrollY; state.distance = Math.max(1, journey.offsetHeight - stage.offsetHeight); state.width = stage.offsetWidth;
      const scrollPadding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      if (state.enabled) journey.querySelectorAll<HTMLElement>(".dp-static-chapter").forEach((anchor, index) => { anchor.style.top = `${state.distance * index * c.scene.chapterDepth / c.scene.finalDepth + scrollPadding}px`; });
      stage.style.setProperty("--dp-perspective", `${state.width < c.scene.mobileBreakpoint ? c.scene.mobilePerspective : c.scene.perspective}px`); sample();
    }
    function render(time: number) {
      frame = 0;
      if (disposed || !state.enabled || !state.visible || document.hidden) return;
      const elapsed = Math.min(.05, state.time ? (time - state.time) / 1000 : 1 / 60); state.time = time;
      state.current += (state.target - state.current) * (1 - Math.exp(-c.scene.damping * elapsed));
      if (Math.abs(state.target - state.current) < c.scene.settle) state.current = state.target;
      const position = state.current, mobile = state.width < c.scene.mobileBreakpoint;
      const sway = Math.sin(position / c.scene.chapterDepth * Math.PI) * (mobile ? 4 : 22);
      camera.style.transform = `translate3d(${sway.toFixed(2)}px,0,${position.toFixed(2)}px)`;
      const dark = smooth(c.scene.chapterDepth * 3.48, c.scene.chapterDepth * 4.02, position);
      const paper = c.scene.colors.paper, night = c.scene.colors.night;
      stage.style.backgroundColor = `rgb(${paper.map((channel, index) => Math.round(channel + (night[index] - channel) * dark)).join(",")})`;
      const water = smooth(c.scene.chapterDepth * 1.56, c.scene.chapterDepth * 1.95, position) * (1 - smooth(c.scene.chapterDepth * 2.32, c.scene.chapterDepth * 2.78, position));
      sea.style.opacity = water.toFixed(3); sea.style.transform = `scale(${(1.08 + clamp((position - c.scene.chapterDepth * 1.5) / (c.scene.chapterDepth * 1.3)) * .18).toFixed(3)})`;
      stage.dataset.tone = dark > .5 || water > .45 ? "dark" : "light";
      const nearEnd = mobile ? c.scene.mobilePerspective - 75 : c.scene.nearCull;
      const nearStart = mobile ? c.scene.nearFadeStart - 150 : c.scene.nearFadeStart;
      for (const plane of planes) {
        const z = position - plane.depth;
        const closing = plane.closing === "title" ? 1 - smooth(c.scene.closingFadeStart, c.scene.closingHandoff, position) : plane.closing === "message" ? smooth(c.scene.closingHandoff, c.scene.closingRevealEnd, position) : 1;
        const opacity = smooth(c.scene.farFadeStart, c.scene.farFadeEnd, z) * (1 - smooth(nearStart, nearEnd, z)) * closing;
        const visible = opacity > .001;
        if (visible !== plane.visible) { plane.element.style.visibility = visible ? "visible" : "hidden"; plane.visible = visible; }
        if (visible) plane.element.style.opacity = opacity.toFixed(3);
      }
      const selected = clamp(Math.floor((position + c.scene.chapterDepth * .3) / c.scene.chapterDepth), 0, c.chapters.length - 1);
      if (selected !== state.chapter) { state.chapter = selected; setChapter(selected); }
      const fraction = position / c.scene.finalDepth;
      progress.style.transform = `scaleX(${fraction.toFixed(4)})`;
      journey.dataset.progress = fraction.toFixed(4); journey.dataset.camera = position.toFixed(2); journey.dataset.chapter = c.chapters[selected].id; journey.dataset.frames = String(++state.frames);
      if (state.current !== state.target) wake(); else state.time = 0;
    }
    function mode() {
      cancel(); state.enabled = supported && !reduced.matches;
      journey.dataset.renderer = state.enabled ? "css3d" : reduced.matches ? "static" : "fallback";
      journey.dataset.visible = "true";
      if (state.enabled) { measure(); state.current = state.target; wake(); }
    }
    function visibility() { if (document.hidden || !state.visible) cancel(); else { sample(); wake(); } }
    const observer = new IntersectionObserver(entries => { state.visible = entries[0].isIntersecting; journey.dataset.visible = String(state.visible); visibility(); }, { threshold: 0 }); observer.observe(stage);
    const resize = new ResizeObserver(() => { if (state.enabled) measure(); }); resize.observe(journey); resize.observe(stage);
    window.addEventListener("scroll", sample, { passive: true }); window.addEventListener("resize", measure, { passive: true }); document.addEventListener("visibilitychange", visibility); reduced.addEventListener("change", mode);
    mode();
    const initialAnchor = window.location.hash.slice(1);
    const anchorFrame = initialAnchor === "dp-work" || c.chapters.some(item => `dp-chapter-${item.id}` === initialAnchor) ? requestAnimationFrame(() => document.getElementById(initialAnchor)?.scrollIntoView({ behavior: "instant", block: "start" })) : 0;
    return () => { disposed = true; cancel(); cancelAnimationFrame(anchorFrame); observer.disconnect(); resize.disconnect(); window.removeEventListener("scroll", sample); window.removeEventListener("resize", measure); document.removeEventListener("visibilitychange", visibility); reduced.removeEventListener("change", mode); };
  }, []);

  return <section className="dp-journey" ref={journeyRef} data-renderer="static" data-progress="0" data-camera="0" data-chapter={c.chapters[0].id} data-frames="0" data-visible="true" aria-label={c.sceneCopy.label} style={{ "--dp-screens": c.scene.screens } as CSSProperties}>
    <div className="dp-stage" ref={stageRef} data-tone="light">
      <div className="dp-sea" ref={seaRef} aria-hidden="true"><img src="/assets/coast.jpg" alt="" width={1600} height={1067} /></div>
      <div className="dp-viewport" aria-hidden="true"><div className="dp-camera" ref={cameraRef}><World /></div></div>
      <div className="dp-stage-caption"><span>{String(chapter + 1).padStart(2, "0")} / {c.chapters[chapter].label}</span><p>{c.chapters[chapter].subtitle}</p></div>
      <p className="dp-scroll-cue"><span aria-hidden="true">↓</span>{c.common.scroll}</p>
      <a className="dp-skip-experience" href="#dp-work">{c.common.skipExperience}<span aria-hidden="true">↘</span></a>
      <div className="dp-progress" role="presentation"><span ref={progressRef} /></div>
    </div>
    <nav className="dp-chapter-nav" aria-label={c.common.chapters}>{c.chapters.map((item, index) => <a key={item.id} href={`#dp-chapter-${item.id}`} aria-label={`${String(index + 1).padStart(2, "0")} ${item.label}`} aria-current={chapter === index ? "step" : undefined}><span className="dp-chapter-dot" /><span>{item.label}</span></a>)}</nav>
    <div className="dp-readable-trail">{c.chapters.map((item, index) => <article key={item.id} id={`dp-chapter-${item.id}`} className={`dp-static-chapter dp-static-${item.tone}`} style={{ top: `${index * c.scene.chapterDepth / c.scene.finalDepth * c.scene.screens * 100}svh` }}><div className="dp-static-content"><div><span>{String(index + 1).padStart(2, "0")} / {item.label}</span><h2>{item.title}</h2><p>{item.subtitle}</p></div><img src={item.image} alt={item.alt} width={1600} height={1067} loading="lazy" /></div></article>)}</div>
  </section>;
}

