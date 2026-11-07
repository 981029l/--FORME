"use client";

import { useState } from "react";
import type { TemplateProps } from "../types";
import { content as c } from "./content";

function Photo({ name, eager = false }: { name: keyof typeof c.assets; eager?: boolean }) {
  return <img {...c.assets[name]} loading={eager ? "eager" : "lazy"} decoding="async" />;
}

function Contact() {
  const [status, setStatus] = useState("");
  async function copyEmail() {
    try { await navigator.clipboard.writeText(c.email); setStatus(c.contact.copied); }
    catch { setStatus(c.contact.fallback); }
  }
  return <footer className="mu-contact" id="mu-contact"><div><h2>{c.contact.title}</h2><p className="mu-contact-intro">{c.contact.intro}</p></div><div className="mu-contact-details"><span className="mu-label">{c.contact.label}</span><span className="mu-email">{c.email}</span><button className="mu-link" type="button" onClick={copyEmail}>{c.contact.copy}<span aria-hidden="true">{c.ui.arrow}</span></button><p className="mu-status" aria-live="polite">{status}</p></div><div className="mu-footer-line"><span>{c.brand} / {c.wordmark}</span><p>{c.contact.note}</p><a href="#mu-main">{c.ui.back}</a></div></footer>;
}

function Home({ basePath }: Pick<TemplateProps, "basePath">) {
  return <><section className="mu-hero"><div className="mu-hero-copy"><p className="mu-label">{c.home.kicker}</p><h1>{c.home.title.map(line => <span key={line}>{line}</span>)}</h1><p className="mu-hero-intro">{c.home.intro}</p><a className="mu-link" href={`${basePath}/project`}>{c.home.action}<span aria-hidden="true">{c.ui.arrow}</span></a></div><figure><Photo name="museum" eager /><figcaption>{c.home.imageCaption}</figcaption></figure></section><dl className="mu-exhibit-facts">{c.home.facts.map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl><section className="mu-statement"><h2>{c.home.statement}</h2><p>{c.home.statementText}</p></section><section className="mu-objects"><h2>{c.home.objectsTitle}</h2><div className="mu-object-grid">{c.home.objects.map(item => <article key={item.title}><figure><Photo name={item.image} /><figcaption>{item.caption}</figcaption></figure><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section><section className="mu-programmes"><h2>{c.home.programmeTitle}</h2><p className="mu-programmes-intro">{c.home.programmeText}</p><div className="mu-programme-list">{c.home.programmes.map(item => <article key={item.title}><span className="mu-label">{item.type}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div><a className="mu-link" href={`${basePath}/about`}>{c.home.about}<span aria-hidden="true">{c.ui.arrow}</span></a></section></>;
}

function Project({ basePath }: Pick<TemplateProps, "basePath">) {
  return <article className="mu-project"><header className="mu-project-head"><p className="mu-label">{c.project.kicker}</p><h1>{c.project.title}</h1><p className="mu-project-intro">{c.project.intro}</p><dl>{c.project.facts.map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl></header><figure className="mu-project-image"><Photo name="museum" eager /><figcaption>{c.project.imageCaption}</figcaption></figure><div className="mu-curation"><nav className="mu-directory" aria-label={c.project.directory}><p className="mu-label">{c.project.directory}</p>{c.project.sections.map(item => <a key={item.id} href={`#mu-${item.id}`}><span>{item.number}</span>{item.title}</a>)}</nav><div className="mu-chapters">{c.project.sections.map(item => <section key={item.id} id={`mu-${item.id}`} className="mu-chapter"><div className="mu-chapter-title"><span aria-hidden="true">{item.number}</span><h2>{item.title}</h2></div><p className="mu-chapter-subtitle">{item.subtitle}</p><p className="mu-chapter-text">{item.text}</p><figure><Photo name={item.image} /><figcaption>{item.caption}</figcaption></figure><aside className="mu-observation"><h3>{item.question}</h3><p>{item.prompt}</p></aside></section>)}</div></div><section className="mu-project-note"><h2>{c.project.noteTitle}</h2><p>{c.project.note}</p><a className="mu-link" href={basePath || "/"}>{c.project.back}<span aria-hidden="true">{c.ui.arrow}</span></a></section></article>;
}

function Rooms() {
  const [roomId, setRoomId] = useState<string>(c.about.rooms[0].id);
  const room = c.about.rooms.find(item => item.id === roomId)!;
  return <section className="mu-rooms"><h2>{c.about.roomsTitle}</h2><p className="mu-rooms-intro">{c.about.roomsIntro}</p><div className="mu-room-layout"><div className="mu-room-buttons" role="group" aria-label={c.about.roomsLabel}>{c.about.rooms.map(item => <button type="button" key={item.id} aria-pressed={roomId === item.id} aria-controls="mu-room-panel" onClick={() => setRoomId(item.id)}>{item.label}<span aria-hidden="true">{c.ui.arrow}</span></button>)}</div><div id="mu-room-panel" className="mu-room-panel" role="region" aria-labelledby="mu-room-title" aria-live="polite"><p className="mu-label">{room.label}</p><h3 id="mu-room-title">{room.title}</h3><p className="mu-room-description">{room.text}</p><div className="mu-room-info"><div><h4>{c.about.roomUse}</h4><ul>{room.uses.map(item => <li key={item}>{item}</li>)}</ul></div><div><h4>{c.about.roomMethod}</h4><p>{room.method}</p></div></div><p className="mu-room-footnote">{room.footnote}</p></div></div></section>;
}

function About({ basePath }: Pick<TemplateProps, "basePath">) {
  return <article className="mu-about"><header className="mu-about-head"><div><p className="mu-label">{c.about.kicker}</p><h1>{c.about.title}</h1><p>{c.about.intro}</p></div><figure><Photo name="museum" eager /><figcaption>{c.about.imageCaption}</figcaption></figure></header><section className="mu-belief"><h2>{c.about.beliefTitle}</h2><p>{c.about.belief}</p></section><Rooms /><section className="mu-questions"><h2>{c.about.questionsTitle}</h2><div>{c.about.questions.map(item => <details key={item.question}><summary>{item.question}<span aria-hidden="true">{c.ui.plus}</span></summary><p>{item.answer}</p></details>)}</div><a className="mu-link" href={`${basePath}/project`}>{c.about.action}<span aria-hidden="true">{c.ui.arrow}</span></a></section></article>;
}

export default function MuseumTemplate({ page, basePath }: TemplateProps) {
  return <div className="kit-museum"><a className="mu-skip" href="#mu-main">{c.ui.skip}</a><header className="mu-header"><a className="mu-brand" href={basePath || "/"} aria-label={c.ui.brandLabel}><span>{c.brand}</span><span>{c.wordmark}</span></a><nav aria-label={c.ui.navigation}><a href={basePath || "/"} aria-current={page === "home" ? "page" : undefined}>{c.nav.home}</a><a href={`${basePath}/project`} aria-current={page === "project" ? "page" : undefined}>{c.nav.project}</a><a href={`${basePath}/about`} aria-current={page === "about" ? "page" : undefined}>{c.nav.about}</a><a href="#mu-contact">{c.nav.contact}</a></nav></header><main id="mu-main">{page === "home" ? <Home basePath={basePath} /> : page === "project" ? <Project basePath={basePath} /> : <About basePath={basePath} />}</main><Contact /></div>;
}
