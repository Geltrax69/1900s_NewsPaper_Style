# The Motoring Gazette

A collectible motoring newspaper website about the remarkable cars of the
**1950s** and **1970s** — aged cream paper, black ink, serif typography, and
detailed car illustrations, composed like an antique newspaper front page.

**Live structure:** hash-routed single-page app (`#/`, `#/1950s`, `#/1970s`,
`#/car/<slug>`, `#/compare`, `#/about`) — shareable article URLs work on any
static host.

## Run it

```bash
npm install
npm run dev      # development server
npm run build    # production build → dist/
```

## What's inside

- **Front page** — masthead, edition strip, lead story (“Two Decades That
  Changed the Road”), filterable collection of all eight cars, decade teasers,
  and the archive sidebar.
- **Decade sections** — introductory article plus four car profiles each,
  with alternating image/text features and local search.
- **Car profiles** — exact variant, verified specs (with measurement
  standards: SAE gross / DIN / bhp), Collector's Note, photo captions, and
  source links.
- **Full article view** — lead illustration, long-form story, 4-image gallery
  with keyboard-accessible lightbox, spec panel, related cars, credits, and a
  return link that preserves browsing context.
- **Compare** — pick any two cars; differences highlighted in a responsive
  spec table.
- **Sidebar** — “From the Archives”, “Design Detail” (tailfins, wedges),
  “Collector's Vocabulary”, and a fictional Gazette Motoring Club
  advertisement (labelled as an editorial illustration).

## Content & images

- Car data lives in `src/data/cars.ts`; editorial copy in
  `src/data/editorial.ts`. Specs describe the exact featured variant;
  uncertain figures are labelled, never invented.
- The 32 car illustrations (`public/images/cars/<slug>/{front,side,rear,interior}.jpg`)
  were generated for this publication as **detailed illustrations, not
  historical photographs** — credited as such throughout the site.
- Each car also has a 16-frame 360° turntable
  (`public/images/cars/<slug>/spin/00.jpg` … `15.jpg`, clean studio
  backdrop, no scenery), scrubbed by pointer position in the
  `CarViewer360` component — hover or drag to walk around the car, with an
  interior-view toggle.

## Type

Self-hosted in `public/fonts` (see `fonts.css`): **ZT Bros Oskon 90s**
(display serif), **JaneAusten** (classic script accents — tagline, pull
quotes, the motoring club advertisement; personal use only), **Source Serif
4** (article serif), **Space Mono** (specifications and labels).

Car imagery tilts subtly in 3D toward the pointer on hover-capable devices
(`src/components/Tilt.tsx`) — disabled entirely under
`prefers-reduced-motion` and on touch devices.

## Tech

React 19 + TypeScript + Tailwind CSS v4 (Vite). No backend; all content is
structured data with stable IDs and slugs.
