(function () {
  'use strict';

  // Email assembled at runtime — never appears as plain text in HTML
  const email = ['contact', String.fromCharCode(64), 'asyncstudio', String.fromCharCode(46), 'be'].join('');
  const emailLink = document.getElementById('contact-email-link');
  if (emailLink) {
    emailLink.textContent = email;
    emailLink.href = 'mailto:' + email;
  }

  // CTA scroll — bypasses iOS two-tap anchor issue
  const cta = document.querySelector('.hero-cta');
  if (cta) {
    cta.addEventListener('click', e => {
      e.preventDefault();
      const target = document.getElementById('about');
      if (target) window.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
    });
  }

  // About section: hide content until section has snapped into view, then reveal
  const aboutSection = document.getElementById('about');
  if (aboutSection && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealEls = [
      aboutSection.querySelector('.section-label'),
      aboutSection.querySelector('.section-title'),
      aboutSection.querySelector('.about-glass'),
    ].filter(Boolean);

    revealEls.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity 0.45s ease ${i * 0.07}s, transform 0.45s ease ${i * 0.07}s`;
    });

    const io = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio >= 0.8) {
        revealEls.forEach(el => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        });
        io.disconnect();
      }
    }, { threshold: 0.8 });

    io.observe(aboutSection);
  }

  const modals = {
    privacy: document.getElementById('modal-privacy'),
    contact: document.getElementById('modal-contact'),
  };

  function openModal(id) {
    const m = modals[id];
    if (!m) return;
    m.classList.add('open');
    document.body.style.overflow = 'hidden';
    const focusTarget = m.querySelector('.modal-close');
    if (focusTarget) focusTarget.focus();
  }

  function closeAll() {
    Object.values(modals).forEach(m => m.classList.remove('open'));
    document.body.style.overflow = '';
  }

  document.getElementById('btn-privacy').addEventListener('click', () => openModal('privacy'));
  document.getElementById('btn-contact').addEventListener('click', () => openModal('contact'));

  document.querySelectorAll('.modal-close').forEach(btn => btn.addEventListener('click', closeAll));

  Object.values(modals).forEach(m => m.addEventListener('click', e => { if (e.target === m) closeAll(); }));

  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAll(); });
})();
