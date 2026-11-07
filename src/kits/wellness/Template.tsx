"use client";

import { useState } from "react";
import type { TemplateProps } from "../types";
import { content as c } from "./content";

function Photo({ name, eager = false }: { name: keyof typeof c.assets; eager?: boolean }) {
  return <img {...c.assets[name]} loading={eager ? "eager" : "lazy"} decoding="async" />;
}

function Contact() {
  const [status, setStatus] = useState("");
  async function copyEmail() {
    try { await navigator.clipboard.writeText(c.email); setStatus(c.contact.copied); }
    catch { setStatus(c.contact.fallback); }
  }
  return <footer className="ea-footer" id="ea-contact"><div><h2>{c.contact.title}</h2><p>{c.contact.body}</p></div><div className="ea-contact-address"><span className="ea-small">{c.contact.label}</span><span className="ea-email">{c.email}</span><button type="button" className="ea-link" onClick={copyEmail}>{c.contact.copy}<span aria-hidden="true">{c.common.arrow}</span></button><p className="ea-status" role="status">{status}</p></div><div className="ea-footer-bottom"><strong>{c.brand} <span lang="en">{c.wordmark}</span></strong><p>{c.contact.note}</p><span lang="en">{c.contact.closing}</span></div></footer>;
}

function Schedule({ basePath }: Pick<TemplateProps, "basePath">) {
  const [day, setDay] = useState<string>(c.schedule.defaultDay);
  const [type, setType] = useState<string>(c.schedule.defaultType);
  const sessions = c.schedule.sessions.filter(session => (day === "all" || session.day === day) && (type === "all" || session.type === type));
  const selectedDay = c.schedule.days.find(item => item.id === day) ?? c.schedule.days[0];
  const selectedType = c.schedule.types.find(item => item.id === type) ?? c.schedule.types[0];
  function resetSchedule() { setDay("all"); setType("all"); }
  return <section className="ea-schedule" id="ea-schedule"><header><h2>{c.schedule.title}</h2><p>{c.schedule.intro}</p></header><div className="ea-schedule-controls"><div className="ea-days" role="group" aria-label={c.schedule.label}>{c.schedule.days.map(item => <button key={item.id} type="button" aria-pressed={day === item.id} aria-controls="ea-sessions" onClick={() => setDay(item.id)}>{item.label}</button>)}</div><label className="ea-type" htmlFor="ea-class-type">{c.schedule.typeLabel}<select id="ea-class-type" value={type} onChange={event => setType(event.target.value)}>{c.schedule.types.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label></div><p className="ea-schedule-count" role="status" aria-live="polite" aria-atomic="true">{selectedDay.label}{c.common.separator}{selectedType.label}{c.common.separator}{sessions.length} {c.schedule.resultLabel}</p><div id="ea-sessions" className="ea-sessions">{sessions.length ? sessions.map(session => <article key={session.id} className="ea-session"><div className="ea-session-time"><time>{session.time}</time><span>{c.schedule.days.find(item => item.id === session.day)?.label}</span></div><div className="ea-session-title"><h3>{session.title}</h3><p>{c.schedule.types.find(item => item.id === session.type)?.label}{c.common.separator}{session.location}</p></div><span className="ea-session-length">{session.duration} {c.common.minute}</span><span className="ea-session-level">{session.level}</span></article>) : <div className="ea-empty"><h3>{c.schedule.emptyTitle}</h3><p>{c.schedule.emptyBody}</p><button className="ea-link" type="button" onClick={resetSchedule}>{c.schedule.reset}<span aria-hidden="true">{c.common.arrow}</span></button></div>}</div><div className="ea-schedule-bottom"><p>{c.schedule.note}</p><a className="ea-link" href={`${basePath}/project`}>{c.schedule.action}<span aria-hidden="true">{c.common.arrow}</span></a></div></section>;
}

function Practice() {
  const [practiceId, setPracticeId] = useState<string>(c.project.defaultPractice);
  const practice = c.project.practices.find(item => item.id === practiceId) ?? c.project.practices[0];
  return <section className="ea-practice" id="ea-practice"><div className="ea-practice-options" role="group" aria-label={c.project.selectorLabel}>{c.project.practices.map(item => <button key={item.id} type="button" aria-pressed={practiceId === item.id} aria-controls="ea-practice-content" onClick={() => setPracticeId(item.id)}>{item.title}<span>{item.duration} {c.common.minute}</span></button>)}</div><p className="ea-sr-only" role="status">{c.project.selectedLabel}{practice.title}</p><article id="ea-practice-content" className="ea-practice-content"><header><span lang="en">{practice.english}</span><h2>{practice.title}</h2><p>{practice.intro}</p></header><aside className="ea-preparation"><h3>{c.project.equipmentTitle}</h3><ul>{practice.equipment.map(item => <li key={item}>{item}</li>)}</ul></aside><section className="ea-steps"><h3>{c.project.stepsTitle}</h3><div>{practice.steps.map((step, index) => <article key={step.title}><span className="ea-step-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><div><h4>{step.title}</h4><p>{step.body}</p></div><span className="ea-step-length">{step.duration} {c.common.minute}</span></article>)}</div></section><aside className="ea-reminder"><h3>{c.project.guideTitle}</h3><p>{practice.reminder}</p></aside></article></section>;
}

function Home({ basePath }: Pick<TemplateProps, "basePath">) {
  return <><section className="ea-hero"><p className="ea-kicker" lang="en">{c.home.kicker}</p><h1>{c.home.title.map(line => <span key={line}>{line}</span>)}</h1><figure className="ea-hero-orbit" aria-hidden="true"><img {...c.assets.coast} alt="" decoding="async" /></figure><div className="ea-hero-copy"><p>{c.home.body}</p><a className="ea-button" href="#ea-schedule">{c.home.action}<span aria-hidden="true">{c.common.arrow}</span></a></div><figure className="ea-hero-photo"><Photo name="movement" eager /></figure><p className="ea-hero-note">{c.home.smallNote}</p></section><section className="ea-intro"><h2>{c.home.introTitle}</h2><div><p>{c.home.introBody}</p><a className="ea-link" href={`${basePath}/project`}>{c.home.introAction}<span aria-hidden="true">{c.common.arrow}</span></a></div></section><section className="ea-practices-overview"><h2>{c.home.practicesTitle}</h2><div>{c.home.practices.map((practice, index) => <article key={practice.title}><span className="ea-practice-mark" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h3>{practice.title}</h3><span className="ea-small" lang="en">{practice.english}</span><p>{practice.body}</p></article>)}</div></section><Schedule basePath={basePath} /><section className="ea-closing"><div className="ea-closing-word" aria-hidden="true">{c.wordmark}</div><div><h2>{c.home.closingTitle}</h2><p>{c.home.closingBody}</p><a className="ea-link" href={`${basePath}/about`}>{c.home.closingAction}<span aria-hidden="true">{c.common.arrow}</span></a></div></section></>;
}

function Project({ basePath }: Pick<TemplateProps, "basePath">) {
  return <article><header className="ea-page-heading"><p className="ea-kicker" lang="en">{c.project.kicker}</p><h1>{c.project.title.map(line => <span key={line}>{line}</span>)}</h1><p>{c.project.intro}</p></header><figure className="ea-project-photo"><Photo name="movement" eager /><figcaption>{c.project.caption}</figcaption></figure><Practice /><aside className="ea-safety"><h2>{c.project.safetyTitle}</h2><p>{c.project.safetyBody}</p></aside><section className="ea-questions"><h2>{c.project.questionsTitle}</h2><div>{c.project.questions.map(item => <details key={item.title}><summary>{item.title}<span aria-hidden="true">{c.common.plus}</span></summary><p>{item.body}</p></details>)}</div></section><div className="ea-back"><a className="ea-link" href={basePath || "/"}>{c.common.back}<span aria-hidden="true">{c.common.arrow}</span></a></div></article>;
}

function About() {
  return <article><header className="ea-page-heading ea-about-heading"><p className="ea-kicker" lang="en">{c.about.kicker}</p><h1>{c.about.title.map(line => <span key={line}>{line}</span>)}</h1><p>{c.about.intro}</p></header><section className="ea-about-story"><figure><Photo name="coast" eager /></figure><div><h2>{c.about.storyTitle}</h2>{c.about.story.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></section><section className="ea-values"><h2>{c.about.valuesTitle}</h2><div>{c.about.values.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}</div></section><section className="ea-place"><div><h2>{c.about.placeTitle}</h2><p>{c.about.placeBody}</p><p className="ea-small">{c.about.placeNote}</p></div><figure><Photo name="room" /></figure></section><div className="ea-about-closing"><p>{c.about.closing}</p><span aria-hidden="true">{c.wordmark}</span></div></article>;
}

export default function WellnessTemplate({ page, basePath }: TemplateProps) {
  return <div className="kit-wellness"><a className="ea-skip" href="#ea-main">{c.common.skip}</a><header className="ea-header"><a className="ea-brand" href={basePath || "/"}><span lang="en">{c.wordmark}</span><strong>{c.brand}</strong></a><nav aria-label={c.common.navigation}><a href={basePath || "/"} aria-current={page === "home" ? "page" : undefined}>{c.nav.home}</a><a href={`${basePath}/project`} aria-current={page === "project" ? "page" : undefined}>{c.nav.project}</a><a href={`${basePath}/about`} aria-current={page === "about" ? "page" : undefined}>{c.nav.about}</a></nav><a className="ea-header-contact" href="#ea-contact">{c.nav.contact}<span aria-hidden="true">{c.common.arrow}</span></a></header><main id="ea-main">{page === "home" ? <Home basePath={basePath} /> : page === "project" ? <Project basePath={basePath} /> : <About />}</main><Contact /></div>;
}
