package com.globalnex.controller.admin;

import com.globalnex.dto.ApiResponse;
import com.globalnex.dto.ResponseMeta;
import com.globalnex.dto.blog.BlogPostRequest;
import com.globalnex.model.BlogPost;
import com.globalnex.service.BlogService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin/blog")
@RequiredArgsConstructor
public class AdminBlogController {

    private final BlogService blogService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<BlogPost>>> getAllPosts(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit) {
        Page<BlogPost> postPage = blogService.getAllPostsForAdmin(page, limit);

        ResponseMeta meta = ResponseMeta.builder()
                .total(postPage.getTotalElements())
                .page(postPage.getNumber() + 1)
                .pageSize(postPage.getSize())
                .totalPages(postPage.getTotalPages())
                .build();

        return ResponseEntity.ok(ApiResponse.ok(postPage.getContent(), meta));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<BlogPost>> createPost(@Valid @RequestBody BlogPostRequest request) {
        BlogPost created = blogService.createPost(request);
        return ResponseEntity.ok(ApiResponse.ok(created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<BlogPost>> updatePost(
            @PathVariable String id,
            @Valid @RequestBody BlogPostRequest request) {
        BlogPost updated = blogService.updatePost(id, request);
        return ResponseEntity.ok(ApiResponse.ok(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Map<String, String>>> deletePost(@PathVariable String id) {
        blogService.deletePost(id);
        return ResponseEntity.ok(ApiResponse.ok(Map.of("message", "Blog post deleted successfully")));
    }
}
