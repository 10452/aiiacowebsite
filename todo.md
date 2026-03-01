# AiiAco Project TODO

## Completed
- [x] Homepage hero, platform, method, results, case studies, engagement models sections
- [x] SEO meta tags, JSON-LD structured data, sitemap
- [x] 3 SEO pillar pages: /ai-integration, /ai-implementation-services, /ai-automation-for-business
- [x] Internal cross-links between pillar pages
- [x] Full-stack upgrade: tRPC + MySQL + leads table
- [x] Contact forms wired to backend (Executive Call Request + Structured Intake)
- [x] Owner notifications on form submission
- [x] Step 01 wording fix: "Business Intelligence Audit"
- [x] Results intro split into 2 sentences
- [x] Case Studies bullet formatting fixed
- [x] 20 industry microsites at /industries/[slug]
- [x] All 20 industry pills on homepage linked to microsites
- [x] Back button on each microsite → /#industries
- [x] /admin/leads dashboard with pipeline status controls
- [x] Featured case study block on 5 industry microsites
- [x] 3 remaining industry microsites (Battery & EV, Helium & Specialty Gas, Biofuel & Sustainable Fuels)
- [x] Sitemap updated to 23 URLs

## Follow-up Round 3
- [x] CRM webhook integration in leads router (Zapier/Make.com configurable endpoint)
- [x] 4 new anonymized case studies (Mortgage/Lending, Insurance, Luxury Hospitality, Software)
- [x] Wire all matching industry microsites to featured case studies
- [x] SF Pro / Apple system font applied site-wide
- [x] UHNW & Private Wealth industry added with dedicated microsite + featured section
- [x] Calendly (calendly.com/nemr1) embedded after Executive Call Request form submission

## Follow-up Round 4
- [x] Add Calendly embed to UHNW microsite CTA section
- [x] Build protected /admin/leads dashboard UI with pipeline status controls
- [x] Add Private Division nav item to Navbar

## Round 5
- [x] Secret admin console at unique URL with access control
- [x] Defence & Aerospace industry section + microsite
- [x] Subtle animated liquid glass background movement
- [x] Gold shimmer on section titles

## Round 6
- [x] Remove Private nav button from Navbar (keep UHNW only in Industries section)
- [x] Fix glass orb animation (currently not visible)
- [x] Redesign Calendly booking flow to be aesthetically aligned with site design

## Round 8
- [x] Change admin panel URL from /aiiaco-ops-9f4e2b7c to /admin-opsteam

## Round 7
- [x] Fix glass orb z-index stacking (overlays were covering orbs at z-index auto)
- [x] Add mix-blend-mode: screen to glass orbs for visibility through dark overlays
- [x] Increase animation movement range (80-150px travel distance for visible motion)
- [x] Boost orb color intensity (rgba opacity 0.45-0.50 vs previous 0.07-0.18)
- [x] Add animated counter roll-up to hero KPI numbers (20+, 100%, 0)

## Round 9
- [x] Update robots.txt to block /admin-opsteam and /admin/ routes
- [x] Add admin_users table to database schema (username, hashed password, role, created_at)
- [x] Build server-side admin auth procedures (login, logout, session, create/list/delete admins)
- [x] Build dedicated admin login page at /admin-opsteam
- [x] Build admin user management UI inside the console (create admin, list admins, delete admins)
- [x] First-time setup flow (shown automatically when no admins exist yet)

## Round 10
- [x] Fix admin login cookie (sameSite: lax was blocking cookie on production cross-origin requests)
- [x] Auto-login after setup (setup mutation should set session cookie immediately)

## Round 11
- [x] Switch admin session from cookie to localStorage + Authorization header (cookie blocked by proxy)
- [x] Fix circular dependency (moved token helpers to @/lib/adminToken.ts)

## Round 12 — SEO & AI Search Visibility
- [x] Research real search queries for AI integration services
- [x] Implement JSON-LD schema: Organization, ProfessionalService, FAQPage, HowTo, WebSite (5 schemas)
- [x] Add FAQ sections to /ai-integration, /ai-implementation-services, /ai-automation-for-business, /method
- [x] Rewrite PlatformSection card bodies with technical specificity and quantified outcomes
- [x] Create /ai-governance page: 6-pillar framework + regulatory alignment table + FAQ + CTA
- [x] Add /ai-governance to sitemap.xml
- [x] Add Services nav section to Footer with all 4 service pages
- [x] Add FAQPage JSON-LD with 8 enterprise AI integration Q&As to global StructuredData
- [x] Add HowTo JSON-LD with 6-step AI integration process to global StructuredData

## Round 13 — Logo & Favicon
- [x] Extract AiiA chip logo from uploaded image (crop left half, transparent PNG)
- [x] Generate favicon sizes: 512, 192, 32, 16px from chip icon
- [x] Upload all 7 logo assets to CDN
- [x] Replace navbar SVG placeholder with real AiiA chip+wordmark logo
- [x] Set favicon in index.html (tab icon, 4 sizes + apple-touch-icon)
- [x] Add Open Graph meta image (1200x630) for social share previews
- [x] Add Twitter Card image meta tags
- [x] Update Organization JSON-LD logo URL to real CDN asset

## Round 14 — Favicon Fix (Tab Icon)
- [x] Copy favicon files to client/public/ for same-origin serving (iOS Safari requires same-origin)
- [x] Generate favicon.ico (16/32/48px multi-size) for maximum browser compatibility
- [x] Update index.html to reference local /favicon.ico, /favicon-32.png, /apple-touch-icon.png

## Round 15 — Logo Consistency
- [x] Replace old 4-dot gold square in Footer with real AiiA chip+wordmark logo
- [x] Replace gear/lock emoji icons on Admin login and setup pages with AiiA logo
- [x] Replace gear icon in Admin console header with AiiA logo
