import { catalogConfig } from "../content/catalog";
import { safeCatalogReturn } from "./catalog";

export function captureCatalogPosition(href: string) {
  try { sessionStorage.setItem(`${catalogConfig.storage.positionPrefix}${safeCatalogReturn(href)}`, String(Math.max(0, window.scrollY))); } catch {}
}

export function readCatalogPosition(href: string): number | null {
  try {
    const value = sessionStorage.getItem(`${catalogConfig.storage.positionPrefix}${safeCatalogReturn(href)}`);
    const position = value === null ? NaN : Number(value);
    return Number.isFinite(position) && position >= 0 ? position : null;
  } catch { return null; }
}

export function requestCatalogReturn(href: string) {
  try { sessionStorage.setItem(catalogConfig.storage.returnTo, safeCatalogReturn(href)); } catch {}
}

export function consumeCatalogReturn(href: string): boolean {
  try {
    if (sessionStorage.getItem(catalogConfig.storage.returnTo) !== safeCatalogReturn(href)) return false;
    sessionStorage.removeItem(catalogConfig.storage.returnTo);
    return true;
  } catch { return false; }
}
