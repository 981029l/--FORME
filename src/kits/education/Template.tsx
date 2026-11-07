"use client";

import { useEffect, useRef, useState } from "react";
import type { TemplateProps } from "../types";
import { content as c } from "./content";

type Progress = Record<string, string[]>;
type Course = typeof c.courses[number];

function readProgress(): Progress {
  const stored = JSON.parse(localStorage.getItem(c.storageKey) || "{}");
  return Object.fromEntries(c.courses.map(course => [course.id, course.chapters.filter(chapter => Array.isArray(stored?.[course.id]) && stored[course.id].includes(chapter.id)).map(chapter => chapter.id)]));
}

function useProgress() {
  const [progress, setProgress] = useState<Progress>({});
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    function refresh() { try { setProgress(readProgress()); } catch { setNotice(c.reader.storageError); } }
    function sync(event: StorageEvent) { if (event.key === c.storageKey || event.key === null) refresh(); }
    refresh();
    setReady(true);
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  function save(change?: { course: string; chapter: string; complete: boolean }) {
    let latest = progress;
    try { latest = readProgress(); } catch { }
    const chapters = change ? latest[change.course] || [] : [];
    const next = change ? { ...latest, [change.course]: change.complete ? Array.from(new Set([...chapters, change.chapter])) : chapters.filter(id => id !== change.chapter) } : {};
    setProgress(next);
    try { localStorage.setItem(c.storageKey, JSON.stringify(next)); setNotice(change ? c.reader.saved : c.reader.reset); }
    catch { setNotice(c.reader.storageError); }
  }
  return { progress, ready, notice, save };
}

function CourseCover({ course }: { course: Course }) {
  return <div className={`ls-book ls-book-${course.tone}`}><span className="ls-book-spine">{c.wordmark} / {course.index}</span><div><span className="ls-book-label">{course.label}</span><strong>{course.english}</strong><span className="ls-book-number">{course.index}</span></div></div>;
}

function Home({ basePath }: Pick<TemplateProps, "basePath">) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const courses = c.courses.filter(course => (category === "all" || category === course.category) && `${course.title}${course.deck}${course.label}${course.english}`.toLocaleLowerCase("zh-CN").includes(query.trim().toLocaleLowerCase("zh-CN")));
  function clear() { setQuery(""); setCategory("all"); }
  return <><section className="ls-intro"><p className="ls-kicker">{c.common.label}</p><h1>{c.home.title.map(line => <span key={line}>{line}</span>)}</h1><div><p>{c.home.intro}</p><span>{c.common.demo}</span></div></section><section className="ls-shelf" aria-labelledby="ls-shelf-title"><div className="ls-section-heading"><h2 id="ls-shelf-title">{c.home.shelf}</h2><span>{c.courses[0].index} — {c.courses[c.courses.length - 1].index}</span></div><div className="ls-filters"><div role="group" aria-label={c.home.shelf}>{c.categories.map(item => <button key={item.id} type="button" aria-pressed={category === item.id} onClick={() => setCategory(item.id)}>{item.label}</button>)}</div><label htmlFor="ls-search">{c.home.search}<input id="ls-search" type="search" placeholder={c.home.placeholder} value={query} onChange={event => setQuery(event.target.value)} /></label></div><p className="ls-result-count" role="status">{courses.length} {c.home.count}</p><div className="ls-course-grid">{courses.map(course => <article className="ls-course" key={course.id}><a className="ls-course-cover-link" href={`${basePath}/project?course=${course.id}`}><CourseCover course={course} /><span className="ls-sr-only">{c.common.read}：{course.title}</span></a><div className="ls-course-meta"><span>{course.label}</span><span>{course.duration} {c.common.minutes} · {course.chapters.length} {c.common.chapters}</span></div><h3><a href={`${basePath}/project?course=${course.id}`}>{course.title}</a></h3><p>{course.deck}</p><a className="ls-link" href={`${basePath}/project?course=${course.id}`}>{c.common.read}<span aria-hidden="true">{c.common.arrow}</span></a></article>)}</div>{!courses.length && <div className="ls-empty"><h3>{c.home.empty}</h3><p>{c.home.emptyBody}</p><button type="button" className="ls-button" onClick={clear}>{c.home.clear}</button></div>}</section><section className="ls-study-note"><div><p className="ls-kicker">{c.wordmark} / READING ROOM</p><h2>{c.home.noteTitle}</h2><p>{c.home.note}</p><a className="ls-link" href={`${basePath}/about`}>{c.nav.about}<span aria-hidden="true">{c.common.arrow}</span></a></div><figure><img {...c.assets.library} loading="lazy" /><figcaption>{c.home.libraryCaption}</figcaption></figure></section><section className="ls-methods"><h2>{c.home.methodTitle}</h2><div>{c.home.methods.map(method => <article key={method.index}><span>{method.index}</span><h3>{method.title}</h3><p>{method.body}</p></article>)}</div></section></>;
}

