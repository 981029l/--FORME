"use client";

import { useState } from "react";
import type { TemplateProps } from "../types";
import { content as c } from "./content";

function Photo({ name, eager = false }: { name: keyof typeof c.assets; eager?: boolean }) {
  return <img {...c.assets[name]} loading={eager ? "eager" : "lazy"} decoding="async" />;
}

function Menu() {
  const [category, setCategory] = useState<string>(c.menu.categories[0].id);
  const selected = c.menu.categories.find(item => item.id === category) ?? c.menu.categories[0];
  return <section className="sb-menu" id="sb-menu"><div className="sb-menu-heading"><h2>{c.menu.title}</h2><p>{c.menu.subtitle}</p></div><div className="sb-menu-options" role="group" aria-label={c.menu.label}>{c.menu.categories.map(item => <button key={item.id} type="button" aria-pressed={item.id === category} aria-controls="sb-menu-list" onClick={() => setCategory(item.id)}>{item.label}</button>)}</div><p className="sb-sr-only" aria-live="polite">{c.menu.result}{selected.label}</p><div id="sb-menu-list" className="sb-menu-list">{selected.items.map(item => <article key={item.name} className="sb-menu-item"><div><h3>{item.name}</h3><span lang="en">{item.english}</span></div><p>{item.detail}</p><span className="sb-serving">{item.serving}</span></article>)}</div><p className="sb-small-note">{c.menu.note}</p></section>;
}

