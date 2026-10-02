package com.globalnex.security;

import com.globalnex.exception.ApiException;
import org.springframework.stereotype.Component;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

@Component
public class InquiryRateLimiter {

    private static final int MAX_INQUIRIES = 5;
    private static final long WINDOW_DURATION_MS = 60 * 60 * 1000; // 1 hour

    private final ConcurrentHashMap<String, ConcurrentLinkedQueue<Long>> attemptsMap = new ConcurrentHashMap<>();

    public void checkRateLimit(String ipAddress) {
        long now = System.currentTimeMillis();
        ConcurrentLinkedQueue<Long> timestamps = attemptsMap.computeIfAbsent(ipAddress, k -> new ConcurrentLinkedQueue<>());

        // Purge timestamps older than 1 hour
        while (!timestamps.isEmpty() && (now - timestamps.peek() > WINDOW_DURATION_MS)) {
            timestamps.poll();
        }

        if (timestamps.size() >= MAX_INQUIRIES) {
            throw new ApiException("RATE_LIMITED", "Too many inquiry submissions. Please try again in an hour.", 429);
        }

        timestamps.add(now);
    }
}
