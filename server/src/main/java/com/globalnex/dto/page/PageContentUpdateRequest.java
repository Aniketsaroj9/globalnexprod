package com.globalnex.dto.page;

import com.globalnex.model.ContentBlock;
import com.globalnex.model.SeoMetadata;
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
public class PageContentUpdateRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @Builder.Default
    private List<ContentBlock> blocks = new ArrayList<>();

    private SeoMetadata seo;
}
