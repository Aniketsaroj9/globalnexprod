# Roadmap: SmartConnect

**Created:** 2026-09-27
**Granularity:** Fine
**Total phases:** 10
**Total requirements:** 95

## Milestone 1: SmartConnect v1

### Phase 1: Project Foundation & Scaffold
**Goal:** Bootstrap Spring Boot + React projects with Endorsement design tokens, MongoDB connection, and dev tooling.
**Requirements:** FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05, FOUND-06, FOUND-07
**Depends on:** —
**UI hint:** no

**Success criteria:**
1. `mvn spring-boot:run` starts without errors, `/api/health` returns 200 with db status
2. `npm run dev` starts React app with Endorsement design tokens applied (ink/bond/seal colors visible)
3. MongoDB Atlas M0 connected from Spring Boot (connection test passes)
4. Dark mode toggle renders correct token values
5. ESLint + Prettier pass on all files

---

### Phase 2: Data Models & Seed Scripts
**Goal:** Implement all 7 MongoDB document models with validation, indices, pre-save hooks, and idempotent seed scripts.
**Requirements:** DATA-01, DATA-02, DATA-03, DATA-04, DATA-05, DATA-06, DATA-07, DATA-08, DATA-09
**Depends on:** Phase 1
**UI hint:** no

**Success criteria:**
1. All 7 models (@Document classes) created with proper field annotations, validation constraints, and indices
2. BlogPost pre-save hook computes readTimeMin and sets publishedAt on status transition
3. Seed scripts are idempotent — running twice produces same state
4. All indices created (verified via MongoDB Compass or shell)
5. `mvn test` passes with model validation tests

---

### Phase 3: Authentication & Security
**Goal:** Implement JWT auth flow, Spring Security config, rate limiting, and CORS.
**Requirements:** AUTH-01, AUTH-02, AUTH-03, AUTH-04, AUTH-05, AUTH-06, AUTH-07, AUTH-08, SEC-01, SEC-02, SEC-04
**Depends on:** Phase 2
**UI hint:** no

**Success criteria:**
1. POST `/api/auth/login` with valid creds returns JWT in httpOnly cookie
2. Invalid creds return generic 401 (no user enumeration)
3. Protected routes reject unauthenticated requests with 401
4. Rate limiter blocks 11th login attempt within 15 minutes from same IP
5. CORS rejects requests from non-whitelisted origins

---

### Phase 4: Public & Admin REST APIs
**Goal:** Build all 30 REST endpoints with validation, pagination, and response envelope pattern.
**Requirements:** API-01, API-02, API-03, API-04, API-05, API-06, API-07, API-08, API-09, API-10, API-11, API-12, ADMIN-01, ADMIN-02, ADMIN-03, ADMIN-04, ADMIN-05, ADMIN-06, ADMIN-07, ADMIN-08, ADMIN-09, ADMIN-10, ADMIN-11, ADMIN-12, ADMIN-13, ADMIN-14, ADMIN-15
**Depends on:** Phase 3
**UI hint:** no

**Success criteria:**
1. All 30 endpoints return correct response envelope `{success, data, meta}` or `{success, error}`
2. Public blog endpoint hides drafts; direct draft slug returns 404
3. Inquiry POST validates all fields, rejects honeypot-filled submissions silently (200 but discards)
4. Pagination works on all list endpoints with correct meta (total, page, pageSize, totalPages)
5. Input validation rejects malformed data with structured error details

---

### Phase 5: Email Notifications
**Goal:** Configure SES email with department routing and async send for inquiry notifications.
**Requirements:** MAIL-01, MAIL-02, MAIL-03, MAIL-04, MAIL-05
**Depends on:** Phase 4
**UI hint:** no

**Success criteria:**
1. Inquiry for "immigration" service triggers email to immigration@ department inbox
2. Email contains formatted HTML template with inquiry details
3. API response returns before email delivery completes (async)
4. Failed email send logs error but doesn't fail the inquiry submission
5. notifiedAt timestamp set on successful email delivery

---

### Phase 6: Frontend Shell & Common Components
**Goal:** Build React app shell with routing, auth context, API client, layout (navbar/footer), and all reusable UI components.
**Requirements:** SHELL-01, SHELL-02, SHELL-03, SHELL-04, SHELL-05, SHELL-06, SHELL-07, SHELL-08
**Depends on:** Phase 3
**UI hint:** yes

**Success criteria:**
1. All 20 routes render without errors (including direct URL entry)
2. Mobile drawer opens/closes, services expand in accordion within drawer
3. ProtectedRoute redirects unauthenticated user to `/admin/login`
4. Navbar sticky on scroll, footer renders 4 columns with social icons (hidden if no URL)
5. All common components (Button, Input, Card, Modal, Accordion, etc.) render with Endorsement styling

