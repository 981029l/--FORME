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
    <footer className="td-contact" id="contact">
      <div className="td-contact-heading"><p className="td-label">{c.contact.kicker}</p><h2>{c.contact.title}</h2></div>
      <div className="td-contact-body"><p>{c.contact.intro}</p><div><span className="td-label">{c.contact.label}</span><span className="td-email">{c.email}</span><button className="td-link" type="button" onClick={copyEmail}>{c.contact.copy}<span aria-hidden="true">↗</span></button><span className="td-status" aria-live="polite">{status}</span></div></div>
      <div className="td-footer-line"><a className="td-footer-brand" href="#td-main">{c.wordmark}<span>{c.brand}</span></a><span>{c.contact.note}</span><a href="#td-main">回到正文 ↑</a></div>
    </footer>
  );
}

function Home({ basePath }: Pick<TemplateProps, "basePath">) {
  return (
    <>
      <section className="td-hero"><Photo name="coast" eager /><div className="td-hero-shade" aria-hidden="true" /><div className="td-hero-copy"><p className="td-label">{c.home.kicker}</p><h1>{c.home.title.map(line => <span key={line}>{line}</span>)}</h1><a className="td-link" href={`${basePath}/project`}>{c.home.read}<span aria-hidden="true">↗</span></a></div><p className="td-hero-note"><span>{c.home.coverNote}</span><span>{c.home.coverType}</span></p></section>
      <div className="td-reading-line" aria-label="本辑阅读路径"><ol>{c.home.horizon.map(item => <li key={item.name}><span className="td-reading-dot" aria-hidden="true" /><span>{item.name}<small>{item.note}</small></span></li>)}</ol></div>
      <section className="td-intro"><div><p className="td-label">{c.home.introLabel}</p><h2>{c.home.introTitle}</h2></div><div><p>{c.home.intro}</p><a className="td-link" href={`${basePath}/project`}>{c.home.read}<span aria-hidden="true">↗</span></a></div></section>
      <section className="td-journal" aria-labelledby="td-journal-title"><header><p className="td-label">{c.home.journalLabel}</p><h2 id="td-journal-title">{c.home.journalTitle}</h2></header><div className="td-journal-spread"><article className="td-journal-sea"><figure><Photo name="coast" /><figcaption>{c.home.firstCaption}</figcaption></figure><div className="td-note"><span className="td-note-number" aria-hidden="true">01</span><div><h3>{c.home.firstTitle}</h3><p>{c.home.firstText}</p></div></div></article><article className="td-journal-desert"><figure><Photo name="desert" /><figcaption>{c.home.secondCaption}</figcaption></figure><div className="td-note"><span className="td-note-number" aria-hidden="true">02</span><div><h3>{c.home.secondTitle}</h3><p>{c.home.secondText}</p></div></div></article></div></section>
      <section className="td-home-story"><p className="td-label">{c.home.storyLabel}</p><h2>{c.home.storyTitle}</h2><div><p>{c.home.story}</p><a className="td-link" href={`${basePath}/about`}>{c.home.about}<span aria-hidden="true">↗</span></a></div></section>
      <p className="td-source-note">{c.home.source}</p>
    </>
  );
}

function Project({ basePath }: Pick<TemplateProps, "basePath">) {
  return (
    <article className="td-project">
      <header className="td-project-head"><p className="td-label">{c.project.kicker}</p><h1>{c.project.title}</h1><p>{c.project.subtitle}</p></header>
      <figure className="td-project-sea"><Photo name="coast" eager /><figcaption>{c.project.coverCaption}</figcaption></figure>
      <section className="td-project-context"><dl>{c.project.facts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl><div><p className="td-label">{c.project.briefLabel}</p><h2>{c.project.briefTitle}</h2><p>{c.project.brief}</p></div></section>
      <section className="td-chapters" aria-label="系列的编辑过程">{c.project.chapters.map(chapter => <div className="td-chapter" key={chapter.number}><span className="td-note-number" aria-hidden="true">{chapter.number}</span><h2>{chapter.title}</h2><p>{chapter.text}</p></div>)}</section>
      <figure className="td-project-desert"><Photo name="desert" /><figcaption>{c.project.desertCaption}</figcaption></figure>
      <section className="td-project-close"><h2>{c.project.closing}</h2><div><p>{c.project.closingText}</p><a className="td-link" href={basePath || "/"}>{c.project.back}<span aria-hidden="true">↗</span></a></div></section>
    </article>
  );
}

function About({ basePath }: Pick<TemplateProps, "basePath">) {
  return (
    <article className="td-about">
      <header className="td-about-head"><div><p className="td-label">{c.about.kicker}</p><h1>{c.about.title.map(line => <span key={line}>{line}</span>)}</h1></div><p>{c.about.intro}</p></header>
      <figure className="td-about-image"><Photo name="coast" eager /><figcaption>{c.about.caption}</figcaption></figure>
      <section className="td-about-story"><h2>{c.about.storyTitle}</h2><p>{c.about.story}</p></section>
      <section className="td-services"><h2>{c.about.servicesTitle}</h2><div>{c.about.services.map(service => <div className="td-service" key={service.title}><h3>{service.title}</h3><p>{service.text}</p></div>)}</div></section>
      <section className="td-method"><div><h2>{c.about.methodTitle}</h2><a className="td-link" href={`${basePath}/project`}>{c.about.methodLink}<span aria-hidden="true">↗</span></a></div><ol>{c.about.method.map((step, index) => <li key={step.title}><span className="td-label">0{index + 1}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol></section>
    </article>
  );
}

export default function TravelTemplate({ page, basePath }: TemplateProps) {
  return (
    <div className="kit-travel">
      <a className="td-skip" href="#td-main">跳至内容</a>
      <header className="td-header"><a className="td-brand" href={basePath || "/"} aria-label={`${c.wordmark} ${c.brand} 首页`}>{c.wordmark}{" "}<span>{c.brand}</span></a><nav aria-label="主导航"><a href={basePath || "/"} aria-current={page === "home" ? "page" : undefined}>{c.nav.home}</a><a href={`${basePath}/project`} aria-current={page === "project" ? "page" : undefined}>{c.nav.project}</a><a href={`${basePath}/about`} aria-current={page === "about" ? "page" : undefined}>{c.nav.about}</a><a href="#contact">{c.nav.contact}<span aria-hidden="true"> ↗</span></a></nav></header>
      <main id="td-main">{page === "home" ? <Home basePath={basePath} /> : page === "project" ? <Project basePath={basePath} /> : <About basePath={basePath} />}</main>
      <Contact />
    </div>
  );
}
