package com.globalnex.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "site_settings")
public class SiteSettings {

    @Id
    @Builder.Default
    private String id = "default"; // Singleton pattern: "default"

    @Builder.Default
    private String companyName = "Bhargesh Patel GlobalNex Private Limited";

    @Builder.Default
    private String primaryEmail = "info@bhargeshglobalnex.com";

    private String phone;
    private String address;
    private String mapEmbedUrl;

    @Builder.Default
    private Map<String, String> socials = new HashMap<>();

    @Builder.Default
    private List<DepartmentEmail> departmentEmails = new ArrayList<>();

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}
