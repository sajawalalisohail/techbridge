import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Our privacy practices and data handling policies.",
};

export default function PrivacyPage() {
    return (
        <div className="relative text-white">
            <div className="relative z-10 overflow-hidden min-h-screen">
                <section className="relative flex min-h-[60vh] items-center overflow-hidden">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0"
                        style={{
                            background:
                                "radial-gradient(ellipse at 50% 30%, rgba(139,92,246,0.04) 0%, rgba(139,92,246,0) 70%)",
                        }}
                    />
                    <div className="relative z-10 mx-auto max-w-3xl px-6 py-32 lg:px-12">
                        <span className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                            <span className="h-px w-6 bg-zinc-700" />
                            Legal
                        </span>
                        <h1 className="text-5xl font-bold tracking-tight text-white lg:text-6xl">
                            Privacy Policy
                        </h1>
                        <p className="mt-8 text-base leading-relaxed text-zinc-400 lg:text-lg">
                            This page is under construction. Our full privacy policy
                            detailing how we collect, use, and protect your data will be
                            published here shortly.
                        </p>
                        <p className="mt-4 text-base leading-relaxed text-zinc-400 lg:text-lg">
                            For immediate inquiries about our privacy practices, please
                            contact us at{" "}
                            <a
                                href="mailto:hello@techbridge.dev"
                                className="font-medium text-violet-400 transition-colors hover:text-violet-300"
                            >
                                hello@techbridge.dev
                            </a>
                            .
                        </p>
                        <div className="mt-10 rounded-xl border border-white/8 bg-white/[0.03] p-5">
                            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600">
                                Last Updated
                            </p>
                            <p className="mt-1 text-sm font-medium text-zinc-400">
                                Coming soon
                            </p>
                        </div>
                    </div>
                </section>

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 left-0 h-px w-full"
                    style={{
                        background:
                            "linear-gradient(90deg, rgba(139,92,246,0) 0%, rgba(139,92,246,0.4) 30%, rgba(99,102,241,0.6) 50%, rgba(139,92,246,0.4) 70%, rgba(139,92,246,0) 100%)",
                        boxShadow: "0 0 20px 4px rgba(109,40,217,0.25)",
                    }}
                />
            </div>
        </div>
    );
}
