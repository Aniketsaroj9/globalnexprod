package com.globalnex.model;

import com.globalnex.model.enums.InquiryStatus;
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
@Document(collection = "inquiries")
@CompoundIndex(name = "inquiry_status_createdAt_idx", def = "{'status': 1, 'createdAt': -1}")
public class Inquiry {

    @Id
    private String id;

    private String name;

    @Indexed
    private String email;

    private String phone;

    private String serviceRef;

    @Indexed
    private String serviceLabel;

    private String message;

    @Indexed
    @Builder.Default
    private InquiryStatus status = InquiryStatus.NEW;

    @Builder.Default
    private String source = "contact-page";

    private String ipHash;
    private String userAgent;
    private LocalDateTime notifiedAt;

    @CreatedDate
    @Indexed
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}
