# 流序 RELAY

Reading this as: a Chinese product landing site for small creative teams, with a clear cyan and ink language, built as a custom native React and CSS aesthetic.

- DESIGN_VARIANCE: 6. The product hero, four-step handoff sequence, photographic story and editorial case notes each use a different composition.
- MOTION_INTENSITY: 2. Brief button feedback only; all state changes are immediate and reduced motion disables transitions.
- VISUAL_DENSITY: 4. Marketing copy remains open while the real task-list demo is compact and readable.

## Visual system

The brand intentionally uses a single light theme: cool near-white, pale cyan surfaces and deep blue-green ink. Cyan is the sole accent family. Rounded product containers use 12px; inner controls use 4–6px; the outer demonstration stage uses 18px. These sizes reflect container hierarchy, not different visual systems. Chinese uses the system sans-serif; Latin display falls back safely when the host font is unavailable. No additional dependency, imported icon set or remote font is needed.

The hero is an actual working task list. A visitor can filter by status, complete or reopen tasks and reset the sample. Counts are derived from the current task state. There is an empty state and every button has a real action. The UI is not an image or a static screenshot reconstruction. The explicit brief fixes this product-preview direction and takes precedence over general marketing-page defaults.

## Pages and content

- Home: asymmetric product introduction, interactive task list, connected four-step method and workspace photography.
- Project: sample website update, editable task state, scope and decisions behind the workflow.
- About: product purpose, workspace photograph, three editorial principles and concise guidance for the beginning, middle and end of a task.

`content.ts` owns copy, local photo paths, the task dataset, initial completion state and contact messages. Every page has one h1 and one main. Shared navigation supports both `/preview/software` and an empty base path. The common contact button copies a `.example` address only and reports clipboard errors with a manual-copy fallback.

The fictional product, website-update scenario and demo contact are explicitly disclosed. There are no client logos, customer claims, invented usage statistics or data submissions. The task counters describe the current interactive demo, not product performance. State resets when the component is mounted again.

## Responsive and accessibility decisions

The desktop header remains one line. Below 768px the navigation becomes its own full-width row. The hero becomes a single column below 1024px. Workflow side context disappears below 768px without hiding tasks or controls; the two-column mobile process stays compact and has explicit 320px sizing. No page-level overflow clipping is used.

Task buttons expose `aria-pressed` and clear action names. Filter buttons form a labelled group. All buttons and links are native keyboard controls with visible focus, and task counts and clipboard results use polite live regions. Photographs have Chinese alternative text and reserved dimensions. The workspace photograph is illustrative, not a claim about a real team or office.

## Sources and implementation basis

- `app/kits/types.ts`: page and base-path contract.
- `app/kits/software/content.ts`, `Template.tsx`, `theme.css`: original fictional content, interaction and styling.
- `SOURCES.md`: local workspace-photo provenance, maintained by the template library.
- `README.md`: standalone setup and customization.
- Native button semantics: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button
- Pressed state: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-pressed
- Clipboard: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText
- Reduced motion: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
