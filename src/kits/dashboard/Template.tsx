"use client";

import { useState, type CSSProperties } from "react";
import type { TemplateProps } from "../types";
import { content as c } from "./content";

type RecordItem = typeof c.records[number];
type Period = typeof c.periods[number]["id"];
type Status = typeof c.statuses[number]["id"];
const hoursOf = (records: readonly RecordItem[]) => records.reduce((total, record) => total + record.hours, 0);
const statusName = (id: string) => c.statuses.find(status => status.id === id)?.label || id;

function RecordsTable({ records, compact = false }: { records: readonly RecordItem[]; compact?: boolean }) {
  return <div className={`gg-table-scroll${compact ? " gg-compact" : ""}`} tabIndex={0} role="region" aria-label={c.table.caption}><table><caption className="gg-sr-only">{c.table.caption}</caption><thead><tr><th scope="col">{c.table.project}</th><th scope="col">{c.table.date}</th><th scope="col">{c.table.category}</th><th scope="col">{c.table.owner}</th><th scope="col" className="gg-number">{c.table.hours}</th><th scope="col">{c.table.status}</th></tr></thead><tbody>{records.map(record => <tr key={record.id}><th scope="row"><strong>{record.project}</strong><span>{record.task}<span className="gg-record-id"> · {record.id}</span></span></th><td className="gg-date">{record.date.slice(5).replace("-", ".")}</td><td>{record.category}</td><td>{record.owner}</td><td className="gg-number">{record.hours}<span className="gg-hour-unit"> h</span></td><td><span className={`gg-status gg-status-${record.status}`}>{statusName(record.status)}</span></td></tr>)}</tbody></table></div>;
}

function Home({ basePath }: Pick<TemplateProps, "basePath">) {
  const [periodId, setPeriodId] = useState<Period>("all");
  const period = c.periods.find(item => item.id === periodId)!;
  const records = c.records.filter(record => record.day >= period.start && record.day <= period.end);
  const hours = hoursOf(records);
  const completed = records.filter(record => record.status === "done").length;
  const rate = records.length ? Math.round(completed / records.length * 100) : 0;
  const buckets = c.buckets.filter(bucket => bucket.end >= period.start && bucket.start <= period.end).map(bucket => ({ ...bucket, hours: hoursOf(records.filter(record => record.day >= bucket.start && record.day <= bucket.end)) }));
  const maxHours = Math.max(...buckets.map(bucket => bucket.hours), 1);
  const metrics = [{ label: c.home.metrics.hours, value: hours, unit: c.units.hours, note: c.home.metricNotes.hours }, { label: c.home.metrics.records, value: records.length, unit: c.units.records, note: c.home.metricNotes.records }, { label: c.home.metrics.completed, value: completed, unit: c.units.records, note: c.home.metricNotes.completed }, { label: c.home.metrics.rate, value: rate, unit: c.units.percentage, note: c.home.metricNotes.rate }];
  return <><div className="gg-page-heading"><div><p className="gg-eyebrow">{c.home.eyebrow}</p><h1>{c.home.title}</h1><p>{c.home.intro}</p></div><div className="gg-period" role="group" aria-label={c.accessibility.period}>{c.periods.map(item => <button type="button" key={item.id} aria-pressed={periodId === item.id} onClick={() => setPeriodId(item.id)}>{item.label}</button>)}</div></div>
    <p className="gg-sr-only" role="status">{c.home.periodStatus}{period.label}，{hours} {c.units.hours}，{records.length} {c.project.countSuffix}</p>
    <dl className="gg-metrics">{metrics.map(metric => <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}<span>{metric.unit}</span><p>{metric.note}</p></dd></div>)}</dl>
    <div className="gg-charts"><section className="gg-panel gg-time"><div className="gg-panel-heading"><div><h2>{c.home.chartTitle}</h2><p>{c.home.chartSubtitle}</p></div><span className="gg-legend">{period.label}</span></div><figure aria-label={c.accessibility.chart}><ol className="gg-bar-chart">{buckets.map(bucket => <li key={bucket.label}><div className="gg-bar-track"><div className="gg-bar" style={{ "--gg-bar-value": `${bucket.hours / maxHours * 100}%` } as CSSProperties}><strong>{bucket.hours}<span className="gg-sr-only"> {c.units.hours}</span></strong></div></div><span className="gg-bar-label">{bucket.label}</span></li>)}</ol><figcaption>{c.workspace.dataset} · {new Set(records.map(record => record.owner)).size} {c.units.people}</figcaption></figure></section>
      <section className="gg-panel gg-allocation"><div className="gg-panel-heading"><div><h2>{c.home.allocationTitle}</h2><p>{c.home.allocationSubtitle}</p></div></div><ul aria-label={c.accessibility.allocation}>{c.categories.map((category, index) => { const categoryHours = hoursOf(records.filter(record => record.category === category)); const share = hours ? Math.round(categoryHours / hours * 100) : 0; return <li key={category} className={`gg-allocation-${index}`}><div><strong>{category}</strong><span>{categoryHours} {c.units.hours}<b>{share}%</b></span></div><div className="gg-allocation-track" aria-hidden="true"><span style={{ width: `${share}%` }} /></div></li>; })}</ul><p className="gg-allocation-total">{c.project.totalHours}<strong>{hours}<span> h</span></strong></p></section></div>
    <section className="gg-panel gg-recent"><div className="gg-panel-heading"><div><h2>{c.home.latestTitle}</h2><p>{c.home.latestBody}</p></div><a className="gg-text-link" href={`${basePath}/project`}>{c.home.allRecords}<span aria-hidden="true"> ↗</span></a></div><RecordsTable records={[...records].reverse().slice(0, 5)} /></section>
    <aside className="gg-reading-note"><div><h2>{c.home.readingTitle}</h2><p>{c.home.readingBody}</p></div><a className="gg-text-link" href={`${basePath}/about`}>{c.home.methodology}<span aria-hidden="true"> ↗</span></a></aside></>;
}

