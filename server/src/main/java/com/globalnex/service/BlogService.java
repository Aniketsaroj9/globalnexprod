package com.globalnex.service;

import com.globalnex.dto.blog.BlogPostRequest;
import com.globalnex.exception.ApiException;
import com.globalnex.exception.ResourceNotFoundException;
import com.globalnex.model.BlogPost;
import com.globalnex.model.enums.PostStatus;
import com.globalnex.repository.BlogPostRepository;
import com.globalnex.util.SlugUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BlogService {

    private final BlogPostRepository blogPostRepository;

    public Page<BlogPost> getPublishedPosts(String tag, int page, int limit) {
        int pageSize = Math.min(Math.max(limit, 1), 50);
        int pageIndex = Math.max(page - 1, 0);
        Pageable pageable = PageRequest.of(pageIndex, pageSize, Sort.by(Sort.Direction.DESC, "publishedAt"));

        if (tag != null && !tag.isBlank()) {
            return blogPostRepository.findByStatusAndTagsContaining(PostStatus.PUBLISHED, tag.toLowerCase().trim(), pageable);
        }
        return blogPostRepository.findByStatus(PostStatus.PUBLISHED, pageable);
    }

    public BlogPost getPublishedPostBySlug(String slug) {
        return blogPostRepository.findBySlugAndStatus(slug.toLowerCase().trim(), PostStatus.PUBLISHED)
                .orElseThrow(() -> new ResourceNotFoundException("Published blog post not found with slug: " + slug));
    }

    public Page<BlogPost> getAllPostsForAdmin(int page, int limit) {
        int pageSize = Math.min(Math.max(limit, 1), 50);
        int pageIndex = Math.max(page - 1, 0);
        Pageable pageable = PageRequest.of(pageIndex, pageSize, Sort.by(Sort.Direction.DESC, "createdAt"));
        return blogPostRepository.findAll(pageable);
    }

    public BlogPost createPost(BlogPostRequest request) {
        String baseSlug = (request.getSlug() != null && !request.getSlug().isBlank())
                ? SlugUtil.toSlug(request.getSlug())
                : SlugUtil.toSlug(request.getTitle());

        String finalSlug = baseSlug;
        int count = 1;
        while (blogPostRepository.existsBySlug(finalSlug)) {
            finalSlug = baseSlug + "-" + count++;
        }

        BlogPost post = BlogPost.builder()
                .slug(finalSlug)
                .title(request.getTitle())
                .excerpt(request.getExcerpt())
                .content(request.getContent())
                .coverImage(request.getCoverImage())
                .author(request.getAuthor() != null && !request.getAuthor().isBlank() ? request.getAuthor() : "GlobalNex Team")
                .tags(request.getTags() != null ? request.getTags() : java.util.Collections.emptyList())
                .status(request.getStatus() != null ? request.getStatus() : PostStatus.DRAFT)
                .seo(request.getSeo())
                .build();

        return blogPostRepository.save(post);
    }

    public BlogPost updatePost(String id, BlogPostRequest request) {
        BlogPost post = blogPostRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog post not found with id: " + id));

        if (request.getSlug() != null && !request.getSlug().isBlank()) {
            String newSlug = SlugUtil.toSlug(request.getSlug());
            if (!newSlug.equals(post.getSlug()) && blogPostRepository.existsBySlug(newSlug)) {
                throw new ApiException("VALIDATION_ERROR", "Slug is already in use: " + newSlug, 400);
            }
            post.setSlug(newSlug);
        }

        post.setTitle(request.getTitle());
        if (request.getExcerpt() != null) post.setExcerpt(request.getExcerpt());
        if (request.getContent() != null) post.setContent(request.getContent());
        if (request.getCoverImage() != null) post.setCoverImage(request.getCoverImage());
        if (request.getAuthor() != null) post.setAuthor(request.getAuthor());
        if (request.getTags() != null) post.setTags(request.getTags());
        if (request.getStatus() != null) post.setStatus(request.getStatus());
        if (request.getSeo() != null) post.setSeo(request.getSeo());

        return blogPostRepository.save(post);
    }

    public void deletePost(String id) {
        if (!blogPostRepository.existsById(id)) {
            throw new ResourceNotFoundException("Blog post not found with id: " + id);
        }
        blogPostRepository.deleteById(id);
    }
}
