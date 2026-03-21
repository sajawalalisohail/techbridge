import type { LucideIcon } from "lucide-react";
import { Code2, Layers, Smartphone, Users, Workflow, Wrench, Zap } from "lucide-react";

export interface ServiceCallout {
    label: string;
    text: string;
    attribution?: string;
}

export interface ServiceSectionData {
    id: string;
    number: string;
    category: string;
    icon: LucideIcon;
    subHeadline: string;
    description: string;
    capabilities: string[];
    stack: string[];
    callout: ServiceCallout;
}

export interface ServiceNavGroup {
    id: string;
    number: string;
    label: string;
    href: string;
    icon: LucideIcon;
    capabilities: string[];
    featured?: boolean;
}

export interface FooterLink {
    label: string;
    href: string;
}

export interface FooterColumn {
    title: string;
    links: FooterLink[];
}

export interface FooterSocialLink extends FooterLink {
    external?: boolean;
}

export const SERVICE_SECTIONS: ServiceSectionData[] = [
    {
        id: "custom-software",
        number: "01",
        category: "Custom Software & SaaS",
        icon: Code2,
        subHeadline: "Architecture that your next engineer can actually understand.",
        description:
            "We build custom software that doesn't need a rewrite in two years. Multi-tenant SaaS, internal platforms, enterprise systems, all with clean code and actual documentation.",
        capabilities: [
            "Multi-tenant SaaS platforms",
            "Real-time dashboards & analytics",
            "Authentication, RBAC & multi-org",
            "Stripe billing & subscription logic",
            "RESTful & GraphQL API design",
            "Database architecture & migrations",
            "Microservice & monolith patterns",
            "CI/CD pipeline setup",
        ],
        stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Supabase", "Redis", "Docker", "AWS"],
        callout: {
            label: "Founder's Principle",
            text: "Any senior engineer should be able to clone your repo and ship a feature within a week. That's the bar we hold ourselves to.",
            attribution: "Sajawal Ali Sohail",
        },
    },
    {
        id: "ai-ml-business-systems",
        number: "02",
        category: "AI, ML & Business Systems",
        icon: Workflow,
        subHeadline: "Operational AI built like software infrastructure, not a growth hack.",
        description:
            "High-signal AI systems for research, analytics, automation, and business workflows. We treat applied AI like an engineering problem with interfaces, retrieval, observability, and production safety, not a prompt wrapper with a dashboard.",
        capabilities: [
            "RAG pipelines and private knowledge systems",
            "LLM workflows for internal tools and operations",
            "Machine learning for analytics and decision support",
            "Workflow orchestration for business systems",
            "Computer vision and document processing pipelines",
            "Custom APIs and business-system integrations",
            "MLOps, observability, and production deployment",
            "Automation interfaces designed for real operators",
        ],
        stack: ["Python", "TypeScript", "Next.js", "OpenAI", "PostgreSQL", "Docker", "GCP", "Runpod"],
        callout: {
            label: "Founder's Principle",
            text: "We don't build wrappers. We architect AI systems that fit the real workflow, respect the data boundary, and still hold up when the traffic or complexity gets real.",
            attribution: "Sajawal Ali Sohail",
        },
    },
    {
        id: "rapid-deploy",
        number: "03",
        category: "24-Hour Web Presence",
        icon: Zap,
        subHeadline: "You'll be live before your competitor finishes their agency brief.",
        description:
            "For founders who need a real website now, not a 12-week agency timeline. Custom-coded, conversion-optimized, and live before end of day. No templates, no page builders.",
        capabilities: [
            "Next.js App Router, performance-first",
            "Custom UI/UX - not a template",
            "Conversion-optimized page architecture",
            "On-page SEO & Core Web Vitals",
            "CMS integration (Sanity, Contentful)",
            "Global CDN edge deployment",
            "Analytics & event tracking setup",
            "Domain, DNS & SSL configuration",
        ],
        stack: ["Next.js", "Tailwind CSS", "Framer Motion", "Sanity", "Vercel", "Cloudflare"],
        callout: {
            label: "Founder's Principle",
            text: "Most agencies charge $15k and take 3 months for a marketing site. We do it in 24 hours because we've cut every minute of waste from the process, not the quality.",
            attribution: "Sajawal Ali Sohail",
        },
    },
    {
        id: "mobile-apps",
        number: "04",
        category: "Mobile App Development",
        icon: Smartphone,
        subHeadline: "Production-grade mobile engineering that performs like a native product.",
        description:
            "Production-grade mobile engineering. Cross-platform performance that feels native, with deployment pipelines built for rapid iteration and zero-downtime updates.",
        capabilities: [
            "React Native & Flutter cross-platform",
            "Native iOS (Swift) & Android (Kotlin)",
            "App Store deployment & optimization",
            "Push notifications & real-time sync",
            "Offline-first architecture",
            "Mobile CI/CD pipelines",
            "Performance profiling & optimization",
            "Deep linking & universal links",
        ],
        stack: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "Expo", "Fastlane", "TestFlight"],
        callout: {
            label: "Founder's Principle",
            text: "A mobile app isn't a responsive website in a wrapper. We build for spotty connections, impatient users, and the reality that one laggy screen means an uninstall.",
            attribution: "Sajawal Ali Sohail",
        },
    },
    {
        id: "design-branding",
        number: "05",
        category: "UI/UX Design & Branding",
        icon: Layers,
        subHeadline: "Design systems built to survive contact with engineering and launch.",
        description:
            "High-fidelity design systems. We build visual identities and component libraries in Figma that are architected for direct translation to React and Next.js codebases.",
        capabilities: [
            "User research & persona development",
            "Wireframing & interactive prototyping",
            "Design systems & component libraries",
            "Brand identity & visual language",
            "Motion design & micro-interactions",
            "Accessibility audits (WCAG 2.1 AA)",
            "Conversion rate optimization",
            "Figma-to-code production handoff",
        ],
        stack: ["Figma", "Adobe Creative Suite", "Framer", "Principle", "Lottie", "Storybook"],
        callout: {
            label: "Founder's Principle",
            text: "A Figma file isn't a product. We design with engineering constraints in mind from the start, so developers don't spend two sprints negotiating what's feasible.",
            attribution: "Sajawal Ali Sohail",
        },
    },
    {
        id: "internal-tools",
        number: "06",
        category: "Internal Tools & Integrations",
        icon: Wrench,
        subHeadline: "The tools your team actually uses every day, built right.",
        description:
            "Custom internal dashboards, admin panels, workflow automation, and third-party integrations that replace the patchwork of SaaS subscriptions slowing your team down. Built for the people who will use them daily.",
        capabilities: [
            "Custom admin dashboards & portals",
            "Workflow automation & approvals",
            "Third-party API integrations (Salesforce, HubSpot, etc.)",
            "Internal data pipelines & reporting",
            "Role-based access control systems",
            "Slack / Teams bot integrations",
            "Legacy system modernization",
            "Real-time operational dashboards",
        ],
        stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Redis", "n8n", "Zapier", "AWS"],
        callout: {
            label: "Founder's Principle",
            text: "Your team shouldn't be copying data between five browser tabs. We build the tool that eliminates that workflow entirely, and your team actually uses it.",
            attribution: "Sajawal Ali Sohail",
        },
    },
    {
        id: "staff-augmentation",
        number: "07",
        category: "Staff Augmentation",
        icon: Users,
        subHeadline: "Your next senior engineer is already vetted and ready.",
        description:
            "We place dedicated senior engineers - AI specialists, full-stack developers, mobile devs, QA - directly into your existing team. They join your Slack, your repos, your standups. We handle vetting, management, and architecture oversight inside a TechBridge-managed global engineering office. You get senior capacity without the recruiting drag or management vacuum.",
        capabilities: [
            "AI/ML engineers (LLMs, RAG, NLP, computer vision)",
            "Full-stack developers (Next.js, React, Node, Python)",
            "Mobile developers (React Native, Flutter, Swift, Kotlin)",
            "DevOps & infrastructure engineers",
            "QA & automation engineers",
            "Dedicated or fractional engagement models",
            "48-hour placement from initial call",
            "Full replacement guarantee",
        ],
        stack: ["Next.js", "React", "Node.js", "Python", "React Native", "Flutter", "AWS", "Docker"],
        callout: {
            label: "Founder's Principle",
            text: "We don't just send you a resume. We place senior engineers inside a system we've already vetted, aligned to your codebase expectations, and back with replacement coverage if the fit slips. That's the difference between a global engineering office and a handoff model.",
            attribution: "Sajawal Ali Sohail",
        },
    },
];

