(function () {
  'use strict';

  // Email assembled at runtime — never appears as plain text in HTML
  const email = ['contact', String.fromCharCode(64), 'asyncstudio', String.fromCharCode(46), 'be'].join('');
  const emailLink = document.getElementById('contact-email-link');
  if (emailLink) {
    emailLink.textContent = email;
    emailLink.href = 'mailto:' + email;
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
