package com.globalnex.service;

import com.globalnex.dto.auth.LoginRequest;
import com.globalnex.dto.auth.UserResponse;
import com.globalnex.exception.ApiException;
import com.globalnex.model.AdminUser;
import com.globalnex.repository.AdminUserRepository;
import com.globalnex.security.AdminUserPrincipal;
import com.globalnex.security.JwtTokenProvider;
import com.globalnex.security.LoginRateLimiter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final AdminUserRepository adminUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final LoginRateLimiter rateLimiter;

    @Value("${app.jwt.cookie-name:token}")
    private String cookieName;

    @Value("${app.jwt.expiration-ms:604800000}")
    private long jwtExpirationMs;

    @Value("${spring.profiles.active:dev}")
    private String activeProfile;

    public UserResponse login(LoginRequest request, HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
        String clientIp = extractClientIp(httpRequest);
        rateLimiter.checkRateLimit(clientIp);

        String email = request.getEmail().toLowerCase().trim();
        AdminUser user = adminUserRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException("UNAUTHORIZED", "Invalid email or password", 401));

        if (!user.isActive()) {
            throw new ApiException("UNAUTHORIZED", "Account is deactivated", 401);
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new ApiException("UNAUTHORIZED", "Invalid email or password", 401);
        }

        // Reset rate limiter upon successful login
        rateLimiter.reset(clientIp);

        // Update last login timestamp
        user.setLastLoginAt(LocalDateTime.now());
        adminUserRepository.save(user);

        // Generate JWT token
        String token = tokenProvider.generateTokenFromEmail(user.getEmail());

        // Attach httpOnly secure cookie
        boolean isProd = "prod".equalsIgnoreCase(activeProfile) || "production".equalsIgnoreCase(activeProfile);
        ResponseCookie cookie = ResponseCookie.from(cookieName, token)
                .httpOnly(true)
                .secure(isProd)
                .sameSite("Strict")
                .path("/")
                .maxAge(jwtExpirationMs / 1000)
                .build();

        httpResponse.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        log.info("Admin user '{}' successfully logged in from IP {}", user.getEmail(), clientIp);
        return UserResponse.fromEntity(user);
    }

    public void logout(HttpServletResponse httpResponse) {
        boolean isProd = "prod".equalsIgnoreCase(activeProfile) || "production".equalsIgnoreCase(activeProfile);
        ResponseCookie cookie = ResponseCookie.from(cookieName, "")
                .httpOnly(true)
                .secure(isProd)
                .sameSite("Strict")
                .path("/")
                .maxAge(0)
                .build();

        httpResponse.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    public UserResponse getCurrentUser(Authentication authentication) {
        if (authentication == null || !(authentication.getPrincipal() instanceof AdminUserPrincipal principal)) {
            throw new ApiException("UNAUTHORIZED", "Not authenticated", 401);
        }

        AdminUser user = adminUserRepository.findByEmail(principal.getUsername())
                .orElseThrow(() -> new ApiException("NOT_FOUND", "User profile not found", 404));

        return UserResponse.fromEntity(user);
    }

    private String extractClientIp(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isBlank()) {
            return xForwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
