"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import type { TemplateProps } from "../types";
import { DiscScene, type SceneHandle } from "./Scene";
import { content as c, type Film } from "./content";

function filmIndex() { const id = new URLSearchParams(window.location.search).get("film"); return Math.max(0, c.films.findIndex(film => film.id === id)); }
function filmLink(basePath: string, film: Film) { return `${basePath}/project?film=${film.id}`; }

function Header({ page, basePath, indexOpen = false, onIndex }: TemplateProps & { index: number; indexOpen?: boolean; onIndex?: () => void }) {
  return <header className="re-header"><nav aria-label={c.common.navigation}><a className="re-brand" href={basePath || "/"} aria-label={`${c.brand} ${c.wordmark}`}>{c.wordmark}</a><a href={basePath || "/"} aria-current={page === "home" ? "page" : undefined}><span>{c.nav.home}</span></a><a href={`${basePath}/project`} aria-current={page === "project" ? "page" : undefined}><span>{c.nav.project}</span></a><a href={`${basePath}/about`} aria-current={page === "about" ? "page" : undefined}><span>{c.nav.about}</span></a>{onIndex && <button type="button" className="re-index-toggle" onClick={onIndex} aria-haspopup="dialog" aria-expanded={indexOpen} aria-controls="re-index"><span>{c.nav.index}</span><span aria-hidden="true">⌄</span></button>}</nav></header>;
}

function Facts({ film, detailed = false }: { film: Film; detailed?: boolean }) {
  return <dl className={`re-facts${detailed ? " re-facts-wide" : ""}`}><div><dt>{c.common.theme}</dt><dd>{film.theme}</dd></div><div><dt>{c.common.year}</dt><dd>{film.year}</dd></div><div><dt>{c.common.medium}</dt><dd>{film.medium}</dd></div></dl>;
}

function Gallery({ basePath }: Pick<TemplateProps, "basePath">) {
  const [index, setIndex] = useState<number>(c.scene.initialIndex);
  const [flipped, setFlipped] = useState(false);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState<"loading" | "webgl" | "fallback">("loading");
  const [indexOpen, setIndexOpen] = useState(false);
  const [opening, setOpening] = useState(false);
  const scene = useRef<SceneHandle>(null), gallery = useRef<HTMLElement>(null), menu = useRef<HTMLDialogElement>(null);
  const navigationTimer = useRef<number>(0);
  const film = c.films[index];
  useEffect(() => { const initial = filmIndex(); setIndex(initial); scene.current?.goTo(initial); return () => window.clearTimeout(navigationTimer.current); }, []);
  function openIndex() { setIndexOpen(true); menu.current?.showModal(); }
  function closeIndex() { menu.current?.close(); setIndexOpen(false); }
  function openFilm(selected: number = index) {
    if (opening) return;
    setOpening(true);
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 340;
    navigationTimer.current = window.setTimeout(() => window.location.assign(filmLink(basePath, c.films[selected])), delay);
  }
  function keyboard(event: KeyboardEvent<HTMLElement>) {
    if (event.target !== event.currentTarget || indexOpen) return;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") { event.preventDefault(); scene.current?.step(1); }
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") { event.preventDefault(); scene.current?.step(-1); }
    else if (event.key === " ") { event.preventDefault(); scene.current?.flip(); }
    else if (event.key === "Enter") { event.preventDefault(); openFilm(); }
    else if (event.key === "Home") { event.preventDefault(); scene.current?.goTo(0); }
    else if (event.key === "End") { event.preventDefault(); scene.current?.goTo(c.films.length - 1); }
  }
  return <><Header page="home" basePath={basePath} index={index} indexOpen={indexOpen} onIndex={openIndex} /><main className={`re-gallery${opening ? " re-opening" : ""}`} id="re-main" ref={gallery} tabIndex={0} aria-label={c.common.gallery} aria-describedby="re-help" onKeyDown={keyboard} data-active-film={film.id} data-face={flipped ? "back" : "front"} data-renderer={ready}><div className="re-stage" onPointerDown={() => gallery.current?.focus({ preventScroll: true })}><div className={`re-fallback-disc${flipped ? " re-fallback-back" : ""}`} aria-hidden="true" style={{ backgroundImage: `url(${film.image})` }}><span>{film.english}</span></div><DiscScene ref={scene} initialIndex={c.scene.initialIndex} paused={paused} enabled={!indexOpen && !opening} onChange={setIndex} onFlip={setFlipped} onReady={webgl => setReady(webgl ? "webgl" : "fallback")} onOpen={openFilm} /></div><div className="re-meta" key={film.id}><h1>{film.title}</h1><p className="re-film-english">{film.english.replace("\n", " ")}</p><Facts film={film} /></div><div className="re-editorial" key={`notes-${film.id}`}><div><span>{c.gallery.labelOne}</span><p>{film.note}</p></div><div><span>{c.gallery.labelTwo}</span><p>{film.clue}</p></div></div><div className="re-counter" aria-live="polite"><span>{String(index + 1).padStart(2, "0")} / {String(c.films.length).padStart(2, "0")}</span><span>{c.common.disclosure}</span></div><div className="re-controls" role="group" aria-label="光盘操作"><button type="button" aria-label={c.common.previous} onClick={() => scene.current?.step(-1)}>←</button><button type="button" aria-label={c.common.next} onClick={() => scene.current?.step(1)}>→</button><button type="button" className="re-text-control" aria-pressed={flipped} onClick={() => scene.current?.flip()}>{c.common.flip}</button><button type="button" className="re-text-control" onClick={() => openFilm()}>{c.common.open}</button><button type="button" aria-label={paused ? c.gallery.resume : c.gallery.pause} aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? "▷" : "Ⅱ"}</button></div><p id="re-help" className="re-help">{c.common.help}</p><p className={`re-load-notice${ready === "webgl" ? " re-sr-only" : ""}`} role="status">{ready === "loading" ? c.common.loading : ready === "fallback" ? c.common.fallback : c.common.ready}</p><p className="re-sr-only" role="status">{film.title}，{index + 1} / {c.films.length}，{flipped ? c.common.back : c.common.front}</p></main><dialog id="re-index" className="re-index" ref={menu} aria-labelledby="re-index-title" onClose={() => setIndexOpen(false)} onClick={event => { const rect = event.currentTarget.getBoundingClientRect(); if (event.target === event.currentTarget && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) closeIndex(); }}><div className="re-index-heading"><h2 id="re-index-title">{c.wordmark} / {c.nav.index}</h2><button type="button" aria-label={c.common.close} onClick={closeIndex}>×</button></div><ol>{c.films.map((item, position) => <li key={item.id}><a href={filmLink(basePath, item)} onPointerEnter={() => scene.current?.goTo(position)} onFocus={() => scene.current?.goTo(position)} aria-current={index === position ? "true" : undefined}><span className="re-index-no">{String(position + 1).padStart(2, "0")}</span><span>{item.title}<small>{item.english.replace("\n", " ")}</small></span><span>{item.year}</span></a></li>)}</ol><p>{c.gallery.category}</p></dialog></>;
}

