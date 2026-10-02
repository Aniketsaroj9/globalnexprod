package com.globalnex.service;

import com.globalnex.dto.service.ServiceUpdateRequest;
import com.globalnex.exception.ResourceNotFoundException;
import com.globalnex.model.Service;
import com.globalnex.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ServiceService {

    private final ServiceRepository serviceRepository;

    public List<Service> getAllServices(Boolean featured) {
        if (Boolean.TRUE.equals(featured)) {
            return serviceRepository.findByIsFeaturedOnHomeTrueOrderByOrderAsc();
        }
        return serviceRepository.findAllByOrderByOrderAsc();
    }

    public Service getServiceBySlug(String slug) {
        return serviceRepository.findBySlug(slug.toLowerCase().trim())
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with slug: " + slug));
    }

    public Service updateService(String slug, ServiceUpdateRequest request) {
        Service service = getServiceBySlug(slug);

        if (request.getTagline() != null) service.setTagline(request.getTagline());
        if (request.getIcon() != null) service.setIcon(request.getIcon());
        if (request.getHeroImage() != null) service.setHeroImage(request.getHeroImage());
        if (request.getDescription() != null) service.setDescription(request.getDescription());
        if (request.getOfferings() != null) service.setOfferings(request.getOfferings());
        if (request.getProcess() != null) service.setProcess(request.getProcess());
        if (request.getFaqs() != null) service.setFaqs(request.getFaqs());
        if (request.getIsFeaturedOnHome() != null) service.setFeaturedOnHome(request.getIsFeaturedOnHome());
        if (request.getOrder() != null) service.setOrder(request.getOrder());
        if (request.getSeo() != null) service.setSeo(request.getSeo());

        return serviceRepository.save(service);
    }
}
