package com.globalnex.dto.settings;

import com.globalnex.model.DepartmentEmail;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SiteSettingsUpdateRequest {

    private String companyName;
    private String primaryEmail;
    private String phone;
    private String address;
    private String mapEmbedUrl;

    @Builder.Default
    private Map<String, String> socials = new HashMap<>();

    @Builder.Default
    private List<DepartmentEmail> departmentEmails = new ArrayList<>();
}
