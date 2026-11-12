import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

const SITE = {
  name: "Szakács Vendel",
  role: { hu: "Fotós és Videós", en: "Photographer & Videographer" },
  tagline: {
    hu: "Budapesten fotózom és forgatok — portrékat, autókat, motorokat és azokat a pillanatokat, amelyekhez jó később visszatérni.",
    en: "I photograph and film in Budapest — portraits, cars, bikes and the moments you'll want to come back to."
  },
  seoDescription: {
    hu: "Szakács Vendel fotós és videós Budapesten. Portré-, családi, csapat-, autó- és eseményfotózás. Nézd meg a portfóliót, és kérj ajánlatot!",
    en: "Szakács Vendel is a Budapest-based photographer and videographer specializing in portraits, family and team photography, vehicles and events."
  },
  location: { hu: "Budapest, Magyarország", en: "Based in Budapest, Hungary" },
  heroImage: "/images/vendel.avif",
  email: "vendelsz08@gmail.com",
  phone: "+36 20 512 0212",
  formAction: "",
  socials: [
    { label: "Instagram", url: "https://instagram.com/vendel.media/" },
    { label: "TikTok", url: "https://tiktok.com/@yourhandle" }
  ],
  about: {
    photo: "/images/aboutme.avif",
    title: { hu: "Rólam", en: "About me" },
    paragraphs: [
      {
        hu: "Négy éve foglalkozom fotózással és videózással. Szeretem, ha egy kép nemcsak megmutatja, mi történt, hanem visszaad valamit abból is, milyen volt ott lenni.",
        en: "I've been working in photography and video for four years. I want an image to do more than show what happened; it should bring back something of what it felt like to be there."
      },
      {
        hu: "A közös munka előtt egyeztetjük, mire van szükséged és milyen hangulatot keresel.",
        en: "Before we start, we'll talk through what you need and the kind of feel you're after."
      }
    ],
    services: [
      { hu: "Fotózás", en: "Photography" },
      { hu: "Videó", en: "Video" },
      { hu: "Fotó + videó csomagok", en: "Photo + video packages" }
    ]
  },
  priceNote: {
    hu: "Az árak kiindulási díjak, és tartalmazzák az utómunkát. A Budapesten kívüli utazás külön díjas. A képek digitálisan érkeznek; az átadás általában 1–2 nap (a munka terjedelmétől függ). A fotózás időtartamát, az átadott képek vagy videók mennyiségét és a felhasználási feltételeket foglalás előtt egyeztetjük.",
    en: "Prices are starting rates and include editing. Travel outside Budapest is charged separately. Images are delivered digitally, usually within 1–2 days depending on the scope. Shoot duration, the number of delivered images or videos, and usage terms are agreed before booking."
  }
};

const categoryImages = (folder, filenames) =>
  [...filenames]
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map(filename => ({ src: `/categories/${folder}/${filename}` }));

const CATEGORIES = [
  {
    id: "portrait",
    name: { hu: "Portrék", en: "Portraits" },
    blurb: {
      hu: "Kötetlen portré képeim, egyedi stílusokban.",
      en: "My candid portraits, each with a distinct style."
    },
    thumbnail: "/categories/portraits/SZV_0434.avif",
    items: categoryImages("portraits", [
      "SZV_0433.avif",
      "SZV_0434.avif",
      "SZV_0443.avif",
      "SZV_0464.avif",
      "SZV_0476.avif",
      "SZV_0483.avif",
      "SZV_0484.avif",
      "SZV_2047.avif",
      "SZV_2052.avif",
      "SZV_2054.avif",
      "SZV_2056.avif",
      "SZV_2073.avif",
      "SZV_2086.avif",
      "SZV_2092.avif",
      "SZV_2093.avif"
    ])
  },
  {
    id: "car-motorbike",
    name: { hu: "Járművek", en: "Vehicles" },
    blurb: {
      hu: "Forma, részletek, hangulat - autókról és motorokról, akár eladáshoz, akár csak felvágni.",
      en: "Shape, detail and character - cars and bikes, whether for a sale or simply because it is cool."
    },
    thumbnail: "/categories/vehicles/SZV_0578.avif",
    items: categoryImages("vehicles", [
      "SZV_0387-Enhanced-NR.avif",
      "SZV_0392-Enhanced-NR.avif",
      "SZV_0395-Enhanced-NR.avif",
      "SZV_0399-Enhanced-NR.avif",
      "SZV_0551.avif",
      "SZV_0553.avif",
      "SZV_0558.avif",
      "SZV_0560.avif",
      "SZV_0563.avif",
      "SZV_0566.avif",
      "SZV_0568.avif",
      "SZV_0573.avif",
      "SZV_0574.avif",
      "SZV_0577.avif",
      "SZV_0578.avif",
      "SZV_0615.avif",
      "SZV_0619.avif",
      "SZV_0621.avif",
      "SZV_0627.avif"
    ])
  },
  {
    id: "event",
    name: { hu: "Események", en: "Events" },
    blurb: {
      hu: "Események fotózása - a nagy pillanatokkal és azokkal az apró részletekkel, amelyek miatt emlékezetesek.",
      en: "Photography of events - the big moments and the small details that make them worth remembering."
    },
    thumbnail: "/categories/events/SZV_0052.avif",
    items: categoryImages("events", [
      "SZV_0034.avif",
      "SZV_0040.avif",
      "SZV_0046.avif",
      "SZV_0052.avif",
      "SZV_0055.avif",
      "SZV_0060.avif"
    ])
  }
];

