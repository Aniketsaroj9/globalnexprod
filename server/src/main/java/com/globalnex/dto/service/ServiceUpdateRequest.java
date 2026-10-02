package com.globalnex.dto.service;

import com.globalnex.model.FaqItem;
import com.globalnex.model.ProcessStep;
import com.globalnex.model.SeoMetadata;
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
public class ServiceUpdateRequest {

    private String tagline;
    private String icon;
    private String heroImage;
    private String description;

    @Builder.Default
    private List<String> offerings = new ArrayList<>();

    @Builder.Default
    private List<ProcessStep> process = new ArrayList<>();

    @Builder.Default
    private List<FaqItem> faqs = new ArrayList<>();

    private Boolean isFeaturedOnHome;
    private Integer order;
    private SeoMetadata seo;
}
