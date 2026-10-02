package com.globalnex.service;

import com.globalnex.dto.story.SuccessStoryRequest;
import com.globalnex.exception.ApiException;
import com.globalnex.exception.ResourceNotFoundException;
import com.globalnex.model.SuccessStory;
import com.globalnex.model.enums.PostStatus;
import com.globalnex.repository.SuccessStoryRepository;
import com.globalnex.util.SlugUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SuccessStoryService {

    private final SuccessStoryRepository successStoryRepository;

    public Page<SuccessStory> getPublishedStories(String serviceSlug, int page, int limit) {
        int pageSize = Math.min(Math.max(limit, 1), 50);
        int pageIndex = Math.max(page - 1, 0);
        Pageable pageable = PageRequest.of(pageIndex, pageSize, Sort.by(Sort.Direction.DESC, "createdAt"));

        if (serviceSlug != null && !serviceSlug.isBlank()) {
            return successStoryRepository.findByServiceSlugAndStatus(serviceSlug.toLowerCase().trim(), PostStatus.PUBLISHED, pageable);
        }
        return successStoryRepository.findByStatus(PostStatus.PUBLISHED, pageable);
    }

    public SuccessStory getPublishedStoryBySlug(String slug) {
        return successStoryRepository.findBySlugAndStatus(slug.toLowerCase().trim(), PostStatus.PUBLISHED)
                .orElseThrow(() -> new ResourceNotFoundException("Published success story not found with slug: " + slug));
    }

    public Page<SuccessStory> getAllStoriesForAdmin(int page, int limit) {
        int pageSize = Math.min(Math.max(limit, 1), 50);
        int pageIndex = Math.max(page - 1, 0);
        Pageable pageable = PageRequest.of(pageIndex, pageSize, Sort.by(Sort.Direction.DESC, "createdAt"));
        return successStoryRepository.findAll(pageable);
    }

    public SuccessStory createStory(SuccessStoryRequest request) {
        String baseSlug = (request.getSlug() != null && !request.getSlug().isBlank())
                ? SlugUtil.toSlug(request.getSlug())
                : SlugUtil.toSlug(request.getClientName() + "-" + request.getServiceSlug());

        String finalSlug = baseSlug;
        int count = 1;
        while (successStoryRepository.existsBySlug(finalSlug)) {
            finalSlug = baseSlug + "-" + count++;
        }

        SuccessStory story = SuccessStory.builder()
                .slug(finalSlug)
                .clientName(request.getClientName())
                .serviceSlug(request.getServiceSlug())
                .summary(request.getSummary())
                .fullStory(request.getFullStory())
                .image(request.getImage())
                .outcome(request.getOutcome())
                .status(request.getStatus() != null ? request.getStatus() : PostStatus.DRAFT)
                .featured(request.isFeatured())
                .build();

        return successStoryRepository.save(story);
    }

    public SuccessStory updateStory(String id, SuccessStoryRequest request) {
        SuccessStory story = successStoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Success story not found with id: " + id));

        if (request.getSlug() != null && !request.getSlug().isBlank()) {
            String newSlug = SlugUtil.toSlug(request.getSlug());
            if (!newSlug.equals(story.getSlug()) && successStoryRepository.existsBySlug(newSlug)) {
                throw new ApiException("VALIDATION_ERROR", "Slug is already in use: " + newSlug, 400);
            }
            story.setSlug(newSlug);
        }

        story.setClientName(request.getClientName());
        story.setServiceSlug(request.getServiceSlug());
        if (request.getSummary() != null) story.setSummary(request.getSummary());
        if (request.getFullStory() != null) story.setFullStory(request.getFullStory());
        if (request.getImage() != null) story.setImage(request.getImage());
        if (request.getOutcome() != null) story.setOutcome(request.getOutcome());
        if (request.getStatus() != null) story.setStatus(request.getStatus());
        story.setFeatured(request.isFeatured());

        return successStoryRepository.save(story);
    }

    public void deleteStory(String id) {
        if (!successStoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Success story not found with id: " + id);
        }
        successStoryRepository.deleteById(id);
    }
}
