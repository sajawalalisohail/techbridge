"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useInView, useReducedMotion } from "framer-motion";
import { createTimeline, cubicBezier, stagger } from "animejs";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import HeroBlobBackground from "./HeroBlobBackground";

const HERO_HEADLINE: ReadonlyArray<
  ReadonlyArray<{ text: string; accent?: boolean; muted?: boolean }>
> = [
  [
    { text: "Build", accent: false },
    { text: "operating systems.", accent: true },
  ],
  [
    { text: "Embed", accent: false },
    { text: "senior engineers.", accent: false },
  ],
  [
    { text: "Move like", accent: false },
    { text: "an in-house team.", accent: false, muted: true },
  ],
] as const;

const heroEase = cubicBezier(0.22, 1, 0.36, 1);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView || !copyRef.current || prefersReducedMotion) {
      return;
    }

    const root = copyRef.current;
    const headlineWords = Array.from(root.querySelectorAll("[data-hero-word]"));
    const copyBlocks = Array.from(root.querySelectorAll("[data-hero-copy]"));
    const timeline = createTimeline({
      defaults: { ease: heroEase },
    });

    timeline
      .add(headlineWords, {
        opacity: [0, 1],
        y: [56, 0],
        duration: 820,
        delay: stagger(85),
      })
      .add(
        copyBlocks,
        {
          opacity: [0, 1],
          y: [24, 0],
          duration: 620,
          delay: stagger(70),
        },
        "-=520"
      );

    return () => {
      timeline.revert();
    };
  }, [isInView, prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.03),transparent_32%),linear-gradient(180deg,#030406_0%,#05070b_45%,#070b11_100%)]" />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.8'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "240px 240px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundPosition: "center",
          backgroundSize: "72px 72px",
          maskImage: "linear-gradient(180deg, rgba(0,0,0,0.8), rgba(0,0,0,0.25) 55%, transparent 100%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <HeroBlobBackground variant="contained" className="translate-y-8 scale-[1.08] opacity-90" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, rgba(var(--brand-accent-rgb), 0) 0%, rgba(var(--brand-accent-rgb), 0.45) 28%, rgba(var(--brand-accent-light-rgb), 0.72) 50%, rgba(var(--brand-accent-rgb), 0.45) 72%, rgba(var(--brand-accent-rgb), 0) 100%)",
          boxShadow: "0 0 22px rgba(var(--brand-accent-rgb), 0.2)",
        }}
      />

      <div
        ref={copyRef}
        className="relative z-10 mx-auto max-w-[100rem] px-6 pb-8 pt-20 sm:px-8 sm:pt-24 lg:px-10 lg:pb-10"
      >
        <div className="flex min-h-[calc(100svh-5.75rem)] flex-col justify-center">
          <div className="mx-auto flex max-w-[74rem] flex-col items-center text-center">
            <div
              data-hero-copy="true"
              className="inline-flex items-center rounded-full border border-white/8 bg-white/[0.025] px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-zinc-500 backdrop-blur-sm"
            >
              Custom software / AI systems / embedded senior engineers
            </div>

            <h1 className="mt-8 max-w-[15.5ch] text-[clamp(2.8rem,5.3vw,5.35rem)] font-light leading-[1.03] tracking-[-0.055em] text-white">
              {HERO_HEADLINE.map((line, lineIndex) => (
                <span
                  key={`hero-line-${lineIndex}`}
                  className="block overflow-visible pb-[0.12em] lg:whitespace-nowrap"
                >
                  {line.map((word) => (
                    <span
                      key={word.text}
                      data-hero-word="true"
                      className={`mr-[0.18em] inline-block pb-[0.09em] ${
                        word.accent
                          ? "bg-gradient-to-r from-white via-brand-accent-light to-brand-accent bg-clip-text text-transparent"
                          : word.muted
                            ? "text-zinc-300"
                            : ""
                      }`}
                    >
                      {word.text}
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            <p
              data-hero-copy="true"
              className="mt-5 flex max-w-[50rem] flex-col items-center text-[15px] leading-[1.72] text-zinc-300 sm:text-[16px] lg:text-[15px]"
            >
              <span className="inline-block text-center lg:whitespace-nowrap">
                TechBridge builds custom software, AI systems, and premium web presences
              </span>
              <span className="inline-block text-center lg:whitespace-nowrap">
                while embedding vetted senior engineers directly into client teams. The result is sharper execution, clearer accountability, and less agency drag.
              </span>
            </p>

            <p
              data-hero-copy="true"
              className="mt-3 max-w-none text-sm leading-7 text-zinc-500 sm:text-[15px] lg:whitespace-nowrap"
            >
              US strategy. Global engineering office. Structured like one operating system instead
              of a handoff maze.
            </p>

            <div data-hero-copy="true" className="mt-9 flex flex-col items-center gap-4">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/contact"
                  className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_42px_rgba(var(--brand-accent-rgb),0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-accent-light"
                >
                  Start a Project
                  <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/staff-augmentation"
                  className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-accent/50 hover:bg-brand-accent/[0.12]"
                >
                  Hire Engineers
                  <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>

                <Link
                  href="/work"
                  className="inline-flex min-h-12 items-center justify-center px-2 text-sm font-medium text-zinc-400 transition-colors duration-200 hover:text-white"
                >
                  See Selected Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