function Detail({ basePath }: Pick<TemplateProps, "basePath">) {
  const [index, setIndex] = useState(0), [expanded, setExpanded] = useState(false);
  useEffect(() => setIndex(filmIndex()), []);
  const film = c.films[index], next = c.films[(index + 1) % c.films.length];
  return <><Header page="project" basePath={basePath} index={index} /><main id="re-main" className="re-detail"><header className="re-detail-heading"><p>{c.detail.label}</p><h1>{film.title}</h1><span>{film.english.replace("\n", " ")}</span><Facts film={film} detailed /></header><figure className="re-detail-hero"><img src={film.image} alt={film.imageAlt} width={1600} height={1067} fetchPriority="high" /><figcaption>{film.title} / {film.year}</figcaption></figure><section className="re-synopsis"><h2>{c.detail.description}</h2><div><p className="re-lead">{film.summary}</p>{film.story.map(paragraph => <p key={paragraph}>{paragraph}</p>)}<p className="re-disclosure">{c.detail.note}</p></div></section><section className="re-frames"><div className="re-frame-heading"><h2>{c.detail.frames}</h2><button className="re-link" type="button" aria-expanded={expanded} aria-controls="re-frame-list" onClick={() => setExpanded(value => !value)}>{expanded ? c.detail.closeFrames : c.detail.openFrames}<span aria-hidden="true">{expanded ? "−" : "+"}</span></button></div><div className={`re-frame-list${expanded ? " re-frames-expanded" : ""}`} id="re-frame-list">{film.frames.map((src, position) => <figure key={src}><img src={src} alt={`${film.title}的第 ${position + 1} 张概念参考摄影`} width={1600} height={1067} loading="lazy" /><figcaption>{String(position + 1).padStart(2, "0")} / {c.common.photoNote}</figcaption></figure>)}</div></section><a className="re-next-film" href={filmLink(basePath, next)}><img src={next.image} alt="" width={1600} height={1067} loading="lazy" /><span>{c.detail.next}</span><h2>{next.title}</h2><strong>{next.english.replace("\n", " ")}</strong></a><div className="re-back"><a className="re-link" href={`${basePath || "/"}?film=${film.id}`}>{c.detail.back}<span aria-hidden="true">↗</span></a></div></main><Footer /></>;
}

function About({ basePath }: Pick<TemplateProps, "basePath">) {
  return <><Header page="about" basePath={basePath} index={0} /><main id="re-main" className="re-about"><header><p>{c.wordmark} / {c.brand}</p><h1>{c.about.title}</h1><span>{c.about.english}</span></header><div className="re-about-intro"><p>{c.about.intro}</p><figure><img src="/assets/coast.jpg" alt="海面与远处的地平线" width={1600} height={1067} /><figcaption>{c.common.photoNote}</figcaption></figure></div><div className="re-about-sections">{c.about.sections.map((section, index) => <section key={section.title}><span>{String(index + 1).padStart(2, "0")}</span><h2>{section.title}</h2><p>{section.body}</p></section>)}</div><a className="re-about-return" href={basePath || "/"}>{c.about.explore}<span aria-hidden="true">↗</span></a></main><Footer /></>;
}

function Footer() {
  const [notice, setNotice] = useState("");
  async function copy() { try { await navigator.clipboard.writeText(c.email); setNotice(c.common.copied); } catch { setNotice(c.common.copyError); } }
  return <footer className="re-footer"><div><h2>{c.about.contact}</h2><p>{c.about.contactBody}</p></div><div><span>{c.email}</span><button className="re-link" type="button" onClick={copy}>{c.common.copy}</button><p role="status">{notice}</p></div><p className="re-footer-note">{c.common.disclosure}</p></footer>;
}

export default function CinemaTemplate({ page, basePath }: TemplateProps) {
  return <div className={`kit-cinema kit-cinema-${page}`}><a className="re-skip" href="#re-main">{c.common.skip}</a>{page === "home" ? <Gallery basePath={basePath} /> : page === "project" ? <Detail basePath={basePath} /> : <About basePath={basePath} />}</div>;
}
