package com.globalnex.dto.stats;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsResponse {
    private long newInquiries;
    private long totalInquiries;
    private long publishedPosts;
    private long publishedStories;
}
