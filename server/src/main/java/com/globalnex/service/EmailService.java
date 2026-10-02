package com.globalnex.service;

import com.globalnex.model.DepartmentEmail;
import com.globalnex.model.Inquiry;
import com.globalnex.model.SiteSettings;
import com.globalnex.repository.InquiryRepository;
import com.globalnex.repository.SiteSettingsRepository;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;
    private final InquiryRepository inquiryRepository;
    private final SiteSettingsRepository siteSettingsRepository;

    @Value("${spring.mail.username:info@bhargeshglobalnex.com}")
    private String fromEmail;

    @Value("${app.company.primary-email:info@bhargeshglobalnex.com}")
    private String defaultPrimaryEmail;

    private static final Map<String, String> DEFAULT_DEPARTMENT_MAP = Map.of(
            "immigration", "immigration@bhargeshglobalnex.com",
            "study-abroad", "education@bhargeshglobalnex.com",
            "education", "education@bhargeshglobalnex.com",
            "tours-travels", "travel@bhargeshglobalnex.com",
            "travel", "travel@bhargeshglobalnex.com",
            "export-import", "exports@bhargeshglobalnex.com",
            "exports", "exports@bhargeshglobalnex.com",
            "business-setup", "info@bhargeshglobalnex.com"
    );

    @Async("emailTaskExecutor")
    public void sendInquiryNotificationAsync(Inquiry inquiry) {
        if (inquiry == null) {
            log.warn("Cannot send email for null inquiry");
            return;
        }

        try {
            String toEmail = resolveDepartmentEmail(inquiry.getServiceLabel());
            String subject = String.format("New Inquiry [%s]: %s", 
                    inquiry.getServiceLabel() != null ? inquiry.getServiceLabel() : "General", 
                    inquiry.getName());

            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setFrom(fromEmail != null && !fromEmail.isBlank() ? fromEmail : "no-reply@bhargeshglobalnex.com");
            helper.setTo(toEmail);
            helper.setReplyTo(inquiry.getEmail());
            helper.setSubject(subject);

            String htmlBody = buildHtmlTemplate(inquiry);
            String textBody = buildPlainTextTemplate(inquiry);
            helper.setText(textBody, htmlBody);

            log.info("Sending inquiry notification email for inquiry ID: {} to {}", inquiry.getId(), toEmail);
            mailSender.send(mimeMessage);

            // Set notifiedAt timestamp and persist
            inquiry.setNotifiedAt(LocalDateTime.now());
            inquiryRepository.save(inquiry);
            log.info("Inquiry notification email successfully delivered to {} for inquiry ID: {}", toEmail, inquiry.getId());

        } catch (Exception ex) {
            log.error("Failed to send inquiry notification email for inquiry ID: {}. Error: {}", 
                    inquiry.getId(), ex.getMessage(), ex);
            // Fire-and-forget: Do not rethrow exception so API response / client is never disrupted
        }
    }

    public String resolveDepartmentEmail(String serviceLabel) {
        if (serviceLabel == null || serviceLabel.isBlank()) {
            return defaultPrimaryEmail;
        }

        String normalized = serviceLabel.toLowerCase().trim();

        // First check in dynamic SiteSettings if configured
        try {
            Optional<SiteSettings> settingsOpt = siteSettingsRepository.findById("default");
            if (settingsOpt.isPresent() && settingsOpt.get().getDepartmentEmails() != null) {
                for (DepartmentEmail dept : settingsOpt.get().getDepartmentEmails()) {
                    if (dept.getLabel() != null && dept.getLabel().equalsIgnoreCase(normalized) 
                            && dept.getEmail() != null && !dept.getEmail().isBlank()) {
                        return dept.getEmail();
                    }
                }
                if (settingsOpt.get().getPrimaryEmail() != null && !settingsOpt.get().getPrimaryEmail().isBlank()) {
                    defaultPrimaryEmail = settingsOpt.get().getPrimaryEmail();
                }
            }
        } catch (Exception e) {
            log.warn("Could not load SiteSettings for department routing, using static map: {}", e.getMessage());
        }

        // Check fallback static map
        return DEFAULT_DEPARTMENT_MAP.getOrDefault(normalized, defaultPrimaryEmail);
    }

    private String buildHtmlTemplate(Inquiry inquiry) {
        String formattedDate = inquiry.getCreatedAt() != null 
                ? inquiry.getCreatedAt().format(DateTimeFormatter.ofPattern("dd MMM yyyy, HH:mm"))
                : LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd MMM yyyy, HH:mm"));

        return "<!DOCTYPE html>" +
                "<html>" +
                "<head>" +
                "<meta charset=\"utf-8\">" +
                "<style>" +
                "body { font-family: 'Public Sans', Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; color: #1e293b; }" +
                ".container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }" +
                ".header { background-color: #0f172a; color: #ffffff; padding: 24px 32px; text-align: left; border-bottom: 3px solid #3b82f6; }" +
                ".header h1 { margin: 0; font-size: 20px; font-weight: 600; letter-spacing: -0.02em; }" +
                ".header p { margin: 4px 0 0 0; font-size: 13px; color: #94a3b8; }" +
                ".content { padding: 32px; }" +
                ".field-group { margin-bottom: 18px; }" +
                ".field-label { font-size: 12px; font-weight: 700; text-transform: uppercase; color: #64748b; margin-bottom: 4px; letter-spacing: 0.05em; }" +
                ".field-value { font-size: 15px; color: #0f172a; font-weight: 500; }" +
                ".message-box { background-color: #f1f5f9; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 4px; font-size: 14px; line-height: 1.6; color: #334155; margin-top: 20px; white-space: pre-wrap; }" +
                ".footer { background-color: #f8fafc; padding: 16px 32px; font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; }" +
                "</style>" +
                "</head>" +
                "<body>" +
                "<div class=\"container\">" +
                "<div class=\"header\">" +
                "<h1>New Client Inquiry</h1>" +
                "<p>Bhargesh Patel GlobalNex Private Limited</p>" +
                "</div>" +
                "<div class=\"content\">" +
                "<div class=\"field-group\">" +
                "<div class=\"field-label\">Client Name</div>" +
                "<div class=\"field-value\">" + escapeHtml(inquiry.getName()) + "</div>" +
                "</div>" +
                "<div class=\"field-group\">" +
                "<div class=\"field-label\">Email Address</div>" +
                "<div class=\"field-value\"><a href=\"mailto:" + escapeHtml(inquiry.getEmail()) + "\" style=\"color: #2563eb; text-decoration: none;\">" + escapeHtml(inquiry.getEmail()) + "</a></div>" +
                "</div>" +
                (inquiry.getPhone() != null ? "<div class=\"field-group\"><div class=\"field-label\">Phone Number</div><div class=\"field-value\">" + escapeHtml(inquiry.getPhone()) + "</div></div>" : "") +
                "<div class=\"field-group\">" +
                "<div class=\"field-label\">Interested Service</div>" +
                "<div class=\"field-value\"><span style=\"background: #dbeafe; color: #1d4ed8; padding: 3px 8px; border-radius: 4px; font-size: 13px; font-weight: 600;\">" + escapeHtml(inquiry.getServiceLabel() != null ? inquiry.getServiceLabel() : "General Inquiry") + "</span></div>" +
                "</div>" +
                "<div class=\"field-group\">" +
                "<div class=\"field-label\">Source / Submission Date</div>" +
                "<div class=\"field-value\" style=\"font-size: 13px; color: #64748b;\">" + escapeHtml(inquiry.getSource()) + " &bull; " + formattedDate + "</div>" +
                "</div>" +
                "<div class=\"field-group\">" +
                "<div class=\"field-label\">Client Message</div>" +
                "<div class=\"message-box\">" + escapeHtml(inquiry.getMessage()) + "</div>" +
                "</div>" +
                "</div>" +
                "<div class=\"footer\">" +
                "This email was automatically generated by SmartConnect CRM.<br>" +
                "&copy; " + java.time.Year.now().getValue() + " Bhargesh Patel GlobalNex Private Limited. All rights reserved." +
                "</div>" +
                "</div>" +
                "</body>" +
                "</html>";
    }

    private String buildPlainTextTemplate(Inquiry inquiry) {
        String formattedDate = inquiry.getCreatedAt() != null 
                ? inquiry.getCreatedAt().format(DateTimeFormatter.ofPattern("dd MMM yyyy, HH:mm"))
                : LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd MMM yyyy, HH:mm"));

        return "========================================================\n" +
                " NEW CLIENT INQUIRY - GLOBALNEX\n" +
                "========================================================\n\n" +
                "Client Name:       " + inquiry.getName() + "\n" +
                "Email:             " + inquiry.getEmail() + "\n" +
                "Phone:             " + (inquiry.getPhone() != null ? inquiry.getPhone() : "N/A") + "\n" +
                "Service:           " + (inquiry.getServiceLabel() != null ? inquiry.getServiceLabel() : "General") + "\n" +
                "Source:            " + inquiry.getSource() + "\n" +
                "Date:              " + formattedDate + "\n\n" +
                "--------------------------------------------------------\n" +
                "MESSAGE:\n" +
                "--------------------------------------------------------\n" +
                inquiry.getMessage() + "\n\n" +
                "========================================================\n" +
                "SmartConnect CRM — Bhargesh Patel GlobalNex Private Limited\n";
    }

    private String escapeHtml(String input) {
        if (input == null) return "";
        return input.replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;")
                .replace("'", "&#39;");
    }
}
