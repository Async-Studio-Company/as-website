(function () {
  'use strict';

  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let lastTime = performance.now();

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    lastTime = performance.now(); // reset dt after resize to avoid a spike
  }
  resize();
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 100);
  });

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
    { r: 1.2, color: 'rgba(80,180,245,0.75)'  },
    { r: 1.8, color: 'rgba(50,210,220,0.65)'  },
    { r: 2.4, color: 'rgba(130,160,255,0.60)' },
    { r: 1.0, color: 'rgba(60,200,255,0.55)'  },
    { r: 2.0, color: 'rgba(100,130,240,0.70)' },
    { r: 1.4, color: 'rgba(40,220,200,0.60)'  },
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

  /* ---- Spell projectiles ---- */
  const PROJ_COLORS = [
    [40,  200, 255],
    [80,  160, 245],
    [50,  220, 200],
    [120, 140, 255],
  ];
  const projectiles = [];
  const blasts = [];
  const MAX_PROJ = 3;
  let spawnTimer = 2500;

  function spawnProjectile() {
    if (projectiles.length >= MAX_PROJ) return;
    const srcIdx = Math.floor(Math.random() * NUM_DOTS);
    let tgtIdx;
    do { tgtIdx = Math.floor(Math.random() * NUM_DOTS); } while (tgtIdx === srcIdx);

    const col = PROJ_COLORS[Math.floor(Math.random() * PROJ_COLORS.length)];
    projectiles.push({
      x: dots[srcIdx].x,
      y: dots[srcIdx].y,
      targetIdx: tgtIdx,
      speed: 0.00012 + Math.random() * 0.00006, // units per ms (normalized coords)
      color: col,
      trail: [],
    });
    dots[srcIdx].lit = 0.5;
  }

  function updateProjectiles(dt) {
    for (let i = projectiles.length - 1; i >= 0; i--) {
      const p = projectiles[i];
      const tgt = dots[p.targetIdx];

      p.trail.push({ x: p.x, y: p.y });
      if (p.trail.length > 14) p.trail.shift();

      const dx = tgt.x - p.x;
      const dy = tgt.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 0.012) {
        tgt.lit = 1;
        blasts.push({ x: tgt.x, y: tgt.y, age: 0, duration: 650, color: p.color });
        projectiles.splice(i, 1);
        continue;
      }

      const step = p.speed * dt;
      p.x += (dx / dist) * step;
      p.y += (dy / dist) * step;
    }
  }

  function drawProjectiles(w, h) {
    projectiles.forEach(p => {
      // Gradient trail
      for (let i = 1; i < p.trail.length; i++) {
        const frac = i / p.trail.length;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${p.color[0]},${p.color[1]},${p.color[2]},${frac * 0.45})`;
        ctx.lineWidth = frac * 1.8;
        ctx.lineCap = 'round';
        ctx.moveTo(p.trail[i - 1].x * w, p.trail[i - 1].y * h);
        ctx.lineTo(p.trail[i].x * w, p.trail[i].y * h);
        ctx.stroke();
      }

      // Glow halo
      const px = p.x * w, py = p.y * h;
      const halo = ctx.createRadialGradient(px, py, 0, px, py, 9);
      halo.addColorStop(0,   `rgba(${p.color[0]},${p.color[1]},${p.color[2]},0.85)`);
      halo.addColorStop(0.4, `rgba(${p.color[0]},${p.color[1]},${p.color[2]},0.30)`);
      halo.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(px, py, 9, 0, Math.PI * 2);
      ctx.fillStyle = halo;
      ctx.fill();

      // Bright core
      ctx.beginPath();
      ctx.arc(px, py, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(220,245,255,0.95)';
      ctx.fill();
    });
  }

  function updateBlasts(dt) {
    for (let i = blasts.length - 1; i >= 0; i--) {
      blasts[i].age += dt;
      if (blasts[i].age >= blasts[i].duration) blasts.splice(i, 1);
    }
  }

  function drawBlasts(w, h) {
    blasts.forEach(b => {
      const t     = b.age / b.duration;
      const eased = 1 - (1 - t) * (1 - t); // ease-out quad
      const radius = eased * 0.055 * Math.min(w, h);
      const alpha  = (1 - t) * 0.55;

      // Expanding ring
      ctx.beginPath();
      ctx.arc(b.x * w, b.y * h, radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${b.color[0]},${b.color[1]},${b.color[2]},${alpha})`;
      ctx.lineWidth = 1.5 * (1 - t);
      ctx.stroke();

      // Inner flash in early phase only
      if (t < 0.25) {
        const innerAlpha = (1 - t / 0.25) * 0.28;
        const innerR = eased * 0.028 * Math.min(w, h);
        const flash = ctx.createRadialGradient(b.x * w, b.y * h, 0, b.x * w, b.y * h, innerR);
        flash.addColorStop(0, `rgba(${b.color[0]},${b.color[1]},${b.color[2]},${innerAlpha})`);
        flash.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(b.x * w, b.y * h, innerR, 0, Math.PI * 2);
        ctx.fillStyle = flash;
        ctx.fill();
      }
    });
  }

  /* ---- Main loop ---- */

  function drawFrame(now) {
    // Cap dt to 100ms to avoid huge jumps after tab switch
    const dt       = Math.min(now - lastTime, 100);
    const dtFactor = dt / 16; // 1.0 at 60 fps — keeps original velocity feel
    lastTime = now;

    if (!reducedMotion) {
      spawnTimer -= dt;
      if (spawnTimer <= 0) {
        spawnProjectile();
        spawnTimer = 2000 + Math.random() * 3000;
      }
      updateProjectiles(dt);
      updateBlasts(dt);
    }

    const w = W(), h = H();
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#04101e';
    ctx.fillRect(0, 0, w, h);

    /* Aurora orbs */
    orbs.forEach(o => {
      o.x += o.vx * dtFactor;
      o.y += o.vy * dtFactor;
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

    /* Update dot positions first, then draw connections (fixes desync) */
    dots.forEach(d => {
      d.x += d.vx * dtFactor;
      d.y += d.vy * dtFactor;
      if (d.x < 0) d.x = 1; if (d.x > 1) d.x = 0;
      if (d.y < 0) d.y = 1; if (d.y > 1) d.y = 0;
      if (d.lit > 0) d.lit = Math.max(0, d.lit - 0.04 * dtFactor);
    });

    /* Dot connections */
    const MAX_CONN = 0.07 * Math.min(w, h);
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const px = dots[i].x * w, py = dots[i].y * h;
        const qx = dots[j].x * w, qy = dots[j].y * h;
        const ddx = px - qx, ddy = py - qy;
        const dist = Math.sqrt(ddx * ddx + ddy * ddy);
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
      if (d.lit > 0) {
        const litR = d.r * 6 * d.lit;
        const glow = ctx.createRadialGradient(d.x * w, d.y * h, 0, d.x * w, d.y * h, litR);
        glow.addColorStop(0, `rgba(180,230,255,${0.5 * d.lit})`);
        glow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(d.x * w, d.y * h, litR, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(d.x * w, d.y * h, d.r + (d.lit > 0 ? d.lit * 1.5 : 0), 0, Math.PI * 2);
      ctx.fillStyle = d.color;
      ctx.fill();
    });

    if (!reducedMotion) {
      drawProjectiles(w, h);
      drawBlasts(w, h);
    }

    requestAnimationFrame(drawFrame);
  }

  requestAnimationFrame(drawFrame);
})();
