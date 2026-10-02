package com.globalnex.service;

import com.globalnex.model.DepartmentEmail;
import com.globalnex.model.Inquiry;
import com.globalnex.model.SiteSettings;
import com.globalnex.model.enums.InquiryStatus;
import com.globalnex.repository.InquiryRepository;
import com.globalnex.repository.SiteSettingsRepository;
import jakarta.mail.Session;
import jakarta.mail.internet.MimeMessage;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.test.util.ReflectionTestUtils;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Properties;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EmailServiceTest {

    @Mock
    private JavaMailSender mailSender;

    @Mock
    private InquiryRepository inquiryRepository;

    @Mock
    private SiteSettingsRepository siteSettingsRepository;

    @InjectMocks
    private EmailService emailService;

    @BeforeEach
    void setUp() {
        ReflectionTestUtils.setField(emailService, "fromEmail", "no-reply@bhargeshglobalnex.com");
        ReflectionTestUtils.setField(emailService, "defaultPrimaryEmail", "info@bhargeshglobalnex.com");
    }

    @Test
    @DisplayName("Department routing resolves correct inboxes for all services")
    void testDepartmentRouting() {
        when(siteSettingsRepository.findById("default")).thenReturn(Optional.empty());

        assertThat(emailService.resolveDepartmentEmail("immigration"))
                .isEqualTo("immigration@bhargeshglobalnex.com");

        assertThat(emailService.resolveDepartmentEmail("study-abroad"))
                .isEqualTo("education@bhargeshglobalnex.com");

        assertThat(emailService.resolveDepartmentEmail("education"))
                .isEqualTo("education@bhargeshglobalnex.com");

        assertThat(emailService.resolveDepartmentEmail("tours-travels"))
                .isEqualTo("travel@bhargeshglobalnex.com");

        assertThat(emailService.resolveDepartmentEmail("export-import"))
                .isEqualTo("exports@bhargeshglobalnex.com");

        assertThat(emailService.resolveDepartmentEmail("business-setup"))
                .isEqualTo("info@bhargeshglobalnex.com");

        assertThat(emailService.resolveDepartmentEmail("unknown-service"))
                .isEqualTo("info@bhargeshglobalnex.com");

        assertThat(emailService.resolveDepartmentEmail(null))
                .isEqualTo("info@bhargeshglobalnex.com");
    }

    @Test
    @DisplayName("Department routing respects dynamic SiteSettings when present")
    void testDepartmentRoutingWithSiteSettings() {
        SiteSettings customSettings = SiteSettings.builder()
                .primaryEmail("custom-info@bhargeshglobalnex.com")
                .departmentEmails(List.of(
                        new DepartmentEmail("immigration", "visa-team@bhargeshglobalnex.com")
                ))
                .build();

        when(siteSettingsRepository.findById("default")).thenReturn(Optional.of(customSettings));

        assertThat(emailService.resolveDepartmentEmail("immigration"))
                .isEqualTo("visa-team@bhargeshglobalnex.com");
    }

    @Test
    @DisplayName("Successful email delivery updates inquiry notifiedAt timestamp")
    void testSendInquiryNotificationSuccess() {
        MimeMessage mimeMessage = new MimeMessage((Session) null);
        when(mailSender.createMimeMessage()).thenReturn(mimeMessage);
        when(siteSettingsRepository.findById("default")).thenReturn(Optional.empty());

        Inquiry inquiry = Inquiry.builder()
                .id("inq-test-1")
                .name("Sarah Connor")
                .email("sarah@example.com")
                .phone("+91 9876543210")
                .serviceLabel("immigration")
                .message("Need help with Canada PR visa")
                .source("contact-page")
                .status(InquiryStatus.NEW)
                .createdAt(LocalDateTime.now())
                .build();

        emailService.sendInquiryNotificationAsync(inquiry);

        verify(mailSender, times(1)).send(any(MimeMessage.class));
        verify(inquiryRepository, times(1)).save(inquiry);
        assertThat(inquiry.getNotifiedAt()).isNotNull();
    }

    @Test
    @DisplayName("Email failure is caught and logged without throwing exception")
    void testSendInquiryNotificationFailureDoesNotThrow() {
        MimeMessage mimeMessage = new MimeMessage((Session) null);
        when(mailSender.createMimeMessage()).thenReturn(mimeMessage);
        doThrow(new RuntimeException("SMTP Connection refused")).when(mailSender).send(any(MimeMessage.class));

        Inquiry inquiry = Inquiry.builder()
                .id("inq-test-fail")
                .name("John Connor")
                .email("john@example.com")
                .serviceLabel("study-abroad")
                .message("UK Master application")
                .build();

        // Must not throw exception
        emailService.sendInquiryNotificationAsync(inquiry);

        verify(mailSender, times(1)).send(any(MimeMessage.class));
        verify(inquiryRepository, never()).save(inquiry);
        assertThat(inquiry.getNotifiedAt()).isNull();
    }
}
