/**
 * Ruben's Barbershop - Core JavaScript
 * Featuring GSAP, Lenis Smooth Scroll, and Custom Physics Cursor
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
  syncTouch: true,
  touchInertiaMultiplier: 10
});

// Keep GSAP ticker & Lenis perfectly in sync
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0); // Prevent GSAP jump on tab switch

// ==========================================================================
// 3. DATABASES (Mock Data for Render)
// ==========================================================================
const db = {
  services: {
    tunsori: [
      { id: 't1', name: 'Tunsoare Clasică', price: '90 LEI', time: '45 min', desc: 'Consultare, spălat, tuns din foarfecă/mașină, styling cu produse premium.' },
      { id: 't2', name: 'Skin Fade', price: '100 LEI', time: '50 min', desc: 'Pierdere la 0, fade impecabil executat cu shaver sau brici.' },
      { id: 't3', name: 'Tuns din Foarfecă', price: '110 LEI', time: '60 min', desc: 'Pentru păr mediu și lung. Construcție de formă exclusiv din foarfecă.' },
      { id: 't4', name: 'Buzz Cut', price: '60 LEI', time: '30 min', desc: 'Tuns scurt, uniform, executat la mașină, cu spălat și styling rapid.' }
    ],
    barba: [
      { id: 'b1', name: 'Beard Grooming Standard', price: '60 LEI', time: '30 min', desc: 'Contur asimetric, scurtat, ulei de barbă premium.' },
      { id: 'b2', name: 'Hot Towel Shave (Ritual)', price: '80 LEI', time: '40 min', desc: 'Ritual traditional cu prosop fierbinte, cremă de ras The Bluebeards, brici.' },
      { id: 'b3', name: 'Contur cu Briciul', price: '40 LEI', time: '20 min', desc: 'Curățare extremă a liniilor bărbii pe pomeți și gât.' }
    ],
    combo: [
      { id: 'c1', name: 'Exclusiv: Păr & Barbă', price: '140 LEI', time: '1h 15m', desc: 'Pachetul nostru semnătură. Include spălat, tuns, beard grooming standard.' },
      { id: 'c2', name: 'Royal Păr & Hot Towel', price: '160 LEI', time: '1h 30m', desc: 'Experiența completă: Tunsoare clasică + Ritualul bărbieritului cu prosop fierbinte.' }
    ]
  },
  gallery: [
    { src: 'ruben.jpg', alt: 'Fade premium cu contur de barbă' },
    { src: 'ruben.jpg', alt: 'Tunsoare clasică executată din foarfecă' },
    { src: 'ruben.jpg', alt: 'Ritual bărbierit cu prosop fierbinte' },
    { src: 'ruben.jpg', alt: 'Detalii instrumentar frizerie' },
    { src: 'ruben.jpg', alt: 'Clipper work pe păr des' },
    { src: 'ruben.jpg', alt: 'Atmosferă interior Ruben Barbershop' }
  ],
  testimonials: [
    { name: 'Andrei Popa', initial: 'A', text: 'Singurul loc din Cluj unde mă pot relaxa cu adevărat. Tunsorile sunt mereu impecabile, iar atmosfera este de nota 10.' },
    { name: 'Mihai Dan', initial: 'M', text: 'Atenția la detalii a lui Ruben este incredibilă. Au trecut ani de când vin aici și calitatea nu a scăzut niciodată.' },
    { name: 'Cristian I.', initial: 'C', text: 'Hot Towel Shave-ul este o experiență pe care orice bărbat ar trebui să o încerce măcar o dată.' },
    { name: 'Alexandru N.', initial: 'A', text: 'Prietenos, profesionist și curat. Cel mai bun fade pe care l-am primit în România.' }
  ]
};

// ==========================================================================
// 4. RENDER UI FUNCTIONS
// ==========================================================================

function renderServices() {
  const tGrid = document.getElementById('servicesGrid');
  const bGrid = document.getElementById('servicesGridBarba');
  const cGrid = document.getElementById('servicesGridCombo');

  const createCard = (item) => `
    <div class="service-card GSAP-service">
      <div class="service-header">
        <h3 class="service-title">${item.name}</h3>
        <span class="service-price">${item.price}</span>
      </div>
      <p class="service-desc">${item.desc}</p>
      <div class="service-time"><i class="ph ph-clock"></i>${item.time}</div>
    </div>
  `;

  if (tGrid) tGrid.innerHTML = db.services.tunsori.map(createCard).join('');
  if (bGrid) bGrid.innerHTML = db.services.barba.map(createCard).join('');
  if (cGrid) cGrid.innerHTML = db.services.combo.map(createCard).join('');
}

function renderGallery() {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  grid.innerHTML = db.gallery.map((img, i) => `
    <div class="gallery-item" data-lb-idx="${i}">
      <img src="${img.src}" alt="${img.alt}" loading="lazy" width="600" height="800" class="gallery-img">
      <div class="gallery-overlay">
        <div class="gallery-caption">${img.alt}</div>
      </div>
    </div>
  `).join('');
}

function renderTestimonials() {
  const track = document.getElementById('testimonialsTrack');
  const dots = document.getElementById('testimonialsDots');
  if (!track || !dots) return;

  track.innerHTML = db.testimonials.map(t => `
    <div class="testimonial-card">
      <div class="test-stars">
        <i class="ph ph-star-fill"></i><i class="ph ph-star-fill"></i><i class="ph ph-star-fill"></i><i class="ph ph-star-fill"></i><i class="ph ph-star-fill"></i>
      </div>
      <p class="test-text">„${t.text}”</p>
      <div class="test-author">
        <div class="test-avatar">${t.initial}</div>
        <div class="test-name">${t.name}</div>
      </div>
    </div>
  `).join('');

  dots.innerHTML = db.testimonials.map((_, i) => `<button class="dot ${i === 0 ? 'active' : ''}" aria-label="Testimonial ${i + 1}"></button>`).join('');
}

// Call renders
renderServices();
renderGallery();
renderTestimonials();

// Set up Footer year
document.getElementById('footerYear').textContent = new Date().getFullYear();

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

    // Magnetic Links / Hover States
    document.querySelectorAll('a, button, .gallery-item').forEach(el => {
      el.addEventListener('mouseenter', () => this.hoverEnter(el));
      el.addEventListener('mouseleave', () => this.hoverLeave(el));

      // Magnetic pull only on large buttons
      if (el.classList.contains('btn-large')) {
        el.addEventListener('mousemove', (e) => this.magnetMove(e, el));
      }
    });
  }

  lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
  }

  loop() {
    // Dot is fast: 0.35 lerp
    this.dotPos.x = this.lerp(this.dotPos.x, this.mouse.x, 0.35);
    this.dotPos.y = this.lerp(this.dotPos.y, this.mouse.y, 0.35);

    // Ring is slow: 0.1 lerp
    this.ringPos.x = this.lerp(this.ringPos.x, this.mouse.x, 0.1);
    this.ringPos.y = this.lerp(this.ringPos.y, this.mouse.y, 0.1);

    // Apply transform3d to avoid layout thrashing
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
    // Reset magnetic transform
    if (el.classList.contains('btn-large')) {
      gsap.to(el, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.3)' });
    }
  }

  magnetMove(e, el) {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    // Max movement 10px
    const moveX = (e.clientX - cx) * 0.2;
    const moveY = (e.clientY - cy) * 0.2;

    gsap.to(el, {
      x: moveX,
      y: moveY,
      duration: 0.1,
      ease: 'power2.out'
    });
  }
}

// ==========================================================================
// 6. INITIALIZATION & LOADER CHOREOGRAPHY
// ==========================================================================

function initApp() {
  const cursor = new CursorEngine();

  // Custom SplitText Alternative logic (wrapping words in spans)
  document.querySelectorAll('[data-split]').forEach(el => {
    const words = el.innerText.split(' ');
    el.innerHTML = words.map(w => `<span class="split-word" style="display:inline-block; clip-path:inset(0 0 100% 0); transform:translateY(100%);"> ${w} </span>`).join('');
  });

  const tlLoader = gsap.timeline({
    onComplete: () => {
      document.getElementById('loader').style.display = 'none';
      state.isLoading = false;
      initScrollAnimations();
    }
  });

  // Loader sequence
  tlLoader.to('.loader-logo', { opacity: 1, duration: 1, ease: 'power2.inOut' })
    .to('.loader-tagline', { opacity: 1, duration: 1, ease: 'power2.inOut' }, "-=0.5")
    .to('.loader-bar-wrap', { opacity: 1, duration: 0.5 })
    .to('.loader-bar', { x: '0%', duration: 1.5, ease: 'power3.inOut' })
    .to('.loader-inner', { opacity: 0, y: -20, duration: 0.6, ease: 'power2.in' }, "+=0.2")
    // Reveal Curtain
    .to('#loaderCurtain', {
      scaleY: 0,
      duration: 1.2,
      ease: 'expo.inOut'
    })
    // Hero Image Premium Reveal
    .to('.hero-img', {
      opacity: 1,
      scale: 1.05,
      duration: 2.5,
      ease: 'power2.out'
    }, "-=1")
    // Hero Text Entrances
    .to('.split-word', {
      clipPath: 'inset(0 0 0% 0)',
      y: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'expo.out'
    }, "-=0.4")
    .to('.hero-pretitle', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, "-=0.8")
    .to('.hero-sub', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, "-=0.6")
    .to('.hero-actions', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, "-=0.4")
    .to('.hero-scroll-hint', { opacity: 1, duration: 1 }, "-=0.2");
}

// Simulate network load
window.addEventListener('load', () => setTimeout(initApp, 500));


// ==========================================================================
// 7. SCROLL ANIMATIONS (GSAP)
// ==========================================================================

function initScrollAnimations() {

  // 7.1 Scroll Progress Bar (Native approach, decoupled from GSAP for speed)
  const progressBar = document.getElementById('scrollProgress');
  const navbar = document.getElementById('navbar');

  lenis.on('scroll', (e) => {
    // Progress Bar Update
    const progress = e.progress; // 0 to 1
    progressBar.style.transform = `scaleX(${progress})`;

    // Smart Navigation Auto-Hide
    const currentScrollY = e.animatedScroll;
    const velocity = e.velocity;

    // Apply header background if we scrolled even a little
    if (currentScrollY > 50) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }

    // Hide navbar when scrolling down (positive velocity), show when scrolling up
    // Only engage hiding logic if we are safely past the top
    if (currentScrollY > window.innerHeight * 0.5) {
      if (velocity > 2 && !menuOpen) {
        navbar.classList.add('nav-hidden');
      } else if (velocity < -2) {
        navbar.classList.remove('nav-hidden');
      }
    } else {
      navbar.classList.remove('nav-hidden'); // Always show at the top
    }
  });

  // 7.3 General Reveals (.reveal-up, .reveal-scale)
  gsap.utils.toArray('.reveal-up').forEach(elem => {
    gsap.to(elem, {
      scrollTrigger: {
        trigger: elem,
        start: 'top 85%',
      },
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'expo.out'
    });
  });

  gsap.utils.toArray('.reveal-scale').forEach(elem => {
    gsap.to(elem, {
      scrollTrigger: {
        trigger: elem,
        start: 'top 85%',
      },
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: 'expo.out'
    });
  });

  // 7.4 Number Counters
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

  // 7.5 Horizontal Scroll Story
  if (!state.isMobile) {
    const track = document.getElementById('hScrollTrack');
    const panels = gsap.utils.toArray('.h-panel');
    const walkDistance = () => track.scrollWidth - window.innerWidth;

    gsap.to(panels, {
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

  // 7.6 Staggered Services
  ScrollTrigger.create({
    trigger: '.services',
    start: 'top 60%',
    onEnter: () => {
      gsap.to('.GSAP-service', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: 'expo.out'
      });
    }
  });

  // 7.7 Gallery Parallax (Desktop only)
  if (!state.isTouch) {
    gsap.utils.toArray('.gallery-item').forEach((item, i) => {
      // Alternate columns up/down
      const dir = (i % 2 === 0) ? -50 : 50;
      gsap.to(item, {
        y: dir,
        scrollTrigger: {
          trigger: '.gallery',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5
        }
      });
    });
  }
}

// ==========================================================================
// 8. UI INTERACTIONS
// ==========================================================================

// --- Intersection Observer for Active Nav Links ---
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


// --- Mobile Menu Toggle ---
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


// --- Smooth Anchors ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      if (menuOpen) hamburger.click(); // Close mobile menu if open
      lenis.scrollTo(target, { offset: -90, duration: 1.5 });
    }
  });
});


// --- Services Tabs ---
const tabs = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.tab-panel');
const indicator = document.getElementById('tabIndicator');

function moveIndicator(btn) {
  indicator.style.width = `${btn.offsetWidth}px`;
  indicator.style.left = `${btn.offsetLeft}px`;
}

if (tabs.length) {
  // Move to first active instantly
  setTimeout(() => moveIndicator(document.querySelector('.tab-btn.active')), 100);

  window.addEventListener('resize', () => moveIndicator(document.querySelector('.tab-btn.active')));

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active states
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      // Setup current
      tab.classList.add('active');
      moveIndicator(tab);
      const targetPanel = document.getElementById(`tab-${tab.dataset.tab}`);
      targetPanel.classList.add('active');

      // Stagger animate inner cards of the new panel
      const cards = targetPanel.querySelectorAll('.GSAP-service');
      gsap.fromTo(cards,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'expo.out' }
      );
    });
  });
}


// --- Lightbox Logic ---
const galleryGrid = document.getElementById('galleryGrid');
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lightboxImg');
let currentLbIndex = 0;

if (galleryGrid) {
  galleryGrid.addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-item');
    if (!item) return;

    currentLbIndex = parseInt(item.getAttribute('data-lb-idx'), 10);
    openLightbox();
  });
}

function openLightbox() {
  lbImg.src = db.gallery[currentLbIndex].src;
  lbImg.alt = db.gallery[currentLbIndex].alt;
  lightbox.hidden = false;
  lenis.stop();
}

function closeLightbox() {
  lightbox.hidden = true;
  lenis.start();
}

document.getElementById('lightboxClose')?.addEventListener('click', closeLightbox);
document.getElementById('lightboxPrev')?.addEventListener('click', () => {
  currentLbIndex = (currentLbIndex - 1 + db.gallery.length) % db.gallery.length;
  lbImg.src = db.gallery[currentLbIndex].src;
});
document.getElementById('lightboxNext')?.addEventListener('click', () => {
  currentLbIndex = (currentLbIndex + 1) % db.gallery.length;
  lbImg.src = db.gallery[currentLbIndex].src;
});


// --- Booking Modal State ---
const modal = document.getElementById('bookingModal');
const ctas = [document.getElementById('navCta'), document.getElementById('heroCta'), document.getElementById('mobileNavCta'), document.getElementById('contactCta')];

ctas.forEach(cta => cta?.addEventListener('click', () => {
  if (menuOpen) hamburger.click();
  modal.hidden = false;
  lenis.stop(); // Lock background scroll
}));

function closeModal() {
  modal.hidden = true;
  lenis.start();
}

document.getElementById('modalClose')?.addEventListener('click', closeModal);
document.getElementById('modalBackdrop')?.addEventListener('click', closeModal);

// Escape Key Handler for all Overlays
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (!modal.hidden) closeModal();
    if (!lightbox.hidden) closeLightbox();
    if (menuOpen) hamburger.click();
  }
});


// --- Fake Form Submission ---
const form = document.getElementById('bookingForm');
const submitBtn = document.getElementById('submitBtn');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Simulate API Call
    submitBtn.classList.add('is-loading');

    setTimeout(() => {
      submitBtn.classList.remove('is-loading');
      submitBtn.classList.add('is-success');

      setTimeout(() => {
        closeModal();
        submitBtn.classList.remove('is-success');
        form.reset();
      }, 2000);

    }, 1500);
  });
}

// Hover Effect global for cards (.service-card) tilt is optional and handled inside GSAP if needed, 
// but pure CSS hover + shadow provides the most performant "luxury" feel for now.
