"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CountUp } from "@/components/shared/CountUp";

const STATS = [
    { value: 50, suffix: "+", label: "Systems in Production" },
    { value: 98, suffix: "%", label: "Client Retention" },
    { value: 3, suffix: "×", label: "Faster Than In-House" },
];

export default function StatsBanner() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

    return (
        <section ref={sectionRef} className="w-full py-16 border-y border-white/5 bg-white/[0.01]">
            <motion.dl
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto max-w-[100rem] px-6 lg:px-10 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-16"
            >
                {STATS.map((stat) => (
                    <div key={stat.label} className="flex flex-col items-center gap-2">
                        <dd>
                            <CountUp
                                value={stat.value}
                                suffix={stat.suffix}
                                from={20}
                                className="font-mono text-3xl font-bold tracking-tight bg-gradient-to-br from-brand-accent-light to-brand-accent-light bg-clip-text text-transparent sm:text-4xl"
                            />
                        </dd>
                        <dt className="text-xs tracking-wider text-zinc-500 uppercase text-center">
                            {stat.label}
                        </dt>
                    </div>
                ))}
            </motion.dl>
        </section>
    );
}
