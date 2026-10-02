# Phase 4: Public & Admin REST APIs - Context

**Gathered:** 2026-09-28
**Status:** Ready for planning
**Source:** PRD Express Path (SmartConnect_Complete_PRD_SpringBoot_v3.md)

<domain>
## Phase Boundary

Implement all 30 REST endpoints (both public and authenticated admin resources) for Bhargesh Patel GlobalNex Private Limited, enforcing:
- Standard success envelope `{ success: true, data: ..., meta: ... }`
- Standard error envelope `{ success: false, error: { code, message, details } }`
- Request validation with Spring Validation & centralized `GlobalExceptionHandler`
- Public endpoints for Services, Blog, Success Stories, Contact Inquiries (with honeypot & IP rate limiting), Pages, Settings, and Health
- Admin CRUD/Management endpoints for Services (edit-only, fixed 5), Blog Posts (full CRUD with draft/published separation), Success Stories (full CRUD), Inquiries inbox (status toggle, search, filtering), Pages, SiteSettings (singleton), and Dashboard Statistics (`/api/admin/stats`).

</domain>

<decisions>
## Implementation Decisions

### 1. Controllers & Route Mapping
All endpoints are nested under the `/api` context path:
- **Public Services Controller** (`/services`): `GET /services`, `GET /services/{slug}`
- **Public Blog Controller** (`/blog`): `GET /blog`, `GET /blog/{slug}`
- **Public Stories Controller** (`/success-stories`): `GET /success-stories`, `GET /success-stories/{slug}`
- **Public Inquiries Controller** (`/inquiries`): `POST /inquiries` (with honeypot validation & 5/hr/IP rate limiting)
- **Public Pages & Settings** (`/pages`, `/settings`): `GET /pages/{slug}`, `GET /settings`
- **Admin Controllers** (`/admin/*`):
  - `AdminServiceController`: `PUT /admin/services/{slug}`
  - `AdminBlogController`: `GET /admin/blog`, `POST /admin/blog`, `PUT /admin/blog/{id}`, `DELETE /admin/blog/{id}`
  - `AdminSuccessStoryController`: `GET /admin/success-stories`, `POST /admin/success-stories`, `PUT /admin/success-stories/{id}`, `DELETE /admin/success-stories/{id}`
  - `AdminInquiryController`: `GET /admin/inquiries`, `GET /admin/inquiries/{id}`, `PATCH /admin/inquiries/{id}`
  - `AdminPageController`: `PUT /admin/pages/{slug}`
  - `AdminSettingsController`: `PUT /admin/settings`
  - `AdminStatsController`: `GET /admin/stats`

### 2. DTOs & Validation
- `InquiryCreateRequest`: `@NotBlank name`, `@NotBlank @Email email`, `phone`, `serviceLabel`, `@NotBlank @Size(min=10, max=2000) message`, `website` (honeypot field), `consent` (boolean).
  - Honeypot logic: If `website` is filled, quietly discard or return 200 without creating DB record or notifying.
- `BlogCreateUpdateRequest`: `@NotBlank title`, `slug` (auto-generated if blank), `excerpt`, `content`, `coverImage`, `author`, `tags`, `status`, `seo`.
- `StoryCreateUpdateRequest`: `clientName`, `slug`, `serviceSlug`, `summary`, `fullStory`, `image`, `outcome`, `status`, `featured`.
- `ServiceUpdateRequest`: `tagline`, `heroImage`, `description`, `offerings`, `process`, `faqs`, `isFeaturedOnHome`, `order`, `seo`.
- `PageContentUpdateRequest`: `title`, `blocks`, `seo`.
- `SiteSettingsUpdateRequest`: `companyName`, `primaryEmail`, `phone`, `address`, `mapEmbedUrl`, `socials`, `departmentEmails`.
- `InquiryStatusUpdateRequest`: `@NotNull InquiryStatus status`.

### 3. Inquiry Rate Limiting
- `InquiryRateLimiter`: Max 5 submissions per hour per IP.

### 4. Admin Dashboard Metrics (`/api/admin/stats`)
- Returns counts: `newInquiries` (`status == NEW`), `totalInquiries`, `publishedPosts` (`status == PUBLISHED`), `publishedStories` (`status == PUBLISHED`).

</decisions>

<canonical_refs>
## Canonical References
- `SmartConnect_Complete_PRD_SpringBoot_v3.md`: Section 6 (REST API Contract, Table 6.1)
- `.planning/REQUIREMENTS.md`: API-01 to API-12, ADMIN-01 to ADMIN-15
- `.planning/ROADMAP.md`: Phase 4
</canonical_refs>
