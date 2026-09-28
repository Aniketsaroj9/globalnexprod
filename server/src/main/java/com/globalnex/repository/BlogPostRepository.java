package com.globalnex.repository;

import com.globalnex.model.BlogPost;
import com.globalnex.model.enums.PostStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BlogPostRepository extends MongoRepository<BlogPost, String> {
    Optional<BlogPost> findBySlug(String slug);
    Optional<BlogPost> findBySlugAndStatus(String slug, PostStatus status);
    Page<BlogPost> findByStatus(PostStatus status, Pageable pageable);
    Page<BlogPost> findByStatusAndTagsContaining(PostStatus status, String tag, Pageable pageable);
    boolean existsBySlug(String slug);
    long countByStatus(PostStatus status);
}
