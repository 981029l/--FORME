"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowCounterClockwise, ArrowRight, ArrowUpRight, Copy, Flower, Minus, Pause, Play, Plus } from "@phosphor-icons/react";
import type { TemplateProps } from "../types";
import { IdeaArtwork, Lamp } from "./Artwork";
import { RambleScene, type SceneHandle } from "./Scene";
import { content as c, type IdeaCategory } from "./content";

function Header({ page, basePath }: TemplateProps) {
  return <header className="do-header"><a className="do-wordmark" href={basePath || "/"}>{c.wordmark.split("").map((letter, index) => <span key={index}>{letter}</span>)}<small>{c.brand}</small></a><nav aria-label={c.nav.label}><a href={basePath || "/"} aria-current={page === "home" ? "page" : undefined}>{c.nav.home}</a><a href={`${basePath}/project`} aria-current={page === "project" ? "page" : undefined}>{c.nav.project}</a><a href={`${basePath}/about`} aria-current={page === "about" ? "page" : undefined}>{c.nav.about}</a></nav></header>;
}

function Home({ basePath }: Pick<TemplateProps, "basePath">) {
  const [density, setDensity] = useState<number>(c.scene.initialDensity), [paused, setPaused] = useState(false), [reduced, setReduced] = useState(false), [marks, setMarks] = useState(0), [notice, setNotice] = useState("");
  const scene = useRef<SceneHandle>(null);
  const toggle = () => { if (!reduced) setPaused(value => !value); };
  function planted(count: number) { setMarks(count); setNotice(count ? c.home.plantNotice : c.home.resetNotice); }
  return <><Header page="home" basePath={basePath} /><main id="do-main" className="do-home" data-density={density} data-marks={marks}>
    <div className="do-landmark"><Lamp /></div><RambleScene ref={scene} density={density} paused={paused} onReduced={setReduced} onMark={planted} onToggle={toggle} />
    <div className="do-home-intro"><p className="do-eyebrow">{c.home.eyebrow}</p><h1>{c.home.title[0]}<br /><span>{c.home.title[1]}</span></h1><p className="do-home-description">{c.home.intro}</p><a className="do-button do-primary" href={`${basePath}/project`}>{c.home.cta}<ArrowUpRight size={21} weight="bold" aria-hidden="true" /></a></div>
    <p className="do-lamp-note">{c.home.lampNote}<span aria-hidden="true">↙</span></p>
    <aside className="do-density" aria-label={c.home.density}><p>{c.home.density}</p><div><button type="button" aria-label={c.home.less} disabled={density === 0} onClick={() => setDensity(value => Math.max(0, value - 1))}><Minus size={18} weight="bold" aria-hidden="true" /></button><output aria-live="polite">{c.home.densityLabels[density]}</output><button type="button" aria-label={c.home.more} disabled={density === c.scene.densities.length - 1} onClick={() => setDensity(value => Math.min(c.scene.densities.length - 1, value + 1))}><Plus size={18} weight="bold" aria-hidden="true" /></button></div><span>{c.scene.densities[density]} {c.home.people}</span></aside>
    <div className="do-ground-note"><span aria-hidden="true">↗</span><p>{c.home.note}</p></div>
    <div className="do-home-bottom"><div className="do-world-tools"><button className="do-button do-pause" type="button" onClick={toggle} disabled={reduced} aria-pressed={paused || reduced}>{paused || reduced ? <Play size={18} weight="bold" aria-hidden="true" /> : <Pause size={18} weight="bold" aria-hidden="true" />}<span>{reduced ? c.home.static : paused ? c.home.resume : c.home.pause}</span></button><button className="do-reset" type="button" onClick={() => scene.current?.reset()} aria-label={c.home.reset}><ArrowCounterClockwise size={20} weight="bold" aria-hidden="true" /></button></div><p className="do-scene-help" id="do-scene-help">{reduced ? c.home.reduced : c.home.help}<span className="do-sr-only">{c.home.keyboard}</span></p><button className="do-button do-plant" type="button" onClick={() => scene.current?.plant()}><Flower size={22} weight="bold" aria-hidden="true" />{c.home.plant}<span className="do-mark-count" aria-label={`${marks} ${c.home.plant}`}>{marks}</span></button></div>
    <p className="do-sr-only" role="status">{notice}</p>
  </main></>;
}

