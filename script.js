/**
 * Barbershop Template — Core JavaScript
 * All client-specific data is read from CLIENT (client.config.js)
 *
 * To launch on a new client: only edit client.config.js — no changes needed here.
 */

// ==========================================================================
// 1. SETUP & STATE
// ==========================================================================
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const state = {
  isTouch: window.matchMedia("(pointer: coarse)").matches,
  isMobile: window.matchMedia("(max-width: 768px)").matches,
  isLoading: true
};

// ==========================================================================
// 2. LENIS SMOOTH SCROLL (Synced with GSAP)
// ==========================================================================
const lenis = new Lenis({
  lerp: 0.1,
  wheelMultiplier: 1,
  smoothWheel: true,
  syncTouch: false,
  touchInertiaMultiplier: 10
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// ==========================================================================
// 3. CLIENT DATA INJECTION
// ==========================================================================

/**
 * Populate every DOM placeholder with data from CLIENT config.
 * Called synchronously before renders, before GSAP animations.
 */
function initClientData() {
  const c = CLIENT;

  // Helper: safely set text/href/src on an element
  const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  const setHTML = (id, val) => { const el = document.getElementById(id); if (el) el.innerHTML = val; };
  const setSrc  = (id, src, alt) => { const el = document.getElementById(id); if (!el) return; el.src = src; if (alt !== undefined) el.alt = alt; };
  const setHref = (id, href, label) => { const el = document.getElementById(id); if (!el) return; el.href = href; if (label) el.textContent = label; };
  const setAttr = (id, attr, val) => { const el = document.getElementById(id); if (el) el.setAttribute(attr, val); };

  // --- Loader ---
  setSrc('loaderLogo', c.logo, c.name + ' Logo');
  setText('loaderTagline', c.tagline);

  // --- Navbar ---
  setSrc('navLogoImg', c.logo, c.shortName);
  setAttr('navLogo', 'aria-label', c.name + ' – pagina principală');
  setHref('navCta', c.bookingUrl, c.bookingLabel);
  setAttr('navCta', 'aria-label', c.bookingLabel + ' pe Mero');
  setHref('mobileNavCta', c.bookingUrl, c.bookingLabel);

  // --- Hero ---
  setSrc('heroImg', c.heroImage, 'Interior ' + c.name);
  setText('heroLine1', c.heroLine1);
  setText('heroLine2', c.heroLine2);
  setHref('heroCta', c.bookingUrl, c.bookingLabel);
  setText('heroGhostName', c.shortName);

  // --- Marquee ---
  const marqueeItems = c.marquee.map(m => `<span>${m}</span><span class="marquee-dot">·</span>`).join('');
  setHTML('marqueeContent1', marqueeItems);
  setHTML('marqueeContent2', marqueeItems);

  // --- About section ---
  setSrc('aboutImg', c.aboutImage, c.aboutAlt);
  setText('badgeNum', c.badgeYears + '+');
  setText('badgeLabel', c.badgeLabel);
  setText('aboutPreTitle', c.aboutPreTitle);
  setHTML('aboutTitle', c.aboutTitle + '<br /><em>' + c.aboutTitleEm + '</em>');
  setHTML('aboutPullQuote', c.aboutPullQuote);
  setText('aboutP1', c.aboutParagraph1);
  setText('aboutP2', c.aboutParagraph2);

  // About stats counters
  const statsEl = document.getElementById('aboutStats');
  if (statsEl) {
    statsEl.innerHTML = c.stats.map(s => `
      <div class="stat">
        <span class="stat-num" data-count="${s.num}">0</span><span class="stat-suffix">${s.suffix}</span>
        <span class="stat-label">${s.label}</span>
      </div>
    `).join('');
  }

  // --- Stats Strip ---
  const stripEl = document.getElementById('statsStripInner');
  if (stripEl) {
    const divider = '<div class="stat-divider" aria-hidden="true"></div>';
    stripEl.innerHTML = c.statsBig.map((s, i) => `
      ${i > 0 ? divider : ''}
      <div class="stat-big reveal-up">
        <span class="stat-big-num" data-count="${s.num}">0</span><span class="stat-big-suffix">${s.suffix}</span>
        <span class="stat-big-label">${s.label}</span>
      </div>
    `).join('');
  }

  // --- Contact section ---
  setText('contactCityTitle', 'în ' + c.address.city.split('-')[0]);
  setHTML('contactAddress', c.address.street + ',<br />' + c.address.city + ', ' + c.address.zip);
  setHTML('contactHours', c.hours.map(h => h.days + ': ' + h.time).join('<br />'));

  const phoneEl = document.getElementById('contactPhone');
  if (phoneEl) { phoneEl.href = 'tel:' + c.phone; phoneEl.textContent = c.phoneDisplay; }

  const igEl = document.getElementById('contactInstagram');
  if (igEl) { igEl.href = c.social.instagram; igEl.textContent = c.instagramHandle; }

  setHref('contactCta', c.bookingUrl);
  setAttr('contactMap', 'src', c.address.mapEmbed);
  setAttr('contactMap', 'title', 'Locația ' + c.name + ' pe hartă');

  // --- Footer ---
  const brandHero = document.getElementById('footerBrandHero');
  if (brandHero) brandHero.textContent = c.shortName.toUpperCase().replace("'S", "'S");
  setSrc('footerLogo', c.logo, c.shortName + ' Logo');
  setText('footerTagline', c.footerTagline);

  // Social icons
  const socialIcons = { instagram: 'ph-instagram-logo', facebook: 'ph-facebook-logo', tiktok: 'ph-tiktok-logo' };
  const socialEl = document.getElementById('footerSocial');
  if (socialEl) {
    socialEl.innerHTML = Object.entries(c.social).map(([key, url]) => `
      <a href="${url}" target="_blank" rel="noopener" aria-label="${key} ${c.name}">
        <i class="ph ${socialIcons[key]}" aria-hidden="true"></i>
      </a>
    `).join('');
  }

  // Footer services list (top 5 from first category)
  const footerServices = document.getElementById('footerServices');
  if (footerServices && c.services.categories.length > 0) {
    const items = c.services.categories[0].items.slice(0, 5);
    footerServices.innerHTML = items.map(s => `<li><a href="#servicii">${s.name}</a></li>`).join('');
  }

  // Footer address
  setHTML('footerAddress',
    c.address.street + '<br />' +
    c.address.city + ', ' + c.address.zip + '<br />' +
    `<a href="tel:${c.phone}">${c.phoneDisplay}</a><br />` +
    `<a href="mailto:${c.email}">${c.email}</a>`
  );

  // Footer bottom
  setText('footerYear', new Date().getFullYear());
  setText('footerLegal', c.name);
  setText('footerCredit', c.address.city + ', România');
}

// ==========================================================================
// 4. RENDER UI FUNCTIONS (driven by CLIENT.*)
// ==========================================================================

function renderServices() {
  const container = document.getElementById('servicesMenuContainer');
  if (!container) return;

  const createRow = (item) => `
    <div class="service-row">
      <div class="service-info">
        <h4 class="service-name">${item.name}</h4>
        <p class="service-desc">${item.desc}</p>
      </div>
      <div class="service-dots"></div>
      <div class="service-price">${item.price}</div>
    </div>
  `;

  const createCategory = (cat, isOpen = false) => `
    <div class="service-category ${isOpen ? 'is-open' : ''}">
      <h3 class="category-title" role="button" tabindex="0">
        ${cat.label} <i class="ph ph-caret-down"></i>
      </h3>
      <div class="category-content">
        <div class="category-content-inner">
          ${cat.items.map(createRow).join('')}
        </div>
      </div>
    </div>
  `;

  container.innerHTML = CLIENT.services.categories
    .map((cat, i) => createCategory(cat, i === 0))
    .join('');

  // Attach Toggle Listeners
  container.querySelectorAll('.category-title').forEach(titleBtn => {
    titleBtn.addEventListener('click', () => {
      const parent = titleBtn.closest('.service-category');
      parent.classList.toggle('is-open');
    });
  });
}

function renderGallery() {
  const container = document.getElementById('galleryAccordion');
  if (!container) return;

  container.innerHTML = CLIENT.gallery.map((img) => `
    <div class="portfolio-item" tabindex="0" role="button">
      <img src="${img.src}" alt="${img.alt}" loading="lazy" class="portfolio-img">
    </div>
  `).join('');

  const items = container.querySelectorAll('.portfolio-item');
  items.forEach(item => {
    item.addEventListener('click', () => {
      if (item.classList.contains('active')) {
        item.classList.remove('active');
        return;
      }
      items.forEach(s => s.classList.remove('active'));
      item.classList.add('active');
    });
  });
}

function renderTestimonials() {
  const track = document.getElementById('testimonialsTrack');
  const dotsContainer = document.getElementById('testimonialsDots');
  if (!track || !dotsContainer) return;

  track.innerHTML = CLIENT.testimonials.map(t => `
    <div class="testimonial-card">
      <div class="test-stars">
        <i class="ph ph-star-fill"></i><i class="ph ph-star-fill"></i><i class="ph ph-star-fill"></i><i class="ph ph-star-fill"></i><i class="ph ph-star-fill"></i>
      </div>
      <p class="test-text">„${t.text}"</p>
      <div class="test-author">
        <div class="test-avatar">${t.initial}</div>
        <div class="test-name">${t.name}</div>
      </div>
    </div>
  `).join('');

  dotsContainer.innerHTML = CLIENT.testimonials.map((_, i) =>
    `<button class="dot ${i === 0 ? 'active' : ''}" aria-label="Testimonial ${i + 1}" data-idx="${i}"></button>`
  ).join('');
}

// Run all data injection and render calls
initClientData();
renderServices();
renderGallery();
renderTestimonials();

// ==========================================================================
// TESTIMONIALS – Drag scroll + Dot Sync
// ==========================================================================
(function initTestimonialsCarousel() {
  const wrap = document.querySelector('.testimonials-track-wrap');
  const track = document.getElementById('testimonialsTrack');
  const dotsContainer = document.getElementById('testimonialsDots');
  if (!wrap || !track || !dotsContainer) return;

  dotsContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.dot');
    if (!btn) return;
    const idx = parseInt(btn.getAttribute('data-idx'), 10);
    const cards = track.querySelectorAll('.testimonial-card');
    if (cards[idx]) {
      cards[idx].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  });

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = [...track.querySelectorAll('.testimonial-card')];
        const idx = cards.indexOf(entry.target);
        if (idx === -1) return;
        const dots = [...dotsContainer.querySelectorAll('.dot')];
        dots.forEach((d, i) => d.classList.toggle('active', i === idx));
      }
    });
  }, { root: wrap, threshold: 0.6 });

  track.querySelectorAll('.testimonial-card').forEach(card => cardObserver.observe(card));

  if (!window.matchMedia('(pointer: coarse)').matches) {
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    wrap.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX - wrap.offsetLeft;
      scrollLeft = track.scrollLeft;
      wrap.style.cursor = 'grabbing';
    });
    window.addEventListener('mouseup', () => {
      isDragging = false;
      wrap.style.cursor = 'grab';
    });
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - wrap.offsetLeft;
      const walk = (x - startX) * 1.5;
      track.scrollLeft = scrollLeft - walk;
    });
  }
})();

