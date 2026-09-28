# SmartConnect — Complete Product Requirements Document
### Corporate Website for Bhargesh Patel GlobalNex Private Limited
### Spring Boot 3.2 · React 18 · MongoDB · AWS India (ap-south-1)

---

| Field | Value |
|---|---|
| Document version | 3.0 (complete rewrite, Spring Boot path) |
| Project type | MERN variant: React 18 (Vite) + Spring Boot 3.2 + MongoDB + AWS |
| Deployment region | ap-south-1 (Mumbai) |
| Billing | INR via AWS India Pvt Ltd + GST |
| Intended consumer | Development team + AWS infrastructure lead |
| Design language | Endorsement (guilloche, ruled fields, stamp) |
| Source documents | Client: `WEBSITE_REQUIREMENT_DOCUMENT_FOR_GLOBALNEX.pdf` + Academic: `SmartConnect_Project_Documentation_final.docx` |

---

# SECTION 1 — EXECUTIVE SUMMARY

## 1.1 Project objective

Build a professional, responsive corporate website for Bhargesh Patel GlobalNex Private Limited (a multi-service consultancy: Immigration, Study Abroad, Tours & Travels, Export–Import, Business Setup) that:

1. **Centralizes online presence** across five service lines with no prior unified digital infrastructure
2. **Captures leads** via a contact/inquiry form with automatic email routing to department inboxes
3. **Enables content management** without developer involvement (blog, success stories, service descriptions)
4. **Drives SEO visibility** with proper meta tags, semantic HTML, sitemap, and structured data
5. **Performs & scales** on budget infrastructure (AWS free tier + low-cost managed services)

## 1.2 Key constraints

- **Domain:** bhargeshglobalnex.com (primary) + .co/.in (301 redirects)
- **Tech stack:** Spring Boot 3.2 backend · React 18 frontend · MongoDB Atlas · AWS Elastic Beanstalk
- **Launch deadline:** 8 weeks from approval (phased delivery per Section 7)
- **Budget:** ~₹0/month year 1 (AWS free tier), ~₹750/month after (see Section 9)
- **Client input required:** Office address, logo, real copy, success stories (see Section 10)

---

# SECTION 2 — BACKGROUND & CONTEXT

## 2.1 The business

GlobalNex is a consultancy proprietored by Bhargesh Patel, operating five distinct service lines:

1. **Immigration** — Visa route selection, documentation, application support, post-landing assistance
2. **Study Abroad** — University shortlisting, admissions guidance, student visa support, pre-departure briefing
3. **Tours & Travels** — Itinerary planning, travel documentation, booking assistance, group tours
4. **Export–Import** — Trade documentation, IEC/licensing, logistics, buyer/supplier connections
5. **Business Setup** — Company registration, compliance, local/overseas entity setup

All serve domestic (India) and international clients. Currently, there is **no centralized online presence** — inquiries arrive only through personal networks, there is no search-engine visibility, and there is no mechanism to publish updates or showcase past outcomes.

## 2.2 Problem statement

| # | Problem | Current state | Resolved by |
|---|---|---|---|
| P1 | No unified platform presenting all services | Information scattered across informal channels | 11-page responsive website (Section 3) |
| P2 | Prospects cannot submit inquiries online | Phone calls / personal referrals only | Contact form → Inquiry model → email routing (Section 3.11) |
| P3 | No proof of past successes | Testimonials exist only in conversation | Success Stories module with CMS (Section 3.8) |
| P4 | No way to publish updates or thought leadership | Blogs exist nowhere | Blog module with CMS (Section 3.9) |
| P5 | No search-engine visibility | No Google presence | SEO setup: meta tags, sitemap, structured data (Section 3.12) |
| P6 | Service descriptions are generic or missing | Each service needs its own pitch | Dedicated service pages with rich content (Section 3.4–3.8) |

## 2.3 Target users

**Priya — Prospective student, age 21, Ahmedabad**
- Searches on mobile (mid-range Android, 4G)
- Compares 3–4 consultancies, needs clear service explanation + proof others succeeded
- Abandons if load time > 4s or form asks for too much
- Converts via: fast-loading page, clear offer, low-friction inquiry form

**Rajesh — SME business owner, age 44, New Delhi**
- Browses desktop during work hours
- Seeks credibility (real testimonials, not stock photos), specific service detail
- Writes emails to business email addresses, not phone calls
- Converts via: details + "info@" email visibility

**Meera — GlobalNex office staff, age 29, Ahmedabad**
- Non-technical, needs to publish blog posts and success stories without a developer
- Must check new inquiries in a simple inbox
- If the admin panel requires a manual or developer help, it has failed

---

# SECTION 3 — FUNCTIONAL SPECIFICATION

## 3.1 Sitemap & URL routes

| Route | Page | Public? | Data source | SEO index? |
|---|---|---|---|---|
| `/` | Home | Yes | Aggregate: services, blog, stories | Yes |
| `/about-us` | About | Yes | PageContent (slug: about-us) | Yes |
| `/immigration` | Service detail | Yes | Service (slug: immigration) | Yes |
| `/study-abroad` | Service detail | Yes | Service (slug: study-abroad) | Yes |
| `/tours-travels` | Service detail | Yes | Service (slug: tours-travels) | Yes |
| `/export-import` | Service detail | Yes | Service (slug: export-import) | Yes |
| `/business-setup` | Service detail | Yes | Service (slug: business-setup) | Yes |
| `/success-stories` | Story list | Yes | SuccessStory (published, paginated) | Yes |
| `/success-stories/:slug` | Story detail | Yes | SuccessStory | Yes |
| `/blog` | Blog list | Yes | BlogPost (published, paginated) | Yes |
| `/blog/:slug` | Blog detail | Yes | BlogPost | Yes |
| `/contact-us` | Contact | Yes | — | Yes |
| `/privacy-policy` | Legal | Yes | PageContent (slug: privacy-policy) | Yes |
| `/terms` | Legal | Yes | PageContent (slug: terms) | Yes |
| `/admin/login` | Admin login | Public (unauth) | — | No (noindex) |
| `/admin` | Dashboard | Admin only | Stats, recent inquiries | No |
| `/admin/inquiries` | Inbox | Admin only | Inquiry list + detail | No |
| `/admin/blog` | Blog CRUD | Admin only | BlogPost CRUD | No |
| `/admin/success-stories` | Stories CRUD | Admin only | SuccessStory CRUD | No |
| `/admin/services` | Service edit | Admin only | Service content edit | No |
| `*` | 404 | Public | — | No |