function Brew() {
  const [dose, setDose] = useState<number>(c.brew.defaultDose);
  const [ratio, setRatio] = useState<number>(c.brew.defaultRatio);
  return <section className="sb-brew" id="sb-brew"><div className="sb-brew-heading"><h2>{c.brew.title}</h2><p>{c.brew.intro}</p></div><div className="sb-brew-controls"><label htmlFor="sb-dose">{c.brew.doseLabel}<select id="sb-dose" value={dose} onChange={event => setDose(Number(event.target.value))}>{c.brew.doses.map(value => <option key={value} value={value}>{value} {c.brew.doseUnit}</option>)}</select></label><label htmlFor="sb-ratio">{c.brew.ratioLabel}<select id="sb-ratio" value={ratio} onChange={event => setRatio(Number(event.target.value))}>{c.brew.ratios.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label></div><div className="sb-brew-result" role="status" aria-live="polite" aria-atomic="true"><span>{c.brew.resultLabel}</span><output htmlFor="sb-dose sb-ratio">{dose * ratio}<small>{c.brew.waterUnit}</small></output><p>{c.brew.bloomLabel} {dose * 2} {c.brew.bloomUnit}</p></div><p className="sb-brew-note">{c.brew.note}</p></section>;
}

function Contact() {
  const [status, setStatus] = useState("");
  async function copyEmail() {
    try { await navigator.clipboard.writeText(c.email); setStatus(c.contact.copied); }
    catch { setStatus(c.contact.fallback); }
  }
  return <footer className="sb-footer" id="sb-contact"><div className="sb-footer-content"><div><h2>{c.contact.title}</h2><p>{c.contact.body}</p></div><div className="sb-contact-address"><span className="sb-label">{c.contact.label}</span><span className="sb-email">{c.email}</span><button className="sb-link" type="button" onClick={copyEmail}>{c.contact.copy}<span aria-hidden="true">{c.common.arrow}</span></button><p className="sb-status" role="status">{status}</p></div></div><div className="sb-footer-bottom"><strong>{c.brand} {c.wordmark}</strong><span>{c.contact.note}</span><span lang="en">{c.contact.closing}</span></div></footer>;
}

function Home({ basePath }: Pick<TemplateProps, "basePath">) {
  return <><section className="sb-hero"><div className="sb-masthead" aria-hidden="true">{c.wordmark}</div><div className="sb-hero-layout"><div className="sb-hero-copy"><h1>{c.home.title.map(line => <span key={line}>{line}</span>)}</h1><p>{c.home.body}</p><a className="sb-button" href={`${basePath}/project`}>{c.home.action}<span aria-hidden="true">{c.common.arrow}</span></a></div><figure className="sb-hero-photo"><Photo name="coffee" eager /><figcaption>{c.home.imageCaption}</figcaption></figure></div></section><div className="sb-strap" aria-hidden="true">{c.home.strap.map(line => <span key={line}>{line}</span>)}</div><Menu /><section className="sb-story"><figure><Photo name="room" /><figcaption>{c.home.storyCaption}</figcaption></figure><div><h2>{c.home.storyTitle}</h2><p>{c.home.storyBody}</p><a className="sb-link" href={`${basePath}/about`}>{c.home.storyAction}<span aria-hidden="true">{c.common.arrow}</span></a></div></section><section className="sb-note"><h2>{c.home.noteTitle}</h2><p>{c.home.noteBody}</p><a className="sb-link" href={`${basePath}/project#sb-brew`}>{c.home.noteAction}<span aria-hidden="true">{c.common.arrow}</span></a></section></>;
}

function Project({ basePath }: Pick<TemplateProps, "basePath">) {
  return <article><header className="sb-page-heading"><p className="sb-label" lang="en">{c.project.kicker}</p><h1>{c.project.title.map(line => <span key={line}>{line}</span>)}</h1><p>{c.project.intro}</p></header><div className="sb-project-intro"><figure><Photo name="coffee" eager /><figcaption>{c.project.caption}</figcaption></figure><section className="sb-equipment"><h2>{c.project.equipmentTitle}</h2><ul>{c.project.equipment.map(item => <li key={item}>{item}</li>)}</ul><p>{c.project.equipmentNote}</p></section></div><Brew /><section className="sb-steps"><h2>{c.project.stepsTitle}</h2><div>{c.project.steps.map(step => <article key={step.number}><span aria-hidden="true">{step.number}</span><div><h3>{step.title}</h3><p>{step.body}</p></div></article>)}</div></section><section className="sb-taste"><h2>{c.project.tasteTitle}</h2><div>{c.project.tasteNotes.map(note => <article key={note.title}><h3>{note.title}</h3><p>{note.body}</p></article>)}</div></section><div className="sb-disclosure"><p>{c.project.disclosure}</p><a className="sb-link" href={basePath || "/"}>{c.common.back}<span aria-hidden="true">{c.common.arrow}</span></a></div></article>;
}

function About() {
  return <article><header className="sb-page-heading sb-about-heading"><p className="sb-label" lang="en">{c.about.kicker}</p><h1>{c.about.title.map(line => <span key={line}>{line}</span>)}</h1><p>{c.about.intro}</p></header><figure className="sb-about-photo"><Photo name="room" eager /><figcaption>{c.about.caption}</figcaption></figure><section className="sb-about-story"><h2>{c.about.storyTitle}</h2><div>{c.about.story.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></section><section className="sb-principles"><h2>{c.about.principlesTitle}</h2><div>{c.about.principles.map(item => <article key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}</div></section><section className="sb-note"><h2>{c.about.closingTitle}</h2><p>{c.about.closingBody}</p></section></article>;
}

export default function CafeTemplate({ page, basePath }: TemplateProps) {
  return <div className="kit-cafe"><a className="sb-skip" href="#sb-main">{c.common.skip}</a><header className="sb-header"><a className="sb-brand" href={basePath || "/"} aria-label={`${c.brand} ${c.wordmark} ${c.nav.home}`}><strong>{c.brand}</strong><span>{c.wordmark}</span></a><nav aria-label={c.common.navigation}><a href={basePath || "/"} aria-current={page === "home" ? "page" : undefined}>{c.nav.home}</a><a href={`${basePath}/project`} aria-current={page === "project" ? "page" : undefined}>{c.nav.project}</a><a href={`${basePath}/about`} aria-current={page === "about" ? "page" : undefined}>{c.nav.about}</a></nav><a className="sb-header-contact" href="#sb-contact">{c.nav.contact}<span aria-hidden="true">{c.common.arrow}</span></a></header><main id="sb-main">{page === "home" ? <Home basePath={basePath} /> : page === "project" ? <Project basePath={basePath} /> : <About />}</main><Contact /></div>;
}
