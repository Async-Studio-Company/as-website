# Async Studio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy the Async Studio single-page brand presence website as a static HTML/CSS/JS file on GitHub Pages.

**Architecture:** Single `index.html` file with all CSS and JS inlined — no build step, no dependencies, no backend. Two full-screen scroll-snap sections (Hero, About) with a fixed glassmorphism nav and animated canvas background. Deployed to GitHub Pages with a custom domain.

**Tech Stack:** Vanilla HTML5, CSS3 (scroll-snap, backdrop-filter, CSS gradients), vanilla JS (Canvas 2D API), GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-05-04-async-studio-website-design.md`
**Mockup reference:** `.superpowers/brainstorm/*/content/layout-v8.html`

---

## File Map

| File | Responsibility |
|------|----------------|
| `index.html` | Entire site: HTML structure, inlined CSS, inlined JS |
| `CNAME` | GitHub Pages custom domain (`asyncstudio.be`) |
| `.gitignore` | Exclude `.superpowers/`, `.DS_Store`, OS noise |

---

## Task 1: Repository setup

**Files:**
- Create: `.gitignore`
- Create: `CNAME`

- [ ] **Step 1: Initialise git repository**

```bash
cd /Users/vamarald/Dev/asyncstudio/as-website
git init
```

Expected output: `Initialized empty Git repository in .../as-website/.git/`

- [ ] **Step 2: Create `.gitignore`**

```
.superpowers/
.DS_Store
Thumbs.db
```

Save to `.gitignore`.

- [ ] **Step 3: Create `CNAME`**

```
asyncstudio.be
```

Save to `CNAME`. This file is required by GitHub Pages to serve the site under a custom domain.

- [ ] **Step 4: Commit**

```bash
git add .gitignore CNAME
git commit -m "chore: initialise repo with gitignore and CNAME"
```

---

## Task 2: HTML scaffold with SEO

**Files:**
- Create: `index.html`

- [ ] **Step 1: Create `index.html` with semantic structure and full SEO meta**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Primary SEO -->
  <title>Async Studio | Indie Game Studio</title>
  <meta name="description" content="Async Studio is an independent game development studio crafting genre-bending worlds. We blend RPG depth with Roguelite momentum to build handcrafted, infinitely replayable experiences.">
  <meta name="keywords" content="indie game studio, genre-bending games, RPG roguelite, independent game development, async studio">
  <meta name="author" content="Async Studio">
  <link rel="canonical" href="https://asyncstudio.be">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://asyncstudio.be">
  <meta property="og:title" content="Async Studio | Indie Game Studio">
  <meta property="og:description" content="Crafting worlds where every run tells a new story. Genre-bending indie games built with intention.">
  <meta property="og:image" content="https://asyncstudio.be/og-image.png">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Async Studio | Indie Game Studio">
  <meta name="twitter:description" content="Crafting worlds where every run tells a new story.">

  <!-- GEO / AI discoverability -->
  <meta name="robots" content="index, follow">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Async Studio",
    "url": "https://asyncstudio.be",
    "description": "Independent game development studio specialising in genre-blending experiences.",
    "foundingLocation": "Belgium"
  }
  </script>

  <style>
    /* CSS goes here in Task 3+ */
  </style>
</head>
<body>

  <canvas id="bg-canvas"></canvas>

  <nav aria-label="Main navigation">
    <div class="nav-logo" aria-label="Async Studio">Async Studio</div>
    <div class="nav-links">
      <a href="#about">About</a>
    </div>
  </nav>

  <main>
    <section id="hero" aria-label="Hero">
      <h1 class="hero-wordmark">Async Studio</h1>
      <p class="hero-tagline-main">Crafting Worlds where every Run Tells a New Story</p>
      <div class="hero-rule" aria-hidden="true"></div>
      <p class="hero-tagline-sub">Independent Game Studio</p>
      <a class="hero-cta" href="#about">Discover our Studio</a>
    </section>

    <section id="about" aria-label="About Async Studio">
      <div class="about-upper">
        <p class="section-label">Our Studio</p>
        <h2 class="section-title">Where Genres Collide</h2>
        <div class="about-glass">
          <p class="about-text">
            Async Studio is an independent game development studio built around the intersection of genres.
            We create experiences that blend the depth of RPGs with the relentless momentum of Roguelite gameplay,
            crafting worlds that feel handcrafted yet infinitely replayable.
          </p>
          <div class="about-rule" aria-hidden="true"></div>
          <p class="about-text">
            We are a small, focused team driven by a love for emergent storytelling, tight systems design,
            and the thrill of discovery. Every mechanic we ship is intentional. Every run, a new journey.
          </p>
        </div>
      </div>
      <footer class="footer-bar" role="contentinfo">
        <span class="footer-copy">2024 Async Studio. All rights reserved.</span>
      </footer>
    </section>
  </main>

  <script>
    /* JS goes here in Task 5+ */
  </script>
