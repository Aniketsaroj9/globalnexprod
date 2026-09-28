package com.globalnex.seed;

import com.globalnex.model.*;
import com.globalnex.model.enums.InquiryStatus;
import com.globalnex.model.enums.PostStatus;
import com.globalnex.model.enums.UserRole;
import com.globalnex.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@Component
@RequiredArgsConstructor
public class DatabaseSeeder implements CommandLineRunner {

    private final ServiceRepository serviceRepository;
    private final AdminUserRepository adminUserRepository;
    private final PageContentRepository pageContentRepository;
    private final SiteSettingsRepository siteSettingsRepository;
    private final BlogPostRepository blogPostRepository;
    private final SuccessStoryRepository successStoryRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        log.info("Starting database verification and idempotent seeding...");
        seedServices();
        seedSiteSettings();
        seedPages();
        seedAdminUser();
        seedSampleBlog();
        seedSampleStories();
        log.info("Database seeding completed successfully.");
    }

    private void seedServices() {
        if (serviceRepository.count() == 5) {
            log.info("Services already fully seeded (5/5).");
            return;
        }

        List<Service> services = List.of(
            Service.builder()
                .slug("immigration")
                .name("Immigration Services")
                .tagline("Visa route selection, documentation guidance, application support, and post-landing follow-up.")
                .icon("Compass")
                .heroImage("/assets/services/immigration-hero.webp")
                .description("GlobalNex provides end-to-end legal and documentation support for permanent residency, work permits, and settlement across leading global destinations including Canada, UK, Australia, Europe, and UAE.")
                .offerings(List.of(
                    "Eligibility assessment and visa category selection",
                    "Complete document preparation, translation, and notarization",
                    "Embassy application filing and case monitoring",
                    "Pre-landing preparations and post-arrival settlement assistance"
                ))
                .process(List.of(
                    new ProcessStep(1, "Consultation & Assessment", "Detailed profile assessment to identify the optimal visa route."),
                    new ProcessStep(2, "Documentation Preparation", "Comprehensive verification and compilation of civil and financial records."),
                    new ProcessStep(3, "Application Filing", "Official submission with relevant immigration departments and embassies."),
                    new ProcessStep(4, "Follow-up & Approval", "Continuous status tracking through to final visa issuance and landing support.")
                ))
                .faqs(List.of(
                    new FaqItem("How long does the immigration process take?", "Processing times vary significantly by country and visa category, ranging from 3 to 12 months on average."),
                    new FaqItem("Are consultation fees refundable if ineligible?", "Our initial assessment identifies feasibility prior to entering into formal filing contracts.")
                ))
                .isFeaturedOnHome(true)
                .order(1)
                .seo(new SeoMetadata("Immigration & Visa Consultancy | GlobalNex", "Expert visa filing, documentation, and permanent residency solutions.", "/og/immigration.png"))
                .build(),

            Service.builder()
                .slug("study-abroad")
                .name("Study Abroad Consultancy")
                .tagline("University shortlisting, admissions guidance, student visa support, and pre-departure briefings.")
                .icon("GraduationCap")
                .heroImage("/assets/services/study-abroad-hero.webp")
                .description("Comprehensive education advisory connecting ambitious students with accredited universities across the US, UK, Canada, Australia, Germany, and Ireland.")
                .offerings(List.of(
                    "University shortlisting matched to academic & budget goals",
                    "Statement of Purpose (SOP) and Letter of Recommendation (LOR) guidance",
                    "Scholarship and financial aid application assistance",
                    "Student visa interview coaching and pre-departure briefings"
                ))
                .process(List.of(
                    new ProcessStep(1, "University Selection", "Targeting top-ranked institutions and eligible programs."),
                    new ProcessStep(2, "Application Preparation", "Drafting compelling essays, portfolios, and academic dossiers."),
                    new ProcessStep(3, "Admission Confirmation", "Securing offer letters, CAS/I-20, and fee transfers."),
                    new ProcessStep(4, "Visa Processing", "Flawless student visa application and biometric scheduling.")
                ))
                .faqs(List.of(
                    new FaqItem("Can you assist with language test preparations?", "We provide guidance on IELTS, TOEFL, GRE, and PTE requirements and benchmarks."),
                    new FaqItem("When should I start applying for intake sessions?", "We recommend starting 8 to 10 months prior to your target intake semester.")
                ))
                .isFeaturedOnHome(true)
                .order(2)
                .seo(new SeoMetadata("Study Abroad & Admissions | GlobalNex", "Guaranteed university shortlisting, scholarships, and student visas.", "/og/study.png"))
                .build(),

            Service.builder()
                .slug("tours-travels")
                .name("Tours & Travels")
                .tagline("Itinerary planning, travel documentation, booking assistance, and curated group tours.")
                .icon("Plane")
                .heroImage("/assets/services/travel-hero.webp")
                .description("Bespoke travel management for corporate delegations, leisure excursions, family vacations, and custom overseas itineraries.")
                .offerings(List.of(
                    "Customized international and domestic holiday itineraries",
                    "Tourist visa filing and express appointment assistance",
                    "Flight bookings, verified luxury & boutique accommodations",
                    "Comprehensive international travel insurance coverage"
                ))
                .process(List.of(
                    new ProcessStep(1, "Itinerary Design", "Crafting a bespoke travel plan matching dates, budget, and interests."),
                    new ProcessStep(2, "Document Gathering", "Preparing tourist visa applications, insurance, and travel vouchers."),
                    new ProcessStep(3, "Booking & Confirmation", "Locking in flights, hotels, transfers, and excursions."),
                    new ProcessStep(4, "Pre-Travel Briefing", "Delivering travel packs, emergency contacts, and local guidelines.")
                ))
                .faqs(List.of(
                    new FaqItem("Do you arrange group tours for corporate clients?", "Yes, we organize bespoke corporate incentive tours, conferences, and exhibitions.")
                ))
                .isFeaturedOnHome(true)
                .order(3)
                .seo(new SeoMetadata("International Tours & Travel Management | GlobalNex", "Tailored leisure and corporate travel, tourist visas, and flights.", "/og/travel.png"))
                .build(),

            Service.builder()
                .slug("export-import")
                .name("Export–Import Consultancy")
                .tagline("Trade documentation, IEC/licensing, logistics coordination, and buyer/supplier linkages.")
                .icon("Ship")
                .heroImage("/assets/services/export-import-hero.webp")
                .description("Strategic trade consultancy empowering enterprises to establish global export-import channels with full regulatory compliance and customs clearance.")
                .offerings(List.of(
                    "Importer-Exporter Code (IEC) registration & RCMC certification",
                    "Customs clearance, HS Code classification, and tariff advisory",
                    "International logistics, freight forwarding, and container tracking",
                    "Verified overseas buyer and supplier introductions"
                ))
                .process(List.of(
                    new ProcessStep(1, "IEC Registration Guidance", "Obtaining DGFT licenses and export authorizations."),
                    new ProcessStep(2, "Compliance Setup", "Ensuring standard packaging, labeling, and duty structure adherence."),
                    new ProcessStep(3, "Documentation & Logistics", "Bill of Lading, Certificate of Origin, and export invoice generation."),
                    new ProcessStep(4, "Buyer/Supplier Connect", "Connecting shipments to vetted international trade counterparties.")
                ))
                .faqs(List.of(
                    new FaqItem("What documents are required to obtain an IEC?", "PAN card, bank certificate or canceled cheque, and proof of firm address.")
                ))
                .isFeaturedOnHome(true)
                .order(4)
                .seo(new SeoMetadata("Export-Import & DGFT Trade Advisory | GlobalNex", "IEC registration, customs documentation, and global trade logistics.", "/og/export.png"))
                .build(),

            Service.builder()
                .slug("business-setup")
                .name("Business Setup Advisory")
                .tagline("Company registration guidance, compliance advisory, local and overseas entity setup.")
                .icon("Building2")
                .heroImage("/assets/services/business-setup-hero.webp")
                .description("Turnkey corporate formation and regulatory compliance services for establishing Private Limited companies, LLPs, and overseas subsidiary branches.")
                .offerings(List.of(
                    "Company incorporation (Pvt Ltd, LLP, OPC, Section 8)",
                    "Overseas business expansion (Dubai/UAE mainland/freezones, UK, US LLC)",
                    "GST, MSME, Trademark, and regulatory licensing",
                    "Ongoing annual secretarial compliance and tax filings"
                ))
                .process(List.of(
                    new ProcessStep(1, "Entity Structure Planning", "Selecting the right corporate legal form based on tax and liability needs."),
                    new ProcessStep(2, "Registration Assistance", "Name reservation, DSC/DIN, and drafting Articles/Memorandum."),
                    new ProcessStep(3, "Compliance Setup", "Procuring PAN/TAN, GST registration, and corporate bank accounts."),
                    new ProcessStep(4, "Operational Readiness", "Delivering incorporation certificates and business starter kits.")
                ))
                .faqs(List.of(
                    new FaqItem("Can foreign nationals register a company in India?", "Yes, through FDI compliant routes with designated resident directors.")
                ))
                .isFeaturedOnHome(true)
                .order(5)
                .seo(new SeoMetadata("Company Registration & Business Setup | GlobalNex", "Incorporate Pvt Ltd, LLP, and overseas entities with expert guidance.", "/og/business.png"))
                .build()
        );

        for (Service svc : services) {
            if (!serviceRepository.existsBySlug(svc.getSlug())) {
                serviceRepository.save(svc);
                log.info("Seeded service: {}", svc.getName());
            }
        }
    }

    private void seedSiteSettings() {
        if (siteSettingsRepository.findById("default").isPresent()) {
            return;
        }

        Map<String, String> socials = new HashMap<>();
        socials.put("linkedin", "https://linkedin.com/company/bhargesh-globalnex");
        socials.put("facebook", "https://facebook.com/bhargeshglobalnex");
        socials.put("instagram", "https://instagram.com/bhargeshglobalnex");

        List<DepartmentEmail> deptEmails = List.of(
            new DepartmentEmail("Immigration Department", "immigration@bhargeshglobalnex.com"),
            new DepartmentEmail("Study Abroad Advisory", "education@bhargeshglobalnex.com"),
            new DepartmentEmail("Tours & Travels Desk", "travel@bhargeshglobalnex.com"),
            new DepartmentEmail("Export–Import Trade", "exports@bhargeshglobalnex.com"),
            new DepartmentEmail("General Inquiries", "info@bhargeshglobalnex.com")
        );

        SiteSettings settings = SiteSettings.builder()
            .id("default")
            .companyName("Bhargesh Patel GlobalNex Private Limited")
            .primaryEmail("info@bhargeshglobalnex.com")
            .phone("+91 98765 43210")
            .address("Regd. Office: 402 Global House, Ashram Road, Ahmedabad, Gujarat 380009, India")
            .socials(socials)
            .departmentEmails(deptEmails)
            .build();

        siteSettingsRepository.save(settings);
        log.info("Seeded default SiteSettings.");
    }

    private void seedPages() {
        if (!pageContentRepository.existsBySlug("about-us")) {
            pageContentRepository.save(PageContent.builder()
                .slug("about-us")
                .title("About Bhargesh Patel GlobalNex")
                .blocks(List.of(
                    new ContentBlock("intro", "Who We Are", "Bhargesh Patel GlobalNex Private Limited is a distinguished multi-service consultancy delivering premier advisory across immigration, overseas education, corporate logistics, export-import trade, and business incorporation."),
                    new ContentBlock("mission", "Our Mission", "To empower individuals and enterprises with transparent, legally sound, and streamlined pathways to achieve their global aspirations."),
                    new ContentBlock("philosophy", "Our Philosophy", "Built on the principle of Endorsement: every client engagement culminates in an official, stamped credential of success.")
                ))
                .seo(new SeoMetadata("About Us | GlobalNex Consultancy", "Learn about Bhargesh Patel GlobalNex Private Limited and our values.", null))
                .build());
            log.info("Seeded about-us page.");
        }

        if (!pageContentRepository.existsBySlug("privacy-policy")) {
            pageContentRepository.save(PageContent.builder()
                .slug("privacy-policy")
                .title("Privacy Policy")
                .blocks(List.of(
                    new ContentBlock("overview", "Data Protection Policy", "GlobalNex respects your privacy and adheres to applicable data protection regulations. We do not sell or rent personal information to third parties.")
                ))
                .seo(new SeoMetadata("Privacy Policy | GlobalNex", "Our privacy standards and client information protection.", null))
                .build());
            log.info("Seeded privacy-policy page.");
        }

        if (!pageContentRepository.existsBySlug("terms")) {
            pageContentRepository.save(PageContent.builder()
                .slug("terms")
                .title("Terms & Conditions")
                .blocks(List.of(
                    new ContentBlock("agreement", "Terms of Service", "By using this website or engaging our consultancy services, you agree to comply with our stated operational terms and policies.")
                ))
                .seo(new SeoMetadata("Terms of Service | GlobalNex", "General terms and conditions for GlobalNex services.", null))
                .build());
            log.info("Seeded terms page.");
        }
    }

    private void seedAdminUser() {
        if (adminUserRepository.count() == 0) {
            AdminUser admin = AdminUser.builder()
                .name("Bhargesh Patel")
                .email("admin@globalnex.com")
                .passwordHash(passwordEncoder.encode("Admin@12345"))
                .role(UserRole.SUPER_ADMIN)
                .isActive(true)
                .build();
            adminUserRepository.save(admin);
            log.info("Seeded default Super Admin: admin@globalnex.com");
        }
    }

    private void seedSampleBlog() {
        if (blogPostRepository.count() == 0) {
            BlogPost post = BlogPost.builder()
                .slug("navigating-international-student-visas-2026")
                .title("Navigating International Student Visas in 2026: Key Policy Updates")
                .excerpt("A breakdown of recent regulatory updates for student visas in the UK, Canada, and Australia, and what prospective applicants must prepare.")
                .content("<p>International education remains one of the most rewarding investments for ambitious students. In 2026, immigration departments across destination countries have introduced updated financial verification guidelines...</p><p>Key checklist items include demonstrating liquid funds for tuition and 12 months living expenses, verified English proficiency scores, and authentic statement of purpose essays.</p>")
                .author("Bhargesh Patel")
                .tags(List.of("study-abroad", "visa-guide", "education"))
                .status(PostStatus.PUBLISHED)
                .publishedAt(LocalDateTime.now())
                .readTimeMin(3)
                .seo(new SeoMetadata("Student Visa Updates 2026 | GlobalNex Blog", "Comprehensive guide on student visa policies for top international destinations.", null))
                .build();
            blogPostRepository.save(post);
            log.info("Seeded sample blog post.");
        }
    }

    private void seedSampleStories() {
        if (successStoryRepository.count() == 0) {
            SuccessStory story = SuccessStory.builder()
                .slug("rohit-sharma-canada-pr-success")
                .clientName("Rohit S.")
                .serviceSlug("immigration")
                .summary("Successfully secured Canada Express Entry Permanent Residency in under 6 months despite complex provincial nomination criteria.")
                .fullStory("<p>Rohit approached GlobalNex after facing multiple delays with previous self-filed profiles. Our legal assessment restructured his CRS scoring and targeted high-demand provincial streams...</p>")
                .outcome("Canada Permanent Residency Granted")
                .status(PostStatus.PUBLISHED)
                .featured(true)
                .build();
            successStoryRepository.save(story);
            log.info("Seeded sample success story.");
        }
    }
}