const PRICING_OPTIONS = [
  {
    id: "portrait-photography",
    categoryId: "portrait",
    name: { hu: "Portréfotózás", en: "Portrait photography" },
    price: "8 000 HUF",
    description: {
      hu: "Stílusos személyreszabott portréfotózás.",
      en: "Stylish, personalized portrait photography."
    },
    details: {
      hu: ["Igényeidhez igazított fotózás", "Kötetlen pózok, természetes beállítások", "Válogatott képek gondos utómunkával", "Digitális kézbesítés"],
      en: ["A shoot tailored to your needs", "Relaxed poses and natural direction", "Selected images carefully edited", "Digital delivery"]
    }
  },
  {
    id: "family-photography",
    categoryId: "family",
    name: { hu: "Családi fotózás", en: "Family photography" },
    price: "5 000 HUF",
    description: {
      hu: "Közös családi pillanatok természetes, személyre szabott megörökítése.",
      en: "Natural, personalized photography to capture special family moments."
    },
    details: {
      hu: ["Közös képek az egész családról", "Természetes, játékos pillanatok", "A helyszínhez igazított fotózás", "Válogatott, utómunkázott digitális képek"],
      en: ["Group portraits of the whole family", "Natural, playful moments", "A shoot planned around your location", "A selection of edited digital images"]
    }
  },
  {
    id: "team-photography",
    categoryId: "team",
    name: { hu: "Csapat/Osztály fotózás", en: "Team/Class photography" },
    price: "10 000 HUF",
    description: {
      hu: "Egységes, professzionális portrék és közös képek egy csapatról vagy osztályról.",
      en: "Consistent, professional portraits and group photos for a team or a class."
    },
    details: {
      hu: ["Egyéni portrék a tagokról", "Közös csoportkép", "Egységes, profi megjelenés", "Utómunkázott digitális képek"],
      en: ["Individual portraits of team members", "A group photo of the whole team", "A consistent, professional look", "Edited digital images"]
    }
  },
  {
    id: "vehicle-photography",
    categoryId: "car-motorbike",
    name: { hu: "Járműfotózás", en: "Vehicle photography" },
    price: "8 000 HUF",
    description: {
      hu: "Részletgazdag fotók az autódról vagy motorodról.",
      en: "Detailed photos of your car or motorcycle."
    },
    details: {
      hu: ["Külső és belső nézetek", "Jellegzetes részletek megörökítése", "A jármű stílusához illő helyszín", "Válogatott, utómunkázott képek"],
      en: ["Exterior and interior views", "Attention to distinctive details", "A location that suits the vehicle", "A selection of edited images"]
    }
  },
  {
    id: "vehicle-videography",
    categoryId: "car-motorbike",
    name: { hu: "Járművideózás", en: "Vehicle videography" },
    price: "10 000 HUF",
    description: {
      hu: "Részletgazdag videó az autódról vagy motorodról.",
      en: "Detailed video of your car or motorcycle."
    },
    details: {
      hu: ["A jármű karakterét kiemelő felvételek", "Külső és részletfelvételek", "Dinamikus, filmes képi világ", "Vágott, digitálisan átadott videó"],
      en: ["Footage highlighting the vehicle's character", "Exterior and detail shots", "Dynamic, cinematic visuals", "Edited video delivered digitally"]
    }
  },
  {
    id: "event-photography",
    categoryId: "event",
    name: { hu: "Eseményfotózás", en: "Event photography" },
    price: "15 000 HUF",
    description: {
      hu: "Az esemény fontos pillanatainak és hangulatának megörökítése.",
      en: "Capturing the key moments and atmosphere of your event."
    },
    details: {
      hu: ["Fontos pillanatok és spontán jelenetek", "A helyszín és a hangulat megörökítése", "Részletfotók az eseményről", "Válogatott, utómunkázott digitális képek"],
      en: ["Key moments and candid scenes", "The venue and atmosphere captured", "Detail photos from the event", "A selection of edited digital images"]
    }
  }
];

