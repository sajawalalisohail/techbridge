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
        <AbsoluteFill style={{ backgroundColor: "transparent", position: "relative" }}>
            {/* Background blurred glow for effect based on theme color */}
            <div
                style={{
                    position: 'absolute', top: '-10%', left: '-10%', right: '-10%', height: '50%',
                    background: `radial-gradient(circle at center, ${theme}, transparent)`,
                    filter: 'blur(100px)',
                    opacity: interpolate(frame, [0, 30], [0, 0.3], { extrapolateRight: "clamp" }),
                }}
            />

            <AbsoluteFill style={{ padding: '20px' }}>
                <div
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        backgroundColor: 'transparent',
                        display: 'flex',
                        flexDirection: 'column',
                        // Optional highly subtle floating border
                        boxShadow: `0 0 0 1px rgba(255, 255, 255, 0.03)`
                    }}
                >

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
