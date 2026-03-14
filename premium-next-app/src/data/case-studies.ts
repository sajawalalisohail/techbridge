/* ─── Case Study Data (Single Source of Truth) ───────────── */

export interface CaseStudyResult {
    stat: string;
    label: string;
}

export type CaseStudyCategory =
    | "web-platforms"
    | "mobile-apps"
    | "ai-automation"
    | "e-commerce"
    | "saas"
    | "branding-design";

export interface CaseStudy {
    slug: string;
    client: string;
    sector: string;
    metric: string;
    metricLabel: string;
    heroDescription: string;
    problem: string;
    solution: string;
    results: CaseStudyResult[];
    techStack: string[];
    tags: string[];
    assets: string[];
    liveUrl?: string;
    accentColor: string;
    category: CaseStudyCategory;
    featured?: boolean;
}

/* ─── Filter Categories ─────────────────────────────────── */
export const CATEGORIES = [
    { key: "all", label: "All" },
    { key: "web-platforms", label: "Web Platforms" },
    { key: "mobile-apps", label: "Mobile Apps" },
    { key: "ai-automation", label: "AI & Automation" },
    { key: "e-commerce", label: "E-Commerce" },
    { key: "saas", label: "SaaS" },
    { key: "branding-design", label: "Branding / Design" },
] as const;

