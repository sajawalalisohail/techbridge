export default function JsonLd() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "TechBridge",
        url: "https://techbridge.dev",
        description:
            "Senior engineering team building scalable custom software, SaaS platforms, and AI workflows for B2B enterprises.",
        foundingDate: "2023",
        sameAs: [],
        contactPoint: {
            "@type": "ContactPoint",
            contactType: "sales",
            url: "https://techbridge.dev/contact",
        },
        knowsAbout: [
            "Custom Software Development",
            "AI Workflow Automation",
            "SaaS Platform Development",
            "API Integration",
            "Enterprise Engineering",
        ],
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
        </>
    );
}
