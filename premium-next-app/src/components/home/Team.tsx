"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Linkedin } from "lucide-react";

interface TeamMember {
    name: string;
    role: string;
    bio: string;
    image: string;
    linkedin?: string;
}

const TEAM_MEMBERS: TeamMember[] = [
    {
        name: "Sajawal Ali Sohail",
        role: "Founder",
        bio: "Full-stack architect obsessed with shipping fast and building systems that scale. Leads strategy, client relationships, and product direction.",
        image: "/headshots/Ali.jpg",
        linkedin: "https://linkedin.com/in/sajawal",
    },
    {
        name: "Hamza Majeed",
        role: "Lead Engineer",
        bio: "Deep expertise across React, Node, and cloud infrastructure. Turns complex requirements into clean, maintainable code that performs.",
        image: "/headshots/Hamza.jpg",
        linkedin: "https://linkedin.com/in/hamza-majeed",
    },
];

export default function Team() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".team-member",
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.15,
                    duration: 0.7,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                    },
                }
            );
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative z-10 overflow-hidden py-28 lg:py-36"
            aria-label="Team"
        >
            <div className="mx-auto max-w-4xl px-6 text-center lg:px-16">
                {/* Eyebrow */}
                <span className="mb-4 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
                    <span className="h-px w-4 bg-brand-accent/40" />
                    the team
                    <span className="h-px w-4 bg-brand-accent/40" />
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
                </span>

                <h2 className="text-4xl font-bold tracking-tight text-white lg:text-5xl">
                    Two engineers. Zero overhead.
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-zinc-400 lg:text-lg">
                    No project managers. No account executives. You talk directly to the people writing your code.
                </p>

                {/* Team cards */}
                <div className="mt-16 flex flex-col items-center justify-center gap-12 sm:flex-row sm:gap-16 lg:gap-24">
                    {TEAM_MEMBERS.map((member) => (
                        <div
                            key={member.name}
                            className="team-member flex flex-col items-center text-center"
                            style={{ opacity: 0 }}
                        >
                            {/* Circular headshot */}
                            <div className="relative h-36 w-36 overflow-hidden rounded-full border-2 border-white/10 transition-all duration-500 hover:border-brand-accent/40 hover:shadow-[0_0_30px_rgba(var(--brand-accent-rgb), 0.15)] lg:h-44 lg:w-44">
                                <Image
                                    src={member.image}
                                    alt={`${member.name} â€” ${member.role}`}
                                    width={240}
                                    height={240}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            <h3 className="mt-5 text-lg font-semibold tracking-tight text-white">
                                {member.name}
                            </h3>
                            <p className="mt-1 font-mono text-xs font-medium uppercase tracking-widest text-brand-accent-light">
                                {member.role}
                            </p>
                            <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-400">
                                {member.bio}
                            </p>

                            {member.linkedin && (
                                <a
                                    href={member.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 inline-flex items-center gap-1.5 text-xs text-zinc-500 transition-colors duration-200 hover:text-brand-accent-light"
                                    aria-label={`${member.name} on LinkedIn`}
                                >
                                    <Linkedin size={14} />
                                    LinkedIn
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

