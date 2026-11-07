# 形集 FORME Implementation Plan

> For agentic workers: use superpowers:subagent-driven-development for isolated template implementation and review. User selection of方案 A authorizes execution; proceed without repeating approval questions.

**Goal:** Deliver a working, visually refined template library with nine downloadable three-page Next.js template kits, including the six additions authorized on 2026-11-07.

**Architecture:** Next.js App Router renders the platform and isolated template components. A deterministic build script packages those exact components into standalone projects. Catalog metadata and reusable theme values are centralized.

**Tech Stack:** Next.js 16.4.5, React 19.3.1, TypeScript, Tailwind CSS 4.3.4, native CSS interactions, Phosphor icons, fflate, Playwright. Tailwind 4.3.5 was advertised but its oxide dependency was unavailable; pin the coherent 4.3.4 release.

**Spec:** docs/design.md

## Global Constraints
Chinese-first, responsive, sources documented, no fabricated metrics, no empty actions. Native template navigation. Fixed demo-brand themes, platform light/dark support. Only original implementation; reference sites are inspiration, never copied. Scratch files stay in work. All deliverables stay in outputs/forme.

### Task 1: Template components
- [x] Implement nine isolated template kits using the exact TemplateProps contract in the spec.
- [x] Each kit owns Template.tsx, content.ts, theme.css and DESIGN.md; uses supplied local assets.
- [x] Provide full home/project/about content and functioning navigation; work at 390px and 1440px.
- [x] Validate TypeScript and inspect browser once integrated; root owns routes, dependencies, assets and export script.

### Task 2: Platform and browsing
- [x] Implement src/app/layout.tsx, globals.css and tokens.css; shared header/footer and theme switch.
- [x] Implement landing page, searchable/filterable collection, persistent local favorites and empty-state recovery.
- [x] Implement template detail, desktop/mobile iframe preview and direct full-screen preview.
- [x] Implement concise guide and local feedback form with explicit storage/export behavior.

### Task 3: Standalone exports
- [x] Write tests asserting generated ZIP entry set, expected three routes and absence of platform dependency.
- Historical check: the initial failing-test log was not retained; this step is not independently verified in the delivery record.
- [x] Implement scripts/package-kits.mjs using canonical template source and asset manifest.
- [x] Include README, DESIGN, AGENTS, asset source licenses and exact dependency versions; rerun tests.

### Task 4: Verification and delivery
- [x] Production build and TypeScript verification.
- [x] Verify all three downloadable projects independently build.
- [x] Playwright test real user flows and review desktop/mobile screenshots.
- [x] Generate actual template screenshots for thumbnails and rebuild.
- [x] Independent final review; address concrete defects.
- [x] Deliver running local preview, project ZIP and Chinese README with sources and limitations.

## Delivery record

The local deliverables are complete. See [verification.md](verification.md) for test evidence, resolved review findings, and the limits of the validation. Public deployment and real-user aesthetic comparison were not part of this local delivery.

## Six-template expansion — 2026-11-07

- [x] Add MONO, TERRE, CHAPTER, TIDELINE, OFFSET and ORBIT with three complete pages each.
- [x] Integrate all nine kits through a shared component registry and catalog parity checks.
- [x] Generate real browser cover images and source-identical independent exports.
- [x] Resolve observed contrast, accessible-name, mobile headline and documentation-portability defects.
- [x] Pass 16 automated tests, production build, 72 production route/viewport checks, and six independent download builds.
- [x] Verify category/search/favorites, six mobile iframe navigation flows, real ZIP downloads and demo email copying.

Current evidence and limits: [expansion-verification.md](expansion-verification.md).
