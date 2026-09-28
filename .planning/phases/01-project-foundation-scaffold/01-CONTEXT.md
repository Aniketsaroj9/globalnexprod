# Phase 1: Project Foundation & Scaffold - Context

**Gathered:** 2026-09-28
**Status:** Ready for planning
**Source:** PRD Express Path (SmartConnect_Complete_PRD_SpringBoot_v3.md)

<domain>
## Phase Boundary

Bootstrap both the backend (Spring Boot 3.2) and frontend (React 18 + Vite) projects for Bhargesh Patel GlobalNex Private Limited (SmartConnect), including:
- Server project structure (`server/`) with Spring Boot 3.2, Java, Spring Data MongoDB, Spring Security, Spring Mail, JJWT (0.12.x), Lombok, OWASP Java HTML Sanitizer, Maven Wrapper, and `/api/health` endpoint returning system & db status.
- Client project structure (`client/`) with React 18, Vite, React Router v6, Axios, Tailwind CSS v3, React Helmet Async, Lucide React.
- Complete Endorsement Design System tokens configured in Tailwind CSS and CSS variables (ink, ink-2, ink-3, bond, paper, field, rule, seal, brass, veridian, plus dark mode tokens, typography with Fraunces, Public Sans, Courier Prime, and 2px border-radius standard).
- Environment configurations (`.env.example` / `application.yml` template) and development scripts.
- ESLint and Prettier configurations for frontend code quality.

</domain>

<decisions>
## Implementation Decisions

### 1. Backend Structure (`server/`)
- **Framework:** Spring Boot 3.2.x with Java 17+ (Java 25 runtime compatible)
- **Packaging & Build:** Maven with Maven Wrapper (`mvnw`, `mvnw.cmd`, `.mvn/wrapper/`)
- **Group/Artifact:** `com.globalnex` / `smartconnect-api`
- **Dependencies:**
  - `spring-boot-starter-web`
  - `spring-boot-starter-data-mongodb`
  - `spring-boot-starter-security`
  - `spring-boot-starter-mail`
  - `spring-boot-starter-validation`
  - `spring-boot-starter-actuator`
  - `io.jsonwebtoken:jjwt-api`, `jjwt-impl`, `jjwt-jackson` (0.12.x)
  - `org.projectlombok:lombok`
  - `com.googlecode.owasp-java-html-sanitizer:owasp-java-html-sanitizer:20240325.1`
- **Configuration:** `application.yml` / `application-dev.yml` loading environment variables:
  - `PORT` (default: 8080, context-path: `/api` or mapping endpoints to `/api/*`)
  - `MONGODB_URI` (default: local or Atlas connection string)
  - `JWT_SECRET`, `JWT_EXPIRY_MS`
  - `CLIENT_ORIGIN` (default: `http://localhost:5173`)
  - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD`
- **Health Check Endpoint:** `GET /api/health` returning JSON envelope:
  ```json
  {
    "success": true,
    "data": {
      "status": "ok",
      "uptime": 12345,
      "db": "connected"
    }
  }
  ```
- **Error/Exception Envelope:** `GlobalExceptionHandler` structured per PRD envelope spec.

### 2. Frontend Structure (`client/`)
- **Framework:** React 18 + Vite (Javascript / React JSX)
- **Routing:** `react-router-dom` v6
- **Styling:** Tailwind CSS v3 + CSS variables for Endorsement design system
- **Icons:** `lucide-react`
- **HTTP Client:** `axios` configured with `withCredentials: true` and baseURL from `VITE_API_URL`
- **SEO/Head:** `react-helmet-async`
- **Fonts:** Google Fonts loaded in `index.html`: Fraunces (weights 400, 700, 900 with WONK 1), Public Sans (weights 400, 500, 600, 700), Courier Prime (weights 400, 700)

### 3. Endorsement Design Tokens
- **Palette:**
  - `ink`: `#152238` (iron-gall ink, primary text & solid buttons)
  - `ink-2`: `#33445F` (diluted ink, secondary text)
  - `ink-3`: `#6B7A92` (faded ink, captions & serials)
  - `bond`: `#EDEFE8` (cool bond paper, page background)
  - `paper`: `#F5F6F1` (fresh sheet, raised surfaces/cards)
  - `field`: `#DDE2DA` (form tint block, focused input fill)
  - `rule`: `#C3C8BC` (printed rules, all borders & dividers)
  - `seal`: `#B0332B` (oxblood stamp ink, focus rings, accents)
  - `brass`: `#A8843C` (embossed seal foil, guilloche, numbers)
  - `veridian`: `#1F5D4C` (passport green, success states)
- **Dark Mode Palette:**
  - background: `#0E1725`
  - surfaces: `#141F30`
  - type: `#E7EAE2`
  - rules: `#2A3648`
  - field: `#1B273A`
- **Typography tokens:**
  - display: `'Fraunces', Georgia, serif`
  - body: `'Public Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
  - mono: `'Courier Prime', Courier, monospace`
- **Geometry & Spacing:**
  - border-radius: `2px` standard (`rounded-sm` / `rounded-[2px]`)
  - layout: 64px margin rail + content column split by vertical rule (`border-r border-rule`)

### 4. Dev Tooling & Environment
- **Root config & env:** `.env.example` in root / `server/.env.example` / `client/.env.example`
- **Linting & Formatting:** ESLint with react rules, Prettier with Tailwind plugin config
- **Scripts:** Root `package.json` for managing dev workflow (concurrent running or individual startup commands)

### 5. Developer's Discretion
- Packaging Maven Wrapper files so Spring Boot can build and run cross-platform without requiring pre-installed Maven.
- Providing a demo health test and basic token inspection page to visually verify all design tokens and light/dark theme toggle.

</decisions>

<canonical_refs>
## Canonical References
- `SmartConnect_Complete_PRD_SpringBoot_v3.md`: Sections 1, 3.1, 4, 5, 6, 7, 8
- `.planning/REQUIREMENTS.md`: FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05, FOUND-06, FOUND-07
- `.planning/ROADMAP.md`: Phase 1
</canonical_refs>
