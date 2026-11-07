import { useId } from "react";
import type { Idea } from "./content";

export function Lamp({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return <svg className={`do-lamp ${className}`} viewBox="0 0 800 730" fill="none" aria-hidden="true">
    <defs><pattern id={`do-hatch-${id}`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(24)"><path d="M1 0 0 7" stroke="currentColor" strokeWidth=".7" opacity=".35" /></pattern><pattern id={`do-grain-${id}`} width="23" height="19" patternUnits="userSpaceOnUse"><path d="m2 4 3-1m11 6 2-2m-8 9 2-1" stroke="currentColor" strokeWidth=".55" opacity=".3" /></pattern></defs>
    <path d="M347 624c60-36 211-80 333-69 63 6 88 21 51 40-41 21-167 42-234 62-73 21-181-8-150-33Z" fill="var(--do-shadow)" stroke="none" />
    <path d="m291 269-96 325c101 36 206 26 310-18L424 257Z" fill="var(--do-yellow)" opacity=".2" stroke="none" />
    <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M489 622c33 17 98 34 130 13 24-17 3-32-27-36-26-4-24-21-14-27 14-8 54-6 60-24" strokeWidth="2.3" />
      <path d="m637 546 10-5 10 11-10 8-10-14Zm12-4 5-4m1 10 5-4" fill="var(--do-paper)" strokeWidth="2" />
      <path d="M344 600c6-42 78-65 146-67 81-1 142 32 143 67l-2 19c-11 47-268 54-286 6Z" fill="var(--do-paper)" />
      <path d="M346 605c35 47 244 44 285-6M348 617c49 42 232 40 280-4" strokeWidth="1.7" />
      <path d="M356 597c31-43 217-51 261 0-39 44-224 41-261 0Z" fill={`url(#do-grain-${id})`} strokeWidth="1.3" />
      <path d="M346 609c36 50 226 53 285-7l-3 21c-36 38-238 42-278 6Z" fill={`url(#do-hatch-${id})`} stroke="none" />
      <path d="M468 583c1-33 11-68 13-87l35 1-11 85c-7 10-28 11-37 1Z" fill="var(--do-paper)" />
      <path d="m491 506-11 77m21-73-12 74" strokeWidth="1" />
      <path d="m478 505 95-179 37 13-100 180Z" fill="var(--do-paper)" />
      <path d="m493 505 94-171m-86 174 96-166" strokeWidth="1.4" />
      <path d="m513 478 25 11m-14-31 27 13" strokeWidth="2" />
      <path d="M497 471c-19-18-37-20-43-37-8-24 22-29 37-2 5 9 7 21 6 39Zm-10-12c-11-18-26-28-27-32" strokeWidth="1.6" />
      <path d="M575 338 427 141l27-17 148 204Z" fill="var(--do-paper)" />
      <path d="m586 334-147-198m10 0 143 190" strokeWidth="1.3" />
      <path d="m557 270-35 32m45-18-35 30M543 291l-8-15 11-3-8-13 9-1-6-13 9-3-7-13 8-2-6-10 8-4-7-9" strokeWidth="2" />
      <path d="m519 252 41 39m-61-63 14 25m-3-36 17 30" strokeWidth="1.1" />
      <ellipse cx="593" cy="333" rx="22" ry="24" transform="rotate(-24 593 333)" fill="var(--do-paper)" />
      <ellipse cx="595" cy="332" rx="12" ry="14" transform="rotate(-24 595 332)" strokeWidth="1.4" />
      <path d="m590 327 9 9m-1-10-8 13" strokeWidth="2" />
      <ellipse cx="493" cy="501" rx="21" ry="23" transform="rotate(16 493 501)" fill="var(--do-paper)" />
      <ellipse cx="494" cy="501" rx="9" ry="10" strokeWidth="1.5" />
      <path d="m489 507 10-12" strokeWidth="2" />
      <path d="M447 143c-9-7-31-4-46 9l-19-23 40-31 33 20Z" fill="var(--do-paper)" />
      <ellipse cx="442" cy="130" rx="18" ry="21" transform="rotate(-36 442 130)" fill="var(--do-paper)" />
      <path d="m434 130 14-2m-7-5 1 14" strokeWidth="1.7" />
      <path d="M401 111c-18-22-69-22-91 8l-8 25 95 29 20-26c10-13-4-29-16-36Z" fill="var(--do-paper)" />
      <path d="M304 138c-49 4-96 73-97 120 59 35 161 54 247 4 4-44-21-99-53-113-39 4-73 0-97-11Z" fill="var(--do-paper)" />
      <path d="M299 144c-35 19-67 63-75 101m167-90c27 13 49 53 52 90M280 164c-29 25-47 62-50 78" strokeWidth="1.6" />
      <path d="M299 147c29 10 67 16 96 5m-77-30c11-9 39-13 54-8m-68 21c20 8 70 17 99 9" strokeWidth="1.2" />
      <path d="M399 154c23 24 38 55 43 93-11 18-20 30-34 33l-22-119Z" fill={`url(#do-hatch-${id})`} stroke="none" />
      <path d="M230 238c58-23 158-10 214 8 21 7 18 20-3 30-74 31-169 20-225-6-20-10-14-25 14-32Z" fill="var(--do-paper)" />
      <path d="M232 247c50-21 153-10 198 7 10 4 11 9 1 13-55 22-144 14-194-4-12-4-16-12-5-16Z" fill="var(--do-yellow)" />
      <path d="M327 247c-4 12 1 24 13 25 13 1 20-9 18-21" fill="var(--do-paper)" strokeWidth="2" />
      <path d="M214 260c46 33 178 50 239 4M302 274l10 2m54 2 11-1" strokeWidth="1.1" />
      <path d="M295 147c-18 8-33 22-45 39m153-41c16 7 32 26 41 46m-81 411c31 13 55 16 74 16m116-7 35-8" strokeWidth=".8" opacity=".7" />
      <path d="m269 314-7 14m91-16 1 18m68-27 8 15" strokeWidth="2" />
      <path d="m480 550 14 1-2 11-13-1Z" fill="var(--do-ink)" strokeWidth="1" />
    </g>
    <g stroke="currentColor" strokeWidth=".7" opacity=".42"><path d="M214 253c2-42 47-109 88-111m105 8c37 20 52 74 51 111M349 601c-1-30 63-62 145-63m-146 90c38 38 231 49 280-2m-47-292L434 139m55 369 96-175" />{Array.from({ length: 18 }, (_, i) => <path key={i} d={`M${360 + i * 14} ${620 + Math.sin(i / 5) * 17}l-3 8`} />)}</g>
  </svg>;
}

export function IdeaArtwork({ kind, className = "" }: { kind: Idea["kind"]; className?: string }) {
  if (kind === "lamp") return <Lamp className={`do-art-lamp ${className}`} />;
  return <svg viewBox="0 0 680 490" className={`do-idea-art ${className}`} fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    {kind === "pencil" && <>
      <path d="M110 385c103-30 300-77 415-53 108 22-219 75-331 79-50 2-91-12-84-26Z" fill="var(--do-shadow)" stroke="none" />
      <path d="m209 321-12 65 23 3 15-75m209-43-9 74 23 2 12-79" fill="var(--do-paper)" />
      <path d="m118 302 359-119 37 35-3 47-352 121Z" fill="var(--do-yellow)" />
      <path d="m118 302 40 31 356-115m-356 115 1 53m5-48 341-114m-338 151 337-117" strokeWidth="1.6" />
      <path d="m118 302-32 12-11 31 40 50 44-9-1-53Z" fill="var(--do-paper)" />
      <path d="m97 312 40 31-1 45m-54-44 47 17m-32-25 37 14" strokeWidth="1.2" />
      <path d="m477 183 118 4-84 78 3-47Z" fill="var(--do-paper)" />
      <path d="m556 187 39 0-29 28-10-28Z" fill="var(--do-ink)" />
      <path d="m526 196 24 2-19 16 14 8-21 18m-307 65 23-6m7-3 8-3" strokeWidth="1.5" />
      <path d="M304 259v-45m0 22-17-13m17 25 19-27m-41-30c2-24 19-33 31-22 11 10 6 30-6 39l-3 16-17-1 1-15c-5-6-7-11-6-17Z" fill="var(--do-paper)" />
      <path d="m284 176 26 18m-12-20 6 10m-20 77 19-11 21 9m-57-43 19 7" strokeWidth="2" />
      <path d="m356 241 3-37m0 22 15-20m-15 13-13-8m1-31c-5-22 11-28 19-17 11 15 4 21-1 25l-1 16h-15l2-16Z" fill="var(--do-paper)" />
      <path d="m345 244 14-9 16 5m-27-76c0-12 19-9 22 5Z" fill="var(--do-ink)" />
      <path d="M143 166c-19-32 41-61 57-29 19-2 25 20 6 28-8 4-10 15-8 20l-23-13c-16 1-26 0-32-6Z" fill="var(--do-paper)" strokeWidth="2" />
      <path d="m160 145 6 8 16-15" strokeWidth="3" />
    </>}
    {kind === "cloud" && <>
      <ellipse cx="359" cy="396" rx="157" ry="21" fill="var(--do-shadow)" stroke="none" />
      <path d="M222 350c-12-8-18-23-9-35 9-15 32-9 42 6l46 40-38 21Z" fill="var(--do-paper)" />
      <path d="m253 338 44-134c7-19 18-28 34-24 18 6 12 23 8 41l-13 51 67-64c18-17 37 1 23 19l-46 58 64-37c26-13 39 12 13 27l-53 38 48-11c24-6 31 20 4 32l-65 42c-29 31-71 37-110 8Z" fill="var(--do-paper)" />
      <path d="m265 337 38-47m-13 62 64-38m-48 42 64-14m-54 29 57-6" strokeWidth="1.5" />
      <path d="M165 199c-27-40-10-84 26-96 7-48 69-77 100-37 36-39 100-16 108 18 47-15 85 9 80 45 30 7 43 32 24 55-18 21-54 25-91 21-54 20-128 9-158 5-29 14-70 11-89-11Z" fill="var(--do-paper)" />
      <path d="M171 177c-11-22-9-45 10-60m24-11c2-27 24-39 39-42m79 2c34-7 57 8 61 25m76 29c20 4 33 16 35 32" strokeWidth="1.2" />
      <path d="m202 242-5 14m59-17-5 17m137-33-5 16m51-5-6 17" strokeWidth="3" />
      <path d="M303 157c-2 10 2 17 10 18 9 1 15-4 18-14m-41-11v-5m54 4v-5" strokeWidth="2.5" />
      <path d="m471 56 4-16m22 34 16-6m-23 41 14 7" strokeWidth="2" />
      <path d="M454 57c-11-2-25 9-27 25-2 12 6 23 16 26 17 5 36-14 31-29-2-11-8-18-20-22Z" fill="var(--do-yellow)" />
    </>}
    {kind === "cup" && <>
      <ellipse cx="339" cy="404" rx="155" ry="27" fill="var(--do-shadow)" stroke="none" />
      <path d="M434 238c104-21 97 93 16 103l-10-33c50-5 51-52 1-39Z" fill="var(--do-paper)" />
      <path d="M215 211c44-27 174-31 224 0l-10 142c-6 66-188 78-201 4Z" fill="var(--do-paper)" />
      <ellipse cx="328" cy="214" rx="112" ry="27" fill="var(--do-yellow)" />
      <path d="M228 355c29 42 138 48 188-1m-183-97 5 76m-9-77 4 82m183-85-6 82" strokeWidth="1.2" />
      <path d="M300 221c7-54 2-104-15-147m46 149c21-64 50-113 89-155m-65 158c8-17 20-28 35-33m-102 34c-15-30-30-38-48-43" />
      <path d="M290 111c-49 2-66-44-54-70 26 0 59 36 54 70Zm10 40c-3-47 17-64 48-62 0 37-18 57-48 62Zm68-9c-23-28-18-55 0-67 20 17 24 43 0 67Zm19-24c42 0 61-18 65-42-31-1-56 13-65 42Zm-18 81c3-34 30-54 56-48 1 30-22 53-56 48Z" fill="var(--do-paper)" />
      <path d="m244 53 43 50m20 39 31-42m28-13 2 46m73-48-44 26m16 52-35 27" strokeWidth="1.2" />
      <path d="M268 177c-5-17-23-32-37-27-5 17 12 29 37 27Z" fill="var(--do-yellow)" />
      <path d="m277 298 4-8m80 1 4 7m-58 12c11 11 24 11 32 0" strokeWidth="2.5" />
      <path d="M407 50c-6-16 4-32 17-28 8-15 27-7 24 8 18 1 21 21 5 29 3 16-17 24-26 10-15 6-28-7-20-19Z" fill="var(--do-yellow)" />
      <circle cx="431" cy="47" r="8" fill="var(--do-paper)" strokeWidth="2" />
    </>}
  </g></svg>;
}