const UI = {
  hu: {
    skip: "Ugrás a galériához", navWork: "Galéria", navPricing: "Árak", navAbout: "Rólam", navBook: "Foglalás",
    seeWork: "Galéria megtekintése", viewPrices: "Árak megtekintése", work: "Galéria", pictures: "Kép", categoryPanels: "Kategóriák megtekintése",
    backToCategories: "← Vissza a kategóriákhoz", openCategory: name => `${name} kategória megnyitása`,
    pricing: "Árak", showPrices: "Árak megjelenítése", aboutPhoto: "A fotós portréja", contactTitle: "Foglalás",
    contactLead: "Portré, autó, motor vagy egy közelgő esemény? Írd meg, hol és mikor fotózzunk, és milyen képeket képzeltél el. Egy munkanapon belül válaszolok.",
    yourName: "Neved", yourEmail: "E-mail címed", whatNeed: "Mire van szükséged?", preferredDate: "Preferált dátum",
    familyPhotography: "Családi fotózás", teamPhotography: "Csapatfotózás",
    message: "Üzenet", messagePh: "Írd meg pár mondatban a helyszínt, az időpontot és az elképzelésedet.",
    send: "Ajánlatkérés küldése", viewer: "Megtekintő", close: "Bezárás", previous: "Előző", next: "Következő",
    zoomIn: "Nagyítás", zoomOut: "Kicsinyítés", resetZoom: "Eredeti méret",
    empty: "Ebben a galériában még nincs kép.", request: "Ezt a csomagot kérem", other: "Valami más",
    bookMsg: (pkg, cat, price) => `Szia, a(z) „${pkg}” csomagot szeretném foglalni ehhez: ${cat} (${price}). `,
    enquiry: (type, name) => `Fotózás iránti érdeklődés: ${type} (${name})`,
    mailName: "Név", mailEmail: "E-mail", mailType: "Típus", mailDate: "Preferált dátum", notDecided: "még nincs eldöntve",
    formStatus: "Megnyitom az e-mail alkalmazásod. Ha nem nyílik meg, használd az alábbi e-mail linket.",
    formEmailLink: email => `E-mail küldése: ${email}`,
    heroPh: "Címlapfotó", portraitPh: "portré", videoPh: "videó", photoPh: "fotó",
    openItem: title => `Megnyitás: ${title}`, mostBooked: "Legnépszerűbb", lang: "Nyelv",
    lightMode: "Világos mód", darkMode: "Sötét mód", theme: "Megjelenés",
    darkModeOption: "SÖTÉT", lightModeOption: "VILÁGOS"
  },
  en: {
    skip: "Skip to gallery", navWork: "Gallery", navPricing: "Pricing", navAbout: "About", navBook: "Book a shoot",
    seeWork: "View the gallery", viewPrices: "View prices", work: "Gallery", pictures: "Pictures", categoryPanels: "Browse categories",
    backToCategories: "← Back to categories", openCategory: name => `Open ${name} category`,
    pricing: "Pricing", showPrices: "Show prices for", aboutPhoto: "Portrait of the photographer", contactTitle: "Book a shoot",
    contactLead: "A portrait, a car, a bike or an upcoming event? Tell me where and when, and what kind of images you have in mind. I'll reply within one working day.",
    yourName: "Your name", yourEmail: "Your email", whatNeed: "What do you need?", preferredDate: "Preferred date",
    familyPhotography: "Family photography", teamPhotography: "Team photography",
    message: "Message", messagePh: "A few details about the place, timing and what you have in mind.",
    send: "Send enquiry", viewer: "Viewer", close: "Close", previous: "Previous", next: "Next",
    zoomIn: "Zoom in", zoomOut: "Zoom out", resetZoom: "Reset zoom",
    empty: "No images in this gallery yet.", request: "Request this package", other: "Something else",
    bookMsg: (pkg, cat, price) => `Hi, I'd like to book the "${pkg}" package for ${cat} (${price}). `,
    enquiry: (type, name) => `Shoot enquiry: ${type} (${name})`,
    mailName: "Name", mailEmail: "Email", mailType: "Shoot type", mailDate: "Preferred date", notDecided: "not decided",
    formStatus: "Your email app should open with your enquiry. If it doesn't, use the email link below.",
    formEmailLink: email => `Email ${email}`,
    heroPh: "starterphoto", portraitPh: "portrait", videoPh: "video", photoPh: "photo",
    openItem: title => `Open ${title}`, mostBooked: "Most booked", lang: "Language",
    lightMode: "Light mode", darkMode: "Dark mode", theme: "Theme",
    darkModeOption: "DARK", lightModeOption: "LIGHT"
  }
};