**Primary navigation (visible on all pages):**
Home · About Us · Immigration · Study Abroad · Tours & Travels · Export–Import · Business Setup · Success Stories · Blog · Contact Us

Desktop (≥1024px): all items visible, services grouped under "Services" dropdown.
Mobile (<768px): hamburger menu, services in expandable accordion within drawer.

## 3.2 Home page (`/`)

Sections in order:

1. **Hero banner** — H1 headline, subheadline, primary CTA ("Get Free Consultation" → `/contact-us`), secondary CTA ("Explore Services" → scroll to services grid). Full-bleed background with dark overlay. Content `[PLACEHOLDER]` until client provides copy.

2. **Company introduction** — 2–3 sentence positioning statement + "Learn more" link → `/about-us`.

3. **Our Services grid** — 5 ServiceCard components (Immigration, Study Abroad, Tours & Travels, Export–Import, Business Setup), pulled from API, ordered by `Service.order`. Grid: 1 col mobile / 2 col tablet / 3 col desktop. Last card centers or spans.

4. **Why Choose Us** — 4 value props (icon + title + one line). Static or PageContent-driven.

5. **Featured Services** — Services where `isFeaturedOnHome === true`. If none, section hides (no empty state).

6. **Success Stories preview** — Latest 3 published stories as cards + "View all" link → `/success-stories`. Hides if zero published.

7. **Latest Blog Posts** — Latest 3 published posts as cards + "Visit blog" link → `/blog`. Hides if zero published.

8. **Contact CTA band** — Headline + mini-form (Name, Email, Service, Message) posting to `/api/inquiries` with `source: "home-cta"`, OR a CTA button to `/contact-us`. Implement short form.

## 3.3 About Us (`/about-us`)

- Hero strip (page title + breadcrumb)
- Company story / vision / mission / objectives / business philosophy — rich-text block from PageContent
- Optional stats band (years active, clients served, countries covered) — all `[PLACEHOLDER]` until client supplies real numbers. Never fabricate.
- CTA band

## 3.4 Service Detail pages (5 pages, ONE template)

**CRITICAL:** build a single `ServiceDetailPage` component resolved by `:slug` route param. Do NOT author five separate page files.

Template sections:

1. Hero — service name (H1), tagline, hero image, inline CTA
2. Overview — `Service.description` (rich text)
3. What we offer — bulleted list from `Service.offerings[]`
4. Process / How it works — numbered steps from `Service.process[]` (Consultation → Documentation → Application → Follow-up)
5. FAQ accordion — from `Service.faqs[]`. Hides if empty.
6. Inquiry CTA — links to `/contact-us?service=<slug>`, pre-selects that service in the dropdown

Seed content (placeholder-safe, factually neutral):

| Service | Offerings | Process steps |
|---|---|---|
| Immigration | Visa route selection, documentation guidance, application support, post-landing follow-up | 1. Consultation & assessment 2. Documentation preparation 3. Application filing 4. Follow-up & approval |
| Study Abroad | University shortlisting, admissions support, student visa guidance, pre-departure briefing | 1. University selection 2. Application prep 3. Admission support 4. Visa processing 5. Pre-departure |
| Tours & Travels | Itinerary planning, travel documentation, booking assistance, group tours | 1. Itinerary design 2. Document gathering 3. Booking & confirmation 4. Pre-travel briefing |
| Export–Import | Trade documentation, IEC/licensing, logistics coordination, buyer/supplier introductions | 1. IEC registration guidance 2. Compliance setup 3. Documentation & logistics 4. Buyer/supplier connect |
| Business Setup | Company registration guidance, compliance advisory, local/overseas entity setup | 1. Entity & structure planning 2. Registration assistance 3. Compliance setup 4. Operational readiness |

## 3.5 Success Stories (`/success-stories`, `/success-stories/:slug`)

**List view:**
- Responsive grid: 9 per page, pagination
- Each card: image (or initial-letter avatar fallback), client name/alias, service tag chip, 2-line summary excerpt, "Read story →"
- Filter chips by service (client-side filter or API `?service=<slug>`)
- Empty state: friendly message + CTA to Contact. Never render broken empty grid.

**Detail view:**
- Cover image, H1 title, service tag, author/date (if applicable), full story (rich text)
- "Back to stories" link, related posts (latest 3 excluding current)

## 3.6 Blog (`/blog`, `/blog/:slug`)

**List view:**
- Card grid, 9 per page, pagination
- Card: cover image, title, excerpt (max 140 chars), published date, read-time estimate
- Only `status === 'published'` posts visible

**Detail view:**
- Cover image, H1 title, author + date + read time, rich-text body with proper typography, "Back to blog" link, related posts (latest 3 excluding current)
- Draft posts return 404 on public routes

## 3.7 Contact Us (`/contact-us`)

**Form fields:**

| Field | Type | Required | Validation |
|---|---|---|---|
| Full Name | text | Yes | 2–80 chars, letters/spaces/.'- only |
| Email | email | Yes | RFC-ish, max 120 chars |
| Phone | tel | Yes | 8–15 digits, optional leading `+`, spaces/dashes stripped |
| Service Interested In | select | Yes | Must match known Service slug or "general" |
| Message | textarea | Yes | 10–2000 chars |
| `website` (honeypot) | hidden | — | Must be empty; if filled → return 200 but discard |
| Consent | checkbox | Yes | "I agree to be contacted regarding my inquiry" |

**Behaviour:**
- Client-side validation on blur + submit; inline error messages via `aria-describedby`
- Submit button disabled + spinner while in-flight
- Success: confirmation panel ("Thank you — we'll respond within 1 business day") + option to send another
- Failure: error banner, form values preserved, retry allowed
- Pre-fill service from `?service=<slug>` query param

**Also on page:**
- Contact info: `info@bhargeshglobalnex.com`, department emails, phone `[PLACEHOLDER]`, office address `[PLACEHOLDER]`
- Google Map embed — conditionally rendered only if `VITE_MAP_EMBED_URL` configured; absence must not leave broken iframe
- Business hours `[PLACEHOLDER]`

## 3.8 Legal pages (`/privacy-policy`, `/terms`)

- Static/editable via PageContent model
- No special styling beyond standard prose
- Link in footer

## 3.9 Admin panel (`/admin/*`)

### 3.9.1 Login (`/admin/login`)
- Email + password form
- Generic error on invalid (no user enumeration)
- Redirect to `/admin` on success

