/**
 * ============================================================
 *  CLIENT CONFIGURATION — Ruben's Barbershop
 * ============================================================
 *  To launch this site for a NEW barbershop:
 *  1. Copy this entire folder and rename it (e.g. "alex-barbershop")
 *  2. Replace logo.jpg, interior.jpg, ruben.jpg, og-image.jpg
 *     and the gallery photos with the new client's images.
 *  3. Edit ONLY this file — name, contact, hours, services,
 *     gallery, testimonials, social links, and booking URL.
 *  4. Done. No other file needs to be touched.
 * ============================================================
 */

const CLIENT = {

  // ----------------------------------------------------------
  // IDENTITY
  // ----------------------------------------------------------
  name:         "Ruben's Barbershop",
  shortName:    "Ruben's",
  tagline:      "Frizerie · Cluj-Napoca",
  footerTagline:"Atmosferă relaxată și tunsori impecabile, în inima Clujului.",
  lang:         "ro",

  // SEO meta description
  metaDescription: "Ruben's Barbershop – frizerie premium în Cluj-Napoca. Tunsori bărbătești, beard grooming și servicii de îngrijire de lux. Rezervă-ți locul acum.",

  // ----------------------------------------------------------
  // URLS & BOOKING
  // ----------------------------------------------------------
  siteUrl:          "https://aer-flow.github.io/Rubens/",
  canonicalUrl:     "https://aer-flow.github.io/Rubens/",
  bookingUrl:       "https://mero.ro/p/rubens-barbershop",
  bookingWidgetId:  "rubens-barbershop",   // Mero widget ID
  bookingLabel:     "Programează-te",      // CTA button text

  // ----------------------------------------------------------
  // ASSETS (relative paths from the project root)
  // ----------------------------------------------------------
  logo:       "logo.jpg",
  heroImage:  "interior.jpg",
  aboutImage: "ruben.jpg",   // The portrait in the "Bun Venit" section
  aboutAlt:   "Ruben, maestrul frizer din Cluj-Napoca",
  ogImage:    "og-image.jpg",

  // Hero section titles
  heroLine1:  "Ruben's",      // Accent (gold) line
  heroLine2:  "Barbershop.",  // Main line

  // About "Bun Venit" section
  aboutPreTitle:  "Salutare!",
  aboutTitle:     "Bun venit la",
  aboutTitleEm:   "Ruben's.",  // Italic highlighted part
  aboutPullQuote: "„Un frizer bun nu doar te tunde, ci <em>te ascultă.</em>"",
  aboutParagraph1: "Ruben's Barbershop este locul din Cluj-Napoca unde venim să ne deconectăm. Aici, o programare nu e doar o sarcină pe lista de zi cu zi, ci un moment de pauză, cu o cafea bună, discuții relaxate și, evident, o tunsoare impecabilă.",
  aboutParagraph2: "Te așteptăm într-un spațiu prietenos unde punem preț pe tehnică, detalii și pe ceea ce ți se potrivește cel mai bine. Fără grabă, doar pasiune pentru meserie.",

  // Badge on the about photo
  badgeYears:     7,
  badgeLabel:     "Ani de Experiență",

  // ----------------------------------------------------------
  // CONTACT
  // ----------------------------------------------------------
  phone:        "+40741234567",
  phoneDisplay: "+40 741 234 567",
  email:        "contact@rubensbarbershop.ro",
  address: {
    street:   "Strada Eroilor 14",
    city:     "Cluj-Napoca",
    zip:      "400129",
    country:  "RO",
    // Google Maps embed URL — replace with the correct embed for the new client
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2732.9!2d23.6236!3d46.7712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47490c1f6d24f035%3A0x6ce9c0a83d17cc6c!2sCluj-Napoca!5e0!3m2!1sro!2sro!4v1709900000000",
  },
  hours: [
    { days: "Lun – Vin", time: "09:00 – 20:00" },
    { days: "Sâmbătă",   time: "09:00 – 18:00" },
    { days: "Duminică",  time: "Închis"         },
  ],
  // Schema.org geo coordinates
  geo: { lat: 46.7712, lng: 23.6236 },

  // ----------------------------------------------------------
  // SOCIAL MEDIA
  // ----------------------------------------------------------
  social: {
    instagram: "https://instagram.com/rubensbarbershop",
    facebook:  "https://facebook.com/rubensbarbershop",
    tiktok:    "https://tiktok.com/@rubensbarbershop",
  },
  instagramHandle: "@rubensbarbershop",

  // ----------------------------------------------------------
  // STATS (About section counters)
  // ----------------------------------------------------------
  stats: [
    { num: 2500, suffix: "+", label: "Clienți Fericiți" },
    { num: 7,    suffix: "+", label: "Ani Experiență"   },
    { num: 15,   suffix: "+", label: "Servicii Oferite" },
  ],

  // Stats strip (full-width section below gallery)
  statsBig: [
    { num: 2500, suffix: "+",  label: "Clienți Mulțumiți" },
    { num: 7,    suffix: "+",  label: "Ani Experiență"    },
    { num: 98,   suffix: "%",  label: "Satisfacție"       },
    { num: 15,   suffix: "+",  label: "Premii Locale"     },
  ],

  // ----------------------------------------------------------
  // MARQUEE (scrolling ticker strip)
  // ----------------------------------------------------------
  marquee: [
    "Tunsoare Clasică",
    "Beard Grooming",
    "Fade Premium",
    "Hair Design",
    "Bărbierit Tradițional",
    "Skin Fade",
  ],

  // ----------------------------------------------------------
  // SERVICES
  // ----------------------------------------------------------
  services: {
    // Each category: { label, items: [{id, name, price, time, desc}] }
    categories: [
      {
        label: "Tunsori",
        items: [
          { id: "t1", name: "Tunsoare Clasică",    price: "90 LEI",  time: "45 min",   desc: "Consultare, spălat, tuns din foarfecă/mașină, styling cu produse premium." },
          { id: "t2", name: "Skin Fade",            price: "100 LEI", time: "50 min",   desc: "Pierdere la 0, fade impecabil executat cu shaver sau brici." },
          { id: "t3", name: "Tuns din Foarfecă",   price: "110 LEI", time: "60 min",   desc: "Pentru păr mediu și lung. Construcție de formă exclusiv din foarfecă." },
          { id: "t4", name: "Buzz Cut",             price: "60 LEI",  time: "30 min",   desc: "Tuns scurt, uniform, executat la mașină, cu spălat și styling rapid." },
        ],
      },
      {
        label: "Barbă",
        items: [
          { id: "b1", name: "Beard Grooming Standard", price: "60 LEI", time: "30 min", desc: "Contur asimetric, scurtat, ulei de barbă premium." },
          { id: "b2", name: "Hot Towel Shave (Ritual)", price: "80 LEI", time: "40 min", desc: "Ritual traditional cu prosop fierbinte, cremă de ras The Bluebeards, brici." },
          { id: "b3", name: "Contur cu Briciul",       price: "40 LEI", time: "20 min", desc: "Curățare extremă a liniilor bărbii pe pomeți și gât." },
        ],
      },
      {
        label: "Combo",
        items: [
          { id: "c1", name: "Exclusiv: Păr & Barbă",     price: "140 LEI", time: "1h 15m", desc: "Pachetul nostru semnătură. Include spălat, tuns, beard grooming standard." },
          { id: "c2", name: "Royal Păr & Hot Towel",      price: "160 LEI", time: "1h 30m", desc: "Experiența completă: Tunsoare clasică + Ritualul bărbieritului cu prosop fierbinte." },
        ],
      },
    ],
  },

  // ----------------------------------------------------------
  // GALLERY (filenames, relative to project root)
  // ----------------------------------------------------------
  gallery: [
    { src: "484045637_18287030734221930_8028563917294764098_n.jpg",        alt: "Portofoliu Rubens 1" },
    { src: "485978470_3493603700779871_6599285106189743720_n.jpg",         alt: "Portofoliu Rubens 2" },
    { src: "496439457_18292774384221930_1236916832516708478_n (1).jpg",    alt: "Portofoliu Rubens 3" },
    { src: "625052193_18323419519221930_338710635935787015_n.jpg",         alt: "Portofoliu Rubens 4" },
    { src: "625295181_18324395506221930_9185861626799876223_n.jpg",        alt: "Portofoliu Rubens 5" },
  ],

  // ----------------------------------------------------------
  // TESTIMONIALS
  // ----------------------------------------------------------
  testimonials: [
    { name: "Andrei Popa",   initial: "A", text: "Singurul loc din Cluj unde mă pot relaxa cu adevărat. Tunsorile sunt mereu impecabile, iar atmosfera este de nota 10." },
    { name: "Mihai Dan",     initial: "M", text: "Atenția la detalii a lui Ruben este incredibilă. Au trecut ani de când vin aici și calitatea nu a scăzut niciodată." },
    { name: "Cristian I.",   initial: "C", text: "Hot Towel Shave-ul este o experiență pe care orice bărbat ar trebui să o încerce măcar o dată." },
    { name: "Alexandru N.",  initial: "A", text: "Prietenos, profesionist și curat. Cel mai bun fade pe care l-am primit în România." },
  ],

};
