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
  syncTouch: false, // Set to false to allow native mobile pull-to-refresh
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
    { src: '484045637_18287030734221930_8028563917294764098_n.jpg', alt: 'Portofoliu Rubens 1' },
    { src: '485978470_3493603700779871_6599285106189743720_n.jpg', alt: 'Portofoliu Rubens 2' },
    { src: '496439457_18292774384221930_1236916832516708478_n (1).jpg', alt: 'Portofoliu Rubens 3' },
    { src: '625052193_18323419519221930_338710635935787015_n.jpg', alt: 'Portofoliu Rubens 4' },
    { src: '625295181_18324395506221930_9185861626799876223_n.jpg', alt: 'Portofoliu Rubens 5' }
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

  const createCategory = (title, items, isOpen = false) => `
    <div class="service-category ${isOpen ? 'is-open' : ''}">
      <h3 class="category-title" role="button" tabindex="0">
        ${title} <i class="ph ph-caret-down"></i>
      </h3>
      <div class="category-content">
        <div class="category-content-inner">
          ${items.map(createRow).join('')}
        </div>
      </div>
    </div>
  `;

  // First category open by default
  container.innerHTML = 
    createCategory('Tunsori', db.services.tunsori, true) + 
    createCategory('Barbă', db.services.barba) + 
    createCategory('Combo', db.services.combo);

  // Attach Toggle Listeners
  container.querySelectorAll('.category-title').forEach(titleBtn => {
    titleBtn.addEventListener('click', () => {
      const parent = titleBtn.closest('.service-category');
      parent.classList.toggle('is-open');
    });
  });
}

function renderGallery() {
  const container = document.getElementById('galleryAccordion'); // keeping id for now to avoid html edit overhead, changing semantics in css
  if (!container) return;

  container.innerHTML = db.gallery.map((img, i) => `
    <div class="portfolio-item" tabindex="0" role="button">
      <img src="${img.src}" alt="${img.alt}" loading="lazy" class="portfolio-img">
    </div>
  `).join('');

  const items = container.querySelectorAll('.portfolio-item');
  items.forEach(item => {
    item.addEventListener('click', () => {
      // If clicking already open, just close it
      if (item.classList.contains('active')) {
        item.classList.remove('active');
        return;
      }
      
      // Close all others
      items.forEach(s => s.classList.remove('active'));
      // Open this
      item.classList.add('active');
    });
  });
}

function renderTestimonials() {
  const track = document.getElementById('testimonialsTrack');
  const dotsContainer = document.getElementById('testimonialsDots');
  if (!track || !dotsContainer) return;

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

  dotsContainer.innerHTML = db.testimonials.map((_, i) => `<button class="dot ${i === 0 ? 'active' : ''}" aria-label="Testimonial ${i + 1}" data-idx="${i}"></button>`).join('');
}

// Call renders
renderServices();
renderGallery();
renderTestimonials();

// Set up Footer year
document.getElementById('footerYear').textContent = new Date().getFullYear();

// ==========================================================================
// TESTIMONIALS – Drag scroll + Dot Sync
// ==========================================================================
(function initTestimonialsCarousel() {
  const wrap = document.querySelector('.testimonials-track-wrap');
  const track = document.getElementById('testimonialsTrack');
  const dotsContainer = document.getElementById('testimonialsDots');
  if (!wrap || !track || !dotsContainer) return;

  // --- Dot click: scroll to card ---
  dotsContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.dot');
    if (!btn) return;
    const idx = parseInt(btn.getAttribute('data-idx'), 10);
    const cards = track.querySelectorAll('.testimonial-card');
    if (cards[idx]) {
      cards[idx].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  });

  // --- Active dot tracking via IntersectionObserver ---
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

  // --- Desktop drag-to-scroll ---
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
        vy: (Math.random() - 0.8) * 0.3, // Mostly drift upwards
        alpha: Math.random() * 0.5 + 0.1
      });
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach(p => {
      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges cinematically
      if (p.x < -10) p.x = this.canvas.width + 10;
      if (p.x > this.canvas.width + 10) p.x = -10;
      if (p.y < -10) {
        p.y = this.canvas.height + 10;
        p.x = Math.random() * this.canvas.width;
      }

      // Draw dust mote
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

  // Custom SplitText Alternative logic (wrapping words in spans)
  document.querySelectorAll('[data-split]').forEach(el => {
    const words = el.innerText.split(' ');
    el.innerHTML = words.map(w => `<span class="split-word" style="display:inline-block; clip-path:inset(0 0 100% 0); transform:translateY(100%);"> ${w} </span>`).join('');
  });

  const tlLoader = gsap.timeline();

  // Loader sequence
  tlLoader.to('.loader-logo', { opacity: 1, duration: 0.8, ease: 'power2.out' })
    .to('.loader-tagline', { opacity: 1, duration: 0.8, ease: 'power2.out' }, "-=0.4")
    .to('.loader-bar-wrap', { opacity: 1, duration: 0.3 }, "-=0.6")
    .to('.loader-bar', { x: '0%', duration: 1.0, ease: 'power3.inOut' }, "-=0.6")
    .to('.loader-inner', { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' }, "+=0.2")
    // Reveal Curtain
    .to('#loaderCurtain', {
      scaleY: 0,
      transformOrigin: 'top',
      duration: 1.0,
      ease: 'expo.inOut'
    })
    .call(() => {
      document.getElementById('loader').style.display = 'none';
      state.isLoading = false;
      initScrollAnimations();
    })
    // Hero Image Premium Reveal & Scale (Ken Burns)
    .fromTo('.hero-img',
      { opacity: 0, scale: 1.15 },
      { opacity: 1, scale: 1, duration: 4, ease: 'power2.out' },
      "-=1.0"
    )
    // Hero Text Entrances
    .fromTo('.hero-line', {
      clipPath: 'inset(0 0 100% 0)',
      y: 20
    }, {
      clipPath: 'inset(0 0 0% 0)',
      y: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: 'expo.out'
    }, "-=2.5")
    .to('.hero-actions', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, "-=2.4")
    .to('.hero-scroll-hint', { opacity: 1, duration: 1, ease: 'power2.out' }, "-=2.2");
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

  // 7.5 Horizontal Scroll & Parallax - Desktop Only
  let mm = gsap.matchMedia();

  mm.add("(min-width: 1025px)", () => {
    // Horizontal Story
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

    // Gallery Parallax removed for Accordion layout
  });

  // GSAP service stagger removed for pure CSS accordion dropdowns

  // 7.7 About Badge Reveal
  ScrollTrigger.create({
    trigger: '.about-img-wrap',
    start: 'top 75%',
    once: true,
    onEnter: () => {
      gsap.to('.about-img-badge', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'expo.out',
        delay: 0.3
      });
    }
  });

  // 7.8 Floating badge float loop
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


  // Tabs and Lightbox logic removed as requested styling was simplified




// Hover Effect global for cards (.service-card) tilt is optional and handled inside GSAP if needed, 
// but pure CSS hover + shadow provides the most performant "luxury" feel for now.