---

### Phase 7: Public Pages
**Goal:** Build all 11 public-facing pages wired to real API data with Endorsement design language.
**Requirements:** HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, HOME-06, HOME-07, HOME-08, ABOUT-01, ABOUT-02, ABOUT-03, SERV-01, SERV-02, SERV-03, SERV-04, SERV-05, SERV-06, SERV-07, STORY-01, STORY-02, STORY-03, STORY-04, BLOG-01, BLOG-02, BLOG-03, BLOG-04, CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, CONT-06, CONT-07, CONT-08, LEGAL-01, LEGAL-02, LEGAL-03
**Depends on:** Phase 6, Phase 4
**UI hint:** yes

**Success criteria:**
1. Home page renders all 8 sections with real API data; empty sections (stories, blog) hide gracefully
2. Single ServiceDetailPage component renders all 5 services by slug (not 5 separate files)
3. Contact form validates on blur, submits successfully, shows confirmation, pre-fills from `?service=` param
4. Blog and Success Stories pagination works, filter by service works on stories
5. All pages responsive at 360, 768, 1024, 1440px with no horizontal overflow

---

### Phase 8: Admin Panel
**Goal:** Build complete admin panel with dashboard, inquiries, blog/stories CRUD, and services editor.
**Requirements:** APANEL-01, APANEL-02, APANEL-03, APANEL-04, APANEL-05, APANEL-06, APANEL-07
**Depends on:** Phase 6, Phase 4
**UI hint:** yes

**Success criteria:**
1. Non-developer (Meera persona) can publish a blog post and see it live on `/blog` without redeploy
2. Inquiry status toggle (new→read→archived) persists and updates dashboard count
3. Services editor saves changes to all fields (offerings[], process[], faqs[] array editors work)
4. Delete operations require confirmation dialog
5. Forms pre-populate on edit with existing data

---

### Phase 9: SEO, Performance & Hardening
**Goal:** Add meta tags, structured data, sitemap, performance optimizations, and security hardening.
**Requirements:** SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, SEO-06, PERF-01, PERF-02, PERF-03, PERF-04, PERF-05, SEC-03, SEC-05
**Depends on:** Phase 7, Phase 8
**UI hint:** no

**Success criteria:**
1. Every public page has unique meta title + description (verify via View Source)
2. sitemap.xml includes all published blog/story/service slugs, validates as XML
3. robots.txt disallows /admin
4. Lighthouse: Performance ≥ 85, SEO ≥ 90, Accessibility ≥ 90 on Home + 1 service page
5. Main bundle < 250KB gzipped, images lazy-load

---

### Phase 10: Testing & Deployment
**Goal:** Achieve test coverage targets, run E2E flows, cross-browser testing, and deploy to AWS.
**Requirements:** TEST-01, TEST-02, TEST-03, TEST-04, TEST-05, TEST-06, TEST-07, DEPLOY-01, DEPLOY-02, DEPLOY-03, DEPLOY-04, DEPLOY-05, DEPLOY-06, DEPLOY-07
**Depends on:** Phase 9
**UI hint:** no

**Success criteria:**
1. `mvn test` passes with 70%+ model/service coverage, 80%+ controller coverage
2. All 3 E2E Playwright flows pass headlessly
3. Cross-browser smoke test passes on Chrome, Firefox, Safari, Edge (desktop + mobile)
4. Production URL serves HTTPS on bhargeshglobalnex.com, `/api/health` returns green
5. GitHub Actions deploys on merge to main, CloudFront invalidation works

---

## Phase Summary

| # | Phase | Requirements | Depends on |
|---|-------|-------------|------------|
| 1 | Project Foundation & Scaffold | 7 | — |
| 2 | Data Models & Seed Scripts | 9 | Phase 1 |
| 3 | Authentication & Security | 11 | Phase 2 |
| 4 | Public & Admin REST APIs | 27 | Phase 3 |
| 5 | Email Notifications | 5 | Phase 4 |
| 6 | Frontend Shell & Common Components | 8 | Phase 3 |
| 7 | Public Pages | 37 | Phase 6, Phase 4 |
| 8 | Admin Panel | 7 | Phase 6, Phase 4 |
| 9 | SEO, Performance & Hardening | 13 | Phase 7, Phase 8 |
| 10 | Testing & Deployment | 14 | Phase 9 |

**Total requirements mapped:** 95 ✓ (138 requirement-phase assignments, some requirements span multiple phases via dependencies)

---
*Created: 2026-09-27*
*Last updated: 2026-09-27 after initial creation*
