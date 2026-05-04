# Async Studio Website — Design Spec

**Date:** 2026-05-04
**Status:** Approved

---

## Overview

A minimalist single-page brand presence website for Async Studio, an indie game development studio focused on genre-blending experiences. The site establishes the studio's identity without referencing any specific current projects.

Deployed as fully static HTML/CSS/JS via GitHub Pages. No backend required.

---

## Structure

Two full-screen scroll-snap sections plus a footer:

1. **Hero** — studio name, tagline, CTA
2. **About** — studio description, footer bar

Navigation is a fixed top bar with a single link ("About").

---

## Content

### Hero Section
- **Wordmark:** "ASYNC STUDIO" — large gradient text, no card or container framing
- **Tagline (primary):** "Crafting Worlds where every Run Tells a New Story"
- **Divider:** thin gradient rule (36px)
- **Tagline (secondary):** "Independent Game Studio" — small, uppercase, muted
- **CTA button:** "Discover our Studio" — scrolls to About

### About Section
- **Label:** "Our Studio"
- **Title:** "Where Genres Collide"
- **Body (paragraph 1):** Describes the studio's genre-blending philosophy (RPG + Roguelite)
- **Body (paragraph 2):** Describes the team's values (emergent storytelling, systems design, replayability)
- **Footer bar:** copyright line, anchored to the bottom of this section

### What is intentionally absent
- No reference to any specific game or project
- No mention of WoW, private servers, or Roguelite/Vampire Survivors-style products by name in a way that reveals current work
- No team section (deferred)
- No contact section (deferred) — email will be added later when needed

---

## Visual Design

### Color Palette
- **Background:** `#04101e` (deep navy)
- **Aurora orbs:** blues `#1246c8`, teals `#0a9bc8`, indigos `#321eb4` — slow-moving radial gradients
- **Particles / dots:** 6 variants ranging from electric blue to teal-purple, sizes 1.0px–2.4px
- **Glass panels:** `rgba(8,28,72,0.28)` background, `blur(36px)` backdrop-filter, 1px border at `rgba(40,120,200,0.16)`
- **Wordmark gradient:** `#c8e8ff → #70b8f8 → #28d8f0 → #80c8ff`
- **Text:** primary `rgba(185,225,255,0.82)`, secondary `rgba(100,175,225,0.52)`, body `rgba(165,210,245,0.78)`

### Glassmorphism
All content panels use:
- `backdrop-filter: blur(32px–36px) saturate(1.5)`
- Semi-transparent dark blue background
- 1px border with low-opacity blue
- Multi-layer box-shadow (outer glow + inset top/bottom edges)

### Animated Background (Canvas)
Three layered effects rendered on a fixed full-page `<canvas>`:

**1. Aurora orbs**
Five large radial gradient blobs drifting slowly across the canvas, creating ambient color shifts in the background. Colors: navy blue, teal, indigo.

**2. Particle constellation**
70 dots in 6 size/color variants drifting slowly. Nearby dots (within 7% of `min(W,H)`) are connected by faint lines.

**3. Spell projectiles**
Up to 6 active at a time, spawning every ~90 frames. Each projectile:
- Originates from a random dot
- Homes toward a specific target dot
- Renders a fading gradient trail behind it and a glowing halo at the head
- On arrival: triggers a brief flash on the target dot and an expanding ring blast effect
- Colors: electric blue, teal, purple-blue, cyan

---

## Layout

- **Scroll behavior:** `scroll-snap-type: y mandatory` on `html`, each `section` is `height: 100vh` with `scroll-snap-align: start`
- **Nav:** `position: fixed`, glassmorphism, `z-index: 100`
- **Footer:** lives inside the About section as a `.footer-bar` element pinned to the bottom, not a separate scroll stop
- **Smooth scrolling:** `scroll-behavior: smooth` on `html`

---

## SEO / GEO

- Semantic HTML5 (`<section>`, `<nav>`, `<footer>`)
- `<title>`: "Async Studio | Indie Game Studio"
- `<meta name="description">`: describes the studio and genre-blending focus
- `<meta property="og:*">` Open Graph tags for social sharing
- Heading hierarchy: `<h1>` for wordmark, `<h2>` for section titles
- No JavaScript-dependent content for primary text (canvas is purely decorative)

---

## Deployment

- Repository: GitHub repository under the `asyncstudio` org/user
- Branch: `main` or dedicated `gh-pages` branch
- Files: single `index.html` with all CSS and JS inlined — no build step, no asset pipeline
- Custom domain: `asyncstudio.be` via CNAME record pointing to GitHub Pages

---

## Out of Scope (deferred)

- Team section with photos
- Contact form or visible email
- Games/projects showcase
- Blog or news section
- Analytics integration
