/* ─── Case Study Data (Single Source of Truth) ───────────── */

export interface CaseStudyResult {
    stat: string;
    label: string;
}

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
}

export const CASE_STUDIES: CaseStudy[] = [
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
    },
];

/* ─── Helper ─────────────────────────────────────────────── */
export function getCaseStudy(slug: string): CaseStudy | undefined {
    return CASE_STUDIES.find((cs) => cs.slug === slug);
}
