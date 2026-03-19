import React from "react";

export interface ToolIcon {
    name: string;
    svg: React.ReactNode;
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
    blender: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .3L5.8 2.9 2.8 8.9l.5 6.6 5.1 5.7 6.5 0 5.2-4.6 1.4-6.2L18.2 3.8 12 .3zM12 6c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6 2.7-6 6-6zm0 2.5c-1.9 0-3.5 1.6-3.5 3.5s1.6 3.5 3.5 3.5 3.5-1.6 3.5-3.5-1.6-3.5-3.5-3.5z" /></svg>,
    sketch: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 8l11 14L23 8 12 2zm0 2.8L18.7 7H5.3L12 4.8zM3.5 8h3.3l4.6 10.7L3.5 8zm13.7 0h3.3L12.5 18.7 17.2 8zM9.4 8h5.3l-2.6 8L9.4 8z" /></svg>,
    adobexd: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M2.6 1.9h18.8v18.8H2.6V1.9zM11 14.9c0-1.8.8-2.9 2.4-2.9 1.3 0 2.4.9 2.4 2.1v-2h2V17h-2v-1.6c-.8 1.3-1.8 1.8-3 1.8-1.5 0-1.8-.6-1.8-2.3zm8.6-.9v0l1.8 2.9h-2.1v0c-.2.4-.4.8-.7 1.1h2.2L17.2 14zM14.6 15.7c0 .6-.3.8-.8.8-.5 0-1-.3-1-1.5V13c.1 0 .2 0 .2.1.2.1.4.3.5.6.2.3.3.7.3 1v.9zM7 9l1.6 2.8L7.2 14h1.8l.6-1.1c.2.3.3.6.5.9h0c.2.3.3.4.5.9l.7 1.1H13l-1.5-2.3L13.1 9h-1.8l-.6 1c-.1.3-.3.5-.4.8h0c-.1-.3-.2-.5-.4-.8L9.3 9H7z" /></svg>,
    hubspot: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M13 1.2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm-8.8 8.8a2.5 2.5 0 0 0-1.4 4.6l3.2 3.2c0 .2-.1.5-.1.7 0 1.9 1.6 3.5 3.5 3.5s3.5-1.6 3.5-3.5c0-.8-.3-1.5-.7-2.1l2.8-2.8c1.2.5 2.6.5 3.8 0L20.9 15.8a2.5 2.5 0 1 0 1.2-1.9l-2.1-2.1c.2-1.3.1-2.6-.3-3.8L17.7 4.3a3 3 0 0 0-.9 1.9l1.7 2.9a2.5 2.5 0 0 1 .1 2.3 4 4 0 0 0-3.5 2.1c-1.3 0-2.4-.9-2.9-2.1L9.7 9.1a3.5 3.5 0 0 0-1.1-.7L5.5 5.3A2.5 2.5 0 0 0 4.2 10z" /></svg>,
    salesforce: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 6.4c-1.7-1.2-4.2-.6-5.3 1-.7-1.2-2-1.8-3.4-1.6-1.4.3-2.5 1.4-2.7 2.9-1 0-1.9.6-2.2 1.5-.3.9 0 2 1 2.5v0h14.9s1.4 0 2.1-1c.7-1 .3-2.6-.9-3.2-1-.5-2-1.5-3.6-2.1z" /></svg>,
    googleanalytics: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M21.6 12.4l-3.3-3.3a1.6 1.6 0 0 0-2.3 0l-3.1 3.1L9.6 8.8V4.6a1.6 1.6 0 0 0-3.2 0v14.8h15.2a1.6 1.6 0 1 0 0-3.2h-10l2.7-2.7L17.2 16.4a1.6 1.6 0 0 0 2.3 0l3-3a1.6 1.6 0 0 0 0-2.3" /></svg>,
    x: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 1.2h3.7l-8 9.2L24 22.8H16.6l-5.8-7.6-6.6 7.6H.5l8.6-9.8L0 1.2h7.6l5.2 6.9zM17.6 20.6h2L6.5 3.2H4.3z" /></svg>,
    arduino: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm-4.8 4.8c2.7 0 4.8 2.2 4.8 4.8v4.8c0 2.7-2.2 4.8-4.8 4.8-2.7 0-4.8-2.2-4.8-4.8V9.6c0-2.7 2.2-4.8 4.8-4.8zm9.6 0c2.7 0 4.8 2.2 4.8 4.8v4.8c0 2.7-2.2 4.8-4.8 4.8-2.7 0-4.8-2.2-4.8-4.8V9.6c0-2.7 2.2-4.8 4.8-4.8zm-2.4 8.4V8.4H19v4.8h-4.8zM4.8 13.2h4.8V12H4.8v1.2zM15.6 13.2h2.4v-2.4h1.2v2.4h2.4v1.2h-2.4v2.4h-1.2v-2.4h-2.4v-1.2z" /></svg>,
    pi: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M11.5 10.3c.5 0 .9.4 1 .8l1.3 7.8c.1.6 1.1.6 1.3 0l1.4-8.7a1 1 0 0 0-1.9-.3l-.9 5.6-1.1-6.3a1 1 0 0 0-1.9.1l-1.1 6.3-.9-5.6a1 1 0 0 0-1.9.3l1.4 8.7c.1.6 1.1.6 1.3 0l1.3-7.8a1 1 0 0 0 1-.8zm8.8 3.5a5 5 0 0 0-1.8-4.8l-1.4 1.4a3 3 0 0 1-5.5-2.1l-1.9-1.9a1 1 0 0 0-1.5 0 1 1 0 0 0 0 1.5l1.1 1.4zM3.7 13.8a5 5 0 0 0 9.2 3.5l-1.4-1.4a3 3 0 0 1-5.5-2.1l-1.9-1.9a1 1 0 0 0-1.5 0 1 1 0 0 0 0 1.5l1.1 1.4z" /></svg>,
    cpp: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M5.4 15.6c-.6 0-1.2-.2-1.6-.6-.4-.4-.6-1-.6-1.6 0-.6.2-1.2.6-1.6.4-.4 1-.6 1.6-.6.6 0 1.2.2 1.6.6.4.4.6 1 .6 1.6h2c0-1.2-.4-2.2-1.2-3-1-.8-2.2-1.2-3.4-1.2-1.2 0-2.4.4-3.4 1.2C.8 11.2.4 12.2.4 13.4c0 1.2.4 2.2 1.2 3 1 .8 2.2 1.2 3.4 1.2 1.2 0 2.4-.4 3.4-1.2h-2c-.4.4-1 .6-1.6.6zm9-1.4v-1.6h1.6V11H14.4V9.6h-1.6V11H11.2v1.6h1.6v1.6H14.4zm6.6 0v-1.6h1.6V11H21V9.6H19.4V11H17.8v1.6h1.6v1.6H21z" /></svg>,
    aws: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M13 9.9c-.3-.1-.9-.3-1.5-.3-1.6 0-2.6 1.2-2.6 2.6 0 1.3.8 2.3 2.3 2.3 1.1 0 1.6-.5 1.9-.7V9.9zm2.1 6.1h-1.9V14.9c-.5.8-1.5 1.3-2.5 1.3-2.1 0-3.6-1.5-3.6-3.6 0-2.1 1.5-3.6 3.6-3.6 1 0 1.8.4 2.5 1.1V9h1.9v7zm4.7-4.7L21 6.4h-1.9l.1 4.1-1.3-4.1h-1.3l-1.3 4.1-.3-4.1H13l1.5 7.1h1.8l1-3.2 1 3.2h1.8l1.4-7h-1.8l-.3 1.7zm-14.7 4.7H3.3V9h1.8v7zm-2 .2C1.6 15.1 1 14 1 12.9c0-1.8 1.4-3.1 3.6-3.1 2.3 0 3.8 1.4 3.8 3.3 0 1.8-1.4 3.3-3.6 3.4-.6 0-1.1-.1-1.7-.3zM12 22.8c-6.6 0-12-5.3-12-11.9V8h3v3h18.2c0 5.6-2.6 11.9-6.2 11.9z" /></svg>,
    vercel: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 22.5H0l12-21 12 21z" /></svg>,
};