function Project() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status>("all");
  const [newestFirst, setNewestFirst] = useState(true);
  const [notice, setNotice] = useState("");
  const term = query.trim().toLocaleLowerCase("zh-CN");
  const records = c.records.filter(record => (statusFilter === "all" || record.status === statusFilter) && [record.id, record.project, record.task, record.owner, record.category].join(" ").toLocaleLowerCase("zh-CN").includes(term)).sort((a, b) => newestFirst ? b.day - a.day : a.day - b.day);
  function clear() { setQuery(""); setStatusFilter("all"); setNotice(""); }
  async function exportRecords() {
    let url = "";
    try {
      const rows = [[c.table.id, c.table.date, c.table.project, c.table.category, c.table.owner, c.table.hours, c.table.status], ...records.map(record => [record.id, record.date, `${record.project} / ${record.task}`, record.category, record.owner, record.hours, statusName(record.status)])];
      const csv = "\uFEFF" + rows.map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(",")).join("\r\n");
      url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
      const link = document.createElement("a"); link.href = url; link.download = c.project.exportName; document.body.appendChild(link); link.click(); link.remove();
      setNotice(`${c.project.exporting} ${records.length} ${c.project.countSuffix}`);
    } catch { setNotice(c.project.exportError); }
    finally { if (url) window.setTimeout(() => URL.revokeObjectURL(url), 1000); }
  }
  return <><div className="gg-page-heading"><div><p className="gg-eyebrow">{c.project.eyebrow}</p><h1>{c.project.title}</h1><p>{c.project.intro}</p></div><button className="gg-primary-button" type="button" onClick={exportRecords} disabled={!records.length}>{c.project.export}<span aria-hidden="true"> ↓</span></button></div>
    <section className="gg-panel gg-records"><div className="gg-filters"><label className="gg-search" htmlFor="gg-search">{c.project.searchLabel}<input id="gg-search" type="search" value={query} onChange={event => { setQuery(event.target.value); setNotice(""); }} placeholder={c.project.searchPlaceholder} autoComplete="off" /></label><label htmlFor="gg-status-filter">{c.project.statusLabel}<select id="gg-status-filter" value={statusFilter} onChange={event => { setStatusFilter(event.target.value as Status); setNotice(""); }}>{c.statuses.map(status => <option key={status.id} value={status.id}>{status.label}</option>)}</select></label><button className="gg-secondary-button" type="button" onClick={clear} disabled={!query && statusFilter === "all"}>{c.project.clear}</button></div>
      <div className="gg-results-heading"><p role="status">{c.project.summary}<strong>{records.length}</strong>{c.project.countSuffix}<span>{c.project.totalHours} <b>{hoursOf(records)} h</b></span></p><button className="gg-text-link" type="button" onClick={() => setNewestFirst(value => !value)}>{newestFirst ? c.project.sortNewest : c.project.sortOldest}</button></div>
      {records.length ? <RecordsTable records={records} /> : <div className="gg-empty"><h2>{c.table.noResults}</h2><p>{c.table.emptyHelp}</p><button className="gg-secondary-button" type="button" onClick={clear}>{c.project.clear}</button></div>}
    </section><div className="gg-records-note"><p>{c.project.note}</p><p className="gg-notice" role="status">{notice}</p></div></>;
}

