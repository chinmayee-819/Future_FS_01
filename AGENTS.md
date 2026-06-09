# AGENTS.md — Project Architecture

This document describes the architecture of the Addanki Chinmayee personal portfolio website for AI agents working on this codebase.

## Project Overview

A modern, single-page personal portfolio website for Addanki Chinmayee (B.Tech CSE, AI & Data Science enthusiast). Built with TanStack Start and deployed on Netlify.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | TanStack Start (React SSR) |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 + custom CSS |
| Content | Content Collections (markdown) |
| Forms | Netlify Forms |
| Deployment | Netlify |

## Directory Structure

```
src/
  routes/
    __root.tsx       ← Root layout: Navbar with dark mode + mobile menu, SEO meta tags
    index.tsx        ← MAIN PORTFOLIO — all 9 sections on one page (Hero → Footer)
    contact.tsx      ← Legacy standalone /contact route (not the main contact)
    resume.tsx       ← Legacy /resume route using content-collections
    projects.tsx     ← Legacy /projects route using content-collections
    blog/$slug.tsx   ← Legacy blog detail route
  components/ui/     ← Radix-based shadcn/ui primitives (Badge, Card, etc.)
  styles.css         ← Global CSS: Tailwind config, CSS vars, animations, glassmorphism utilities
content/             ← Markdown for legacy routes only
public/
  contact.html       ← CRITICAL: Static form skeleton for Netlify Forms registration
  resume.pdf         ← Drop a real resume PDF here to enable download
  robots.txt         ← SEO robots config
```

## Critical Files

- **`public/contact.html`** — Netlify scans this at build time to register the `"contact"` form. Every field name in the React contact form in `index.tsx` must appear here too. Do not delete.
- **`src/styles.css`** — Purple theme tokens, glassmorphism helpers, animation keyframes, utility classes. Custom design system lives here.
- **`src/routes/index.tsx`** — The entire portfolio (8 sections + footer). All personal data is hardcoded here. No content-collections used.

## Routing Approach

Single-page experience — all content in `index.tsx`. Navigation uses anchor IDs (`#home`, `#about`, etc.) and `scrollIntoView`. The Navbar in `__root.tsx` intercepts clicks and scrolls smoothly.

## Dark Mode

Managed in `__root.tsx` `Navbar` component. Toggles `.dark` on `<html>`. Persisted to `localStorage` key `darkMode`.

## Contact Form (Netlify Forms)

Pattern: `netlify-forms-tanstack` skill.
1. `public/contact.html` registers form name `"contact"` at build time.
2. React form POSTs to `/contact.html` with `Content-Type: application/x-www-form-urlencoded`.
3. Hidden `form-name` field routes submission to the registered form.
4. `bot-field` honeypot for spam protection.
Fields: `name`, `email`, `subject`, `message`.

## Design System

- **Theme**: Purple (`#7c3aed` / `#9333ea`) on white, dark mode on near-black (`oklch(0.1)`)
- **Glassmorphism**: `.glass` (hero overlays) and `.glass-card` (content cards) classes
- **Gradient text**: `.gradient-text` — animated multi-stop purple→pink gradient
- **Animations**: `fadeInUp`, `float`, `pulse-ring`, `gradient-shift` keyframes
- **Section reveal**: `IntersectionObserver` in `Section` wrapper component

## Coding Conventions

- TypeScript strict mode; `@/` path alias for `src/`
- Tailwind utility classes for layout; custom CSS only for complex effects
- Data (skills, projects, certifications) hardcoded in `index.tsx` — no external data fetching
- Sections follow the same `<Section id="...">` wrapper for consistent reveal animation
