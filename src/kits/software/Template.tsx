"use client";

import { useState } from "react";
import type { TemplateProps } from "../types";
import { content as c } from "./content";

type Filter = typeof c.demo.filters[number]["id"];

function Workflow({ expanded = false }: { expanded?: boolean }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [completed, setCompleted] = useState<string[]>([...c.demo.initialCompleted]);
  const [status, setStatus] = useState("");
  const visible = c.demo.tasks.filter(task => filter === "all" || (filter === "done" ? completed.includes(task.id) : !completed.includes(task.id)));
  function toggle(id: string) {
    setCompleted(previous => previous.includes(id) ? previous.filter(item => item !== id) : [...previous, id]);
    setStatus(c.demo.updatedStatus);
  }
  function reset() { setCompleted([...c.demo.initialCompleted]); setFilter("all"); setStatus(c.demo.resetStatus); }
  return <div className={`rl-workflow${expanded ? " rl-workflow-expanded" : ""}`} role="region" aria-label={c.accessibility.workflow}>
    <div className="rl-workflow-bar"><span className="rl-demo-brand">{c.wordmark}<span aria-hidden="true"> / </span><span>{c.demo.workspace}</span></span><span className="rl-demo-label">{c.demo.label}</span></div>
    <div className="rl-workflow-layout"><aside className="rl-workflow-aside"><span>{c.demo.projectLabel}</span><strong>{c.demo.name}</strong><div className="rl-project-symbol" aria-hidden="true">r.</div><p>{c.demo.description}</p></aside>
      <div className="rl-workflow-main"><div className="rl-workflow-title"><div><p>{c.demo.taskLabel}</p><h2>{c.demo.name}</h2></div><span className="rl-task-total" aria-label={`${completed.length} / ${c.demo.tasks.length} ${c.demo.completeLabel}`}>{completed.length}<span> / {c.demo.tasks.length}</span></span></div>
        <div className="rl-filters" role="group" aria-label={c.accessibility.filters}>{c.demo.filters.map(item => <button type="button" key={item.id} onClick={() => setFilter(item.id)} aria-pressed={filter === item.id}>{item.label}</button>)}</div>
        <div className="rl-task-list">{visible.length ? visible.map(task => <button className="rl-task" type="button" key={task.id} onClick={() => toggle(task.id)} aria-pressed={completed.includes(task.id)}><span className="rl-checkbox" aria-hidden="true">{completed.includes(task.id) ? "✓" : ""}</span><span className="rl-task-text"><strong>{task.title}</strong><span>{task.detail}</span></span><span className="rl-task-owner">{task.owner}</span></button>) : <div className="rl-empty"><strong>{c.demo.empty}</strong><p>{c.demo.emptyHelp}</p></div>}</div>
        <div className="rl-demo-bottom"><p aria-live="polite">{c.demo.completeLabel} {completed.length} / {c.demo.tasks.length} {c.demo.totalLabel}</p><button className="rl-text-button" type="button" onClick={reset}>{c.demo.reset}</button></div>
        {expanded && <div className="rl-project-note"><h3>{c.demo.noteTitle}</h3><p>{c.demo.note}</p></div>}
      </div>
    </div><p className="rl-demo-footnote" role="status">{status || c.demo.local}</p>
  </div>;
}

function Home({ basePath }: Pick<TemplateProps, "basePath">) {
  return <><section className="rl-hero"><div className="rl-hero-copy"><p className="rl-eyebrow">{c.home.label}</p><h1>{c.home.title.map(line => <span key={line}>{line}</span>)}</h1><p className="rl-intro">{c.home.intro}</p><div className="rl-actions"><a className="rl-button" href={`${basePath}/project`}>{c.home.action}<span aria-hidden="true">↗</span></a><a className="rl-quiet-link" href={`${basePath}/about`}>{c.home.secondary}</a></div></div><div className="rl-hero-demo"><Workflow /></div></section>
    <section className="rl-flow"><h2>{c.home.flowTitle}</h2><p>{c.home.flowBody}</p><ol>{c.home.steps.map(step => <li key={step.number}><div className="rl-step-top"><span>{step.number}</span><span aria-hidden="true">↗</span></div><h3>{step.title}</h3><p>{step.text}</p><span className="rl-step-detail">{step.detail}</span></li>)}</ol></section>
    <section className="rl-story"><figure><img src={c.images.workspace.src} alt={c.images.workspace.alt} width="1600" height="1067" loading="lazy" /><figcaption>{c.images.workspace.caption}</figcaption></figure><div><h2>{c.home.storyTitle.map(line => <span key={line}>{line}</span>)}</h2><p>{c.home.storyBody}</p><a className="rl-quiet-link" href={`${basePath}/about`}>{c.home.storyAction}<span aria-hidden="true"> ↗</span></a></div></section></>;
}

