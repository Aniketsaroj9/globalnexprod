package com.globalnex.controller.admin;

import com.globalnex.dto.ApiResponse;
import com.globalnex.dto.page.PageContentUpdateRequest;
import com.globalnex.model.PageContent;
import com.globalnex.service.PageContentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/pages")
@RequiredArgsConstructor
public class AdminPageController {

    private final PageContentService pageContentService;

    @PutMapping("/{slug}")
    public ResponseEntity<ApiResponse<PageContent>> updatePage(
            @PathVariable String slug,
            @Valid @RequestBody PageContentUpdateRequest request) {
        PageContent updated = pageContentService.updatePage(slug, request);
        return ResponseEntity.ok(ApiResponse.ok(updated));
    }
}
