# aboutme

A professional resume webpage.

Use **Explore** in the navigation (or **Ctrl+K / Cmd+K**) to search projects, roles,
skills, education, and patents. Use the arrow keys to browse results, Enter to jump,
and Escape to close. The navigator follows the selected theme and reduced-motion preferences.

**Download PDF** downloads `Bob-Kallepalle-Resume.pdf`, a plain, two-page resume
with selectable text and contact/patent links. It does not print the webpage or
include its navigation, theme controls, or profile picture. The PDF is a curated
document: replace that file when updating the downloadable resume. Its path is
configured by `resumePdf` in `config.js`.

## Experience

### Microsoft
**Senior Software Engineer** (Sep 2025 – Present) · Redmond, WA  
- Leading an engineering team responsible for sourcing infrastructure critical to budget planning and cost of goods calculations.
- Owning the technical direction and delivery of sourcing infrastructure that underpins financial planning and product costing.
- Leading the agentic transformation of manufacturing test workflows by integrating AI into diagnostics and large-scale manufacturing data analysis.  
- Driving AI-powered factory planning and supply chain automation across materials management, capacity planning, and supplier engagement.  
- Championing strategic AI innovation initiatives across both core and adjacent business areas.

**Software Engineer 2** (Sep 2021 – Sep 2025) · Redmond, WA  
- Owned and evolved a mission-critical Windows service framework used to execute manufacturing tests for Surface and Xbox hardware platforms.  
- Architected a modular, dynamically extensible solution with strong hardware abstraction, enabling seamless integration with cameras, sensors, fixtures, PLCs, and other vendor-specific components.  
- Exposed the framework through ASP.NET service endpoints, delivering scalable, configurable, and production-ready test infrastructure.  
- Delivered modular RF test solutions for Surface products, enabling flexible component-level manufacturing validation at global scale.  
- Helped pioneer AI architecture and workflow adaptation across sourcing, new product introduction, manufacturing test systems, and post-sale diagnostics.

**Software Development Engineer** (Jun 2020 – Sep 2021) · Redmond, WA  
- Designed and deployed a robust Windows 10 DHCP server service now operating across hundreds of industrial PCs in manufacturing environments.  
- Integrated a new program into the Manufacturing Test Platform as a customer-zero implementation, accelerating adoption and proving production readiness.  
- Delivered high-quality manufacturing test solutions for critical components including GPUs, touchpads, and sensors.

### CalAmp
**Software Development Engineer – Level 2** (Jan 2020 – Jun 2020) · Irvine, CA  
- Strengthened cross-functional execution through effective collaboration with internal teams, external vendors, and strategic partners.  
- Consistently delivered design-oriented, outcome-focused solutions while adapting to evolving business priorities.

**Android Platform Engineer** (Feb 2018 – Jan 2020) · Carlsbad, CA  
- Contributed end-to-end to Android platform development for telematics-focused tablets, from requirements and implementation to lifecycle maintenance.  
- Built IoT-centric platform capabilities that connected Android devices with telematics systems and customer-facing interfaces.  
- Developed an SDK to expose vehicle data to customer applications, improving extensibility and integration speed.  
- Initiated and delivered high-impact innovations, including dash camera support and a custom IDE extension for a domain-specific scripting workflow.  
- Established strong coordination across Product Management, Validation, Development, Vendors, and customers for efficient product delivery.  
- Gained deep platform expertise in Android internals, including ADB, root access, system apps, signatures, custom ROMs, HAL, application data, and log analysis.

### ClassCalc
**Android Developer** (Jul 2017 – Jan 2018) · Greater Los Angeles Area  
- Helped build a modern, user-friendly scientific and graphing calculator experience for students, with broad backward compatibility across Android devices.  
- Partnered with iOS and Android teams to ensure cross-platform consistency, high code quality, and smooth requirement evolution.

### QuEST Global (formerly NeST Software)
**Software Engineer** (May 2014 – Jul 2015) · Trivandrum, India  
- Designed, developed, and tested UI components for healthcare applications used in Toshiba C-ARM X-ray systems.  
- Maintained and enhanced complex multi-tabbed medical software as part of an agile engineering team.  
- Authored requirement-driven test cases and executed JUnit and JDBC-backed Oracle database validation.  
- Built internal productivity tools, including:
  - **Bug Track Assist:** a Java-based log analysis utility with multithreading, parsing, and intelligent filtering.
  - **Time In/Out:** a web service that calculated employee work-hour fulfillment using intranet attendance records.  
- Analyzed image processing algorithms in MATLAB and reimplemented them in CUDA to enable GPU-accelerated performance.  
- Contributed actively to communication and culture initiatives, including the organizing committee for the “Embrace QuEST” rebranding program.

## Selected Projects

### Hydra Edge — Privacy-Aware Local Model Routing for VS Code
**MAIDAP × OCTO Summer Hackathon, Microsoft | 2026**

- Co-built a VS Code routing layer that classifies every AI request and transparently routes sensitive prompts to on-device local models instead of cloud endpoints, preserving developer productivity without leaking secrets.
- Designed and delivered the security tag scanning pipeline: Gitleaks-style rule matching plus entropy analysis for secret detection, regex and Luhn validation for PII, and path-heuristic / diff-hunk pattern analysis for sensitive source code — emitting classification tags that drive the routing decision.
- Owned the VS Code integration end to end — wired the privacy filter into the request path, added referenced-file and active-editor content to model context, and integrated the routing interfaces into the hackathon VS Code fork.
- Authored the architecture and software design artifacts for the routing solution, aligning the privacy, routing, and extension workstreams.
- Recognized by engineering leadership; the project placed within one point of the winning entry and is being ported for Surface RTX Spark by the Windows + Devices organization.

### Agent Workflow Engine — Visual Editing & Observable Multi-Model Workflows

**2026**

- Co-built an agent workflow engine for defining and running reusable, multi-step AI workflows.
- Developed a visual workflow editor with flowchart views, step creation and deletion, configuration editing, and workflow validation, saving, and loading.
- Connected workflow execution to live step status, failure diagnostics, and per-step usage and timing telemetry, making long-running agent workflows observable.
- Authored multi-model workflows that separate implementation, critique, and repair, with explicit execution budgets and verification gates.
- Compared model configurations through reproducible runs, documenting completion, correctness, cost, and runtime tradeoffs; used the findings to improve failure reporting and Windows reliability.

Project entries are configured in `config.js` and rendered in the Selected Projects section.

## Education

### California State University, Long Beach
**Master of Science (M.S.) in Computer Science** (2015 – 2017)

### National Institute of Technology
**Bachelor of Technology (B.Tech.) in Electrical and Electronics Engineering** (2010 – 2014)

## Certifications & Patents

### Technologies for driver behavior assessment

**Co-inventor · CalAmp Corp | Published August 26, 2021**

Patent application publication [WO2021168387A1 (WIPO/PCT)](https://patents.google.com/patent/WO2021168387A1/de). Combines vehicle sensor data and event-triggered video capture to assess driver behavior.
