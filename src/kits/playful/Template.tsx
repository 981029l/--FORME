"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import type { TemplateProps } from "../types";
import { content as c } from "./content";

type Artwork = (typeof c.artworks)[number];
type Palette = (typeof c.palettes)[number];

function pixels(artwork: Artwork) { return artwork.rows.join("").split("").map(Number); }

function PixelArt({ artwork, palette }: { artwork: Artwork; palette: Palette }) {
  return <div className="hp-pixel-art" role="img" aria-label={artwork.alt}>{pixels(artwork).map((color, index) => <span key={index} style={{ backgroundColor: palette.colors[color].hex }} />)}</div>;
}

function Editor({ compact = false, paletteIndex, setPaletteIndex, basePath }: { compact?: boolean; paletteIndex: number; setPaletteIndex: (index: number) => void; basePath: string }) {
  const [artworkIndex, setArtworkIndex] = useState(0);
  const [cells, setCells] = useState(() => pixels(c.artworks[0]));
  const [colorIndex, setColorIndex] = useState(2);
  const [focusIndex, setFocusIndex] = useState(0);
  const [status, setStatus] = useState<string>(compact ? c.editor.homeStatus : c.editor.defaultStatus);
  const [exporting, setExporting] = useState(false);
  const cellRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const palette = c.palettes[paletteIndex];
  function cellLabel(index: number, color: number) { return `${c.editor.row} ${Math.floor(index / c.editor.size) + 1} ${c.editor.column} ${index % c.editor.size + 1} ${c.editor.cellEnd}，${palette.colors[color].name}`; }
  function paint(index: number) {
    const nextColor = cells[index] === colorIndex ? 0 : colorIndex;
    setCells(current => current.map((value, position) => position === index ? nextColor : value));
    setStatus(`${nextColor ? c.editor.updated : c.editor.erased}：${cellLabel(index, nextColor)}`);
  }
  function move(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = Math.min(cells.length - 1, index + 1);
    else if (event.key === "ArrowLeft") next = Math.max(0, index - 1);
    else if (event.key === "ArrowDown") next = index + c.editor.size < cells.length ? index + c.editor.size : index;
    else if (event.key === "ArrowUp") next = index >= c.editor.size ? index - c.editor.size : index;
    else if (event.key === "Home") next = event.ctrlKey ? 0 : Math.floor(index / c.editor.size) * c.editor.size;
    else if (event.key === "End") next = event.ctrlKey ? cells.length - 1 : Math.floor(index / c.editor.size) * c.editor.size + c.editor.size - 1;
    else return;
    event.preventDefault();
    setFocusIndex(next);
    cellRefs.current[next]?.focus();
  }
  function load(index: number) {
    setArtworkIndex(index); setCells(pixels(c.artworks[index]));
    setStatus(`${c.editor.loaded}${c.artworks[index].name}`);
  }
  async function exportPng() {
    setExporting(true);
    try {
      const canvas = document.createElement("canvas");
      canvas.width = c.editor.exportSize; canvas.height = c.editor.exportSize;
      const context = canvas.getContext("2d");
      if (!context) throw new Error(c.editor.exportError);
      const cellSize = c.editor.exportSize / c.editor.size;
      cells.forEach((color, index) => { context.fillStyle = palette.colors[color].hex; context.fillRect(index % c.editor.size * cellSize, Math.floor(index / c.editor.size) * cellSize, cellSize, cellSize); });
      const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob(value => value ? resolve(value) : reject(new Error(c.editor.exportError)), "image/png"));
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url; link.download = c.editor.filename; document.body.appendChild(link); link.click(); link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setStatus(c.editor.exported);
    } catch { setStatus(c.editor.exportError); }
    finally { setExporting(false); }
  }
  return <section className={`hp-editor ${compact ? "hp-editor-home" : "hp-editor-full"}`} aria-label={c.editor.title}><div className="hp-canvas-shell"><div className="hp-canvas-meta"><span>{c.editor.gridLabel}</span><span>{c.artworks[artworkIndex].name}</span></div><div className="hp-pixel-grid" role="group" aria-label={c.editor.canvas} aria-describedby="hp-canvas-help">{cells.map((color, index) => <button className="hp-pixel-cell" key={index} type="button" ref={element => { cellRefs.current[index] = element; }} tabIndex={index === focusIndex ? 0 : -1} onFocus={() => setFocusIndex(index)} aria-label={cellLabel(index, color)} style={{ backgroundColor: palette.colors[color].hex }} onClick={() => paint(index)} onKeyDown={event => move(event, index)} />)}</div><p id="hp-canvas-help" className="hp-canvas-help">{compact ? c.editor.compactHelp : c.editor.help}</p></div><div className="hp-editor-tools">{compact && <><h2>{c.home.editorTitle}</h2><p className="hp-editor-intro">{c.home.editorIntro}</p></>}<fieldset className="hp-palette-presets"><legend>{c.editor.paletteLabel}</legend><div>{c.palettes.map((item, index) => <button key={item.name} type="button" onClick={() => setPaletteIndex(index)} aria-pressed={paletteIndex === index}>{item.name}</button>)}</div></fieldset><fieldset className="hp-colors"><legend>{c.editor.colorLabel}</legend><div>{palette.colors.map((color, index) => <button type="button" key={index} className="hp-color" aria-pressed={colorIndex === index} onClick={() => setColorIndex(index)}><span style={{ backgroundColor: color.hex }} aria-hidden="true" /><span>{color.name}</span></button>)}</div></fieldset>{!compact && <fieldset className="hp-artwork-presets"><legend>{c.editor.presets}</legend><div>{c.artworks.map((artwork, index) => <button type="button" key={artwork.id} onClick={() => load(index)} aria-pressed={artworkIndex === index}><PixelArt artwork={artwork} palette={palette} /><span>{c.editor.load}{artwork.name}</span></button>)}</div></fieldset>}<div className="hp-editor-actions"><button type="button" className="hp-button hp-button-outline" onClick={() => { setCells(pixels(c.artworks[artworkIndex])); setStatus(c.editor.resetDone); }}>{c.editor.reset}</button>{compact ? <a className="hp-button" href={`${basePath}/project`}>{c.home.action}<span aria-hidden="true">{c.common.arrow}</span></a> : <button type="button" className="hp-button" onClick={exportPng} disabled={exporting}>{exporting ? c.editor.exporting : c.editor.export}<span aria-hidden="true">{c.common.arrow}</span></button>}</div><p className="hp-editor-status" role="status">{status}</p></div></section>;
}

