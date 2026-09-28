package com.globalnex.model;

import com.globalnex.listener.BlogPostModelListener;
import com.globalnex.model.enums.PostStatus;
import org.bson.Document;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class BlogPostModelListenerTest {

    private BlogPostModelListener listener;

    @BeforeEach
    void setUp() {
        listener = new BlogPostModelListener();
    }

    @Test
    void calculatesReadTimeMinForLongContent() {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 450; i++) {
            sb.append("word ").append(i).append(" ");
        }

        BlogPost post = BlogPost.builder()
                .title("Test Post")
                .content("<p>" + sb.toString() + "</p>")
                .status(PostStatus.PUBLISHED)
                .build();

        listener.onBeforeConvert(new BeforeConvertEvent<>(post, "blog_posts"));

        assertNotNull(post.getReadTimeMin());
        // 450 * 2 words = 900 words / 200 = ceil(4.5) = 5
        assertTrue(post.getReadTimeMin() >= 3);
        assertNotNull(post.getPublishedAt());
    }

    @Test
    void setsMinimumReadTimeTo1ForEmptyOrShortContent() {
        BlogPost post = BlogPost.builder()
                .title("Short Post")
                .content("<p>Hello world</p>")
                .status(PostStatus.DRAFT)
                .build();

        listener.onBeforeConvert(new BeforeConvertEvent<>(post, "blog_posts"));

        assertEquals(1, post.getReadTimeMin());
        assertNull(post.getPublishedAt());
    }

    @Test
    void setsPublishedAtOnPublishedStatus() {
        BlogPost post = BlogPost.builder()
                .title("Published Post")
                .content("Content")
                .status(PostStatus.PUBLISHED)
                .build();

        listener.onBeforeConvert(new BeforeConvertEvent<>(post, "blog_posts"));

        assertNotNull(post.getPublishedAt());
    }
}
