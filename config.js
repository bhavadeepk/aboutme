/**
 * Professional Portfolio Configuration
 * Edit this file to update your personal information, experience, education, and skills.
 */
window.PORTFOLIO_CONFIG = {
  // ─── Personal Info ────────────────────────────────────────────────────────
  name: "Bhavadeep K",
  title: "Senior Software Development Engineer",
  tagline: "Building scalable systems · Crafting elegant solutions · Driving engineering excellence",
  email: "bhavadeep.k@example.com",
  linkedin: "https://linkedin.com/in/bhavadeepk",
  github: "https://github.com/bhavadeepk",
  location: "San Francisco Bay Area, CA",
  careerStartYear: 2017,

  // ─── Profile Picture ──────────────────────────────────────────────────────
  // Replace with a real image URL or a local path (e.g. "assets/profile.jpg")
  profilePicture: "https://ui-avatars.com/api/?name=Bhavadeep+K&size=256&background=1e3a5f&color=ffffff&bold=true&rounded=true",

  // ─── About Me ─────────────────────────────────────────────────────────────
  about: `I am a Senior Software Development Engineer with 8+ years of experience designing and
    delivering high-throughput, distributed systems at scale. I thrive at the intersection of
    backend architecture, cloud infrastructure, and developer experience — turning ambiguous
    product requirements into robust, maintainable services that handle millions of requests per day.
    <br><br>
    I lead with empathy, mentor junior engineers, and champion engineering best-practices including
    clean-code principles, comprehensive testing, and rigorous code review. Outside of work I
    contribute to open-source projects and enjoy competitive programming.`,

  // ─── Top Skills ───────────────────────────────────────────────────────────
  skills: [
    { category: "Languages",      items: ["Java", "Python", "Go", "TypeScript", "SQL"] },
    { category: "Frameworks",     items: ["Spring Boot", "Node.js", "React", "gRPC", "GraphQL"] },
    { category: "Cloud & DevOps", items: ["AWS", "GCP", "Kubernetes", "Terraform", "CI/CD"] },
    { category: "Databases",      items: ["PostgreSQL", "DynamoDB", "Redis", "Cassandra", "Elasticsearch"] },
    { category: "Architecture",   items: ["Microservices", "Event-Driven", "CQRS", "REST APIs", "System Design"] },
    { category: "Practices",      items: ["TDD", "Agile / Scrum", "Code Review", "Mentoring", "Documentation"] },
  ],

  // ─── Work Experience ──────────────────────────────────────────────────────
  experience: [
    {
      role: "Senior Software Development Engineer",
      company: "Acme Corp",
      location: "San Francisco, CA",
      period: "Jan 2022 – Present",
      logo: "🏢",
      highlights: [
        "Architected a real-time event-streaming platform processing <strong>5M+ events/day</strong> using Kafka, Flink, and DynamoDB, reducing data-pipeline latency by 60%.",
        "Led a team of 6 engineers to re-platform a monolith into 12 independent microservices, improving deployment frequency from monthly to daily.",
        "Designed and shipped a multi-tenant SaaS feature that added <strong>$4M ARR</strong> within the first two quarters.",
        "Drove engineering-wide adoption of OpenTelemetry observability, cutting mean time-to-detect (MTTD) from 45 min to under 5 min.",
        "Mentored 4 junior/mid engineers through structured 1-on-1s and design-review sessions.",
      ],
    },
    {
      role: "Software Development Engineer II",
      company: "Tech Innovations Inc.",
      location: "Seattle, WA",
      period: "Jun 2019 – Dec 2021",
      logo: "💡",
      highlights: [
        "Built a distributed rate-limiting service (Java + Redis) adopted by 30+ internal teams, handling 200K RPS with p99 < 2 ms.",
        "Redesigned the checkout payment flow, decreasing error rates by 35% and improving throughput by 2×.",
        "Owned infrastructure-as-code migration (CloudFormation → Terraform) for 15 production services.",
        "Implemented blue-green deployment pipelines, achieving zero-downtime releases for critical services.",
      ],
    },
    {
      role: "Software Development Engineer",
      company: "StartupXYZ",
      location: "Austin, TX",
      period: "Jul 2017 – May 2019",
      logo: "🚀",
      highlights: [
        "Developed core REST APIs (Spring Boot) serving the company's mobile app with 500K daily active users.",
        "Introduced automated integration-test suite (JUnit + Testcontainers), raising code coverage from 40% to 82%.",
        "Optimised slow PostgreSQL queries, reducing average API response time from 900 ms to 120 ms.",
      ],
    },
  ],

  // ─── Education ────────────────────────────────────────────────────────────
  education: [
    {
      degree: "Master of Science – Computer Science",
      institution: "University of Southern California",
      location: "Los Angeles, CA",
      period: "2015 – 2017",
      logo: "🎓",
      details: [
        "Specialisation: Distributed Systems & Cloud Computing",
        "GPA: 3.9 / 4.0",
        "Teaching Assistant – Advanced Algorithms (CS 570)",
      ],
    },
    {
      degree: "Bachelor of Technology – Computer Science & Engineering",
      institution: "Indian Institute of Technology",
      location: "Hyderabad, India",
      period: "2011 – 2015",
      logo: "🏛️",
      details: [
        "Graduated with Distinction (Gold Medallist)",
        "President – ACM Student Chapter",
        "Final-year project: Fault-tolerant consensus protocol for IoT networks",
      ],
    },
  ],

  // ─── Certifications (optional) ────────────────────────────────────────────
  certifications: [
    { name: "AWS Certified Solutions Architect – Professional", issuer: "Amazon Web Services", year: "2023" },
    { name: "Certified Kubernetes Administrator (CKA)",          issuer: "CNCF",               year: "2022" },
    { name: "Google Cloud Professional Data Engineer",           issuer: "Google",              year: "2021" },
  ],
};
