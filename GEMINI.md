<!-- GSD:project-start source:PROJECT.md -->
## Project

**SmartConnect — GlobalNex Corporate Website**

A professional, responsive corporate website for Bhargesh Patel GlobalNex Private Limited — a multi-service consultancy covering Immigration, Study Abroad, Tours & Travels, Export–Import, and Business Setup. The site centralizes the company's online presence, captures leads via inquiry forms with email routing, provides a CMS for blog/success stories, and drives SEO visibility. Built on Spring Boot 3.2 + React 18 + MongoDB Atlas, deployed to AWS India (ap-south-1).

**Core Value:** **Prospective clients can discover GlobalNex's five service lines, understand what each offers, and submit an inquiry that routes to the correct department — all from a fast, professional, mobile-first website.**

### Constraints

- **Tech stack:** Spring Boot 3.2 + React 18 (Vite) + MongoDB Atlas + AWS — non-negotiable per PRD
- **Timeline:** 8 weeks from approval (phased per 9-phase build plan)
- **Budget:** ~₹0/month Y1 (AWS free tier), ~₹735/month Y2+ — must stay within free tier initially
- **Region:** AWS ap-south-1 (Mumbai) — latency and billing requirements
- **Design:** Must follow Endorsement design language (palette, typography, components per PRD §4)
- **Services:** Exactly 5, fixed — no dynamic creation/deletion by admin
- **SiteSettings:** Singleton pattern — one document with id "default"
- **Security:** JWT in httpOnly cookie (not localStorage), bcrypt 12, CORS restricted, CSP strict
<!-- GSD:project-end -->

<!-- GSD:stack-start source:STACK.md -->
## Technology Stack

Technology stack not yet documented. Will populate after codebase mapping or first phase.
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.agent/skills/`, `.agents/skills/`, `.cursor/skills/`, or `.github/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