function Project({ basePath }: Pick<TemplateProps, "basePath">) {
  return <article className="rl-project"><header className="rl-page-head"><p className="rl-eyebrow">{c.project.label}</p><h1>{c.project.title.map(line => <span key={line}>{line}</span>)}</h1><p className="rl-intro">{c.project.intro}</p></header><dl className="rl-facts">{c.project.facts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl><section className="rl-experience"><h2>{c.project.demoTitle}</h2><p>{c.project.demoBody}</p><Workflow expanded /></section><section className="rl-decisions"><h2>{c.project.decisionsTitle}</h2><div>{c.project.decisions.map((item, index) => <article key={item.title}><span aria-hidden="true">0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section><section className="rl-scope-note"><h2>{c.project.scopeTitle}</h2><p>{c.project.scopeBody}</p><a className="rl-quiet-link" href={basePath || "/"}>{c.project.back}<span aria-hidden="true"> ↗</span></a></section></article>;
}

function About() {
  return <article className="rl-about"><header className="rl-page-head"><p className="rl-eyebrow">{c.about.label}</p><h1>{c.about.title.map(line => <span key={line}>{line}</span>)}</h1><p className="rl-intro">{c.about.intro}</p></header><figure className="rl-about-image"><img src={c.images.workspace.src} alt={c.images.workspace.alt} width="1600" height="1067" /><figcaption>{c.images.workspace.caption}</figcaption></figure><section className="rl-about-story"><h2>{c.about.storyTitle}</h2><p>{c.about.storyBody}</p></section><section className="rl-principles">{c.about.principles.map((item, index) => <article key={item.title}><span aria-hidden="true">0{index + 1}</span><div><h2>{item.title}</h2><p>{item.text}</p></div></article>)}</section><section className="rl-about-scope"><h2>{c.about.scopeTitle}</h2><dl>{c.about.scope.map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl></section></article>;
}

function Contact() {
  const [status, setStatus] = useState("");
  async function copyEmail() { try { await navigator.clipboard.writeText(c.email); setStatus(c.contact.copied); } catch { setStatus(c.contact.fallback); } }
  return <footer className="rl-contact" id="rl-contact"><div className="rl-contact-main"><div><h2>{c.contact.title}</h2><p>{c.contact.intro}</p></div><div className="rl-contact-email"><span>{c.contact.label}</span><strong>{c.email}</strong><button className="rl-quiet-link" type="button" onClick={copyEmail}>{c.contact.copy}<span aria-hidden="true"> ↗</span></button><p className="rl-status" aria-live="polite">{status}</p></div></div><div className="rl-footer-line"><a className="rl-brand" href="#rl-main"><strong>{c.wordmark}</strong><span>{c.brand}</span></a><p>{c.contact.note}</p><span>{c.contact.signature}</span></div></footer>;
}

export default function SoftwareTemplate({ page, basePath }: TemplateProps) {
  return <div className="kit-software"><a className="rl-skip" href="#rl-main">{c.accessibility.skip}</a><header className="rl-header"><a className="rl-brand" href={basePath || "/"} aria-label={c.accessibility.home}><strong>{c.wordmark}<span aria-hidden="true">.</span></strong><span>{c.brand}</span></a><nav aria-label={c.accessibility.navigation}><a href={basePath || "/"} aria-current={page === "home" ? "page" : undefined}>{c.nav.home}</a><a href={`${basePath}/project`} aria-current={page === "project" ? "page" : undefined}>{c.nav.project}</a><a href={`${basePath}/about`} aria-current={page === "about" ? "page" : undefined}>{c.nav.about}</a><a className="rl-nav-contact" href="#rl-contact">{c.nav.contact}<span aria-hidden="true"> ↗</span></a></nav></header><main id="rl-main">{page === "home" ? <Home basePath={basePath} /> : page === "project" ? <Project basePath={basePath} /> : <About />}</main><Contact /></div>;
}
