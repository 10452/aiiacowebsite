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

## Round 16 — Workplace Page
- [x] Create /workplace page with full remote work policy (6 pillars + standards table + philosophy + CTA)
- [x] Register route in App.tsx
- [x] Add to sitemap.xml
- [x] Add to footer Company navigation

## Round 17 — Logo Update (Gold-Only Transparent)
- [x] Upload new gold-only transparent logo to CDN
- [x] Update Navbar logo (6 references replaced, 0 old remaining)
- [x] Update Footer logo
- [x] Update Admin console (login, setup, header — 3 instances)
- [x] Update favicon files in client/public/ (16/32/180/192/512px + .ico)
- [x] Update Organization JSON-LD logo URL in StructuredData.tsx

## Round 18 — Two-Tone Gold Logo
- [x] Generate two-tone gold logo from source image (dark antique gold interior + bright goldenrod frame/pins/wordmark)
- [x] Apply morphological closing to fill JPEG compression gaps in frame
- [x] Upload two-tone logo to CDN (1x + 2x retina)
- [x] Replace all 6 logo instances: Navbar, Footer, Admin login, Admin setup, Admin console header, JSON-LD schema
- [x] Regenerate all favicon files from two-tone logo (16/32/180/192/512px PNG + multi-size .ico)

## Round 21 — Read Aloud Feature (ElevenLabs Rachel Voice)
- [x] Add ElevenLabs API key to project secrets
- [x] Add TTS server procedure (Rachel voice, eleven_turbo_v2 model)
- [x] Create ReadAloud component with play/pause/stop controls and gold progress bar
- [x] Add LISTEN button to Navbar (desktop, between nav links and CTA)
- [x] Write vitest test for TTS API validation

## Round 22 — Read Aloud Voice Fix
- [x] Fix punctuation: clean dots/symbols from text before TTS (no literal "dot" spoken)
- [x] Tune ElevenLabs voice settings for more natural, witty, human delivery
- [x] Fix brand name pronunciation: AiiACo → "AiiA Co" (not AiiAko)

## Round 23 — Read Aloud Complete Rebuild (Scroll-Sync TTS)
- [ ] Redesign architecture: sentence-level chunks tied to DOM elements, not page sections
- [ ] Pre-fetch audio 2-3 sentences ahead to eliminate loading pauses
- [ ] Scroll-sync: IntersectionObserver tracks which sentence is in viewport, plays that sentence
- [ ] Word-by-word highlight on screen as Rachel speaks each word
- [ ] Instant reverse: scrolling up stops current audio and jumps to the sentence now in view
- [ ] Smooth auto-scroll: page follows along as audio plays (waterfall effect)
- [ ] Upgrade to eleven_multilingual_v2 with lower stability for more natural delivery
- [ ] Remove all section-level chunking, replace with sentence-level DOM-mapped approach

## Round 24 — Video Studio Nav Link
- [x] Add "Video Studio" CTA button in Navbar pointing to aiiaco.com/videostudio

## Round 25 — Video Studio Redirect & Nav Link
- [x] Add server-side redirect: GET /videostudio → https://aiivideo-zyf9pqt6.manus.space
- [x] Update navbar Video Studio button href to /videostudio (relative path)

## Round 26 — Fix /videostudio External Redirect
- [x] Fix /videostudio redirect to properly redirect externally (server-side before SPA catch-all)

## Round 28 — Niche Reduction (Real Estate / Mortgages / Brokerage / Management Consulting)
- [x] Audit all industry microsites and identify which to keep vs remove
- [x] Reduce industries data to 4 target verticals: Real Estate, Mortgage, CRE, Management Consulting
- [x] Update Industries homepage section to show only the 4 verticals with cards
- [x] Update case studies to keep only relevant industry cases (4 focused case studies)
- [x] Update hero KPIs and description to reflect focused niche
- [x] Update all "20+ industries" references across the site (Footer, TeamSection, AIImplementationPage, AIIntegrationPage, Home.tsx, ResultsPage, StructuredData)
- [x] Update SEO meta and structured data for focused niche

