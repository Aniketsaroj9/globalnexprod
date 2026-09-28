package com.globalnex.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SeoMetadata {
    private String title;
    private String metaDescription;
    private String ogImage;
}
