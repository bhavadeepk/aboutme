/**
 * Professional Portfolio — Dynamic Renderer
 * Reads PORTFOLIO_CONFIG (from config.js) and builds the page.
 */

(function () {
  "use strict";

  const cfg = window.PORTFOLIO_CONFIG;
  if (!cfg) {
    console.error("PORTFOLIO_CONFIG not found. Make sure config.js is loaded before script.js.");
    return;
  }

  // ── Helpers ────────────────────────────────────────────────────────────────
  const $ = (sel) => document.querySelector(sel);
  const el = (tag, cls, html) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  };

  const THEME_KEY = "portfolio-theme";

  // Apply a named theme to the document
  function applyTheme(theme) {
    if (theme === "default") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }

  // Apply saved theme immediately (avoid flash)
  applyTheme(localStorage.getItem(THEME_KEY) || "default");

  // SVG icons (inline, zero-dependency)
  const icons = {
    github: `<svg viewBox="0 0 16 16" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
      0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
      -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66
      .07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
      0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12
      0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27
      .68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82
      .44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15
      0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48
      0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8
      c0-4.42-3.58-8-8-8z"/></svg>`,
    linkedin: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037
      -1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046
      c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286z
      M5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063
      1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065z
      M6.82 20.452H3.857V9H6.82v11.452z
      M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451
      C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
    email: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z
      m0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
    location: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z
      m0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`,
    cert: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>`,
    download: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>`,
  };

  // ── Navigation ─────────────────────────────────────────────────────────────
  function buildNav() {
    const nav = $("#nav");
    if (!nav) return;

    const inner = el("div", "nav-inner");

    // Logo
    const nameParts = cfg.name.split(" ");
    const first = nameParts.slice(0, -1).join(" ");
    const last  = nameParts[nameParts.length - 1];
    const logo  = el("div", "nav-logo", `${first} <span>${last}</span>`);

    // Links
    const sections = ["about", "skills", "experience", "education", "certifications"];
    const links = el("ul", "nav-links");
    sections.forEach((id) => {
      const li = el("li");
      const a  = el("a", "", id.charAt(0).toUpperCase() + id.slice(1));
      a.href = `#${id}`;
      li.appendChild(a);
      links.appendChild(li);
    });

    inner.appendChild(logo);
    inner.appendChild(links);

    // Download Resume button (top-right of nav)
    if (cfg.resume) {
      const a = el("a", "nav-resume-btn", `${icons.download} Resume`);
      a.href = cfg.resume;
      a.download = "";
      inner.appendChild(a);
    }

    // Theme switcher dropdown
    const themeWrapper = el("div", "theme-switcher");
    const themeSelect  = document.createElement("select");
    themeSelect.id = "theme-select";
    themeSelect.setAttribute("aria-label", "Choose theme");
    [
      { value: "default",   label: "🎨 Default"   },
      { value: "newspaper", label: "📰 Newspaper"  },
      { value: "cli",       label: "💻 CLI"        },
    ].forEach(({ value, label }) => {
      const opt = document.createElement("option");
      opt.value = value;
      opt.textContent = label;
      themeSelect.appendChild(opt);
    });
    themeSelect.value = localStorage.getItem(THEME_KEY) || "default";
    themeSelect.addEventListener("change", () => {
      applyTheme(themeSelect.value);
      localStorage.setItem(THEME_KEY, themeSelect.value);
    });
    themeWrapper.appendChild(themeSelect);
    inner.appendChild(themeWrapper);

    nav.appendChild(inner);

    // Scroll shadow + active link
    window.addEventListener("scroll", () => {
      nav.classList.toggle("scrolled", window.scrollY > 20);
    }, { passive: true });

    // Highlight active nav link on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.querySelectorAll(".nav-links a").forEach((a) => {
              a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`);
            });
          }
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((id) => {
      const s = document.getElementById(id);
      if (s) observer.observe(s);
    });
  }

  // ── Hero ───────────────────────────────────────────────────────────────────
  function buildHero() {
    const section = document.getElementById("hero");
    if (!section) return;

    const container = el("div", "container");
    const inner     = el("div", "hero-inner");

    // Left content
    const left = el("div", "hero-content");

    left.appendChild(el("p", "hero-greeting", "👋 Hello, I'm"));
    left.appendChild(el("h1", "hero-name",  cfg.name));
    left.appendChild(el("p", "hero-title",  cfg.title));
    left.appendChild(el("p", "hero-tagline", cfg.tagline));

    // CTA buttons
    const cta = el("div", "hero-cta");
    if (cfg.linkedin) {
      const a = el("a", "btn btn-primary", `${icons.linkedin} Connect on LinkedIn`);
      a.href = cfg.linkedin; a.target = "_blank"; a.rel = "noopener noreferrer";
      cta.appendChild(a);
    }
    if (cfg.email) {
      const a = el("a", "btn btn-outline", `${icons.email} ${cfg.email}`);
      a.href = `mailto:${cfg.email}`;
      cta.appendChild(a);
    }
    left.appendChild(cta);

    // Stats
    const stats = el("div", "hero-stats");
    const uniqueCompanyCount = new Set(
      cfg.experience
        .map((job) => (job.company || "").trim().toLowerCase())
        .filter(Boolean)
    ).size;

    const statsData = [
      { number: String(uniqueCompanyCount), label: "Companies" },
      { number: `${new Date().getFullYear() - cfg.careerStartYear}+`, label: "Years Exp." },
      { number: cfg.skills.reduce((a, s) => a + s.items.length, 0) + "+", label: "Technologies" },
    ];
    statsData.forEach(({ number, label }) => {
      const item = el("div", "stat-item");
      item.appendChild(el("span", "stat-number", number));
      item.appendChild(el("span", "stat-label", label));
      stats.appendChild(item);
    });
    left.appendChild(stats);

    // Social links row below stats
    const social = el("div", "social-links");
    social.style.marginTop = "20px";
    if (cfg.github) {
      const a = el("a", "social-link", `${icons.github} GitHub`);
      a.href = cfg.github; a.target = "_blank"; a.rel = "noopener noreferrer";
      social.appendChild(a);
    }
    if (cfg.location) {
      const span = el("span", "social-link", `${icons.location} ${cfg.location}`);
      social.appendChild(span);
    }
    left.appendChild(social);

    // Hero highlights strip — Skills · Experience · Education
    const highlights = el("div", "hero-highlights");

    // Skills: top 6 individual skill items (one per category)
    const skillsBlock = el("div", "hero-hl-block");
    skillsBlock.appendChild(el("span", "hero-hl-label", "⚡ Skills"));
    const skillTags = el("div", "hero-hl-tags");
    cfg.skills.slice(0, 6).forEach((group) => {
      skillTags.appendChild(el("span", "hero-hl-tag hero-hl-tag--skill", group.items[0]));
    });
    skillsBlock.appendChild(skillTags);
    highlights.appendChild(skillsBlock);

    // Experience: company names
    const expBlock = el("div", "hero-hl-block");
    expBlock.appendChild(el("span", "hero-hl-label", "💼 Experience"));
    const expTags = el("div", "hero-hl-tags");
    cfg.experience.forEach((job) => {
      const tag = el("div", "hero-hl-exp-item");
      tag.appendChild(el("span", "hero-hl-exp-role", job.role));
      tag.appendChild(el("span", "hero-hl-exp-company", `@ ${job.company}`));
      expTags.appendChild(tag);
    });
    expBlock.appendChild(expTags);
    highlights.appendChild(expBlock);

    // Education: institution names + degree
    const eduBlock = el("div", "hero-hl-block");
    eduBlock.appendChild(el("span", "hero-hl-label", "🎓 Education"));
    const eduTags = el("div", "hero-hl-tags");
    cfg.education.forEach((edu) => {
      const tag = el("div", "hero-hl-exp-item");
      tag.appendChild(el("span", "hero-hl-exp-role", edu.degree.split("–")[0].trim()));
      tag.appendChild(el("span", "hero-hl-exp-company", edu.institution));
      eduTags.appendChild(tag);
    });
    eduBlock.appendChild(eduTags);
    highlights.appendChild(eduBlock);

    left.appendChild(highlights);

    // Right: Profile picture
    const right = el("div", "profile-wrapper");
    const ring  = el("div", "profile-ring");
    const inner2 = el("div", "profile-ring-inner");
    const img   = document.createElement("img");
    img.src = cfg.profilePicture;
    img.alt = cfg.name;
    img.className = "profile-img";
    inner2.appendChild(img);
    ring.appendChild(inner2);
    right.appendChild(ring);
    right.appendChild(el("div", "profile-badge", "Senior SDE"));

    inner.appendChild(left);
    inner.appendChild(right);
    container.appendChild(inner);
    section.appendChild(container);
  }

  // ── About ──────────────────────────────────────────────────────────────────
  function buildAbout() {
    const section = document.getElementById("about");
    if (!section) return;

    const container = el("div", "container");
    container.appendChild(el("h2", "section-title fade-up", "About Me"));

    const grid = el("div", "about-grid fade-up");

    // Left: bio
    const textDiv = el("div", "about-text");
    textDiv.appendChild(el("p", "", cfg.about));
    grid.appendChild(textDiv);

    // Right: highlight cards
    const cards = el("div", "about-highlights");
    const highlightData = [
      { icon: "🏗️", title: "System Design",    body: "Designing resilient, scalable distributed systems that handle millions of transactions." },
      { icon: "🤝", title: "Engineering Leadership", body: "Mentoring engineers, running design reviews, and driving team-wide best practices." },
      { icon: "🚀", title: "Delivery Excellence", body: "Shipping features with quality and velocity — from prototype to production." },
    ];
    highlightData.forEach(({ icon, title, body }) => {
      const card = el("div", "highlight-card");
      card.appendChild(el("span", "highlight-icon", icon));
      card.appendChild(el("h4", "", title));
      card.appendChild(el("p", "", body));
      cards.appendChild(card);
    });
    grid.appendChild(cards);

    container.appendChild(grid);
    section.appendChild(container);
  }

  // ── Skills ─────────────────────────────────────────────────────────────────
  function buildSkills() {
    const section = document.getElementById("skills");
    if (!section) return;

    const container = el("div", "container");
    container.appendChild(el("h2", "section-title fade-up", "Top Skills"));

    const grid = el("div", "skills-grid");
    cfg.skills.forEach((group, i) => {
      const card = el("div", `skill-card fade-up`);
      card.style.transitionDelay = `${i * 60}ms`;

      card.appendChild(el("div", "skill-category", group.category));

      const pills = el("div", "skill-pills");
      group.items.forEach((item) => pills.appendChild(el("span", "pill", item)));
      card.appendChild(pills);

      grid.appendChild(card);
    });

    container.appendChild(grid);
    section.appendChild(container);
  }

  // ── Experience ─────────────────────────────────────────────────────────────
  function buildExperience() {
    const section = document.getElementById("experience");
    if (!section) return;

    const container = el("div", "container");
    container.appendChild(el("h2", "section-title fade-up", "Work Experience"));

    const timeline = el("div", "timeline");
    cfg.experience.forEach((job, i) => {
      const item = el("div", "timeline-item fade-up");
      item.style.transitionDelay = `${i * 80}ms`;

      const card = el("div", "exp-card");

      const header = el("div", "exp-header");
      const logoAndMeta = el("div", "", "");
      logoAndMeta.style.display = "flex";
      logoAndMeta.style.alignItems = "flex-start";

      logoAndMeta.appendChild(el("span", "exp-logo", job.logo || "🏢"));

      const meta = el("div", "exp-meta");
      meta.appendChild(el("div", "exp-role",     job.role));
      meta.appendChild(el("div", "exp-company",  job.company));
      meta.appendChild(el("div", "exp-location", job.location));
      logoAndMeta.appendChild(meta);

      header.appendChild(logoAndMeta);
      header.appendChild(el("span", "exp-period", job.period));
      card.appendChild(header);

      const ul = el("ul", "exp-highlights");
      job.highlights.forEach((h) => ul.appendChild(el("li", "", h)));
      card.appendChild(ul);

      item.appendChild(card);
      timeline.appendChild(item);
    });

    container.appendChild(timeline);
    section.appendChild(container);
  }

  // ── Education ──────────────────────────────────────────────────────────────
  function buildEducation() {
    const section = document.getElementById("education");
    if (!section) return;

    const container = el("div", "container");
    container.appendChild(el("h2", "section-title fade-up", "Education"));

    const grid = el("div", "edu-grid");
    cfg.education.forEach((edu, i) => {
      const card = el("div", `edu-card fade-up`);
      card.style.transitionDelay = `${i * 80}ms`;

      card.appendChild(el("span", "edu-logo", edu.logo || "🎓"));
      card.appendChild(el("div", "edu-degree",      edu.degree));
      card.appendChild(el("div", "edu-institution", edu.institution));

      const meta = el("div", "edu-meta");
      meta.appendChild(el("span", "", `📍 ${edu.location}`));
      meta.appendChild(el("span", "", `📅 ${edu.period}`));
      card.appendChild(meta);

      const list = el("ul", "edu-details");
      edu.details.forEach((d) => list.appendChild(el("li", "", d)));
      card.appendChild(list);

      grid.appendChild(card);
    });

    container.appendChild(grid);
    section.appendChild(container);
  }

  // ── Certifications ─────────────────────────────────────────────────────────
  function buildCertifications() {
    const section = document.getElementById("certifications");
    if (!section || !cfg.certifications || !cfg.certifications.length) return;

    const container = el("div", "container");
    container.appendChild(el("h2", "section-title fade-up", "Certifications"));

    const grid = el("div", "certs-grid");
    cfg.certifications.forEach((cert, i) => {
      const card = el("div", "cert-card fade-up");
      card.style.transitionDelay = `${i * 60}ms`;
      card.appendChild(el("span", "cert-icon", "🏅"));

      const info = el("div");
      info.appendChild(el("div", "cert-name",   cert.name));
      info.appendChild(el("div", "cert-issuer", cert.issuer));
      info.appendChild(el("span", "cert-year",  cert.year));
      card.appendChild(info);

      grid.appendChild(card);
    });

    container.appendChild(grid);
    section.appendChild(container);
  }

  // ── Footer ─────────────────────────────────────────────────────────────────
  function buildFooter() {
    const footer = document.getElementById("footer");
    if (!footer) return;

    const container = el("div", "container");
    container.appendChild(el("div", "footer-name",    cfg.name));
    container.appendChild(el("div", "footer-tagline", cfg.title));

    const links = el("div", "footer-links");
    if (cfg.linkedin) {
      const a = el("a", "", `${icons.linkedin} LinkedIn`);
      a.href = cfg.linkedin; a.target = "_blank"; a.rel = "noopener noreferrer";
      links.appendChild(a);
    }
    if (cfg.github) {
      const a = el("a", "", `${icons.github} GitHub`);
      a.href = cfg.github; a.target = "_blank"; a.rel = "noopener noreferrer";
      links.appendChild(a);
    }
    if (cfg.email) {
      const a = el("a", "", `${icons.email} Email`);
      a.href = `mailto:${cfg.email}`;
      links.appendChild(a);
    }
    container.appendChild(links);

    const year = new Date().getFullYear();
    container.appendChild(
      el("p", "footer-copy", `© ${year} ${cfg.name} · Built with ❤️ and clean code`)
    );

    footer.appendChild(container);
  }

  // ── Scroll-in observer ─────────────────────────────────────────────────────
  function initScrollAnimations() {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".fade-up").forEach((el) => io.observe(el));
  }

  // ── Meta / title ───────────────────────────────────────────────────────────
  function setMeta() {
    document.title = `${cfg.name} | ${cfg.title}`;
    let desc = document.querySelector('meta[name="description"]');
    if (!desc) {
      desc = document.createElement("meta");
      desc.name = "description";
      document.head.appendChild(desc);
    }
    desc.content = `${cfg.name} — ${cfg.title}. ${cfg.tagline}`;
  }

  // ── Bootstrap ──────────────────────────────────────────────────────────────
  function init() {
    setMeta();
    buildNav();
    buildHero();
    buildAbout();
    buildSkills();
    buildExperience();
    buildEducation();
    buildCertifications();
    buildFooter();
    initScrollAnimations();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
