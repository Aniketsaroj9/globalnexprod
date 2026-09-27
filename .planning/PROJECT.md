# SmartConnect — GlobalNex Corporate Website

## What This Is

A professional, responsive corporate website for Bhargesh Patel GlobalNex Private Limited — a multi-service consultancy covering Immigration, Study Abroad, Tours & Travels, Export–Import, and Business Setup. The site centralizes the company's online presence, captures leads via inquiry forms with email routing, provides a CMS for blog/success stories, and drives SEO visibility. Built on Spring Boot 3.2 + React 18 + MongoDB Atlas, deployed to AWS India (ap-south-1).

## Core Value

**Prospective clients can discover GlobalNex's five service lines, understand what each offers, and submit an inquiry that routes to the correct department — all from a fast, professional, mobile-first website.**

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

(None yet — ship to validate)

### Active

<!-- Current scope. Building toward these. -->

**Public Website:**
- [ ] 11 public pages: Home, About Us, 5 service detail pages (single template), Success Stories (list + detail), Blog (list + detail), Contact Us, Privacy Policy, Terms
- [ ] Home page with hero banner, company intro, services grid, "Why Choose Us", featured services, success stories preview, blog preview, and contact CTA band
- [ ] About Us page with rich-text content from CMS (vision, mission, story), optional stats band
- [ ] Single `ServiceDetailPage` template for all 5 services, resolved by `:slug` — hero, overview, offerings, process steps, FAQ accordion, inquiry CTA
- [ ] Success Stories module: paginated grid, service filter chips, detail view with related stories, empty state handling
- [ ] Blog module: paginated card grid (published only), detail view with typography, read-time estimate, related posts, draft → 404 on public routes
- [ ] Contact Us page: validated form (name, email, phone, service dropdown, message, honeypot, consent), success/error states, pre-fill from `?service=` query param
- [ ] Legal pages (privacy policy, terms) driven by PageContent model
- [ ] Branded 404 page
- [ ] Responsive at 4 breakpoints (360, 768, 1024, 1440px)
- [ ] "Endorsement" design language: guilloche/stamp aesthetic, Fraunces + Public Sans + Courier Prime typography, ink/bond/seal/brass palette, dark mode

**Navigation & Layout:**
- [ ] Primary nav: Home, About Us, Services (dropdown), Success Stories, Blog, Contact Us
- [ ] Desktop: all items visible, services grouped under dropdown; Mobile: hamburger + drawer with accordion
- [ ] Sticky navbar, 4-column footer with email aliases, socials, copyright
- [ ] Breadcrumb navigation on inner pages

**Admin Panel:**
- [ ] Admin login with JWT auth (httpOnly cookie, bcrypt 12)
- [ ] Dashboard: 4 stat tiles (new/total inquiries, published posts/stories), recent 5 inquiries, quick actions
- [ ] Inquiries CRUD: table with filters (status, service), search, detail drawer, status toggle (new/read/archived)
- [ ] Blog CRUD: create/edit (title, auto-slug, excerpt, cover image, rich-text content, author, status), delete with confirm
- [ ] Success Stories CRUD: same pattern as Blog
- [ ] Services edit-only (no create/delete — exactly 5 fixed): tagline, description, offerings, process, FAQs, hero image, featured toggle, order, SEO

**Backend & API:**
- [ ] Spring Boot 3.2 backend with 30 REST endpoints (response envelope pattern)
- [ ] 7 MongoDB document models: Service, BlogPost, SuccessStory, Inquiry, AdminUser, PageContent, SiteSettings
- [ ] JWT authentication with Spring Security (public routes open, `/admin/*` protected)
- [ ] Rate limiting: login 10/15min/IP, inquiries 5/hr/IP
- [ ] Email notifications via SES: inquiry → department routing (immigration@, education@, travel@, exports@, info@)
- [ ] Async email send (fire-and-forget, failures logged not blocking)
- [ ] Input validation (Spring Validation), OWASP HTML sanitization for rich-text
- [ ] Dynamic sitemap.xml + robots.txt (disallow /admin)
- [ ] Health endpoint (`/api/health`)

**SEO & Performance:**
- [ ] Unique meta title + description per page (React Helmet Async)
- [ ] Canonical tags, Open Graph + Twitter Card meta
- [ ] Schema.org structured data: Organization (home), Article (blog), LocalBusiness (services), BreadcrumbList
- [ ] Code-splitting with route-level lazy loading (< 250KB gzipped main bundle)
- [ ] Image lazy loading, font preload
- [ ] Lighthouse: Performance ≥ 85, SEO ≥ 90, Accessibility ≥ 90

