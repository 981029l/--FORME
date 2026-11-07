"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, BookmarkSimple, MagnifyingGlass, SlidersHorizontal, X } from "@phosphor-icons/react";
import { templates, type Template } from "@/content/templates";
import { catalogConfig } from "@/content/catalog";
import { site } from "@/config/site";
import { catalogHref, filterTemplates, orderTemplates, paginateTemplates, parseCatalogState, type CatalogState } from "@/lib/catalog";
import { captureCatalogPosition, consumeCatalogReturn, readCatalogPosition } from "@/lib/catalog-session";
import { QuickPreview } from "./QuickPreview";
import "./catalog.css";

export function Catalog() {
  const searchParams = useSearchParams();
  const paramsKey = searchParams.toString();
  const state = useMemo(() => parseCatalogState(new URLSearchParams(paramsKey)), [paramsKey]);
  const [query, setQuery] = useState(state.query);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);
  const [storageMessage, setStorageMessage] = useState("");
  const [preview, setPreview] = useState<{ template: Template; trigger: HTMLButtonElement } | null>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const resultsHeading = useRef<HTMLDivElement>(null);
  const shouldRestore = useRef(true);
  const restoring = useRef(false);
  const pendingPageScroll = useRef(false);
  const favoritesOnly = state.view === "favorites";
  const { text } = catalogConfig;
  const selection = useMemo(() => paginateTemplates(orderTemplates(filterTemplates(templates, { query: state.query, category: state.category, favoritesOnly, favorites }), state.sort), state.page), [state, favoritesOnly, favorites]);
  const currentState = { ...state, page: selection.page };
  const href = catalogHref(currentState);
  const liveState = useRef(currentState);
  liveState.current = currentState;
  const hasFilters = Boolean(state.query || state.category !== catalogConfig.defaults.category || favoritesOnly);

  useEffect(() => {
    function loadFavorites() {
      try {
        const saved: unknown = JSON.parse(localStorage.getItem(site.storage.favorites) ?? "[]");
        setFavorites(Array.isArray(saved) ? saved.filter((value): value is string => typeof value === "string" && templates.some(template => template.slug === value)) : []);
      } catch { setStorageMessage(text.storageReadError); }
      setFavoritesLoaded(true);
    }
    function syncFavorites(event: StorageEvent) { if (event.key === site.storage.favorites || event.key === null) loadFavorites(); }
    loadFavorites();
    window.addEventListener("storage", syncFavorites);
    return () => window.removeEventListener("storage", syncFavorites);
  }, [text.storageReadError]);

  useEffect(() => { setQuery(state.query); }, [state.query]);

  useEffect(() => {
    if (!favoritesLoaded) return;
    const currentUrl = `${catalogConfig.path}${paramsKey ? `?${paramsKey}` : ""}`;
    if (currentUrl !== href) window.history.replaceState(null, "", href);
  }, [href, paramsKey, favoritesLoaded]);

  useEffect(() => {
    function onBack() { shouldRestore.current = true; }
    window.addEventListener("popstate", onBack);
    return () => window.removeEventListener("popstate", onBack);
  }, []);

  useEffect(() => {
    if (!favoritesLoaded) return;
    const explicitReturn = consumeCatalogReturn(href);
    const restore = shouldRestore.current || explicitReturn;
    shouldRestore.current = false;
    let frame = 0;
    let saveTimer: ReturnType<typeof setTimeout> | undefined;
    const target = restore ? readCatalogPosition(href) : null;
    const started = performance.now();
    restoring.current = target !== null;
    function cancelRestore(event?: Event) {
      if (event instanceof KeyboardEvent && !catalogConfig.scroll.scrollKeys.some(key => key === event.key)) return;
      cancelAnimationFrame(frame);
      restoring.current = false;
    }
    function restorePosition() {
      if (target === null || !restoring.current) return;
      const maximum = document.documentElement.scrollHeight - window.innerHeight;
      if (maximum >= target || performance.now() - started >= catalogConfig.scroll.restoreWindowMs) {
        window.scrollTo({ top: Math.min(target, Math.max(0, maximum)), behavior: "instant" });
        restoring.current = false;
      } else frame = requestAnimationFrame(restorePosition);
    }
    function savePosition() {
      if (restoring.current) return;
      clearTimeout(saveTimer);
      saveTimer = setTimeout(() => captureCatalogPosition(href), catalogConfig.scroll.saveDelayMs);
    }
    function saveBeforeReload() { if (!restoring.current) captureCatalogPosition(href); }
    if (target !== null) frame = requestAnimationFrame(restorePosition);
    if (pendingPageScroll.current) {
      pendingPageScroll.current = false;
      resultsHeading.current?.scrollIntoView({ block: "start", behavior: "instant" });
      resultsHeading.current?.focus({ preventScroll: true });
    }
    window.addEventListener("wheel", cancelRestore, { passive: true });
    window.addEventListener("touchstart", cancelRestore, { passive: true });
    window.addEventListener("pointerdown", cancelRestore, { passive: true });
    window.addEventListener("keydown", cancelRestore);
    window.addEventListener("scroll", savePosition, { passive: true });
    window.addEventListener("pagehide", saveBeforeReload);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(saveTimer);
      window.removeEventListener("wheel", cancelRestore);
      window.removeEventListener("touchstart", cancelRestore);
      window.removeEventListener("pointerdown", cancelRestore);
      window.removeEventListener("keydown", cancelRestore);
      window.removeEventListener("scroll", savePosition);
      window.removeEventListener("pagehide", saveBeforeReload);
    };
  }, [href, favoritesLoaded]);

  function updateState(changes: Partial<CatalogState>, replace = false) {
    captureCatalogPosition(catalogHref(liveState.current));
    shouldRestore.current = false;
    restoring.current = false;
    const next = { ...liveState.current, ...changes, page: changes.page ?? catalogConfig.defaults.page };
    liveState.current = next;
    const nextHref = catalogHref(next);
    if (nextHref !== `${location.pathname}${location.search}`) window.history[replace ? "replaceState" : "pushState"](null, "", nextHref);
  }

  function toggleFavorite(slug: string) {
    const next = favorites.includes(slug) ? favorites.filter(id => id !== slug) : [...favorites, slug];
    setFavorites(next);
    try { localStorage.setItem(site.storage.favorites, JSON.stringify(next)); } catch { setStorageMessage(text.storageWriteError); }
  }

  function clearFilters() { setQuery(catalogConfig.defaults.query); updateState({ ...catalogConfig.defaults }); }
  function clearSearch() { setQuery(catalogConfig.defaults.query); updateState({ query: catalogConfig.defaults.query }, true); searchInput.current?.focus(); }
  function detailHref(template: Template) { return `${catalogConfig.path}/${template.slug}?from=${encodeURIComponent(href)}`; }
  const closePreview = useCallback(() => setPreview(null), []);

  return <section id="collection" className="library section-wrap" aria-labelledby="library-title">
    <header className="library-heading">
      <div><p className="library-kicker">{text.kicker}</p><h1 id="library-title">{text.title}</h1><p className="library-introduction">{text.introduction}</p></div>
      <p className="library-total"><strong>{String(templates.length).padStart(2, "0")}</strong><span>{text.countUnit}<ArrowUpRight size={16} aria-hidden="true" /></span></p>
    </header>
    <div className="library-layout">
      <aside className="library-categories" aria-label={text.categoryHeading}>
        <p className="library-sidebar-label">{text.categoryHeading}</p>
        <div className="library-category-list" role="group" aria-label={text.categoryHeading}>{site.categories.map(item => <button key={item.id} type="button" onClick={() => updateState({ category: item.id })} aria-pressed={state.category === item.id}><span>{item.label}</span><small>{String(item.id === "all" ? templates.length : templates.filter(template => template.category === item.id).length).padStart(2, "0")}</small></button>)}</div>
        <p className="library-sidebar-note">{text.categoryNote}</p>
      </aside>
      <div className="library-main">
        <div className="library-toolbar">
          <div className="library-search" role="search" aria-label={text.searchLabel}>
            <MagnifyingGlass size={18} aria-hidden="true" /><label className="sr-only" htmlFor="template-search">{text.searchLabel}</label>
            <input id="template-search" ref={searchInput} value={query} maxLength={catalogConfig.queryLimit} onChange={event => { setQuery(event.target.value); updateState({ query: event.target.value }, true); }} onKeyDown={event => { if (event.key === "Escape" && !event.nativeEvent.isComposing) { event.preventDefault(); clearSearch(); } }} placeholder={text.searchPlaceholder} type="search" autoComplete="off" spellCheck={false} />
            {query && <button type="button" aria-label={text.clearSearch} onClick={clearSearch}><X size={16} aria-hidden="true" /></button>}
          </div>
          <div className="library-toolbar-actions">
            <button className="library-favorites" type="button" aria-label={`${text.favoritesLabel} ${favorites.length}`} aria-pressed={favoritesOnly} onClick={() => updateState({ view: favoritesOnly ? "all" : "favorites" })}><BookmarkSimple size={18} weight={favoritesOnly ? "fill" : "regular"} aria-hidden="true" /><span>{text.favorites}</span><small>{favorites.length}</small></button>
            <label className="library-sort"><SlidersHorizontal size={17} aria-hidden="true" /><span className="sr-only">{text.sortLabel}</span><select aria-label={text.sortLabel} value={state.sort} onChange={event => updateState({ sort: event.target.value as CatalogState["sort"] })}>{catalogConfig.sortOptions.map(option => <option value={option.id} key={option.id}>{option.label}</option>)}</select></label>
          </div>
        </div>
        <div className="library-result-line" ref={resultsHeading} tabIndex={-1}>
          <p role="status" aria-live="polite">{favoritesOnly && !favoritesLoaded ? text.loadingFavorites : <><span>{favoritesOnly ? text.favoriteResults : site.categories.find(item => item.id === state.category)?.label}</span><strong>{String(selection.total).padStart(2, "0")}</strong><span className="library-results-unit">{text.resultUnit}</span></>}</p>
          {hasFilters ? <button type="button" className="library-clear" onClick={clearFilters}>{text.clearFilters}<X size={13} aria-hidden="true" /></button> : <span className="library-result-range">{String(selection.start).padStart(2, "0")}—{String(selection.end).padStart(2, "0")} <span>{text.of} {String(selection.total).padStart(2, "0")}</span></span>}
        </div>
        {storageMessage && <p className="library-notice" role="status">{storageMessage}</p>}
        {selection.items.length ? <div className="library-grid">{selection.items.map((template, index) => <article className="library-card" key={template.slug} data-template={template.slug}>
          <div className="library-cover"><Link href={detailHref(template)} onClick={() => captureCatalogPosition(href)} aria-label={catalogConfig.labels.detail(template.name)}><img src={template.cover} alt={catalogConfig.labels.cover(template.name)} width={1440} height={1080} loading={index === 0 ? "eager" : "lazy"} /><span className="library-cover-corner"><ArrowUpRight size={19} aria-hidden="true" /></span></Link><span className="library-free">{text.free}</span></div>
          <div className="library-card-heading"><Link href={detailHref(template)} onClick={() => captureCatalogPosition(href)}><h2>{template.name}<span>{template.english}</span></h2></Link><button className="library-bookmark" type="button" onClick={() => toggleFavorite(template.slug)} aria-label={catalogConfig.labels.favorite(template.name, favorites.includes(template.slug))} aria-pressed={favorites.includes(template.slug)}><BookmarkSimple size={19} weight={favorites.includes(template.slug) ? "fill" : "regular"} aria-hidden="true" /></button></div>
          <p className="library-card-tags">{template.tags.slice(0, 2).join(" / ")}</p>
          <div className="library-card-footer"><button type="button" className="library-quick-open" onClick={event => setPreview({ template, trigger: event.currentTarget })} aria-label={`${text.preview}${template.name}`}>{text.preview}<ArrowUpRight size={14} aria-hidden="true" /></button><span className="library-palette" role="img" aria-label={catalogConfig.labels.palette(template.palette)}>{template.palette.map(color => <i key={color} style={{ backgroundColor: color }} />)}</span></div>
        </article>)}</div> : <div className="library-empty"><span className="library-empty-mark">{favoritesOnly ? <BookmarkSimple size={30} aria-hidden="true" /> : <MagnifyingGlass size={30} aria-hidden="true" />}</span><h2>{favoritesOnly && !query && state.category === "all" ? text.emptyFavoritesTitle : text.emptyTitle}</h2><p>{favoritesOnly && !favorites.length ? text.emptyFavoritesDescription : text.emptyDescription}</p><button type="button" onClick={clearFilters}>{text.reset}<ArrowUpRight size={18} aria-hidden="true" /></button></div>}
        {selection.total > 0 && <nav className="library-pagination" aria-label={text.pagination}><button type="button" disabled={selection.page === 1} onClick={() => { pendingPageScroll.current = true; updateState({ page: selection.page - 1 }); }}><ArrowLeft size={16} aria-hidden="true" /><span>{text.previousPage}</span></button><div>{Array.from({ length: selection.pageCount }, (_, index) => index + 1).map(page => <button type="button" key={page} aria-label={catalogConfig.labels.page(page)} aria-current={selection.page === page ? "page" : undefined} onClick={() => { if (page !== selection.page) { pendingPageScroll.current = true; updateState({ page }); } }}>{String(page).padStart(2, "0")}</button>)}</div><button type="button" disabled={selection.page === selection.pageCount} onClick={() => { pendingPageScroll.current = true; updateState({ page: selection.page + 1 }); }}><span>{text.nextPage}</span><ArrowRight size={16} aria-hidden="true" /></button></nav>}
      </div>
    </div>
    {preview && <QuickPreview template={preview.template} catalogUrl={href} trigger={preview.trigger} onClose={closePreview} />}
  </section>;
}