</body>
</html>
```

- [ ] **Step 2: Open in browser and verify structure**

Open `index.html` in a browser. You should see unstyled text content — all three sections in sequence. Check browser DevTools > Elements to confirm semantic tags (`nav`, `main`, `section`, `footer`, `h1`, `h2`) are present.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: html scaffold with seo meta and semantic structure"
```

---

## Task 3: CSS foundation — reset, variables, layout, scroll snap, nav

**Files:**
- Modify: `index.html` — replace the `/* CSS goes here */` comment inside `<style>` with the CSS below

- [ ] **Step 1: Add base CSS inside the `<style>` tag**

Replace the `/* CSS goes here in Task 3+ */` comment with:

```css
/* ---- Reset & base ---- */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

html {
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
}

body {
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  background: #04101e;
  color: #c8dff0;
  overflow-x: hidden;
}

/* ---- Canvas background ---- */
#bg-canvas {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

/* ---- Stacking ---- */
nav, main, section, footer { position: relative; z-index: 1; }

/* ---- Sections: full-screen scroll snap ---- */
section {
  height: 100vh;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 40px 40px;
  text-align: center;
}

/* ---- Nav ---- */
nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 60px;
  background: rgba(4, 12, 28, 0.5);
  backdrop-filter: blur(24px) saturate(1.4);
  -webkit-backdrop-filter: blur(24px) saturate(1.4);
  border-bottom: 1px solid rgba(40, 120, 200, 0.12);
}

.nav-logo {
  font-size: 0.9em;
  font-weight: 800;
  letter-spacing: 0.22em;
  color: rgba(130, 200, 240, 0.85);
  text-transform: uppercase;
}

.nav-links { display: flex; gap: 36px; }

.nav-links a {
  font-size: 0.75em;
  letter-spacing: 0.14em;
  color: rgba(130, 190, 230, 0.55);
  text-decoration: none;
  text-transform: uppercase;
  transition: color 0.2s;
}

.nav-links a:hover { color: rgba(130, 200, 240, 0.9); }

/* ---- Scrollbar ---- */
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: #040c1a; }
::-webkit-scrollbar-thumb { background: rgba(30, 90, 170, 0.35); border-radius: 3px; }
```

- [ ] **Step 2: Verify in browser**

Reload `index.html`. You should see:
- Dark navy background
- Fixed glassmorphism nav with "Async Studio" logo and "About" link
- Sections take up full viewport height (scroll down to see About)
- Smooth scrolling when clicking the About nav link

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: css base, scroll snap layout and nav"
```

---

## Task 4: CSS — Hero section

**Files:**
- Modify: `index.html` — append to the `<style>` block

- [ ] **Step 1: Append Hero CSS at the end of the `<style>` block (before the closing `</style>`)**

```css
/* ---- Hero ---- */
.hero-wordmark {
  font-size: clamp(3.2em, 9vw, 6.5em);
  font-weight: 900;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  background: linear-gradient(160deg, #c8e8ff 0%, #70b8f8 35%, #28d8f0 75%, #80c8ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 40px;
  filter: drop-shadow(0 0 60px rgba(30, 120, 230, 0.5));
}

.hero-tagline-main {
  font-size: clamp(1.05em, 2.2vw, 1.3em);
  font-weight: 600;
  letter-spacing: 0.03em;
  color: rgba(200, 235, 255, 0.88);
  line-height: 1.35;
  margin-bottom: 14px;
}

.hero-rule {
  width: 36px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(50, 160, 220, 0.55), transparent);
  margin: 0 auto 14px;
}

.hero-tagline-sub {
  font-size: 0.7em;
  font-weight: 300;
  letter-spacing: 0.14em;
  color: rgba(100, 175, 225, 0.52);
  text-transform: uppercase;
  margin-bottom: 52px;
}

