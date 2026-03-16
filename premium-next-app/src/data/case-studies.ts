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

export type CaseStudyEngagementType =
    | "platform"
    | "internal-tool"
    | "mobile-app"
    | "website"
    | "branding";

export type CaseStudyHomepageHighlight = "standard" | "rapid-website";

export type CaseStudyWorkSection =
    | "flagship-platforms"
    | "systems-tools"
    | "mobile-products"
    | "rapid-websites";

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
    engagementType: CaseStudyEngagementType;
    homepageFeatured?: boolean;
    homepageHighlight?: CaseStudyHomepageHighlight;
    workSection?: CaseStudyWorkSection;
}

export const CATEGORIES = [
    { key: "all", label: "All" },
    { key: "web-platforms", label: "Web Platforms" },
    { key: "mobile-apps", label: "Mobile Apps" },
    { key: "ai-automation", label: "AI & Automation" },
    { key: "e-commerce", label: "E-Commerce" },
    { key: "saas", label: "SaaS" },
    { key: "branding-design", label: "Branding / Design" },
] as const;

export const CASE_STUDIES: CaseStudy[] = [
    {
        slug: "nextlex",
        client: "NextLex",
        sector: "Legal SaaS Marketing Website",
        metric: "14 Days",
        metricLabel: "From Concept to Live",
        heroDescription:
            "Premium marketing website for a legal document automation company, built to sharpen positioning and accelerate growth.",
        problem:
            "NextLex needed a modern digital presence that communicated trust, product sophistication, and category authority. Their older web experience undersold the brand and failed to support their outbound and inbound growth efforts.\n\nThe team needed a website that could explain the product clearly, present the company credibly, and convert legal prospects without feeling generic or slow.",
        solution:
            "We designed and launched a premium marketing website with clear product positioning, stronger information architecture, and polished visuals tailored to a legal-tech audience. The experience focused on fast performance, clearer messaging, and a higher-end brand presentation.\n\nThe final site gave the team a sharper top-of-funnel asset for demos, campaigns, and investor conversations without the drag of a long agency timeline.",
        results: [
            { stat: "14 Days", label: "Concept to Launch" },
            { stat: "Premium", label: "Brand Positioning Upgrade" },
            { stat: "< 1s", label: "Fast Page Loads" },
            { stat: "Live", label: "Campaign-Ready Delivery" },
        ],
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
        tags: ["Marketing Website", "Legal Tech", "Next.js", "Conversion Design"],
        assets: ["/proofs/NextLex/1.png", "/proofs/NextLex/2.png", "/proofs/NextLex/3.png", "/proofs/NextLex/4.png", "/proofs/NextLex/5.png"],
        liveUrl: "https://nextlex.com",
        accentColor: "var(--brand-accent-rgb)",
        category: "web-platforms",
        engagementType: "website",
        homepageFeatured: true,
        homepageHighlight: "standard",
        workSection: "rapid-websites",
    },
    {
        slug: "ali-wali",
        client: "Ali Wali Trading Company",
        sector: "B2B Industrial Website",
        metric: "24 Hours",
        metricLabel: "Rapid Launch Delivery",
        heroDescription:
            "Premium 24-hour website for a long-standing industrial trading company, built to modernize credibility and inbound lead flow.",
        problem:
            "Ali Wali Trading Company had operated for over 35 years using phone calls, faxes, and manual paperwork to coordinate international pickups and container shipping. Their web presence was a static brochure site from the early 2010s that conveyed none of the scale or professionalism of their global operation.\n\nProspective clients in mining, quarries, and cement manufacturing needed a fast way to request evaluations and quotes, but the existing process involved multiple emails and days of back-and-forth.",
        solution:
            "We built a streamlined, professional website that digitized their request-for-quote flow while dramatically upgrading how the business presented itself online. The new experience functions as both a credibility anchor and a lead generation asset for industrial buyers.\n\nThe site was delivered on a 24-hour turnaround, deployed with zero downtime, and optimized for speed on desktop and mobile for buyers working across harsh field conditions.",
        results: [
            { stat: "24 Hours", label: "Delivery Window" },
            { stat: "< 1s", label: "Page Load Time" },
            { stat: "0", label: "Downtime During Migration" },
            { stat: "4x", label: "Increase in Inbound Inquiries" },
        ],
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
        tags: ["Rapid Website", "Global Logistics", "Next.js", "B2B Lead Gen"],
        assets: ["/proofs/AliWali/1.png", "/proofs/AliWali/2.png", "/proofs/AliWali/3.png", "/proofs/AliWali/4.png", "/proofs/AliWali/5.png", "/proofs/AliWali/6.png"],
        liveUrl: "https://aliwalitrading.com",
        accentColor: "var(--brand-accent-dark-rgb)",
        category: "web-platforms",
        engagementType: "website",
        homepageFeatured: true,
        homepageHighlight: "rapid-website",
        workSection: "rapid-websites",
    },
    {
        slug: "primemark",
        client: "PrimeMark Apparel",
        sector: "B2B Apparel Website",
        metric: "12x",
        metricLabel: "Lead Quality Improvement",
        heroDescription:
            "High-performance website for a large-scale apparel manufacturer, built to present capability clearly and capture stronger enterprise leads.",
        problem:
            "PrimeMark Apparel needed a more credible digital presence for international buyers. Their existing website did not reflect the quality, scale, or responsiveness of the business, which made it harder to convert enterprise inquiries.\n\nThe team needed a cleaner, more premium site that could communicate manufacturing capability and reduce friction in the lead process.",
        solution:
            "We designed and launched a conversion-focused B2B website with stronger positioning, clearer service architecture, and a sharper visual presentation. The experience was built to give enterprise buyers confidence quickly and make contact intent more actionable.\n\nThe finished site improved lead quality while giving the sales team a much stronger asset for outbound and inbound business development.",
        results: [
            { stat: "12x", label: "Lead Quality Improvement" },
            { stat: "Fast", label: "Performance-First Delivery" },
            { stat: "Premium", label: "Brand Presentation Upgrade" },
        ],
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
        tags: ["B2B Website", "Manufacturing", "Lead Generation", "Next.js"],
        assets: ["/proofs/PrimeMark/1.png", "/proofs/PrimeMark/2.png", "/proofs/PrimeMark/3.png", "/proofs/PrimeMark/4.png", "/proofs/PrimeMark/5.png", "/proofs/PrimeMark/6.png"],
        liveUrl: "https://primemarkapparel.com",
        accentColor: "var(--brand-accent-light-rgb)",
        category: "web-platforms",
        engagementType: "website",
        homepageFeatured: true,
        homepageHighlight: "standard",
        workSection: "rapid-websites",
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
            "A mid-size enterprise client was running day-to-day operations across seven disconnected SaaS tools. Team leads spent hours each morning aggregating data from different platforms just to get a basic status update. Critical alerts were lost in email inboxes, and no one had a unified view of operational health.\n\nThe lack of integration meant that simple decisions like reallocating resources between projects required manual data pulls that took half a day.",
        solution:
            "We designed and deployed a custom internal operations dashboard that aggregates data from all seven existing tools via API integrations. The dashboard provides real-time KPIs, automated alerts with escalation logic, and a drag-and-drop resource allocation interface.\n\nAdmins get a single-pane-of-glass view of all active projects, team capacity, and system health. The entire solution was built as an internal tool optimized for speed and information density.",
        results: [
            { stat: "40%", label: "Reduction in Ops Overhead" },
            { stat: "7 to 1", label: "Tool Consolidation" },
            { stat: "Real-time", label: "KPI Visibility" },
        ],
        techStack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "REST APIs", "Tailwind CSS"],
        tags: ["Internal Tools", "Dashboard", "API Integration", "Enterprise"],
        assets: [],
        accentColor: "var(--brand-accent-rgb)",
        category: "ai-automation",
        featured: true,
        engagementType: "internal-tool",
        homepageFeatured: true,
        homepageHighlight: "standard",
        workSection: "systems-tools",
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
            "A growing B2B SaaS company needed a custom analytics layer that went beyond what off-the-shelf tools like Mixpanel or Amplitude could provide. Their product generated millions of events daily, and they needed real-time cohort analysis, custom funnel visualization, and predictive churn scoring all within their own infrastructure for data privacy compliance.\n\nExisting solutions either could not handle the event volume at an acceptable cost, or required exporting sensitive customer data to third-party platforms that violated their enterprise clients' security requirements.",
        solution:
            "We architected a custom analytics platform built on a high-throughput event ingestion pipeline. The system processes and enriches events in real-time, stores them in a columnar database optimized for analytical queries, and surfaces insights through a custom dashboard with sub-second query response times.\n\nThe platform includes real-time cohort analysis, configurable funnel builders, and a machine learning pipeline for predictive churn scoring all running entirely within the client's own infrastructure.",
        results: [
            { stat: "5M+", label: "Events Processed Daily" },
            { stat: "< 500ms", label: "Avg. Query Response" },
            { stat: "100%", label: "Data Stays In-House" },
        ],
        techStack: ["Next.js", "TypeScript", "Python", "PostgreSQL", "ClickHouse", "AWS", "Docker"],
        tags: ["Analytics", "High-Throughput", "ML Pipeline", "B2B SaaS"],
        assets: [],
        accentColor: "var(--brand-accent-light-rgb)",
        category: "saas",
        featured: true,
        engagementType: "platform",
        homepageFeatured: true,
        homepageHighlight: "standard",
        workSection: "flagship-platforms",
    },
    {
        slug: "signalops-control-center",
        client: "SignalOps Control Center",
        sector: "Revenue Operations Platform",
        metric: "62%",
        metricLabel: "Faster Weekly Reporting",
        heroDescription:
            "Unified revenue operations platform combining pipeline health, customer risk signals, and forecasting into one executive dashboard.",
        problem:
            "A mid-market B2B software company was running forecasting, customer health, and sales reporting across disconnected spreadsheets, CRM exports, and BI dashboards. Leadership spent half of every Monday reconciling numbers before they could make decisions, and frontline teams were operating off stale data by the time reports were shared.\n\nThe business needed a single system that could pull live data from CRM, billing, support, and product usage tools while surfacing actionable risk and opportunity signals without another layer of manual analysis.",
        solution:
            "We built a custom revenue operations control center that centralizes pipeline forecasting, expansion tracking, churn risk scoring, and account health into one role-based platform. The system syncs data from HubSpot, Stripe, Intercom, and internal product telemetry, then presents it through executive summaries, drill-down views, and automated alerting.\n\nSales, success, and leadership teams now work from the same real-time operating picture. Weekly reporting is generated automatically, handoff gaps are visible immediately, and managers can act on risk before it turns into missed revenue.",
        results: [
            { stat: "62%", label: "Faster Weekly Reporting" },
            { stat: "4", label: "Systems Unified" },
            { stat: "< 3 min", label: "Forecast Refresh Time" },
        ],
        techStack: ["Next.js", "TypeScript", "PostgreSQL", "Node.js", "Stripe API", "HubSpot API", "Tailwind CSS"],
        tags: ["B2B SaaS", "RevOps", "Executive Dashboard", "Integrations"],
        assets: [],
        accentColor: "var(--brand-accent-dark-rgb)",
        category: "saas",
        featured: true,
        engagementType: "internal-tool",
        homepageFeatured: true,
        homepageHighlight: "standard",
        workSection: "systems-tools",
    },
    {
        slug: "buff-dudes",
        client: "Buff Dudes",
        sector: "Fitness & Wellness",
        metric: "50k+",
        metricLabel: "App Downloads",
        heroDescription:
            "Full-featured fitness companion app with workout tracking, nutrition plans, and community features for a major fitness brand.",
        problem:
            "Buff Dudes had a massive following across YouTube and social media but no dedicated mobile product to monetize their audience directly. Their fans relied on scattered PDFs, spreadsheets, and third-party apps to follow workout programs leading to poor retention and zero data on user engagement.\n\nThe team needed a branded, native mobile experience that could deliver structured workout plans, track progress, and foster community while handling traffic spikes from viral content drops.",
        solution:
            "We built a cross-platform mobile app with structured workout programs, progress tracking with visual analytics, nutrition logging with macro breakdowns, and a community feed for user accountability. The app syncs seamlessly across devices and handles burst traffic from social media promotions.\n\nPush notification sequences drive daily engagement, and an admin dashboard lets the Buff Dudes team publish new programs without developer involvement.",
        results: [
            { stat: "50,000+", label: "Downloads in First Quarter" },
            { stat: "68%", label: "Day-30 Retention" },
            { stat: "4.7 stars", label: "App Store Rating" },
        ],
        techStack: ["React Native", "TypeScript", "Firebase", "Node.js", "Expo"],
        tags: ["Mobile App", "Fitness", "iOS/Android", "Community"],
        assets: [],
        accentColor: "234,88,12",
        category: "mobile-apps",
        engagementType: "mobile-app",
        homepageFeatured: true,
        homepageHighlight: "standard",
        workSection: "mobile-products",
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
            "The trucking industry in South Asia operates largely through phone-based brokers, with zero digital visibility into fleet availability, pricing, or shipment tracking. Truck owners waste hours waiting for loads while shippers overpay for last-minute bookings. Both sides lacked trust and transparency.\n\nExisting logistics apps focused on last-mile delivery, but nobody was solving the long-haul freight matching problem with the real-time tracking and payment guarantees that enterprise shippers demand.",
        solution:
            "We designed and built a two-sided marketplace connecting truck owners directly with shippers. The platform features real-time GPS tracking, automated load matching based on route and capacity, digital documentation for each shipment, and an escrow-based payment system.\n\nA driver-side mobile app optimized for low-bandwidth environments lets fleet operators manage bookings, track earnings, and receive push alerts for nearby loads in Urdu and English.",
        results: [
            { stat: "2,000+", label: "Active Fleet Vehicles" },
            { stat: "35%", label: "Cost Reduction for Shippers" },
            { stat: "< 4hr", label: "Avg. Load Matching Time" },
        ],
        techStack: ["React Native", "Node.js", "PostgreSQL", "Google Maps API", "Firebase", "Socket.io"],
        tags: ["Marketplace", "Logistics", "Real-time", "Fleet Tech"],
        assets: [],
        accentColor: "14,165,233",
        category: "mobile-apps",
        engagementType: "platform",
        homepageFeatured: true,
        homepageHighlight: "standard",
        workSection: "flagship-platforms",
    },
    {
        slug: "stockpulse-ai",
        client: "StockPulse AI",
        sector: "Supply Chain Intelligence",
        metric: "3.2M+",
        metricLabel: "Predictions Generated Monthly",
        heroDescription:
            "AI-powered demand forecasting and inventory optimization platform that cut overstock waste by 38% for mid-market distributors.",
        problem:
            "A mid-market distribution company was losing millions annually to overstock and stockout cycles. Their demand planning relied on spreadsheets updated weekly by regional managers, each using different assumptions and formats. Seasonal demand spikes were consistently misjudged, leading to warehouse overflow in some regions and empty shelves in others.\n\nExisting forecasting tools required data science teams they did not have, and the off-the-shelf solutions could not integrate with their legacy ERP and warehouse management systems.",
        solution:
            "We built a custom demand intelligence platform that ingests historical sales data, supplier lead times, and external signals like weather and regional events to generate SKU-level demand forecasts updated every six hours. The system integrates directly with their existing ERP via a REST API layer we designed.\n\nA dashboard gives procurement teams real-time visibility into predicted stockouts, overstock risk scores, and automated reorder suggestions. The ML pipeline runs on AWS SageMaker with a feedback loop that improves accuracy as more data flows through the system.",
        results: [
            { stat: "3.2M+", label: "Monthly Predictions" },
            { stat: "38%", label: "Overstock Reduction" },
            { stat: "< 2s", label: "Forecast Response Time" },
        ],
        techStack: ["Next.js", "Python", "TypeScript", "PostgreSQL", "Redis", "AWS SageMaker", "Docker"],
        tags: ["AI/ML", "Supply Chain", "Real-time Analytics", "B2B SaaS"],
        assets: [],
        accentColor: "59,130,246",
        category: "ai-automation",
        featured: true,
        engagementType: "platform",
        homepageFeatured: true,
        homepageHighlight: "standard",
        workSection: "flagship-platforms",
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
            "Environmental agencies and urban planning departments needed a scalable way to catalogue tree populations, monitor health over time, and generate compliance reports for sustainability mandates. Existing methods relied on paper surveys, disconnected spreadsheets, and expensive specialized GIS software that field workers could not use on mobile devices.\n\nThere was no affordable, field-ready tool that combined GPS mapping, photo documentation, health scoring, and automated reporting in a single mobile interface.",
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
        engagementType: "mobile-app",
        workSection: "systems-tools",
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
            "The global mindfulness app market is dominated by Western-centric products. There was no dedicated platform serving South Asian and Muslim communities with culturally relevant guided meditation, dhikr tracking, and prayer-time-aware scheduling.\n\nExisting apps felt alienating to the target demographic. The opportunity was a premium, beautifully designed app that felt native to the audience.",
        solution:
            "We built a cross-platform mobile app with guided meditation sessions in Urdu and English, dhikr counters with haptic feedback, prayer-time integration, and streak-based habit tracking. The design system draws from Islamic geometric patterns while maintaining a modern, premium aesthetic.\n\nA community feature lets practitioners share milestones and form accountability groups. Push notifications are prayer-time-aware, delivering mindfulness prompts at culturally appropriate moments.",
        results: [
            { stat: "25,000+", label: "Active Practitioners" },
            { stat: "4.8 stars", label: "App Store Rating" },
            { stat: "12 min", label: "Avg. Daily Session" },
        ],
        techStack: ["Flutter", "Dart", "Firebase", "Node.js", "Adhan API"],
        tags: ["Mobile App", "Wellness", "Community", "Localization"],
        assets: [],
        accentColor: "var(--brand-accent-light-rgb)",
        category: "mobile-apps",
        engagementType: "mobile-app",
        workSection: "mobile-products",
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
            "Content creators on mainstream platforms have limited monetization options and zero ownership of their audience relationships. Fans want deeper engagement through exclusive content, direct interaction, and digital collectibles, but existing platforms take large cuts and offer weak community features.\n\nThe founders needed a platform that gave creators full control over pricing, distribution, and fan relationships while still feeling premium for users.",
        solution:
            "We engineered a creator-first social platform with tiered subscription models, exclusive content vaults, live streaming with real-time tipping, and digital collectible drops. Creators get a branded profile page, analytics dashboard, and automated payout scheduling.\n\nThe fan experience includes personalized content feeds, direct messaging with creators, collectible display galleries, and community forums built for engagement and retention.",
        results: [
            { stat: "40,000+", label: "Registered Users" },
            { stat: "15%", label: "Creator-to-Fan Conversion" },
            { stat: "3.2x", label: "Revenue vs. Prior Platform" },
        ],
        techStack: ["React Native", "Next.js", "Node.js", "PostgreSQL", "Stripe", "WebSocket", "AWS"],
        tags: ["Social Platform", "Marketplace", "Creators", "Subscriptions"],
        assets: [],
        accentColor: "244,63,94",
        category: "mobile-apps",
        engagementType: "platform",
        workSection: "systems-tools",
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
            "The beauty tech space is crowded with poorly designed filter apps that look cheap and feel invasive. FaceBloom's founders wanted a premium product that used AI for subtle, natural-looking enhancements and needed both the technical pipeline and a brand identity that communicated elegance.\n\nThe challenge was building an app that processed photos in real-time on-device while maintaining premium visual quality.",
        solution:
            "We delivered end-to-end brand identity, UI and UX design, and the mobile app itself. The AI pipeline runs on-device using CoreML and TensorFlow Lite for real-time processing without constant server dependency.\n\nThe app features natural skin smoothing, lighting correction, color grading presets, and before/after comparison inside a luxury-feeling brand system.",
        results: [
            { stat: "200,000+", label: "Photos Processed" },
            { stat: "< 200ms", label: "On-device Processing" },
            { stat: "4.6 stars", label: "App Store Rating" },
        ],
        techStack: ["Swift", "CoreML", "TensorFlow Lite", "Figma", "After Effects"],
        tags: ["Mobile App", "AI/ML", "Branding", "UI/UX Design"],
        assets: [],
        accentColor: "236,72,153",
        category: "branding-design",
        engagementType: "branding",
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
            "Productivity apps are often overloaded with features and complexity. The founder wanted a deliberately simple app focused on helping individuals win each day by planning intentionally.\n\nThe core insight was that people do not need another project manager. They need a daily ritual that is calm, quick, and repeatable.",
        solution:
            "We built a mobile app centered around a three-step daily ritual: morning planning, time-blocking, and evening reflection. No team features, no bloated integrations, and a calm interface optimized for speed.\n\nA weekly review screen surfaces trends in productivity, mood, and goal completion while streak tracking and gentle push notifications reinforce the habit.",
        results: [
            { stat: "15,000+", label: "Daily Active Users" },
            { stat: "82%", label: "7-Day Streak Rate" },
            { stat: "4.9 stars", label: "App Store Rating" },
        ],
        techStack: ["React Native", "TypeScript", "Firebase", "Expo", "Lottie"],
        tags: ["Mobile App", "Productivity", "Habit Tracking", "Minimal UI"],
        assets: [],
        accentColor: "245,158,11",
        category: "mobile-apps",
        engagementType: "mobile-app",
        workSection: "mobile-products",
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
            "CoolingOnDemand served industrial clients needing temporary cooling solutions for events, construction sites, and emergency breakdowns. Their ordering process was entirely manual, which caused delays, lost orders, and double-bookings.\n\nAs demand grew, the manual process became a serious bottleneck for sales and logistics.",
        solution:
            "We built a full e-commerce platform with real-time inventory visibility, equipment comparison tools, instant quoting, and online booking with delivery scheduling. The admin panel tracks equipment location, maintenance schedules, and utilization rates across the fleet.\n\nIntegration with their logistics system enables automated dispatch notifications and delivery tracking for both rental and purchase flows.",
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
        engagementType: "platform",
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
            "Independent restaurants were juggling multiple disconnected tools for reservations, digital menus, ordering, and customer feedback. The cost and complexity made digital transformation feel out of reach for most small-to-mid-size restaurants.\n\nDuring peak hours, the friction between these systems created delays, order errors, and frustrated customers.",
        solution:
            "We built a unified web and mobile platform that handles reservations, QR-code digital menus, tableside ordering, kitchen display routing, and customer feedback in one system. Restaurants set up quickly with a guided onboarding flow.\n\nThe platform integrates with existing POS systems and payment processors, supports multi-location management, and provides analytics on turnover and demand.",
        results: [
            { stat: "150+", label: "Restaurants Onboarded" },
            { stat: "25%", label: "Faster Table Turnover" },
            { stat: "40%", label: "Reduction in Order Errors" },
        ],
        techStack: ["Next.js", "React Native", "Node.js", "PostgreSQL", "Socket.io", "Stripe"],
        tags: ["Hospitality", "SaaS", "Web Platform", "Mobile App"],
        assets: [],
        accentColor: "249,115,22",
        category: "web-platforms",
        engagementType: "platform",
        workSection: "flagship-platforms",
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
            "Shopping malls were losing foot traffic to online retail and had no digital tools to compete. Stores ran disconnected promotions, shoppers could not discover deals across the mall, and operators lacked meaningful analytics.\n\nThe challenge was building a platform that served shoppers, stores, and mall operators at the same time.",
        solution:
            "We built a mobile marketplace app where shoppers discover real-time deals, navigate to stores with indoor wayfinding, collect loyalty points, and share recommendations. Stores get a self-service dashboard while mall operators see aggregated performance analytics.\n\nThe system uses BLE beacons for precise indoor positioning and targeted promotions.",
        results: [
            { stat: "30+", label: "Malls Integrated" },
            { stat: "22%", label: "Increase in Foot Traffic" },
            { stat: "3.5x", label: "Deal Redemption Rate" },
        ],
        techStack: ["React Native", "Next.js", "Node.js", "PostgreSQL", "BLE Beacons", "Firebase"],
        tags: ["Marketplace", "Retail", "Location-based", "Mobile App"],
        assets: [],
        accentColor: "var(--brand-accent-rgb)",
        category: "e-commerce",
        engagementType: "platform",
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
            "Aggadoo had strong offline brand recognition but a dated, template-based site that did not reflect their creative caliber. Their online conversion rate was low, and they were losing potential corporate clients who judged them by their digital presence.\n\nThey needed a website that felt as energetic and creative as their live events.",
        solution:
            "We led with design: full brand refresh, then an immersive website with scroll-driven animations, video-heavy case study layouts, and a streamlined inquiry flow. Every page transition was crafted to reinforce the brand's energetic personality.\n\nThe site architecture was rebuilt around conversion with clearer service tiers and stronger social proof.",
        results: [
            { stat: "45%", label: "Increase in Conversions" },
            { stat: "3x", label: "Average Session Duration" },
            { stat: "60%", label: "Reduction in Booking Friction" },
        ],
        techStack: ["Next.js", "Framer Motion", "Figma", "Tailwind CSS", "Sanity CMS", "Vercel"],
        tags: ["Website", "UI/UX Design", "Branding", "Animation"],
        assets: [],
        accentColor: "var(--brand-accent-light-rgb)",
        category: "branding-design",
        engagementType: "branding",
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
            "New Leaf was launching a sustainability-focused lifestyle brand but had no visual identity, no web presence, and no design system to build from. The founders had a clear mission but needed a creative partner to translate that vision into a cohesive brand.\n\nThe competitive landscape was saturated with predictable sustainability tropes, so the brand needed a sharper point of view.",
        solution:
            "We developed a complete brand identity including logo system, color palette, typography pairings, photography direction, and brand guidelines. The website was built as a content-rich experience with editorial storytelling, product showcases, and an impact tracker.\n\nThe end result gave the brand a distinctive visual system and a launch-ready web presence.",
        results: [
            { stat: "Brand", label: "Complete Identity Delivered" },
            { stat: "50+", label: "Brand Assets Created" },
            { stat: "2 weeks", label: "Concept to Launch" },
        ],
        techStack: ["Figma", "Adobe Illustrator", "Next.js", "Tailwind CSS", "Sanity CMS"],
        tags: ["Branding", "Website", "UI/UX Design", "Sustainability"],
        assets: [],
        accentColor: "34,197,94",
        category: "branding-design",
        engagementType: "branding",
    },
];

