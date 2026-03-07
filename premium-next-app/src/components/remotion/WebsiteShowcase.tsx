"use client";

import React, { useMemo } from "react";
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Player } from "@remotion/player";

export interface WebsiteShowcaseProps {
    src: string;
}

const Composition = ({ src }: WebsiteShowcaseProps) => {
    const frame = useCurrentFrame();
    const { durationInFrames, fps } = useVideoConfig();

    // Start sliding down after 30 frames, and keep scrolling until the end over a very slow spring or linear
    // We want to just animate translateY from 0% to -max%. Since we don't know the exact aspect ratio of the screenshot,
    // we'll scroll by a percentage of the container. 
    // Usually, a full screenshot is 2x to 4x the height of the container.
    // Let's scroll up linearly over the duration. We pause at start and pause at end.

    const pauseStart = 45; // 1.5 seconds @ 30fps
    const pauseEnd = 45;

    const scrollDuration = durationInFrames - pauseStart - pauseEnd;

    const progress = interpolate(
        frame,
        [pauseStart, pauseStart + scrollDuration],
        [0, 1],
        {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );

    // Easing the progress
    const easedProgress = spring({
        frame: frame - pauseStart,
        fps,
        config: {
            damping: 100,
            stiffness: 10,
            mass: 0.5,
        },
        durationInFrames: scrollDuration,
    });

    // We translate the image. 
    // Assuming the image height is ~3x the container, we translate by -65% to show the bottom footer.
    const translateY = interpolate(progress, [0, 1], [0, -65]);

    return (
        <AbsoluteFill style={{ backgroundColor: "#09090b", position: "relative" }}>
            {/* Background blurred glow for effect */}
            <div
                style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '40%',
                    background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.2), transparent)',
                    filter: 'blur(40px)',
                    opacity: interpolate(frame, [0, 30], [0, 1]),
                }}
            />

            <div
                style={{
                    position: 'absolute',
                    top: '5%',
                    left: '5%',
                    right: '5%',
                    bottom: '0',
                    borderRadius: '12px 12px 0 0',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderBottom: 'none',
                    overflow: 'hidden',
                    backgroundColor: '#000',
                    boxShadow: '0 0 40px rgba(0,0,0,0.5)',
                    transform: `translateY(${interpolate(frame, [0, 20], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
                    opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
                }}
            >
                {/* Browser bar mock */}
                <div style={{ height: '24px', backgroundColor: '#18181b', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', padding: '0 10px', gap: '4px' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#ef4444' }} />
                    <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#eab308' }} />
                    <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#22c55e' }} />
                </div>
                {/* The scrolling screenshot */}
                <div style={{ transform: `translateY(${translateY}%)`, width: '100%' }}>
                    <Img src={src} style={{ width: '100%', display: 'block' }} />
                </div>
            </div>

        </AbsoluteFill>
    );
};

import dynamic from "next/dynamic";

const WebsitePlayerBase = ({ src }: { src: string }) => {
    return (
        <Player
            component={Composition}
            inputProps={{ src }}
            durationInFrames={360} // 12 seconds
            fps={30}
            compositionWidth={800}
            compositionHeight={600}
            style={{
                width: '100%',
                height: '100%',
            }}
            autoPlay
            loop
            controls={false}
        />
    );
};

export const WebsitePlayer = dynamic(() => Promise.resolve(WebsitePlayerBase), { ssr: false });
