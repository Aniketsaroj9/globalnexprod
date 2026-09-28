package com.globalnex.model;

import com.globalnex.model.enums.PostStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "blog_posts")
@CompoundIndex(name = "status_publishedAt_idx", def = "{'status': 1, 'publishedAt': -1}")
public class BlogPost {

    @Id
    private String id;

    @Indexed(unique = true)
    private String slug;

    private String title;
    private String excerpt;
    private String content;
    private String coverImage;

    @Builder.Default
    private String author = "GlobalNex Team";

    @Builder.Default
    private List<String> tags = new ArrayList<>();

    @Indexed
    @Builder.Default
    private PostStatus status = PostStatus.DRAFT;

    @Indexed
    private LocalDateTime publishedAt;

    private Integer readTimeMin;

    private SeoMetadata seo;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}