export const SERVICES_DATA: ServiceCardData[] = [
    {
        id: "design",
        number: "01",
        title: "Product Design",
        description: "End-to-end product design—from research and UX flows to polished UI systems and developer-ready handoff.",
        services: ["User Research & Strategy", "UX Flows & Wireframes", "UI Systems & Prototypes", "Design Ops & Dev Handoff"],
        tools: [
            { name: "Figma", svg: SVGS.figma },
            { name: "Sketch", svg: SVGS.sketch },
            { name: "Adobe XD", svg: SVGS.adobexd },
            { name: "Blender", svg: SVGS.blender }
        ],
        href: "/services/design",
    },
    {
        id: "dev",
        number: "02",
        title: "Development",
        description: "Robust, scalable products across web and mobile—from elegant UIs to reliable APIs and automated DevOps.",
        services: ["Frontend Platforms (React / Next)", "Backend APIs & Microservices (Node)", "Mobile & Cross-platform (Flutter)", "CI/CD & Cloud Ops (Docker)"],
        tools: [
            { name: "React", svg: SVGS.react },
            { name: "Next.js", svg: SVGS.nextjs },
            { name: "Node.js", svg: SVGS.node },
            { name: "Docker", svg: SVGS.docker },
            { name: "Flutter", svg: SVGS.flutter },
            { name: "TypeScript", svg: SVGS.ts }
        ],
        href: "/services/development",
    },
    {
        id: "gtm",
        number: "03",
        title: "GTM Strategy",
        description: "Data-driven go-to-market for SaaS and AI—clear positioning, smart pricing, and repeatable growth loops.",
        services: ["ICP & Segmentation", "Narrative & Messaging", "Pricing & Packaging", "Demand Gen & Content"],
        tools: [
            { name: "HubSpot", svg: SVGS.hubspot },
            { name: "Salesforce", svg: SVGS.salesforce },
            { name: "Google Analytics", svg: SVGS.googleanalytics },
            { name: "X", svg: SVGS.x }
        ],
        href: "/services/gtm",
    },
    {
        id: "staff",
        number: "04",
        title: "Staff Augmentation",
        description: "Senior developers and AI engineers embedded in your team. Managed by our internal architects, accountable entirely to you.",
        services: ["48-Hour Placement", "Senior & Staff Level", "Full-stack & AI Experts", "US Architecture Oversight"],
        tools: [
            { name: "TypeScript", svg: SVGS.ts },
            { name: "Node.js", svg: SVGS.node },
            { name: "AWS", svg: SVGS.aws },
            { name: "React", svg: SVGS.react }
        ],
        href: "/staff-augmentation",
    },
    {
        id: "web",
        number: "05",
        title: "24-Hour Websites",
        description: "A real website. Custom code, not a template. Architected natively. Deployed and live before you wake up tomorrow.",
        services: ["Custom Next.js Frontend", "Vercel Edge Deployment", "100 Lighthouse Score", "CMS Integration"],
        tools: [
            { name: "Next.js", svg: SVGS.nextjs },
            { name: "React", svg: SVGS.react },
            { name: "Vercel", svg: SVGS.vercel },
            { name: "Figma", svg: SVGS.figma }
        ],
        href: "/websites",
    },
    {
        id: "iot",
        number: "06",
        title: "IoT Development",
        description: "From device firmware to cloud ingestion—secure, reliable IoT systems with OTA updates and telemetry.",
        services: ["Embedded Firmware & Drivers", "BLE / Zigbee / LoRa", "MQTT & Stream Processing", "Edge AI & OTA Pipelines"],
        tools: [
            { name: "Arduino", svg: SVGS.arduino },
            { name: "Raspberry Pi", svg: SVGS.pi },
            { name: "C/C++", svg: SVGS.cpp },
            { name: "AWS Edge", svg: SVGS.aws }
        ],
        href: "/services/iot",
    }
];
