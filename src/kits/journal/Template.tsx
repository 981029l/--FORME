"use client";

import { useState } from "react";
import type { TemplateProps } from "../types";
import { content as c } from "./content";

function Photo({ name, eager = false }: { name: keyof typeof c.assets; eager?: boolean }) {
  return <img {...c.assets[name]} loading={eager ? "eager" : "lazy"} decoding="async" />;
}

function Archive() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>(c.home.categories[0]);
  const articles = c.home.articles.filter(article => (category === c.home.categories[0] || article.category === category) && `${article.title}${article.deck}${article.paragraphs.join("")}`.includes(query.trim()));
  function clear() { setQuery(""); setCategory(c.home.categories[0]); }
  return <section className="fo-archive" aria-labelledby="fo-archive-title"><header><h2 id="fo-archive-title">{c.home.archiveTitle}</h2><p>{c.home.archiveIntro}</p></header><div className="fo-archive-tools"><div className="fo-filters" role="group" aria-label={c.home.filterLabel}>{c.home.categories.map(item => <button type="button" key={item} aria-pressed={category === item} aria-controls="fo-article-list" onClick={() => setCategory(item)}>{item}</button>)}</div><label className="fo-search">{c.home.searchLabel}<input type="search" value={query} placeholder={c.home.placeholder} onChange={event => setQuery(event.target.value)} /></label></div><div className="fo-results-line"><p role="status">{articles.length} {c.home.countLabel}</p>{(query || category !== c.home.categories[0]) && <button type="button" className="fo-text-button" onClick={clear}>{c.home.clear}</button>}</div><div className="fo-article-list" id="fo-article-list">{articles.map(article => <article className="fo-short" key={article.id}><p className="fo-meta">{article.category}</p><h3>{article.title}</h3><p className="fo-short-deck">{article.deck}</p><details><summary>{c.home.open}</summary><div>{article.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></details></article>)}</div>{!articles.length && <p className="fo-empty">{c.home.empty}</p>}</section>;
}

function Home({ basePath }: Pick<TemplateProps, "basePath">) {
  return <><div className="fo-masthead"><p aria-hidden="true">{c.wordmark}</p><div><span>{c.common.issue}</span><span>{c.common.edition}</span></div></div><section className="fo-frontpage"><aside className="fo-editor-letter"><h2>{c.home.editorTitle}</h2><h3>{c.home.editorSubtitle}</h3><p>{c.home.editorBody}</p><p className="fo-meta">{c.home.editorSignature}</p><a className="fo-link" href={`${basePath}/about`}>{c.home.editorAction}<span aria-hidden="true">{c.common.arrow}</span></a></aside><article className="fo-lead"><figure><Photo name="library" eager /><figcaption>{c.home.imageCaption}</figcaption></figure><p className="fo-meta fo-accent">{c.home.featureLabel}</p><h1>{c.home.title}</h1><p className="fo-lead-deck">{c.home.intro}</p><a className="fo-link" href={`${basePath}/project`}>{c.common.read}<span aria-hidden="true">{c.common.arrow}</span></a></article><aside className="fo-issue-guide"><h2>{c.home.guideTitle}</h2><ol>{c.home.guide.map((item, index) => <li key={item.id}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><a href={`${basePath}/project#fo-${item.id}`}><span>{item.type}</span><strong>{item.title}</strong></a></li>)}</ol><div className="fo-aside-note"><span>{c.home.asideLabel}</span><h3>{c.home.asideTitle}</h3><p>{c.home.asideBody}</p></div></aside></section><Archive /></>;
}

