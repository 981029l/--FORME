"use client";

import { useState } from "react";
import type { TemplateProps } from "../types";
import { content as c } from "./content";

type PhotoName = keyof typeof c.assets;

function Photo({ name, eager = false, className = "" }: { name: PhotoName; eager?: boolean; className?: string }) {
  return <img {...c.assets[name]} className={className} loading={eager ? "eager" : "lazy"} decoding="async" />;
}

function Contact() {
  const [status, setStatus] = useState("");
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(c.email);
      setStatus(c.contact.copied);
    } catch {
      setStatus(c.contact.fallback);
    }
  }
  return (
    <footer className="mo-contact" id="mo-contact">
      <div className="mo-contact-heading"><h2>{c.contact.title}</h2><p>{c.contact.body}</p></div>
      <div className="mo-contact-address"><span className="mo-meta">{c.contact.label}</span><span className="mo-email">{c.email}</span><button className="mo-link" type="button" onClick={copyEmail}>{c.contact.copy}<span aria-hidden="true">{c.common.arrow}</span></button><p className="mo-status" aria-live="polite">{status}</p></div>
      <div className="mo-footer-line"><span>{c.brand} / {c.wordmark}</span><span>{c.contact.note}</span><span>{c.contact.credit}</span></div>
    </footer>
  );
}

function Home({ basePath }: Pick<TemplateProps, "basePath">) {
  return (
    <>
      <section className="mo-hero">
        <p className="mo-meta">{c.home.kicker}</p>
        <div className="mo-hero-heading"><h1><span lang="en">{c.home.title}</span><span>{c.home.subtitle}</span></h1><div className="mo-hero-intro"><p>{c.home.intro}</p><a className="mo-link" href={`${basePath}/project`}>{c.home.action}<span aria-hidden="true">{c.common.arrow}</span></a></div></div>
        <figure className="mo-panorama"><Photo name="architecture" eager /><figcaption><span>{c.home.caption}</span><span>{c.home.imageLabel}</span></figcaption></figure>
      </section>
      <section className="mo-work" aria-labelledby="mo-work-title">
        <div className="mo-section-heading"><h2 id="mo-work-title">{c.home.workTitle}</h2><p>{c.home.workIntro}</p></div>
        <div className="mo-index-layout">
          <figure className="mo-index-image"><Photo name="interior" /><figcaption>{c.home.workCaption}</figcaption></figure>
          <div className="mo-index"><div className="mo-index-top"><h3>{c.home.indexTitle}</h3><span className="mo-meta">{c.home.indexLabel}</span></div>{c.home.studies.map(study => <a className="mo-index-row" href={`${basePath}/project#${study.anchor}`} key={study.number}><span className="mo-number">{study.number}</span><span><strong>{study.title}</strong><small>{study.topic}</small></span><span className="mo-index-arrow" aria-hidden="true">{c.common.arrow}</span></a>)}</div>
        </div>
      </section>
      <section className="mo-belief"><span className="mo-bracket" aria-hidden="true">[ ]</span><div><h2>{c.home.beliefTitle}</h2><p>{c.home.beliefBody}</p><a className="mo-link" href={`${basePath}/about`}>{c.home.aboutAction}<span aria-hidden="true">{c.common.arrow}</span></a></div></section>
    </>
  );
}

function Project({ basePath }: Pick<TemplateProps, "basePath">) {
  return (
    <article className="mo-project">
      <header className="mo-page-heading"><p className="mo-meta">{c.project.kicker}</p><h1>{c.project.title}<span aria-hidden="true">[ ]</span></h1><p>{c.project.subtitle}</p></header>
      <Photo name="architecture" eager className="mo-project-cover" />
      <section className="mo-brief"><dl className="mo-facts">{c.project.facts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl><div><h2>{c.project.briefTitle}</h2><p>{c.project.brief}</p></div></section>
      <section className="mo-city mo-chapter" id="city"><div className="mo-chapter-heading"><span className="mo-chapter-number">{c.project.chapters[0].number}</span><div><h2>{c.project.chapters[0].title}</h2><p className="mo-chapter-subtitle">{c.project.chapters[0].subtitle}</p></div></div><div className="mo-city-copy"><p>{c.project.chapters[0].body}</p><p className="mo-meta">{c.project.chapters[0].note}</p></div></section>
      <section className="mo-dwelling mo-chapter" id="dwelling"><Photo name="interior" /><div><span className="mo-chapter-number">{c.project.chapters[1].number}</span><h2>{c.project.chapters[1].title}</h2><h3>{c.project.chapters[1].subtitle}</h3><p>{c.project.chapters[1].body}</p><p className="mo-meta">{c.project.chapters[1].note}</p></div></section>
      <section className="mo-landscape mo-chapter" id="landscape"><div className="mo-landscape-copy"><span className="mo-chapter-number">{c.project.chapters[2].number}</span><h2>{c.project.chapters[2].title}</h2><h3>{c.project.chapters[2].subtitle}</h3><p>{c.project.chapters[2].body}</p><p className="mo-meta">{c.project.chapters[2].note}</p></div><Photo name="forest" /></section>
      <section className="mo-method"><h2>{c.project.methodTitle}</h2><div className="mo-method-list">{c.project.method.map(step => <div key={step.title}><h3>{step.title}</h3><p>{step.body}</p></div>)}</div></section>
      <div className="mo-project-end"><p className="mo-disclosure">{c.project.disclosure}</p><a className="mo-link" href={basePath || "/"}>{c.common.back}<span aria-hidden="true">{c.common.arrow}</span></a></div>
    </article>
  );
}

function About() {
  return (
    <article className="mo-about">
      <section className="mo-about-heading"><p className="mo-meta">{c.about.kicker}</p><h1>{c.about.title.map(line => <span key={line}>{line}</span>)}</h1><p className="mo-about-intro">{c.about.intro}</p></section>
      <figure className="mo-about-image"><Photo name="architecture" eager /><figcaption>{c.about.caption}</figcaption></figure>
      <section className="mo-about-story"><h2>{c.about.statement}</h2><p>{c.about.body}</p></section>
      <section className="mo-services"><h2>{c.about.servicesTitle}</h2><div>{c.about.services.map(service => <div className="mo-service" key={service.title}><h3>{service.title}</h3><p>{service.detail}</p></div>)}</div></section>
      <section className="mo-about-method"><span className="mo-bracket" aria-hidden="true">[ ]</span><div><h2>{c.about.methodTitle}</h2><p>{c.about.method}</p></div></section>
    </article>
  );
}

export default function ArchitectureTemplate({ page, basePath }: TemplateProps) {
  return (
    <div className="kit-architecture">
      <a className="mo-skip" href="#mo-main">{c.common.skip}</a>
      <header className="mo-header"><a className="mo-brand" href={basePath || "/"} aria-label={`${c.wordmark} ${c.brand} ${c.nav.home}`}><strong>{c.wordmark}</strong><span>{c.brand}</span></a><nav aria-label={c.common.navigation}><a href={basePath || "/"} aria-current={page === "home" ? "page" : undefined}>{c.nav.home}</a><a href={`${basePath}/project`} aria-current={page === "project" ? "page" : undefined}>{c.nav.project}</a><a href={`${basePath}/about`} aria-current={page === "about" ? "page" : undefined}>{c.nav.about}</a><a href="#mo-contact">{c.nav.contact}<span aria-hidden="true"> {c.common.arrow}</span></a></nav></header>
      <main id="mo-main">{page === "home" ? <Home basePath={basePath} /> : page === "project" ? <Project basePath={basePath} /> : <About />}</main>
      <Contact />
    </div>
  );
}
