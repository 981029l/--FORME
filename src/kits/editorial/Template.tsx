"use client";

import { useState } from "react";
import type { TemplateProps } from "../types";
import { content as c } from "./content";

type PhotoName = keyof typeof c.assets;

function Photo({ name, eager = false, className = "" }: { name: PhotoName; eager?: boolean; className?: string }) {
  return <img {...c.assets[name]} className={className} loading={eager ? "eager" : "lazy"} decoding="async" />;
}

function Contact() {
  const [copyLabel, setCopyLabel] = useState<string>(c.contact.copy);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(c.email);
      setCopyLabel(c.contact.copied);
    } catch {
      setCopyLabel(c.contact.fallback);
    }
  }
  return (
    <footer className="ed-contact" id="contact">
      <div className="ed-contact-top">
        <h2>{c.contact.title}</h2>
        <div className="ed-contact-info">
          <p>{c.contact.body}</p>
          <span className="ed-label">{c.contact.label}</span>
          <span className="ed-email">{c.email}</span>
          <button type="button" className="ed-text-link" onClick={copyEmail}>{c.contact.copy} <span aria-hidden="true">↗</span></button>
          <span className="ed-copy-state" aria-live="polite">{copyLabel === c.contact.copy ? "" : copyLabel}</span>
        </div>
      </div>
      <div className="ed-footer-bottom"><span>{c.wordmark} / {c.brand}</span><span>{c.contact.note}</span></div>
    </footer>
  );
}

function Home({ basePath }: Pick<TemplateProps, "basePath">) {
  return (
    <>
      <section className="ed-hero">
        <div className="ed-hero-copy">
          <p className="ed-label">{c.home.eyebrow}</p>
          <h1>{c.home.title.map(line => <span key={line}>{line}</span>)}</h1>
          <p className="ed-intro">{c.home.intro}</p>
          <a className="ed-text-link" href={`${basePath}/project`}>{c.home.action}<span aria-hidden="true">↗</span></a>
        </div>
        <div className="ed-hero-image"><Photo name="interior" eager /></div>
      </section>
      <section className="ed-work" aria-labelledby="ed-work-title">
        <div className="ed-work-heading"><h2 id="ed-work-title">{c.nav.project}</h2><span className="ed-label">SELECTED WORK</span></div>
        <div className="ed-work-grid">
          <a className="ed-work-main" href={`${basePath}/project`}>
            <div className="ed-image-wrap"><Photo name="architecture" /></div>
            <div className="ed-work-caption"><h3>{c.home.featured}</h3><span aria-hidden="true">↗</span></div>
            <p className="ed-label">{c.home.projectType}</p>
          </a>
          <div className="ed-work-side">
            <p>{c.home.projectIntro}</p>
            <figure><Photo name="forest" /><figcaption>{c.home.photoNote}</figcaption></figure>
          </div>
        </div>
      </section>
      <section className="ed-statement">
        <span className="ed-statement-mark" aria-hidden="true">f.</span>
        <div><h2>{c.home.statement}</h2><p>{c.home.statementBody}</p><a className="ed-text-link" href={`${basePath}/about`}>{c.home.about}<span aria-hidden="true">↗</span></a></div>
      </section>
    </>
  );
}

function Project({ basePath }: Pick<TemplateProps, "basePath">) {
  return (
    <article className="ed-project">
      <header className="ed-page-title"><p className="ed-label">{c.project.kicker}</p><h1>{c.project.title}</h1><p>{c.project.subtitle}</p></header>
      <Photo name="interior" eager className="ed-project-cover" />
      <section className="ed-project-intro">
        <dl className="ed-facts">{c.project.facts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>
        <div><h2>{c.project.introTitle}</h2><p>{c.project.intro}</p></div>
      </section>
      <section className="ed-project-pair">
        <Photo name="architecture" />
        <div><h2>{c.project.approachTitle}</h2><p>{c.project.approach}</p><Photo name="forest" /></div>
      </section>
      <p className="ed-project-caption">{c.project.caption}</p>
      <section className="ed-project-ending"><h2>{c.project.resultTitle}</h2><div><p>{c.project.result}</p><a className="ed-text-link" href={basePath || "/"}>{c.project.back}<span aria-hidden="true">↗</span></a></div></section>
    </article>
  );
}

function About() {
  return (
    <article className="ed-about">
      <section className="ed-about-hero">
        <div><p className="ed-label">{c.about.kicker}</p><h1>{c.about.title.map(line => <span key={line}>{line}</span>)}</h1><p className="ed-intro">{c.about.intro}</p></div>
        <Photo name="forest" eager />
      </section>
      <section className="ed-about-story"><h2>{c.about.statement}</h2><div><p>{c.about.body}</p><p className="ed-label">{c.about.services}</p></div></section>
      <section className="ed-process"><h2>{c.about.processTitle}</h2><div>{c.about.steps.map(step => <div className="ed-process-row" key={step.title}><h3>{step.title}</h3><p>{step.text}</p></div>)}</div></section>
    </article>
  );
}

export default function EditorialTemplate({ page, basePath }: TemplateProps) {
  return (
    <div className="kit-editorial">
      <a className="ed-skip" href="#ed-main">跳至内容</a>
      <header className="ed-header">
        <a className="ed-brand" href={basePath || "/"} aria-label={`${c.brand} ${c.nav.home}`}><strong>{c.brand}</strong><span>{c.wordmark}</span></a>
        <nav aria-label="主导航">
          <a href={basePath || "/"} aria-current={page === "home" ? "page" : undefined}>{c.nav.home}</a>
          <a href={`${basePath}/project`} aria-current={page === "project" ? "page" : undefined}>{c.nav.project}</a>
          <a href={`${basePath}/about`} aria-current={page === "about" ? "page" : undefined}>{c.nav.about}</a>
          <a href="#contact">{c.nav.contact}<span aria-hidden="true"> ↗</span></a>
        </nav>
      </header>
      <main id="ed-main">{page === "home" ? <Home basePath={basePath} /> : page === "project" ? <Project basePath={basePath} /> : <About />}</main>
      <Contact />
    </div>
  );
}
