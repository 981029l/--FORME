"use client";

import { useState } from "react";
import type { TemplateProps } from "../types";
import { content as c } from "./content";

type PhotoName = keyof typeof c.assets;

function Photo({ name, eager = false }: { name: PhotoName; eager?: boolean }) {
  return <img {...c.assets[name]} loading={eager ? "eager" : "lazy"} decoding="async" />;
}

function Contact() {
  const [status, setStatus] = useState("");
  async function copyEmail() {
    try { await navigator.clipboard.writeText(c.email); setStatus(c.contact.copied); }
    catch { setStatus(c.contact.fallback); }
  }
  return <footer className="hv-footer" id="hv-contact"><div className="hv-contact-copy"><h2>{c.contact.title}</h2><p>{c.contact.body}</p></div><div className="hv-contact-address"><span className="hv-small">{c.contact.label}</span><span className="hv-email">{c.email}</span><button className="hv-link" type="button" onClick={copyEmail}>{c.contact.copy}<span aria-hidden="true">{c.common.arrow}</span></button><p className="hv-status" role="status">{status}</p></div><div className="hv-footer-bottom"><strong>{c.brand} {c.wordmark}</strong><p>{c.contact.note}</p><span lang="en">{c.contact.closing}</span></div></footer>;
}

function Stay() {
  const [roomId, setRoomId] = useState<string>(c.project.rooms[0].id);
  const [nights, setNights] = useState<number>(c.project.estimate.defaultNights);
  const room = c.project.rooms.find(item => item.id === roomId) ?? c.project.rooms[0];
  const money = (value: number) => `${c.common.currency}${value.toLocaleString(c.common.locale)}`;
  return <section className="hv-stay" id="hv-stay"><div className="hv-room-options" role="group" aria-label={c.project.selectorLabel}>{c.project.rooms.map(item => <button type="button" key={item.id} aria-pressed={item.id === roomId} aria-controls="hv-room-detail" onClick={() => setRoomId(item.id)}>{item.name}<span lang="en">{item.english}</span></button>)}</div><p className="hv-sr-only" role="status">{c.project.selectedLabel}{room.name}</p><div className="hv-room-layout" id="hv-room-detail"><figure className="hv-room-photo"><Photo name={room.image} eager /><figcaption>{c.project.photoNote}</figcaption></figure><div className="hv-room-description"><h2>{room.name}</h2><p>{room.description}</p><dl className="hv-room-specs">{room.specs.map(spec => <div key={spec.label}><dt>{spec.label}</dt><dd>{spec.value}</dd></div>)}</dl><h3>{c.project.detailsTitle}</h3><ul>{room.features.map(feature => <li key={feature}>{feature}</li>)}</ul></div></div><div className="hv-estimate"><div><h2>{c.project.estimate.title}</h2><p>{c.project.estimate.intro}</p></div><div className="hv-estimate-input"><label htmlFor="hv-nights">{c.project.estimate.nightLabel}</label><select id="hv-nights" value={nights} onChange={event => setNights(Number(event.target.value))}>{c.project.estimate.nights.map(night => <option key={night} value={night}>{night} {c.project.estimate.nightUnit}</option>)}</select><p>{c.project.estimate.rateLabel}<strong>{money(room.rate)}</strong></p></div><div className="hv-estimate-result" role="status" aria-live="polite" aria-atomic="true"><span>{c.project.estimate.totalLabel}</span><output htmlFor="hv-nights">{money(room.rate * nights)}</output><p>{room.name}{c.common.separator}{money(room.rate)}{c.project.estimate.calculationSeparator}{nights} {c.project.estimate.nightUnit}</p></div><p className="hv-estimate-note">{c.project.estimate.note}</p></div></section>;
}

