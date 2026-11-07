"use client";

import { useState } from "react";
import type { TemplateProps } from "../types";
import { content as c } from "./content";

function Photo({ name, eager = false }: { name: keyof typeof c.assets; eager?: boolean }) {
  return <img {...c.assets[name]} loading={eager ? "eager" : "lazy"} decoding="async" />;
}

function LightSelector() {
  const [light, setLight] = useState<string>(c.light.options[0].id);
  const selected = c.light.options.find(item => item.id === light) ?? c.light.options[0];
  return <section className="vd-light" id="vd-light"><div className="vd-light-heading"><h2>{c.light.title}</h2><p>{c.light.intro}</p></div><div className="vd-light-options" role="group" aria-label={c.light.label}>{c.light.options.map(option => <button type="button" key={option.id} aria-pressed={option.id === light} aria-controls="vd-light-result" onClick={() => setLight(option.id)}>{option.label}</button>)}</div><div className="vd-light-result" id="vd-light-result" aria-live="polite" aria-atomic="true"><div><p className="vd-result-label">{c.light.current}{selected.label}</p><h3>{selected.title}</h3><p>{selected.body}</p><span className="vd-plant-note">{selected.plant}</span></div><div className="vd-light-tips"><h4>{c.light.notesLabel}</h4><ul>{selected.tips.map(tip => <li key={tip}><span aria-hidden="true">{c.common.arrow}</span>{tip}</li>)}</ul></div></div><p className="vd-small-note">{c.light.note}</p></section>;
}

function Contact() {
  const [status, setStatus] = useState("");
  async function copyEmail() {
    try { await navigator.clipboard.writeText(c.email); setStatus(c.contact.copied); }
    catch { setStatus(c.contact.fallback); }
  }
  return <footer className="vd-footer" id="vd-contact"><div className="vd-footer-content"><div><h2>{c.contact.title}</h2><p>{c.contact.body}</p></div><div className="vd-contact-address"><span className="vd-label">{c.contact.label}</span><span className="vd-email">{c.email}</span><button className="vd-link" type="button" onClick={copyEmail}>{c.contact.copy}<span aria-hidden="true">{c.common.arrow}</span></button><p className="vd-status" role="status">{status}</p></div></div><div className="vd-footer-bottom"><strong>{c.brand} <span lang="en">{c.wordmark}</span></strong><span>{c.contact.note}</span><span lang="en">{c.contact.closing}</span></div></footer>;
}

function Home({ basePath }: Pick<TemplateProps, "basePath">) {
  return <><section className="vd-hero"><div className="vd-hero-copy"><p className="vd-label" lang="en">{c.home.kicker}</p><h1>{c.home.title.map(line => <span key={line}>{line}</span>)}</h1><p className="vd-intro">{c.home.intro}</p><a className="vd-button" href={`${basePath}/project`}>{c.home.action}<span aria-hidden="true">{c.common.arrow}</span></a></div><figure className="vd-hero-photo"><div><Photo name="leaves" eager /></div><figcaption><span>{c.home.caption}</span><span lang="en">{c.home.captionTag}</span></figcaption></figure></section><section className="vd-statement"><h2>{c.home.statement}</h2><p>{c.home.statementBody}</p></section><LightSelector /><section className="vd-story"><figure><Photo name="tools" /><figcaption>{c.home.storyCaption}</figcaption></figure><div><h2>{c.home.storyTitle}</h2><p>{c.home.storyBody}</p><a className="vd-link" href={`${basePath}/project`}>{c.home.storyAction}<span aria-hidden="true">{c.common.arrow}</span></a></div></section><section className="vd-about-invite"><div className="vd-leaf-window" aria-hidden="true"><Photo name="leaves" /></div><div><h2>{c.home.aboutTitle}</h2><p>{c.home.aboutBody}</p><a className="vd-link" href={`${basePath}/about`}>{c.home.aboutAction}<span aria-hidden="true">{c.common.arrow}</span></a></div></section></>;
}

function Project({ basePath }: Pick<TemplateProps, "basePath">) {
  return <article><header className="vd-page-heading"><p className="vd-label" lang="en">{c.project.kicker}</p><h1>{c.project.title.map(line => <span key={line}>{line}</span>)}</h1><p>{c.project.intro}</p><dl className="vd-facts">{c.project.facts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl></header><figure className="vd-project-cover"><Photo name="leaves" eager /><figcaption>{c.project.coverCaption}</figcaption></figure><section className="vd-project-brief"><h2>{c.project.briefTitle}</h2><p>{c.project.brief}</p></section><LightSelector /><section className="vd-layers"><h2>{c.project.layersTitle}</h2><div>{c.project.layers.map(item => <article key={item.number}><span aria-hidden="true">{item.number}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}</div></section><section className="vd-care"><figure><Photo name="tools" /></figure><div><h2>{c.project.careTitle}</h2><p>{c.project.careIntro}</p><div className="vd-disclosures">{c.project.care.map(item => <details key={item.title}><summary>{item.title}<span aria-hidden="true">{c.common.expand}</span></summary><p>{item.body}</p></details>)}</div></div></section><section className="vd-project-end"><h2>{c.project.endTitle}</h2><p>{c.project.endBody}</p><p className="vd-small-note">{c.project.disclosure}</p><a className="vd-link" href={basePath || "/"}>{c.common.back}<span aria-hidden="true">{c.common.arrow}</span></a></section></article>;
}

function About({ basePath }: Pick<TemplateProps, "basePath">) {
  return <article><header className="vd-page-heading vd-about-heading"><p className="vd-label" lang="en">{c.about.kicker}</p><h1>{c.about.title.map(line => <span key={line}>{line}</span>)}</h1><p>{c.about.intro}</p></header><figure className="vd-about-photo"><Photo name="tools" eager /><figcaption>{c.about.caption}</figcaption></figure><section className="vd-about-story"><h2>{c.about.storyTitle}</h2><div>{c.about.story.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></section><section className="vd-practices"><h2>{c.about.practiceTitle}</h2><div>{c.about.practices.map(item => <article key={item.name}><h3>{item.name}</h3><p>{item.body}</p><span aria-hidden="true">{c.common.arrow}</span></article>)}</div></section><section className="vd-about-method"><h2>{c.about.methodTitle}</h2><p>{c.about.methodBody}</p><a className="vd-link" href={`${basePath}/project`}>{c.about.methodAction}<span aria-hidden="true">{c.common.arrow}</span></a></section></article>;
}

export default function BotanicalTemplate({ page, basePath }: TemplateProps) {
  return <div className="kit-botanical"><a className="vd-skip" href="#vd-main">{c.common.skip}</a><header className="vd-header"><a className="vd-brand" href={basePath || "/"} aria-label={`${c.brand} ${c.wordmark} ${c.nav.home}`}><span className="vd-brand-mark" aria-hidden="true" /><strong>{c.brand}</strong><span className="vd-wordmark" lang="en">{c.wordmark}</span></a><nav aria-label={c.common.navigation}><a href={basePath || "/"} aria-current={page === "home" ? "page" : undefined}>{c.nav.home}</a><a href={`${basePath}/project`} aria-current={page === "project" ? "page" : undefined}>{c.nav.project}</a><a href={`${basePath}/about`} aria-current={page === "about" ? "page" : undefined}>{c.nav.about}</a></nav><a className="vd-nav-contact" href="#vd-contact">{c.nav.contact}<span aria-hidden="true">{c.common.arrow}</span></a></header><main id="vd-main">{page === "home" ? <Home basePath={basePath} /> : page === "project" ? <Project basePath={basePath} /> : <About basePath={basePath} />}</main><Contact /></div>;
}
