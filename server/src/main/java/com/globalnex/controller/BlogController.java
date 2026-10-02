package com.globalnex.controller;

import com.globalnex.dto.ApiResponse;
import com.globalnex.dto.ResponseMeta;
import com.globalnex.model.BlogPost;
import com.globalnex.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/blog")
@RequiredArgsConstructor
public class BlogController {

    private final BlogService blogService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<BlogPost>>> getPublishedPosts(
            @RequestParam(required = false) String tag,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "9") int limit) {
        Page<BlogPost> postPage = blogService.getPublishedPosts(tag, page, limit);

        ResponseMeta meta = ResponseMeta.builder()
                .total(postPage.getTotalElements())
                .page(postPage.getNumber() + 1)
                .pageSize(postPage.getSize())
                .totalPages(postPage.getTotalPages())
                .build();

        return ResponseEntity.ok(ApiResponse.ok(postPage.getContent(), meta));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<BlogPost>> getPublishedPostBySlug(@PathVariable String slug) {
        BlogPost post = blogService.getPublishedPostBySlug(slug);
        return ResponseEntity.ok(ApiResponse.ok(post));
    }
}
