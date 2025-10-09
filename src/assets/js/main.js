// main.js: interacciones y mejoras UX
(function () {
  const root = document.documentElement;
  const backToTop = document.getElementById('backToTop');
  const footer = document.querySelector('footer.site-footer');
  // Nota: Se removió la funcionalidad de modo oscuro y su botón.

  // Back to top
  function onScroll() {
    if (!backToTop) return;
    const y = window.scrollY || document.documentElement.scrollTop;
    if (y > 250) backToTop.classList.add('show');
    else backToTop.classList.remove('show');

    // Mantener el botón por encima del footer cuando éste es visible
    if (footer) {
      const rect = footer.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const overlap = Math.max(0, vh - rect.top); // cuánto entra el footer en viewport
      if (overlap > 0) {
        backToTop.classList.add('above-footer');
        backToTop.style.setProperty('--footer-height', `${Math.min(overlap, rect.height)}px`);
      } else {
        backToTop.classList.remove('above-footer');
        backToTop.style.removeProperty('--footer-height');
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
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
