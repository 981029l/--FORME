"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function LegacyCatalogRedirect() {
  const router = useRouter();
  useEffect(() => {
    const redirect = () => {
      const params = new URLSearchParams(window.location.search);
      if (window.location.hash === "#collection" || params.get("view") === "favorites") router.replace(`/templates${params.size ? `?${params}` : ""}`);
    };
    redirect();
    window.addEventListener("hashchange", redirect);
    return () => window.removeEventListener("hashchange", redirect);
  }, [router]);
  return null;
}
