package com.globalnex.controller.admin;

import com.globalnex.dto.ApiResponse;
import com.globalnex.dto.service.ServiceUpdateRequest;
import com.globalnex.model.Service;
import com.globalnex.service.ServiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/services")
@RequiredArgsConstructor
public class AdminServiceController {

    private final ServiceService serviceService;

    @PutMapping("/{slug}")
    public ResponseEntity<ApiResponse<Service>> updateService(
            @PathVariable String slug,
            @RequestBody ServiceUpdateRequest request) {
        Service updated = serviceService.updateService(slug, request);
        return ResponseEntity.ok(ApiResponse.ok(updated));
    }
}