// ==========================================================================
// 5. PHYSICS CURSOR (requestAnimationFrame Lerp Engine)
// ==========================================================================
class CursorEngine {
  constructor() {
    if (state.isTouch) return;

    this.dot = document.getElementById('cursorDot');
    this.ring = document.getElementById('cursorRing');
    this.label = document.getElementById('cursorLabel');

    this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.dotPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.ringPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    this.initEvents();
    this.loop();
  }

  initEvents() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    document.querySelectorAll('a, button, .gallery-item').forEach(el => {
      el.addEventListener('mouseenter', () => this.hoverEnter(el));
      el.addEventListener('mouseleave', () => this.hoverLeave(el));

      if (el.classList.contains('btn-large')) {
        el.addEventListener('mousemove', (e) => this.magnetMove(e, el));
      }
    });
  }

  lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
  }

  loop() {
    this.dotPos.x = this.lerp(this.dotPos.x, this.mouse.x, 0.35);
    this.dotPos.y = this.lerp(this.dotPos.y, this.mouse.y, 0.35);
    this.ringPos.x = this.lerp(this.ringPos.x, this.mouse.x, 0.1);
    this.ringPos.y = this.lerp(this.ringPos.y, this.mouse.y, 0.1);

    this.dot.style.transform = `translate3d(${this.dotPos.x}px, ${this.dotPos.y}px, 0) translate(-50%, -50%)`;
    this.ring.style.transform = `translate3d(${this.ringPos.x}px, ${this.ringPos.y}px, 0) translate(-50%, -50%)`;

    requestAnimationFrame(() => this.loop());
  }

  hoverEnter(el) {
    this.ring.classList.add('is-hovering');
    let text = "";
    if (el.classList.contains('gallery-item')) text = "Vezi";
    if (el.tagName === 'A') text = "Deschide";
    this.label.textContent = text;
  }

  hoverLeave(el) {
    this.ring.classList.remove('is-hovering');
    this.label.textContent = "";
    if (el.classList.contains('btn-large')) {
      gsap.to(el, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.3)' });
    }
  }

  magnetMove(e, el) {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const moveX = (e.clientX - cx) * 0.2;
    const moveY = (e.clientY - cy) * 0.2;
    gsap.to(el, { x: moveX, y: moveY, duration: 0.1, ease: 'power2.out' });
  }
}