**Deployment:**
- [ ] AWS Elastic Beanstalk (t4g.micro, ap-south-1) for Spring Boot API
- [ ] S3 + CloudFront for React frontend (OAI, custom error → /index.html)
- [ ] MongoDB Atlas M0 (ap-south-1, free tier)
- [ ] Amazon SES for email (ap-south-1)
- [ ] Route 53 DNS (bhargeshglobalnex.com + www), ACM TLS certs
- [ ] .co/.in → 301 → .com redirects
- [ ] GitHub Actions CI/CD: test on PR, deploy on merge to main

**Testing:**
- [ ] Unit/integration tests: 70%+ on models/services, 80%+ on controllers (JUnit 5, Mockito, Testcontainers)
- [ ] React component tests: 60%+ (Vitest, React Testing Library)
- [ ] 3 E2E flows via Playwright: visitor inquiry, admin review, admin publish
- [ ] Cross-browser: Chrome, Firefox, Safari, Edge (latest 2), iOS Safari, Android Chrome
- [ ] Accessibility: keyboard nav, screen reader, WCAG contrast, proper ARIA

### Out of Scope

<!-- Explicit boundaries per PRD §12 -->

- Client portal with user login — not in MVP
- Appointment/consultation booking — separate scope
- Live chat or chatbot — separate scope
- Payment processing — not required
- Multi-language / i18n — English-only for now
- Public blog comments / UGC — staff-curated only
- Advanced CRM (pipelines, SLAs, auto-followups) — simple new/read/archived workflow
- Native mobile apps — responsive web only
- Third-party integrations (Calendar, Slack, HubSpot) — not in scope
- Video hosting — not required
- File upload from visitors — not required
- Multi-branch / multi-location — single office
- Advanced analytics beyond GA4 tag — not required

## Context

- **Client:** Bhargesh Patel GlobalNex Private Limited, Ahmedabad — sole proprietor running 5 service lines
- **Current state:** Zero online presence. Inquiries only via personal networks.
- **Target users:** Priya (student, mobile, 4G), Rajesh (SME owner, desktop), Meera (office staff managing admin panel)
- **Design language:** "Endorsement" — inspired by official documents (visa stamps, certificates). Guilloche, ruled fields, ledger rows, serial numbers. Limited motion budget (one stamp animation on hero only).
- **Domain:** bhargeshglobalnex.com (primary) + .co/.in (redirects)
- **Client inputs needed:** 12 items (address, phone, logo, photos, copy, success stories, social URLs, SES creds, business hours, billing address, legal text, GA4 ID) — tracked in PRD §10

## Constraints

- **Tech stack:** Spring Boot 3.2 + React 18 (Vite) + MongoDB Atlas + AWS — non-negotiable per PRD
- **Timeline:** 8 weeks from approval (phased per 9-phase build plan)
- **Budget:** ~₹0/month Y1 (AWS free tier), ~₹735/month Y2+ — must stay within free tier initially
- **Region:** AWS ap-south-1 (Mumbai) — latency and billing requirements
- **Design:** Must follow Endorsement design language (palette, typography, components per PRD §4)
- **Services:** Exactly 5, fixed — no dynamic creation/deletion by admin
- **SiteSettings:** Singleton pattern — one document with id "default"
- **Security:** JWT in httpOnly cookie (not localStorage), bcrypt 12, CORS restricted, CSP strict

## Key Decisions

<!-- Decisions that constrain future work. -->

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Spring Boot 3.2 over Express/Node | Client preference, enterprise-grade Java ecosystem | — Pending |
| MongoDB Atlas M0 (free tier) | Zero cost Y1, shared cluster sufficient for low-traffic marketing site | — Pending |
| Single ServiceDetailPage template | DRY — 5 services share identical layout, differ only by data | — Pending |
| JWT in httpOnly cookie (not localStorage) | XSS protection, automatic inclusion on requests | — Pending |
| Endorsement design language | Unifies 5 unrelated service lines under the "stamped document" metaphor | — Pending |
| Elastic Beanstalk over ECS/Lambda | Simplest deployment for single Spring Boot app, free tier eligible | — Pending |
| SiteSettings as singleton | Only one company, one config — no multi-tenant complexity | — Pending |
| Honeypot over reCAPTCHA | No third-party dependency, sufficient for marketing site spam level | — Pending |
| Tailwind CSS v3 | Rapid styling with design token system, matches PRD Appendix A | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-09-27 after initialization*
