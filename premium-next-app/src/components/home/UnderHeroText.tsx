"use client";

import AnimatedHeading from "@/components/shared/AnimatedHeading";

export default function UnderHeroText() {
    return (
        <section className="relative z-10 w-full bg-transparent px-4 pb-20 pt-10 sm:px-6 sm:pb-32 lg:px-8">
            <div className="mx-auto max-w-5xl text-center">
                <AnimatedHeading
                    as="h2"
                    className="mx-auto max-w-4xl text-3xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.15]"
                    highlightWords={["solutions", "tailored", "ROI"]}
                    highlightClassName="text-brand-accent font-semibold"
                    delay={0.2}
                >
                    AI-powered solutions tailored to cut costs, boost efficiency, maximize ROI and unlock business growth.
                </AnimatedHeading>
            </div>
        </section>
    );
}
