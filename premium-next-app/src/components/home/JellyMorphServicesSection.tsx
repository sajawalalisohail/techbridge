'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowRight, type LucideIcon } from 'lucide-react';
import { SERVICE_SECTIONS, type ServiceSectionData } from '@/data/site-navigation';
import { useJellyMorphScrollProgress } from '@/lib/jelly-morph-context';
import { MOTION_STAGGER, MOTION_TRANSITIONS } from '@/lib/motion';

const SERVICE_LAYOUT: Record<string, string> = {
  'custom-software': 'xl:col-span-7',
  'ai-lead-generation': 'xl:col-span-5',
  'rapid-deploy': 'xl:col-span-5',
  'mobile-apps': 'xl:col-span-7',
  'design-branding': 'xl:col-span-6',
  'internal-tools': 'xl:col-span-6',
  'staff-augmentation': 'xl:col-span-12',
};

const SERVICE_BEST_FIT: Record<string, string> = {
  'custom-software': 'Product teams building a flagship platform or serious internal system.',
  'ai-lead-generation': 'Operators who need pipeline creation to stop depending on manual outreach.',
  'rapid-deploy': 'Founders who need a premium web presence live this week, not next quarter.',
  'mobile-apps': 'Teams launching mobile products that need repeat use and production discipline.',
  'design-branding': 'Companies that want design to survive contact with engineering and launch.',
  'internal-tools': 'Operations-heavy teams replacing spreadsheet glue and disconnected SaaS habits.',
  'staff-augmentation': 'CTOs and founders who need senior capacity embedded without recruiting drag.',
};

function getServiceHref(serviceId: string) {
  if (serviceId === 'rapid-deploy') {
    return '/websites';
  }

  if (serviceId === 'staff-augmentation') {
    return '/staff-augmentation';
  }

  return `/services#${serviceId}`;
}

function getServiceCta(serviceId: string) {
  if (serviceId === 'rapid-deploy') {
    return 'See 24-Hour Sites';
  }

  if (serviceId === 'staff-augmentation') {
    return 'See Talent Model';
  }

  return 'Explore Service';
}

function getEngagementLabel(service: ServiceSectionData) {
  if (service.id === 'rapid-deploy') {
    return 'Rapid launch';
  }

  if (service.id === 'staff-augmentation') {
    return 'Embedded talent';
  }

  if (service.id === 'internal-tools') {
    return 'Operational system';
  }

  if (service.id === 'design-branding') {
    return 'Design-to-code';
  }

  return 'Custom build';
}

function ServiceCard({
  index,
  service,
}: {
  index: number;
  service: ServiceSectionData;
}) {
  const Icon = service.icon as LucideIcon;
  const href = getServiceHref(service.id);
  const cta = getServiceCta(service.id);
  const bestFit = SERVICE_BEST_FIT[service.id];
  const isPrimaryLane = service.id === 'custom-software' || service.id === 'staff-augmentation';

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileHover={{ y: -8 }}
      viewport={{ once: true, margin: '-80px' }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        ...MOTION_TRANSITIONS.reveal,
        delay: index * MOTION_STAGGER.tight,
      }}
      className={SERVICE_LAYOUT[service.id]}
    >
      <Link
        href={href}
        className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.02))] p-6 backdrop-blur-md transition-colors duration-200 hover:border-brand-accent/35 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] sm:p-7"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-80 transition-opacity duration-200 group-hover:opacity-100"
          style={{
            background: isPrimaryLane
              ? 'radial-gradient(circle at top right, rgba(var(--brand-accent-light-rgb), 0.18), transparent 28%), radial-gradient(circle at bottom left, rgba(var(--brand-accent-rgb), 0.12), transparent 34%)'
              : 'radial-gradient(circle at top right, rgba(var(--brand-accent-rgb), 0.12), transparent 26%), linear-gradient(180deg, rgba(255,255,255,0.03), transparent 26%)',
          }}
        />

        <div className="relative flex items-start justify-between gap-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-zinc-500">
              {service.number} / {getEngagementLabel(service)}
            </p>
            <h3 className="mt-4 max-w-[18ch] text-[1.6rem] font-semibold leading-tight tracking-[-0.035em] text-white sm:text-[1.9rem]">
              {service.category}
            </h3>
          </div>

          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-black/25 text-brand-accent-light">
            <Icon size={19} />
          </div>
        </div>

        <p className="relative mt-6 max-w-2xl text-base leading-7 text-zinc-100">
          {service.subHeadline}
        </p>

        <div className="relative mt-8 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Capabilities
            </p>
            <ul className="mt-4 space-y-3">
              {service.capabilities.slice(0, 3).map((capability) => (
                <li key={capability} className="flex items-start gap-3 text-sm leading-6 text-zinc-300">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-accent-light shadow-[0_0_10px_rgba(var(--brand-accent-light-rgb),0.72)]" />
                  <span>{capability}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[1.25rem] border border-white/8 bg-black/20 px-4 py-4 lg:max-w-[13rem]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
              Best fit
            </p>
            <p className="mt-3 text-sm leading-6 text-zinc-300">{bestFit}</p>
          </div>
        </div>

        <div className="relative mt-auto flex items-end justify-between gap-5 border-t border-white/8 pt-8">
          <p className="max-w-[18rem] text-xs uppercase tracking-[0.2em] text-zinc-500">
            {service.stack.slice(0, 3).join(' / ')}
          </p>

          <span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
            {cta}
            <ArrowRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

export default function JellyMorphServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useJellyMorphScrollProgress();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-80px' });

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    scrollProgressRef.current = value;
  });

  useEffect(() => {
    return () => {
      scrollProgressRef.current = 0;
    };
  }, [scrollProgressRef]);

  return (
    <section ref={sectionRef} id="services" className="relative overflow-hidden py-24 lg:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 18% 22%, rgba(var(--brand-accent-rgb), 0.08), transparent 28%), radial-gradient(circle at 82% 68%, rgba(var(--brand-accent-light-rgb), 0.07), transparent 24%)',
        }}
      />

      <div className="relative mx-auto max-w-[100rem] px-6 lg:px-10">
        <div className="grid gap-12 xl:grid-cols-[320px_minmax(0,1fr)] xl:gap-14">
          <div ref={headerRef} className="xl:sticky xl:top-28 xl:self-start">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={MOTION_TRANSITIONS.reveal}
              className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-accent-light"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-accent-light" />
              Service architecture
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...MOTION_TRANSITIONS.reveal, delay: 0.08 }}
              className="mt-6 text-3xl font-light leading-tight tracking-[-0.045em] text-white sm:text-4xl lg:text-[3rem]"
            >
              Canonical services, redesigned as editorial decision panels.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...MOTION_TRANSITIONS.reveal, delay: 0.14 }}
              className="mt-5 max-w-md text-sm leading-7 text-zinc-400 sm:text-base"
            >
              The homepage no longer sells vague disciplines. Each card now maps directly to the
              real service taxonomy, clarifies the outcome, and gives visitors a clear route into
              the right engagement model.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...MOTION_TRANSITIONS.reveal, delay: 0.2 }}
              className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                Section logic
              </p>
              <p className="mt-3 text-sm leading-6 text-zinc-300">
                Build lanes, rapid launch lanes, and talent lanes are shown together so mixed B2B
                buyers can orient quickly without guessing where TechBridge fits.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-12">
            {SERVICE_SECTIONS.map((service, index) => (
              <ServiceCard key={service.id} index={index} service={service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
