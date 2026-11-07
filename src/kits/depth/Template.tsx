"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import type { TemplateProps } from "../types";
import { content as c, type Project } from "./content";
import { Experience, Phone } from "./Scene";

const projectLink = (basePath: string, project: Project) => `${basePath}/project?project=${project.slug}`;

function Header({ page, basePath }: TemplateProps) {
  return <header className="dp-header"><a className="dp-brand" href={basePath || "/"}><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M3 4h12v24H3zM20 4h9v24h-9z" fill="none" stroke="currentColor" strokeWidth="2" /><path d="m8 24 16-16" fill="none" stroke="currentColor" strokeWidth="2" /></svg><strong>{c.wordmark}<small>{c.brand}</small></strong></a><nav aria-label={c.common.navigation}><a href={basePath || "/"} aria-current={page === "home" ? "page" : undefined}>{c.nav.home}</a><a href={`${basePath}/project`} aria-current={page === "project" ? "page" : undefined}>{c.nav.project}</a><a href={`${basePath}/about`} aria-current={page === "about" ? "page" : undefined}>{c.nav.about}<span aria-hidden="true">↗</span></a></nav></header>;
}

function Footer({ basePath, replay = false }: { basePath: string; replay?: boolean }) {
  const [notice, setNotice] = useState("");
  async function copy() { try { await navigator.clipboard.writeText(c.email); setNotice(c.common.copied); } catch { setNotice(c.common.copyError); } }
  return <footer className="dp-footer"><div className="dp-footer-top"><p>{c.common.contact}</p><a href={`${basePath}/about`} aria-label={c.nav.about}>↗</a></div><div className="dp-footer-contact"><span>{c.email}</span><button type="button" onClick={copy}>{c.common.copy}<span aria-hidden="true">⧉</span></button><p role="status">{notice}</p></div><div className="dp-footer-bottom"><p>{c.common.footer}</p><span>{c.common.contactNote}</span><a href={replay ? "#dp-chapter-arrival" : "#dp-top"}>{replay ? c.common.replay : c.common.backTop}<span aria-hidden="true">↑</span></a></div></footer>;
}

function WorkIndex({ basePath }: Pick<TemplateProps, "basePath">) {
  return <section className="dp-work-index" id="dp-work" tabIndex={-1} aria-labelledby="dp-work-title"><div className="dp-work-heading"><span>{c.home.workCount}</span><h2 id="dp-work-title">{c.home.workTitle}</h2><div><p>{c.home.workSubtitle}</p><span>{c.common.end}</span></div></div><ol className="dp-work-list">{c.projects.map((project, index) => <li key={project.slug}><a href={projectLink(basePath, project)}><span className="dp-work-number">{String(index + 1).padStart(2, "0")}</span><div className="dp-work-image"><img src={project.image} alt={project.alt} width={1600} height={1067} loading="lazy" /></div><div className="dp-work-name"><h3>{project.title}</h3><span>{project.name} / {project.category}</span></div><span className="dp-work-year">{project.year}</span><span className="dp-work-arrow" aria-hidden="true">↗</span></a></li>)}</ol><p className="dp-work-disclosure">{c.home.workDisclosure}</p><a className="dp-replay" href="#dp-chapter-arrival">{c.common.replay}<span aria-hidden="true">↺</span></a></section>;
}

function Home({ basePath }: Pick<TemplateProps, "basePath">) {
  return <><Header page="home" basePath={basePath} /><main id="dp-main"><h1 className="dp-sr-only">{c.home.title}</h1><Experience /><WorkIndex basePath={basePath} /></main><Footer basePath={basePath} replay /></>;
}

