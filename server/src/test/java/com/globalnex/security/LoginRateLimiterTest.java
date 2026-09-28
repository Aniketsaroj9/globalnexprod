package com.globalnex.security;

import com.globalnex.exception.ApiException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class LoginRateLimiterTest {

    private LoginRateLimiter rateLimiter;

    @BeforeEach
    void setUp() {
        rateLimiter = new LoginRateLimiter();
    }

    @Test
    void allowsUpTo10Attempts() {
        String ip = "192.168.1.100";
        for (int i = 0; i < 10; i++) {
            assertDoesNotThrow(() -> rateLimiter.checkRateLimit(ip));
        }
    }

    @Test
    void throwsRateLimitedOn11thAttempt() {
        String ip = "192.168.1.101";
        for (int i = 0; i < 10; i++) {
            rateLimiter.checkRateLimit(ip);
        }

        ApiException ex = assertThrows(ApiException.class, () -> rateLimiter.checkRateLimit(ip));
        assertEquals("RATE_LIMITED", ex.getCode());
        assertEquals(429, ex.getStatusCode());
    }

    @Test
    void resetsRateLimitOnSuccess() {
        String ip = "192.168.1.102";
        for (int i = 0; i < 10; i++) {
            rateLimiter.checkRateLimit(ip);
        }

        rateLimiter.reset(ip);
        assertDoesNotThrow(() -> rateLimiter.checkRateLimit(ip));
    }
}
