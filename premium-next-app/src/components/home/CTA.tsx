"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { fadeUp } from "@/components/shared/headingAnimations";

export default function CTA() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <section className="relative z-10 px-6 py-20 lg:px-10 lg:py-24" style={{ perspective: "1200px" }}>
            <motion.div
                ref={ref}
                variants={fadeUp()}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative mx-auto flex max-w-4xl flex-col items-center justify-between gap-6 overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-900/60 px-8 py-8 backdrop-blur-xl transition-all duration-500 hover:border-brand-accent/40 hover:shadow-[0_0_50px_rgba(var(--brand-accent-rgb),0.15)] sm:flex-row sm:rounded-full lg:px-12"
            >
                {/* Ambient glow */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(ellipse at 50% 50%, rgba(var(--brand-accent-dark-rgb), 0.15) 0%, transparent 70%)",
                    }}
                />

                <div className="relative z-10 flex flex-1 flex-col items-center text-center sm:items-start sm:text-left">
                    <span className="mb-2 inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
                        the next step
                    </span>
                    <h2 className="text-2xl font-normal tracking-tight text-white lg:text-3xl">
                        Ready to start{" "}
                        <span className="bg-gradient-to-r from-brand-accent-light to-brand-accent bg-clip-text text-transparent font-medium">
                            building?
                        </span>
                    </h2>
                </div>

                {/* CTAs */}
                <div className="relative z-10 flex shrink-0 flex-row gap-3">
                    <Link
                        href="/contact"
                        className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-brand-accent-dark to-brand-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(var(--brand-accent-dark-rgb),0.3)] transition-all duration-300 hover:shadow-brand-accent/20 hover:scale-105"
                    >
                        <span className="relative z-10">Book Call</span>
                        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    </Link>
                    <Link
                        href="/websites"
                        className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-6 py-3 text-sm font-medium text-zinc-300 transition-all duration-300 hover:border-brand-accent/40 hover:bg-brand-accent/5 hover:text-brand-accent-light hover:scale-105"
                    >
                        Fast Site
                    </Link>
                </div>
            </motion.div>
        </section>
    );
}