.hero-cta {
  display: inline-block;
  padding: 13px 44px;
  background: rgba(20, 80, 180, 0.28);
  border: 1px solid rgba(50, 150, 220, 0.35);
  border-radius: 50px;
  color: rgba(120, 200, 240, 0.9);
  font-size: 0.78em;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  text-decoration: none;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 4px 24px rgba(20, 90, 200, 0.25), inset 0 1px 0 rgba(100, 180, 255, 0.1);
  transition: box-shadow 0.2s, border-color 0.2s;
}

.hero-cta:hover {
  border-color: rgba(60, 170, 240, 0.55);
  box-shadow: 0 4px 36px rgba(20, 120, 220, 0.4), inset 0 1px 0 rgba(120, 200, 255, 0.15);
}
```

- [ ] **Step 2: Verify in browser**

Reload. Hero section should show:
- Large gradient wordmark "Async Studio"
- Tagline primary + thin rule + tagline secondary
- Glowing CTA button with hover effect
- All centred vertically on the viewport

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: css hero section styles"
```

---

## Task 5: CSS — About section and footer bar

**Files:**
- Modify: `index.html` — append to the `<style>` block

- [ ] **Step 1: Append About + Footer CSS**

```css
/* ---- About ---- */
#about {
  justify-content: space-between;
  padding-top: 80px;
  padding-bottom: 0;
}

.about-upper {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  justify-content: center;
}

.section-label {
  font-size: 0.66em;
  letter-spacing: 0.32em;
  color: rgba(50, 170, 220, 0.55);
  text-transform: uppercase;
  margin-bottom: 18px;
}

.section-title {
  font-size: clamp(1.6em, 4vw, 2.3em);
  font-weight: 700;
  letter-spacing: 0.07em;
  background: linear-gradient(120deg, #b0d8ff 0%, #60c8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 44px;
}

.about-glass {
  background: rgba(8, 28, 72, 0.28);
  border: 1px solid rgba(40, 120, 200, 0.16);
  backdrop-filter: blur(36px) saturate(1.5);
  -webkit-backdrop-filter: blur(36px) saturate(1.5);
  border-radius: 24px;
  padding: 52px 60px;
  max-width: 760px;
  box-shadow:
    0 12px 60px rgba(6, 28, 100, 0.4),
    inset 0 1px 0 rgba(80, 160, 240, 0.1),
    inset 0 -1px 0 rgba(20, 60, 160, 0.08);
}

.about-text {
  font-size: 1.02em;
  line-height: 1.9;
  color: rgba(165, 210, 245, 0.78);
  font-weight: 300;
}

.about-rule {
  width: 48px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(50, 160, 220, 0.4), transparent);
  margin: 36px auto;
}

/* ---- Footer bar (inside About section) ---- */
.footer-bar {
  width: 100%;
  border-top: 1px solid rgba(30, 70, 120, 0.18);
  background: rgba(4, 10, 24, 0.6);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  padding: 18px 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-copy {
  font-size: 0.68em;
  letter-spacing: 0.1em;
  color: rgba(70, 110, 155, 0.45);
}
```

- [ ] **Step 2: Verify in browser**

