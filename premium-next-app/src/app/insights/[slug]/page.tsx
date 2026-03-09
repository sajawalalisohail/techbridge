import { notFound } from "next/navigation";
import { Metadata } from "next";
import { INSIGHTS, getInsight } from "@/data/insights";
import InsightDetail from "./InsightDetail";

/* ─── Static Params ──────────────────────────────────────── */
export function generateStaticParams() {
    return INSIGHTS.map((post) => ({ slug: post.slug }));
}

/* ─── Metadata ───────────────────────────────────────────── */
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = getInsight(slug);
    if (!post) return {};
    return {
        title: `${post.title} — TechBridge Insights`,
        description: post.excerpt,
    };
}

/* ─── Page ───────────────────────────────────────────────── */
export default async function InsightPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = getInsight(slug);
    if (!post) notFound();

    return <InsightDetail post={post} />;
}
