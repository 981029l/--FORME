"use client";

import { useState } from "react";
import type { TemplateProps } from "../types";
import { content as c } from "./content";

function Photo({ name, eager = false, className = "" }: { name: keyof typeof c.assets; eager?: boolean; className?: string }) {
  return <img {...c.assets[name]} className={className} loading={eager ? "eager" : "lazy"} decoding="async" />;
}

function Mark({ className = "" }: { className?: string }) {
  return <span className={`ob-mark ${className}`} aria-hidden="true"><i /><i /><i /><i /></span>;
}

function Contact() {
  const [status, setStatus] = useState("");
  async function copyEmail() {
    try { await navigator.clipboard.writeText(c.email); setStatus(c.contact.copied); }
    catch { setStatus(c.contact.fallback); }
  }
  return (
    <footer className="ob-contact" id="contact">
      <div className="ob-contact-top"><h2>{c.contact.title.map(line => <span key={line}>{line}</span>)}</h2><Mark /></div>
      <div className="ob-contact-details"><p>{c.contact.intro}</p><div><span className="ob-label">{c.contact.label}</span><span className="ob-email">{c.email}</span><button className="ob-link" type="button" onClick={copyEmail}>{c.contact.copy}<span aria-hidden="true">↗</span></button><span className="ob-copy-status" aria-live="polite">{status}</span></div></div>
      <div className="ob-footer-line"><span>{c.brand} / {c.wordmark}</span><span>{c.contact.note}</span></div>
    </footer>
  );
}

function Home({ basePath }: Pick<TemplateProps, "basePath">) {
  return (
    <>
      <section className="ob-hero">
        <div className="ob-hero-copy"><p className="ob-label">{c.home.eyebrow}</p><h1>{c.home.title.map(line => <span key={line}>{line}</span>)}</h1><p className="ob-hero-intro">{c.home.intro}</p><a className="ob-pill-link" href={`${basePath}/project`}>{c.home.action}<span aria-hidden="true">↗</span></a><Mark /></div>
        <div className="ob-hero-photo"><Photo name="leaves" eager /><div className="ob-image-corner" aria-hidden="true" /></div>
      </section>
      <div className="ob-wordmark" aria-hidden="true">{c.wordmark}</div>
      <section className="ob-selected" aria-labelledby="ob-project-title">
        <div className="ob-selected-copy"><span className="ob-label">{c.home.featureType}</span><h2 id="ob-project-title">{c.home.feature}</h2><p>{c.home.featureBody}</p><a className="ob-link" href={`${basePath}/project`}>{c.home.viewProject}<span aria-hidden="true">↗</span></a></div>
        <a className="ob-selected-image" href={`${basePath}/project`} aria-label={c.home.viewProject}><Photo name="architecture" /></a>
        <figure className="ob-detail"><Photo name="interior" /><figcaption>{c.home.detailCaption}</figcaption></figure>
      </section>
      <section className="ob-statement"><h2>{c.home.statement.map(line => <span key={line}>{line}</span>)}</h2><div><p>{c.home.statementBody}</p><a className="ob-link" href={`${basePath}/about`}>{c.home.about}<span aria-hidden="true">↗</span></a></div></section>
    </>
  );
}

function Project({ basePath }: Pick<TemplateProps, "basePath">) {
  return (
    <article className="ob-project">
      <header className="ob-project-head"><div><p className="ob-label">{c.project.label}</p><h1>{c.project.title.map(line => <span key={line}>{line}</span>)}</h1><p>{c.project.intro}</p></div><Mark /><Photo name="leaves" eager /></header>
      <section className="ob-project-context"><dl>{c.project.facts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl><div><h2>{c.project.question}</h2><p>{c.project.questionBody}</p></div></section>
      <figure className="ob-project-strip"><Photo name="leaves" /><figcaption>{c.project.captions[0]}</figcaption></figure>
      <section className="ob-project-study"><div><h2>{c.project.sectionTitle}</h2><p>{c.project.sectionBody}</p><figure><Photo name="interior" /><figcaption>{c.project.captions[2]}</figcaption></figure></div><figure><Photo name="architecture" /><figcaption>{c.project.captions[1]}</figcaption></figure></section>
      <section className="ob-project-ending"><h2>{c.project.conclusion}</h2><div><p>{c.project.note}</p><a className="ob-link" href={basePath || "/"}>{c.project.back}<span aria-hidden="true">↗</span></a></div></section>
    </article>
  );
}

function About() {
  return (
    <article className="ob-about">
      <section className="ob-about-head"><div><p className="ob-label">{c.about.label}</p><h1>{c.about.title.map(line => <span key={line}>{line}</span>)}</h1><p>{c.about.intro}</p></div><div className="ob-about-photo"><Photo name="interior" eager /><Mark /></div></section>
      <section className="ob-about-story"><h2>{c.about.statement}</h2><p>{c.about.body}</p></section>
      <section className="ob-methods" aria-label="工作方法">{c.about.methods.map(method => <div key={method.title}><h3>{method.title}</h3><p>{method.text}</p></div>)}</section>
      <section className="ob-scope"><span className="ob-label">{c.about.scopeLabel}</span><p>{c.about.scope.map(item => <span key={item}>{item}</span>)}</p></section>
    </article>
  );
}

export default function ExperimentalTemplate({ page, basePath }: TemplateProps) {
  return (
    <div className="kit-experimental">
      <a className="ob-skip" href="#ob-main">跳至内容</a>
      <header className="ob-header"><a className="ob-brand" href={basePath || "/"} aria-label={`${c.brand}首页`}><strong>{c.brand}</strong><span>{c.wordmark}</span></a><nav aria-label="主导航"><a href={basePath || "/"} aria-current={page === "home" ? "page" : undefined}>{c.nav.home}</a><a href={`${basePath}/project`} aria-current={page === "project" ? "page" : undefined}>{c.nav.project}</a><a href={`${basePath}/about`} aria-current={page === "about" ? "page" : undefined}>{c.nav.about}</a><a href="#contact">{c.nav.contact}<span aria-hidden="true"> ↗</span></a></nav></header>
      <main id="ob-main">{page === "home" ? <Home basePath={basePath} /> : page === "project" ? <Project basePath={basePath} /> : <About />}</main>
      <Contact />
    </div>
  );
}