function Project({ basePath }: Pick<TemplateProps, "basePath">) {
  const [large, setLarge] = useState(false);
  return <article className={`fo-longform${large ? " fo-large-type" : ""}`}><header className="fo-essay-header"><p className="fo-meta fo-accent">{c.project.label}</p><h1>{c.project.title}</h1><p className="fo-essay-deck">{c.project.intro}</p><p className="fo-meta">{c.project.byline}</p></header><figure className="fo-essay-photo"><Photo name="library" eager /><figcaption>{c.project.caption}</figcaption></figure><div className="fo-reading-layout"><aside className="fo-reading-sidebar"><nav aria-label={c.project.toc}><h2>{c.project.toc}</h2><ol>{c.project.sections.map(section => <li key={section.id}><a href={`#fo-${section.id}`}>{section.title}</a></li>)}</ol></nav><fieldset className="fo-reading-controls"><legend>{c.project.controls}</legend><button type="button" aria-pressed={!large} onClick={() => setLarge(false)}>{c.project.standard}</button><button type="button" aria-pressed={large} onClick={() => setLarge(true)}>{c.project.large}</button></fieldset></aside><div className="fo-essay-body">{c.project.sections.map(section => <section key={section.id} id={`fo-${section.id}`}><h2>{section.title}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section>)}<div className="fo-essay-ending"><h2>{c.project.ending}</h2><p>{c.project.endingBody}</p><a className="fo-link" href={basePath || "/"}>{c.common.back}<span aria-hidden="true">{c.common.arrow}</span></a></div></div></div></article>;
}

function About() {
  return <article className="fo-about"><header className="fo-about-header"><p className="fo-meta fo-accent">{c.about.label}</p><h1>{c.about.title}</h1><p>{c.about.intro}</p></header><section className="fo-about-story"><figure><Photo name="workspace" eager /><figcaption>{c.about.caption}</figcaption></figure><div><h2>{c.about.storyTitle}</h2>{c.about.story.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></section><p className="fo-statement">{c.about.statement}</p><section className="fo-collective"><h2>{c.about.rolesTitle}</h2><div>{c.about.roles.map(role => <article key={role.title}><h3>{role.title}</h3><p>{role.description}</p></article>)}</div></section><section className="fo-practices"><h2>{c.about.practiceTitle}</h2><dl>{c.about.practices.map(item => <div key={item.title}><dt>{item.title}</dt><dd>{item.body}</dd></div>)}</dl></section></article>;
}

function Contact() {
  const [status, setStatus] = useState("");
  async function copy() {
    try { await navigator.clipboard.writeText(c.email); setStatus(c.contact.copied); }
    catch { setStatus(c.contact.fallback); }
  }
  return <footer className="fo-footer"><div className="fo-footer-top"><div><h2>{c.contact.title}</h2><p>{c.contact.body}</p></div><div className="fo-contact"><span className="fo-meta">{c.contact.label}</span><span className="fo-email">{c.email}</span><button type="button" className="fo-link" onClick={copy}>{c.contact.copy}<span aria-hidden="true">{c.common.arrow}</span></button><p className="fo-status" role="status">{status}</p></div></div><div className="fo-footer-bottom"><span>{c.contact.closing}</span><p>{c.common.disclosure}</p></div></footer>;
}

export default function JournalTemplate({ page, basePath }: TemplateProps) {
  return <div className="kit-journal"><a className="fo-skip" href="#fo-main">{c.common.skip}</a><header className="fo-header"><a className="fo-brand" href={basePath || "/"}><strong>{c.brand}</strong><span>{c.wordmark}</span></a><nav aria-label={c.common.navigation}><a href={basePath || "/"} aria-current={page === "home" ? "page" : undefined}>{c.nav.home}</a><a href={`${basePath}/project`} aria-current={page === "project" ? "page" : undefined}>{c.nav.project}</a><a href={`${basePath}/about`} aria-current={page === "about" ? "page" : undefined}>{c.nav.about}</a></nav><span className="fo-header-note">{c.common.edition}</span></header><main id="fo-main">{page === "home" ? <Home basePath={basePath} /> : page === "project" ? <Project basePath={basePath} /> : <About />}</main><Contact /></div>;
}
