# Summary: Phase 2 Plan 1 — Data Models, Repositories, Lifecycle Hooks & Seeders

**Plan:** 02-01
**Status:** Completed
**Executed:** 2026-09-28

## Deliverables Created
1. **Enums & Embedded Documents (`com.globalnex.model`)**:
   - `enums/PostStatus.java` (`DRAFT`, `PUBLISHED`)
   - `enums/InquiryStatus.java` (`NEW`, `READ`, `ARCHIVED`)
   - `enums/UserRole.java` (`CONTENT_ADMIN`, `SUPER_ADMIN`)
   - `SeoMetadata.java`, `ProcessStep.java`, `FaqItem.java`, `ContentBlock.java`, `DepartmentEmail.java`
2. **7 MongoDB Document Entities (`com.globalnex.model`)**:
   - `Service.java`: `slug` (unique indexed), `name`, `tagline`, `icon`, `heroImage`, `description`, `offerings[]`, `process[]`, `faqs[]`, `isFeaturedOnHome`, `order` (indexed), `seo`, timestamps.
   - `BlogPost.java`: `slug` (unique indexed), `title`, `excerpt`, `content`, `coverImage`, `author`, `tags[]`, `status`, `publishedAt`, `readTimeMin`, `seo`, timestamps. Compound index `{status: 1, publishedAt: -1}`.
   - `SuccessStory.java`: `slug` (unique indexed), `clientName`, `serviceSlug`, `summary`, `fullStory`, `image`, `outcome`, `status`, `featured`, timestamps. Compound index `{status: 1, createdAt: -1}`.
   - `Inquiry.java`: `name`, `email` (indexed), `phone`, `serviceRef`, `serviceLabel`, `message`, `status`, `source`, `ipHash`, `userAgent`, `notifiedAt`, timestamps. Compound index `{status: 1, createdAt: -1}`.
   - `AdminUser.java`: `name`, `email` (unique indexed), `passwordHash` (`@JsonIgnore`), `role`, `isActive`, `lastLoginAt`, timestamps.
   - `PageContent.java`: `slug` (unique indexed), `title`, `blocks[]`, `seo`, timestamps.
   - `SiteSettings.java`: Singleton pattern with ID `"default"`, company name, official emails, address, and social links.
3. **Lifecycle Listener (`com.globalnex.listener`)**:
   - `BlogPostModelListener.java`: Automatically computes `readTimeMin = max(1, ceil(wordCount / 200))` and sets `publishedAt` on publication.
4. **Spring Data Repositories (`com.globalnex.repository`)**:
   - `ServiceRepository`, `BlogPostRepository`, `SuccessStoryRepository`, `InquiryRepository`, `AdminUserRepository`, `PageContentRepository`, `SiteSettingsRepository`.
5. **Idempotent Data Seeder (`com.globalnex.seed`)**:
   - `DatabaseSeeder.java`: Seeds all 5 core services (Immigration, Study Abroad, Tours & Travels, Export-Import, Business Setup), default singleton `SiteSettings`, static pages (`about-us`, `privacy-policy`, `terms`), super admin (`admin@globalnex.com`), and initial sample blog & success story data.
6. **Automated Unit Tests**:
   - `BlogPostModelListenerTest.java` verifying read-time computation and publication timestamping.

## Requirements Addressed
- **DATA-01**: Service document model with offerings, process, faqs, order, and SEO.
- **DATA-02**: BlogPost document model with auto-computed readTimeMin and publishedAt hook.
- **DATA-03**: SuccessStory document model with serviceRef and outcome.
- **DATA-04**: Inquiry document model with compound index `{status, createdAt}`.
- **DATA-05**: AdminUser document model with bcrypt password hash ignored on serialize.
- **DATA-06**: PageContent document model for static and dynamic rich pages.
- **DATA-07**: SiteSettings singleton document pattern with ID `"default"`.
- **DATA-08**: All unique and compound indices configured.
- **DATA-09**: Idempotent seed scripts created.
