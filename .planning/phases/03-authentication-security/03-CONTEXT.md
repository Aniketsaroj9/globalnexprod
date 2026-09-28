# Phase 3: Authentication & Security - Context

**Gathered:** 2026-09-28
**Status:** Ready for planning
**Source:** PRD Express Path (SmartConnect_Complete_PRD_SpringBoot_v3.md)

<domain>
## Phase Boundary

Implement the complete JWT authentication system, Spring Security integration, rate limiting, and security hardening for Bhargesh Patel GlobalNex Private Limited:
- **JWT Token Provider** (`JwtTokenProvider`): Generates, parses, and validates signed JWT tokens using JJWT (HMAC-SHA256) with 7-day expiration (604,800,000 ms).
- **JWT Authentication Filter** (`JwtAuthenticationFilter`): Extracts JWT from `httpOnly`, `SameSite=Strict`, `Secure` cookie (or optional Authorization Bearer header for fallback API clients), validates claims, loads `AdminUserPrincipal`, and populates Spring `SecurityContextHolder`.
- **Authentication Service & Controller** (`AuthService`, `AuthController`):
  - `POST /api/auth/login`: Authenticates email + password using BCrypt (cost 12), sets `httpOnly` cookie with `ResponseCookie`, updates `lastLoginAt`, returns user DTO in standard envelope.
  - `POST /api/auth/logout`: Clears authentication cookie by setting Max-Age=0.
  - `GET /api/auth/me`: Returns current authenticated user profile (`id`, `name`, `email`, `role`).
- **Security Hardening**:
  - Generic 401 response on any login failure (`"Invalid email or password"`) preventing username enumeration.
  - IP-based rate limiting on `/api/auth/login` (max 10 attempts per 15 minutes per client IP).
  - Spring Security configuration guarding `/api/admin/**` and write operations, keeping public endpoints accessible.
  - Strict CORS origin whitelisting bound to `CLIENT_ORIGIN`.

</domain>

<decisions>
## Implementation Decisions

### 1. Cookie & Token Handling
- Token is delivered in a cookie named `token` (configurable via `app.jwt.cookie-name`).
- Cookie attributes:
  - `httpOnly`: `true`
  - `secure`: `true` in production, configurable for local dev (`false` or auto-detected based on profile)
  - `sameSite`: `Strict` (or `Lax` if cross-origin dev is needed, with `Strict` default)
  - `path`: `/`
  - `maxAge`: `604800` (7 days)

### 2. Rate Limiting Strategy
- In-memory sliding window or bucket rate limiter per client IP:
  - Tracks failed/total attempts per IP for `/api/auth/login`.
  - Max 10 requests per 15-minute window per IP.
  - Exceeding limit throws `ApiException("RATE_LIMITED", "Too many login attempts. Please try again in 15 minutes.", 429)`.

### 3. User Details & Security Principal
- `AdminUserPrincipal` implementing Spring Security `UserDetails` representing `AdminUser` with `ROLE_` prefixed authorities (`ROLE_SUPER_ADMIN`, `ROLE_CONTENT_ADMIN`).
- `CustomUserDetailsService` loading user by email from `AdminUserRepository`.

### 4. Controller & DTOs
- `LoginRequest`: `@NotBlank @Email String email`, `@NotBlank String password`.
- `UserResponse`: `String id`, `String name`, `String email`, `UserRole role`, `LocalDateTime lastLoginAt`.

</decisions>

<canonical_refs>
## Canonical References
- `SmartConnect_Complete_PRD_SpringBoot_v3.md`: Sections 3.9.1, 5.5, 6.1 (endpoints 21, 22, 23), 7 (Phase 2), 8.1
- `.planning/REQUIREMENTS.md`: AUTH-01 through AUTH-08, SEC-01, SEC-02, SEC-04
- `.planning/ROADMAP.md`: Phase 3
</canonical_refs>
