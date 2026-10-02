package com.globalnex.controller;

import com.globalnex.dto.ApiResponse;
import com.globalnex.model.PageContent;
import com.globalnex.service.PageContentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/pages")
@RequiredArgsConstructor
public class PageContentController {

    private final PageContentService pageContentService;

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<PageContent>> getPageBySlug(@PathVariable String slug) {
        PageContent page = pageContentService.getPageBySlug(slug);
        return ResponseEntity.ok(ApiResponse.ok(page));
    }
}
