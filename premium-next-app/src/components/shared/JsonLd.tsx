export default function JsonLd() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "TechBridge",
        url: "https://techbridge.dev",
        logo: "https://techbridge.dev/icon",
        description:
            "Senior engineering team building scalable custom software, SaaS platforms, and AI workflows for B2B enterprises.",
        foundingDate: "2023",
        founders: [
            {
                "@type": "Person",
                name: "Sajawal Ali Sohail",
                jobTitle: "Founder",
                worksFor: { "@type": "Organization", name: "TechBridge" },
                url: "https://techbridge.dev/about",
            },
        ],
        employee: [
            {
                "@type": "Person",
                name: "Sajawal Ali Sohail",
                jobTitle: "Founder",
                url: "https://techbridge.dev/about",
            },
            {
                "@type": "Person",
                name: "Hamza Majeed",
                jobTitle: "Lead Engineer",
                url: "https://techbridge.dev/about",
            },
        ],
        sameAs: [],
        contactPoint: {
            "@type": "ContactPoint",
            contactType: "sales",
            url: "https://techbridge.dev/contact",
        },
        knowsAbout: [
            "Custom Software Development",
            "AI, ML & Business Systems",
            "SaaS Platform Development",
            "API Integration",
            "Enterprise Engineering",
            "24-Hour Website Development",
            "Mobile App Development",
            "UI/UX Design",
        ],
        address: {
            "@type": "PostalAddress",
            addressLocality: "Morgantown",
            addressRegion: "WV",
            addressCountry: "US",
        },
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "TechBridge",
        url: "https://techbridge.dev",
        potentialAction: {
            "@type": "SearchAction",
            target: "https://techbridge.dev/work?q={search_term_string}",
            "query-input": "required name=search_term_string",
        },
    };

    const localBusinessUS = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://techbridge.dev/#us-office",
        name: "TechBridge - US Headquarters",
        parentOrganization: { "@type": "Organization", name: "TechBridge" },
        address: {
            "@type": "PostalAddress",
            addressLocality: "Morgantown",
            addressRegion: "WV",
            addressCountry: "US",
        },
        url: "https://techbridge.dev",
    };

    const localBusinessPK = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://techbridge.dev/#pk-office",
        name: "TechBridge - Lahore Engineering",
        parentOrganization: { "@type": "Organization", name: "TechBridge" },
        address: {
            "@type": "PostalAddress",
            addressLocality: "Lahore",
            addressCountry: "PK",
        },
        url: "https://techbridge.dev",
    };

    const servicesSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "TechBridge Services",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                item: {
                    "@type": "Service",
                    name: "Custom Software & SaaS",
                    description: "Multi-tenant platforms, internal tools, and SaaS products built with modern architecture.",
                    provider: { "@type": "Organization", name: "TechBridge" },
                },
            },
            {
                "@type": "ListItem",
                position: 2,
                item: {
                    "@type": "Service",
                    name: "AI, ML & Business Systems",
                    description: "Applied AI, machine learning, and business-system engineering for analytics, automation, and production workflows.",
                    provider: { "@type": "Organization", name: "TechBridge" },
                },
            },
            {
                "@type": "ListItem",
                position: 3,
                item: {
                    "@type": "Service",
                    name: "24-Hour Websites",
                    description: "Custom-coded websites designed, built, and deployed in 24 hours.",
                    provider: { "@type": "Organization", name: "TechBridge" },
                },
            },
            {
                "@type": "ListItem",
                position: 4,
                item: {
                    "@type": "Service",
                    name: "Mobile Apps",
                    description: "iOS and Android applications built with React Native and native technologies.",
                    provider: { "@type": "Organization", name: "TechBridge" },
                },
            },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(organizationSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(websiteSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(servicesSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(localBusinessUS),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(localBusinessPK),
                }}
            />
        </>
    );
}
