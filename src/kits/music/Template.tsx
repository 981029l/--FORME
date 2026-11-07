"use client";

import { useState } from "react";
import type { TemplateProps } from "../types";
import { content as c } from "./content";

function Photo({ eager = false }: { eager?: boolean }) {
  return <img {...c.assets.concert} loading={eager ? "eager" : "lazy"} decoding="async" />;
}

function Contact() {
  const [status, setStatus] = useState("");
  async function copyEmail() {
    try { await navigator.clipboard.writeText(c.email); setStatus(c.contact.copied); }
    catch { setStatus(c.contact.fallback); }
  }
  return <footer className="ob-contact" id="ob-contact"><div className="ob-contact-head"><h2>{c.contact.title}</h2><p>{c.contact.intro}</p></div><div className="ob-contact-details"><span className="ob-label">{c.contact.label}</span><span className="ob-email">{c.email}</span><button type="button" className="ob-link" onClick={copyEmail}>{c.contact.copy}<span aria-hidden="true">{c.ui.arrow}</span></button><p className="ob-status" aria-live="polite">{status}</p></div><div className="ob-footer-line"><span>{c.brand} / {c.wordmark}</span><p>{c.contact.note}</p><a href="#ob-main">{c.ui.back}</a></div></footer>;
}

function Home({ basePath }: Pick<TemplateProps, "basePath">) {
  return <><section className="ob-hero"><div className="ob-hero-copy"><p className="ob-label">{c.home.kicker}</p><h1>{c.home.title.map(line => <span key={line}>{line}</span>)}</h1><p className="ob-hero-intro">{c.home.intro}</p><a className="ob-button" href={`${basePath}/project`}>{c.home.action}<span aria-hidden="true">{c.ui.arrow}</span></a></div><figure className="ob-hero-image"><Photo eager /><figcaption>{c.home.imageCaption}</figcaption></figure></section><section className="ob-event"><p className="ob-event-date">{c.home.event.date}</p><div><h2>{c.home.event.title}</h2><p>{c.home.event.detail}</p></div></section><section className="ob-lineup"><h2>{c.home.lineupTitle}</h2><div className="ob-lineup-list">{c.home.lineup.map(item => <article key={item.name} className="ob-artist"><div><span className="ob-label">{item.genre}</span><h3>{item.name}</h3></div><div className="ob-artist-copy"><span>{item.english}</span><p>{item.text}</p></div></article>)}</div></section><section className="ob-manifesto"><h2>{c.home.manifestoTitle}</h2><div><p>{c.home.manifesto}</p><a className="ob-link" href={`${basePath}/about`}>{c.home.about}<span aria-hidden="true">{c.ui.arrow}</span></a></div></section></>;
}

function Programme() {
  const [day, setDay] = useState<string>(c.project.days[0].id);
  const [category, setCategory] = useState<string>(c.project.categories[0].id);
  const sessions = c.project.sessions.filter(item => item.day === day && (category === "all" || item.category === category));
  const selectedDay = c.project.days.find(item => item.id === day)!;
  return <section className="ob-programme" aria-labelledby="ob-day-title"><div className="ob-programme-controls"><div className="ob-days" role="group" aria-label={c.project.daysLabel}>{c.project.days.map(item => <button type="button" key={item.id} aria-pressed={day === item.id} onClick={() => setDay(item.id)}>{item.label}</button>)}</div><label className="ob-filter">{c.project.categoryLabel}<select value={category} onChange={event => setCategory(event.target.value)}>{c.project.categories.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label></div><div className="ob-programme-caption"><h2 id="ob-day-title">{selectedDay.title}</h2><p role="status">{c.project.resultsPrefix} {sessions.length} {c.project.resultsSuffix}</p></div><div className="ob-sessions">{sessions.length ? sessions.map(item => <article className="ob-session" key={item.id}><div className="ob-time"><time>{item.time}</time><span>{item.end}</span></div><div className="ob-session-body"><span className="ob-label">{item.categoryLabel} / {item.venue}</span><h3>{item.name}</h3><p className="ob-session-english">{item.english}</p><details><summary>{c.project.detail}<span aria-hidden="true">{c.ui.plus}</span></summary><p>{item.text}</p></details></div></article>) : <div className="ob-empty"><p>{c.project.empty}</p><button type="button" className="ob-link" onClick={() => setCategory("all")}>{c.project.reset}<span aria-hidden="true">{c.ui.arrow}</span></button></div>}</div><p className="ob-programme-note">{c.project.note}</p></section>;
}

function Project() {
  return <article className="ob-project"><header className="ob-project-head"><p className="ob-label">{c.project.kicker}</p><h1>{c.project.title}</h1><p>{c.project.intro}</p></header><Programme /><figure className="ob-project-image"><Photo eager /><figcaption>{c.project.imageCaption}</figcaption></figure><section className="ob-listening"><h2>{c.project.listeningTitle}</h2><div>{c.project.listening.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section></article>;
}

function About({ basePath }: Pick<TemplateProps, "basePath">) {
  return <article className="ob-about"><header className="ob-about-head"><p className="ob-label">{c.about.kicker}</p><h1>{c.about.title.map(line => <span key={line}>{line}</span>)}</h1><p className="ob-about-intro">{c.about.intro}</p></header><figure className="ob-about-image"><Photo eager /><figcaption>{c.about.imageCaption}</figcaption></figure><section className="ob-story"><h2>{c.about.storyTitle}</h2><p>{c.about.story}</p></section><section className="ob-practices"><h2>{c.about.practiceTitle}</h2><div>{c.about.practices.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p><span className="ob-label">{item.detail}</span></article>)}</div></section><section className="ob-ending"><h2>{c.about.ending}</h2><p>{c.about.endingText}</p><a className="ob-button" href={`${basePath}/project`}>{c.about.action}<span aria-hidden="true">{c.ui.arrow}</span></a></section></article>;
}

export default function MusicTemplate({ page, basePath }: TemplateProps) {
  return <div className="kit-music"><a className="ob-skip" href="#ob-main">{c.ui.skip}</a><header className="ob-header"><a className="ob-brand" href={basePath || "/"} aria-label={c.ui.brandLabel}>{c.brand}<span>{c.wordmark}</span></a><nav aria-label={c.ui.navigation}><a href={basePath || "/"} aria-current={page === "home" ? "page" : undefined}>{c.nav.home}</a><a href={`${basePath}/project`} aria-current={page === "project" ? "page" : undefined}>{c.nav.project}</a><a href={`${basePath}/about`} aria-current={page === "about" ? "page" : undefined}>{c.nav.about}</a><a href="#ob-contact">{c.nav.contact}</a></nav></header><main id="ob-main">{page === "home" ? <Home basePath={basePath} /> : page === "project" ? <Project /> : <About basePath={basePath} />}</main><Contact /></div>;
}
