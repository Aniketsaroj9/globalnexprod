package com.globalnex.controller;

import com.globalnex.dto.ApiResponse;
import com.globalnex.dto.inquiry.InquiryCreateRequest;
import com.globalnex.model.Inquiry;
import com.globalnex.service.InquiryService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/inquiries")
@RequiredArgsConstructor
public class InquiryController {

    private final InquiryService inquiryService;

    @PostMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> submitInquiry(
            @Valid @RequestBody InquiryCreateRequest request,
            HttpServletRequest httpRequest) {
        Inquiry saved = inquiryService.submitInquiry(request, httpRequest);

        return ResponseEntity.ok(ApiResponse.ok(Map.of(
                "message", "Inquiry submitted successfully. Our team will contact you within 1 business day.",
                "id", saved.getId() != null ? saved.getId() : ""
        )));
    }
}
