// ============================================
// SELETOR DE IDIOMA — UI customizada no tema do site,
// usando o motor do Google Translate por baixo (oculto).
// ============================================

document.addEventListener('DOMContentLoaded', initLangSwitcher);

function initLangSwitcher() {
  const switcher = document.getElementById('langSwitcher');
  const btn = document.getElementById('langBtn');
  const menu = document.getElementById('langMenu');
  const currentLabel = document.getElementById('langCurrent');

  if (!switcher || !btn || !menu) return;

  // Abre/fecha o dropdown
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = switcher.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  document.addEventListener('click', (e) => {
    if (!switcher.contains(e.target)) {
      switcher.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      switcher.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });

  // Seleção de idioma
  menu.querySelectorAll('li[data-lang]').forEach((item) => {
    item.addEventListener('click', () => {
      const lang = item.getAttribute('data-lang');
      setActiveItem(menu, item);
      currentLabel.textContent = lang.split('-')[0].toUpperCase();
      switcher.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      changeLanguage(lang);
    });
  });

  // Reflete o idioma atual (cookie googtrans) ao carregar a página
  const savedLang = getSavedLang();
  if (savedLang && savedLang !== 'pt') {
    const match = menu.querySelector(`li[data-lang="${savedLang}"]`);
    if (match) {
      setActiveItem(menu, match);
      currentLabel.textContent = savedLang.split('-')[0].toUpperCase();
    }
  }
}

function setActiveItem(menu, item) {
  menu.querySelectorAll('li').forEach((li) => li.classList.remove('active'));
  item.classList.add('active');
}

function getSavedLang() {
  const match = document.cookie.match(/googtrans=\/[a-zA-Z-]+\/([a-zA-Z-]+)/);
  return match ? match[1] : null;
}

// Aciona a tradução real via o <select> que o Google Translate injeta
// (dentro do #google_translate_element, que fica oculto na página).
function changeLanguage(lang, attempt = 0) {
  const select = document.querySelector('#google_translate_element select.goog-te-combo');

  if (select) {
    select.value = lang;
    select.dispatchEvent(new Event('change'));
    return;
  }

  // O widget do Google carrega de forma assíncrona; tenta novamente por até ~5s.
  if (attempt < 20) {
    setTimeout(() => changeLanguage(lang, attempt + 1), 250);
  }
}