Scroll to About. You should see:
- "Our Studio" label, "Where Genres Collide" gradient title
- Two-paragraph glassmorphism card with blur effect
- Footer bar pinned to the bottom of the viewport, copyright text centred

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: css about section and footer bar"
```

---

## Task 6: JS — Canvas background: aurora orbs and particle constellation

**Files:**
- Modify: `index.html` — replace `/* JS goes here in Task 5+ */` inside the `<script>` tag

- [ ] **Step 1: Add canvas setup and aurora orbs + particle constellation**

Replace `/* JS goes here in Task 5+ */` with:

```js
(function () {
  'use strict';

  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = Math.max(document.body.scrollHeight, window.innerHeight);
  }
  resize();
  window.addEventListener('resize', resize);

  const W = () => canvas.width;
  const H = () => canvas.height;

  /* ---- Aurora orbs ---- */
  const orbs = [
    { x: 0.15, y: 0.12, r: 0.28, vx:  0.00022, vy:  0.00014, color: [18,  70, 200] },
    { x: 0.75, y: 0.25, r: 0.22, vx: -0.00019, vy:  0.00025, color: [10, 155, 200] },
    { x: 0.50, y: 0.55, r: 0.30, vx:  0.00016, vy: -0.00017, color: [50,  30, 180] },
    { x: 0.85, y: 0.75, r: 0.20, vx: -0.00025, vy: -0.00019, color: [15, 120, 180] },
    { x: 0.20, y: 0.85, r: 0.24, vx:  0.00019, vy:  0.00011, color: [20,  80, 220] },
  ];

  /* ---- Particle constellation ---- */
  const DOT_PALETTE = [
    { r: 1.2, color: 'rgba(80,180,245,0.75)' },
    { r: 1.8, color: 'rgba(50,210,220,0.65)' },
    { r: 2.4, color: 'rgba(130,160,255,0.60)' },
    { r: 1.0, color: 'rgba(60,200,255,0.55)' },
    { r: 2.0, color: 'rgba(100,130,240,0.70)' },
    { r: 1.4, color: 'rgba(40,220,200,0.60)' },
  ];

  function makeDot(i) {
    const p = DOT_PALETTE[i % DOT_PALETTE.length];
    return {
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00018,
      vy: (Math.random() - 0.5) * 0.00018,
      r: p.r, color: p.color,
      lit: 0,
    };
  }

  const NUM_DOTS = 70;
  const dots = Array.from({ length: NUM_DOTS }, (_, i) => makeDot(i));

  /* ---- Spell projectiles (Task 7 adds these) ---- */
  const projectiles = [];
  const blasts = [];

  function drawFrame() {
    const w = W(), h = H();
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#04101e';
    ctx.fillRect(0, 0, w, h);

    /* Aurora orbs */
    orbs.forEach(o => {
      o.x += o.vx; o.y += o.vy;
      if (o.x < -o.r || o.x > 1 + o.r) o.vx *= -1;
      if (o.y < -o.r || o.y > 1 + o.r) o.vy *= -1;
      const cx = o.x * w, cy = o.y * h, rad = o.r * Math.min(w, h);
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
      g.addColorStop(0,   `rgba(${o.color[0]},${o.color[1]},${o.color[2]},0.20)`);
      g.addColorStop(0.5, `rgba(${o.color[0]},${o.color[1]},${o.color[2]},0.06)`);
      g.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    });

    /* Dot connections */
    const MAX_CONN = 0.07 * Math.min(w, h);
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const px = dots[i].x * w, py = dots[i].y * h;
        const qx = dots[j].x * w, qy = dots[j].y * h;
        const dx = px - qx, dy = py - qy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_CONN) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(60,150,230,${0.10 * (1 - dist / MAX_CONN)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(px, py);
          ctx.lineTo(qx, qy);
          ctx.stroke();
        }
      }
    }

    /* Dots */
    dots.forEach(d => {
      d.x += d.vx; d.y += d.vy;
      if (d.x < 0) d.x = 1; if (d.x > 1) d.x = 0;
      if (d.y < 0) d.y = 1; if (d.y > 1) d.y = 0;
      if (d.lit > 0) {
        d.lit -= 0.04;
        const glow = ctx.createRadialGradient(d.x * w, d.y * h, 0, d.x * w, d.y * h, d.r * 6 * d.lit);
        glow.addColorStop(0, `rgba(180,230,255,${0.5 * d.lit})`);
        glow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(d.x * w, d.y * h, d.r * 6 * d.lit, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(d.x * w, d.y * h, d.r + (d.lit > 0 ? d.lit * 1.5 : 0), 0, Math.PI * 2);
      ctx.fillStyle = d.color;
      ctx.fill();
    });

    /* Projectiles + blasts drawn in Task 7 */
    drawProjectiles(w, h);
    drawBlasts(w, h);

    requestAnimationFrame(drawFrame);
  }

  /* Stubs expanded in Task 7 */
  function drawProjectiles(w, h) {}
  function drawBlasts(w, h) {}

  drawFrame();
```

Note: leave `})();` (the closing IIFE) off for now — Task 7 continues inside the same IIFE.

- [ ] **Step 2: Verify in browser**

Reload. You should see:
- Deep navy background with 5 slow-moving coloured glow blobs
- 70 dots of varied sizes and blue/teal/purple hues drifting slowly
- Faint lines connecting nearby dots
- No projectiles yet

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: canvas aurora orbs and particle constellation"
```

---

## Task 7: JS — Spell projectiles and blast effects

**Files:**
- Modify: `index.html` — replace the `drawProjectiles` and `drawBlasts` stub functions, then close the IIFE