function Reader() {
  const [courseId, setCourseId] = useState<string>(c.courses[0].id);
  const [chapterIndex, setChapterIndex] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const focusChapter = useRef(false);
  const { progress, ready, notice, save } = useProgress();
  useEffect(() => { const params = new URLSearchParams(window.location.search); const requested = c.courses.find(item => item.id === params.get("course")); if (requested) { setCourseId(requested.id); setChapterIndex(Math.max(0, requested.chapters.findIndex(item => item.id === params.get("chapter")))); } }, []);
  useEffect(() => { if (focusChapter.current) { headingRef.current?.focus({ preventScroll: true }); headingRef.current?.scrollIntoView({ behavior: "instant", block: "start" }); focusChapter.current = false; } }, [courseId, chapterIndex]);
  const course = c.courses.find(item => item.id === courseId) || c.courses[0];
  const chapter = course.chapters[chapterIndex];
  const done = progress[course.id] || [];
  const completed = done.includes(chapter.id);
  function toggle() { save({ course: course.id, chapter: chapter.id, complete: !completed }); }
  function selectChapter(index: number, id: string = course.id) { focusChapter.current = true; setCourseId(id); setChapterIndex(index); const selected = c.courses.find(item => item.id === id)!; const url = new URL(window.location.href); url.searchParams.set("course", id); url.searchParams.set("chapter", selected.chapters[index].id); window.history.replaceState({}, "", url); }
  function selectCourse(id: string) { selectChapter(0, id); }
  return <><header className="ls-reader-heading"><p className="ls-kicker">{c.reader.eyebrow}</p><h1>{course.title}</h1><p>{course.deck}</p></header><div className="ls-reader-layout"><aside className="ls-reader-sidebar"><label htmlFor="ls-course-select">{c.reader.courseLabel}<select id="ls-course-select" value={course.id} onChange={event => selectCourse(event.target.value)}>{c.courses.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}</select></label><div className="ls-progress"><div><span>{c.reader.progress}</span><strong>{done.length} / {course.chapters.length}</strong></div><progress aria-label={c.reader.progress} value={done.length} max={course.chapters.length} /></div><div className="ls-chapter-list" role="group" aria-label={c.reader.chaptersLabel}>{course.chapters.map((item, index) => <button type="button" key={item.id} onClick={() => selectChapter(index)} aria-pressed={index === chapterIndex} aria-controls="ls-lesson"><span className="ls-chapter-number">{String(index + 1).padStart(2, "0")}</span><span><strong>{item.title}</strong><small>{item.duration} {c.common.minutes}{done.includes(item.id) ? ` · ${c.reader.done}` : ""}</small></span></button>)}</div><p className="ls-local-note">{c.reader.local}</p></aside><article id="ls-lesson" className="ls-lesson"><div className="ls-lesson-meta"><span>{course.label}</span><span>{String(chapterIndex + 1).padStart(2, "0")} / {String(course.chapters.length).padStart(2, "0")}</span></div><h2 ref={headingRef} tabIndex={-1}>{chapter.title}</h2><div className="ls-lesson-copy">{chapter.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div><section className="ls-exercise"><h3>{c.reader.exercise}</h3><p>{chapter.exercise}</p></section><div className="ls-lesson-end"><h3>{c.reader.closing}</h3><p>{c.reader.closingBody}</p><button className="ls-button" type="button" onClick={toggle} disabled={!ready} aria-pressed={completed}>{completed ? c.reader.undo : c.reader.completed}</button></div><p className="ls-notice" role="status">{notice}</p><div className="ls-lesson-navigation"><button type="button" className="ls-link" disabled={chapterIndex === 0} onClick={() => selectChapter(chapterIndex - 1)}>{c.reader.previous}</button><button type="button" className="ls-link" disabled={chapterIndex === course.chapters.length - 1} onClick={() => selectChapter(chapterIndex + 1)}>{c.reader.next}</button></div></article></div></>;
}

function Plan({ basePath }: Pick<TemplateProps, "basePath">) {
  const { progress, ready, notice, save } = useProgress();
  const total = c.courses.reduce((sum, course) => sum + (progress[course.id]?.length || 0), 0);
  const all = c.courses.reduce((sum, course) => sum + course.chapters.length, 0);
  return <><header className="ls-plan-heading"><p className="ls-kicker">{c.plan.eyebrow}</p><h1>{c.plan.title}</h1><p>{c.plan.intro}</p></header><dl className="ls-plan-stats"><div><dt>{c.plan.total}</dt><dd>{total}<span> / {all}</span></dd></div><div><dt>{c.plan.courses}</dt><dd>{c.courses.length}</dd></div><div><dt>{c.plan.all}</dt><dd>{all}</dd></div></dl><section className="ls-plan-courses"><div className="ls-section-heading"><h2>{c.plan.progress}</h2><button className="ls-link" type="button" disabled={!ready || !total} onClick={() => save()}>{c.plan.reset}</button></div>{c.courses.map(course => { const count = progress[course.id]?.length || 0; return <article key={course.id} className="ls-plan-course"><span className="ls-plan-index">{course.index}</span><div><h3>{course.title}</h3><p>{count === course.chapters.length ? c.plan.complete : !count ? c.plan.empty : `${count} / ${course.chapters.length} ${c.reader.done}`}</p></div><progress aria-label={`${course.title}：${c.reader.progress}`} value={count} max={course.chapters.length} /><a className="ls-link" href={`${basePath}/project?course=${course.id}&chapter=${course.chapters.find(chapter => !(progress[course.id] || []).includes(chapter.id))?.id || course.chapters[0].id}`}>{c.plan.continue}<span aria-hidden="true">{c.common.arrow}</span></a></article>; })}<p className="ls-notice" role="status">{notice}</p></section><section className="ls-privacy"><h2>{c.plan.privacyTitle}</h2><p>{c.plan.privacy}</p></section></>;
}

function Footer() {
  const [notice, setNotice] = useState("");
  async function copy() { try { await navigator.clipboard.writeText(c.email); setNotice(c.common.copied); } catch { setNotice(c.common.fallback); } }
  return <footer className="ls-footer"><div><h2>{c.plan.contactTitle}</h2><p>{c.plan.contact}</p></div><div className="ls-contact"><span>{c.email}</span><button type="button" className="ls-link" onClick={copy}>{c.common.copy}</button><p className="ls-notice" role="status">{notice}</p></div><p className="ls-disclosure">{c.common.disclosure}</p></footer>;
}

export default function EducationTemplate({ page, basePath }: TemplateProps) {
  return <div className="kit-education"><a className="ls-skip" href="#ls-main">{c.common.skip}</a><header className="ls-header"><a className="ls-brand" href={basePath || "/"}><strong>{c.brand}</strong><span>{c.wordmark}</span></a><nav aria-label={c.common.navigation}><a href={basePath || "/"} aria-current={page === "home" ? "page" : undefined}>{c.nav.home}</a><a href={`${basePath}/project`} aria-current={page === "project" ? "page" : undefined}>{c.nav.project}</a><a href={`${basePath}/about`} aria-current={page === "about" ? "page" : undefined}>{c.nav.about}</a></nav><span className="ls-header-note">{c.common.demo}</span></header><main id="ls-main">{page === "home" ? <Home basePath={basePath} /> : page === "project" ? <Reader /> : <Plan basePath={basePath} />}</main><Footer /></div>;
}
