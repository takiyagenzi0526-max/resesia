/* ── Loading Screen ── */
const loadingScreen = document.querySelector('.loading-screen');
if (loadingScreen) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen.classList.add('is-hidden');
    }, 800);
  });
}

/* ── Mobile Menu ── */
const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.primary-nav');

if (menuToggle && primaryNav) {
  menuToggle.addEventListener('click', () => {
    primaryNav.classList.toggle('open');
  });

  primaryNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      primaryNav.classList.remove('open');
    });
  });
}

/* ── Header Scroll Shadow ── */
const header = document.querySelector('.site-header');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ── Hero Slider ── */
const hero = document.querySelector('.hero[data-hero-random="true"]');
const heroSlidesContainer = document.querySelector('.hero-slides');

if (hero && heroSlidesContainer) {
  const heroImages = [
    'assets/hero/osaka- (1).webp',
    'assets/hero/osaka- (2).webp',
    'assets/hero/osaka- (3).webp',
    'assets/hero/osaka- (4).webp',
    'assets/hero/osaka- (5).webp',
    'assets/hero/osaka- (6).webp',
    'assets/hero/osaka- (7).webp',
    'assets/hero/osaka- (8).webp'
  ];

  const shuffle = (items) => {
    const arr = [...items];
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const preloadImage = (src) => new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => resolve(null);
    img.src = src;
  });

  Promise.all(heroImages.map(preloadImage)).then((results) => {
    const availableImages = results.filter(Boolean);
    if (availableImages.length === 0) {
      return;
    }

    const randomizedImages = shuffle(availableImages);
    const slides = randomizedImages.map((src, index) => {
      const slide = document.createElement('div');
      slide.className = `hero-slide${index === 0 ? ' is-active' : ''}`;
      slide.style.backgroundImage = `url('${src}')`;
      heroSlidesContainer.appendChild(slide);
      return slide;
    });

    let currentIndex = 0;
    const intervalMs = 6000;

    if (slides.length > 1) {
      setInterval(() => {
        slides[currentIndex].classList.remove('is-active');
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.add('is-active');
      }, intervalMs);
    }
  });
}

/* ── FAQ Accordion ── */
document.querySelectorAll('.faq-question').forEach((btn) => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('is-open');

    item.closest('.faq-category').querySelectorAll('.faq-item.is-open').forEach((openItem) => {
      openItem.classList.remove('is-open');
      openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });

    if (!isOpen) {
      item.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

/* ── Scroll Fade-In Animation ── */
const fadeElements = document.querySelectorAll('.fade-in');

if (fadeElements.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  fadeElements.forEach((el) => observer.observe(el));
}
