# Hotline Timer — Neon Miami Stopwatch

A retro neon stopwatch inspired by Hotline Miami. Built with React, TypeScript, Vite, Tailwind CSS, and shadcn/ui. Includes lap tracking, fastest/slowest analysis, responsive design, and a synthwave UX.

Badges: React 18 • TypeScript • Vite • Tailwind • shadcn/ui

- Live demo: add your deployed URL
- Issues: use GitHub Issues for bugs/ideas

## Features
- 10ms precision timing (centiseconds)
- Start, Pause, Lap, Reset controls
- Fastest/slowest lap highlighting
- Scrollable Lap Times panel with themed scrollbar
- Neon Miami theme (pink/cyan on dark), retro grid + scanlines effects
- Responsive and accessible

## Tech Stack
- React 18 + TypeScript
- Vite
- Tailwind CSS + custom design tokens (HSL)
- shadcn/ui (Radix primitives)
- Lucide icons
- React Router

## Getting Started
1) Clone and install
- git clone <your-repo-url>
- cd <repo>
- npm install

2) Dev server
- npm run dev
- Visit http://localhost:5173 (Vite default)

3) Build & preview
- npm run build
- npm run preview

4) Lint & type-check
- npm run lint
- npm run type-check

## Project Structure
- index.html — HTML entry + SEO tags (title, description, canonical, OG/Twitter)
- src/
  - main.tsx — Vite entry, mounts App
  - App.tsx — App providers (QueryClient, Tooltip, Toasters) + routing
  - index.css — Global styles, design tokens, retro effects (neon, grid, scanlines)
  - pages/
    - Index.tsx — Landing page with title and <Stopwatch />
    - NotFound.tsx — 404 route
  - components/
    - Stopwatch.tsx — Stopwatch UI/logic (timer, laps, analysis)
    - ui/ — shadcn base components (accordion, alert, button, card, dialog, drawer, dropdown, form, input, label, popover, progress, radio, scroll-area, select, separator, sheet, skeleton, slider, switch, table, tabs, textarea, toggle, tooltip, toaster, etc.). These are thin wrappers around Radix with Tailwind classes.
  - hooks/
    - use-mobile.tsx — Simple mobile detection
    - use-toast.ts — Toast helpers
  - lib/
    - utils.ts — cn() and helpers
  - vite-env.d.ts — Vite TS types
- tailwind.config.ts — Tailwind theme (colors, animations, shadows)
- eslint.config.js — ESLint config
- vite.config.ts — Vite config
- public/ — Static assets (favicon, robots.txt)

## Code Walkthrough
### Stopwatch.tsx
State
- time: number — elapsed milliseconds
- isRunning: boolean — timer status
- lapTimes: LapTime[] — array of { id, time, lapTime }
- intervalRef, lastLapTimeRef — refs for interval and last lap snapshot

Effects
- useEffect on isRunning: starts a 10ms setInterval to increment time; cleans up on pause/unmount

Core helpers
- formatTime(ms): mm:ss.cc display
- handleStartStop(): toggles running state
- handleReset(): stops, clears time/laps
- handleLap(): when running, pushes a new lap and updates lastLapTimeRef
- getFastestSlowestLap(): computes min/max lap by lapTime

UI
- Top Card shows STOPWATCH label and the live time (no glow per request)
- Controls: Start/Pause, Lap or Reset
- Lap Times: scrollable list using ScrollArea with themed scrollbar; highlights fastest (success) and slowest (destructive) laps

### Theming & Effects
- index.css: CSS variables (HSL) for brand colors (neon pink, cyan, purple), gradients, shadows; custom classes: neon-glow, neon-border, retro-grid, scanlines
- tailwind.config.ts: exposes semantic tokens (primary, secondary, success, destructive, muted, card, etc.), animations (neon-pulse, retro-flicker), box shadows (shadow-neon-*)

### Animations
- Defined in tailwind.config.ts and utilities in index.css (also see animations section in project docs)
- Usage examples: animate-retro-flicker, animate-neon-pulse (removed on time per request)

## Accessibility
- Clear button labels and icon+text combinations
- High-contrast theme tokens in both light/dark
- Keyboard-friendly UI via Radix primitives

## SEO
- Title: "Hotline Miami Stopwatch" (<60 chars)
- Meta description: concise keyword-rich summary
- Canonical tag added in index.html
- Semantic HTML used in pages

## Contributing
- Fork → branch → PR
- Write clear commit messages
- Run npm run lint and npm run type-check
- Add tests if introducing logic

## Changelog (recent)
- Removed glow on main time display; kept neon pink
- Added ScrollArea for Lap Times with themed scrollbar
- Minor cleanup: removed unused icon import in Stopwatch
- SEO: updated title/description/canonical in index.html

## License
MIT
