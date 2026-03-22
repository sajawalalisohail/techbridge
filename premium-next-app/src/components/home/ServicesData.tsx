import type { ReactNode } from "react";
import { SERVICE_SECTIONS } from "@/data/site-navigation";

export interface ToolIcon {
    name: string;
    svg: ReactNode;
}

export interface ServiceCardData {
    id: string;
    number: string;
    title: string;
    description: string;
    services: string[];
    tools: ToolIcon[];
    href: string;
}

export const SVGS = {
    react: <svg width="24" height="24" viewBox="-11.5 -10.231 23 20.463" fill="currentColor"><circle cx="0" cy="0" r="2.05" /><g stroke="currentColor" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2" /><ellipse rx="11" ry="4.2" transform="rotate(60)" /><ellipse rx="11" ry="4.2" transform="rotate(120)" /></g></svg>,
    nextjs: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C17.52 22 22 17.52 22 12S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zm-1.41-6.35l4.77-6.64h1.54l-5.4 7.52-.91-.88zm-2.51-7.3v8.08l1.37.96 5.8-8.08H8.08z" /></svg>,
    node: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.115L1.8 6.947v10.144L12 23l10.2-5.875V6.947L12 1.115zm0 18.248l-6.825-3.9v-7.69L12 3.86l6.825 3.9v7.69L12 19.363z" /></svg>,
    docker: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M14 11.3h2v-2h-2v2zm-2.5 0h2v-2h-2v2zm-2.5 0h2v-2h-2v2zm-2.5 0h2v-2h-2v2zm-2.5 0h2v-2H4v2zm5-2.5h2v-2h-2v2zm10.7 3.8c-.3 0-.6.1-.9.2-.4-1.1-1.6-1.9-2.9-1.9v3.7h-3.8v-3.7H3.4c0 3 2 6.6 7.4 6.6 1.3 0 2.6-.2 4.1-.7l.5.6c1.2 1.4 2.9 2.1 4.7 1.9v-2.8c-2.3.2-4.2-.9-4.5-2.6h4.5c1.2 0 2.1-1 2.1-2.2 0-1.2-1-2.2-2.1-2.2z" /></svg>,
    flutter: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357zm.014 11.072L7.857 17.53l6.471 6.47H21.7l-6.471-6.471 6.471-6.471h-7.372z" /></svg>,
    ts: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M1.1 0C.5 0 0 .5 0 1.1v21.8C0 23.5.5 24 1.1 24h21.8c.6 0 1.1-.5 1.1-1.1V1.1C24 .5 23.5 0 22.9 0H1.1zm10.1 11.5v5.3h-1.8V9.5h5.4v1.5h-3.6zm5.8 5.4c-1.8 0-2.9-1-3.1-2.3l1.6-.7c.1.6.6 1.4 1.5 1.4 1 0 1.3-.7 1.3-1.1 0-.9-2.6-1-2.6-2.7 0-1.4 1.1-2.5 2.9-2.5 1.3 0 2.5.8 2.8 2.1l-1.6.7c-.2-.7-.6-1.2-1.2-1.2-.6 0-1.1.4-1.1.9 0 .8 2.6 1 2.6 2.8 0 1.5-1.1 2.6-2.9 2.6z" /></svg>,
    figma: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 12c-2.2 0-4-1.8-4-4s1.8-4 4-4h4v8H8zm4-8h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4V4zm0 8h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4v-8zm-4 8c-2.2 0-4-1.8-4-4s1.8-4 4-4h4v8H8zm4 0v4c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4h4v-4h-4z" /></svg>,
    adobexd: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M2.6 1.9h18.8v18.8H2.6V1.9zM11 14.9c0-1.8.8-2.9 2.4-2.9 1.3 0 2.4.9 2.4 2.1v-2h2V17h-2v-1.6c-.8 1.3-1.8 1.8-3 1.8-1.5 0-1.8-.6-1.8-2.3zm8.6-.9v0l1.8 2.9h-2.1v0c-.2.4-.4.8-.7 1.1h2.2L17.2 14zM14.6 15.7c0 .6-.3.8-.8.8-.5 0-1-.3-1-1.5V13c.1 0 .2 0 .2.1.2.1.4.3.5.6.2.3.3.7.3 1v.9zM7 9l1.6 2.8L7.2 14h1.8l.6-1.1c.2.3.3.6.5.9h0c.2.3.3.4.5.9l.7 1.1H13l-1.5-2.3L13.1 9h-1.8l-.6 1c-.1.3-.3.5-.4.8h0c-.1-.3-.2-.5-.4-.8L9.3 9H7z" /></svg>,
    hubspot: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M13 1.2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm-8.8 8.8a2.5 2.5 0 0 0-1.4 4.6l3.2 3.2c0 .2-.1.5-.1.7 0 1.9 1.6 3.5 3.5 3.5s3.5-1.6 3.5-3.5c0-.8-.3-1.5-.7-2.1l2.8-2.8c1.2.5 2.6.5 3.8 0L20.9 15.8a2.5 2.5 0 1 0 1.2-1.9l-2.1-2.1c.2-1.3.1-2.6-.3-3.8L17.7 4.3a3 3 0 0 0-.9 1.9l1.7 2.9a2.5 2.5 0 0 1 .1 2.3 4 4 0 0 0-3.5 2.1c-1.3 0-2.4-.9-2.9-2.1L9.7 9.1a3.5 3.5 0 0 0-1.1-.7L5.5 5.3A2.5 2.5 0 0 0 4.2 10z" /></svg>,
    salesforce: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 6.4c-1.7-1.2-4.2-.6-5.3 1-.7-1.2-2-1.8-3.4-1.6-1.4.3-2.5 1.4-2.7 2.9-1 0-1.9.6-2.2 1.5-.3.9 0 2 1 2.5v0h14.9s1.4 0 2.1-1c.7-1 .3-2.6-.9-3.2-1-.5-2-1.5-3.6-2.1z" /></svg>,
    aws: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M13 9.9c-.3-.1-.9-.3-1.5-.3-1.6 0-2.6 1.2-2.6 2.6 0 1.3.8 2.3 2.3 2.3 1.1 0 1.6-.5 1.9-.7V9.9zm2.1 6.1h-1.9V14.9c-.5.8-1.5 1.3-2.5 1.3-2.1 0-3.6-1.5-3.6-3.6 0-2.1 1.5-3.6 3.6-3.6 1 0 1.8.4 2.5 1.1V9h1.9v7zm4.7-4.7L21 6.4h-1.9l.1 4.1-1.3-4.1h-1.3l-1.3 4.1-.3-4.1H13l1.5 7.1h1.8l1-3.2 1 3.2h1.8l1.4-7h-1.8l-.3 1.7zm-14.7 4.7H3.3V9h1.8v7zm-2 .2C1.6 15.1 1 14 1 12.9c0-1.8 1.4-3.1 3.6-3.1 2.3 0 3.8 1.4 3.8 3.3 0 1.8-1.4 3.3-3.6 3.4-.6 0-1.1-.1-1.7-.3zM12 22.8c-6.6 0-12-5.3-12-11.9V8h3v3h18.2c0 5.6-2.6 11.9-6.2 11.9z" /></svg>,
    vercel: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 22.5H0l12-21 12 21z" /></svg>,
    python: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.1 2c-4.8 0-4.5 2.1-4.5 2.1v2.2h4.6V7H5.7S2 6.6 2 12c0 5.4 3.2 5.2 3.2 5.2h1.9v-2.7s-.1-3.2 3.2-3.2h5.4s3-.1 3-2.9V4.9S19.1 2 14 2h-1.9zm-2.5 1.6a1 1 0 1 1 0 2.1 1 1 0 0 1 0-2.1zM11.9 22c4.8 0 4.5-2.1 4.5-2.1v-2.2h-4.6V17h6.5s3.7.4 3.7-5c0-5.2-3.2-5.2-3.2-5.2h-1.9v2.7s.1 3.2-3.2 3.2H8.3s-3 .1-3 2.9v3.5S4.9 22 10 22h1.9zm2.5-1.6a1 1 0 1 1 0-2.1 1 1 0 0 1 0 2.1z" /></svg>,
    openai: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M11.98 1.5a4.55 4.55 0 0 0-3.95 2.3L3.8 6.24A4.56 4.56 0 0 0 1.5 10.2c0 1.4.64 2.7 1.73 3.56a4.6 4.6 0 0 0 .56 5.54 4.53 4.53 0 0 0 5.47.66 4.56 4.56 0 0 0 7.9 0 4.54 4.54 0 0 0 5.47-.66 4.58 4.58 0 0 0 .56-5.54 4.55 4.55 0 0 0-.3-7.52 4.57 4.57 0 0 0-6.58-1.5 4.52 4.52 0 0 0-4.33-3.24zm0 2.04c1.1 0 2.08.58 2.64 1.47l-2.62 1.5-2.62-1.5a3.03 3.03 0 0 1 2.6-1.47zm-5.66 4.1 2.63 1.51v3.03L6.32 13.7a3.03 3.03 0 0 1 0-6.06zm11.36 0a3.03 3.03 0 0 1 0 6.06l-2.63-1.52V9.15l2.63-1.5zm-5.7-.33 2.63 1.51v3.03l-2.63 1.52-2.63-1.52V8.82l2.63-1.51zm-5.66 8.99 2.63-1.52 2.62 1.52v3.03a3.03 3.03 0 0 1-5.25-3.03zm11.36 0a3.03 3.03 0 0 1-5.25 3.03V16.3l2.62-1.52 2.63 1.52z" /></svg>,
    framer: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 3h12l-6 6h6l-12 12V9l6-6H6V3z" /></svg>,
    storybook: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M5.5 2.7 18.8 1.8l-.1 16.5-6.8 3.9-6.5-3.2.1-16.3zm10.7 1.5-7.9.6-.3 13.1 3.8 1.9 4.1-2.4.3-13.2zM9.4 8.8c0-1.3 1-2.1 2.7-2.1 1.7 0 2.7.8 2.8 2.2h-1.5c0-.5-.4-.9-1.2-.9-.7 0-1.1.3-1.1.8 0 .4.3.7 1.3.8 1.7.3 2.6.8 2.6 2.2 0 1.4-1.1 2.3-2.9 2.3-1.9 0-3-.9-3-2.4H10c0 .7.5 1.1 1.5 1.1.8 0 1.3-.3 1.3-.8 0-.4-.3-.7-1.2-.8-1.9-.3-2.6-1-2.6-2.3z" /></svg>,
    reactnative: <svg width="24" height="24" viewBox="-11.5 -10.231 23 20.463" fill="currentColor"><circle cx="0" cy="0" r="2.05" /><g stroke="currentColor" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2" /><ellipse rx="11" ry="4.2" transform="rotate(60)" /><ellipse rx="11" ry="4.2" transform="rotate(120)" /></g><path d="M0-7.5v15" stroke="currentColor" strokeWidth="1" opacity="0.35" /></svg>,
    firebase: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M5 19.5 7.5 3.9c.1-.7.9-.9 1.3-.3l2.2 4-4.8 11.9c-.2.5-1 .5-1.2 0zm2.4.3L18.3 4.5c.4-.5 1.2-.2 1.2.4l-1.3 14.4c0 .3-.2.5-.4.6l-5.4 3-5-3.1zm3.1-12.8 1.8-3.4c.3-.5 1-.5 1.3 0L19 13.9l-8.3-6.9z" /></svg>,
};

