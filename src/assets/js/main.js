// main.js: interacciones y mejoras UX
(function () {
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const backToTop = document.getElementById('backToTop');
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  const nav = document.querySelector('nav.navbar');

  // Tema: persistencia en localStorage
  const THEME_KEY = 'theme';
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'dark') {
    root.classList.add('theme-dark');
  }

  function applyThemeState() {
    const isDark = root.classList.contains('theme-dark');
    // Toggle icon
    if (themeToggle) {
      const icon = themeToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-moon', !isDark);
        icon.classList.toggle('fa-sun', isDark);
      }
      // Toggle button style for contrast
      themeToggle.classList.toggle('btn-outline-light', isDark);
      themeToggle.classList.toggle('btn-outline-dark', !isDark);
    }
    // Update meta theme-color
    if (metaTheme) metaTheme.setAttribute('content', isDark ? '#0f0f10' : '#f2f4f8');
    // Navbar contrast: keep dark background to ensure readability
    if (nav) {
      if (isDark) {
        nav.classList.remove('navbar-light','bg-light');
        nav.classList.add('navbar-dark','bg-dark');
      } else {
        nav.classList.remove('navbar-dark','bg-dark');
        nav.classList.add('navbar-light','bg-light');
      }
    }
  }

  function setTheme(dark) {
    if (dark) {
      root.classList.add('theme-dark');
      localStorage.setItem(THEME_KEY, 'dark');
    } else {
      root.classList.remove('theme-dark');
      localStorage.setItem(THEME_KEY, 'light');
    }
    applyThemeState();
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = root.classList.toggle('theme-dark');
      localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
      applyThemeState();
    });
  }

  // Back to top
  function onScroll() {
    if (!backToTop) return;
    const y = window.scrollY || document.documentElement.scrollTop;
    if (y > 250) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Scroll suave para enlaces internos del navbar
  document.querySelectorAll('a.nav-link[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      const y = el.getBoundingClientRect().top + window.pageYOffset - 64; // compensar navbar
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  // Validación simple del formulario
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      const name = document.getElementById('nameInput');
      const email = document.getElementById('emailInput');
      const message = document.getElementById('messageInput');
      let ok = true;

      [name, email, message].forEach((field) => field.classList.remove('is-invalid'));

      if (!name.value.trim()) { ok = false; name.classList.add('is-invalid'); }
      if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) { ok = false; email.classList.add('is-invalid'); }
      if (!message.value.trim()) { ok = false; message.classList.add('is-invalid'); }

      if (!ok) {
        e.preventDefault();
        e.stopPropagation();
      } else {
        // Por ahora evitamos enviar; mostrar feedback
        e.preventDefault();
        alert('¡Gracias! Tu mensaje fue validado localmente.');
        form.reset();
      }
    });
  }

  // Inicializar AOS si está disponible
  window.addEventListener('load', () => {
    applyThemeState();
    if (window.AOS) {
      window.AOS.init({
        once: true,
        duration: 600,
        easing: 'ease-out-cubic',
        offset: 60,
      });
    }

    // Inicializar Swiper
    if (window.Swiper) {
      new Swiper('.mySwiper', {
        slidesPerView: 1,
        spaceBetween: 16,
        loop: true,
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        breakpoints: {
          576: { slidesPerView: 1.15 },
          768: { slidesPerView: 2 },
          992: { slidesPerView: 3 }
        }
      });
    }

    // Inicializar GLightbox
    if (window.GLightbox) {
      GLightbox({ selector: '.glightbox', touchNavigation: true, loop: true });
    }
  });
})();
