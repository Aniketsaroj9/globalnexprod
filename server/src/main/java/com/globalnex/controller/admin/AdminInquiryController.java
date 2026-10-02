package com.globalnex.controller.admin;

import com.globalnex.dto.ApiResponse;
import com.globalnex.dto.ResponseMeta;
import com.globalnex.dto.inquiry.InquiryStatusUpdateRequest;
import com.globalnex.model.Inquiry;
import com.globalnex.model.enums.InquiryStatus;
import com.globalnex.service.InquiryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/inquiries")
@RequiredArgsConstructor
public class AdminInquiryController {

    private final InquiryService inquiryService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Inquiry>>> getInquiries(
            @RequestParam(required = false) InquiryStatus status,
            @RequestParam(required = false) String service,
            @RequestParam(required = false) String q,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "15") int limit) {
        Page<Inquiry> inquiryPage = inquiryService.getInquiriesForAdmin(status, service, q, page, limit);

        ResponseMeta meta = ResponseMeta.builder()
                .total(inquiryPage.getTotalElements())
                .page(inquiryPage.getNumber() + 1)
                .pageSize(inquiryPage.getSize())
                .totalPages(inquiryPage.getTotalPages())
                .build();

        return ResponseEntity.ok(ApiResponse.ok(inquiryPage.getContent(), meta));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Inquiry>> getInquiryById(@PathVariable String id) {
        Inquiry inquiry = inquiryService.getInquiryById(id);
        return ResponseEntity.ok(ApiResponse.ok(inquiry));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse<Inquiry>> updateInquiryStatus(
            @PathVariable String id,
            @Valid @RequestBody InquiryStatusUpdateRequest request) {
        Inquiry updated = inquiryService.updateInquiryStatus(id, request.getStatus());
        return ResponseEntity.ok(ApiResponse.ok(updated));
    }
}
