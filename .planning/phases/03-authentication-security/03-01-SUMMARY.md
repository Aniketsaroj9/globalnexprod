# Summary: Phase 3 Plan 1 — Authentication, JWT Filter, Rate Limiter & Security Configuration

**Plan:** 03-01
**Status:** Completed
**Executed:** 2026-09-28

## Deliverables Created
1. **Security Principal & UserDetails**:
   - `AdminUserPrincipal.java`: implements Spring Security `UserDetails`, maps roles (`ROLE_SUPER_ADMIN`, `ROLE_CONTENT_ADMIN`).
   - `CustomUserDetailsService.java`: loads user by email from `AdminUserRepository`.
2. **JWT Token Management**:
   - `JwtTokenProvider.java`: HMAC-SHA256 token generation, signature validation, email claim extraction, and 7-day expiration (604,800,000 ms).
   - `JwtTokenProviderTest.java`: automated unit tests verifying token signing, validation, and tamper rejection.
3. **Authentication Filter & Entry Point**:
   - `JwtAuthenticationEntryPoint.java`: formats unauthenticated requests into standard `ApiResponse.error("UNAUTHORIZED")` JSON envelope with HTTP 401.
   - `JwtAuthenticationFilter.java`: extracts JWT from `httpOnly`, `SameSite=Strict`, `Secure` cookie (with fallback to `Authorization: Bearer`), validates token, and populates `SecurityContextHolder`.
4. **Rate Limiting Engine**:
   - `LoginRateLimiter.java`: IP-based sliding window rate limiter allowing max 10 login requests per 15-minute window before triggering HTTP 429 `RATE_LIMITED`.
   - `LoginRateLimiterTest.java`: unit tests verifying limit enforcement, window sliding, and counter reset.
5. **Authentication Service & Controller**:
   - `dto/auth/LoginRequest.java` and `dto/auth/UserResponse.java`.
   - `AuthService.java`: implements login with rate limiting, generic 401 on failed credentials (preventing user enumeration), updates `lastLoginAt`, issues JWT in `httpOnly` cookie, and logout.
   - `AuthController.java`: endpoints `POST /api/auth/login`, `POST /api/auth/logout`, and `GET /api/auth/me`.
6. **Spring Security Configuration**:
   - `SecurityConfig.java`: stateless session policy, CORS origin whitelisting bound to `CLIENT_ORIGIN`, BCrypt password encoder (cost 12), route protection guarding `/api/admin/**` and write routes while allowing public endpoints.

## Requirements Addressed
- **AUTH-01**: Admin login via POST `/api/auth/login` returning JWT in httpOnly, SameSite=Strict cookie.
- **AUTH-02**: Invalid credentials return generic 401 (no user enumeration).
- **AUTH-03**: GET `/api/auth/me` returns current user profile when authenticated.
- **AUTH-04**: POST `/api/auth/logout` clears session/token cookie.
- **AUTH-05**: Spring Security config: public routes open, `/api/admin/*` requires authentication.
- **AUTH-06**: JWT expiry enforced (7 days), token validation on protected routes.
- **AUTH-07**: Rate limiting on `/api/auth/login`: max 10 requests per 15 min per IP.
- **AUTH-08**: CORS restricted to CLIENT_ORIGIN environment variable.
- **SEC-01**: Passwords hashed with BCrypt cost 12.
- **SEC-02**: JWT secret key min 256 bits from environment.
- **SEC-04**: Generic error messages for auth failures.