const HOMEPAGE_SERVICE_ORDER = [
    "design-branding",
    "custom-software",
    "ai-ml-business-systems",
    "mobile-apps",
    "internal-tools",
    "staff-augmentation",
    "rapid-deploy",
] as const;

const HOMEPAGE_SUMMARIES: Record<(typeof HOMEPAGE_SERVICE_ORDER)[number], string> = {
    "design-branding":
        "Design systems and brand work grounded in research, built to translate cleanly into production code.",
    "custom-software":
        "Multi-tenant platforms, internal tools, and SaaS products architected so your next hire can actually understand the codebase.",
    "ai-ml-business-systems":
        "Operational AI, analytics, and automation systems built like product infrastructure instead of prompt wrappers.",
    "mobile-apps":
        "Cross-platform and native apps that feel fast on real devices and hold up once they hit production.",
    "internal-tools":
        "Dashboards, workflows, and integrations that replace the manual browser-tab maze slowing teams down.",
    "staff-augmentation":
        "Senior developers and AI engineers embedded in your team, managed inside our global engineering office.",
    "rapid-deploy":
        "A real website. Custom code, not a template. Deployed and live before you wake up tomorrow.",
};

const HOMEPAGE_TOOLS: Record<(typeof HOMEPAGE_SERVICE_ORDER)[number], ToolIcon[]> = {
    "design-branding": [
        { name: "Figma", svg: SVGS.figma },
        { name: "Adobe XD", svg: SVGS.adobexd },
        { name: "Framer", svg: SVGS.framer },
        { name: "Storybook", svg: SVGS.storybook },
    ],
    "custom-software": [
        { name: "Next.js", svg: SVGS.nextjs },
        { name: "TypeScript", svg: SVGS.ts },
        { name: "Docker", svg: SVGS.docker },
        { name: "AWS", svg: SVGS.aws },
    ],
    "ai-ml-business-systems": [
        { name: "Python", svg: SVGS.python },
        { name: "OpenAI", svg: SVGS.openai },
        { name: "Docker", svg: SVGS.docker },
        { name: "Next.js", svg: SVGS.nextjs },
    ],
    "mobile-apps": [
        { name: "React Native", svg: SVGS.reactnative },
        { name: "Flutter", svg: SVGS.flutter },
        { name: "Firebase", svg: SVGS.firebase },
        { name: "TypeScript", svg: SVGS.ts },
    ],
    "internal-tools": [
        { name: "Next.js", svg: SVGS.nextjs },
        { name: "TypeScript", svg: SVGS.ts },
        { name: "HubSpot", svg: SVGS.hubspot },
        { name: "Salesforce", svg: SVGS.salesforce },
    ],
    "staff-augmentation": [
        { name: "React", svg: SVGS.react },
        { name: "Node.js", svg: SVGS.node },
        { name: "AWS", svg: SVGS.aws },
        { name: "TypeScript", svg: SVGS.ts },
    ],
    "rapid-deploy": [
        { name: "Next.js", svg: SVGS.nextjs },
        { name: "Vercel", svg: SVGS.vercel },
        { name: "Figma", svg: SVGS.figma },
        { name: "React", svg: SVGS.react },
    ],
};

function getServiceSection(id: (typeof HOMEPAGE_SERVICE_ORDER)[number]) {
    const section = SERVICE_SECTIONS.find((item) => item.id === id);

    if (!section) {
        throw new Error(`Missing homepage service section for ${id}`);
    }

    return section;
}

export const SERVICES_DATA: ServiceCardData[] = HOMEPAGE_SERVICE_ORDER.map((id, index) => {
    const section = getServiceSection(id);

    return {
        id: section.id,
        number: `${index + 1}`.padStart(2, "0"),
        title: section.category,
        description: HOMEPAGE_SUMMARIES[id],
        services: section.capabilities.slice(0, 4),
        tools: HOMEPAGE_TOOLS[id],
        href: id === "rapid-deploy" ? "/websites" : `/services#${section.id}`,
    };
});
