# Phase 2: Data Models & Seed Scripts - Context

**Gathered:** 2026-09-28
**Status:** Ready for planning
**Source:** PRD Express Path (SmartConnect_Complete_PRD_SpringBoot_v3.md)

<domain>
## Phase Boundary

Implement all 7 MongoDB data models (`@Document`), sub-documents, repositories (`MongoRepository`), lifecycle event listeners (e.g. BlogPost `readTimeMin` calculation & `publishedAt` auto-timestamping), MongoDB index definitions, and an idempotent database seeder (`CommandLineRunner` / database seeding service) that initializes:
1. The 5 fixed GlobalNex services (`immigration`, `study-abroad`, `tours-travels`, `export-import`, `business-setup`) with full offerings, step-by-step processes, and FAQs.
2. Initial Super Admin user (`admin@globalnex.com` / hashed password) if no admin exists.
3. Singleton `SiteSettings` document (`id: "default"`).
4. Static `PageContent` documents (`about-us`, `privacy-policy`, `terms`).
5. Initial sample/demo blog posts and success stories.

</domain>

<decisions>
## Implementation Decisions

### 1. Model Structure & Annotations (`com.globalnex.model`)
- **Service**: `@Document(collection = "services")`
  - Fields: `id`, `slug` (unique indexed), `name`, `tagline`, `icon`, `heroImage`, `description`, `offerings` (`List<String>`), `process` (`List<ProcessStep>`), `faqs` (`List<FaqItem>`), `isFeaturedOnHome` (`boolean`), `order` (indexed, `int`), `seo` (`SeoMetadata`), `createdAt`, `updatedAt`.
- **BlogPost**: `@Document(collection = "blog_posts")`
  - Fields: `id`, `slug` (unique indexed), `title`, `excerpt` (max 300), `content` (HTML), `coverImage`, `author` (default: "GlobalNex Team"), `tags` (`List<String>`), `status` (`PostStatus` enum: `DRAFT`, `PUBLISHED`, indexed), `publishedAt` (`LocalDateTime`, indexed), `readTimeMin` (`Integer`), `seo` (`SeoMetadata`), `createdAt`, `updatedAt`.
  - Lifecycle: `BlogPostEventListener` / `@BeforeConvert` listener computes `readTimeMin = Math.max(1, (int) Math.ceil(wordCount / 200.0))` and sets `publishedAt` when status becomes `PUBLISHED` if null.
- **SuccessStory**: `@Document(collection = "success_stories")`
  - Fields: `id`, `slug` (unique indexed), `clientName`, `serviceSlug` / `serviceRef`, `summary`, `fullStory`, `image`, `outcome`, `status` (`PostStatus`: `DRAFT`, `PUBLISHED`), `featured` (`boolean`), `createdAt`, `updatedAt`.
- **Inquiry**: `@Document(collection = "inquiries")`
  - Fields: `id`, `name`, `email` (indexed), `phone`, `serviceRef`, `serviceLabel`, `message` (10-2000 chars), `status` (`InquiryStatus`: `NEW`, `READ`, `ARCHIVED`), `source` (default: "contact-page"), `ipHash`, `userAgent`, `notifiedAt`, `createdAt`, `updatedAt`.
  - Compound index: `@CompoundIndex(name = "status_createdAt_idx", def = "{'status': 1, 'createdAt': -1}")`.
- **AdminUser**: `@Document(collection = "admin_users")`
  - Fields: `id`, `name`, `email` (unique indexed), `passwordHash` (`@JsonIgnore`), `role` (`Role`: `CONTENT_ADMIN`, `SUPER_ADMIN`), `isActive` (`boolean`), `lastLoginAt`, `createdAt`, `updatedAt`.
- **PageContent**: `@Document(collection = "page_contents")`
  - Fields: `id`, `slug` (unique indexed), `title`, `blocks` (`List<ContentBlock>`), `seo` (`SeoMetadata`), `createdAt`, `updatedAt`.
- **SiteSettings**: `@Document(collection = "site_settings")`
  - Singleton `id = "default"`.
  - Fields: `id`, `companyName`, `primaryEmail`, `phone`, `address`, `mapEmbedUrl`, `socials` (`Map<String, String>`), `departmentEmails` (`List<DepartmentEmail>`), `createdAt`, `updatedAt`.

### 2. Repositories (`com.globalnex.repository`)
- Extend `MongoRepository<T, String>` for all 7 entities.
- Custom query methods with pagination and sorting (e.g., `findBySlug`, `findByStatusOrderByPublishedAtDesc`, `findByStatusOrderByCreatedAtDesc`, `existsByEmail`).

### 3. Idempotent Data Seeder (`com.globalnex.seed.DatabaseSeeder`)
- Runs automatically on startup if collections are empty or missing default data.
- Ensures the 5 core services exist and match PRD definitions without creating duplicates if run repeatedly.
- Seeds default `SiteSettings` with singleton ID `"default"`.
- Seeds default pages (`about-us`, `privacy-policy`, `terms`).
- Seeds default admin user (`admin@globalnex.com` / `Admin@12345`) using `BCryptPasswordEncoder(12)` only if no admin user exists.

</decisions>

<canonical_refs>
## Canonical References
- `SmartConnect_Complete_PRD_SpringBoot_v3.md`: Sections 2.1, 3.4, 5.1-5.7, 7 (Phase 1)
- `.planning/REQUIREMENTS.md`: DATA-01 through DATA-09
- `.planning/ROADMAP.md`: Phase 2
</canonical_refs>