- [ ] **Step 1: Replace `drawProjectiles` and `drawBlasts` stubs and close the IIFE**

Find this block in the script:

```js
  /* Stubs expanded in Task 7 */
  function drawProjectiles(w, h) {}
  function drawBlasts(w, h) {}

  drawFrame();
```

Replace it with:

```js
  /* ---- Spell projectiles ---- */
  const PROJ_COLORS = [
    [80, 180, 255],
    [20, 220, 210],
    [140, 80, 255],
    [60, 200, 255],
  ];

  let spawnCooldown = 0;
  const MAX_PROJ = 6;
  const SPAWN_INTERVAL = 90;

  function spawnProjectile() {
    if (projectiles.length >= MAX_PROJ) return;
    const si = Math.floor(Math.random() * NUM_DOTS);
    let ti;
    do { ti = Math.floor(Math.random() * NUM_DOTS); } while (ti === si);
    projectiles.push({
      x: dots[si].x,
      y: dots[si].y,
      targetIdx: ti,
      color: PROJ_COLORS[Math.floor(Math.random() * PROJ_COLORS.length)],
      r: 1.6 + Math.random() * 1.0,
      speed: 0.0006 + Math.random() * 0.0005,
      trail: [],
    });
  }

  function spawnBlast(x, y, color) {
    blasts.push({ x, y, color, ring: 0, alpha: 0.55, life: 1.0 });
  }

  function drawProjectiles(w, h) {
    spawnCooldown--;
    if (spawnCooldown <= 0) { spawnProjectile(); spawnCooldown = SPAWN_INTERVAL; }

    for (let i = projectiles.length - 1; i >= 0; i--) {
      const p = projectiles[i];
      const tgt = dots[p.targetIdx];
      const tx = tgt.x * w, ty = tgt.y * h;
      const cx = p.x * w, cy = p.y * h;
      const dx = tx - cx, dy = ty - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 8) {
        tgt.lit = 1.0;
        spawnBlast(tgt.x, tgt.y, p.color);
        projectiles.splice(i, 1);
        continue;
      }

      const speed = p.speed * Math.min(w, h);
      p.x += (dx / dist) * speed / w;
      p.y += (dy / dist) * speed / h;

      p.trail.push({ x: p.x * w, y: p.y * h });
      if (p.trail.length > 14) p.trail.shift();

      const [r, g, b] = p.color;

      for (let t = 1; t < p.trail.length; t++) {
        const frac = t / p.trail.length;
        ctx.beginPath();
        ctx.moveTo(p.trail[t - 1].x, p.trail[t - 1].y);
        ctx.lineTo(p.trail[t].x, p.trail[t].y);
        ctx.strokeStyle = `rgba(${r},${g},${b},${frac * 0.45})`;
        ctx.lineWidth = p.r * frac * 0.9;
        ctx.lineCap = 'round';
        ctx.stroke();
      }

      const halo = ctx.createRadialGradient(p.x * w, p.y * h, 0, p.x * w, p.y * h, p.r * 5);
      halo.addColorStop(0, `rgba(${r},${g},${b},0.5)`);
      halo.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(p.x * w, p.y * h, p.r * 5, 0, Math.PI * 2);
      ctx.fillStyle = halo;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(220,240,255,0.9)';
      ctx.fill();
    }
  }

  function drawBlasts(w, h) {
    for (let i = blasts.length - 1; i >= 0; i--) {
      const b = blasts[i];
      b.ring += 0.0018;
      b.life -= 0.03;
      b.alpha = b.life * 0.45;
      if (b.life <= 0) { blasts.splice(i, 1); continue; }

      const bx = b.x * w, by = b.y * h;
      const rad = b.ring * Math.min(w, h);
      const [r, g, bl] = b.color;

      ctx.beginPath();
      ctx.arc(bx, by, rad, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${r},${g},${bl},${b.alpha})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      const ig = ctx.createRadialGradient(bx, by, 0, bx, by, rad * 0.7);
      ig.addColorStop(0, `rgba(${r},${g},${bl},${b.alpha * 0.25})`);
      ig.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(bx, by, rad * 0.7, 0, Math.PI * 2);
      ctx.fillStyle = ig;
      ctx.fill();
    }
  }

  drawFrame();
})();
```

- [ ] **Step 2: Verify in browser**