function ProjectPage({ basePath }: Pick<TemplateProps, "basePath">) {
  const [index, setIndex] = useState(0);
  useEffect(() => { const slug = new URLSearchParams(window.location.search).get("project"); setIndex(Math.max(0, c.projects.findIndex(project => project.slug === slug))); }, []);
  const project = c.projects[index], next = c.projects[(index + 1) % c.projects.length];
  const device = project.slug === "nocturne" ? "night" : project.slug === "littoral" ? "coast" : "form";
  return <><Header page="project" basePath={basePath} /><main className="dp-project" id="dp-main" data-project={project.slug} style={{ "--dp-project-color": project.color } as CSSProperties}><header className="dp-project-heading"><p>{c.common.disclosure}<span>{String(index + 1).padStart(2, "0")} / 06</span></p><h1>{project.title}</h1><div><span>{project.name}</span><span>{project.category}</span><span>{project.year}</span></div></header><figure className="dp-project-hero"><img src={project.image} alt={project.alt} width={1600} height={1067} fetchPriority="high" /><figcaption>{project.title} / {c.common.disclosure}</figcaption></figure><section className="dp-project-intro"><h2>{c.common.idea}</h2><div><p className="dp-project-lead">{project.lead}</p><p>{project.description}</p><dl><div><dt>{c.common.scope}</dt><dd>{project.scope}</dd></div><div><dt>{c.common.year}</dt><dd>{project.year}</dd></div></dl></div></section><section className="dp-project-composition" aria-label={`${project.name}概念设备与排版展示`}><span className="dp-project-word" aria-hidden="true">{project.title}</span><div className="dp-project-device"><Phone kind={device} project={project} /></div><div className="dp-project-card"><img src={project.frames[1]} alt={project.captions[1]} width={1600} height={1067} loading="lazy" /><div><strong>{project.name}</strong><span>{project.category}</span></div></div><span className="dp-composition-label">{project.title} / DIGITAL STUDY</span></section><section className="dp-project-approach"><span>02 / {c.common.approach}</span><h2>{project.lead}</h2><p>{project.approach}</p></section><section className="dp-project-frames" aria-labelledby="dp-frames-title"><div className="dp-section-label"><h2 id="dp-frames-title">{c.common.gallery}</h2><span>01—03</span></div>{project.frames.map((src, position) => <figure key={src}><img src={src} alt={project.captions[position]} width={1600} height={1067} loading="lazy" /><figcaption><span>{String(position + 1).padStart(2, "0")}</span>{project.captions[position]}</figcaption></figure>)}</section><p className="dp-photo-note">{c.common.photoNote}</p><a className="dp-next-project" href={projectLink(basePath, next)}><div><span>{c.common.next}</span><h2>{next.title}</h2><p>{next.name} / {next.category}</p></div><img src={next.image} alt="" width={1600} height={1067} loading="lazy" /><span className="dp-next-arrow" aria-hidden="true">↗</span></a><div className="dp-project-back"><a href={`${basePath || "/"}#dp-work`}>{c.common.back}<span aria-hidden="true">↖</span></a></div></main><Footer basePath={basePath} /></>;
}

function About({ basePath }: Pick<TemplateProps, "basePath">) {
  return <><Header page="about" basePath={basePath} /><main className="dp-about" id="dp-main"><header className="dp-about-heading"><p>{c.about.eyebrow}</p><h1>{c.about.title}</h1><span>{c.wordmark} / {c.brand}</span></header><div className="dp-about-picture"><img src="/assets/architecture.jpg" alt="几何建筑的结构向天空延伸" width={1600} height={1067} /><span aria-hidden="true">{c.about.english}</span></div><section className="dp-about-intro"><h2>{c.brand} / {c.wordmark}</h2><div><p>{c.about.intro}</p><p>{c.about.body}</p></div></section><div className="dp-about-principles">{c.about.sections.map((section, index) => <section key={section.title}><span>{String(index + 1).padStart(2, "0")}</span><h2>{section.title}</h2><p>{section.body}</p></section>)}</div><section className="dp-about-scope"><h2>{c.common.scope}</h2><ul>{c.about.scope.map(item => <li key={item}>{item}<span aria-hidden="true">↗</span></li>)}</ul></section><section className="dp-about-contact"><p>{c.common.contactNote}</p><h2>{c.about.contactTitle}</h2><a href={`${basePath || "/"}#dp-work`}>{c.common.back}<span aria-hidden="true">↗</span></a></section></main><Footer basePath={basePath} /></>;
}

export default function DepthTemplate({ page, basePath }: TemplateProps) {
  return <div className={`kit-depth kit-depth-${page}`} id="dp-top"><a className="dp-skip" href="#dp-main">{c.common.skip}</a>{page === "home" ? <Home basePath={basePath} /> : page === "project" ? <ProjectPage basePath={basePath} /> : <About basePath={basePath} />}</div>;
}

