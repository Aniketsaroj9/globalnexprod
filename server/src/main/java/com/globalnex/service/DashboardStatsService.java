package com.globalnex.service;

import com.globalnex.dto.stats.DashboardStatsResponse;
import com.globalnex.model.enums.InquiryStatus;
import com.globalnex.model.enums.PostStatus;
import com.globalnex.repository.BlogPostRepository;
import com.globalnex.repository.InquiryRepository;
import com.globalnex.repository.SuccessStoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardStatsService {

    private final InquiryRepository inquiryRepository;
    private final BlogPostRepository blogPostRepository;
    private final SuccessStoryRepository successStoryRepository;

    public DashboardStatsResponse getDashboardStats() {
        long newInquiries = inquiryRepository.countByStatus(InquiryStatus.NEW);
        long totalInquiries = inquiryRepository.count();
        long publishedPosts = blogPostRepository.countByStatus(PostStatus.PUBLISHED);
        long publishedStories = successStoryRepository.countByStatus(PostStatus.PUBLISHED);

        return DashboardStatsResponse.builder()
                .newInquiries(newInquiries)
                .totalInquiries(totalInquiries)
                .publishedPosts(publishedPosts)
                .publishedStories(publishedStories)
                .build();
    }
}