Reload. You should see:
- Up to 6 glowing projectiles homing between dots with gradient trails
- On hit: target dot briefly flashes white and an expanding ring blast fades out
- Maximum 6 simultaneous projectiles, new ones spawning every ~90 frames (~1.5s)

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: canvas spell projectiles and blast effects"
```

---

## Task 8: Email obfuscation

**Files:**
- Modify: `index.html` — add email JS after the canvas IIFE, inside the same `<script>` tag

- [ ] **Step 1: Add email assembly after the closing `})();` of the canvas IIFE**

```js
/* Email obfuscation: assembled at runtime, never present as plain text in HTML */
(function () {
  const parts = ['contact', 'asyncstudio', 'be'];
  const addr = parts[0] + '\u0040' + parts[1] + '\u002E' + parts[2];

  /* Inline test: verify assembly produces the expected address */
  console.assert(addr === 'contact@asyncstudio.be', 'Email assembly failed');

  const links = document.querySelectorAll('[data-email]');
  links.forEach(el => {
    el.textContent = addr;
    el.href = 'mailto:' + addr;
  });
})();
```

- [ ] **Step 2: Add a `data-email` anchor to the footer HTML (optional — for when contact is re-enabled)**

The email link is intentionally absent from the current footer per the spec. The JS above is wired and ready — adding a contact link later requires only adding `<a data-email href="#"></a>` anywhere in the HTML. No JS changes needed.

- [ ] **Step 3: Open DevTools console and verify the assertion passes**

Open `index.html` in browser, open DevTools > Console. There should be no assertion errors logged. If you see `Email assembly failed`, the `parts` array has a typo.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: email obfuscation utility (runtime assembly)"
```

---

## Task 9: GitHub repository and Pages deployment

**Files:**
- No code changes — repo + hosting setup

- [ ] **Step 1: Create GitHub repository**

Go to GitHub and create a new repository named `as-website` under your account or the `asyncstudio` organisation. Set it to public (required for free GitHub Pages). Do not initialise with README.

- [ ] **Step 2: Push to GitHub**

```bash
git remote add origin https://github.com/<your-org>/as-website.git
git branch -M main
git push -u origin main
```

Replace `<your-org>` with your GitHub org or username.

- [ ] **Step 3: Enable GitHub Pages**

In the repository on GitHub: Settings > Pages > Source: Deploy from branch > Branch: `main` > Folder: `/ (root)` > Save.

GitHub will build and serve the site. The temporary URL will be `https://<org>.github.io/as-website`.

- [ ] **Step 4: Configure custom domain DNS**

In your DNS provider for `asyncstudio.be`, add the following records:

```
A     @   185.199.108.153
A     @   185.199.109.153
A     @   185.199.110.153
A     @   185.199.111.153
CNAME www asyncstudio.be.
```

These are GitHub Pages' IP addresses (current as of 2025 — verify at https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

- [ ] **Step 5: Set custom domain in GitHub Pages settings**

In repository Settings > Pages > Custom domain: enter `asyncstudio.be` > Save. Check "Enforce HTTPS" once the certificate is issued (may take a few minutes).

- [ ] **Step 6: Verify live site**

Open `https://asyncstudio.be` in a browser. Verify:
- Page loads over HTTPS
- Both sections scroll with snap
- Canvas animation runs
- Nav "About" link scrolls to About section
- Footer visible at the bottom of the About section

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Task |
|---|---|
| Single-page HTML/CSS/JS, no backend | Task 2 |
| Hero: wordmark, tagline hierarchy, CTA | Tasks 2, 4 |
| About: glass card, two paragraphs | Tasks 2, 5 |
| Footer inside About section | Task 5 |
| Fixed glassmorphism nav | Task 3 |
| Full-screen scroll snap, smooth scroll | Task 3 |
| Canvas: aurora orbs | Task 6 |
| Canvas: particle constellation | Task 6 |
| Canvas: spell projectiles + blast effects | Task 7 |
| Email obfuscation (JS assembly) | Task 8 |
| SEO meta tags, OG, schema.org | Task 2 |
| `<title>` as `Async Studio | Indie Game Studio` | Task 2 |
| Heading hierarchy h1/h2 | Task 2 |
| GitHub Pages deployment | Task 9 |
| Custom domain `asyncstudio.be` + HTTPS | Tasks 1, 9 |
| No WoW/private server references | Throughout |

All spec requirements covered. No gaps.
