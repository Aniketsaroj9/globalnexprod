package com.globalnex.controller;

import com.globalnex.dto.ApiResponse;
import com.globalnex.model.Service;
import com.globalnex.service.ServiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/services")
@RequiredArgsConstructor
public class ServiceController {

    private final ServiceService serviceService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Service>>> getServices(@RequestParam(required = false) Boolean featured) {
        List<Service> services = serviceService.getAllServices(featured);
        return ResponseEntity.ok(ApiResponse.ok(services));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<Service>> getServiceBySlug(@PathVariable String slug) {
        Service service = serviceService.getServiceBySlug(slug);
        return ResponseEntity.ok(ApiResponse.ok(service));
    }
}
