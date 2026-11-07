# 错位 OFFSET

Reading this as: a graphic design portfolio for design-conscious clients, with a cobalt offset-print language, built with native CSS and existing React.

- DESIGN_VARIANCE: 8. An oversized typographic introduction, unequal poster spread, full-width specimen and editorial service rows create different compositions.
- MOTION_INTENSITY: 2. Only short link-arrow feedback; reduced-motion disables transitions.
- VISUAL_DENSITY: 4. Artwork can be dense, while surrounding Chinese text stays comfortably spaced.

## Visual system

Warm white is the page surface. Cobalt is the primary ink and orange is an intentional second printing ink inside artworks. Sharp edges, ruled content boundaries and the existing local sans-serif support the print direction. CSS custom properties at `.kit-poster` define color, type, spacing and timing. The brand has one deliberate print-inspired theme.

`Poster` renders three original conceptual compositions with semantic image labels: OFFSET type and circle, overlapping echo rings, and repeated Aa letterforms. These are the actual portfolio artworks, not simulations of a software interface. Artwork containers intentionally crop shapes at the sheet edge; the page never masks horizontal overflow. No external photographs or image assets are needed.

## Pages and content

- Home: typographic introduction, selected poster experiments, design statement.
- Project: brief, scope, three different artworks, design process, truthful concept note.
- About: studio story, specimen sheet, services, collaboration method.

The studio and projects are fictional. No customer lists, awards, claims of commissioned work, real events or invented photography credits are present. Contact only copies a clearly marked `.example` demo address, with caught failure and a polite live message.

## Accessibility and responsive behavior

Each rendered page has one h1 and one main. Navigation identifies the current page and a skip link targets the main. All interactive controls have visible focus. Artwork has Chinese alternative descriptions. Asymmetric grids become a single column below 768px; navigation wraps deliberately into its own complete row. Headline scale and specimen text adapt to narrow widths. No animation or remote dependency is required.

Mobile preserves the two complete headline phrases on separate lines. Orange-sheet typography uses a deep-blue overprint token and the light-sheet orange specimen uses a darker orange-ink token for readable contrast. Artwork and artwork-link accessible names include the complete visible poster wording, followed by the description or link purpose.

## Sources and implementation basis

- `README.md`: independent-package setup, customization and usage.
- `AGENTS.md`: editing scope and project conventions.
- `SOURCES.md`: artwork provenance and fictional-project disclosure.
- `app/kits/types.ts`: shared page props.
- `app/kits/poster/content.ts`, `Template.tsx`, and `theme.css`: original content and poster artwork.
- CSS grid and reduced motion: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout and https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion.

Use the package README for run and verification commands. Recheck responsive layout and keyboard access after changing the artwork or content.
