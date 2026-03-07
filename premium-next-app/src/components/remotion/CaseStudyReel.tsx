"use client";

import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Sequence } from "remotion";
import { Player, PlayerRef } from "@remotion/player";
import dynamic from "next/dynamic";

export interface CaseStudyReelProps {
    brand: string;
    assets: string[];
    theme: string;
}

const Composition = ({ brand, assets, theme }: CaseStudyReelProps) => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames, width, height } = useVideoConfig();

    // Determine how many sequences we have based on the number of assets.
    // Let's divide the duration equally among assets.
    const segmentDuration = Math.floor(durationInFrames / Math.max(1, assets.length));

    return (
        <AbsoluteFill style={{ backgroundColor: "#09090b", position: "relative" }}>
            {/* Background blurred glow for effect based on theme color */}
            <div
                style={{
                    position: 'absolute', top: '-10%', left: '-10%', right: '-10%', height: '50%',
                    background: `radial-gradient(circle at center, ${theme}, transparent)`,
                    filter: 'blur(80px)',
                    opacity: interpolate(frame, [0, 30], [0, 0.5], { extrapolateRight: "clamp" }),
                }}
            />

            {/* "Engineered" Code Grid Overlay */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    opacity: 0.15,
                    pointerEvents: 'none',
                }}
            />

            <AbsoluteFill style={{ padding: '40px' }}>
                <div
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        borderRadius: '16px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        backgroundColor: '#000',
                        overflow: 'hidden',
                        boxShadow: `0 0 60px ${theme.replace(')', ', 0.2)').replace('rgb', 'rgba')}`,
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    {/* Browser Edge */}
                    <div style={{ width: '100%', height: '32px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', padding: '0 12px', gap: '6px', backgroundColor: '#18181b', zIndex: 10 }}>
                        <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#ef4444' }} />
                        <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#eab308' }} />
                        <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#22c55e' }} />
                        <div style={{ marginLeft: '12px', color: 'rgba(255,255,255,0.4)', fontSize: '10px', fontFamily: 'monospace', letterSpacing: '1px' }}>
                            {brand} {"//"} COMPILED SECURE BUILD
                        </div>
                    </div>

                    <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
                        {assets.map((asset, i) => {
                            const startFrame = i * segmentDuration;
                            const endFrame = startFrame + segmentDuration;

                            const isFirst = i === 0;
                            const isLast = i === assets.length - 1;

                            // Smooth cinematic crossfade overlaps
                            const inOpacity = interpolate(frame, [startFrame, startFrame + 45], [isFirst ? 1 : 0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                            const outOpacity = interpolate(frame, [endFrame - 45, endFrame], [1, isLast ? 1 : 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                            const opacityVal = Math.min(inOpacity, outOpacity);

                            // Slower scale
                            const scaleVal = interpolate(frame, [startFrame, startFrame + 240], [1.05, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

                            return (
                                <AbsoluteFill key={i} style={{ justifyContent: 'center', alignItems: 'center', opacity: opacityVal, transform: `scale(${scaleVal})`, zIndex: i }}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={asset} alt="Case Study Element" style={{ objectFit: 'cover', width: '100%', height: '100%', objectPosition: 'top' }} />
                                </AbsoluteFill>
                            );
                        })}
                    </div>
                </div>
            </AbsoluteFill>

            <div style={{ position: 'absolute', bottom: '20px', right: '40px', color: theme, fontFamily: 'monospace', fontSize: '12px', fontWeight: 'bold' }}>
                SCROLL_FR: {frame.toString().padStart(4, '0')} / {durationInFrames}
            </div>
        </AbsoluteFill>
    );
};

// Next.js dynamic import wrapper
const CaseStudyReelPlayer = ({ brand, assets, theme, playerRef }: CaseStudyReelProps & { playerRef?: React.Ref<PlayerRef> }) => {
    return (
        <Player
            ref={playerRef}
            component={Composition}
            inputProps={{ brand, assets, theme }}
            durationInFrames={600} // 20 seconds equivalent at 30fps
            fps={30}
            compositionWidth={1080}
            compositionHeight={800}
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'transparent'
            }}
            // we will control playback manually if scroll-synced, or loop if simply hovering
            autoPlay={false}
            loop={false}
            controls={false}
        />
    );
};

export const CaseStudyReel = dynamic(() => Promise.resolve(CaseStudyReelPlayer), { ssr: false });