### 3.9.2 Dashboard (`/admin`)
- 4 stat tiles: New Inquiries, Total Inquiries, Published Posts, Published Stories
- Recent 5 inquiries table (date, name, email, service, status)
- Quick actions: "View all inquiries", "New blog post", "New story"

### 3.9.3 Inquiries (`/admin/inquiries`)
- Table: date, name, email, service, status
- Row click → detail drawer (full message, status toggle new/read/archived)
- Filters: status, service
- Search: by name/email
- CSV export (nice-to-have)

### 3.9.4 Blog (`/admin/blog`)
- List + status badges (draft/published)
- Create/edit form: title, auto-slug with override, excerpt, cover image URL, rich-text content, author, status, publishedAt
- Delete with confirm dialog

### 3.9.5 Success Stories (`/admin/success-stories`)
- Same pattern as Blog

### 3.9.6 Services (`/admin/services`)
- Edit-only (no create/delete; exactly 5 fixed)
- Per service: tagline, description, offerings list, process steps, FAQs, hero image URL, featured toggle, order, SEO

---

# SECTION 4 — DESIGN LANGUAGE (Endorsement)

### Core principle
Five unrelated businesses share one output: **a stamped, official document** (visa, admission letter, ticket, IEC certificate, incorporation). So the site is built from that object: guilloche engraving, ruled fields, ledger rows, serial numbers, ink, and one stamp.

### Palette (from physical objects)

| Token | Hex | Reference |
|---|---|---|
| `ink` | `#152238` | Iron-gall ink, all type + primary buttons |
| `ink-2` | `#33445F` | Diluted ink, secondary text |
| `ink-3` | `#6B7A92` | Faded ink, serials, hints, captions |
| `bond` | `#EDEFE8` | Cool bond paper, page background |
| `paper` | `#F5F6F1` | Fresh sheet, raised surfaces |
| `field` | `#DDE2DA` | Form tint block, focused input fill |
| `rule` | `#C3C8BC` | Printed rules, all borders/dividers |
| `seal` | `#B0332B` | Oxblood stamp ink, focus rings, accents |
| `brass` | `#A8843C` | Embossed seal foil, guilloche, numbers |
| `veridian` | `#1F5D4C` | Passport green, success states |

**Dark mode:** Ink negative — background `#0E1725`, surfaces `#141F30`, type `#E7EAE2`, rules `#2A3648`, seal/brass lifted for contrast.

### Typography

- **Fraunces** (display, serif, variable) — headlines at 900 weight with `WONK` 1 axis (engraved letterforms). H1: 64–84px, H2: 40–64px, H3: 19px. Letter-spacing -0.022em on H1.
- **Public Sans** (body, sans-serif) — designed for government documents. 17px body, line-height 1.62, max-width 63ch.
- **Courier Prime** (monospace) — reference numbers, serials, filing codes only. 11–12px.

Banned moves: tracked-out all-caps eyebrow labels (caps appear in stamp only), single-word emphasis in headlines, middle-dot-joined meta strings, `→` appended to links.

### Layout

Every page is a **64px margin rail + content column**, split by vertical rule. Rail carries figure numbers in Courier Prime (FIG. 01, etc.). Collapses to horizontal rule below 720px.

Sections: `py-16 lg:py-24`. Container: `max-width: 1180px`, padding `0 20px`. Border-radius: `2px` globally.

### Components

- **Services are ledger rows, not cards.** Entry number (brass), service name (Fraunces), one-line description (Public Sans), right column naming the document (Courier Prime). Hover fills row with `field` color.
- **Inputs are ruled fields.** Single `1.5px` baseline rule, no box. Focus inks rule to `seal` and fills with `field`. Labels above in `ink-2`, 13px.
- **Buttons** are 2px-radius rectangles. Primary: solid `ink`, border `1.5px`. Hover: translate `-1px, -1px` + hard `3px 3px 0` offset in `seal`.
- **Motion budget:** One moment only — stamp lands on home hero (scale 1.9 → 1, rotate -30° → -13°) over 620ms, delay 450ms. Everything else responds to user action only.

---

# SECTION 5 — DATA MODELS (MongoDB / Spring Data)

### 5.1 Service

```
slug: String (unique, indexed, lowercase)
name: String
tagline: String
icon: String (lucide-react icon name)
heroImage: String (URL or relative path)
description: String (markdown or sanitized HTML)
offerings: List<String>
process: List<{ step: Int, title: String, detail: String }>
faqs: List<{ question: String, answer: String }>
isFeaturedOnHome: Boolean (default: false)
order: Integer (indexed, default: 0)
seo: { title: String, metaDescription: String, ogImage: String }
createdAt: LocalDateTime (auto)
updatedAt: LocalDateTime (auto)
```

### 5.2 BlogPost

```
slug: String (unique, indexed, lowercase)
title: String
excerpt: String (max 300)
content: String (sanitized HTML)
coverImage: String (URL)
author: String (default: "GlobalNex Team")
tags: List<String> (lowercase)
status: Enum [DRAFT, PUBLISHED] (indexed)
publishedAt: LocalDateTime (indexed, auto-set on PUBLISHED transition)
readTimeMin: Integer (auto-computed on save: ceil(wordCount / 200))
seo: { title, metaDescription, ogImage }
createdAt: LocalDateTime (auto)
updatedAt: LocalDateTime (auto)
```

Pre-save hook: compute readTime when status transitions to PUBLISHED, set publishedAt to now.

### 5.3 SuccessStory

```
slug: String (unique, indexed)
clientName: String (may be alias for privacy)
serviceRef: ObjectId, ref: Service
summary: String (max 300)
fullStory: String (rich text)
image: String (URL)
outcome: String (max 160, e.g., "Student visa approved")
status: Enum [DRAFT, PUBLISHED] (indexed)
featured: Boolean (default: false)
createdAt: LocalDateTime (auto)
```

### 5.4 Inquiry

```
name: String (required)
email: String (lowercase, indexed)
phone: String (digits only)
serviceRef: ObjectId, ref: Service (nullable)
serviceLabel: String (denormalized: "immigration", "general", etc.)
message: String (required, 10–2000 chars)
status: Enum [NEW, READ, ARCHIVED] (indexed)
source: String (default: "contact-page", e.g., "home-cta")
ipHash: String (hashed for rate-limit forensics)
userAgent: String
notifiedAt: LocalDateTime (null until email sent)
createdAt: LocalDateTime (indexed, auto)
```

**Compound index:** `{ status: 1, createdAt: -1 }`.

