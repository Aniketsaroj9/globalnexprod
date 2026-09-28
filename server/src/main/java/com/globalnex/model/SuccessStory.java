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

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "success_stories")
@CompoundIndex(name = "status_createdAt_idx", def = "{'status': 1, 'createdAt': -1}")
public class SuccessStory {

    @Id
    private String id;

    @Indexed(unique = true)
    private String slug;

    private String clientName;

    @Indexed
    private String serviceSlug;

    private String summary;
    private String fullStory;
    private String image;
    private String outcome;

    @Indexed
    @Builder.Default
    private PostStatus status = PostStatus.DRAFT;

    @Builder.Default
    private boolean featured = false;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}