function Home({ basePath }: Pick<TemplateProps, "basePath">) {
  return <><section className="hv-hero"><div className="hv-hero-image"><Photo name="pool" eager /></div><div className="hv-hero-content"><div className="hv-hero-wordmark" lang="en" aria-hidden="true">{c.wordmark}</div><div className="hv-hero-bottom"><div><h1>{c.home.title}</h1><p>{c.home.body}</p></div><a className="hv-button hv-button-light" href={`${basePath}/project`}>{c.home.action}<span aria-hidden="true">{c.common.arrow}</span></a></div></div></section><section className="hv-intro"><h2>{c.home.introTitle}</h2><p>{c.home.intro}</p></section><section className="hv-lookbook"><header><h2>{c.home.lookbookTitle}</h2><p>{c.home.lookbookIntro}</p></header><div className="hv-lookbook-grid">{c.home.spaces.map(space => <article key={space.title}><figure><Photo name={space.image} /><figcaption>{space.caption}</figcaption></figure><h3>{space.title}</h3><p>{space.body}</p></article>)}</div></section><section className="hv-evening"><figure><Photo name="coast" /></figure><div><h2>{c.home.eveningTitle}</h2><p>{c.home.eveningBody}</p><a className="hv-link" href={`${basePath}/about`}>{c.home.eveningAction}<span aria-hidden="true">{c.common.arrow}</span></a></div></section></>;
}

function Project({ basePath }: Pick<TemplateProps, "basePath">) {
  return <article><header className="hv-page-heading"><p className="hv-kicker" lang="en">{c.project.kicker}</p><h1>{c.project.title}</h1><p>{c.project.intro}</p></header><Stay /><section className="hv-rhythm"><h2>{c.project.rhythmTitle}</h2><div>{c.project.rhythms.map(item => <article key={item.time}><span>{item.time}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}</div></section><section className="hv-questions"><h2>{c.project.questionsTitle}</h2><div>{c.project.questions.map(item => <details key={item.title}><summary>{item.title}<span aria-hidden="true">{c.common.plus}</span></summary><p>{item.body}</p></details>)}</div></section><div className="hv-back"><a className="hv-link" href={basePath || "/"}>{c.common.back}<span aria-hidden="true">{c.common.arrow}</span></a></div></article>;
}

function About() {
  return <article><header className="hv-page-heading hv-about-heading"><p className="hv-kicker" lang="en">{c.about.kicker}</p><h1>{c.about.title}</h1><p>{c.about.intro}</p></header><figure className="hv-about-photo"><Photo name="coast" eager /><figcaption>{c.about.photoCaption}</figcaption></figure><section className="hv-about-story"><h2>{c.about.storyTitle}</h2><div>{c.about.story.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></section><section className="hv-values"><h2>{c.about.valuesTitle}</h2><div>{c.about.values.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}</div></section><section className="hv-destination"><figure><Photo name="pool" /></figure><div><h2>{c.about.destinationTitle}</h2><p>{c.about.destinationBody}</p></div></section></article>;
}

export default function HotelTemplate({ page, basePath }: TemplateProps) {
  return <div className="kit-hotel"><a className="hv-skip" href="#hv-main">{c.common.skip}</a><header className="hv-header"><a className="hv-brand" href={basePath || "/"}><strong>{c.brand}</strong><span lang="en">{c.wordmark}</span></a><nav aria-label={c.common.navigation}><a href={basePath || "/"} aria-current={page === "home" ? "page" : undefined}>{c.nav.home}</a><a href={`${basePath}/project`} aria-current={page === "project" ? "page" : undefined}>{c.nav.project}</a><a href={`${basePath}/about`} aria-current={page === "about" ? "page" : undefined}>{c.nav.about}</a></nav><a className="hv-header-contact" href="#hv-contact">{c.nav.contact}<span aria-hidden="true">{c.common.arrow}</span></a></header><main id="hv-main">{page === "home" ? <Home basePath={basePath} /> : page === "project" ? <Project basePath={basePath} /> : <About />}</main><Contact /></div>;
}