/* ─── Case Studies ──────────────────────────────────────── */
export const CASE_STUDIES: CaseStudy[] = [
    /* ══════════════════════════════════════════════════════
       FEATURED — Original TechBridge projects (with assets)
    ══════════════════════════════════════════════════════ */
    {
        slug: "nextlex",
        client: "NextLex",
        sector: "Legal SaaS Platform",
        metric: "10k+",
        metricLabel: "Active Users Scaled To",
        heroDescription:
            "Complete architectural redesign and AI-driven document workflow automation for a legal SaaS platform.",
        problem:
            "NextLex was operating on a fragile monolithic architecture that buckled under load. Every new feature deployment risked cascading failures, and their document processing pipeline — the core of their product — relied on manual human review that couldn't scale.\n\nThe founding team knew they needed to move to a multi-tenant SaaS model to serve law firms across multiple jurisdictions, but their existing codebase made that migration feel impossible without a full rewrite.",
        solution:
            "We re-architected the entire platform from the ground up into a resilient, multi-tenant system using Next.js on the frontend and a serverless Node.js + PostgreSQL backend. The document pipeline was replaced with an AI-driven workflow that classifies, summarises, and routes legal documents automatically.\n\nWe implemented tenant isolation at the database level, built a real-time collaboration layer, and deployed the entire stack on a globally distributed edge network for sub-200ms response times across three continents.",
        results: [
            { stat: "10,000+", label: "Active Users" },
            { stat: "70%", label: "Reduction in Manual Review" },
            { stat: "99.9%", label: "Uptime Achieved" },
            { stat: "3", label: "Continents Served" },
        ],
        techStack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "OpenAI", "Vercel", "AWS"],
        tags: ["Next.js", "AI Automation", "Dashboard", "Multi-tenant SaaS"],
        assets: ["/proofs/NextLex/1.png", "/proofs/NextLex/2.png", "/proofs/NextLex/3.png", "/proofs/NextLex/4.png", "/proofs/NextLex/5.png"],
        liveUrl: "https://nextlex.com",
        accentColor: "109,40,217",
        category: "saas",
        featured: true,
    },
    {
        slug: "ali-wali",
        client: "Ali Wali Trading Company",
        sector: "Global Industrial Trade & Logistics",
        metric: "35+",
        metricLabel: "Years of Global Trade",
        heroDescription:
            "Digitized the global presence for a direct buyer of industrial plied rubber conveyor belts.",
        problem:
            "Ali Wali Trading Company had operated for over 35 years using phone calls, faxes, and manual paperwork to coordinate international pickups and container shipping. Their web presence was a static brochure site from the early 2010s that conveyed none of the scale or professionalism of their global operation.\n\nProspective clients in mining, quarries, and cement manufacturing needed a fast way to request evaluations and quotes, but the existing process involved multiple emails and days of back-and-forth.",
        solution:
            "We built a streamlined, professional platform that digitized their entire international request-for-quote flow. The new site serves as both a credibility anchor and a lead generation tool — allowing prospective buyers to submit detailed evaluation requests directly.\n\nThe platform was deployed with zero downtime, replacing the legacy site seamlessly during a scheduled maintenance window. Every page loads in under 1 second, with full mobile optimization for clients working from remote mining sites.",
        results: [
            { stat: "35+", label: "Years of Trade Legacy Preserved" },
            { stat: "< 1s", label: "Page Load Time" },
            { stat: "0", label: "Downtime During Migration" },
            { stat: "4×", label: "Increase in Inbound Inquiries" },
        ],
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
        tags: ["Global Logistics", "Next.js", "B2B Portal"],
        assets: ["/proofs/AliWali/1.png", "/proofs/AliWali/2.png", "/proofs/AliWali/3.png", "/proofs/AliWali/4.png", "/proofs/AliWali/5.png", "/proofs/AliWali/6.png"],
        liveUrl: "https://aliwalitrading.com",
        accentColor: "79,70,229",
        category: "web-platforms",
        featured: true,
    },
    {
        slug: "primemark",
        client: "PrimeMark Apparel",
        sector: "B2B Manufacturing Portal",
        metric: "300%",
        metricLabel: "Faster Order Routing",
        heroDescription:
            "High-performance digital storefront streamlining global supply chain operations for large-scale apparel manufacturing.",
        problem:
            "PrimeMark Apparel managed a sprawling global supply chain using spreadsheets, manual email chains, and fragmented tools. Order routing from international buyers to their manufacturing facilities took days, with frequent miscommunications that led to production delays and fulfillment errors.\n\nTheir sales team had no unified view of order status, and supplier coordination was handled through disconnected communication channels that made scaling impossible.",
        solution:
            "We engineered a unified digital storefront and operations platform that consolidated order management, supplier coordination, and logistics tracking into a single, real-time interface. The system automatically routes incoming orders to the optimal manufacturing facility based on capacity, geography, and material availability.\n\nA dedicated supplier portal gives manufacturing partners direct visibility into order queues and delivery schedules, eliminating the email chains that were bottlenecking fulfillment.",
        results: [
            { stat: "300%", label: "Faster Order Routing" },
            { stat: "85%", label: "Reduction in Email Chains" },
            { stat: "12×", label: "Lead Quality Improvement" },
        ],
        techStack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS", "Vercel"],
        tags: ["E-Commerce", "API Integration", "Supply Chain", "B2B"],
        assets: ["/proofs/PrimeMark/1.png", "/proofs/PrimeMark/2.png", "/proofs/PrimeMark/3.png", "/proofs/PrimeMark/4.png", "/proofs/PrimeMark/5.png", "/proofs/PrimeMark/6.png"],
        liveUrl: "https://primemarkapparel.com",
        accentColor: "99,102,241",
        category: "e-commerce",
        featured: true,
    },
    {
        slug: "internal-ops-dashboard",
        client: "Internal Ops Dashboard",
        sector: "Enterprise Internal Tools",
        metric: "40%",
        metricLabel: "Reduction in Ops Overhead",
        heroDescription:
            "Custom internal operations dashboard consolidating fragmented business tools into a single real-time command center.",
        problem:
            "A mid-size enterprise client was running day-to-day operations across seven disconnected SaaS tools. Team leads spent hours each morning aggregating data from different platforms just to get a basic status update. Critical alerts were lost in email inboxes, and no one had a unified view of operational health.\n\nThe lack of integration meant that simple decisions — like reallocating resources between projects — required manual data pulls that took half a day.",
        solution:
            "We designed and deployed a custom internal operations dashboard that aggregates data from all seven existing tools via API integrations. The dashboard provides real-time KPIs, automated alerts with escalation logic, and a drag-and-drop resource allocation interface.\n\nAdmins get a single-pane-of-glass view of all active projects, team capacity, and system health. The entire solution was built as an internal tool — no public-facing pages — optimized for speed and information density.",
        results: [
            { stat: "40%", label: "Reduction in Ops Overhead" },
            { stat: "7→1", label: "Tool Consolidation" },
            { stat: "Real-time", label: "KPI Visibility" },
        ],
        techStack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "REST APIs", "Tailwind CSS"],
        tags: ["Internal Tools", "Dashboard", "API Integration", "Enterprise"],
        assets: [],
        accentColor: "139,92,246",
        category: "ai-automation",
        featured: true,
    },
    {
        slug: "saas-analytics-platform",
        client: "SaaS Analytics Platform",
        sector: "B2B SaaS Analytics",
        metric: "5M+",
        metricLabel: "Events Processed Daily",
        heroDescription:
            "High-throughput analytics platform processing millions of events daily for B2B SaaS companies.",
        problem:
            "A growing B2B SaaS company needed a custom analytics layer that went beyond what off-the-shelf tools like Mixpanel or Amplitude could provide. Their product generated millions of events daily, and they needed real-time cohort analysis, custom funnel visualization, and predictive churn scoring — all within their own infrastructure for data privacy compliance.\n\nExisting solutions either couldn't handle the event volume at an acceptable cost, or required exporting sensitive customer data to third-party platforms that violated their enterprise clients' security requirements.",
        solution:
            "We architected a custom analytics platform built on a high-throughput event ingestion pipeline. The system processes and enriches events in real-time, stores them in a columnar database optimized for analytical queries, and surfaces insights through a custom dashboard with sub-second query response times.\n\nThe platform includes real-time cohort analysis, configurable funnel builders, and a machine learning pipeline for predictive churn scoring — all running entirely within the client's own infrastructure.",
        results: [
            { stat: "5M+", label: "Events Processed Daily" },
            { stat: "< 500ms", label: "Avg. Query Response" },
            { stat: "100%", label: "Data Stays In-House" },
        ],
        techStack: ["Next.js", "TypeScript", "Python", "PostgreSQL", "ClickHouse", "AWS", "Docker"],
        tags: ["Analytics", "High-Throughput", "ML Pipeline", "B2B SaaS"],
        assets: [],
        accentColor: "99,102,241",
        category: "saas",
        featured: true,
    },

    /* ══════════════════════════════════════════════════════
       PARTNERSHIP — Sydstack portfolio projects
    ══════════════════════════════════════════════════════ */
    {
        slug: "buff-dudes",
        client: "Buff Dudes",
        sector: "Fitness & Wellness",
        metric: "50k+",
        metricLabel: "App Downloads",
        heroDescription:
            "Full-featured fitness companion app with workout tracking, nutrition plans, and community features for a major fitness brand.",
        problem:
            "Buff Dudes had a massive following across YouTube and social media but no dedicated mobile product to monetize their audience directly. Their fans relied on scattered PDFs, spreadsheets, and third-party apps to follow workout programs — leading to poor retention and zero data on user engagement.\n\nThe team needed a branded, native mobile experience that could deliver structured workout plans, track progress, and foster community — all while handling the traffic spikes that come with viral content drops.",
        solution:
            "We built a cross-platform mobile app with structured workout programs, progress tracking with visual analytics, nutrition logging with macro breakdowns, and a community feed for user accountability. The app syncs seamlessly across devices and handles burst traffic from social media promotions.\n\nPush notification sequences drive daily engagement, and an admin dashboard lets the Buff Dudes team publish new programs without developer involvement.",
        results: [
            { stat: "50,000+", label: "Downloads in First Quarter" },
            { stat: "68%", label: "Day-30 Retention" },
            { stat: "4.7★", label: "App Store Rating" },
        ],
        techStack: ["React Native", "TypeScript", "Firebase", "Node.js", "Expo"],
        tags: ["Mobile App", "Fitness", "iOS/Android", "Community"],
        assets: [],
        accentColor: "234,88,12",
        category: "mobile-apps",
    },
    {
        slug: "truck-adda",
        client: "Truck Adda",
        sector: "Logistics & Fleet Management",
        metric: "2,000+",
        metricLabel: "Active Fleet Vehicles",
        heroDescription:
            "Real-time fleet management and logistics platform connecting truck owners with shippers across South Asia.",
        problem:
            "The trucking industry in South Asia operates largely through phone-based brokers, with zero digital visibility into fleet availability, pricing, or shipment tracking. Truck owners waste hours waiting for loads while shippers overpay for last-minute bookings. Both sides lacked trust and transparency.\n\nExisting logistics apps focused on last-mile delivery — nobody was solving the long-haul freight matching problem with the real-time tracking and payment guarantees that enterprise shippers demand.",
        solution:
            "We designed and built a two-sided marketplace connecting truck owners directly with shippers. The platform features real-time GPS tracking, automated load matching based on route and capacity, digital documentation for each shipment, and an escrow-based payment system.\n\nA driver-side mobile app optimized for low-bandwidth environments lets fleet operators manage bookings, track earnings, and receive push alerts for nearby loads — all in Urdu and English.",
        results: [
            { stat: "2,000+", label: "Active Fleet Vehicles" },
            { stat: "35%", label: "Cost Reduction for Shippers" },
            { stat: "< 4hr", label: "Avg. Load Matching Time" },
        ],
        techStack: ["React Native", "Node.js", "PostgreSQL", "Google Maps API", "Firebase", "Socket.io"],
        tags: ["Mobile App", "Logistics", "Marketplace", "Real-time"],
        assets: [],
        accentColor: "14,165,233",
        category: "mobile-apps",
    },
    {
        slug: "tree-tracker-pro",
        client: "Tree Tracker Pro",
        sector: "Environmental & Sustainability Tech",
        metric: "100k+",
        metricLabel: "Trees Catalogued",
        heroDescription:
            "GPS-enabled environmental monitoring app for cataloguing, tracking, and reporting on urban and rural tree populations.",
        problem:
            "Environmental agencies and urban planning departments needed a scalable way to catalogue tree populations, monitor health over time, and generate compliance reports for sustainability mandates. Existing methods relied on paper surveys, disconnected spreadsheets, and expensive specialized GIS software that field workers couldn't use on mobile devices.\n\nThere was no affordable, field-ready tool that combined GPS mapping, photo documentation, health scoring, and automated reporting in a single mobile interface.",
        solution:
            "We built a mobile-first platform that lets field workers tag and catalogue trees using GPS coordinates, capture multi-angle photos, record health assessments, and sync everything to a central dashboard in real-time. The app works offline for remote areas and syncs when connectivity returns.\n\nThe admin dashboard generates automated compliance reports, visualizes tree density on interactive maps, and tracks health trends across seasons with historical comparison tools.",
        results: [
            { stat: "100,000+", label: "Trees Catalogued" },
            { stat: "80%", label: "Faster Field Surveys" },
            { stat: "3", label: "Government Contracts Won" },
        ],
        techStack: ["React Native", "TypeScript", "PostgreSQL", "MapBox", "AWS S3", "Node.js"],
        tags: ["Mobile App", "Environmental", "GIS", "Offline-first"],
        assets: [],
        accentColor: "34,197,94",
        category: "mobile-apps",
    },
    {
        slug: "muraqaba",
        client: "Muraqaba",
        sector: "Mindfulness & Wellness",
        metric: "25k+",
        metricLabel: "Active Practitioners",
        heroDescription:
            "Culturally-aware mindfulness and meditation app featuring guided sessions, habit tracking, and community accountability.",
        problem:
            "The global mindfulness app market is dominated by Western-centric products. There was no dedicated platform serving South Asian and Muslim communities with culturally relevant guided meditation, dhikr tracking, and prayer-time-aware scheduling.\n\nExisting apps felt alienating to the target demographic — wrong language, wrong cultural references, and meditation styles that didn't resonate. The opportunity was a premium, beautifully designed app that felt native to the audience.",
        solution:
            "We built a cross-platform mobile app with guided meditation sessions in Urdu and English, dhikr counters with haptic feedback, prayer-time integration, and streak-based habit tracking. The design system draws from Islamic geometric patterns while maintaining a modern, premium aesthetic.\n\nA community feature lets practitioners share milestones and form accountability groups. Push notifications are prayer-time-aware, delivering mindfulness prompts at culturally appropriate moments.",
        results: [
            { stat: "25,000+", label: "Active Practitioners" },
            { stat: "4.8★", label: "App Store Rating" },
            { stat: "12 min", label: "Avg. Daily Session" },
        ],
        techStack: ["Flutter", "Dart", "Firebase", "Node.js", "Adhan API"],
        tags: ["Mobile App", "Wellness", "Community", "Localization"],
        assets: [],
        accentColor: "168,85,247",
        category: "mobile-apps",
    },
    {
        slug: "swap-fans",
        client: "SwapFans",
        sector: "Social Platform",
        metric: "40k+",
        metricLabel: "Registered Users",
        heroDescription:
            "Two-sided social engagement platform connecting creators with fans through exclusive content, digital collectibles, and live interactions.",
        problem:
            "Content creators on mainstream platforms have limited monetization options and zero ownership of their audience relationships. Fans want deeper engagement — exclusive content, direct interaction, digital collectibles — but existing platforms take 30-50% cuts and offer no meaningful community features.\n\nThe founders needed a platform that gave creators full control over pricing, content distribution, and fan relationships, while providing fans a premium experience worth paying for.",
        solution:
            "We engineered a creator-first social platform with tiered subscription models, exclusive content vaults, live streaming with real-time tipping, and digital collectible drops. Creators get a branded profile page, analytics dashboard, and automated payout scheduling.\n\nThe fan experience includes personalized content feeds, direct messaging with creators, collectible display galleries, and community forums — all built for engagement and retention.",
        results: [
            { stat: "40,000+", label: "Registered Users" },
            { stat: "15%", label: "Creator-to-Fan Conversion" },
            { stat: "3.2×", label: "Revenue vs. Prior Platform" },
        ],
        techStack: ["React Native", "Next.js", "Node.js", "PostgreSQL", "Stripe", "WebSocket", "AWS"],
        tags: ["Mobile App", "Social Platform", "Marketplace", "Creators"],
        assets: [],
        accentColor: "244,63,94",
        category: "mobile-apps",
    },
    {
        slug: "face-bloom",
        client: "FaceBloom",
        sector: "Beauty Tech & Branding",
        metric: "200k+",
        metricLabel: "Photos Processed",
        heroDescription:
            "AI-powered beauty and selfie enhancement app with a design-led brand identity from concept to App Store.",
        problem:
            "The beauty tech space is crowded with poorly designed filter apps that look cheap and feel invasive. FaceBloom's founders wanted a premium product that used AI for subtle, natural-looking enhancements — not cartoonish filters. They needed both the technical AI pipeline and a brand identity that communicated elegance and trust.\n\nThe challenge was building an app that processed photos in real-time on-device while maintaining the visual quality users expect from a premium beauty brand.",
        solution:
            "We delivered end-to-end: brand identity (logo, color system, typography, packaging), UI/UX design (complete Figma design system with 40+ screens), and the mobile app itself. The AI pipeline runs on-device using CoreML and TensorFlow Lite for real-time processing without server costs.\n\nThe app features natural skin smoothing, lighting correction, color grading presets, and a before/after comparison tool — all wrapped in a brand experience that feels luxury, not gimmicky.",
        results: [
            { stat: "200,000+", label: "Photos Processed" },
            { stat: "< 200ms", label: "On-device Processing" },
            { stat: "4.6★", label: "App Store Rating" },
        ],
        techStack: ["Swift", "CoreML", "TensorFlow Lite", "Figma", "After Effects"],
        tags: ["Mobile App", "AI/ML", "Branding", "UI/UX Design"],
        assets: [],
        accentColor: "236,72,153",
        category: "branding-design",
    },
    {
        slug: "win-the-day",
        client: "Win the Day Planner",
        sector: "Productivity",
        metric: "15k+",
        metricLabel: "Daily Active Users",
        heroDescription:
            "Minimalist daily planning app focused on prioritization, time-blocking, and evening reflection rituals.",
        problem:
            "Productivity apps are overwhelming. Most pack in every feature imaginable — Gantt charts, Kanban boards, calendar sync, team collaboration — and end up being tools that create more work than they eliminate. The founder wanted a deliberately simple app focused on one thing: helping individuals win each day by planning intentionally.\n\nThe core insight was that people don't need another project manager — they need a daily ritual that takes 5 minutes in the morning and 2 minutes at night.",
        solution:
            "We built a mobile app centered around a three-step daily ritual: morning planning (pick 3 priorities), time-blocking (drag tasks into hourly slots), and evening reflection (rate your day and journal). No team features, no complex integrations — radical simplicity by design.\n\nThe UI is calm, minimal, and fast. A weekly review screen surfaces trends in productivity, mood, and goal completion. Streak tracking and gentle push notifications build the habit without being annoying.",
        results: [
            { stat: "15,000+", label: "Daily Active Users" },
            { stat: "82%", label: "7-Day Streak Rate" },
            { stat: "4.9★", label: "App Store Rating" },
        ],
        techStack: ["React Native", "TypeScript", "Firebase", "Expo", "Lottie"],
        tags: ["Mobile App", "Productivity", "Habit Tracking", "Minimal UI"],
        assets: [],
        accentColor: "245,158,11",
        category: "mobile-apps",
    },
    {
        slug: "cooling-on-demand",
        client: "CoolingOnDemand",
        sector: "E-Commerce & HVAC",
        metric: "500+",
        metricLabel: "Monthly Orders",
        heroDescription:
            "Full-stack e-commerce platform for on-demand HVAC equipment rental and purchase with real-time inventory management.",
        problem:
            "CoolingOnDemand served industrial clients needing temporary cooling solutions for events, construction sites, and emergency breakdowns. Their ordering process was entirely manual — phone calls, PDF catalogs, and handwritten quotes. Clients couldn't see real-time inventory, compare units, or book equipment without a salesperson.\n\nAs demand grew, the manual process became a bottleneck. Orders were lost, double-bookings happened, and the sales team spent more time on logistics than selling.",
        solution:
            "We built a full e-commerce platform with real-time inventory visibility, equipment comparison tools, instant quoting, and online booking with delivery scheduling. The admin panel tracks equipment location, maintenance schedules, and utilization rates across the entire fleet.\n\nIntegration with their logistics system enables automated dispatch notifications and delivery tracking. The platform handles both rental and purchase flows with different pricing logic and contract terms.",
        results: [
            { stat: "500+", label: "Monthly Orders" },
            { stat: "60%", label: "Reduction in Booking Time" },
            { stat: "0", label: "Double-Bookings Since Launch" },
        ],
        techStack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Stripe", "Tailwind CSS"],
        tags: ["E-Commerce", "Inventory Management", "B2B", "Real-time"],
        assets: [],
        accentColor: "6,182,212",
        category: "e-commerce",
    },
    {
        slug: "table-tapp",
        client: "TableTapp",
        sector: "Hospitality Tech",
        metric: "150+",
        metricLabel: "Restaurants Onboarded",
        heroDescription:
            "Restaurant management platform combining table reservations, digital menus, and order management into a unified hospitality system.",
        problem:
            "Independent restaurants were juggling multiple disconnected tools — one for reservations, another for digital menus, a separate POS for ordering, and yet another for customer feedback. The cost and complexity made digital transformation feel out of reach for most small-to-mid-size restaurants.\n\nDuring peak hours, the friction between these systems created delays, order errors, and frustrated customers. Restaurant owners needed one platform that did everything.",
        solution:
            "We built a unified web and mobile platform that handles reservations, QR-code digital menus, tableside ordering, kitchen display routing, and customer feedback — all in one system. Restaurants set up in under 30 minutes with a guided onboarding flow.\n\nThe platform integrates with existing POS systems and payment processors, supports multi-location management, and provides analytics on table turnover, popular items, and peak hour patterns.",
        results: [
            { stat: "150+", label: "Restaurants Onboarded" },
            { stat: "25%", label: "Faster Table Turnover" },
            { stat: "40%", label: "Reduction in Order Errors" },
        ],
        techStack: ["Next.js", "React Native", "Node.js", "PostgreSQL", "Socket.io", "Stripe"],
        tags: ["Web Platform", "Mobile App", "Hospitality", "SaaS"],
        assets: [],
        accentColor: "249,115,22",
        category: "web-platforms",
    },
    {
        slug: "mall-buddy",
        client: "MallBuddy",
        sector: "Retail & Marketplace",
        metric: "30+",
        metricLabel: "Malls Integrated",
        heroDescription:
            "Shopping companion marketplace app connecting mall visitors with real-time deals, store navigation, and loyalty rewards.",
        problem:
            "Shopping malls were losing foot traffic to online retail and had no digital tools to compete. Individual stores ran disconnected promotions, shoppers had no way to discover deals across the mall, and mall management lacked data on visitor behavior and store performance.\n\nThe challenge was building a platform that served three stakeholders simultaneously: shoppers wanting deals, stores wanting traffic, and mall operators wanting analytics.",
        solution:
            "We built a mobile marketplace app where shoppers discover real-time deals, navigate to stores with indoor wayfinding, collect cross-store loyalty points, and share recommendations. Stores get a self-service dashboard to publish promotions and track redemption rates.\n\nMall operators see aggregated foot traffic analytics, store performance comparisons, and can push targeted promotions to shoppers based on location and shopping history. The entire system runs on BLE beacons for precise indoor positioning.",
        results: [
            { stat: "30+", label: "Malls Integrated" },
            { stat: "22%", label: "Increase in Store Foot Traffic" },
            { stat: "3.5×", label: "Deal Redemption Rate" },
        ],
        techStack: ["React Native", "Next.js", "Node.js", "PostgreSQL", "BLE Beacons", "Firebase"],
        tags: ["Mobile App", "Marketplace", "Retail", "Location-based"],
        assets: [],
        accentColor: "139,92,246",
        category: "e-commerce",
    },
    {
        slug: "aggadoo",
        client: "Aggadoo",
        sector: "Creative Agency & Web",
        metric: "45%",
        metricLabel: "Increase in Conversions",
        heroDescription:
            "Design-led website and complete brand identity for a creative entertainment agency expanding into digital.",
        problem:
            "Aggadoo was a well-known entertainment agency with strong offline presence but a dated, template-based website that didn't reflect their creative caliber. Their online conversion rate was below 2%, and they were losing potential corporate clients who judged them by their digital presence.\n\nThey needed a website that felt as creative and energetic as their live events — not a corporate brochure, but an experience that demonstrated their creative capabilities through the design itself.",
        solution:
            "We led with design: full brand refresh (color system, typography, motion language), then built an immersive website with scroll-driven animations, video-heavy case study layouts, and an interactive booking flow. Every page transition feels intentional, with micro-animations that reinforce the brand's energetic personality.\n\nThe site architecture was rebuilt around conversion — clear service tiers, prominent social proof, and a streamlined inquiry form that reduced booking friction by 60%.",
        results: [
            { stat: "45%", label: "Increase in Conversions" },
            { stat: "3×", label: "Average Session Duration" },
            { stat: "60%", label: "Reduction in Booking Friction" },
        ],
        techStack: ["Next.js", "Framer Motion", "Figma", "Tailwind CSS", "Sanity CMS", "Vercel"],
        tags: ["Web Platform", "UI/UX Design", "Branding", "Animation"],
        assets: [],
        accentColor: "99,102,241",
        category: "branding-design",
    },
    {
        slug: "new-leaf",
        client: "New Leaf",
        sector: "Sustainability & Branding",
        metric: "Brand",
        metricLabel: "Identity from Scratch",
        heroDescription:
            "Complete brand identity and web presence for an eco-conscious lifestyle brand launching into a competitive market.",
        problem:
            "New Leaf was launching a sustainability-focused lifestyle brand but had no visual identity, no web presence, and no design system to build from. The founders had a clear mission — make sustainable living accessible and aspirational — but needed a creative partner to translate that vision into a cohesive brand.\n\nThe competitive landscape was saturated with green-washed brands using predictable earthy tones and leaf motifs. New Leaf needed to stand apart while still communicating authenticity.",
        solution:
            "We developed a complete brand identity: logo system with responsive variants, a color palette that breaks from sustainability clichés (warm neutrals + electric green accents), custom typography pairings, photography direction, and a comprehensive brand guidelines document.\n\nThe website was built as a content-rich platform with editorial-style storytelling, product showcases with sustainability scoring, and an impact tracker showing collective environmental contribution from the community.",
        results: [
            { stat: "Brand", label: "Complete Identity Delivered" },
            { stat: "50+", label: "Brand Assets Created" },
            { stat: "2 weeks", label: "Concept to Launch" },
        ],
        techStack: ["Figma", "Adobe Illustrator", "Next.js", "Tailwind CSS", "Sanity CMS"],
        tags: ["Branding", "UI/UX Design", "Web Platform", "Sustainability"],
        assets: [],
        accentColor: "34,197,94",
        category: "branding-design",
    },
];

/* ─── Helper ─────────────────────────────────────────────── */
export function getCaseStudy(slug: string): CaseStudy | undefined {
    return CASE_STUDIES.find((cs) => cs.slug === slug);
}