// ==========================================================================
// 5.5 ATMOSPHERE ENGINE (Canvas Particles)
// ==========================================================================
class AtmosphereEngine {
  constructor() {
    this.canvas = document.getElementById('heroCanvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.numParticles = window.innerWidth < 768 ? 40 : 100;

    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.initParticles();
    gsap.ticker.add(() => this.render());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < this.numParticles; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.8) * 0.3,
        alpha: Math.random() * 0.5 + 0.1
      });
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -10) p.x = this.canvas.width + 10;
      if (p.x > this.canvas.width + 10) p.x = -10;
      if (p.y < -10) {
        p.y = this.canvas.height + 10;
        p.x = Math.random() * this.canvas.width;
      }
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
      this.ctx.fill();
    });
  }
}

// ==========================================================================
// 6. INITIALIZATION & LOADER CHOREOGRAPHY
// ==========================================================================

function initApp() {
  const cursor = new CursorEngine();
  const atmosphere = new AtmosphereEngine();

  document.querySelectorAll('[data-split]').forEach(el => {
    const words = el.innerText.split(' ');
    el.innerHTML = words.map(w => `<span class="split-word" style="display:inline-block; clip-path:inset(0 0 100% 0); transform:translateY(100%);"> ${w} </span>`).join('');
  });

  const tlLoader = gsap.timeline();

  tlLoader.to('.loader-logo', { opacity: 1, duration: 0.8, ease: 'power2.out' })
    .to('.loader-tagline', { opacity: 1, duration: 0.8, ease: 'power2.out' }, "-=0.4")
    .to('.loader-bar-wrap', { opacity: 1, duration: 0.3 }, "-=0.6")
    .to('.loader-bar', { x: '0%', duration: 1.0, ease: 'power3.inOut' }, "-=0.6")
    .to('.loader-inner', { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' }, "+=0.2")
    .to('#loaderCurtain', { scaleY: 0, transformOrigin: 'top', duration: 1.0, ease: 'expo.inOut' })
    .call(() => {
      document.getElementById('loader').style.display = 'none';
      state.isLoading = false;
      initScrollAnimations();
    })
    .fromTo('.hero-img',
      { opacity: 0, scale: 1.15 },
      { opacity: 1, scale: 1, duration: 4.5, ease: 'power2.out' },
      "-=1.0"
    )
    .fromTo('.hero-line', {
      clipPath: 'inset(0 0 100% 0)',
      y: 30
    }, {
      clipPath: 'inset(0 0 0% 0)',
      y: 0,
      duration: 1.4,
      stagger: 0.15,
      ease: 'power3.out'
    }, "-=3.0")
    .to('.hero-actions', { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' }, "-=2.4")
    .to('.hero-scroll-hint', { opacity: 1, duration: 1.2, ease: 'power2.out' }, "-=2.2");
}

window.addEventListener('load', () => setTimeout(initApp, 500));


// ==========================================================================
// 7. SCROLL ANIMATIONS (GSAP)
// ==========================================================================

function initScrollAnimations() {

  const progressBar = document.getElementById('scrollProgress');
  const navbar = document.getElementById('navbar');

  lenis.on('scroll', (e) => {
    const progress = e.progress;
    progressBar.style.transform = `scaleX(${progress})`;

    const currentScrollY = e.animatedScroll;
    const velocity = e.velocity;

    if (currentScrollY > 50) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }

    if (currentScrollY > window.innerHeight * 0.5) {
      if (velocity > 2 && !menuOpen) {
        navbar.classList.add('nav-hidden');
      } else if (velocity < -2) {
        navbar.classList.remove('nav-hidden');
      }
    } else {
      navbar.classList.remove('nav-hidden');
    }
  });

  gsap.utils.toArray('.reveal-up').forEach(elem => {
    gsap.to(elem, {
      scrollTrigger: { trigger: elem, start: 'top 85%' },
      y: 0,
      opacity: 1,
      duration: 1.4,
      ease: 'power3.out'
    });
  });

  gsap.utils.toArray('.reveal-scale').forEach(elem => {
    gsap.to(elem, {
      scrollTrigger: { trigger: elem, start: 'top 85%' },
      scale: 1,
      opacity: 1,
      duration: 1.5,
      ease: 'power3.out'
    });
  });

  // Number Counters
  gsap.utils.toArray('.stat-num, .stat-big-num').forEach(elem => {
    const targetCount = parseInt(elem.getAttribute('data-count'), 10);
    ScrollTrigger.create({
      trigger: elem,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: targetCount,
          duration: 2,
          ease: 'power3.out',
          onUpdate: function () {
            elem.textContent = Math.round(this.targets()[0].val);
          }
        });
      }
    });
  });

  // Horizontal Scroll – Desktop Only
  let mm = gsap.matchMedia();
  mm.add("(min-width: 1025px)", () => {
    const track = document.getElementById('hScrollTrack');
    const panels = gsap.utils.toArray('.h-panel');

    if (track && panels.length > 0) {
      const walkDistance = () => track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: () => -walkDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: '#povestea',
          pin: true,
          scrub: 1,
          end: () => `+=${walkDistance()}`,
          invalidateOnRefresh: true
        }
      });
    }
  });

  // About Badge Reveal
  ScrollTrigger.create({
    trigger: '.about-img-wrap',
    start: 'top 75%',
    once: true,
    onEnter: () => {
      gsap.to('.about-img-badge', {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.3
      });
    }
  });

  // Floating badge float loop
  gsap.to('.about-floater', {
    y: -15,
    duration: 2.5,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true
  });
}

