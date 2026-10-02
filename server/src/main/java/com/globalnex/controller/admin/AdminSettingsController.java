package com.globalnex.controller.admin;

import com.globalnex.dto.ApiResponse;
import com.globalnex.dto.settings.SiteSettingsUpdateRequest;
import com.globalnex.model.SiteSettings;
import com.globalnex.service.SiteSettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/settings")
@RequiredArgsConstructor
public class AdminSettingsController {

    private final SiteSettingsService siteSettingsService;

    @PutMapping
    public ResponseEntity<ApiResponse<SiteSettings>> updateSettings(
            @RequestBody SiteSettingsUpdateRequest request) {
        SiteSettings updated = siteSettingsService.updateSettings(request);
        return ResponseEntity.ok(ApiResponse.ok(updated));
    }
}
