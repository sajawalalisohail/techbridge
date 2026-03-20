'use client';

import { useEffect, useRef, useState } from 'react';
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
    const viewportRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const scrollProgressRef = useJellyMorphScrollProgress();
    const [viewportWidth, setViewportWidth] = useState(0);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const measure = () => {
            setViewportWidth(viewportRef.current?.clientWidth ?? 0);
        };

        measure();
        window.addEventListener('resize', measure);

        return () => {
            window.removeEventListener('resize', measure);
        };
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        gsap.registerPlugin(ScrollTrigger);

        const container = containerRef.current;
        const track = trackRef.current;
        const viewport = viewportRef.current;
        if (!container || !track || !viewport) return;

        const containerW = viewport.clientWidth;
        if (!containerW) return;

        const revealOffset = containerW * 0.15;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: 'top top',
                end: () => `+=${track.scrollWidth * 1.5}`,
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

            if (dist > 0) {
                tl.to(track, { x: targetX, ease: 'none', duration: dist / 400 });
                currentX = targetX;
            }

            const openDur = 0.5;
            const label = `open-${index}`;
            tl.addLabel(label);
            tl.to(details, { height: 'auto', opacity: 1, ease: 'power2.out', duration: openDur }, label);
            tl.to(spacer, { height: '0%', ease: 'power2.out', duration: openDur }, label);
            tl.to(numberEl, { opacity: 0, ease: 'power2.out', duration: openDur }, label);
            tl.to(card, { backgroundColor: ACTIVE_CARD_BG, borderColor: ACTIVE_CARD_BORDER, ease: 'power2.out', duration: openDur }, label);

            tl.to({}, { duration: 0.4 });
        });

        if (currentX > maxScroll) {
            const dist = Math.abs(maxScroll - currentX);
            tl.to(track, { x: maxScroll, ease: 'none', duration: dist / 400 });
        }

        const handleResize = () => ScrollTrigger.refresh();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            tl.scrollTrigger?.kill();
            tl.kill();
        };
    }, [scrollProgressRef, viewportWidth]);

    return (
        <section ref={containerRef} id="services" className="relative h-screen w-full overflow-hidden" style={{ background: 'transparent' }}>
            <div className="mx-auto h-full w-full max-w-[100rem] px-6 lg:px-10">
                <div className="relative h-full w-full">
                    <div className="absolute left-0 top-0 z-10 flex h-full w-full flex-col justify-start pt-24 transition-opacity duration-500 md:w-[40%] md:pt-28">
                        <span className="mb-5 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-brand-accent-light">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-accent-light" />
                            <span className="h-px w-4 bg-brand-accent-light/40" />
                            WHAT WE DO
                        </span>

                        <h2 className="mb-6 text-3xl font-light leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                            Our <span className="inline-block bg-gradient-to-r from-brand-accent-light to-brand-accent bg-clip-text text-transparent font-medium">Services.</span>
                        </h2>

                        <p className="max-w-md text-sm font-light leading-relaxed text-zinc-400 md:text-base">
                            We build high-performance products combining pixel-perfect design with scalable engineering.
                        </p>
                    </div>

                    <div
                        ref={viewportRef}
                        className="absolute right-0 top-0 z-20 h-full w-full overflow-hidden md:w-[60%]"
                        style={{
                            maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 100%)',
                            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 100%)'
                        }}
                    >
                        <div ref={trackRef} className="flex h-full w-max flex-nowrap items-center pt-48 md:pt-24">
                            <div className="flex-shrink-0" style={{ width: Math.max(viewportWidth, 1) }} />

                            {SERVICES_DATA.map((service, index) => (
                                <div key={service.id} className="flex flex-shrink-0 items-center justify-center px-4 md:mr-[3vw] md:px-0">
                                    <div
                                        ref={(el) => { cardsRef.current[index] = el; }}
                                        className="service-card relative flex h-[480px] w-[85vw] flex-shrink-0 flex-col overflow-hidden rounded-2xl border p-8 backdrop-blur-2xl md:w-[420px]"
                                        style={{ backgroundColor: INACTIVE_CARD_BG, borderColor: INACTIVE_CARD_BORDER }}
                                    >
                                        <div className="pointer-events-none absolute left-8 right-8 top-8 z-10 flex items-start justify-between">
                                            <span className="service-number font-sans text-4xl font-medium tracking-normal text-white md:text-5xl">
                                                {service.number}
                                            </span>
                                            <div className="text-white">
                                                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="h-7 w-7">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                                </svg>
                                            </div>
                                        </div>

                                        <div className="content-wrapper z-10 flex h-full w-full flex-col">
                                            <div className="card-spacer" style={{ height: '100%', flexShrink: 1 }} />
                                            <h2 className="mb-2 text-3xl font-semibold tracking-tight text-white md:text-[32px]">{service.title}</h2>

                                            <div className="card-details flex h-0 flex-1 flex-col overflow-hidden opacity-0">
                                                <div className="mt-4 flex flex-1 items-center">
                                                    <p className="text-[15px] font-light leading-relaxed text-white">
                                                        {service.description}
                                                    </p>
                                                </div>

                                                <div className="mt-auto grid grid-cols-[1.5fr_1fr] gap-4 pt-8">
                                                    <div>
                                                        <h3 className="mb-2 text-[14px] font-normal tracking-wide text-white/60">Services</h3>
                                                        <ul className="space-y-1">
                                                            {service.services.map((item, itemIndex) => (
                                                                <li key={itemIndex} className="text-[13px] leading-snug text-white">
                                                                    {item}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <h3 className="mb-2 text-[14px] font-normal tracking-wide text-white/60">Tools</h3>
                                                        <div className="mt-2 flex flex-wrap gap-4">
                                                            {service.tools.map((tool, toolIndex) => (
                                                                <div key={toolIndex} className="flex h-6 w-6 items-center justify-center text-white" title={tool.name}>
                                                                    <div className="flex scale-[1.2] items-center justify-center drop-shadow-md">{tool.svg}</div>
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

                            <div className="flex-shrink-0" style={{ width: Math.max(viewportWidth, 1) }} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
