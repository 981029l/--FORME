import { SiteShell } from "@/components/SiteShell";
import { Showroom } from "@/components/Showroom";
import { LegacyCatalogRedirect } from "@/components/LegacyCatalogRedirect";

export default function Home() {
  return <SiteShell><main id="main"><LegacyCatalogRedirect /><Showroom /></main></SiteShell>;
}
