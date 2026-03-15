"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ResilienceIllustration() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    // 3 isometric layers
    const layers = [
        { id: "layer1", color: "var(--brand-accent-dark)", label: "Client" },   // brand-accent-dark
        { id: "layer2", color: "var(--brand-accent-dark)", label: "API" },      // brand-accent-dark
        { id: "layer3", color: "var(--brand-accent-deep)", label: "Database" }, // brand-accent-deep
    ];

    return (
        <div ref={ref} className="relative h-40 w-full overflow-hidden rounded-xl bg-black/40 border border-white/5 my-4 flex items-center justify-center perspective-[800px]">

            {/* Animated Shield Radar Sweep */}
            <motion.div
                className="absolute inset-0 z-0 bg-gradient-to-t from-brand-accent/20 to-transparent"
                initial={{ y: "100%", opacity: 0 }}
                animate={isInView ? { y: ["100%", "-100%"], opacity: [0, 0.5, 0] } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1.5 }}
            />

            <div className="relative flex flex-col items-center justify-center gap-1 z-10" style={{ transform: "rotateX(55deg) rotateZ(-45deg)", transformStyle: "preserve-3d" }}>

                {layers.map((layer, index) => (
                    <motion.div
                        key={layer.id}
                        className="relative flex items-center justify-center w-24 h-24 border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                        style={{
                            backgroundColor: layer.color,
                            boxShadow: `inset 0 0 20px rgba(0,0,0,0.3), ${index < 2 ? `0 10px 20px -5px ${layer.color}` : 'none'}`
                        }}
                        initial={{ z: 100 * (3 - index), opacity: 0 }}
                        animate={isInView ? { z: 0, opacity: 0.9 } : {}}
                        transition={{
                            duration: 0.8,
                            ease: "backOut",
                            delay: index * 0.2 + 0.2
                        }}
                    >
                        {/* Sub-grid lines for tech feel */}
                        <div className="absolute inset-0 opacity-20"
                            style={{
                                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)',
                                backgroundSize: '20% 20%'
                            }}
                        />
                        {/* Fake "chips" or nodes on the layer */}
                        <div className="w-1/3 h-1/3 bg-white/20 absolute top-2 left-2 rounded-sm" />
                        <div className="w-1/4 h-1/4 bg-white/10 absolute bottom-3 right-3 rounded-sm" />
                    </motion.div>
                ))}

                {/* Vertical connection beam through center */}
                <motion.div
                    className="absolute w-2 h-40 bg-gradient-to-b from-brand-accent-light to-transparent blur-[2px]"
                    style={{ zIndex: 50, transform: "translateZ(20px)" }}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 0.7 } : {}}
                    transition={{ duration: 1, delay: 1.2 }}
                />
            </div>
        </div>
    );
}

