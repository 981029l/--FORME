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
    <footer className="tr-contact" id="tr-contact">
      <h2>{c.contact.title}</h2><p className="tr-contact-body">{c.contact.body}</p>
      <div className="tr-contact-address"><span className="tr-label">{c.contact.label}</span><span className="tr-email">{c.email}</span><button type="button" className="tr-link" onClick={copyEmail}>{c.contact.copy}<span aria-hidden="true">{c.common.arrow}</span></button><p className="tr-status" aria-live="polite">{status}</p></div>
      <div className="tr-footer-line"><span>{c.brand} / {c.wordmark}</span><span>{c.contact.note}</span><span>{c.contact.closing}</span></div>
    </footer>
  );
}

function Home({ basePath }: Pick<TemplateProps, "basePath">) {
  return (
    <>
      <section className="tr-hero"><p className="tr-label">{c.home.kicker}</p><h1>{c.home.title.map(line => <span key={line}>{line}</span>)}</h1><a className="tr-link" href={`${basePath}/project`}>{c.home.action}<span aria-hidden="true">{c.common.arrow}</span></a>
        <div className="tr-hero-plate"><p className="tr-hero-aside">{c.home.aside}</p><figure><Photo name="ceramics" eager /><figcaption><span>{c.home.caption}</span><span lang="en">{c.home.captionEnglish}</span><span>{c.home.captionNote}</span></figcaption></figure><p className="tr-vertical">{c.home.vertical}</p></div>
      </section>
      <section className="tr-statement"><h2>{c.home.statement}</h2><p>{c.home.statementBody}</p></section>
      <section className="tr-journal"><div className="tr-journal-copy"><h2>{c.home.journalTitle}</h2><p>{c.home.journalBody}</p><div className="tr-note-links">{c.home.notes.map(note => <a href={`${basePath}/project#${note.anchor}`} key={note.anchor}><span>{note.title}</span><small>{note.text}</small><span aria-hidden="true">{c.common.arrow}</span></a>)}</div></div><figure><Photo name="pottery" /><figcaption>{c.home.journalCaption}</figcaption></figure></section>
      <section className="tr-about-invite"><p>{c.home.aboutLine}</p><a className="tr-link" href={`${basePath}/about`}>{c.home.aboutAction}<span aria-hidden="true">{c.common.arrow}</span></a></section>
    </>
  );
}

function Project({ basePath }: Pick<TemplateProps, "basePath">) {
  return (
    <article className="tr-project">
      <header className="tr-page-heading"><p className="tr-label" lang="en">{c.project.kicker}</p><h1>{c.project.title}</h1><p>{c.project.subtitle}</p><dl className="tr-facts">{c.project.facts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl></header>
      <figure className="tr-project-cover"><div><Photo name="ceramics" eager /></div><figcaption>{c.project.coverCaption}</figcaption></figure>
      <section className="tr-project-brief"><h2>{c.project.briefTitle}</h2><p>{c.project.brief}</p></section>
      <section className="tr-form" id="form"><h2>{c.project.formTitle}</h2><div><p>{c.project.formBody}</p><p className="tr-label">{c.project.formNote}</p></div></section>
      <section className="tr-glaze" id="glaze"><Photo name="pottery" /><div><h2>{c.project.glazeTitle}</h2><p>{c.project.glazeBody}</p><p className="tr-label">{c.project.glazeNote}</p></div></section>
      <section className="tr-daily" id="daily"><h2>{c.project.dailyTitle}</h2><p>{c.project.dailyBody}</p></section>
      <section className="tr-process"><h2>{c.project.processTitle}</h2><div>{c.project.process.map(step => <div className="tr-process-step" key={step.number}><span className="tr-step-number" aria-hidden="true">{step.number}</span><h3>{step.title}</h3><p>{step.body}</p></div>)}</div></section>
      <div className="tr-project-end"><p>{c.project.disclosure}</p><a className="tr-link" href={basePath || "/"}>{c.common.back}<span aria-hidden="true">{c.common.arrow}</span></a></div>
    </article>
  );
}

function About() {
  return (
    <article className="tr-about">
      <section className="tr-about-heading"><p className="tr-label" lang="en">{c.about.kicker}</p><h1>{c.about.title.map(line => <span key={line}>{line}</span>)}</h1><p className="tr-about-intro">{c.about.intro}</p></section>
      <figure className="tr-about-image"><Photo name="pottery" eager /><figcaption>{c.about.caption}</figcaption></figure>
      <section className="tr-about-story"><h2>{c.about.storyTitle}</h2><div>{c.about.story.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></section>
      <section className="tr-services"><h2>{c.about.servicesTitle}</h2><div>{c.about.services.map(service => <div className="tr-service" key={service.title}><h3>{service.title}</h3><p>{service.text}</p></div>)}</div></section>
      <section className="tr-about-method"><p className="tr-label">{c.about.methodNote}</p><h2>{c.about.methodTitle}</h2><p>{c.about.methodBody}</p></section>
    </article>
  );
}

export default function CeramicTemplate({ page, basePath }: TemplateProps) {
  return (
    <div className="kit-ceramic">
      <a className="tr-skip" href="#tr-main">{c.common.skip}</a>
      <header className="tr-header"><nav className="tr-nav-start" aria-label={c.common.workNavigation}><a href={basePath || "/"} aria-current={page === "home" ? "page" : undefined}>{c.nav.home}</a><a href={`${basePath}/project`} aria-current={page === "project" ? "page" : undefined}>{c.nav.project}</a></nav><a className="tr-brand" href={basePath || "/"} aria-label={`${c.wordmark} ${c.brand} ${c.nav.home}`}><strong>{c.wordmark}</strong><span>{c.brand}</span></a><nav className="tr-nav-end" aria-label={c.common.studioNavigation}><a href={`${basePath}/about`} aria-current={page === "about" ? "page" : undefined}>{c.nav.about}</a><a href="#tr-contact">{c.nav.contact}</a></nav></header>
      <main id="tr-main">{page === "home" ? <Home basePath={basePath} /> : page === "project" ? <Project basePath={basePath} /> : <About />}</main>
      <Contact />
    </div>
  );
}