## Round 29 — Fix /videostudio Redirect (Double Approach)
- [x] Register /videostudio as absolute first Express route (before all middleware)
- [x] Add React Router /videostudio route with window.location.href redirect component

## Round 30 — Netlify _redirects Proxy for /videostudio
- [x] Add client/public/_redirects with proxy rules for /videostudio → https://aiivideo-zyf9pqt6.manus.space

## Round 31 — Evolved Positioning Update (EBITDA Efficiency Partner)
- [x] Update hero headline: "Remove Operational Friction. Run Your Business Faster."
- [x] Update hero subheadline with new AiiA positioning copy
- [x] Update hero bullet points (4 new primary points)
- [x] Update hero short explanation / body copy
- [x] Update CTA to "Book an Operational Strategy Call"
- [x] Add 3-line credibility block below hero: "Companies come to AiiA when..."
- [x] Update page SEO title and description to reflect new positioning

## Round 32 — Full Operator Brief Site Update
- [x] Save checkpoint with hero/credibility block changes from Round 31
- [x] Add Three Operational Leaks section (Field Workflow, Payroll Efficiency, Numbers We Don't Trust)
- [x] Align Method section to Find → Implement → Measure → Expand (4 phases)
- [x] Build conversational qualifier booking flow in Contact section (1 question at a time)
- [x] Update footer tagline to "Operational Intelligence for companies that refuse to let friction run the business"

## Round 33 — Suggestions Implementation
- [x] Update announcement bar to reflect new positioning
- [x] Wire qualifier budget/investment answers to admin leads dashboard columns
- [x] Complete Read Aloud rebuild: scroll-sync, sentence-level chunks, pre-fetch queue, word highlight, instant reverse on scroll

## Round 34 — CTA Buttons & CSV Export
- [x] Add "Does this sound familiar? Let's fix it." CTA button to each Operational Leaks card (scrolls to contact)
- [x] Add CSV export button to admin leads dashboard (downloads all leads including budget/investment columns)

## Round 35 — Proprietary AiiA Gold Icons (Brand Identity)
- [x] Audit all icon/emoji usage across the entire site
- [x] Generate 4 proprietary AiiA gold sector icons: Real Estate, Mortgage & Lending, Commercial Real Estate, Management Consulting
- [x] Generate 11 total AiiA gold icons: 4 industry sectors + 3 operational leaks + 6 WhatIsAiiA pillars
- [x] Upload all icons to CDN (webdev static assets, permanent lifecycle)
- [x] Replace all generic icons/emojis site-wide with proprietary AiiA gold assets (Industries, OperationalLeaks, WhatIsAiiA, Pricing)

## Round 36 — Icon Background Fix
- [ ] Regenerate workflow icon with fully transparent background (white bg visible on dark site)
- [ ] Re-upload and update CDN URL in OperationalLeaks component

## Round 36 — Skyline Brand Icon & Icon Background Fix
- [x] Generate premium AiiA gold skyline icon (Qatar/Dubai ultra-modern tower silhouette)
- [x] Fix all icon white backgrounds using AI-based rembg batch removal (14/14 icons)
- [x] Upload all 14 transparent icons to CDN and update all component references (Industries, OperationalLeaks, WhatIsAiiA, Pricing)

## Round 37 — Qualifier Flow Redesign, Skyline Icon, Landmark Icons
- [x] Audit current contact/qualifier form components and DB schema
- [x] Generate 3 large landmark section icons (Method, Industries, Models)
- [x] Swap Real Estate card icon to Dubai/Qatar skyline silhouette
- [x] Redesign qualifier into 3-step form: Step 1 (name/company/email/phone), Step 2 (problem dropdown with 10 options + free text), Step 3 (call booking: time preference or Calendly)
- [x] Progressive lead capture: save to DB as soon as name+company captured, update on each subsequent step
- [x] Integrate Calendly embed for call booking in Step 3
- [x] Add landmark icons to Method, Industries, Models section headers

## Round 38 — Calendly URL, Qualifier Modal CTAs, Lead Source Tracking
- [x] Update Calendly URL from calendly.com/aiiaco/discovery to calendly.com/aiiaco
- [x] Wire Operational Leaks "Does this sound familiar?" CTAs to open qualifier modal directly (not just scroll)
- [x] Add lead source tracking field to qualifier Step 1 (hidden, captures which CTA triggered it)
- [x] Pass lead source through all CTA entry points: Hero, Navbar, Operational Leaks cards (3 individual leak titles), ContactSection direct

## Round 39 — Broken Icon Fix
- [x] Re-upload all 3 landmark icons (Method, Industries, Models) to CDN and fix broken URLs in all three components

## Round 40 — Modal Layout Fix + Favicon
- [x] Fix qualifier modal desktop layout: widened to 1100px max with scrollable container
- [x] Add AiiA gold favicon with transparent background (rembg processed, all sizes regenerated, cache-busted with ?v=2)

## Round 41 — Admin Dashboard leadSource + Mobile Modal
- [x] Add leadSource column to admin leads dashboard table (Source badge column + expanded detail panel + CSV export updated)
- [x] Tighten mobile qualifier modal layout (responsive CSS: single-column grid below 860px, reduced padding, sidebar hidden on mobile)

## Round 42 — Investor-Grade Document Suite
- [ ] Gather brand assets: logo CDN URL, icon CDN URLs, color palette, font stack
- [ ] Build AiiACo Overview Brochure (HTML + print CSS, dark gold theme, matches website)
- [ ] Export brochure to PDF
- [ ] Build one-page visual architecture diagram (Infrastructure Stack + 3-pillar graphic)
- [ ] Export architecture diagram to PDF

## Round 42 — Investor-Grade Document Suite
- [x] Build AiiACo Overview Brochure as premium HTML/PDF matching website design (7-page A4, dark gold theme)
- [x] Build 3-Pillar Architecture Diagram (Database → Revenue → Operations) as landscape A4 PDF
- [x] Build AiiACo Infrastructure Stack diagram (5-layer stack + engagement flow + sector map) as landscape A4 PDF
- [x] All documents use proprietary AiiA gold icons, logo, and brand identity

## Round 43 — Open Graph / Social Share Preview Fix
- [x] Generate new 1200x630 OG preview image (dark gold, AiiA logo, current tagline)
- [x] Upload OG image to CDN (permanent webdev lifecycle URL)
- [x] Update index.html: og:description, og:image, twitter:description, twitter:image all updated

## Round 44 — OG Image Logo Consistency Fix
- [x] Composite the exact website logo (pure gold chip) into the OG preview image using Python/Pillow
- [x] Upload new OG image v3 to CDN and update index.html og:image + twitter:image

## Round 45 — AiiACo Masterpiece Overview Document
- [x] Read uploaded PDF content and extract all text/structure
- [x] Generate singular 3D gold masterpiece icon (Arc of the Covenant × Tron circuit board) — aiia-arc-icon-final.png
- [x] Build premium HTML document with finest paper texture, gold typography, masterpiece icon (4-page A4)
- [x] Export to PDF and verify quality — 4 pages, clean render, all assets loading

## Round 46 — Lead Confirmation Email + Diagnostic Privacy
- [x] Send lead a thank-you confirmation email on intake completion (call incoming, no diagnostic details)
- [x] Ensure AI diagnostic is sent ONLY to owner via Manus notification — never to the lead

## Round 47 — Rebuilt Diagnostic + Email Flow
- [x] Generate full diagnostic + lead brief in one structured LLM call (JSON schema response)
- [x] Owner notification: full report + preview of what the lead will receive
- [x] Lead email: email confirmation + meeting confirmation + high-level brief only

## Round 48 — Domain Verification, Admin Diagnostic Panel, Retroactive Diagnostic
- [x] Verify aiiaco.com sending domain in Resend (get DNS records, present to user)
- [x] Add AI diagnostic display to admin console lead detail panel
- [x] Run retroactive diagnostic for Maria Luisa (send her confirmation email + owner report)

## Round 50 — Logo in Google + Industry Pages
- [ ] Fix Google site icon — regenerate favicon from AiiA logo with clean transparent background
- [ ] Add all 20 missing industry slugs to industries.ts data file
- [ ] Verify IndustryMicrosite renders correctly for all slugs
- [ ] Update sitemap.xml to include all industry pages

## Round 50 — Full Audit Fix Run
- [x] Bug #1: Fix Calendly nemr1 link in IndustryMicrosite.tsx
- [x] Bug #2: Fix workflow icon white background in OperationalLeaks
- [x] Bug #3: Fix email sending domain to resend.aiiaco.com
- [ ] Improvement #1: Add Re-run Diagnostic button to admin leads panel
- [ ] Improvement #2: Lead status auto-progression to diagnostic_ready
- [ ] Improvement #3: Google Business Profile setup guide
- [ ] Improvement #4: AiiA Voice sentence-level sync (8 items)
- [ ] Improvement #5: Fix pre-existing leads.test.ts failure
- [ ] Improvement #6: Build AiiACo Overview Brochure PDF
- [ ] Improvement #7: Build Architecture Diagram PDF

## Round 51 — Next Steps Implementation
- [x] Add Re-run Diagnostic button to admin leads panel (regenerate GPT-4o diagnostic + re-send owner notification)
- [x] Fix leads.test.ts admin auth mock (inject valid JWT token into tRPC context)
- [x] Google Search Console indexing guidance for top 4 industry pages

## Round 52 — Polish & Infrastructure
- [x] Lead status auto-progression: move lead to diagnostic_ready after GPT-4o diagnostic completes
- [x] Re-run Diagnostic button: loading spinner + disabled state during mutation
- [x] Verify resend.aiiaco.com DNS and provide Namecheap CNAME setup guidance

## Round 53 — Admin Panel Enhancements
- [x] Add diagnostic_ready count badge to admin navbar header
- [x] Add per-lead notes field: DB schema migration, saveNotes tRPC procedure, notes textarea in expanded lead row

## Round 54 — Pipeline Intelligence
- [x] Notes preview (first ~60 chars) in collapsed lead row
- [x] Lead age colour-coded chip (green <3d, amber 3-7d, red >7d)
- [x] Calendly webhook: /api/webhooks/calendly → match email → auto-move lead to contacted

## Round 55 — AI Phone Diagnostic System
- [x] Research ElevenLabs Conversational AI API (agents, phone numbers, webhooks)
- [x] Design diagnostic agent prompt and 3-track routing logic
- [x] Build server: ElevenLabs agent creation/config endpoint + post-call webhook (lead capture)
- [x] Add Call Now CTA (+1 888-808-0001) to hero, navbar, contact sections
- [x] Build /admin/agent page: view/edit agent script and routing logic
- [x] Write tests for webhook lead capture

## Round 56 — ElevenLabs Phone Number
- [ ] Research ElevenLabs phone number provisioning API
- [ ] Acquire new number directly from ElevenLabs and assign to AiiA Diagnostic Agent
- [ ] Update all Call Now CTAs on site with new number

## Round 56 — Phone Number Provisioning (Telnyx)
- [x] Update Call Now CTAs with smart Calendly fallback while Telnyx verification propagates
- [x] Pre-build complete Telnyx provisioning script (number purchase + SIP trunk + ElevenLabs import)
- [ ] Run provisioning script once Telnyx Level 2 verification propagates (~30-60 min)
- [ ] Update site CTAs with real phone number

## Round 57 — Corporate Package, Transcript Viewer, Auto-Provisioning
- [x] Build /corporate page: modular AI rollout sequence (Cold Email → SDR+Website+Receptionist → Agent/Operator → Paid Ads → Podcast/Social)
- [x] Add call transcript viewer to admin expanded lead row (ElevenLabs post-call transcript inline)
- [x] Build automated Telnyx verification poller: polls every 30 min, runs provision-phone.mjs when Level 2 approved
