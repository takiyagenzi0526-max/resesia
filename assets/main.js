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
