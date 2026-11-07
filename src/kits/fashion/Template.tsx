"use client";

import { useState } from "react";
import type { TemplateProps } from "../types";
import { content as c } from "./content";

function Photo({ name, eager = false, className = "" }: { name: keyof typeof c.assets; eager?: boolean; className?: string }) {
  return <img {...c.assets[name]} className={className} loading={eager ? "eager" : "lazy"} decoding="async" />;
}

function Contact() {
  const [status, setStatus] = useState("");
  async function copyEmail() {
    try { await navigator.clipboard.writeText(c.email); setStatus(c.contact.copied); }
    catch { setStatus(c.contact.fallback); }
  }
  return (
    <footer className="ch-contact" id="contact">
      <p className="ch-label">{c.contact.kicker}</p>
      <div className="ch-contact-content">
        <div><h2>{c.contact.title}</h2><p>{c.contact.intro}</p></div>
        <div className="ch-contact-details"><span className="ch-label">{c.contact.label}</span><span className="ch-email">{c.email}</span><button className="ch-link" type="button" onClick={copyEmail}>{c.contact.copy}<span aria-hidden="true">↗</span></button><span className="ch-status" aria-live="polite">{status}</span></div>
      </div>
      <div className="ch-footer-line"><span>{c.brand} / {c.wordmark}</span><span>{c.contact.note}</span><a href="#ch-main">回到正文 ↑</a></div>
    </footer>
  );
}

function Home({ basePath }: Pick<TemplateProps, "basePath">) {
  return (
    <>
      <section className="ch-masthead"><h1>{c.home.title}</h1><div className="ch-masthead-line"><span>{c.home.issue}</span><p>{c.home.subtitle}</p><span>{c.home.direction}</span></div></section>
      <section className="ch-cover" aria-labelledby="ch-cover-title">
        <figure className="ch-cover-main"><Photo name="portrait" eager /><figcaption><span>{c.home.primaryCaption}</span><span aria-hidden="true">01</span></figcaption></figure>
        <div className="ch-cover-side"><p className="ch-label">{c.home.kicker}</p><h2 id="ch-cover-title">{c.home.feature.map(line => <span key={line}>{line}</span>)}</h2><p className="ch-cover-intro">{c.home.intro}</p><figure><Photo name="fashion" /><figcaption>{c.home.secondaryCaption}</figcaption></figure><a className="ch-link" href={`${basePath}/project`}>{c.home.read}<span aria-hidden="true">↗</span></a></div>
      </section>
      <section className="ch-editorial"><p className="ch-label">{c.home.editorialLabel}</p><h2>{c.home.statement}</h2><p className="ch-editorial-copy">{c.home.editorial}</p></section>
      <section className="ch-sequence"><figure><Photo name="fashion" /><figcaption>{c.home.secondaryCaption}</figcaption></figure><div className="ch-sequence-copy"><p className="ch-label">{c.home.sequenceLabel}</p><h2>{c.home.sequenceTitle}</h2><p>{c.home.sequenceText}</p><ol>{c.home.sequence.map((item, index) => <li key={item}><span className="ch-label">0{index + 1}</span>{item}</li>)}</ol><a className="ch-link" href={`${basePath}/about`}>{c.home.about}<span aria-hidden="true">↗</span></a></div></section>
      <p className="ch-source-note">{c.home.footnote}</p>
    </>
  );
}

function Project({ basePath }: Pick<TemplateProps, "basePath">) {
  return (
    <article className="ch-project">
      <header className="ch-project-head"><p className="ch-label">{c.project.kicker}</p><h1>{c.project.title}</h1><p>{c.project.subtitle}</p></header>
      <section className="ch-opening"><figure><Photo name="portrait" eager /><figcaption>{c.project.plateOne}</figcaption></figure><div className="ch-project-brief"><span className="ch-plate-number" aria-hidden="true">01</span><h2>{c.project.briefTitle}</h2><p>{c.project.brief}</p><dl>{c.project.facts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl></div></section>
      <section className="ch-process"><h2>{c.project.processTitle}</h2><div>{c.project.process.map(item => <div className="ch-process-row" key={item.step}><span className="ch-label">{item.step}</span><h3>{item.title}</h3><p>{item.text}</p></div>)}</div></section>
      <figure className="ch-project-second"><div className="ch-plate-heading"><span className="ch-plate-number" aria-hidden="true">02</span><span className="ch-label">{c.home.direction}</span></div><Photo name="fashion" /><figcaption>{c.project.plateTwo}</figcaption></figure>
      <section className="ch-ending"><h2>{c.project.ending}</h2><div><p>{c.project.note}</p><a className="ch-link" href={basePath || "/"}>{c.project.back}<span aria-hidden="true">↗</span></a></div></section>
    </article>
  );
}

function About({ basePath }: Pick<TemplateProps, "basePath">) {
  return (
    <article className="ch-about">
      <header className="ch-about-head"><div><p className="ch-label">{c.about.kicker}</p><h1>{c.about.title.map(line => <span key={line}>{line}</span>)}</h1><p className="ch-about-intro">{c.about.intro}</p></div><figure><Photo name="portrait" eager /><figcaption>{c.about.imageCaption}</figcaption></figure></header>
      <section className="ch-about-story"><p className="ch-label">{c.wordmark} / {c.brand}</p><h2>{c.about.storyTitle}</h2><p>{c.about.story}</p></section>
      <section className="ch-services"><h2>{c.about.servicesTitle}</h2><div>{c.about.services.map(service => <div className="ch-service" key={service.title}><h3>{service.title}</h3><div><p>{service.text}</p><span className="ch-label">{service.detail}</span></div></div>)}</div></section>
      <section className="ch-method"><h2>{c.about.methodTitle}</h2><div><p>{c.about.method}</p><a className="ch-link" href={`${basePath}/project`}>{c.about.methodLink}<span aria-hidden="true">↗</span></a></div></section>
    </article>
  );
}

export default function FashionTemplate({ page, basePath }: TemplateProps) {
  return (
    <div className="kit-fashion">
      <a className="ch-skip" href="#ch-main">跳至内容</a>
      <header className="ch-header"><a className="ch-brand" href={basePath || "/"} aria-label={`${c.brand} ${c.wordmark} 首页`}>{c.brand}{" "}<span>{c.wordmark}</span></a><nav aria-label="主导航"><a href={basePath || "/"} aria-current={page === "home" ? "page" : undefined}>{c.nav.home}</a><a href={`${basePath}/project`} aria-current={page === "project" ? "page" : undefined}>{c.nav.project}</a><a href={`${basePath}/about`} aria-current={page === "about" ? "page" : undefined}>{c.nav.about}</a><a href="#contact">{c.nav.contact}<span aria-hidden="true"> ↗</span></a></nav></header>
      <main id="ch-main">{page === "home" ? <Home basePath={basePath} /> : page === "project" ? <Project basePath={basePath} /> : <About basePath={basePath} />}</main>
      <Contact />
    </div>
  );
}
