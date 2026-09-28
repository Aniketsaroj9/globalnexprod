package com.globalnex.security;

import com.globalnex.exception.ApiException;
import org.springframework.stereotype.Component;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

@Component
public class LoginRateLimiter {

    private static final int MAX_ATTEMPTS = 10;
    private static final long WINDOW_DURATION_MS = 15 * 60 * 1000; // 15 minutes

    private final ConcurrentHashMap<String, ConcurrentLinkedQueue<Long>> attemptsMap = new ConcurrentHashMap<>();

    public void checkRateLimit(String ipAddress) {
        long now = System.currentTimeMillis();
        ConcurrentLinkedQueue<Long> timestamps = attemptsMap.computeIfAbsent(ipAddress, k -> new ConcurrentLinkedQueue<>());

        // Purge timestamps older than the window duration
        while (!timestamps.isEmpty() && (now - timestamps.peek() > WINDOW_DURATION_MS)) {
            timestamps.poll();
        }

        if (timestamps.size() >= MAX_ATTEMPTS) {
            throw new ApiException("RATE_LIMITED", "Too many login attempts from this IP. Please try again in 15 minutes.", 429);
        }

        timestamps.add(now);
    }

    public void reset(String ipAddress) {
        attemptsMap.remove(ipAddress);
    }
}
