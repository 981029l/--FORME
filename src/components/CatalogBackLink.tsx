"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react";
import { catalogConfig } from "@/content/catalog";
import { safeCatalogReturn } from "@/lib/catalog";
import { requestCatalogReturn } from "@/lib/catalog-session";

export function CatalogBackLink() {
  const href = safeCatalogReturn(useSearchParams().get("from"));
  return <Link className="back-link" href={href} scroll={false} onClick={() => requestCatalogReturn(href)}><ArrowLeft size={18} aria-hidden="true" />{catalogConfig.text.back}</Link>;
}
