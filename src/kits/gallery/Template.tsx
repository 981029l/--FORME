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
    <footer className="nr-contact" id="contact">
      <h2>{c.contact.title}</h2>
      <div className="nr-contact-row"><p>{c.contact.intro}</p><div><span className="nr-label">{c.contact.label}</span><span className="nr-email">{c.email}</span><button type="button" className="nr-link" onClick={copyEmail}>{c.contact.copy}<span aria-hidden="true">↗</span></button><span className="nr-status" aria-live="polite">{status}</span></div></div>
      <div className="nr-footer-line"><span>{c.wordmark} / {c.brand}</span><span>{c.contact.note}</span></div>
    </footer>
  );
}

function Home({ basePath }: Pick<TemplateProps, "basePath">) {
  return (
    <>
      <section className="nr-home-head"><h1>{c.wordmark}<span className="nr-wordmark-dot" aria-hidden="true">.</span></h1><p>{c.home.intro}</p></section>
      <section className="nr-gallery" aria-label="精选影像">
        <a className="nr-primary" href={`${basePath}/project`}>
          <div className="nr-image-wrap"><Photo name="architecture" eager /></div>
          <div className="nr-caption"><h2>{c.home.feature}</h2><span aria-hidden="true">↗</span></div><p className="nr-label">{c.home.featureType}</p>
        </a>
        <figure className="nr-secondary"><Photo name="forest" /><figcaption><h2>{c.home.secondary}</h2><span className="nr-label">{c.home.secondaryType}</span></figcaption></figure>
        <div className="nr-gallery-note"><p>{c.home.statement.map(line => <span key={line}>{line}</span>)}</p><a className="nr-link" href={`${basePath}/project`}>{c.home.featureCount}<span aria-hidden="true">↗</span></a></div>
        <figure className="nr-third"><Photo name="interior" /><figcaption><h2>{c.home.third}</h2><span className="nr-label">{c.home.thirdType}</span></figcaption></figure>
      </section>
      <section className="nr-home-about"><span className="nr-about-name">{c.brand}</span><div><p>{c.home.body}</p><a className="nr-link" href={`${basePath}/about`}>{c.home.about}<span aria-hidden="true">↗</span></a></div></section>
    </>
  );
}

function Project({ basePath }: Pick<TemplateProps, "basePath">) {
  return (
    <article className="nr-project">
      <header className="nr-project-head"><div><p className="nr-label">{c.project.kicker}</p><h1>{c.project.title.map(line => <span key={line}>{line}</span>)}</h1></div><p>{c.project.subtitle}</p></header>
      <figure className="nr-project-wide"><Photo name="architecture" eager /><figcaption>{c.project.captions[0]}</figcaption></figure>
      <section className="nr-project-context"><dl>{c.project.facts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl><div><h2>{c.project.introTitle}</h2><p>{c.project.intro}</p></div></section>
      <div className="nr-project-images"><figure><Photo name="interior" /><figcaption>{c.project.captions[1]}</figcaption></figure><figure><Photo name="forest" /><figcaption>{c.project.captions[2]}</figcaption></figure></div>
      <section className="nr-project-ending"><h2>{c.project.ending}</h2><div><p>{c.project.note}</p><a className="nr-link" href={basePath || "/"}>{c.project.back}<span aria-hidden="true">↗</span></a></div></section>
    </article>
  );
}

function About() {
  return (
    <article className="nr-about">
      <section className="nr-about-head"><div><p className="nr-label">{c.about.kicker}</p><h1>{c.about.title.map(line => <span key={line}>{line}</span>)}</h1><p className="nr-about-intro">{c.about.intro}</p></div><Photo name="forest" eager /></section>
      <section className="nr-about-story"><h2>{c.about.heading}</h2><div><p>{c.about.body}</p><p className="nr-label">{c.about.scope}</p></div></section>
      <section className="nr-approach"><h2>{c.about.approachTitle}</h2><div>{c.about.approaches.map(item => <div className="nr-approach-row" key={item.name}><h3>{item.name}</h3><p>{item.text}</p></div>)}</div></section>
    </article>
  );
}

export default function GalleryTemplate({ page, basePath }: TemplateProps) {
  return (
    <div className="kit-gallery">
      <a href="#nr-main" className="nr-skip">跳至内容</a>
      <header className="nr-header"><a className="nr-brand" href={basePath || "/"} aria-label={`${c.brand}首页`}>{c.brand}<span>{c.wordmark}</span></a><nav aria-label="主导航"><a href={basePath || "/"} aria-current={page === "home" ? "page" : undefined}>{c.nav.home}</a><a href={`${basePath}/project`} aria-current={page === "project" ? "page" : undefined}>{c.nav.project}</a><a href={`${basePath}/about`} aria-current={page === "about" ? "page" : undefined}>{c.nav.about}</a><a href="#contact">{c.nav.contact}<span aria-hidden="true"> ↗</span></a></nav></header>
      <main id="nr-main">{page === "home" ? <Home basePath={basePath} /> : page === "project" ? <Project basePath={basePath} /> : <About />}</main>
      <Contact />
    </div>
  );
}
