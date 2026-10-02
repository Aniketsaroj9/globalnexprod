package com.globalnex.controller.admin;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.globalnex.dto.blog.BlogPostRequest;
import com.globalnex.dto.inquiry.InquiryStatusUpdateRequest;
import com.globalnex.dto.page.PageContentUpdateRequest;
import com.globalnex.dto.service.ServiceUpdateRequest;
import com.globalnex.dto.settings.SiteSettingsUpdateRequest;
import com.globalnex.dto.stats.DashboardStatsResponse;
import com.globalnex.model.BlogPost;
import com.globalnex.model.Inquiry;
import com.globalnex.model.PageContent;
import com.globalnex.model.Service;
import com.globalnex.model.SiteSettings;
import com.globalnex.model.enums.InquiryStatus;
import com.globalnex.model.enums.PostStatus;
import com.globalnex.security.CustomUserDetailsService;
import com.globalnex.security.JwtAuthenticationEntryPoint;
import com.globalnex.security.JwtAuthenticationFilter;
import com.globalnex.security.JwtTokenProvider;
import com.globalnex.service.BlogService;
import com.globalnex.service.DashboardStatsService;
import com.globalnex.service.InquiryService;
import com.globalnex.service.PageContentService;
import com.globalnex.service.ServiceService;
import com.globalnex.service.SiteSettingsService;
import com.globalnex.service.SuccessStoryService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = {
        AdminStatsController.class,
        AdminBlogController.class,
        AdminInquiryController.class,
        AdminPageController.class,
        AdminServiceController.class,
        AdminSettingsController.class,
        AdminSuccessStoryController.class
})
@AutoConfigureMockMvc(addFilters = false)
@ActiveProfiles("dev")
class AdminApiControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private DashboardStatsService dashboardStatsService;

    @MockBean
    private BlogService blogService;

    @MockBean
    private InquiryService inquiryService;

    @MockBean
    private PageContentService pageContentService;

    @MockBean
    private ServiceService serviceService;

    @MockBean
    private SiteSettingsService siteSettingsService;

    @MockBean
    private SuccessStoryService successStoryService;

    @MockBean
    private JwtTokenProvider jwtTokenProvider;

    @MockBean
    private CustomUserDetailsService customUserDetailsService;

    @MockBean
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @MockBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @MockBean
    private org.springframework.data.mongodb.core.MongoTemplate mongoTemplate;

    @Test
    @DisplayName("GET /admin/stats should return dashboard statistics")
    void testGetAdminStats() throws Exception {
        DashboardStatsResponse stats = DashboardStatsResponse.builder()
                .newInquiries(5)
                .totalInquiries(25)
                .publishedPosts(8)
                .publishedStories(4)
                .build();

        when(dashboardStatsService.getDashboardStats()).thenReturn(stats);

        mockMvc.perform(get("/admin/stats"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.newInquiries").value(5))
                .andExpect(jsonPath("$.data.totalInquiries").value(25))
                .andExpect(jsonPath("$.data.publishedPosts").value(8))
                .andExpect(jsonPath("$.data.publishedStories").value(4));
    }

    @Test
    @DisplayName("GET /admin/blog should return paginated posts including drafts")
    void testGetAdminBlogPosts() throws Exception {
        BlogPost post = BlogPost.builder()
                .id("post-1")
                .title("Admin Draft Post")
                .slug("admin-draft-post")
                .status(PostStatus.DRAFT)
                .createdAt(LocalDateTime.now())
                .build();

        when(blogService.getAllPostsForAdmin(anyInt(), anyInt()))
                .thenReturn(new PageImpl<>(List.of(post), PageRequest.of(0, 10), 1));

        mockMvc.perform(get("/admin/blog").param("page", "1").param("limit", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data[0].title").value("Admin Draft Post"))
                .andExpect(jsonPath("$.data[0].status").value("DRAFT"))
                .andExpect(jsonPath("$.meta.total").value(1));
    }

    @Test
    @DisplayName("POST /admin/blog should create new post")
    void testCreateBlogPost() throws Exception {
        BlogPostRequest request = BlogPostRequest.builder()
                .title("New Blog Post")
                .content("Detailed blog content that is long enough...")
                .excerpt("Short excerpt")
                .author("Admin")
                .status(PostStatus.PUBLISHED)
                .build();

        BlogPost created = BlogPost.builder()
                .id("post-created")
                .title("New Blog Post")
                .slug("new-blog-post")
                .content("Detailed blog content that is long enough...")
                .status(PostStatus.PUBLISHED)
                .build();

        when(blogService.createPost(any(BlogPostRequest.class))).thenReturn(created);

        mockMvc.perform(post("/admin/blog")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.id").value("post-created"))
                .andExpect(jsonPath("$.data.slug").value("new-blog-post"));
    }

    @Test
    @DisplayName("DELETE /admin/blog/{id} should delete post")
    void testDeleteBlogPost() throws Exception {
        mockMvc.perform(delete("/admin/blog/post-123"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));

        verify(blogService).deletePost("post-123");
    }

    @Test
    @DisplayName("PATCH /admin/inquiries/{id} should update inquiry status")
    void testUpdateInquiryStatus() throws Exception {
        InquiryStatusUpdateRequest request = new InquiryStatusUpdateRequest();
        request.setStatus(InquiryStatus.READ);

        Inquiry inquiry = Inquiry.builder()
                .id("inq-123")
                .name("John Doe")
                .email("john@example.com")
                .serviceLabel("Immigration")
                .status(InquiryStatus.READ)
                .build();

        when(inquiryService.updateInquiryStatus(eq("inq-123"), eq(InquiryStatus.READ))).thenReturn(inquiry);

        mockMvc.perform(patch("/admin/inquiries/inq-123")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.status").value("READ"));
    }

    @Test
    @DisplayName("PUT /admin/services/{slug} should update service")
    void testUpdateService() throws Exception {
        ServiceUpdateRequest request = ServiceUpdateRequest.builder()
                .tagline("Updated Tagline")
                .description("Updated description")
                .build();

        Service updated = Service.builder()
                .slug("immigration")
                .name("Immigration")
                .tagline("Updated Tagline")
                .description("Updated description")
                .build();

        when(serviceService.updateService(eq("immigration"), any(ServiceUpdateRequest.class))).thenReturn(updated);

        mockMvc.perform(put("/admin/services/immigration")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.tagline").value("Updated Tagline"));
    }

    @Test
    @DisplayName("PUT /admin/settings should update site settings")
    void testUpdateSettings() throws Exception {
        SiteSettingsUpdateRequest request = SiteSettingsUpdateRequest.builder()
                .companyName("GlobalNex Pvt Ltd")
                .primaryEmail("contact@globalnex.com")
                .build();

        SiteSettings updated = SiteSettings.builder()
                .id("default")
                .companyName("GlobalNex Pvt Ltd")
                .primaryEmail("contact@globalnex.com")
                .build();

        when(siteSettingsService.updateSettings(any(SiteSettingsUpdateRequest.class))).thenReturn(updated);

        mockMvc.perform(put("/admin/settings")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.companyName").value("GlobalNex Pvt Ltd"));
    }
}
