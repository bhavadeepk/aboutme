/**
 * Professional Portfolio Configuration
 * Edit this file to update your personal information, experience, education, and skills.
 */
window.PORTFOLIO_CONFIG = {
  // ─── Personal Info ────────────────────────────────────────────────────────
  name: "Bhavadeep (Bob) Kallepalle",
  title: "Senior Software Engineer at Microsoft",
  tagline: "AI & Agentic App Development · Platform Engineering · Manufacturing Innovation",
  email: "bhavadeep.k93@hotmail.com",
  linkedin: "https://linkedin.com/in/bobkp",
  github: "https://github.com/bhavadeepk",
  location: "Redmond, Washington, United States",
  careerStartYear: 2014,
  resumePdf: "Bob-Kallepalle-Resume.pdf",

  // ─── Profile Picture ──────────────────────────────────────────────────────
  // Replace with a real image URL or a local path (e.g. "assets/profile.jpg")
  profilePicture: "profile.png",

  // ─── About Me ─────────────────────────────────────────────────────────────
  about: `Experienced software engineer with 10+ years of demonstrated history working in
    application development, platform engineering, AI and agentic app development, and IoT.
    Currently a Senior Software Engineer at Microsoft, leading AI-driven transformation of
    manufacturing test workflows and factory planning automation.
    <br><br>
    Master of Science (MS) in Computer Science from California State University-Long Beach.
    Passionate about building scalable, modular frameworks and pioneering AI architecture
    and adaptation across manufacturing organizations — from sourcing and new product
    introductions to manufacturing test solutions and customer diagnostics.`,

  // ─── Top Skills ───────────────────────────────────────────────────────────
  skills: [
    { category: "Languages",      items: ["Java", "Python", "Go", "TypeScript", "SQL"] },
    { category: "Frameworks",     items: ["ASP.NET", "WPF", "Blazor", "Node.js", "Microsoft Agents Framework", "Semantic Kernel", "Bicep"] },
    { category: "Cloud & DevOps", items: ["Function Apps", "Container Apps", "App Insights", "Storage Accounts", "Event Grid", "Service Bus", "Azure DevOps"] },
    { category: "Databases",      items: ["PostgreSQL", "Cosmos DB", "Kusto", "Redis"] },
    { category: "Architecture",   items: ["System Design", "Architecture Patterns", "Scalable Cloud Solutions", "Microservices", "Event-Driven", "CQRS"] },
    { category: "Practices",      items: ["TDD", "Agile / Scrum", "Code Review", "Mentoring", "Documentation"] },
  ],

  // ─── Work Experience ──────────────────────────────────────────────────────
  experience: [
    {
      role: "Senior Software Engineer",
      company: "Microsoft",
      location: "Redmond, WA",
      period: "Sep 2025 – Present",
      logo: "🏢",
      highlights: [
        "Leading an engineering team responsible for sourcing infrastructure critical to budget planning and cost of goods calculations.",
        "Owning the technical direction and delivery of sourcing infrastructure that underpins financial planning and product costing.",
        "Agentic transformation of Manufacturing test workflows with AI integration into diagnostics and manufacturing data analysis.",
        "AI-driven automation of Factory planning and supply chain including materials management, capacity planning and supplier engagements.",
        "Leading AI innovations within and outside business scope.",
      ],
    },
    {
      role: "Software Engineer 2",
      company: "Microsoft",
      location: "Redmond, WA",
      period: "Sep 2021 – Sep 2025",
      logo: "🏢",
      highlights: [
        "Product owner of a Windows service framework responsible for interacting with hardware components to perform manufacturing tests on <strong>Surface and Xbox</strong> products — dynamically loadable modules, highly configurable, exposed as an ASP.NET service.",
        "Achieved a high level of Hardware Abstraction Layer (HAL), decoupling dependencies on hardware types and vendors.",
        "Delivered modular and scalable <strong>RF testing solutions</strong> for Surface enabling component-level manufacturing and testing anywhere.",
        "Pioneered AI Architecture and Adaptation for workflows across the manufacturing organization — from sourcing to customer diagnostics.",
      ],
    },
    {
      role: "Software Development Engineer",
      company: "Microsoft",
      location: "Redmond, WA",
      period: "Jun 2020 – Sep 2021",
      logo: "🏢",
      highlights: [
        "Developed and deployed a robust <strong>DHCP Server service</strong> for Windows 10, live on 100s of industrial PCs across manufacturing lines.",
        "Integrated a new program onto the Manufacturing Test Platform as customer zero.",
        "Delivered high-quality manufacturing test solutions for GPU, Touchpad and Sensor components.",
      ],
    },
    {
      role: "Software Development Engineer – Level 2",
      company: "CalAmp",
      location: "Irvine, CA",
      period: "Jan 2020 – Jun 2020",
      logo: "📡",
      highlights: [
        "Inter-team management, vendor and partner collaborations in the wireless Telematics industry.",
        "Demonstrated problem-solving, design-oriented and result-driven approach.",
      ],
    },
    {
      role: "Android Platform Engineer",
      company: "CalAmp",
      location: "Carlsbad, CA",
      period: "Feb 2018 – Jan 2020",
      logo: "📡",
      highlights: [
        "End-to-end lifecycle of requirements gathering, development and maintenance of software on CalAmp Android tablets in the IoT/Telematics sector.",
        "Created an <strong>SDK</strong> for providing vehicle data to customer apps; initiated innovative projects including dash camera support and a custom IDE extension.",
        "Comprehensive understanding of Android internals: ADB, root, system apps, custom ROMs, HAL and logcat.",
      ],
    },
    {
      role: "Android Developer",
      company: "ClassCalc",
      location: "Greater Los Angeles Area",
      period: "Jul 2017 – Jan 2018",
      logo: "📱",
      highlights: [
        "Designed and developed a user-friendly Scientific and Graphing calculator interface using latest Android libraries with backward compatibility.",
        "Coordinated between iOS and Android teams, enforcing consistency and code quality.",
      ],
    },
    {
      role: "Software Engineer",
      company: "QuEST Global",
      location: "Trivandrum, India",
      period: "May 2014 – Jul 2015",
      logo: "🌐",
      highlights: [
        "UI design, development and testing of Healthcare applications for Toshiba Medical Systems Corporation.",
        "Part of an agile team responsible for maintenance and enhancement of Toshiba C-ARM X-ray systems application.",
        "Developed 'Bug Track Assist' — a log file analyzer using multithreading, parsing and sorting algorithms.",
        "Analyzed Toshiba's image processing algorithms in MATLAB and reimplemented them in <strong>CUDA</strong> for GPU execution.",
      ],
    },
  ],

  // ─── Selected Projects ────────────────────────────────────────────────────
  projects: [
    {
      name: "Hydra Edge",
      summary: "Privacy-Aware Local Model Routing for VS Code",
      event: "MAIDAP × OCTO Summer Hackathon, Microsoft",
      year: "2026",
      highlights: [
        "Co-built a VS Code routing layer that classifies every AI request and transparently routes sensitive prompts to on-device local models instead of cloud endpoints, preserving developer productivity without leaking secrets.",
        "Designed and delivered the security tag scanning pipeline: Gitleaks-style rule matching plus entropy analysis for secret detection, regex and Luhn validation for PII, and path-heuristic / diff-hunk pattern analysis for sensitive source code — emitting classification tags that drive the routing decision.",
        "Owned the VS Code integration end to end — wired the privacy filter into the request path, added referenced-file and active-editor content to model context, and integrated the routing interfaces into the hackathon VS Code fork.",
        "Authored the architecture and software design artifacts for the routing solution, aligning the privacy, routing, and extension workstreams.",
        "Recognized by engineering leadership; the project placed within one point of the winning entry and is being ported for Surface RTX Spark by the Windows + Devices organization.",
      ],
    },
    {
      name: "Agent Workflow Engine",
      summary: "Visual Editing & Observable Multi-Model Workflows",
      year: "2026",
      highlights: [
        "Co-built an agent workflow engine for defining and running reusable, multi-step AI workflows.",
        "Developed a visual workflow editor with flowchart views, step creation and deletion, configuration editing, and workflow validation, saving, and loading.",
        "Connected workflow execution to live step status, failure diagnostics, and per-step usage and timing telemetry, making long-running agent workflows observable.",
        "Authored multi-model workflows that separate implementation, critique, and repair, with explicit execution budgets and verification gates.",
        "Compared model configurations through reproducible runs, documenting completion, correctness, cost, and runtime tradeoffs; used the findings to improve failure reporting and Windows reliability.",
      ],
    },
  ],

  // ─── Education ────────────────────────────────────────────────────────────
  education: [
    {
      degree: "Master of Science (MS) – Computer Science",
      institution: "California State University-Long Beach",
      location: "Long Beach, CA",
      period: "2015 – 2017",
      logo: "🎓",
      details: [
        "Majored in Computer Science",
      ],
    },
    {
      degree: "Bachelor of Technology (B.Tech.) – Electrical and Electronics Engineering",
      institution: "National Institute of Technology",
      location: "India",
      period: "2010 – 2014",
      logo: "🏛️",
      details: [
        "Electrical and Electronics Engineering",
      ],
    },
  ],

  // ─── Certifications & Patents (optional) ──────────────────────────────────
  certifications: [
    {
      name: "Technologies for driver behavior assessment",
      issuer: "Co-inventor · CalAmp Corp",
      year: "Published August 26, 2021",
      description: "Patent application publication WO2021168387A1 (WIPO/PCT). Combines vehicle sensor data and event-triggered video capture to assess driver behavior.",
      url: "https://patents.google.com/patent/WO2021168387A1/de",
      icon: "📜",
    },
  ],
};