### 5.5 AdminUser

```
name: String
email: String (unique, lowercase, indexed)
passwordHash: String (bcrypt, cost 12, never serialized)
role: Enum [CONTENT_ADMIN, SUPER_ADMIN] (default: CONTENT_ADMIN)
isActive: Boolean (default: true)
lastLoginAt: LocalDateTime
createdAt: LocalDateTime (auto)
```

### 5.6 PageContent

```
slug: String (unique, indexed)  // 'about-us', 'privacy-policy', 'terms'
title: String
blocks: List<{ key: String, heading: String, body: String }>  // body is sanitized HTML
seo: { title, metaDescription }
createdAt: LocalDateTime (auto)
```

### 5.7 SiteSettings

```
id: String  // singleton: "default"
companyName: String (default: "Bhargesh Patel GlobalNex Private Limited")
primaryEmail: String (default: "info@bhargeshglobalnex.com")
phone: String (may be empty)
address: String (may be empty; if empty, Google Map hides)
mapEmbedUrl: String (if empty, Map hides)
socials: Map<String, String>  // facebook, instagram, linkedin, twitter, youtube (empty entries hide)
departmentEmails: List<{ label: String, email: String }>
createdAt: LocalDateTime (auto)
updatedAt: LocalDateTime (auto)
```

---

# SECTION 6 — REST API CONTRACT

**Base URL:** `/api`

**Success response envelope:**
```json
{
  "success": true,
  "data": { /* object or array */ },
  "meta": { "total": 42, "page": 1, "pageSize": 9, "totalPages": 5 }
}
```

