package com.globalnex.controller.admin;

import com.globalnex.dto.ApiResponse;
import com.globalnex.dto.ResponseMeta;
import com.globalnex.dto.story.SuccessStoryRequest;
import com.globalnex.model.SuccessStory;
import com.globalnex.service.SuccessStoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin/success-stories")
@RequiredArgsConstructor
public class AdminSuccessStoryController {

    private final SuccessStoryService successStoryService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<SuccessStory>>> getAllStories(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit) {
        Page<SuccessStory> storyPage = successStoryService.getAllStoriesForAdmin(page, limit);

        ResponseMeta meta = ResponseMeta.builder()
                .total(storyPage.getTotalElements())
                .page(storyPage.getNumber() + 1)
                .pageSize(storyPage.getSize())
                .totalPages(storyPage.getTotalPages())
                .build();

        return ResponseEntity.ok(ApiResponse.ok(storyPage.getContent(), meta));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<SuccessStory>> createStory(@Valid @RequestBody SuccessStoryRequest request) {
        SuccessStory created = successStoryService.createStory(request);
        return ResponseEntity.ok(ApiResponse.ok(created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<SuccessStory>> updateStory(
            @PathVariable String id,
            @Valid @RequestBody SuccessStoryRequest request) {
        SuccessStory updated = successStoryService.updateStory(id, request);
        return ResponseEntity.ok(ApiResponse.ok(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Map<String, String>>> deleteStory(@PathVariable String id) {
        successStoryService.deleteStory(id);
        return ResponseEntity.ok(ApiResponse.ok(Map.of("message", "Success story deleted successfully")));
    }
}
