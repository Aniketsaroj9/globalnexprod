package com.globalnex.controller;

import com.globalnex.dto.ApiResponse;
import com.globalnex.model.SiteSettings;
import com.globalnex.service.SiteSettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/settings")
@RequiredArgsConstructor
public class SiteSettingsController {

    private final SiteSettingsService siteSettingsService;

    @GetMapping
    public ResponseEntity<ApiResponse<SiteSettings>> getPublicSettings() {
        SiteSettings settings = siteSettingsService.getSettings();
        return ResponseEntity.ok(ApiResponse.ok(settings));
    }
}