export const WORK_SECTION_META: Record<
    CaseStudyWorkSection,
    { title: string; description: string; highlightSlug?: string }
> = {
    "flagship-platforms": {
        title: "Flagship Platforms",
        description: "Larger products built around workflows, scale, and operational leverage.",
        highlightSlug: "saas-analytics-platform",
    },
    "systems-tools": {
        title: "Systems & Internal Tools",
        description: "Operational systems, dashboards, and deeper product infrastructure.",
        highlightSlug: "internal-ops-dashboard",
    },
    "mobile-products": {
        title: "Mobile Products",
        description: "Consumer and business mobile experiences engineered for repeat use.",
        highlightSlug: "buff-dudes",
    },
    "rapid-websites": {
        title: "Rapid Websites",
        description: "Premium web presences delivered fast without positioning them as full software platforms.",
        highlightSlug: "ali-wali",
    },
};

export function getCaseStudy(slug: string): CaseStudy | undefined {
    return CASE_STUDIES.find((cs) => cs.slug === slug);
}

export function getHomepageCaseStudies() {
    return CASE_STUDIES.filter((study) => study.homepageFeatured);
}

export function getWorkSectionStudies(section: CaseStudyWorkSection) {
    return CASE_STUDIES.filter((study) => study.workSection === section);
}