// Dropdown nav: exclude rapid-deploy (has own /websites top-level link) and
// staff-augmentation (has own /staff-augmentation top-level link).
export const SERVICE_NAV_GROUPS: ServiceNavGroup[] = SERVICE_SECTIONS
    .filter((s) => s.id !== "rapid-deploy" && s.id !== "staff-augmentation")
    .map((section) => ({
        id: section.id,
        number: section.number,
        label: section.category,
        href: `/services#${section.id}`,
        icon: section.icon,
        capabilities: section.capabilities.slice(0, 4),
    }));

export const FOOTER_EMAIL = "hello@techbridge.dev";

export const FOOTER_SOCIAL_LINKS: FooterSocialLink[] = [
    { label: "LinkedIn", href: "https://linkedin.com", external: true },
    { label: "GitHub", href: "https://github.com", external: true },
    { label: "X", href: "https://x.com", external: true },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
    {
        title: "Services",
        links: [
            { label: "Custom Software & SaaS", href: "/services#custom-software" },
            { label: "AI, ML & Business Systems", href: "/services#ai-ml-business-systems" },
            { label: "Mobile App Development", href: "/services#mobile-apps" },
            { label: "UI/UX Design & Branding", href: "/services#design-branding" },
            { label: "Internal Tools & Integrations", href: "/services#internal-tools" },
            { label: "24-Hour Websites", href: "/websites" },
            { label: "Staff Augmentation", href: "/staff-augmentation" },
        ],
    },
    {
        title: "Solutions / Build Types",
        links: [
            { label: "Flagship Platforms", href: "/work#flagship-platforms" },
            { label: "Systems & Internal Tools", href: "/work#systems-tools" },
            { label: "Mobile Products", href: "/work#mobile-products" },
            { label: "Rapid Websites", href: "/work#rapid-websites" },
            { label: "Dedicated Engineering Teams", href: "/staff-augmentation" },
        ],
    },
    {
        title: "Proof / Learn",
        links: [
            { label: "Selected Work", href: "/work" },
            { label: "Engineering Insights", href: "/insights" },
            { label: "24-Hour Websites", href: "/websites" },
            { label: "Contact", href: "/contact" },
        ],
    },
    {
        title: "Company / Resources",
        links: [
            { label: "About", href: "/about" },
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms", href: "/terms" },
            { label: "Talk to Us", href: "/contact" },
        ],
    },
];
