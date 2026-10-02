package com.globalnex.service;

import com.globalnex.dto.settings.SiteSettingsUpdateRequest;
import com.globalnex.model.SiteSettings;
import com.globalnex.repository.SiteSettingsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SiteSettingsService {

    private final SiteSettingsRepository siteSettingsRepository;

    public SiteSettings getSettings() {
        return siteSettingsRepository.findById("default")
                .orElseGet(() -> siteSettingsRepository.save(SiteSettings.builder().id("default").build()));
    }

    public SiteSettings updateSettings(SiteSettingsUpdateRequest request) {
        SiteSettings settings = getSettings();

        if (request.getCompanyName() != null) settings.setCompanyName(request.getCompanyName());
        if (request.getPrimaryEmail() != null) settings.setPrimaryEmail(request.getPrimaryEmail());
        if (request.getPhone() != null) settings.setPhone(request.getPhone());
        if (request.getAddress() != null) settings.setAddress(request.getAddress());
        if (request.getMapEmbedUrl() != null) settings.setMapEmbedUrl(request.getMapEmbedUrl());
        if (request.getSocials() != null) settings.setSocials(request.getSocials());
        if (request.getDepartmentEmails() != null) settings.setDepartmentEmails(request.getDepartmentEmails());

        return siteSettingsRepository.save(settings);
    }
}
