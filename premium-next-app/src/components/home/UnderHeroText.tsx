"use client";

import AnimatedHeading from "@/components/shared/AnimatedHeading";

export default function UnderHeroText() {
    return (
        <section className="relative z-10 w-full bg-transparent px-6 pb-20 pt-10 sm:pb-32 lg:px-10">
            <div className="mx-auto max-w-[100rem] text-center">
                <AnimatedHeading
                    as="h2"
                    className="mx-auto max-w-7xl text-3xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.15]"
                    highlightWords={["solutions", "tailored", "ROI"]}
                    highlightClassName="font-semibold bg-wipe-gradient"
                    delay={0.2}
                >
                    AI-powered solutions tailored to cut costs, boost efficiency, maximize ROI and unlock business growth.
                </AnimatedHeading>
            </div>
        </section>
    );
}
