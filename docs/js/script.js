// ============================================
// MARIA FERNANDA GOMES OLIVEIRA — PORTFÓLIO
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initTerminal();
  initReveal();
  initNavToggle();
});

/* ---------- TERMINAL HERO ---------- */
function initTerminal() {
  const body = document.getElementById('terminalBody');
  if (!body) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const lines = [
    { text: 'npm run build-career', type: 'cmd' },
    { text: 'Carregando perfil profissional...', type: 'info' },
    { text: 'Maria Fernanda Gomes Oliveira', type: 'pass' },
    { text: 'QA Engineer & Analista de Sistemas', type: 'pass' },
    { text: 'ATI — Tocantins (2024 — atual)', type: 'pass' },
    { text: 'Test suite: Selenium · Playwright · Cypress', type: 'pass' },
    { text: 'Product Owner — GTM', type: 'pass' },
    { text: '15+ protótipos entregues', type: 'pass' },
    { text: '0 falhas críticas em produção', type: 'pass' },
    { text: '', type: 'info' },
    { text: 'Build concluído em 0.42s · status: PASS', type: 'result' },
  ];

  if (prefersReduced) {
    body.innerHTML = lines
      .map(l => l.text ? `<div class="term-line ${l.type}" style="opacity:1">${escapeHtml(l.text)}</div>` : '')
      .join('');
    return;
  }

  let i = 0;
  function renderNext() {
    if (i >= lines.length) {
      const cursor = document.createElement('span');
      cursor.className = 'cursor-blink';
      body.appendChild(cursor);
      return;
    }
    const l = lines[i];
    if (l.text) {
      const div = document.createElement('div');
      div.className = `term-line ${l.type}`;
      div.textContent = l.text;
      body.appendChild(div);
    } else {
      const spacer = document.createElement('div');
      spacer.style.height = '8px';
      body.appendChild(spacer);
    }
    i++;
    setTimeout(renderNext, l.type === 'cmd' ? 500 : 260);
  }
  renderNext();
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* ---------- SCROLL REVEAL ---------- */
function initReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || targets.length === 0) {
    targets.forEach(t => t.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(t => observer.observe(t));
}

/* ---------- MOBILE NAV ---------- */
function initNavToggle() {
  const toggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');
  if (!toggle || !navList) return;

  toggle.addEventListener('click', () => {
    navList.classList.toggle('open');
  });

  navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navList.classList.remove('open'));
  });
}
