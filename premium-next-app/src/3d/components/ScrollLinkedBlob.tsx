"use client";

import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface ColorStop {
  offset: number;
  color: string;
  opacity: number;
}

interface ScrollLinkedBlobProps {
  colorStops: ColorStop[];
}

export function ScrollLinkedBlob({ colorStops }: ScrollLinkedBlobProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const scrollProgress = useRef(0);
  const { viewport } = useThree();

  // Create gradient texture
  const gradientTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    colorStops.forEach(stop => {
      gradient.addColorStop(stop.offset, stop.color);
    });
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, [colorStops]);

  const uniforms = useMemo(() => ({
    uTexture: { value: gradientTexture },
  }), [gradientTexture]);

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform sampler2D uTexture;
    varying vec2 vUv;
    
    void main() {
      vec4 color = texture2D(uTexture, vUv);
      gl_FragColor = color;
    }
  `;

  // Set up ScrollTrigger
  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    
    // Main scroll progress tracker
    const mainTrigger = ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
      }
    });
    triggers.push(mainTrigger);

    // Section-specific morphs
    const sections = ['#services', '#how-it-works', '#why-choose-us', '#case-studies', '#cta'];
    
    sections.forEach((section, index) => {
      const el = document.querySelector(section);
      if (el) {
        const trigger = ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          scrub: 0.5,
        });
        triggers.push(trigger);
      }
    });

    return () => {
      triggers.forEach(t => t.kill());
    };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;
    const scroll = scrollProgress.current;

    // Base breathing animation
    const breath = 1 + Math.sin(time * 0.5) * 0.03;

    // Scroll-linked transformations
    // Hero (0-0.1): Center, subtle
    // Services (0.1-0.25): Move right and up
    // HowItWorks (0.25-0.4): Move left, rotate
    // WhyChooseUs (0.4-0.55): Drift down, scale up
    // CaseStudies (0.55-0.75): Move to corner, faster rotation
    // CTA (0.75-1.0): Center, pulse glow

    let targetX = 0;
    let targetY = 2;
    let targetZ = -12;
    let targetScale = 1.2;
    let targetRotZ = 0;
    let targetRotX = 0;

    if (scroll < 0.15) {
      // Hero section - gentle center
      targetX = Math.sin(time * 0.3) * 0.5;
      targetY = 3 + Math.sin(time * 0.2) * 0.3;
      targetScale = 1.1 + Math.sin(time * 0.4) * 0.05;
    } else if (scroll < 0.3) {
      // Services - slide right and morph
      const localProgress = (scroll - 0.15) / 0.15;
      targetX = localProgress * 4;
      targetY = 3 - localProgress * 2;
      targetRotZ = -localProgress * 0.3;
      targetScale = 1.15;
    } else if (scroll < 0.45) {
      // HowItWorks - drift left with rotation
      const localProgress = (scroll - 0.3) / 0.15;
      targetX = 4 - localProgress * 6;
      targetY = 1 + localProgress * 1;
      targetRotZ = -0.3 + localProgress * 0.6;
      targetRotX = Math.sin(time * 0.5) * 0.1;
      targetScale = 1.15;
    } else if (scroll < 0.6) {
      // WhyChooseUs - expand and drift
      const localProgress = (scroll - 0.45) / 0.15;
      targetX = -2 + localProgress * 2;
      targetY = 2 - localProgress * 1;
      targetScale = 1.15 + localProgress * 0.15;
      targetRotZ = 0.3 - localProgress * 0.2;
    } else if (scroll < 0.8) {
      // CaseStudies - corner position, active rotation
      const localProgress = (scroll - 0.6) / 0.2;
      targetX = 0 + Math.sin(time * 0.8 + localProgress * 3) * 1;
      targetY = 1 + Math.cos(time * 0.6 + localProgress * 2) * 0.5;
      targetRotZ = time * 0.1 + localProgress * 0.5;
      targetScale = 1.3;
    } else {
      // CTA - return to center with pulse
      const localProgress = (scroll - 0.8) / 0.2;
      targetX = (1 - localProgress) * 0;
      targetY = 2.5 + Math.sin(time * 0.8) * 0.2;
      targetRotZ = 0;
      targetScale = 1.2 + Math.sin(time * 1.5) * 0.08;
    }

    // Smooth interpolation
    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.03;
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.03;
    meshRef.current.position.z = targetZ;
    meshRef.current.rotation.z += (targetRotZ - meshRef.current.rotation.z) * 0.02;
    meshRef.current.rotation.x += (targetRotX - meshRef.current.rotation.x) * 0.02;
    meshRef.current.scale.setScalar(targetScale * breath);
  });

  return (
    <mesh ref={meshRef} position={[0, 2, -12]}>
      <planeGeometry args={[6, 6]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
