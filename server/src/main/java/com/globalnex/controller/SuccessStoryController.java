package com.globalnex.controller;

import com.globalnex.dto.ApiResponse;
import com.globalnex.dto.ResponseMeta;
import com.globalnex.model.SuccessStory;
import com.globalnex.service.SuccessStoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/success-stories")
@RequiredArgsConstructor
public class SuccessStoryController {

    private final SuccessStoryService successStoryService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<SuccessStory>>> getPublishedStories(
            @RequestParam(required = false) String service,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "9") int limit) {
        Page<SuccessStory> storyPage = successStoryService.getPublishedStories(service, page, limit);

        ResponseMeta meta = ResponseMeta.builder()
                .total(storyPage.getTotalElements())
                .page(storyPage.getNumber() + 1)
                .pageSize(storyPage.getSize())
                .totalPages(storyPage.getTotalPages())
                .build();

        return ResponseEntity.ok(ApiResponse.ok(storyPage.getContent(), meta));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<SuccessStory>> getPublishedStoryBySlug(@PathVariable String slug) {
        SuccessStory story = successStoryService.getPublishedStoryBySlug(slug);
        return ResponseEntity.ok(ApiResponse.ok(story));
    }
}