// ==========================================================================
// 8. UI INTERACTIONS
// ==========================================================================

// Active Nav Links
const observerOptions = { root: null, rootMargin: '-30% 0px -70% 0px', threshold: 0 };
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === id) link.classList.add('active');
      });
    }
  });
}, observerOptions);
document.querySelectorAll('section[id]').forEach(sec => sectionObserver.observe(sec));


// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  hamburger.setAttribute('aria-expanded', menuOpen);

  if (menuOpen) {
    gsap.to(mobileNav, { autoAlpha: 1, clipPath: 'inset(0 0 0% 0)', duration: 0.6, ease: 'expo.inOut' });
    gsap.to('.mobile-nav-link, .mobile-nav-cta', { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'expo.out', delay: 0.3 });
    lenis.stop();
  } else {
    gsap.to('.mobile-nav-link, .mobile-nav-cta', { y: 20, opacity: 0, duration: 0.3 });
    gsap.to(mobileNav, { autoAlpha: 0, clipPath: 'inset(0 0 100% 0)', duration: 0.5, ease: 'expo.inOut', delay: 0.2 });
    lenis.start();
  }
});


// Smooth Anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      if (menuOpen) hamburger.click();
      lenis.scrollTo(target, { offset: -90, duration: 1.5 });
    }
  });
});
