# 橙场 ORBIT

Reading this as: an industrial product design portfolio for design clients, with a silver, charcoal and signal-orange technical-plate language, built with native CSS and existing React.

- DESIGN_VARIANCE: 7. A complete technical product board combines a narrow information rail with a broad photographic plate; later studies, material samples and service tables use different compositions.
- MOTION_INTENSITY: 2. Short link-arrow feedback only; reduced-motion removes transitions.
- VISUAL_DENSITY: 4. Precise labels frame spacious photography and readable Chinese project content.

## Visual system

Silver-gray page surfaces, charcoal typography and signal orange for actions establish a consistent industrial language. Monospaced reference labels distinguish observation data from prose. Content rails and plate rules organize actual information. Square corners, calibrated spacing and a single deliberate light theme follow the approved palette. Tokens live at `.kit-product`.

The hero's upholstered chair is presented as an external visual reference, not an original ORBIT chair. Its large empty upper area is cropped with `object-position` so the actual object remains prominent. The second photograph is a floor lamp, not an office or tabletop. Its captions explicitly discuss lighting and spatial observation.

## Pages and content

- Home: introductory statement, chair study board, seating and lighting studies, design approach.
- Project: chair reference plate, scope, observation notes, concept color samples, spatial context.
- About: studio story, design services and a method that distinguishes visual concepts from manufacturing evidence.

All studio and project stories are fictional. No real clients, awards, manufactured designs or tested performance are claimed. The three color samples are conceptual directions, not photographed material specifications. Contact copies a clearly labeled `.example` address and handles clipboard failure with a polite live response.

## Photography

Assets are included in this package and attributed in `SOURCES.md`:

- `/assets/chair.jpg`: 1600 × 2403. Off-white upholstered chair with curved tufted back and white legs against a pale gray wall and floor.
- `/assets/stilllife.jpg`: 1600 × 1071. Dark angled floor lamp against a sage-gray wall, with a white doorway edge on the right.

Both included photographs were visually inspected during implementation. `SOURCES.md` records the external source URLs and licensing details. This kit makes no authorship claim for photography or depicted products.

## Accessibility and responsive behavior

One h1 and one main render per page. Current-page navigation, skip link, visible keyboard focus, Chinese photo descriptions, explicit intrinsic image dimensions and a polite contact status are included. The first photograph on each page is eager; later photographs are lazy. Mobile moves the hero photo before its information rail, collapses content grids and stacks material samples into readable rows. The root page does not hide overflow.

## Sources and implementation basis

- `README.md`: independent-package setup, customization and usage.
- `AGENTS.md`: editing scope and project conventions.
- `SOURCES.md`: external photography attribution and concept-project disclosure.
- `app/kits/types.ts`: shared page props.
- Actual local photographs: `public/assets/chair.jpg`, `public/assets/stilllife.jpg`.
- CSS grid, object fitting and reduced motion: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout, https://developer.mozilla.org/en-US/docs/Web/CSS/object-position, https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion.

Use the package README for run and verification commands. Recheck photo crops, responsive layout and keyboard access after customizing the content.
