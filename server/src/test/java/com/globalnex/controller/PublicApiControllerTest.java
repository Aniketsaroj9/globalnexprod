package com.globalnex.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.globalnex.dto.inquiry.InquiryCreateRequest;
import com.globalnex.exception.ResourceNotFoundException;
import com.globalnex.model.PageContent;
import com.globalnex.model.Service;
import com.globalnex.model.SiteSettings;
import com.globalnex.model.enums.InquiryStatus;
import com.globalnex.security.CustomUserDetailsService;
import com.globalnex.security.JwtAuthenticationEntryPoint;
import com.globalnex.security.JwtAuthenticationFilter;
import com.globalnex.security.JwtTokenProvider;
import com.globalnex.service.*;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Web-layer slice tests for public REST controllers.
 * Filters disabled via addFilters=false — avoids CSRF and JWT filter interference.
 * Service layer is fully mocked.
 */
@WebMvcTest(controllers = {
        ServiceController.class,
        BlogController.class,
        SuccessStoryController.class,
        InquiryController.class,
        PageContentController.class,
        SiteSettingsController.class,
        HealthController.class
})
@AutoConfigureMockMvc(addFilters = false)
class PublicApiControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    // Security infrastructure mocks (picked up by @WebMvcTest component scanning)
    @MockBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @MockBean
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @MockBean
    private JwtTokenProvider jwtTokenProvider;

    @MockBean
    private CustomUserDetailsService customUserDetailsService;

    // Service layer mocks
    @MockBean
    private ServiceService serviceService;

    @MockBean
    private BlogService blogService;

    @MockBean
    private SuccessStoryService successStoryService;

    @MockBean
    private InquiryService inquiryService;

    @MockBean
    private PageContentService pageContentService;

    @MockBean
    private SiteSettingsService siteSettingsService;

    @MockBean
    private org.springframework.data.mongodb.core.MongoTemplate mongoTemplate;

    // ── Health ─────────────────────────────────────────────────────────────

    @Test
    void healthEndpointReturnsOkEnvelope() throws Exception {
        mockMvc.perform(get("/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.status").value("ok"));
    }

    // ── Services ───────────────────────────────────────────────────────────

    @Test
    void getServicesReturnsEnvelopeWithList() throws Exception {
        Service mockService = Service.builder()
                .slug("immigration")
                .name("Immigration Services")
                .tagline("Visa assistance")
                .order(1)
                .build();
        when(serviceService.getAllServices(null)).thenReturn(List.of(mockService));

        mockMvc.perform(get("/services"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data[0].slug").value("immigration"));
    }

    @Test
    void getServiceBySlugReturnsEnvelope() throws Exception {
        Service mockService = Service.builder()
                .slug("immigration")
                .name("Immigration Services")
                .build();
        when(serviceService.getServiceBySlug("immigration")).thenReturn(mockService);

        mockMvc.perform(get("/services/immigration"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.slug").value("immigration"));
    }

    @Test
    void getServiceByUnknownSlugReturns404() throws Exception {
        when(serviceService.getServiceBySlug("unknown"))
                .thenThrow(new ResourceNotFoundException("Service not found with slug: unknown"));

        mockMvc.perform(get("/services/unknown"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.error.code").value("NOT_FOUND"));
    }

    // ── Settings ───────────────────────────────────────────────────────────

    @Test
    void getSettingsReturnsPublicSettings() throws Exception {
        SiteSettings mockSettings = SiteSettings.builder()
                .id("default")
                .companyName("Bhargesh Patel GlobalNex Private Limited")
                .primaryEmail("info@bhargeshglobalnex.com")
                .build();
        when(siteSettingsService.getSettings()).thenReturn(mockSettings);

        mockMvc.perform(get("/settings"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.companyName")
                        .value("Bhargesh Patel GlobalNex Private Limited"));
    }

    // ── Pages ──────────────────────────────────────────────────────────────

    @Test
    void getPageContentReturnsPage() throws Exception {
        PageContent mockPage = PageContent.builder()
                .slug("about-us")
                .title("About Us")
                .build();
        when(pageContentService.getPageBySlug("about-us")).thenReturn(mockPage);

        mockMvc.perform(get("/pages/about-us"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.slug").value("about-us"));
    }

    // ── Inquiries ──────────────────────────────────────────────────────────

    @Test
    void submitInquiryWithValidDataReturnsOk() throws Exception {
        com.globalnex.model.Inquiry savedInquiry = com.globalnex.model.Inquiry.builder()
                .id("inq-001")
                .name("John Doe")
                .email("john@example.com")
                .serviceLabel("immigration")
                .message("I need visa assistance.")
                .status(InquiryStatus.NEW)
                .build();
        when(inquiryService.submitInquiry(any(), any(HttpServletRequest.class)))
                .thenReturn(savedInquiry);

        InquiryCreateRequest request = InquiryCreateRequest.builder()
                .name("John Doe")
                .email("john@example.com")
                .phone("+919876543210")
                .serviceLabel("immigration")
                .message("I need visa assistance for a student visa.")
                .consent(true)
                .build();

        mockMvc.perform(post("/inquiries")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.message").exists());
    }

    @Test
    void submitInquiryWithHoneypotSilentlyReturnsOk() throws Exception {
        com.globalnex.model.Inquiry honeypotResult = com.globalnex.model.Inquiry.builder()
                .name("Bot User")
                .email("bot@spam.com")
                .status(InquiryStatus.NEW)
                .build();
        when(inquiryService.submitInquiry(any(), any(HttpServletRequest.class)))
                .thenReturn(honeypotResult);

        InquiryCreateRequest request = InquiryCreateRequest.builder()
                .name("Bot User")
                .email("bot@spam.com")
                .serviceLabel("immigration")
                .message("Buy this product now spam message content.")
                .website("http://spam-link.com")
                .consent(true)
                .build();

        mockMvc.perform(post("/inquiries")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void submitInquiryMissingRequiredFieldReturns400() throws Exception {
        mockMvc.perform(post("/inquiries")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false));
    }
}
