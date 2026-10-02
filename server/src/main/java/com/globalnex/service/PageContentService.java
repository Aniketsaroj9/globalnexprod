package com.globalnex.service;

import com.globalnex.dto.page.PageContentUpdateRequest;
import com.globalnex.exception.ResourceNotFoundException;
import com.globalnex.model.PageContent;
import com.globalnex.repository.PageContentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PageContentService {

    private final PageContentRepository pageContentRepository;

    public PageContent getPageBySlug(String slug) {
        return pageContentRepository.findBySlug(slug.toLowerCase().trim())
                .orElseThrow(() -> new ResourceNotFoundException("Page content not found with slug: " + slug));
    }

    public PageContent updatePage(String slug, PageContentUpdateRequest request) {
        PageContent page = pageContentRepository.findBySlug(slug.toLowerCase().trim())
                .orElseGet(() -> PageContent.builder().slug(slug.toLowerCase().trim()).build());

        page.setTitle(request.getTitle());
        if (request.getBlocks() != null) {
            page.setBlocks(request.getBlocks());
        }
        if (request.getSeo() != null) {
            page.setSeo(request.getSeo());
        }

        return pageContentRepository.save(page);
    }
}
