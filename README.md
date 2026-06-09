# Addanki Chinmayee — Personal Portfolio Website

A modern, fully responsive personal portfolio website built for Addanki Chinmayee — a B.Tech Computer Science & Engineering student with a focus on AI, Machine Learning, and Data Science.

## Live Site

Deployed on Netlify at [https://chipper-tartufo-29110d.netlify.app](https://chipper-tartufo-29110d.netlify.app)

## Key Technologies

| Technology | Purpose |
|---|---|
| TanStack Start (React) | Full-stack React framework with SSR |
| TanStack Router | File-based routing |
| Tailwind CSS v4 | Utility-first styling |
| Netlify Forms | Contact form submissions |
| Content Collections | Markdown-driven content |

## Features

- **Single-page portfolio** with smooth-scroll navigation between sections
- **Dark mode toggle** with `localStorage` persistence
- **Glassmorphism UI** with purple gradient theme
- **Fully responsive** — mobile, tablet, and desktop
- **Netlify Forms** contact form with spam protection (honeypot)
- **SEO-ready** — meta tags, Open Graph, semantic HTML
- **Animated sections** using `IntersectionObserver`

## Sections

1. Hero — name, title, CTA buttons, social links
2. About — summary and stat cards
3. Education — B.Tech degree card
4. Skills — categorised skill pills
5. Certifications — provider badges
6. Projects — cards with tech tags and GitHub links
7. Resume — view/download PDF
8. Contact — info panel + Netlify Forms contact form

## Running Locally

```bash
npm install
npm run dev
```

The dev server starts on `http://localhost:3000`. Note: Netlify Forms do not work in local dev — deploy to Netlify to test form submissions.

## Deploying

Push to a connected GitHub repository. Netlify picks up the build automatically via the `netlify.toml` configuration.

## Resume PDF

Place your resume at `public/resume.pdf` to enable View/Download buttons in the Resume section.
