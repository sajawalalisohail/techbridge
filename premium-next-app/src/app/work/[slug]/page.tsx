import { notFound } from "next/navigation";
import { Metadata } from "next";
import { CASE_STUDIES, getCaseStudy } from "@/data/case-studies";
import CaseStudyDetail from "./CaseStudyDetail";

/* ─── Static Params ──────────────────────────────────────── */
export function generateStaticParams() {
    return CASE_STUDIES.map((cs) => ({ slug: cs.slug }));
}

/* ─── Metadata ───────────────────────────────────────────── */
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const study = getCaseStudy(slug);
    if (!study) return {};
    return {
        title: `${study.client} Case Study | ${study.sector} — TechBridge`,
        description: study.heroDescription,
    };
}

/* ─── Page ───────────────────────────────────────────────── */
export default async function CaseStudyPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const study = getCaseStudy(slug);
    if (!study) notFound();

    return <CaseStudyDetail study={study} />;
}
