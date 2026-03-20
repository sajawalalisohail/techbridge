'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useJellyMorphScrollProgress } from '@/lib/jelly-morph-context';
import { SERVICES_DATA } from './ServicesData';

const INACTIVE_CARD_BG = '#020617';
const INACTIVE_CARD_BORDER = 'rgba(59, 130, 246, 0.08)';
const ACTIVE_CARD_BG = '#172554';
const ACTIVE_CARD_BORDER = 'rgba(59, 130, 246, 0.18)';

export default function JellyMorphServicesSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const scrollProgressRef = useJellyMorphScrollProgress();

    useEffect(() => {
        if (typeof window === 'undefined') return;
        gsap.registerPlugin(ScrollTrigger);

        const container = containerRef.current;
        const track = trackRef.current;
        if (!container || !track) return;

        // Unified master timeline that coordinates horizontal scroll -> card reveal -> pause -> scroll
        const containerW = window.innerWidth >= 768 ? window.innerWidth * 0.6 : window.innerWidth;
        const revealOffset = containerW * 0.15; // Frame where card reveals safely past the mask

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: "top top",
                end: () => `+=${track.scrollWidth * 1.5}`, // increase scroll length for pauses
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    scrollProgressRef.current = self.progress;
                },
                onLeave: () => { scrollProgressRef.current = 1; },
                onLeaveBack: () => { scrollProgressRef.current = 0; },
            }
        });

        let currentX = 0;
        const maxScroll = -(track.scrollWidth - containerW);

        cardsRef.current.forEach((card, index) => {
            if (!card) return;
            const details = card.querySelector('.card-details') as HTMLElement;
            const spacer = card.querySelector('.card-spacer') as HTMLElement;
            const numberEl = card.querySelector('.service-number') as HTMLElement;

            let targetX = -(card.offsetLeft - revealOffset);
            if (targetX < maxScroll) targetX = maxScroll;
            if (targetX > 0) targetX = 0;

            const dist = Math.abs(targetX - currentX);

            // 1. HORIZONTAL SCROLL IN: Card enters inactive state
            if (dist > 0) {
                tl.to(track, { x: targetX, ease: "none", duration: dist / 400 });
                currentX = targetX;
            }

            // 2. ACTIVE REVEAL STATE (track pauses horizontally)
            const openDur = 0.5;
            const label = `open-${index}`;
            tl.addLabel(label);
            tl.to(details, { height: 'auto', opacity: 1, ease: 'power2.out', duration: openDur }, label);
            tl.to(spacer, { height: '0%', ease: 'power2.out', duration: openDur }, label);
            tl.to(numberEl, { opacity: 0, ease: 'power2.out', duration: openDur }, label);
            tl.to(card, { backgroundColor: ACTIVE_CARD_BG, borderColor: ACTIVE_CARD_BORDER, ease: 'power2.out', duration: openDur }, label);

            // 3. SUBTLE PAUSE before disappearing
            tl.to({}, { duration: 0.4 });

            // 4. Reset state slightly before or as next card forces it out?
            // User requested: "remain in inactive state until they reach the left most position... pause... then disappear to left"
            // Disappearing happens inherently as the next `track.x` translation executes!
        });

        // Continue scrolling to end if distance remains
        if (currentX > maxScroll) {
            const dist = Math.abs(maxScroll - currentX);
            tl.to(track, { x: maxScroll, ease: "none", duration: dist / 400 });
        }

        const handleResize = () => ScrollTrigger.refresh();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            tl.scrollTrigger?.kill();
            tl.kill();
        };
    }, [scrollProgressRef]);

    return (
        <section ref={containerRef} id="services" className="relative w-full h-screen overflow-hidden" style={{ background: 'transparent' }}>

            {/* ── Fixed Section Title (Stays on the Left) ── */}
            <div className="absolute top-0 left-0 w-full md:w-[40%] h-full flex flex-col justify-start pt-24 md:pt-28 px-6 sm:px-12 pointer-events-none z-10 transition-opacity duration-500">
                <span
                    className="mb-5 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-brand-accent-light"
                >
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-accent-light" />
                    <span className="h-px w-4 bg-brand-accent-light/40" />
                    WHAT WE DO
                </span>

                <h2 className="mb-6 text-3xl font-light leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                    Our <span className="inline-block bg-gradient-to-r from-brand-accent-light to-brand-accent bg-clip-text text-transparent font-medium">Services.</span>
                </h2>

                <p className="text-sm md:text-base text-zinc-400 max-w-md font-light leading-relaxed">
                    We build high-performance products combining pixel-perfect design with scalable engineering.
                </p>
            </div>

            {/* ── Horizontal Scrolling Track Container (Clipped to Right 70% with Fading Mask) ── */}
            <div
                className="absolute top-0 right-0 w-full md:w-[60%] h-full overflow-hidden pointer-events-auto z-20"
                style={{
                    maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 100%)'
                }}
            >
                <div ref={trackRef} className="h-full flex flex-row flex-nowrap items-center pt-48 md:pt-24" style={{ width: 'max-content' }}>

                    {/* Intro Spacer: Pushes the first card offscreen relative to the container */}
                    <div className="w-[100vw] md:w-[60vw] flex-shrink-0" />

                    {SERVICES_DATA.map((service, index) => (
                        <div key={service.id} className="flex-shrink-0 md:mr-[3vw] px-4 md:px-0 flex items-center justify-center">

                            <div
                                ref={(el) => { cardsRef.current[index] = el; }}
                                className="service-card relative flex-shrink-0 h-[480px] w-[85vw] md:w-[420px] rounded-2xl border flex flex-col p-8 overflow-hidden backdrop-blur-2xl"
                                style={{ backgroundColor: INACTIVE_CARD_BG, borderColor: INACTIVE_CARD_BORDER }}
                            >
                                <div className="absolute top-8 left-8 right-8 flex justify-between items-start pointer-events-none z-10">
                                    <span className="text-4xl md:text-5xl font-medium font-sans text-white service-number tracking-normal">
                                        {service.number}
                                    </span>
                                    <div className="text-white">
                                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="content-wrapper z-10 h-full w-full flex flex-col">
                                    <div className="card-spacer" style={{ height: '100%', flexShrink: 1 }}></div>
                                    <h2 className="text-3xl md:text-[32px] font-semibold text-white tracking-tight mb-2">{service.title}</h2>

                                    {/* Collapsible Content */}
                                    <div className="card-details overflow-hidden h-0 opacity-0 flex flex-col flex-1">
                                        <div className="mt-4 flex flex-1 items-center">
                                            <p className="text-white text-[15px] leading-relaxed font-light">
                                                {service.description}
                                            </p>
                                        </div>

                                        <div className="pt-8 mt-auto grid grid-cols-[1.5fr_1fr] gap-4">
                                            <div>
                                                <h3 className="text-[14px] text-white/60 mb-2 font-normal tracking-wide">Services</h3>
                                                <ul className="space-y-1">
                                                    {service.services.map((s, i) => (
                                                        <li key={i} className="text-[13px] text-white leading-snug">
                                                            {s}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div>
                                                <h3 className="text-[14px] text-white/60 mb-2 font-normal tracking-wide">Tools</h3>
                                                <div className="flex flex-wrap gap-4 mt-2">
                                                    {service.tools.map((tool, i) => (
                                                        <div key={i} className="flex items-center justify-center w-6 h-6 text-white" title={tool.name}>
                                                            <div className="scale-[1.2] flex items-center justify-center drop-shadow-md">{tool.svg}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Outro Spacer: Allows scrolling completely past the final card */}
                    <div className="w-[100vw] flex-shrink-0" />
                </div>
            </div>
        </section>
    );
}
