"use client";

import { useState } from "react";
import type { TemplateProps } from "../types";
import { content as c } from "./content";

type PosterKind = keyof typeof c.posters;

function posterText(kind: PosterKind) {
  const artwork = c.posters[kind];
  return [artwork.top, artwork.lines.join(""), artwork.bottom].join(" ");
}

function Poster({ kind, className = "" }: { kind: PosterKind; className?: string }) {
  const artwork = c.posters[kind];
  return <div className={`of-poster of-poster-${kind} ${className}`} role="img" aria-label={`${posterText(kind)} ${artwork.label}`}><div className="of-poster-content" aria-hidden="true"><span className="of-poster-top">{artwork.top}</span>{" "}<div className="of-poster-shape"><i /><i /></div><div className="of-poster-letters">{artwork.lines.map((line, index) => <span key={`${line}-${index}`}>{line}</span>)}</div>{" "}<span className="of-poster-bottom">{artwork.bottom}</span></div></div>;
}

function Contact() {
  const [status, setStatus] = useState("");
  async function copyEmail() {
    try { await navigator.clipboard.writeText(c.email); setStatus(c.contact.copied); }
    catch { setStatus(c.contact.fallback); }
  }
  return <footer className="of-contact" id="contact"><div className="of-contact-grid"><h2>{c.contact.title.map(line => <span key={line}>{line}</span>)}</h2><div className="of-contact-copy"><p>{c.contact.intro}</p><span className="of-label">{c.contact.label}</span><span className="of-email">{c.email}</span><button className="of-link" type="button" onClick={copyEmail}>{c.contact.copy}<span aria-hidden="true">↗</span></button><p className="of-status" aria-live="polite">{status}</p></div></div><div className="of-footer-line"><span>{c.brand} / {c.wordmark}</span><span>{c.contact.note}</span><span>{c.contact.signature}</span></div></footer>;
}

function Home({ basePath }: Pick<TemplateProps, "basePath">) {
  return <><section className="of-hero"><div className="of-hero-copy"><p className="of-label">{c.home.label}</p><h1>{c.home.title.map(line => <span key={line}>{line}</span>)}</h1><p className="of-intro">{c.home.intro}</p><a className="of-link" href={`${basePath}/project`}>{c.home.action}<span aria-hidden="true">↗</span></a></div><a className="of-hero-art" href={`${basePath}/project`} aria-label={`${posterText("signal")} ${c.home.action}`}><Poster kind="signal" /></a></section><section className="of-works" aria-labelledby="of-works-title"><div className="of-section-heading"><h2 id="of-works-title">{c.home.selectedTitle}</h2><p>{c.home.selectedIntro}</p></div><div className="of-work-grid">{c.home.works.map(work => <article className="of-work" key={work.kind}><a className="of-work-image" href={`${basePath}/project`} aria-label={`${posterText(work.kind)} ${work.title}：${work.action}`}><Poster kind={work.kind} /></a><div className="of-work-caption"><div><h3>{work.title}</h3><p>{work.category}</p></div><a href={`${basePath}/project`} aria-label={`${work.title}：${work.action}`}><span aria-hidden="true">↗</span></a></div><p className="of-work-description">{work.description}</p></article>)}</div></section><section className="of-manifesto"><h2>{c.home.statement.map(line => <span key={line}>{line}</span>)}</h2><div><p>{c.home.statementBody}</p><a className="of-link" href={`${basePath}/about`}>{c.home.aboutAction}<span aria-hidden="true">↗</span></a></div></section></>;
}

function Project({ basePath }: Pick<TemplateProps, "basePath">) {
  return <article className="of-project"><header className="of-project-head"><p className="of-label">{c.project.label}</p><h1>{c.project.title.map(line => <span key={line}>{line}</span>)}</h1><p>{c.project.intro}</p></header><section className="of-brief"><dl>{c.project.facts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl><div><h2>{c.project.briefTitle}</h2><p>{c.project.briefBody}</p></div></section><section className="of-project-gallery" aria-labelledby="of-gallery-title"><h2 id="of-gallery-title">{c.project.galleryTitle}</h2><div className="of-gallery-grid"><figure><Poster kind="signal" /><figcaption>{c.project.captions[0]}</figcaption></figure><figure><Poster kind="echo" /><figcaption>{c.project.captions[1]}</figcaption></figure><figure><Poster kind="type" /><figcaption>{c.project.captions[2]}</figcaption></figure></div></section><section className="of-process"><h2>{c.project.processTitle}</h2><div>{c.project.process.map(item => <article key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section><section className="of-ending"><h2>{c.project.ending}</h2><p>{c.project.note}</p><a className="of-link" href={basePath || "/"}>{c.project.back}<span aria-hidden="true">↗</span></a></section></article>;
}

function About() {
  return <article className="of-about"><header className="of-about-head"><p className="of-label">{c.about.label}</p><h1>{c.about.title.map(line => <span key={line}>{line}</span>)}</h1><p>{c.about.intro}</p></header><div className="of-specimen" role="img" aria-label={`${c.about.specimenLabel}：${c.about.specimenWords.join("，")}`}><span className="of-label" aria-hidden="true">{c.about.specimenLabel}</span><div aria-hidden="true">{c.about.specimenWords.map(word => <span key={word}>{word}</span>)}</div></div><section className="of-story"><h2>{c.about.storyTitle}</h2><p>{c.about.story}</p></section><section className="of-services" aria-label={c.accessibility.services}><h2>{c.about.servicesTitle}</h2><div>{c.about.services.map(service => <article key={service.english}><h3>{service.title}</h3><span>{service.english}</span><p>{service.text}</p></article>)}</div></section><section className="of-method"><h2>{c.about.methodTitle}</h2><p>{c.about.methodBody}</p></section></article>;
}

export default function PosterTemplate({ page, basePath }: TemplateProps) {
  return <div className="kit-poster"><a className="of-skip" href="#of-main">{c.accessibility.skip}</a><header className="of-header"><a className="of-brand" href={basePath || "/"} aria-label={c.accessibility.home}><strong>{c.brand}</strong><span>{c.wordmark}</span></a><nav aria-label={c.accessibility.navigation}><a href={basePath || "/"} aria-current={page === "home" ? "page" : undefined}>{c.nav.home}</a><a href={`${basePath}/project`} aria-current={page === "project" ? "page" : undefined}>{c.nav.project}</a><a href={`${basePath}/about`} aria-current={page === "about" ? "page" : undefined}>{c.nav.about}</a><a href="#contact">{c.nav.contact}<span aria-hidden="true"> ↗</span></a></nav></header><main id="of-main">{page === "home" ? <Home basePath={basePath} /> : page === "project" ? <Project basePath={basePath} /> : <About />}</main><Contact /></div>;
}
