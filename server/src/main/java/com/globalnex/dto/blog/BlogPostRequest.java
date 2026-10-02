package com.globalnex.dto.blog;

import com.globalnex.model.SeoMetadata;
import com.globalnex.model.enums.PostStatus;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BlogPostRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String slug;

    private String excerpt;

    @NotBlank(message = "Content is required")
    private String content;

    private String coverImage;

    private String author;

    @Builder.Default
    private List<String> tags = new ArrayList<>();

    @Builder.Default
    private PostStatus status = PostStatus.DRAFT;

    private SeoMetadata seo;
}
