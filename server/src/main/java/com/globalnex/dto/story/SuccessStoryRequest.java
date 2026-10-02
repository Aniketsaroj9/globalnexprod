package com.globalnex.dto.story;

import com.globalnex.model.enums.PostStatus;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SuccessStoryRequest {

    @NotBlank(message = "Client Name is required")
    private String clientName;

    private String slug;

    @NotBlank(message = "Service slug is required")
    private String serviceSlug;

    private String summary;

    @NotBlank(message = "Full story is required")
    private String fullStory;

    private String image;

    private String outcome;

    @Builder.Default
    private PostStatus status = PostStatus.DRAFT;

    @Builder.Default
    private boolean featured = false;
}