const pick = (value, lang) =>
  value && typeof value === "object" ? value[lang] || value.hu || value.en || "" : value || "";

function placeholder(label, ratio = "4/5") {
  const [width, height] = ratio.split("/").map(Number);
  const W = 800;
  const H = Math.round(W * (height / width));
  const cx = W / 2;
  const cy = H / 2 - 22;
  const text = String(label).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;"
  })[char]);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c9cec8"/><stop offset="1" stop-color="#b8c0b8"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/><g fill="none" stroke="#69776c" stroke-width="4" stroke-linejoin="round" stroke-linecap="round" transform="translate(${cx - 40},${cy - 34})"><path d="M12 14h12l6-10h20l6 10h12a8 8 0 0 1 8 8v36a8 8 0 0 1-8 8H12a8 8 0 0 1-8-8V22a8 8 0 0 1 8-8z"/><circle cx="40" cy="40" r="14"/></g><text x="${cx}" y="${cy + 78}" text-anchor="middle" font-family="sans-serif" font-size="26" fill="#59675e">${text}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function SafeImage({ src, alt, label, ratio, onLoad, ...props }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src, label, ratio]);
  return (
    <img
      src={failed ? placeholder(label, ratio) : src}
      alt={alt}
      onError={() => setFailed(true)}
      onLoad={event => { if (!failed && onLoad) onLoad(event); }}
      {...props}
    />
  );
}

function matchImageRatio(event) {
  const image = event.currentTarget;
  if (image.naturalWidth && image.naturalHeight) {
    image.parentElement.style.aspectRatio = `${image.naturalWidth} / ${image.naturalHeight}`;
  }
}

function updateGalleryTileSpan(image) {
  if (!image.naturalWidth || !image.naturalHeight) return;
  const tile = image.closest(".tile");
  if (!tile) return;
  const rowHeight = 1;
  const gap = 12;
  const imageHeight = tile.clientWidth * image.naturalHeight / image.naturalWidth;
  tile.style.gridRowEnd = `span ${Math.ceil((imageHeight + gap) / rowHeight)}`;
}

function videoEmbed(item, lang) {
  if (!item.video) return null;
  const title = pick(item.title, lang) || "Video";
  const youtube = String(item.video).match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/)?.[1];
  const vimeo = String(item.video).match(/vimeo\.com\/(?:video\/)?(\d+)/)?.[1];
  if (youtube) return { type: "iframe", src: `https://www.youtube-nocookie.com/embed/${youtube}?autoplay=1&rel=0`, title };
  if (vimeo) return { type: "iframe", src: `https://player.vimeo.com/video/${vimeo}?autoplay=1`, title };
  return { type: "video", src: item.video, title };
}