function Home({ basePath }: Pick<TemplateProps, "basePath">) {
  const [paletteIndex, setPaletteIndex] = useState(0);
  return <><header className="hp-home-heading"><p className="hp-label">{c.home.label}</p><h1>{c.home.title.map(line => <span key={line}>{line}</span>)}</h1><p>{c.home.intro}</p></header><Editor compact paletteIndex={paletteIndex} setPaletteIndex={setPaletteIndex} basePath={basePath} /><section className="hp-gallery"><h2>{c.home.galleryTitle}</h2><p>{c.home.galleryIntro}</p><div className="hp-gallery-grid">{c.artworks.map((artwork, index) => <figure key={artwork.id} className={`hp-artwork hp-artwork-${index}`}><div className="hp-artwork-mat"><span className="hp-artwork-index" aria-hidden="true">{String(index + 1).padStart(2,"0")}</span><PixelArt artwork={artwork} palette={c.palettes[paletteIndex]} /></div><figcaption><span>{c.home.galleryLabel}</span><h3>{artwork.name}</h3><p>{artwork.type}</p></figcaption></figure>)}</div></section><section className="hp-manifesto"><h2>{c.home.statement.map(line => <span key={line}>{line}</span>)}</h2><div><p>{c.home.statementBody}</p><a className="hp-link" href={`${basePath}/about`}>{c.home.aboutAction}<span aria-hidden="true">{c.common.arrow}</span></a></div></section></>;
}

