package com.globalnex.service;

import com.globalnex.dto.inquiry.InquiryCreateRequest;
import com.globalnex.exception.ResourceNotFoundException;
import com.globalnex.model.Inquiry;
import com.globalnex.model.enums.InquiryStatus;
import com.globalnex.repository.InquiryRepository;
import com.globalnex.security.InquiryRateLimiter;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.HexFormat;

@Slf4j
@Service
@RequiredArgsConstructor
public class InquiryService {

    private final InquiryRepository inquiryRepository;
    private final InquiryRateLimiter rateLimiter;

    public Inquiry submitInquiry(InquiryCreateRequest request, HttpServletRequest httpRequest) {
        String clientIp = extractClientIp(httpRequest);
        
        // Rate limiting check (5 per hour per IP)
        rateLimiter.checkRateLimit(clientIp);

        // Honeypot check: If the hidden 'website' field is populated, silently discard
        if (request.getWebsite() != null && !request.getWebsite().isBlank()) {
            log.warn("Honeypot triggered from IP: {}. Discarding spam submission.", clientIp);
            return Inquiry.builder()
                    .name(request.getName())
                    .email(request.getEmail())
                    .status(InquiryStatus.NEW)
                    .build();
        }

        String ipHash = hashIp(clientIp);
        String userAgent = httpRequest.getHeader("User-Agent");

        Inquiry inquiry = Inquiry.builder()
                .name(request.getName().trim())
                .email(request.getEmail().toLowerCase().trim())
                .phone(request.getPhone() != null ? request.getPhone().trim() : null)
                .serviceLabel(request.getServiceLabel().toLowerCase().trim())
                .message(request.getMessage().trim())
                .source(request.getSource() != null ? request.getSource() : "contact-page")
                .status(InquiryStatus.NEW)
                .ipHash(ipHash)
                .userAgent(userAgent)
                .build();

        Inquiry saved = inquiryRepository.save(inquiry);
        log.info("New inquiry submitted [ID: {}] for service '{}'", saved.getId(), saved.getServiceLabel());
        return saved;
    }

    public Page<Inquiry> getInquiriesForAdmin(InquiryStatus status, String service, String search, int page, int limit) {
        int pageSize = Math.min(Math.max(limit, 1), 50);
        int pageIndex = Math.max(page - 1, 0);
        Pageable pageable = PageRequest.of(pageIndex, pageSize, Sort.by(Sort.Direction.DESC, "createdAt"));

        if (search != null && !search.isBlank()) {
            return inquiryRepository.searchInquiries(search.trim(), pageable);
        }

        if (status != null && service != null && !service.isBlank()) {
            return inquiryRepository.findByStatusAndServiceLabel(status, service.toLowerCase().trim(), pageable);
        } else if (status != null) {
            return inquiryRepository.findByStatus(status, pageable);
        } else if (service != null && !service.isBlank()) {
            return inquiryRepository.findByServiceLabel(service.toLowerCase().trim(), pageable);
        }

        return inquiryRepository.findAll(pageable);
    }

    public Inquiry getInquiryById(String id) {
        return inquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Inquiry not found with id: " + id));
    }

    public Inquiry updateInquiryStatus(String id, InquiryStatus newStatus) {
        Inquiry inquiry = getInquiryById(id);
        inquiry.setStatus(newStatus);
        return inquiryRepository.save(inquiry);
    }

    private String extractClientIp(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isBlank()) {
            return xForwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }

    private String hashIp(String ip) {
        if (ip == null) return "unknown";
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(ip.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(hash).substring(0, 16);
        } catch (Exception e) {
            return "hash_error";
        }
    }
}
