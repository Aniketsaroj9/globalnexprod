package com.globalnex.security;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;

class JwtTokenProviderTest {

    private JwtTokenProvider jwtTokenProvider;

    @BeforeEach
    void setUp() {
        jwtTokenProvider = new JwtTokenProvider();
        ReflectionTestUtils.setField(jwtTokenProvider, "jwtSecret", "test_secret_key_that_is_at_least_32_bytes_long_1234567890");
        ReflectionTestUtils.setField(jwtTokenProvider, "jwtExpirationMs", 604800000L);
        jwtTokenProvider.init();
    }

    @Test
    void generatesAndValidatesToken() {
        String email = "admin@globalnex.com";
        String token = jwtTokenProvider.generateTokenFromEmail(email);

        assertNotNull(token);
        assertTrue(jwtTokenProvider.validateToken(token));
        assertEquals(email, jwtTokenProvider.getEmailFromToken(token));
    }

    @Test
    void rejectsTamperedToken() {
        String token = jwtTokenProvider.generateTokenFromEmail("admin@globalnex.com");
        String tamperedToken = token + "xyz";

        assertFalse(jwtTokenProvider.validateToken(tamperedToken));
    }
}