function Project({ basePath }: Pick<TemplateProps, "basePath">) {
  const [category, setCategory] = useState<IdeaCategory>("all"), [selected, setSelected] = useState(c.ideas[0].id), [expanded, setExpanded] = useState(true);
  const detail = useRef<HTMLElement>(null);
  const idea = c.ideas.find(item => item.id === selected) || c.ideas[0], filtered = c.ideas.filter(item => category === "all" || item.category === category);
  useEffect(() => { const id = new URLSearchParams(window.location.search).get("idea"); if (c.ideas.some(item => item.id === id)) setSelected(id!); }, []);
  function select(id: string) { setSelected(id); setExpanded(true); const url = new URL(window.location.href); url.searchParams.set("idea", id); window.history.replaceState(null, "", url); window.requestAnimationFrame(() => detail.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" })); }
  return <><Header page="project" basePath={basePath} /><main id="do-main" className="do-project"><header className="do-page-heading"><h1>{c.project.title}</h1><p>{c.project.intro}</p><span className="do-shop-note">{c.project.shopNote}</span></header>
    <div className="do-filter-row"><div className="do-filters" role="group" aria-label={c.project.filterLabel}>{c.project.categories.map(item => <button key={item.id} type="button" aria-pressed={category === item.id} onClick={() => setCategory(item.id)}>{item.label}</button>)}</div><p aria-live="polite">{filtered.length} {c.project.result}</p></div>
    <div className="do-idea-grid" data-category={category}>{filtered.map(item => <article className={`do-idea-card do-idea-${item.color}`} key={item.id} data-idea={item.id}><a className="do-idea-image" href={`${basePath}/project?idea=${item.id}`} onClick={event => { event.preventDefault(); select(item.id); }} aria-label={`${c.common.open}：${item.title}`}><IdeaArtwork kind={item.kind} /><span className="do-art-arrow"><ArrowUpRight size={26} weight="bold" aria-hidden="true" /></span></a><div className="do-idea-caption"><h2><a href={`${basePath}/project?idea=${item.id}`} onClick={event => { event.preventDefault(); select(item.id); }}>{item.title}</a></h2><span>{item.english}</span><p>{item.description}</p></div></article>)}</div>
    {filtered.length === 0 && <div className="do-empty"><p>{c.project.empty}</p><button className="do-button" type="button" onClick={() => setCategory("all")}>{c.project.returnAll}</button></div>}
    <section className="do-idea-detail" ref={detail} aria-label={c.project.detailLabel} data-selected-idea={idea.id}><div className="do-detail-top"><p>{c.project.selected} / {c.project.concept}</p><button className="do-text-button" type="button" aria-expanded={expanded} aria-controls="do-detail-body" onClick={() => setExpanded(value => !value)}>{expanded ? c.common.close : c.project.detailLabel}{expanded ? <Minus size={18} aria-hidden="true" /> : <Plus size={18} aria-hidden="true" />}</button></div><div className="do-detail-body" id="do-detail-body" hidden={!expanded}><div className="do-detail-art"><IdeaArtwork kind={idea.kind} /></div><div className="do-detail-copy"><h2 id="do-detail-title">{idea.title}</h2><p className="do-detail-english">{idea.english}</p><h3>{c.project.thought}</h3><p>{idea.thought}</p><dl><dt>{c.project.material}</dt><dd>{idea.material}</dd></dl><button className="do-button" type="button" onClick={() => select(c.ideas[(c.ideas.findIndex(item => item.id === idea.id) + 1) % c.ideas.length].id)}>{c.common.next}<ArrowRight size={20} weight="bold" aria-hidden="true" /></button></div></div></section>
  </main><Footer basePath={basePath} /></>;
}

function About({ basePath }: Pick<TemplateProps, "basePath">) {
  return <><Header page="about" basePath={basePath} /><main className="do-about" id="do-main"><header className="do-page-heading"><h1>{c.about.title}</h1><p>{c.about.intro}</p></header><figure className="do-about-drawing"><IdeaArtwork kind="cup" /><figcaption>{c.about.caption}</figcaption><span className="do-about-scribble" aria-hidden="true">{c.wordmark.toLowerCase()}!</span></figure><section className="do-story"><h2>{c.about.storyTitle}</h2><div>{c.about.story.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></section><div className="do-principles">{c.about.principles.map((item, index) => <section key={item.title}><span className="do-principle-mark" aria-hidden="true">{["?", "+", "~"][index]}</span><h2>{item.title}</h2><p>{item.text}</p></section>)}</div><section className="do-contact"><h2>{c.about.contact}</h2><p>{c.about.contactBody}</p><Contact /></section></main><Footer basePath={basePath} compact /></>;
}

function Contact() {
  const [status, setStatus] = useState("");
  async function copy() { try { await navigator.clipboard.writeText(c.email); setStatus(c.common.copied); } catch { setStatus(c.common.copyError); } }
  return <div className="do-contact-action"><div><span className="do-email">{c.email}</span><small>{c.common.emailNote}</small></div><button className="do-button" type="button" onClick={copy}><Copy size={18} weight="bold" aria-hidden="true" />{c.common.copy}</button><p className="do-copy-status" role="status">{status}</p></div>;
}

function Footer({ basePath, compact = false }: Pick<TemplateProps, "basePath"> & { compact?: boolean }) {
  return <footer className={`do-footer${compact ? " do-footer-compact" : ""}`}>{!compact && <div className="do-footer-contact"><h2>{c.about.contact}</h2><Contact /></div>}<div className="do-footer-bottom"><a href={basePath || "/"}>{c.common.back}<ArrowUpRight size={18} weight="bold" aria-hidden="true" /></a><p>{c.common.disclosure}</p><span>{c.brand} {c.wordmark}</span></div></footer>;
}

export default function DoodleTemplate({ page, basePath }: TemplateProps) {
  return <div className={`kit-doodle kit-doodle-${page}`}><a className="do-skip" href="#do-main">{c.common.skip}</a>{page === "home" ? <Home basePath={basePath} /> : page === "project" ? <Project basePath={basePath} /> : <About basePath={basePath} />}</div>;
}
