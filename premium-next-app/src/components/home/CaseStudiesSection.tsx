"use client";

import { useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getHomepageCaseStudies, type CaseStudy } from "@/data/case-studies";
import { MOTION_STAGGER, MOTION_TRANSITIONS } from "@/lib/motion";

function StudyVisual({ study, compact = false }: { study: CaseStudy; compact?: boolean }) {
  const asset = study.assets[0];

  if (asset) {
    return (
      <div
        className={`relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-black/25 ${
          compact ? "aspect-[16/11]" : "min-h-[320px] lg:min-h-[440px]"
        }`}
      >
        <Image
          src={asset}
          alt={`${study.client} project preview`}
          fill
          sizes={compact ? "(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw" : "(min-width: 1024px) 50vw, 100vw"}
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.42)_58%,rgba(0,0,0,0.84)_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-300">
            Visual proof asset
          </p>
          <p className="mt-2 text-sm text-zinc-400">{study.client} live preview</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))] p-6 ${
        compact ? "aspect-[16/11]" : "min-h-[320px] lg:min-h-[440px]"
      }`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at top right, rgba(var(--brand-accent-light-rgb), 0.18), transparent 28%), radial-gradient(circle at bottom left, rgba(var(--brand-accent-rgb), 0.14), transparent 32%)",
        }}
      />
      <div className="relative flex h-full flex-col justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
            Generated proof board
          </p>
          <p className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
            {study.metric}
          </p>
          <p className="mt-3 max-w-[18rem] text-sm leading-6 text-zinc-300">{study.metricLabel}</p>
        </div>

        <div className="grid gap-3">
          {study.results.slice(0, compact ? 2 : 3).map((result) => (
            <div
              key={result.label}
              className="rounded-2xl border border-white/8 bg-black/20 px-4 py-3"
            >
              <p className="text-sm font-semibold text-white">{result.stat}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-zinc-500">
                {result.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SupportingStudyCard({
  index,
  study,
}: {
  index: number;
  study: CaseStudy;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      viewport={{ once: true, margin: "-80px" }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        ...MOTION_TRANSITIONS.reveal,
        delay: index * MOTION_STAGGER.tight,
      }}
    >
      <Link
        href={`/work/${study.slug}`}
        className="group block h-full overflow-hidden rounded-[1.85rem] border border-white/10 bg-white/[0.035] p-4 transition-colors duration-200 hover:border-brand-accent/35 hover:bg-white/[0.05]"
      >
        <StudyVisual compact study={study} />

        <div className="mt-5 px-1 pb-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
            {study.sector}
          </p>
          <h3 className="mt-3 text-[1.45rem] font-semibold tracking-[-0.035em] text-white">
            {study.client}
          </h3>
          <div className="mt-4 flex items-end gap-3">
            <span className="text-2xl font-semibold tracking-[-0.04em] text-brand-accent-light">
              {study.metric}
            </span>
            <span className="pb-1 text-xs uppercase tracking-[0.16em] text-zinc-500">
              {study.metricLabel}
            </span>
          </div>
          <p className="mt-4 text-sm leading-6 text-zinc-400">{study.heroDescription}</p>
          <div className="mt-6 flex items-center justify-between border-t border-white/8 pt-4">
            <span className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
              {study.engagementType.replace("-", " ")}
            </span>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
              View proof
              <ArrowRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function CaseStudiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const studies = useMemo(() => getHomepageCaseStudies(), []);
  const featuredStudy = useMemo(
    () => studies.find((study) => study.assets.length > 0 && study.slug !== "ali-wali") ?? studies[0],
    [studies]
  );
  const supportingStudies = useMemo(
    () => studies.filter((study) => study.slug !== featuredStudy.slug).slice(0, 3),
    [featuredStudy.slug, studies]
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Selected work and proof"
      className="relative overflow-hidden py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 82% 18%, rgba(var(--brand-accent-light-rgb), 0.08), transparent 24%), radial-gradient(circle at 16% 78%, rgba(var(--brand-accent-rgb), 0.08), transparent 28%)",
        }}
      />

      <div className="relative mx-auto max-w-[100rem] px-6 lg:px-10">
        <div className="mb-12 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={MOTION_TRANSITIONS.reveal}
            className="max-w-3xl"
          >
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-accent-light">
              Proof layer
            </p>
            <h2 className="mt-5 text-3xl font-light tracking-[-0.045em] text-white sm:text-4xl lg:text-[3rem]">
              Featured proof first, supporting evidence immediately after.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
              The homepage now shows proof like a confident portfolio desk: one featured engagement
              with visual weight, then supporting tiles that prove TechBridge can handle platforms,
              internal systems, mobile products, and high-speed launches.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...MOTION_TRANSITIONS.reveal, delay: 0.1 }}
          >
            <Link
              href="/work"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:border-brand-accent/40 hover:bg-brand-accent/[0.12]"
            >
              See All Selected Work
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>

        <motion.article
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...MOTION_TRANSITIONS.reveal, delay: 0.08 }}
          className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 sm:p-5"
        >
          <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="group">
              <StudyVisual study={featuredStudy} />
            </div>

            <div className="flex flex-col rounded-[1.7rem] border border-white/8 bg-black/20 p-6 sm:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                {featuredStudy.sector}
              </p>
              <h3 className="mt-4 text-[2rem] font-semibold leading-tight tracking-[-0.04em] text-white sm:text-[2.4rem]">
                {featuredStudy.client}
              </h3>

              <div className="mt-6 flex flex-wrap items-end gap-x-4 gap-y-2">
                <span className="text-5xl font-semibold tracking-[-0.06em] text-brand-accent-light sm:text-6xl">
                  {featuredStudy.metric}
                </span>
                <span className="pb-1 text-sm uppercase tracking-[0.2em] text-zinc-500">
                  {featuredStudy.metricLabel}
                </span>
              </div>

              <p className="mt-6 text-sm leading-7 text-zinc-300 sm:text-base">
                {featuredStudy.heroDescription}
              </p>

              <div className="mt-8 grid gap-3">
                {featuredStudy.results.slice(0, 3).map((result) => (
                  <div
                    key={result.label}
                    className="rounded-[1.2rem] border border-white/8 bg-white/[0.035] px-4 py-4"
                  >
                    <p className="text-lg font-semibold tracking-[-0.03em] text-white">
                      {result.stat}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-zinc-500">
                      {result.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-white/8 pt-8">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                    Delivery type
                  </p>
                  <p className="mt-2 text-sm text-zinc-300">
                    {featuredStudy.engagementType.replace("-", " ")}
                  </p>
                </div>

                <Link
                  href={`/work/${featuredStudy.slug}`}
                  className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:border-brand-accent/40 hover:bg-brand-accent/[0.12]"
                >
                  View Case Study
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </div>
        </motion.article>

        <div className="mt-6 grid gap-4 xl:grid-cols-3">
          {supportingStudies.map((study, index) => (
            <SupportingStudyCard key={study.slug} index={index} study={study} />
          ))}
        </div>
      </div>
    </section>
  );
}