export default function App() {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem("lang");
      return saved === "en" || saved === "hu" ? saved : "hu";
    } catch {
      return "hu";
    }
  });
  const [theme, setTheme] = useState("dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [workCat, setWorkCat] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [zoomScale, setZoomScale] = useState(1);
  const [imageOffset, setImageOffset] = useState({ x: 0, y: 0 });
  const [imageDimensions, setImageDimensions] = useState(null);
  const [formStatus, setFormStatus] = useState("");
  const [formEmailLink, setFormEmailLink] = useState("");
  const [selectedType, setSelectedType] = useState(CATEGORIES[0]?.id || "other");
  const [message, setMessage] = useState("");
  const closeButton = useRef(null);
  const imageFrame = useRef(null);
  const panStart = useRef(null);
  const imageWasDragged = useRef(false);
  const messageField = useRef(null);
  const previousFocus = useRef(null);
  const t = UI[lang];
  const category = CATEGORIES.find(item => item.id === workCat);
  const gallery = category?.items || [];

  useEffect(() => {
    document.documentElement.lang = lang;
    const title = `${SITE.name} | ${pick(SITE.role, lang)}`;
    const description = pick(SITE.seoDescription, lang);
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", description);
    try {
      localStorage.setItem("lang", lang);
    } catch {
      // The page remains usable when storage is disabled.
    }
  }, [lang]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    if (!workCat) return undefined;
    const grid = document.querySelector(".category-detail .grid");
    if (!grid || typeof ResizeObserver === "undefined") return undefined;
    const observer = new ResizeObserver(entries => {
      entries.forEach(entry => updateGalleryTileSpan(entry.target));
    });
    grid.querySelectorAll(".tile img").forEach(image => observer.observe(image));
    return () => observer.disconnect();
  }, [workCat]);

  useEffect(() => {
    if (lightboxIndex === null) {
      document.body.style.overflow = "";
      previousFocus.current?.focus?.();
      return undefined;
    }
    setZoomScale(1);
    setImageOffset({ x: 0, y: 0 });
    setImageDimensions(null);
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKeyDown = event => {
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowLeft") setLightboxIndex(index => (index - 1 + gallery.length) % gallery.length);
      if (event.key === "ArrowRight") setLightboxIndex(index => (index + 1) % gallery.length);
      if (event.key === "+" || event.key === "=") {
        setZoomScale(scale => Math.min(3, scale + 0.5));
        setImageOffset({ x: 0, y: 0 });
      }
      if (event.key === "-") {
        setZoomScale(scale => Math.max(1, scale - 0.5));
        setImageOffset({ x: 0, y: 0 });
      }
      if (event.key === "0") {
        setZoomScale(1);
        setImageOffset({ x: 0, y: 0 });
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxIndex, gallery.length]);

  const openLightbox = index => {
    previousFocus.current = document.activeElement;
    setLightboxIndex(index);
  };

  const requestPackage = (pkg, cat) => {
    setSelectedType(pkg.categoryId);
    const categoryName = cat ? pick(cat.name, lang) : pick(pkg.name, lang);
    setMessage(t.bookMsg(pick(pkg.name, lang), categoryName, pkg.price));
    location.hash = "#contact";
    window.setTimeout(() => {
      messageField.current?.focus();
      const end = messageField.current?.value.length || 0;
      messageField.current?.setSelectionRange(end, end);
    }, 400);
  };

  const submitForm = event => {
    if (SITE.formAction) return;
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const selectedCategory = CATEGORIES.find(item => item.id === data.get("type"));
    const typeName = selectedCategory
      ? pick(selectedCategory.name, lang)
      : data.get("type") === "family"
        ? t.familyPhotography
        : data.get("type") === "team"
          ? t.teamPhotography
          : t.other;
    const subject = t.enquiry(typeName, data.get("name"));
    const body = `${t.mailName}: ${data.get("name")}\n${t.mailEmail}: ${data.get("email")}\n${t.mailType}: ${typeName}\n${t.mailDate}: ${data.get("date") || t.notDecided}\n\n${data.get("message")}`;
    const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setFormStatus(t.formStatus);
    setFormEmailLink(mailto);
    window.location.href = mailto;
  };

  const lightboxItem = lightboxIndex === null ? null : gallery[lightboxIndex];
  const lightboxVideo = lightboxItem ? videoEmbed(lightboxItem, lang) : null;
  const navigatorScale = imageDimensions
    ? Math.min(
      Math.min(144, window.innerWidth * 0.18) / imageDimensions.width,
      (window.innerHeight * 0.2) / imageDimensions.height
    )
    : null;

  return (
    <>
      <a className="skip" href="#work">{t.skip}</a>
      <header className="bar">
        <div className="wrap">
          <a className="logo" href="#top" aria-label={SITE.name} onClick={() => setMobileMenuOpen(false)}>
            <span className="logo-mark" aria-hidden="true" />
            <span className="logo-wordmark">vendel.media</span>
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label={lang === "hu"
              ? (mobileMenuOpen ? "Menü bezárása" : "Menü megnyitása")
              : (mobileMenuOpen ? "Close menu" : "Open menu")}
            aria-expanded={mobileMenuOpen}
            aria-controls="site-menu"
            onClick={() => setMobileMenuOpen(open => !open)}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d={mobileMenuOpen ? "M6 6l12 12M18 6 6 18" : "M4 7h16M4 12h16M4 17h16"} />
            </svg>
          </button>
          <nav id="site-menu" className={`menu${mobileMenuOpen ? " is-open" : ""}`} aria-label={lang === "hu" ? "Főmenü" : "Main"}>
            <a href="#work" onClick={() => setMobileMenuOpen(false)}>{t.navWork}</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>{t.navPricing}</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>{t.navAbout}</a>
            <a className="btn small" href="#contact" onClick={() => setMobileMenuOpen(false)}>{t.navBook}</a>
            <div className="lang" role="group" aria-label={t.lang}>
              {["hu", "en"].map(value => (
                <button key={value} type="button" aria-pressed={lang === value} onClick={() => setLang(value)}>
                  {value.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="lang theme-toggle" role="group" aria-label={t.theme}>
              {["dark", "light"].map(value => (
                <button
                  key={value}
                  type="button"
                  aria-label={value === "dark" ? t.darkMode : t.lightMode}
                  title={value === "dark" ? t.darkMode : t.lightMode}
                  aria-pressed={theme === value}
                  onClick={() => setTheme(value)}
                >
                  {value === "light" ? (
                    <svg aria-hidden="true" viewBox="0 0 16 16">
                      <path d="M8 1.25v1.5M8 13.25v1.5M1.25 8h1.5m10.5 0h1.5M3.23 3.23l1.06 1.06m7.42 7.42 1.06 1.06m0-9.54-1.06 1.06m-7.42 7.42-1.06 1.06" />
                      <circle cx="8" cy="8" r="3" />
                    </svg>
                  ) : (
                    <svg aria-hidden="true" viewBox="0 0 16 16">
                      <path d="M13.55 10.1A6.2 6.2 0 0 1 5.9 2.45 6.3 6.3 0 1 0 13.55 10.1Z" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>

      <main id="top">
        <div className="wrap">
          <section className="hero">
            <div className="hero-text">
              <p className="role">{pick(SITE.role, lang)}</p>
              <h1>{SITE.name}</h1>
              <p className="tagline prose">{pick(SITE.tagline, lang)}</p>
              <div className="cta">
                <a className="btn" href="#work">{t.seeWork}</a>
                <a className="btn ghost" href="#pricing">{t.viewPrices}</a>
              </div>
            </div>
            <figure className="hero-frame">
              <div className="hero-photo">
                <div className="marks" aria-hidden="true"><i className="tl" /><i className="tr" /><i className="bl" /><i className="br" /></div>
                 <SafeImage src={SITE.heroImage} alt="" label={t.heroPh} ratio="2/3" />
              </div>
              <figcaption>{pick(SITE.location, lang)}</figcaption>
            </figure>
          </section>
        </div>

        <section className="wrap section" id="work">
          <div className="sec-head"><h2>{t.work}</h2></div>
          {!category ? (
            <div className="category-panels" aria-label={t.categoryPanels}>
              {CATEGORIES.map(cat => {
                const item = cat.items.find(image => image.src === cat.thumbnail) || cat.items[0];
                const ratio = item.ratio || "4/5";
                return (
                  <button key={cat.id} type="button" className="category-panel" aria-label={t.openCategory(pick(cat.name, lang))} onClick={() => setWorkCat(cat.id)}>
                    <span className="category-cover">
                      <SafeImage src={item.src} alt="" label={pick(cat.name, lang)} ratio={ratio} loading="lazy" onLoad={matchImageRatio} />
                    </span>
                    <span className="category-panel-title">{pick(cat.name, lang)}</span>
                    <span className="category-panel-description">{pick(cat.blurb, lang)}</span>
                    <span className="category-panel-meta">{String(cat.items.length).padStart(2, "0")} {t.pictures.toLowerCase()}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <section className="category-detail">
              <div className="category-heading">
                <button className="gallery-back" type="button" onClick={() => setWorkCat(null)}>{t.backToCategories}</button>
                <h3>{pick(category.name, lang)}</h3>
                <p className="prose">{pick(category.blurb, lang)}</p>
              </div>
              {gallery.length ? (
                <div className="grid">
                  {gallery.map((item, index) => {
                    const title = pick(item.title, lang);
                    const youtubeId = item.video && String(item.video).match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/)?.[1];
                    const thumb = item.thumb || (youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : item.src);
                    return (
                      <button key={`${item.src || item.video}-${index}`} type="button" className="tile" aria-label={t.openItem(title || t.photoPh)} onClick={() => openLightbox(index)}>
                        <SafeImage
                          src={thumb}
                          alt={title}
                          label={item.video ? t.videoPh : t.photoPh}
                          ratio={item.ratio || (item.video ? "16/9" : "4/5")}
                          loading="lazy"
                          onLoad={event => updateGalleryTileSpan(event.currentTarget)}
                        />
                        {item.video && <span className="play" aria-hidden="true" />}
                        {title && <span className="cap"><b>{title}</b></span>}
                      </button>
                    );
                  })}
                </div>
              ) : <p className="empty">{t.empty}</p>}
            </section>
          )}
        </section>

        <section className="wrap section" id="pricing">
          <div className="sec-head">
            <h2>{t.pricing}</h2>
          </div>
          <div className="plans">
            {PRICING_OPTIONS.map(option => {
              const optionCategory = CATEGORIES.find(cat => cat.id === option.categoryId);
              return (
                <article key={option.id} className="plan">
                  <h3>{pick(option.name, lang)}</h3>
                  <p className="price"><b>{option.price}</b></p>
                  <p className="prose">{pick(option.description, lang)}</p>
                  <ul className="plan-details">
                    {pick(option.details, lang).map(detail => <li key={detail}>{detail}</li>)}
                  </ul>
                  <button
                    type="button"
                    className="btn ghost"
                    onClick={() => requestPackage(option, optionCategory)}
                  >
                    {t.request}
                  </button>
                </article>
              );
            })}
          </div>
          <p className="fineprint">{pick(SITE.priceNote, lang)}</p>
        </section>

        <section className="wrap section" id="about">
          <div className="about">
            <figure className="about-photo">
              <div className="marks" aria-hidden="true"><i className="tl" /><i className="tr" /><i className="bl" /><i className="br" /></div>
              <SafeImage src={SITE.about.photo} alt={t.aboutPhoto} label={t.portraitPh} ratio="2/3" />
            </figure>
            <div>
              <h2>{pick(SITE.about.title, lang)}</h2>
              {SITE.about.paragraphs.map((paragraph, index) => <p className="prose" key={index}>{pick(paragraph, lang)}</p>)}
              <ul className="chips">{SITE.about.services.map((service, index) => <li key={index}>{pick(service, lang)}</li>)}</ul>
            </div>
          </div>
        </section>

        <section className="wrap section" id="contact">
          <div className="contact">
            <div>
              <h2>{t.contactTitle}</h2>
              <p className="prose">{t.contactLead}</p>
              <div className="direct">
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                {SITE.phone && <a href={`tel:${SITE.phone.replace(/\s+/g, "")}`}>{SITE.phone}</a>}
                <div className="soc">{SITE.socials.map(social => <a key={social.label} href={social.url} target="_blank" rel="noopener">{social.label}</a>)}</div>
              </div>
            </div>
            <form method="post" action={SITE.formAction || undefined} onSubmit={submitForm}>
              <div className="row">
                <label><span>{t.yourName}</span><input name="name" required autoComplete="name" /></label>
                <label><span>{t.yourEmail}</span><input name="email" type="email" required autoComplete="email" /></label>
              </div>
              <div className="row">
                <label>
                  <span>{t.whatNeed}</span>
                  <select name="type" value={selectedType} onChange={event => setSelectedType(event.target.value)}>
                    {CATEGORIES.map(cat => <option key={cat.id} value={cat.id}>{pick(cat.name, lang)}</option>)}
                    <option value="family">{t.familyPhotography}</option>
                    <option value="team">{t.teamPhotography}</option>
                    <option value="other">{t.other}</option>
                  </select>
                </label>
                <label><span>{t.preferredDate}</span><input name="date" type="date" /></label>
              </div>
              <label><span>{t.message}</span><textarea ref={messageField} name="message" required placeholder={t.messagePh} value={message} onChange={event => setMessage(event.target.value)} /></label>
              <button className="btn" type="submit">{t.send}</button>
              <p className="form-status" role="status">
                {formStatus}
                {formEmailLink && <> <a href={formEmailLink}>{t.formEmailLink(SITE.email)}</a></>}
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <span>© {new Date().getFullYear()} {SITE.name}</span>
          <span>{pick(SITE.location, lang)}</span>
        </div>
      </footer>

      {lightboxItem && (
        <div className="lb" role="dialog" aria-modal="true" aria-label={t.viewer} onClick={event => { if (event.target === event.currentTarget) setLightboxIndex(null); }}>
          <button ref={closeButton} className="lb-btn lb-close" type="button" onClick={() => setLightboxIndex(null)}>{t.close}</button>
          {!lightboxVideo && (
            <div
              className="lb-navigator"
              aria-hidden="true"
              style={navigatorScale ? {
                width: `${imageDimensions.width * navigatorScale}px`,
                height: `${imageDimensions.height * navigatorScale}px`
              } : { width: "72px", height: "90px" }}
            >
              <img
                src={lightboxItem.src}
                alt=""
                onLoad={event => setImageDimensions({
                  width: event.currentTarget.naturalWidth,
                  height: event.currentTarget.naturalHeight
                })}
              />
              <span
                className="lb-navigator-window"
                style={{
                  width: `${100 / zoomScale}%`,
                  height: `${100 / zoomScale}%`,
                  left: `${50 - (imageOffset.x / (imageFrame.current?.clientWidth || 1) / zoomScale) * 100 - 50 / zoomScale}%`,
                  top: `${50 - (imageOffset.y / (imageFrame.current?.clientHeight || 1) / zoomScale) * 100 - 50 / zoomScale}%`
                }}
              />
            </div>
          )}
          <div className="stage">
            {lightboxVideo?.type === "iframe" && <iframe src={lightboxVideo.src} title={lightboxVideo.title} allow="autoplay; encrypted-media; fullscreen" allowFullScreen />}
            {lightboxVideo?.type === "video" && <video src={lightboxVideo.src} controls autoPlay playsInline />}
            {!lightboxVideo && (
              <div
                ref={imageFrame}
                className={`lb-image-frame${zoomScale > 1 ? " is-zoomed" : ""}`}
                onPointerDown={event => {
                  if (zoomScale <= 1) return;
                  event.preventDefault();
                  event.currentTarget.setPointerCapture(event.pointerId);
                  panStart.current = { x: event.clientX, y: event.clientY, offset: imageOffset, moved: false };
                }}
                onPointerMove={event => {
                  if (!panStart.current) return;
                  if (Math.abs(event.clientX - panStart.current.x) > 3 || Math.abs(event.clientY - panStart.current.y) > 3) {
                    panStart.current.moved = true;
                  }
                  const maxX = (event.currentTarget.clientWidth * (zoomScale - 1)) / 2;
                  const maxY = (event.currentTarget.clientHeight * (zoomScale - 1)) / 2;
                  setImageOffset({
                    x: Math.max(-maxX, Math.min(maxX, panStart.current.offset.x + event.clientX - panStart.current.x)),
                    y: Math.max(-maxY, Math.min(maxY, panStart.current.offset.y + event.clientY - panStart.current.y))
                  });
                }}
                onPointerUp={() => {
                  imageWasDragged.current = panStart.current?.moved || false;
                  panStart.current = null;
                }}
                onPointerCancel={() => { panStart.current = null; }}
                onClick={() => {
                  if (imageWasDragged.current) {
                    imageWasDragged.current = false;
                    return;
                  }
                  setZoomScale(scale => scale === 1 ? 2 : 1);
                  setImageOffset({ x: 0, y: 0 });
                }}
              >
                <SafeImage
                  className="lb-image"
                  style={{ transform: `translate(${imageOffset.x}px, ${imageOffset.y}px) scale(${zoomScale})` }}
                  src={lightboxItem.src}
                  alt={pick(lightboxItem.title, lang)}
                  label={t.photoPh}
                  ratio={lightboxItem.ratio || "4/5"}
                />
              </div>
            )}
          </div>
          {!lightboxVideo && (
            <div className="lb-zoom-controls">
              <button className="lb-btn" type="button" aria-label={t.zoomOut} onClick={() => { setZoomScale(scale => Math.max(1, scale - 0.5)); setImageOffset({ x: 0, y: 0 }); }} disabled={zoomScale <= 1}>−</button>
              <button className="lb-btn lb-zoom-reset" type="button" aria-label={t.resetZoom} onClick={() => { setZoomScale(1); setImageOffset({ x: 0, y: 0 }); }}>{Math.round(zoomScale * 100)}%</button>
              <button className="lb-btn" type="button" aria-label={t.zoomIn} onClick={() => { setZoomScale(scale => Math.min(3, scale + 0.5)); setImageOffset({ x: 0, y: 0 }); }} disabled={zoomScale >= 3}>+</button>
            </div>
          )}
          <p className="lb-cap">{pick(lightboxItem.title, lang) && <><b>{pick(lightboxItem.title, lang)}</b> &nbsp;</>}{lightboxIndex + 1} / {gallery.length}</p>
          <button className="lb-btn lb-prev" type="button" aria-label={t.previous} onClick={() => setLightboxIndex(index => (index - 1 + gallery.length) % gallery.length)} />
          <button className="lb-btn lb-next" type="button" aria-label={t.next} onClick={() => setLightboxIndex(index => (index + 1) % gallery.length)} />
        </div>
      )}
    </>
  );
}
