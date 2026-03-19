"use client";

import AnimatedHeading from "@/components/shared/AnimatedHeading";

export default function UnderHeroText() {
    return (
        <section className="relative z-10 w-full bg-transparent px-6 pb-20 pt-10 sm:pb-32 lg:px-10">
            <div className="mx-auto max-w-[100rem] flex flex-col items-center text-center">
                <AnimatedHeading
                    as="h2"
                    className="mx-auto max-w-5xl text-center text-4xl font-normal leading-[1.12] tracking-tight text-white drop-shadow-md sm:text-5xl lg:text-6xl xl:text-7xl"
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