function Project({ basePath }: Pick<TemplateProps, "basePath">) {
  const [paletteIndex, setPaletteIndex] = useState(0);
  return <><header className="hp-page-heading"><p className="hp-label">{c.editor.projectLabel}</p><h1>{c.editor.projectTitle.map(line => <span key={line}>{line}</span>)}</h1><p>{c.editor.projectIntro}</p></header><Editor paletteIndex={paletteIndex} setPaletteIndex={setPaletteIndex} basePath={basePath} /><section className="hp-tips"><h2>{c.editor.tipsTitle}</h2><ol>{c.editor.tips.map(item => <li key={item.title}><h3>{item.title}</h3><p>{item.body}</p></li>)}</ol></section><section className="hp-export-note"><h2>{c.editor.noteTitle}</h2><p>{c.editor.noteBody}</p><a className="hp-link" href={basePath || "/"}>{c.common.back}<span aria-hidden="true">{c.common.arrow}</span></a></section></>;
}

function About({ basePath }: Pick<TemplateProps, "basePath">) {
  return <article><header className="hp-page-heading hp-about-heading"><p className="hp-label">{c.about.label}</p><h1>{c.about.title.map(line => <span key={line}>{line}</span>)}</h1><p>{c.about.intro}</p></header><div className="hp-about-specimen"><div>{c.artworks.map((artwork, index) => <PixelArt key={artwork.id} artwork={artwork} palette={c.palettes[index]} />)}</div><p>{c.about.specimen}</p></div><section className="hp-about-story"><h2>{c.about.storyTitle}</h2><div>{c.about.story.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></section><section className="hp-rules"><h2>{c.about.rulesTitle}</h2><div>{c.about.rules.map(rule => <article key={rule.label}><span>{rule.label}</span><h3>{rule.title}</h3><p>{rule.body}</p></article>)}</div></section><section className="hp-about-closing"><h2>{c.about.closing}</h2><div><p>{c.about.closingBody}</p><a className="hp-button" href={`${basePath}/project`}>{c.about.action}<span aria-hidden="true">{c.common.arrow}</span></a></div></section></article>;
}

function Contact() {
  const [status, setStatus] = useState("");
  async function copy() {
    try { await navigator.clipboard.writeText(c.email); setStatus(c.contact.copied); }
    catch { setStatus(c.contact.fallback); }
  }
  return <footer className="hp-footer"><div className="hp-footer-top"><div><h2>{c.contact.title}</h2><p>{c.contact.body}</p></div><div className="hp-contact"><span className="hp-label">{c.contact.label}</span><span className="hp-email">{c.email}</span><button type="button" className="hp-link" onClick={copy}>{c.contact.copy}<span aria-hidden="true">{c.common.arrow}</span></button><p className="hp-status" role="status">{status}</p></div></div><div className="hp-footer-bottom"><strong>{c.brand} {c.wordmark}</strong><p>{c.common.disclosure}</p><span>{c.contact.signature}</span></div></footer>;
}

export default function PlayfulTemplate({ page, basePath }: TemplateProps) {
  return <div className="kit-playful"><a className="hp-skip" href="#hp-main">{c.common.skip}</a><header className="hp-header"><a className="hp-brand" href={basePath || "/"}><span className="hp-pixel-wordmark" aria-hidden="true">{c.common.logo.join("").split("").map((value, index) => <i key={index} style={{ opacity: Number(value) }} />)}</span><strong>{c.brand}</strong><span className="hp-sr-only">{c.wordmark}</span></a><nav aria-label={c.common.navigation}><a href={basePath || "/"} aria-current={page === "home" ? "page" : undefined}>{c.nav.home}</a><a href={`${basePath}/project`} aria-current={page === "project" ? "page" : undefined}>{c.nav.project}</a><a href={`${basePath}/about`} aria-current={page === "about" ? "page" : undefined}>{c.nav.about}</a></nav></header><main id="hp-main">{page === "home" ? <Home basePath={basePath} /> : page === "project" ? <Project basePath={basePath} /> : <About basePath={basePath} />}</main><Contact /></div>;
}
