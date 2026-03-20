'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useJellyMorphScrollProgress } from '@/lib/jelly-morph-context';
import { SERVICES_DATA } from './ServicesData';

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

        // Calculate how far the track needs to scroll to the left
        const getScrollAmount = () => {
            // The track is inside a container that is restricted to the right side (60vw on desktop)
            const containerW = window.innerWidth >= 768 ? window.innerWidth * 0.6 : window.innerWidth;
            return -(track.scrollWidth - containerW);
        };

        // 1. Main horizontal pin and translation
        const hScrollTween = gsap.to(track, {
            x: getScrollAmount,
            ease: "none",
            scrollTrigger: {
                trigger: container,
                start: "top top",
                end: () => `+=${track.scrollWidth}`, // Scroll duration equals track width
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    // Write progress so the WebGL components can smoothly morph the shapes
                    scrollProgressRef.current = self.progress;
                },
                onLeave: () => { scrollProgressRef.current = 1; },
                onLeaveBack: () => { scrollProgressRef.current = 0; },
            }
        });

        // 2. Individual card "Antigravity" reveal animations mapped strictly to horizontal scrub
        const cardTriggers: ScrollTrigger[] = [];

        cardsRef.current.forEach((card, index) => {
            if (!card) return;
            const details = card.querySelector('.card-details') as HTMLElement;
            if (!details) return;

            // In the "Antigravity" effect, the card details open scrubbed to scroll
            const openTl = gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    containerAnimation: hScrollTween,
                    start: 'left center+=30%', // start opening when left edge sweeps into framing 
                    end: 'left center-=10%',   // fully open just as it hits center
                    scrub: true,
                }
            });
            // Tween height to auto using a known max-height or directly auto in GSAP 3
            openTl.fromTo(details,
                { height: 0, opacity: 0 },
                { height: 'auto', opacity: 1, ease: 'none' }, 0);

            // Simultaneously transition the background
            openTl.fromTo(card,
                { backgroundColor: 'rgba(5, 5, 16, 0.8)', borderColor: 'rgba(255,255,255,0.05)' },
                { backgroundColor: '#1e3a8a', borderColor: 'rgba(255,255,255,0.2)', ease: 'none' }, 0);

            // Collapse animation when it moves past center toward the left
            const closeTl = gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    containerAnimation: hScrollTween,
                    start: 'center center-=10%', // start closing slightly past true center
                    end: 'right center-=20%',    // fully closed quickly
                    scrub: true,
                }
            });
            closeTl.to(details,
                { height: 0, opacity: 0, ease: 'none' }, 0);

            closeTl.to(card,
                { backgroundColor: 'rgba(5, 5, 16, 0.8)', borderColor: 'rgba(255,255,255,0.05)', ease: 'none' }, 0);

            if (openTl.scrollTrigger) cardTriggers.push(openTl.scrollTrigger);
            if (closeTl.scrollTrigger) cardTriggers.push(closeTl.scrollTrigger);
        });

        const handleResize = () => ScrollTrigger.refresh();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            hScrollTween.scrollTrigger?.kill();
            hScrollTween.kill();
            cardTriggers.forEach(t => t.kill());
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
                                className="service-card relative flex-shrink-0 h-[480px] w-[85vw] md:w-[420px] rounded-2xl border flex flex-col p-8 overflow-hidden bg-[#050510]/80 backdrop-blur-2xl border-white/5"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <span className="text-5xl md:text-6xl font-bold font-mono text-white/30 select-none tracking-tighter">
                                        {service.number}
                                    </span>
                                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5 text-white/50 card-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 5v14M5 12h14" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <h2 className="text-3xl font-bold text-white tracking-tight mb-2">{service.title}</h2>
                                    <p className="text-white/70 text-sm leading-relaxed max-w-sm font-light">
                                        {service.description}
                                    </p>

                                    {/* Collapsible Antigravity Content */}
                                    <div className="card-details overflow-hidden h-0 opacity-0">
                                        <div className="pt-6 mt-6 border-t border-white/20 grid grid-cols-2 gap-4">
                                            <div>
                                                <h3 className="text-[10px] uppercase tracking-widest text-white/50 mb-3 font-mono">Capabilities</h3>
                                                <ul className="space-y-1">
                                                    {service.services.map((s, i) => (
                                                        <li key={i} className="text-xs text-white/80 flex items-center gap-2">
                                                            <div className="w-1 h-1 rounded-full bg-white/50 flex-shrink-0" />
                                                            {s}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div>
                                                <h3 className="text-[10px] uppercase tracking-widest text-white/50 mb-3 font-mono">Core Stack</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {service.tools.map((tool, i) => (
                                                        <div key={i} className="flex items-center justify-center w-8 h-8 rounded border border-white/20 bg-white/10 text-white" title={tool.name}>
                                                            <div className="scale-[0.6] origin-center flex items-center justify-center text-white">{tool.svg}</div>
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
