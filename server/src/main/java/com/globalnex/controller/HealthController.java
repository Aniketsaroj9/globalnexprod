package com.globalnex.controller;

import com.globalnex.dto.ApiResponse;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.management.ManagementFactory;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/health")
public class HealthController {

    private final MongoTemplate mongoTemplate;

    @Autowired
    public HealthController(@Autowired(required = false) MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> getHealth() {
        Map<String, Object> healthData = new HashMap<>();
        healthData.put("status", "ok");
        healthData.put("uptime", ManagementFactory.getRuntimeMXBean().getUptime());

        String dbStatus = "disconnected";
        if (mongoTemplate != null) {
            try {
                Document ping = mongoTemplate.executeCommand("{ ping: 1 }");
                if (ping != null && (Double.valueOf(1.0).equals(ping.getDouble("ok")) || Integer.valueOf(1).equals(ping.getInteger("ok")))) {
                    dbStatus = "connected";
                }
            } catch (Exception e) {
                dbStatus = "disconnected";
            }
        }
        healthData.put("db", dbStatus);

        return ResponseEntity.ok(ApiResponse.ok(healthData));
    }
}
