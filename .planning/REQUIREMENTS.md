# Requirements: SmartConnect

**Defined:** 2026-09-27
**Core Value:** Prospective clients can discover GlobalNex's five service lines, understand what each offers, and submit an inquiry that routes to the correct department — all from a fast, professional, mobile-first website.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Foundation

- [ ] **FOUND-01**: Spring Boot 3.2 project scaffolded with Maven, MongoDB driver, Spring Security, Spring Mail, JJWT, Lombok, OWASP HTML Sanitizer
- [ ] **FOUND-02**: React 18 project scaffolded with Vite, React Router v6, Axios, Tailwind CSS v3, React Helmet Async, Lucide React
- [ ] **FOUND-03**: Endorsement design tokens configured in Tailwind (ink/bond/paper/field/rule/seal/brass/veridian palette, Fraunces/Public Sans/Courier Prime fonts)
- [ ] **FOUND-04**: MongoDB Atlas M0 cluster (ap-south-1) provisioned and connected from Spring Boot
- [ ] **FOUND-05**: `/api/health` endpoint returns `{status:'ok', uptime, db:'connected'}`
- [ ] **FOUND-06**: ESLint + Prettier configured, git initialized, `.env.example` committed
- [ ] **FOUND-07**: Dark mode tokens configured (background #0E1725, surfaces #141F30, type #E7EAE2)

### Data Models

- [ ] **DATA-01**: Service document model with slug, name, tagline, icon, heroImage, description, offerings[], process[], faqs[], isFeaturedOnHome, order, seo, timestamps
- [ ] **DATA-02**: BlogPost document model with slug, title, excerpt, content, coverImage, author, tags[], status (DRAFT/PUBLISHED), publishedAt, readTimeMin (auto-computed), seo, timestamps
- [ ] **DATA-03**: SuccessStory document model with slug, clientName, serviceRef, summary, fullStory, image, outcome, status (DRAFT/PUBLISHED), featured, timestamps
- [ ] **DATA-04**: Inquiry document model with name, email, phone, serviceRef, serviceLabel, message, status (NEW/READ/ARCHIVED), source, ipHash, userAgent, notifiedAt, timestamps; compound index {status, createdAt}
- [ ] **DATA-05**: AdminUser document model with name, email, passwordHash (bcrypt 12, never serialized), role (CONTENT_ADMIN/SUPER_ADMIN), isActive, lastLoginAt, timestamps
- [ ] **DATA-06**: PageContent document model with slug, title, blocks[], seo, timestamps
- [ ] **DATA-07**: SiteSettings singleton document with companyName, primaryEmail, phone, address, mapEmbedUrl, socials map, departmentEmails[], timestamps
- [ ] **DATA-08**: All indices created: unique on slugs/emails, compound index on Inquiry {status, createdAt}, index on Service.order, BlogPost {status, publishedAt}
- [ ] **DATA-09**: Idempotent seed scripts for services (5), admin user, pages (about-us, privacy-policy, terms), demo data

### Authentication

- [ ] **AUTH-01**: Admin can log in with email + password via POST `/api/auth/login` → JWT in httpOnly, SameSite=Strict, Secure cookie
- [ ] **AUTH-02**: Invalid credentials return generic 401 (no user enumeration)
- [ ] **AUTH-03**: GET `/api/auth/me` returns current user profile when authenticated
- [ ] **AUTH-04**: POST `/api/auth/logout` clears session/token
- [ ] **AUTH-05**: Spring Security config: public routes open, `/api/admin/*` requires authentication
- [ ] **AUTH-06**: JWT expiry enforced (604800s = 7 days), token validation on protected routes
- [ ] **AUTH-07**: Rate limiting on `/api/auth/login`: max 10 requests per 15 min per IP
- [ ] **AUTH-08**: CORS restricted to CLIENT_ORIGIN environment variable

### Public API

- [ ] **API-01**: GET `/api/services` returns all services ordered by `order`; `?featured=true` filters
- [ ] **API-02**: GET `/api/services/:slug` returns service detail; 404 on unknown slug
- [ ] **API-03**: GET `/api/blog` returns published posts, paginated; `?tag=`, `?page=`, `?limit=`
- [ ] **API-04**: GET `/api/blog/:slug` returns published post detail; draft → 404
- [ ] **API-05**: GET `/api/success-stories` returns published stories, paginated; `?service=<slug>`
- [ ] **API-06**: GET `/api/success-stories/:slug` returns story detail
- [ ] **API-07**: POST `/api/inquiries` validates input, checks honeypot, rate-limits (5/hr/IP), sends email async, returns success
- [ ] **API-08**: GET `/api/pages/:slug` returns page content (about-us, privacy-policy, terms)
- [ ] **API-09**: GET `/api/settings` returns public-safe subset of SiteSettings
- [ ] **API-10**: All responses follow envelope pattern: `{success, data, meta}` or `{success, error: {code, message, details}}`
- [ ] **API-11**: Pagination on all list endpoints: `?page=1&limit=9` (max 50), meta includes total, page, pageSize, totalPages
- [ ] **API-12**: Input validation via Spring Validation on all write endpoints, centralized exception handler

### Admin API

- [ ] **ADMIN-01**: PUT `/api/services/:slug` updates service content (admin only)
- [ ] **ADMIN-02**: GET `/api/admin/blog` lists all posts including drafts (admin only)
- [ ] **ADMIN-03**: POST `/api/admin/blog` creates blog post, auto-slug if omitted (admin only)
- [ ] **ADMIN-04**: PUT `/api/admin/blog/:id` updates blog post (admin only)
- [ ] **ADMIN-05**: DELETE `/api/admin/blog/:id` deletes blog post (admin only)
- [ ] **ADMIN-06**: GET `/api/admin/success-stories` lists all stories including drafts (admin only)
- [ ] **ADMIN-07**: POST `/api/admin/success-stories` creates story (admin only)
- [ ] **ADMIN-08**: PUT `/api/admin/success-stories/:id` updates story (admin only)
- [ ] **ADMIN-09**: DELETE `/api/admin/success-stories/:id` deletes story (admin only)
- [ ] **ADMIN-10**: GET `/api/admin/inquiries` lists inquiries with `?status=`, `?service=`, `?q=`, `?page=` (admin only)
- [ ] **ADMIN-11**: GET `/api/admin/inquiries/:id` returns inquiry detail (admin only)
- [ ] **ADMIN-12**: PATCH `/api/admin/inquiries/:id` updates status only (admin only)
- [ ] **ADMIN-13**: PUT `/api/admin/pages/:slug` updates page content (admin only)
- [ ] **ADMIN-14**: PUT `/api/admin/settings` updates company info, emails, socials (admin only)
- [ ] **ADMIN-15**: GET `/api/admin/stats` returns dashboard counts (admin only)

### Email

- [ ] **MAIL-01**: Spring Mail configured for SES on ap-south-1
- [ ] **MAIL-02**: Inquiry submission triggers email notification to correct department (immigration@, education@, travel@, exports@, or info@ based on service)
- [ ] **MAIL-03**: Email sent async (fire-and-forget), request completes even if email fails
- [ ] **MAIL-04**: HTML + plaintext email templates for inquiry notification
- [ ] **MAIL-05**: Failure logged, notifiedAt timestamp set on success

### Frontend Shell

- [ ] **SHELL-01**: React Router with all 20 routes defined (11 public + 6 admin + login + 404), lazy loading per route
- [ ] **SHELL-02**: AuthContext bootstraps `/api/auth/me` on app mount, redirects to login on 401
- [ ] **SHELL-03**: Axios API client: baseURL from env, withCredentials: true, response interceptor normalizes envelope, handles 401
- [ ] **SHELL-04**: Common UI components: Button, Input, Select, Textarea, Card, Badge, Spinner, Pagination, EmptyState, ErrorState, Modal, Accordion, SectionHeading, Breadcrumb
- [ ] **SHELL-05**: Navbar: sticky, desktop nav with Services dropdown, mobile hamburger + drawer with accordion
- [ ] **SHELL-06**: Footer: 4 columns, email aliases, social icons (hidden if URL empty), copyright
- [ ] **SHELL-07**: ProtectedRoute wrapper redirects unauthenticated users to `/admin/login`
- [ ] **SHELL-08**: Responsive at all 4 breakpoints (360, 768, 1024, 1440px)

### Home Page

- [ ] **HOME-01**: Hero banner with H1, subheadline, primary CTA ("Get Free Consultation" → /contact-us), secondary CTA ("Explore Services" → scroll), stamp animation (scale 1.9→1, rotate -30°→-13°, 620ms delay 450ms)
- [ ] **HOME-02**: Company introduction section (2-3 sentences + "Learn more" → /about-us)
- [ ] **HOME-03**: Services grid (5 ServiceCard components from API, ordered by Service.order) — 1 col mobile / 2 col tablet / 3 col desktop
- [ ] **HOME-04**: "Why Choose Us" section with 4 value props (icon + title + one-liner)
- [ ] **HOME-05**: Featured Services section (services where isFeaturedOnHome === true; hides if none)
- [ ] **HOME-06**: Success Stories preview (latest 3 published stories + "View all" link; hides if zero)
- [ ] **HOME-07**: Latest Blog Posts (latest 3 published posts + "Visit blog" link; hides if zero)
- [ ] **HOME-08**: Contact CTA band with mini-form (Name, Email, Service, Message) posting to `/api/inquiries` with source: "home-cta"

### About Page

- [ ] **ABOUT-01**: Hero strip with page title + breadcrumb
- [ ] **ABOUT-02**: Rich-text content block from PageContent (company story, vision, mission, objectives, business philosophy)
- [ ] **ABOUT-03**: Optional stats band (years, clients, countries — all [PLACEHOLDER] until client supplies)

### Service Pages

- [ ] **SERV-01**: Single `ServiceDetailPage` component resolved by `:slug` route param (NOT five separate files)
- [ ] **SERV-02**: Hero section: service name (H1), tagline, hero image, inline CTA
- [ ] **SERV-03**: Overview: rich-text from Service.description
- [ ] **SERV-04**: "What we offer" bulleted list from Service.offerings[]
- [ ] **SERV-05**: Process/How it works: numbered steps from Service.process[]
- [ ] **SERV-06**: FAQ accordion from Service.faqs[] (hides if empty)
- [ ] **SERV-07**: Inquiry CTA linking to `/contact-us?service=<slug>` pre-selecting service in dropdown

### Success Stories Pages

- [ ] **STORY-01**: List view: responsive grid (9 per page, pagination), filter chips by service
- [ ] **STORY-02**: Story card: image (or initial-letter avatar fallback), client name, service tag chip, 2-line excerpt, "Read story →"
- [ ] **STORY-03**: Detail view: cover image, H1 title, service tag, full story (rich text), related stories (latest 3 excluding current)
- [ ] **STORY-04**: Empty state: friendly message + CTA to Contact (never broken empty grid)

### Blog Pages

- [ ] **BLOG-01**: List view: card grid (9 per page, pagination), only published posts
- [ ] **BLOG-02**: Blog card: cover image, title, excerpt (max 140 chars), published date, read-time estimate
- [ ] **BLOG-03**: Detail view: cover image, H1, author + date + read time, rich-text body with proper typography, related posts
- [ ] **BLOG-04**: Draft posts return 404 on public routes

### Contact Page

- [ ] **CONT-01**: Form: Full Name (2-80 chars), Email (RFC-ish), Phone (8-15 digits), Service dropdown (known slugs + "general"), Message (10-2000 chars), hidden honeypot, consent checkbox
- [ ] **CONT-02**: Client-side validation on blur + submit; inline error messages via aria-describedby
- [ ] **CONT-03**: Submit button disabled + spinner while in-flight
- [ ] **CONT-04**: Success: confirmation panel ("Thank you — we'll respond within 1 business day") + option to send another
- [ ] **CONT-05**: Failure: error banner, form values preserved, retry allowed
- [ ] **CONT-06**: Pre-fill service from `?service=<slug>` query param
- [ ] **CONT-07**: Contact info displayed: info@ email, department emails, phone [PLACEHOLDER], address [PLACEHOLDER]
- [ ] **CONT-08**: Google Map embed: conditionally rendered only if VITE_MAP_EMBED_URL configured; no broken iframe

### Legal Pages

- [ ] **LEGAL-01**: Privacy policy page from PageContent model
- [ ] **LEGAL-02**: Terms page from PageContent model
- [ ] **LEGAL-03**: Linked in footer

### Admin Panel

- [ ] **APANEL-01**: Login page: email + password, generic error, redirect to /admin on success
- [ ] **APANEL-02**: Dashboard: 4 stat tiles (New Inquiries, Total Inquiries, Published Posts, Published Stories)
- [ ] **APANEL-03**: Dashboard: recent 5 inquiries table (date, name, email, service, status) + quick actions
- [ ] **APANEL-04**: Inquiries: table with date/name/email/service/status, row click → detail drawer, status toggle (new/read/archived), filters (status, service), search by name/email
- [ ] **APANEL-05**: Blog CRUD: list with status badges, create/edit form (title, auto-slug, excerpt, cover image URL, rich-text content, author, status, publishedAt), delete with confirm
- [ ] **APANEL-06**: Success Stories CRUD: same pattern as Blog
- [ ] **APANEL-07**: Services edit: per-service form for tagline, description, offerings list, process steps, FAQs, hero image URL, featured toggle, order, SEO — edit-only (no create/delete)

### SEO

- [ ] **SEO-01**: Unique meta title + description on all 11 public routes via React Helmet Async
- [ ] **SEO-02**: Canonical tags on all pages
- [ ] **SEO-03**: Open Graph + Twitter Card meta tags
- [ ] **SEO-04**: Schema.org structured data: Organization (home), Article (blog), LocalBusiness (services), BreadcrumbList (inner pages)
- [ ] **SEO-05**: Dynamic sitemap.xml including all published posts/stories/services
- [ ] **SEO-06**: robots.txt disallows `/admin`

### Performance

- [ ] **PERF-01**: Route-level code-splitting with React.lazy + Suspense (main bundle < 250KB gzipped)
- [ ] **PERF-02**: Image lazy-loading on all pages
- [ ] **PERF-03**: Font preload for Fraunces and Public Sans
- [ ] **PERF-04**: Lighthouse Performance ≥ 85 (mobile, Home page)
- [ ] **PERF-05**: Lighthouse SEO ≥ 90, Accessibility ≥ 90

### Security

- [ ] **SEC-01**: Spring Security CSP config (no unsafe-inline in prod)
- [ ] **SEC-02**: Cookie flags: httpOnly, SameSite=Strict, Secure (prod only)
- [ ] **SEC-03**: OWASP HTML sanitizer on all rich-text content
- [ ] **SEC-04**: Rate limiting on login (10/15min/IP) and inquiry (5/hr/IP) endpoints
- [ ] **SEC-05**: Dependency audit clean (npm audit, Maven security check)

### Deployment

- [ ] **DEPLOY-01**: Spring Boot Dockerfile with layered JAR, React build artifacts in separate stage
- [ ] **DEPLOY-02**: AWS Elastic Beanstalk deployment (t4g.micro, ap-south-1)
- [ ] **DEPLOY-03**: React frontend deployed to S3 + CloudFront (OAI, custom error 404→/index.html)
- [ ] **DEPLOY-04**: Route 53 DNS: A records for apex + www → CloudFront
- [ ] **DEPLOY-05**: ACM TLS cert for bhargeshglobalnex.com + www, auto-renewal
- [ ] **DEPLOY-06**: .co/.in → 301 → .com redirects
- [ ] **DEPLOY-07**: GitHub Actions CI/CD: test on PR, build + deploy on merge to main

### Testing

- [ ] **TEST-01**: Unit tests on Spring Data models + validators (70%+ coverage, JUnit 5, Mockito, Testcontainers)
- [ ] **TEST-02**: Integration tests on controllers (80%+ coverage, Spring MockMvc)
- [ ] **TEST-03**: React component tests (60%+ coverage, Vitest, React Testing Library)
- [ ] **TEST-04**: E2E flow: visitor browses Home → Service → Contact → Submit → Confirmation (Playwright)
- [ ] **TEST-05**: E2E flow: admin login → inquiries → view → mark read → count updates (Playwright)
- [ ] **TEST-06**: E2E flow: admin creates blog post → appears on /blog (Playwright)
- [ ] **TEST-07**: Cross-browser pass: Chrome, Firefox, Safari, Edge (latest 2), iOS Safari, Android Chrome

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Enhanced Admin

- **V2-01**: CSV export of inquiries
- **V2-02**: Rich analytics dashboard beyond stat tiles
- **V2-03**: Multiple admin roles with granular permissions

### User Experience

- **V2-04**: Multi-language / i18n support
- **V2-05**: Live chat or chatbot integration
- **V2-06**: Appointment / consultation booking system

### Integration

- **V2-07**: Google Calendar integration
- **V2-08**: CRM integration (HubSpot, Salesforce)
- **V2-09**: File upload from visitors (resumes, documents)

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Client portal with user login | Not in MVP per PRD §12 — prospects don't create accounts |
| Payment processing | Not required — services invoiced separately |
| Public blog comments / UGC | Staff-curated content only per assumption A4 |
| Native mobile apps | Responsive web sufficient for marketing site |
| Video hosting | Storage/bandwidth cost, not core to consultancy site |
| Multi-branch / multi-location | Single office currently |
| Advanced CRM (pipelines, SLAs) | Simple new/read/archived status sufficient per A3 |
| Dynamic service creation | Exactly 5 services, fixed per assumption A5 |
| Third-party integrations | Not in v1 scope |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| (Populated during roadmap creation) | | |

**Coverage:**
- v1 requirements: 95 total
- Mapped to phases: 0
- Unmapped: 95 ⚠️

---
*Requirements defined: 2026-09-27*
*Last updated: 2026-09-27 after initial definition*
