package com.globalnex.listener;

import com.globalnex.model.BlogPost;
import com.globalnex.model.enums.PostStatus;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class BlogPostModelListener extends AbstractMongoEventListener<BlogPost> {

    @Override
    public void onBeforeConvert(BeforeConvertEvent<BlogPost> event) {
        BlogPost blogPost = event.getSource();
        if (blogPost == null) {
            return;
        }

        // Calculate readTimeMin based on content (approx 200 words per minute)
        if (blogPost.getContent() != null && !blogPost.getContent().isBlank()) {
            String plainText = blogPost.getContent().replaceAll("<[^>]*>", " ").replaceAll("\\s+", " ").trim();
            int wordCount = plainText.isEmpty() ? 0 : plainText.split(" ").length;
            int computedReadTime = Math.max(1, (int) Math.ceil(wordCount / 200.0));
            blogPost.setReadTimeMin(computedReadTime);
        } else {
            blogPost.setReadTimeMin(1);
        }

        // Auto-set publishedAt on transition to PUBLISHED
        if (blogPost.getStatus() == PostStatus.PUBLISHED && blogPost.getPublishedAt() == null) {
            blogPost.setPublishedAt(LocalDateTime.now());
        }
    }
}