**Error response envelope:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human-readable message",
    "details": [{"field":"email","message":"Invalid email"}]
  }
}
```

**Error codes:** `VALIDATION_ERROR` (400) · `UNAUTHORIZED` (401) · `FORBIDDEN` (403) · `NOT_FOUND` (404) · `RATE_LIMITED` (429) · `SERVER_ERROR` (500).

**Pagination:** all list endpoints accept `?page=1&limit=9` (max 50), return meta with `total`, `page`, `pageSize`, `totalPages`.

### 6.1 Endpoints

| # | Method | Route | Auth | Description |
|---|---|---|---|---|
| 1 | GET | `/health` | Public | `{status:'ok', uptime, db:'connected'}` |
| 2 | GET | `/services` | Public | List all; `?featured=true` to filter |
| 3 | GET | `/services/:slug` | Public | Service detail; 404 if unknown |
| 4 | PUT | `/services/:slug` | Admin | Partial update |
| 5 | GET | `/blog` | Public | Published posts, paginated; `?tag=`, `?page=`, `?limit=` |
| 6 | GET | `/blog/:slug` | Public | Published post detail; draft → 404 |
| 7 | GET | `/admin/blog` | Admin | All posts (incl. drafts) |
| 8 | POST | `/admin/blog` | Admin | Create post; auto-slug if omitted |
| 9 | PUT | `/admin/blog/:id` | Admin | Update post |
| 10 | DELETE | `/admin/blog/:id` | Admin | Delete post |
| 11 | GET | `/success-stories` | Public | Published stories, paginated; `?service=<slug>` |
| 12 | GET | `/success-stories/:slug` | Public | Story detail |
| 13 | GET | `/admin/success-stories` | Admin | All stories (incl. drafts) |
| 14 | POST | `/admin/success-stories` | Admin | Create story |
| 15 | PUT | `/admin/success-stories/:id` | Admin | Update story |
| 16 | DELETE | `/admin/success-stories/:id` | Admin | Delete story |
| 17 | POST | `/inquiries` | Public (rate-limited) | Submit contact form; honeypot check; send email |
| 18 | GET | `/admin/inquiries` | Admin | List inquiries; `?status=`, `?service=`, `?q=`, `?page=` |
| 19 | GET | `/admin/inquiries/:id` | Admin | Inquiry detail |
| 20 | PATCH | `/admin/inquiries/:id` | Admin | Update status only |
| 21 | POST | `/auth/login` | Public (rate-limited) | Email + password → JWT |
| 22 | POST | `/auth/logout` | Admin | Clear session/token |
| 23 | GET | `/auth/me` | Admin | Current user profile |
| 24 | GET | `/pages/:slug` | Public | Page content (about-us, privacy-policy, terms) |
| 25 | PUT | `/admin/pages/:slug` | Admin | Update page content |
| 26 | GET | `/settings` | Public | Public-safe subset (no internal fields) |
| 27 | PUT | `/admin/settings` | Admin | Update company info, emails, socials |
| 28 | GET | `/admin/stats` | Admin | Dashboard tile counts |
| 29 | GET | `/sitemap.xml` | Public | Dynamically generated |
| 30 | GET | `/robots.txt` | Public | Disallows `/admin` |

---

# SECTION 7 — BUILD PLAN (9 PHASES)

### Phase 0 — Foundation (Weeks 1–2)

| Task | Owner | Deliverable |
|---|---|---|
| Spring Boot 3.2 + React project scaffold | Backend dev | Repo structure, Maven + Vite, ESLint/Prettier, git init |
| Tailwind CSS + design tokens setup | Frontend dev | All color/type/spacing tokens from Endorsement language applied |
| MongoDB Atlas M0 cluster (ap-south-1) | Infra | Cluster provisioned, connection tested, seed script created |
| Environment config + secrets management | Infra | `.env.example` committed, bootstrap admin seeded with temp password |
| GitHub Actions workflow skeleton | DevOps | CI/CD pipeline for test + build on every push |
| **DoD:** App boots locally (`mvn spring-boot:run` + `npm run dev`), no errors. `/api/health` returns 200. MongoDB connected. |

### Phase 1 — Backend Data Layer (Weeks 2–3)

| Task | Owner | Deliverable |
|---|---|---|
| Mongoose/Spring Data models + indices | Backend dev | All 7 models (Service, BlogPost, SuccessStory, Inquiry, AdminUser, PageContent, SiteSettings) with validation, pre-save hooks |
| Repositories (Spring Data MongoDB) | Backend dev | All 7 repository interfaces with custom query methods |
| Seed scripts (idempotent) | Backend dev | seedServices.java, seedAdmin.java, seedPages.java, seedDemo.java; all safe to run twice |
| Unit tests (70%+ coverage on models) | Backend dev / QA | Model validation, pre-save hook logic, repository queries |
| **DoD:** All CRUD operations work in tests. `mvn test` passes. Seed scripts are idempotent. |

### Phase 2 — Authentication & Security (Weeks 3–4)

| Task | Owner | Deliverable |
|---|---|---|
| JWT token provider + validation | Backend dev | JwtTokenProvider class: generate, validate, extract claims. No hardcoded secrets. |
| Spring Security config | Backend dev | SecurityConfig: public routes open, `/admin/*` protected, password encoding (bcrypt 12), CORS configured |
| Login endpoint | Backend dev | POST `/auth/login`: email + password → JWT in httpOnly cookie |
| Logout + me endpoints | Backend dev | POST `/auth/logout`, GET `/auth/me` with validation |
| Rate limiter middleware | Backend dev | `/auth/login` max 10/15min/IP, `/api/inquiries` max 5/1hr/IP |
| **DoD:** Invalid creds return generic 401. Valid login issues token. Protected routes reject unauthenticated requests. Token expiry enforced. |

### Phase 3 — Public APIs (Weeks 4–5)

| Task | Owner | Deliverable |
|---|---|---|
| Service endpoints (GET /, GET /:slug, PUT /:slug) | Backend dev | All three working, 404 on unknown slug, pagination on list |
| Blog endpoints (GET /, GET /:slug, POST, PUT, DELETE) | Backend dev | Published vs draft separation, readTime computed, timestamps managed |
| Stories endpoints (GET /, GET /:slug, POST, PUT, DELETE) | Backend dev | Same pattern as blog |
| Inquiry endpoint (POST, GET list, GET :id, PATCH status) | Backend dev | Validation, honeypot check, email send (async), rate limiting, status update |
| Pages + Settings endpoints (GET, PUT) | Backend dev | Singleton pattern for SiteSettings, CRUD for PageContent |
| Input validation + error handling | Backend dev | Zod/Spring Validation on all writes, centralized exception handler, proper HTTP status codes |
| **DoD:** All endpoints return correct response envelope. Pagination works. Draft posts hidden publicly. Drafts return 404 on direct routes. Email notifications sent (or logged if SMTP not configured). |

### Phase 4 — Email & Notifications (Week 5)

| Task | Owner | Deliverable |
|---|---|---|
| JavaMailSender config (SES integration) | Backend dev | Spring Mail configured for SES on ap-south-1, templates for inquiry email |
| Department email routing | Backend dev | Inquiries routed to immigration@, education@, travel@, exports@, or info@ based on service |
| Async send (fire-and-forget) | Backend dev | EmailService.sendInquiryNotificationAsync() doesn't block request, logs errors |
| Email templates | Backend dev | HTML + plaintext templates for inquiry notification, welcome email |
| **DoD:** Inquiry submission triggers email. Email arrives in correct inbox. Request completes even if email fails. Failure logged. |

### Phase 5 — Frontend Shell & Routing (Weeks 5–6)

| Task | Owner | Deliverable |
|---|---|---|
| React Router setup | Frontend dev | All 20 routes defined (public + admin), lazy loading per route, NotFoundPage catch-all |
| AuthContext + login state management | Frontend dev | Bootstraps `/auth/me` on app mount, redirects to login on 401, persists session |
| API client (axios wrapper) | Frontend dev | BaseURL from env, withCredentials: true, response interceptor normalizes envelope and handles 401 |
| Common UI components | Frontend dev | Button, Input, Select, Textarea, Card, Badge, Spinner, Pagination, EmptyState, ErrorState, Modal, Accordion, SectionHeading, Breadcrumb |
| Layout components | Frontend dev | Navbar (sticky, desktop nav + mobile drawer), Footer (4 cols, email aliases, socials, copyright), Breadcrumb |
| ProtectedRoute wrapper | Frontend dev | Redirects unauthenticated users to login, guards `/admin/*` |
| **DoD:** All 20 routes render without errors. Mobile drawer works. Protected routes redirect properly. No 404s on direct URL entry. Responsive at all 4 breakpoints (360, 768, 1024, 1440). |

### Phase 6 — Public Pages (Weeks 6–7)

| Task | Owner | Deliverable |
|---|---|---|
| Home page | Frontend dev | Hero + intro + services grid + why choose us + featured + stories + blog + CTA form, all wired to API |
| About Us | Frontend dev | Rich-text from PageContent, optional stats band |
| Service Detail template | Frontend dev | Single reusable component for all 5 services (immigration, study-abroad, etc.), all sections from model |
| Success Stories list + detail | Frontend dev | Grid + pagination, service filter, detail view with back link, empty state |
| Blog list + detail | Frontend dev | Card grid, pagination, detail with prose styling, related posts, read-time estimate |
| Contact Us form | Frontend dev | Full form per spec, validation, honeypot, consent, success confirmation, error handling, pre-fill from query param |
| Legal pages (privacy, terms) | Frontend dev | Static content from PageContent |
| 404 page | Frontend dev | Branded error, nav still visible, helpful links back |
| **DoD:** All 11 public routes load real data from API. Forms submit successfully. No hardcoded content (everything from API). Images lazy-load. No horizontal overflow at any breakpoint. Lighthouse a11y ≥ 90. |

### Phase 7 — Admin Panel (Week 7)

| Task | Owner | Deliverable |
|---|---|---|
| Admin login page | Frontend dev | Email + password form, error display, redirect on success |
| Admin dashboard | Frontend dev | 4 stat tiles, recent inquiries table, quick-action links |
| Inquiries CRUD | Frontend dev | List + detail drawer, status toggle, filters, search, CSV export (optional) |
| Blog CRUD | Frontend dev | List + create/edit form (title, slug, excerpt, content, cover, status, publish date), delete with confirm |
| Stories CRUD | Frontend dev | Same pattern as blog |
| Services edit | Frontend dev | Edit-only forms (no create/delete), all fields updatable, offerings/process/FAQs array editors |
| **DoD:** Non-developer can publish a blog post and see it live on `/blog` without a redeploy. All CRUD operations work. Forms pre-populate on edit. Deletes require confirm. |

### Phase 8 — SEO, Performance, Hardening (Week 8)

| Task | Owner | Deliverable |
|---|---|---|
| Meta tags per page | Frontend dev | Unique title + description on all 11 public routes (via Helmet or React-Helmet-Async), canonical tags, OG + Twitter tags |
| Sitemap + robots.txt | Backend dev | Dynamic sitemap.xml including all published posts/stories, robots.txt disallows `/admin` |
| Structured data | Frontend dev | Schema.org: Organization on home, Article on blog posts, LocalBusiness on service pages, BreadcrumbList on inner pages |
| Performance optimization | Frontend dev | Code-splitting, image lazy-loading, font preload, bundle analysis, remove unused deps |
| Security hardening | Backend dev / Frontend dev | Spring Security CSP config (no unsafe-inline), helmet.js on Express equivalent, cookie flags verified, rate limits tested, dep audit |
| Lighthouse audit | QA | Performance ≥ 85, SEO ≥ 90, a11y ≥ 90 on Home, one service page, one blog post |
| **DoD:** Sitemap validates as XML, includes all published slugs. Robots respects noindex rules. Lighthouse scores meet targets. CSP strict, no unsafe directives in prod. Dependency audit clean. |

### Phase 9 — Testing & Deployment (Week 8)

| Task | Owner | Deliverable |
|---|---|---|
| Unit + integration tests | Backend dev / QA | Jest + Spring MockMvc, 70%+ coverage on controllers/services, test DB (Testcontainers) |
| Component tests | Frontend dev | Vitest + React Testing Library, form validation, Pagination, ProtectedRoute |
| E2E tests (Playwright) | QA | 3 flows: (a) browse Home → Services → Submit inquiry → see confirmation; (b) admin login → sees inquiry → marks read; (c) admin creates blog post → appears on `/blog` |
| Cross-browser manual pass | QA | Chrome, Firefox, Safari, Edge (latest 2 versions), iOS Safari, Android Chrome. TEST_REPORT.md signed off. |
| Docker build | DevOps | Spring Boot layered JAR in Dockerfile, React build artifacts in separate stage, test locally |
| AWS deployment (Elastic Beanstalk + S3 + CloudFront) | Infra / DevOps | Deploy API to EB (ap-south-1), frontend to S3, CloudFront distribution, Route 53 records (Primary domain + redirects), ACM certs, SES sandbox exit |
| GitHub Actions pipeline | DevOps | Test on PR, build + deploy on merge to main, S3 upload + CloudFront invalidation, deployment notifications |
| **DoD:** E2E flows pass headless. Cross-browser report signed off. Production URL serves HTTPS on primary domain. `.co`/`.in` → 301 → `.com`. `/api/health` green. |

---

# SECTION 8 — TECHNICAL ARCHITECTURE

### 8.1 Backend (Spring Boot 3.2)

**Structure:**
```
server/
├── src/main/java/com/globalnex/
│   ├── SmartConnectApiApplication.java
│   ├── config/ (MongoDB, Security, Mail, Web)
│   ├── controller/ (7 resource controllers)
│   ├── model/ (7 @Document classes)
│   ├── repository/ (7 MongoRepository interfaces)
│   ├── service/ (business logic)
│   ├── dto/ (request/response wrappers)
│   ├── security/ (JWT, auth filters)
│   ├── exception/ (custom exceptions, global handler)
│   ├── validator/ (input validation)
│   └── util/ (slugify, sanitize, pagination, rate limit)
├── src/test/java/ (unit + integration tests)
├── .ebextensions/ (EB config files)
└── pom.xml
```

**Key dependencies:**
- Spring Boot 3.2 (web, data-mongodb, security)
- JJWT (JSON Web Tokens)
- Jakarta Validation (Bean Validation)
- Spring Mail (JavaMailSender)
- OWASP HTML Sanitizer (for rich-text content)
- Lombok (annotations)
- MongoDB Java driver (via spring-data-mongodb)

**Security model:**
- JWT in httpOnly, SameSite=Strict, Secure cookie (prod only)
- Bcrypt 12 for passwords, never serialized
- CORS restricted to CLIENT_ORIGIN
- Input validation (Zod-like using Spring Validation)
- Rate limiting on login + inquiry endpoints
- CSRF disabled (stateless API)

### 8.2 Frontend (React 18 + Vite + Tailwind)

**Structure:**
```
client/
├── src/
│   ├── components/
│   │   ├── layout/ (Navbar, Footer, MobileDrawer)
│   │   ├── common/ (Button, Input, Card, etc.)
│   │   ├── home/ (Hero, ServicesGrid, CTA)
│   │   ├── cards/ (ServiceCard, BlogCard, StoryCard)
│   │   └── admin/ (DataTable, RichTextEditor, etc.)
│   ├── pages/ (11 public + 5 admin)
│   ├── context/ (AuthContext, SettingsContext)
│   ├── hooks/ (useFetch, usePagination, useAuth)
│   ├── api/ (axios client, service wrappers)
│   ├── utils/ (formatDate, slugify, validators)
│   ├── routes/ (AppRoutes, ProtectedRoute)
│   ├── App.jsx
│   └── main.jsx
├── tailwind.config.js (Endorsement tokens)
├── vite.config.js
└── package.json
```

**Key dependencies:**
- React 18, React Router v6
- Vite (fast dev server + build)
- Tailwind CSS v3 + @tailwindcss/typography
- Axios (HTTP client)
- React Helmet Async (meta tags)
- TipTap or React Quill (rich-text editor for admin)
- Lucide React (icons)

**Code splitting:** Route-level lazy loading with Suspense to keep main bundle < 250KB gzipped.

### 8.3 Database (MongoDB Atlas M0, ap-south-1)

**Connection:**
- `mongodb+srv://smartconnect-app:[PASSWORD]@cluster0.region.mongodb.net/?retryWrites=true&w=majority`
- Shared M0 cluster (free forever, 512MB storage, shared backup)
- Network access restricted to Elastic Beanstalk security group (production)

**Indices:**
- Service: unique on `slug`, index on `order`
- BlogPost: unique on `slug`, index on `status` + `publishedAt`
- SuccessStory: unique on `slug`, index on `status`
- Inquiry: compound index `{status, createdAt}`, index on `email`
- AdminUser: unique on `email`
- PageContent: unique on `slug`

**Backups:** Atlas automatic daily backups (free tier, 7-day retention).

### 8.4 Deployment (AWS ap-south-1)

**Compute:** Elastic Beanstalk (t4g.micro EC2, free for 12 months, then ~₹500/mo)
- Single instance, auto-scaling from 1–2 instances
- Health checks every 30s
- Auto-rollback on failed deployment
- IAM role for CloudWatch logs

**Frontend:** S3 + CloudFront
- S3 bucket blocks public access (CloudFront via OAI only)
- CloudFront distribution with 24h cache for static assets, 1h for index.html
- Custom error: 404 → /index.html (client-side routing)
- HTTPS via ACM (free)

**Database:** MongoDB Atlas M0
- Same region (ap-south-1 for minimal latency)
- Network access from EB security group only (production)
- Automated backups

**Email:** Amazon SES
- ap-south-1 endpoint
- Free tier: 3,000 emails/month from EC2
- Production access (exited sandbox)
- SMTP credentials in EB environment variables

**DNS:** Route 53
- Hosted zone for bhargeshglobalnex.com
- A records: apex + www → CloudFront
- `.co` / `.in` redirects managed at registrar level (301 Redirect)

**TLS:** AWS Certificate Manager
- Free managed certificate for bhargeshglobalnex.com + www
- Auto-renewal
- Attached to CloudFront + EB HTTPS listener

---

# SECTION 9 — COST ESTIMATION (India, INR)

### Year 1 (with AWS free tier)

| Service | Component | Free tier | Y1 cost |
|---|---|---|---|
| EC2 (t4g.micro) | 750 hrs/month × 12 | ₹0 | ₹0 |
| MongoDB Atlas M0 | Unlimited, shared cluster | ₹0 | ₹0 |
| S3 + CloudFront | 5GB S3, 1TB CloudFront transfer | ~₹0–500 | ~₹500 |
| Route 53 | Hosted zone | ~₹500 | ~₹500 |
| SES | 3,000 emails/month | ₹0 | ₹0 |
| ACM (TLS certs) | Managed certificates | ₹0 | ₹0 |
| **Total Y1** | | | **~₹1,000** |

### Year 2+ (after free tier expires)

| Service | Cost/month | Annual |
|---|---|---|
| EC2 t4g.micro | ~₹500 | ~₹6,000 |
| MongoDB Atlas M0 | ₹0 (forever free) | ₹0 |
| S3 + CloudFront | ~₹200 | ~₹2,400 |
| Route 53 | ~₹35 | ~₹420 |
| SES | ₹0 (within free 3k/mo) | ₹0 |
| ACM | ₹0 | ₹0 |
| **Total/month** | **~₹735** | **~₹8,820/year** |

**Scaling:** if traffic grows and M0 hits limits (~1M docs/yr), upgrade to M10 (~₹3,500/mo). API + frontend scaling happens automatically on EB + CloudFront.

---

# SECTION 10 — CLIENT INPUT REQUIRED

These items must be supplied by the client (Bhargesh Patel / GlobalNex team). Without them, deployment is incomplete.

| # | Item | Placeholder | Deadline | Blocks |
|---|---|---|---|---|
| 1 | Office address + geo-coordinates (lat/lng) | address `[PLACEHOLDER]`, map hidden | Week 1 | Contact page, LocalBusiness schema |
| 2 | Contact phone number(s) | phone `[PLACEHOLDER]` | Week 1 | Contact page, footer |
| 3 | Logo (SVG preferred, PNG fallback) + brand colors | text wordmark only | Week 1 | Navbar, favicon, OG image |
| 4 | Hero image / photography (service pages, home) | neutral licensed placeholder | Week 2 | Home, service pages |
| 5 | Company copy (story, vision, mission, objectives) | `[PLACEHOLDER]` blocks | Week 3 | About Us page |
| 6 | Real success stories (client names/aliases + outcomes, with consent) | `[DEMO]` fixtures, unpublished | Week 4 | Success Stories module |
| 7 | Social media profile URLs (if any) | empty; icons hidden if absent | Week 2 | Footer |
| 8 | SES SMTP credentials (if using SES for email) | test mode logs only | Week 5 | Email notifications |
| 9 | Business hours / operating days | `[PLACEHOLDER]` | Week 3 | Contact page |
| 10 | AWS billing address (for INR + GST invoice) | — | Week 1 | Deployment setup |
| 11 | Privacy policy + terms (legal review required) | `[PLACEHOLDER]` | Week 6 | Legal pages |
| 12 | GA4 measurement ID (optional) | omitted | Week 7 | Analytics tag |

**Process:** Send client this list immediately upon kickoff. Track each item's arrival. No production deployment until items 1, 3, 5, 6, 10, 11 are received.

---

# SECTION 11 — TESTING MATRIX

### Unit & Integration tests (developer responsibility)

| Component | Coverage target | Tools |
|---|---|---|
| Spring Data models + validators | 70%+ | JUnit 5, Mockito, Testcontainers |
| Service business logic | 70%+ | JUnit 5, Mockito |
| Controllers (all endpoints) | 80%+ | Spring MockMvc, Supertest-equivalent |
| React components (form, pagination, auth) | 60%+ | Vitest, React Testing Library |

### E2E tests (QA responsibility)

| Flow | Steps | Tool |
|---|---|---|
| Visitor inquiry | Home → Service → Contact form → Submit → Confirmation | Playwright |
| Admin inquiry review | Login → Inquiries → View new → Mark read → Refresh → Updated count | Playwright |
| Admin publish post | Login → Blog → Create post → Fill form → Publish → Navigate to `/blog` → See post | Playwright |

### Manual cross-browser (QA responsibility)

| Browser | Desktop | Tablet | Mobile | Notes |
|---|---|---|---|---|
| Chrome | Latest | ≥ 2 back | ≥ 2 back | Focus, scroll perf |
| Firefox | Latest | ≥ 2 back | ≥ 2 back | CSS compatibility |
| Safari | Latest | ≥ 2 back | ≥15 | Webkit quirks |
| Edge | Latest | — | — | Chromium-based |
| iOS Safari | — | iPad OS ≥15 | iOS ≥15 | Viewport, input types |
| Android Chrome | — | — | Latest | Touch, orientation |

### Manual accessibility check (QA responsibility)

- [ ] Keyboard navigation (Tab, Enter, Esc, arrow keys)
- [ ] Screen reader (NVDA or JAWS on Windows, VoiceOver on Mac)
- [ ] Color contrast (4.5:1 body, 3:1 large text) via WCAG checker
- [ ] Form labels + error messaging + aria-describedby
- [ ] Focus indicators visible on all interactive elements
- [ ] No empty headings or heading-level skips

### Lighthouse audit (automated + manual review)

| Metric | Target | Tool |
|---|---|---|
| Performance (mobile, Home page) | ≥ 85 | Chrome DevTools Lighthouse |
| SEO (mobile) | ≥ 90 | Chrome DevTools Lighthouse |
| Accessibility | ≥ 90 | Chrome DevTools Lighthouse + axe |

---

# SECTION 12 — OUT OF SCOPE (explicit boundary)

The following are **NOT** included in this project (per the client's own requirement doc §17 and the academic doc's Future Enhancements). They require separate scope + quotation if requested post-launch:

- Client portal with user login (prospects creating their own accounts)
- Appointment / consultation booking system
- Live chat or chatbot integration
- Payment processing of any kind (booking payments, service payments)
- Multi-language / i18n (site currently English-only)
- Public blog comments or user-generated content
- Advanced inquiry management workflow (CRM pipelines, assignment, SLAs, automated follow-ups)
- Native mobile apps (iOS / Android)
- Integration with third-party services (Google Calendar, Slack, HubSpot, Salesforce)
- Video hosting or embedded video players
- File upload from visitors (resumes, documents, transcripts)
- Multi-branch / multi-location support (currently one office, one set of services)
- Advanced analytics dashboards beyond GA4 tag

These are designed-for (clean API boundaries, role-based schema, service-driven data model) but not built now.

---

# SECTION 13 — ASSUMPTIONS & OPEN QUESTIONS

| # | Assumption | Rationale | Confirm? |
|---|---|---|---|
| A1 | .co / .in domains already registered (or via Route 53) | Client mentioned them in requirement doc | Yes |
| A2 | Bhargesh Patel is the sole decision-maker for content | No mention of multi-person approval | Yes |
| A3 | Inquiries don't need a sophisticated CRM workflow (status: new/read/archived only) | Source doc doesn't mention pipelines or assignment | Yes |
| A4 | Blog posts / success stories are curated by staff, not submitted by end-users | "Admin panel" implies staff edit | Yes |
| A5 | 5 services are fixed (no dynamic service creation by admin) | Source doc lists exactly 5 | Yes |
| A6 | SES sandbox will be exited before launch | Required for production email | Yes |
| A7 | EB will be configured with auto-scaling (1–2 instances) | Low-traffic marketing site, no need for fixed multi-instance setup | Confirm during infra planning |

---

# SECTION 14 — DEPLOYMENT CHECKLIST

Before production launch, verify:

- [ ] DNS propagation confirmed (nslookup + WHOIS)
- [ ] HTTPS working on all routes (no mixed-content warnings)
- [ ] `/api/health` endpoint responds with db status
- [ ] Contact form submission succeeds and email arrives
- [ ] Admin login works with bootstrap credentials
- [ ] React frontend loads and API requests work (Network tab, no CORS errors)
- [ ] MongoDB connection confirmed (EB logs show "MongoDB connected")
- [ ] CloudFront cache invalidation working (changes appear within 5 min)
- [ ] SES exited sandbox + production access confirmed
- [ ] `.co` / `.in` domains return 301 to `.com`
- [ ] All 11 public pages load with real data (not errors, not placeholders)
- [ ] Lighthouse Performance ≥ 85, SEO ≥ 90, a11y ≥ 90 on Home + 1 service page
- [ ] Cross-browser smoke test: Chrome, Firefox, Safari (desktop + mobile)
- [ ] Inquiry reaches the correct department inbox per service selection
- [ ] Admin can create a blog post and see it live on `/blog` within 1 min
- [ ] Success stories, blog posts, and inquiries persist across server restart

---

# SECTION 15 — POST-LAUNCH MAINTENANCE

### Weekly
- Monitor EB health dashboard for errors
- Spot-check inquiries arrive correctly
- Verify CloudFront cache is updating properly

### Monthly
- Review Lighthouse scores (target: maintain ≥ 85 Perf, ≥ 90 SEO)
- Check CloudWatch logs for auth failures or validation errors
- Audit MongoDB storage usage (if approaching M0 512MB limit, plan migration to M10)

### Quarterly
- Review Google Search Console for crawl errors
- Audit dependency versions (npm audit, Maven security check)
- Test disaster recovery (restore from MongoDB backup)

### Ad-hoc
- Add new success stories / blog posts as they arrive
- Update service descriptions if offerings change
- Rotate admin passwords every 6 months
- Review SES bounce/complaint metrics, update suppression list if needed

---

# APPENDIX A — ENDORSEMENT DESIGN TOKENS

For Tailwind configuration:

```js
colors: {
  ink: { DEFAULT: '#152238', 2: '#33445F', 3: '#6B7A92' },
  bond: '#EDEFE8',
  paper: '#F5F6F1',
  field: '#DDE2DA',
  rule: '#C3C8BC',
  seal: '#B0332B',
  brass: '#A8843C',
  veridian: '#1F5D4C',
}
fontFamily: {
  display: ['Fraunces', 'Georgia', 'serif'],
  body: ['Public Sans', 'system-ui', 'sans-serif'],
  serial: ['Courier Prime', 'ui-monospace', 'monospace'],
}
borderRadius: { DEFAULT: '2px' }
boxShadow: { press: '3px 3px 0 #B0332B' }
```

---

# APPENDIX B — ENVIRONMENT VARIABLES

### `server/.env` (Spring Boot)

```
SPRING_PROFILES_ACTIVE=prod
MONGODB_URI=mongodb+srv://smartconnect-app:[PASSWORD]@cluster0.ap-south-1.mongodb.net/?retryWrites=true&w=majority
JWT_SECRET=[strong-32-char-random-string]
JWT_EXPIRATION=604800
ADMIN_BOOTSTRAP_EMAIL=admin@bhargeshglobalnex.com
ADMIN_BOOTSTRAP_PASSWORD=[temp-password]
CLIENT_ORIGIN=https://bhargeshglobalnex.com
PUBLIC_SITE_URL=https://bhargeshglobalnex.com
MAIL_ENABLED=true
MAIL_HOST=email-smtp.ap-south-1.amazonaws.com
MAIL_PORT=587
MAIL_USER=[SES-SMTP-user]
MAIL_PASS=[SES-SMTP-password]
MAIL_FROM=noreply@bhargeshglobalnex.com
NOTIFY_FALLBACK_TO=info@bhargeshglobalnex.com
SERVER_PORT=5000
```

### `client/.env` (React/Vite)

```
VITE_API_BASE_URL=https://bhargeshglobalnex.com/api
VITE_SITE_URL=https://bhargeshglobalnex.com
VITE_MAP_EMBED_URL=
VITE_GA_MEASUREMENT_ID=
```

---

*SmartConnect Product Requirements Document v3.0 — Spring Boot path, AWS India, Endorsement design language. Authority: Bhargesh Patel GlobalNex Private Limited. Prepared: September 2026. Final sign-off required before Phase 0 kickoff.*
