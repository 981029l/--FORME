import { catalogConfig } from "../content/catalog";
import { site } from "../config/site";

export type SearchableTemplate = { slug: string; name: string; english: string; category: string; tags: string[]; description: string };
export type CatalogFilter = { query?: string; category?: string; favoritesOnly?: boolean; favorites?: string[] };
export type CatalogSort = typeof catalogConfig.sortOptions[number]["id"];
export type CatalogState = { query: string; category: string; sort: CatalogSort; page: number; view: "all" | "favorites" };

export function parseCatalogState(input: string | Pick<URLSearchParams, "get">): CatalogState {
  const params = typeof input === "string" ? new URLSearchParams(input) : input;
  const category = params.get("category");
  const sort = params.get("sort");
  const rawPage = params.get("page") ?? "";
  const page = /^\d+$/.test(rawPage) ? Number(rawPage) : 0;
  return {
    query: (params.get("q") ?? catalogConfig.defaults.query).slice(0, catalogConfig.queryLimit),
    category: site.categories.some(item => item.id === category) ? category! : catalogConfig.defaults.category,
    sort: catalogConfig.sortOptions.some(item => item.id === sort) ? sort as CatalogSort : catalogConfig.defaults.sort,
    page: Number.isSafeInteger(page) && page > 0 ? page : catalogConfig.defaults.page,
    view: params.get("view") === "favorites" ? "favorites" : catalogConfig.defaults.view,
  };
}

export function catalogHref(state: CatalogState): string {
  const params = new URLSearchParams();
  if (state.query) params.set("q", state.query);
  if (state.category !== catalogConfig.defaults.category) params.set("category", state.category);
  if (state.sort !== catalogConfig.defaults.sort) params.set("sort", state.sort);
  if (state.page !== catalogConfig.defaults.page) params.set("page", String(state.page));
  if (state.view !== catalogConfig.defaults.view) params.set("view", state.view);
  return `${catalogConfig.path}${params.size ? `?${params}` : ""}`;
}

export function safeCatalogReturn(value: string | null | undefined): string {
  if (!value || !value.startsWith(`${catalogConfig.path}`) || /[\\\u0000-\u0020]/.test(value)) return catalogConfig.path;
  try {
    const url = new URL(value, catalogConfig.safeOrigin);
    return url.origin === catalogConfig.safeOrigin && url.pathname === catalogConfig.path ? catalogHref(parseCatalogState(url.searchParams)) : catalogConfig.path;
  } catch { return catalogConfig.path; }
}

export function orderTemplates<T extends SearchableTemplate>(templates: T[], sort: CatalogSort): T[] {
  const order: readonly string[] = sort === "latest" ? catalogConfig.latestSlugs : catalogConfig.curatedSlugs;
  const rank = new Map(order.map((slug, index) => [slug, index]));
  return [...templates].sort((a, b) => sort === "name" ? a.english.localeCompare(b.english, "en", { sensitivity: "base" }) : (rank.get(a.slug) ?? order.length) - (rank.get(b.slug) ?? order.length));
}

export function paginateTemplates<T>(templates: T[], requestedPage: number) {
  const total = templates.length;
  const pageCount = Math.max(1, Math.ceil(total / catalogConfig.pageSize));
  const page = Math.min(pageCount, Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : catalogConfig.defaults.page);
  const offset = (page - 1) * catalogConfig.pageSize;
  return { items: templates.slice(offset, offset + catalogConfig.pageSize), page, pageCount, total, start: total ? offset + 1 : 0, end: Math.min(offset + catalogConfig.pageSize, total) };
}

export function filterTemplates<T extends SearchableTemplate>(templates: T[], filter: CatalogFilter): T[] {
  const query = (filter.query ?? "").trim().toLocaleLowerCase();
  return templates.filter(template => {
    const matchesQuery = !query || [template.name, template.english, template.description, ...template.tags].join(" ").toLocaleLowerCase().includes(query);
    const matchesCategory = !filter.category || filter.category === "all" || template.category === filter.category;
    const matchesFavorite = !filter.favoritesOnly || (filter.favorites ?? []).includes(template.slug);
    return matchesQuery && matchesCategory && matchesFavorite;
  });
}