function About() {
  const [compact, setCompact] = useState(false);
  const [notice, setNotice] = useState("");
  async function copyEmail() { try { await navigator.clipboard.writeText(c.email); setNotice(c.about.copied); } catch { setNotice(c.about.fallback); } }
  return <><div className="gg-page-heading"><div><p className="gg-eyebrow">{c.about.eyebrow}</p><h1>{c.about.title}</h1><p>{c.about.intro}</p></div><span className="gg-date-tag">{c.workspace.dataset}</span></div>
    <div className="gg-settings-grid"><section className="gg-panel gg-methods"><h2>{c.about.methodsTitle}</h2><p>{c.about.methodsIntro}</p><dl>{c.about.formulas.map(formula => <div key={formula.label}><dt>{formula.label}</dt><dd>{formula.formula}</dd></div>)}</dl></section><section className="gg-panel gg-preferences"><h2>{c.about.preferencesTitle}</h2><label className="gg-toggle" htmlFor="gg-compact"><span>{c.about.compact}</span><input id="gg-compact" type="checkbox" checked={compact} onChange={event => setCompact(event.target.checked)} /></label><p>{c.about.compactBody}</p><p className="gg-preference-status" role="status">{compact ? c.about.compactStatus : c.about.comfortableStatus}</p><div className="gg-density-preview" aria-hidden="true"><span /><span /><span /></div></section></div>
    <section className="gg-panel gg-preview"><div className="gg-panel-heading"><h2>{c.about.previewTitle}</h2><span>{compact ? c.about.compact : c.about.comfortableStatus}</span></div><RecordsTable records={c.records.slice(0, 3)} compact={compact} /></section>
    <div className="gg-settings-grid"><section className="gg-panel gg-help"><h2>{c.about.helpTitle}</h2>{c.about.help.map(item => <details key={item.title}><summary>{item.title}</summary><p>{item.body}</p></details>)}</section><section className="gg-panel gg-contact"><h2>{c.about.contactTitle}</h2><p>{c.about.contactBody}</p><div><span>{c.about.emailLabel}</span><strong>{c.email}</strong><button className="gg-secondary-button" type="button" onClick={copyEmail}>{c.about.copy}</button><p className="gg-notice" role="status">{notice}</p></div></section></div></>;
}

export default function DashboardTemplate({ page, basePath }: TemplateProps) {
  return <div className="kit-dashboard"><a className="gg-skip" href="#gg-main">{c.accessibility.skip}</a><header className="gg-sidebar"><a className="gg-brand" href={basePath || "/"}><strong>{c.wordmark}<span aria-hidden="true">.</span></strong><span>{c.brand}</span></a><div className="gg-workspace"><span className="gg-workspace-avatar" aria-hidden="true">{c.workspace.initials}</span><div><strong>{c.workspace.name}</strong><span>{c.workspace.label}</span></div></div><nav aria-label={c.accessibility.navigation}><a href={basePath || "/"} aria-current={page === "home" ? "page" : undefined}>{c.nav.home}</a><a href={`${basePath}/project`} aria-current={page === "project" ? "page" : undefined}>{c.nav.project}</a><a href={`${basePath}/about`} aria-current={page === "about" ? "page" : undefined}>{c.nav.about}</a></nav><div className="gg-sidebar-note"><p>{c.workspace.asideTitle}</p><span>{c.workspace.asideBody}</span><span className="gg-sidebar-edition">{c.workspace.dataset}</span></div></header><div className="gg-workbench"><div className="gg-toolbar"><p>{c.workspace.label}<span aria-hidden="true"> / </span><strong>{c.workspace.name}</strong></p><span className="gg-demo-badge">{c.workspace.badge}</span></div><main id="gg-main">{page === "home" ? <Home basePath={basePath} /> : page === "project" ? <Project /> : <About />}</main><footer className="gg-footer"><span>{c.brand} / {c.wordmark}</span><p>{c.workspace.footer}</p></footer></div></div>;
}
