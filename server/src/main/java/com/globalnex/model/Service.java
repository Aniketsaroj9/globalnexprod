package com.globalnex.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "services")
public class Service {

    @Id
    private String id;

    @Indexed(unique = true)
    private String slug;

    private String name;
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

    @Builder.Default
    private boolean isFeaturedOnHome = false;

    @Indexed
    @Builder.Default
    private int order = 0;

    private SeoMetadata seo;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}
