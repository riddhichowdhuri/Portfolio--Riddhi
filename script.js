// =========================================================
// Riddhi Chowdhuri — Portfolio site scripts
// Vanilla JS only. No frameworks, no backend.
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initHamburger();
  initActiveNav();
  initReveal();
  initCounters();
  initFooterYear();
  initProjectFilter();
  initProjectModal();
  initContactForm();
});

/* ---------- THEME TOGGLE ---------- */
function initTheme(){
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = saved || (prefersDark ? 'dark' : 'light');
  applyTheme(initial);

  if (toggle){
    toggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('theme', next);
    });
  }

  function applyTheme(mode){
    if (mode === 'dark'){
      root.setAttribute('data-theme', 'dark');
      if (toggle){ toggle.textContent = '☀'; toggle.setAttribute('aria-label', 'Switch to light mode'); }
    } else {
      root.removeAttribute('data-theme');
      if (toggle){ toggle.textContent = '☾'; toggle.setAttribute('aria-label', 'Switch to dark mode'); }
    }
  }
}

/* ---------- MOBILE HAMBURGER MENU ---------- */
function initHamburger(){
  const btn = document.querySelector('.hamburger');
  const links = document.getElementById('nav-links');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    btn.classList.toggle('is-open', isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('is-open');
      btn.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- HIGHLIGHT CURRENT PAGE IN NAV ---------- */
function initActiveNav(){
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')){
      link.classList.add('active');
    }
  });
}

/* ---------- SCROLL REVEAL ---------- */
function initReveal(){
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)){
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(el => observer.observe(el));
}

/* ---------- STAT COUNTERS ---------- */
function initCounters(){
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const animate = (el) => {
    const target = parseFloat(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const isDecimal = String(target).includes('.');
    const duration = 1200;
    const start = performance.now();

    function tick(now){
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = (isDecimal ? value.toFixed(2) : Math.round(value)) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  };

  if (!('IntersectionObserver' in window)){
    counters.forEach(animate);
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        animate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(el => observer.observe(el));
}

/* ---------- FOOTER YEAR ---------- */
function initFooterYear(){
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
}

/* ---------- PROJECTS: FILTER ---------- */
function initProjectFilter(){
  const bar = document.querySelector('.filter-bar');
  const cards = document.querySelectorAll('.project-card');
  if (!bar || !cards.length) return;

  bar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');

    cards.forEach(card => {
      const category = card.getAttribute('data-category');
      const show = filter === 'all' || category === filter;
      card.style.display = show ? '' : 'none';
    });
  });
}

/* ---------- PROJECTS: DETAIL MODAL ---------- */
function initProjectModal(){
  const cards = document.querySelectorAll('.project-card');
  const overlay = document.querySelector('.modal-overlay');
  if (!cards.length || !overlay) return;

  const modalBody = overlay.querySelector('.modal-body');
  const closeBtn = overlay.querySelector('.modal-close');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const data = card.querySelector('script[type="application/json"]');
      if (!data) return;
      const project = JSON.parse(data.textContent);
      modalBody.innerHTML = buildModalContent(project);
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal(){
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  function buildModalContent(p){
    const rows = [
      ['Category', p.category],
      ['Research Question / Problem', p.question],
      ['Dataset', p.dataset],
      ['Methodology', p.methodology],
      ['Tools', p.tools],
      ['Findings', p.findings],
      ['Skills Demonstrated', p.skills]
    ];
    let html = `<h3>${p.title}</h3>`;
    html += '<dl>';
    rows.forEach(([label, value]) => {
      html += `<dt>${label}</dt><dd>${value}</dd>`;
    });
    html += '</dl>';
    return html;
  }
}

/* ---------- CONTACT FORM VALIDATION ---------- */
function initContactForm(){
  const form = document.getElementById('contact-form');
  if (!form) return;
  const status = form.querySelector('.form-status');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const subjectField = form.querySelector('#subject');
    const message = form.querySelector('#message');

    valid = validateField(name, v => v.trim().length > 1, 'Please enter your name.') && valid;
    valid = validateField(email, v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Please enter a valid email address.') && valid;
    valid = validateField(message, v => v.trim().length > 9, 'Message should be at least 10 characters.') && valid;

    if (!valid){
      status.textContent = 'Please fix the errors above.';
      status.className = 'form-status error';
      return;
    }

    // Static site: no backend. Open the visitor's mail client pre-filled.
    const subjectText = (subjectField && subjectField.value.trim()) || `Portfolio contact from ${name.value.trim()}`;
    const subject = encodeURIComponent(subjectText);
    const body = encodeURIComponent(`${message.value.trim()}\n\n— ${name.value.trim()} (${email.value.trim()})`);
    window.location.href = `mailto:4riddhi2005@gmail.com?subject=${subject}&body=${body}`;

    status.textContent = 'Opening your email client to send this message…';
    status.className = 'form-status success';
    form.reset();
  });

  function validateField(input, isValid, message){
    const errorEl = document.getElementById(input.id + '-error');
    if (!isValid(input.value)){
      if (errorEl) errorEl.textContent = message;
      input.setAttribute('aria-invalid', 'true');
      return false;
    }
    if (errorEl) errorEl.textContent = '';
    input.removeAttribute('aria-invalid');
    return true;
  }
}
