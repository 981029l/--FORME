# 栈点 STACK

Reading this as: a Chinese developer portfolio for people evaluating thoughtful interface work, with a charcoal and amber source-file language, built with native React and CSS.

- DESIGN_VARIANCE: 6. Asymmetric hero, functional source-file reader, photographic project feature, typed capability list and editorial case-study layouts.
- MOTION_INTENSITY: 2. Short CTA feedback only. File switching and search update immediately. Reduced motion disables transitions.
- VISUAL_DENSITY: 5. Code is compact while project descriptions and navigation retain generous spacing.

## Visual system

The brief explicitly fixes one dark theme: charcoal page, subtly lighter editor surfaces, warm near-white text and amber as the only accent. All corners are square. Fine rules separate working areas, not decorative cards. Chinese content uses a system sans-serif, Latin interface metadata and source text use the local monospace stack. No font request or added package is needed in standalone exports.

The source-file reader is an actual accessible component. Native file-selection buttons switch between three meaningful documents. The file title, line count and copy action all reflect the selected document. Clipboard errors are caught and produce a manual-selection fallback. There is no fake typing animation, pretend terminal command execution or fabricated live system status.

## Pages and content

- Home: developer introduction, selectable source reader, featured knowledge-index project with photography, and four paired practice descriptions.
- Project: explicit problem and scope, a working title/tag search over four sample notes, implementation choices, the file reader and a truthful boundary statement.
- About: fictional portfolio role, working method, workspace photography and a concise list of thinking tools.

All visible copy, reader documents, demo notes and image references are in `content.ts`. Search trims its input, compares Chinese-friendly lowercase strings and returns notes matching title or tags. A whitespace-only query naturally shows all notes. Zero results has a clear recovery control. No network request, local storage, account, editing service or backend is implied.

Every page has one h1 and one main. Main navigation supports both preview routes and an empty base path. The footer copies a clearly labelled `.example` demo address without sending a message. The brand, persona, cases and contact details are fictional. The review file is explicitly a sample checklist, not an assertion that checks were executed. Numbers in the reader and search are derived from the displayed sample data.

## Responsive and accessibility decisions

The desktop header remains one line; below 768px its navigation becomes a separate row. Below 1024px the hero stacks. Below 768px the file tree becomes three full-width file buttons above the preview, retaining all documents. Source lines wrap within the file viewer, and the page does not clip horizontal overflow. Project search results collapse from two columns to one. Photos reserve their dimensions and use Chinese alternatives.

Native buttons use `aria-pressed` to expose file selection. Search has a visible associated label, live result count and a clear action. Clipboard feedback is politely announced. Links, buttons and input have visible amber keyboard focus. The footer identifies the illustrative scope of the site. The workspace photo illustrates the subject and is not presented as proof of a real developer's personal office.

## Sources and implementation basis

- `app/kits/types.ts`: page and base-path contract.
- `app/kits/developer/content.ts`, `Template.tsx`, `theme.css`: original fictional content and implementation.
- `SOURCES.md`: local photograph provenance, maintained by the template library.
- `README.md`: standalone setup and customization.
- Native buttons: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button
- Search field: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/search
- Clipboard: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText
- CSS grid: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout
- Reduced motion: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
