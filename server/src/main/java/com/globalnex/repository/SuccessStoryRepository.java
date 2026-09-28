package com.globalnex.repository;

import com.globalnex.model.SuccessStory;
import com.globalnex.model.enums.PostStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SuccessStoryRepository extends MongoRepository<SuccessStory, String> {
    Optional<SuccessStory> findBySlug(String slug);
    Optional<SuccessStory> findBySlugAndStatus(String slug, PostStatus status);
    Page<SuccessStory> findByStatus(PostStatus status, Pageable pageable);
    Page<SuccessStory> findByServiceSlugAndStatus(String serviceSlug, PostStatus status, Pageable pageable);
    List<SuccessStory> findByFeaturedTrueAndStatus(PostStatus status);
    boolean existsBySlug(String slug);
    long countByStatus(PostStatus status);
}
