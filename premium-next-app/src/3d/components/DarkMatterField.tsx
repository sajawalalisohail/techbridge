"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export type DarkMatterVariant = "ambient" | "page" | "hero" | "framed";

function seededUnit(seed: number) {
  const value = Math.sin(seed * 127.1) * 43758.5453123;
  return value - Math.floor(value);
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return prefersReducedMotion;
}

function createParticleTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;

  const context = canvas.getContext("2d");
  if (!context) {
    return null;
  }

  const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255, 255, 255, 0.95)");
  gradient.addColorStop(0.35, "rgba(255, 255, 255, 0.38)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

  context.fillStyle = gradient;
  context.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function getVariantSettings(variant: DarkMatterVariant) {
  switch (variant) {
    case "ambient":
      return {
        intensity: 0.42,
        drift: 0.18,
        moteCount: 14,
        moteOpacity: 0.22,
        moteSpread: [16, 12, 5] as const,
        moteSpeed: 0.035,
      };
    case "hero":
      return {
        intensity: 1,
        drift: 0.42,
        moteCount: 26,
        moteOpacity: 0.42,
        moteSpread: [18, 13, 6] as const,
        moteSpeed: 0.055,
      };
    case "framed":
      return {
        intensity: 0.78,
        drift: 0.28,
        moteCount: 20,
        moteOpacity: 0.32,
        moteSpread: [17, 12, 5.5] as const,
        moteSpeed: 0.045,
      };
    case "page":
    default:
      return {
        intensity: 0.64,
        drift: 0.24,
        moteCount: 18,
        moteOpacity: 0.28,
        moteSpread: [16, 11, 5] as const,
        moteSpeed: 0.04,
      };
  }
}

function DarkMatterMotes({
  variant,
  reducedMotion,
}: {
  variant: DarkMatterVariant;
  reducedMotion: boolean;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const pointerTarget = useRef(new THREE.Vector2(0, 0));
  const texture = useMemo(() => createParticleTexture(), []);
  const settings = useMemo(() => getVariantSettings(variant), [variant]);
  const palette = useMemo(
    () => [new THREE.Color("#84cc16"), new THREE.Color("#a3e635"), new THREE.Color("#84cc16")],
    []
  );

  const [positions, velocities, colors] = useMemo(() => {
    const positions = new Float32Array(settings.moteCount * 3);
    const velocities = new Float32Array(settings.moteCount * 3);
    const colors = new Float32Array(settings.moteCount * 3);

    for (let index = 0; index < settings.moteCount; index++) {
      const base = index * 3;
      const color = palette[index % palette.length];
      const xNoise = seededUnit(index + settings.intensity * 11.7);
      const yNoise = seededUnit(index + settings.drift * 23.1);
      const zNoise = seededUnit(index + settings.moteCount * 3.7);
      const velocityNoise = seededUnit(index + settings.moteSpeed * 97.3);
      const velocityNoiseY = seededUnit(index + settings.moteSpeed * 173.9);
      const velocityNoiseZ = seededUnit(index + settings.moteSpeed * 251.1);
      const fadeNoise = seededUnit(index + settings.moteOpacity * 41.2);

      positions[base] = (xNoise - 0.5) * settings.moteSpread[0];
      positions[base + 1] = (yNoise - 0.5) * settings.moteSpread[1];
      positions[base + 2] = (zNoise - 0.5) * settings.moteSpread[2];

      velocities[base] = (velocityNoise - 0.5) * settings.moteSpeed;
      velocities[base + 1] = (velocityNoiseY - 0.5) * settings.moteSpeed * 0.75;
      velocities[base + 2] = (velocityNoiseZ - 0.5) * settings.moteSpeed * 0.4;

      const depthFade = 0.45 + fadeNoise * 0.45;
      colors[base] = color.r * depthFade;
      colors[base + 1] = color.g * depthFade;
      colors[base + 2] = color.b * depthFade;
    }

    return [positions, velocities, colors] as const;
  }, [palette, settings]);

  const geometry = useMemo(() => {
    const bufferGeometry = new THREE.BufferGeometry();
    bufferGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    bufferGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return bufferGeometry;
  }, [colors, positions]);

  useFrame((state, delta) => {
    const points = pointsRef.current;
    if (!points) {
      return;
    }

    pointerTarget.current.lerp(state.pointer, reducedMotion ? 0.02 : 0.05);

    const positionAttribute = points.geometry.attributes.position;
    const pointPositions = positionAttribute.array as Float32Array;
    const motionScale = reducedMotion ? 0.12 : 1;

    for (let index = 0; index < settings.moteCount; index++) {
      const base = index * 3;

      pointPositions[base] += velocities[base] * delta * 5 * motionScale;
      pointPositions[base + 1] += velocities[base + 1] * delta * 5 * motionScale;
      pointPositions[base + 2] += velocities[base + 2] * delta * 5 * motionScale;

      pointPositions[base] += pointerTarget.current.x * 0.006;
      pointPositions[base + 1] += pointerTarget.current.y * 0.004;

      if (pointPositions[base] > settings.moteSpread[0] * 0.5) {
        pointPositions[base] = -settings.moteSpread[0] * 0.5;
      }
      if (pointPositions[base] < -settings.moteSpread[0] * 0.5) {
        pointPositions[base] = settings.moteSpread[0] * 0.5;
      }
      if (pointPositions[base + 1] > settings.moteSpread[1] * 0.5) {
        pointPositions[base + 1] = -settings.moteSpread[1] * 0.5;
      }
      if (pointPositions[base + 1] < -settings.moteSpread[1] * 0.5) {
        pointPositions[base + 1] = settings.moteSpread[1] * 0.5;
      }
    }

    positionAttribute.needsUpdate = true;
    points.rotation.y = pointerTarget.current.x * 0.05;
    points.rotation.x = -pointerTarget.current.y * 0.03;
  });

  if (!texture) {
    return null;
  }

  return (
    <points ref={pointsRef} geometry={geometry} position={[0, 0, -1.25]}>
      <pointsMaterial
        map={texture}
        alphaTest={0.01}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        opacity={settings.moteOpacity}
        size={0.12}
        sizeAttenuation
        transparent
        vertexColors
      />
    </points>
  );
}

export function DarkMatterField({ variant = "page" }: { variant?: DarkMatterVariant }) {
  const planeRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const pointer = useRef(new THREE.Vector2(0, 0));
  const { viewport } = useThree();
  const reducedMotion = usePrefersReducedMotion();
  const settings = useMemo(() => getVariantSettings(variant), [variant]);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uResolution: { value: new THREE.Vector2(viewport.width, viewport.height) },
      uIntensity: { value: settings.intensity },
      uDrift: { value: settings.drift },
      uVariant: { value: variant === "hero" ? 1 : variant === "framed" ? 2 : variant === "ambient" ? 3 : 0 },
    }),
    [settings.drift, settings.intensity, variant, viewport.height, viewport.width]
  );

  const vertexShader = `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;

    uniform float uDrift;
    uniform float uIntensity;
    uniform float uTime;
    uniform float uVariant;
    uniform vec2 uPointer;
    uniform vec2 uResolution;

    float hash(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    float fbm(vec2 p) {
      float value = 0.0;
      float amplitude = 0.5;
      for (int i = 0; i < 5; i++) {
        value += amplitude * noise(p);
        p *= 2.02;
        amplitude *= 0.5;
      }
      return value;
    }

    void main() {
      vec2 uv = vUv * 2.0 - 1.0;
      float aspect = uResolution.x / max(uResolution.y, 1.0);
      uv.x *= aspect;

      vec2 pointer = vec2(uPointer.x * aspect * 0.85, uPointer.y * 0.8);
      vec2 primaryWell = mix(vec2(0.0, 0.08), vec2(0.0, 0.18), step(0.5, uVariant));
      vec2 secondaryWell = vec2(-0.7 * aspect * 0.25, -0.35);
      vec2 pointerWell = primaryWell + pointer * 0.18;

      vec2 toPrimary = uv - primaryWell;
      vec2 toSecondary = uv - secondaryWell;
      vec2 toPointer = uv - pointerWell;

      float primaryDistance = max(length(toPrimary), 0.12);
      float secondaryDistance = max(length(toSecondary), 0.18);
      float pointerDistance = max(length(toPointer), 0.2);

      vec2 lensWarp = normalize(toPrimary) * (-0.085 / (primaryDistance * primaryDistance + 0.32));
      lensWarp += normalize(toSecondary) * (-0.04 / (secondaryDistance * secondaryDistance + 0.5));
      lensWarp += normalize(toPointer) * (-0.035 / (pointerDistance * pointerDistance + 0.45));

      vec2 flowUv = uv + lensWarp * uIntensity;
      float driftTime = uTime * (0.08 + uDrift * 0.08);

      float contourField = fbm(flowUv * 1.6 + vec2(0.0, driftTime));
      float contourWave = abs(sin((flowUv.y * 8.0 + contourField * 2.5 + driftTime * 0.7) * 3.14159));
      float contour = smoothstep(0.68, 0.14, contourWave);

      float halo = exp(-primaryDistance * 5.8) * (0.55 + contourField * 0.3);
      float secondaryHalo = exp(-secondaryDistance * 4.8) * 0.28;
      float pointerHalo = exp(-pointerDistance * 7.0) * 0.16;

      float dust = smoothstep(0.82, 0.97, fbm(flowUv * 5.0 - vec2(driftTime * 0.7, driftTime * 0.4)));
      dust *= 0.18;

      float frame = 0.0;
      if (uVariant == 2.0) {
        frame = smoothstep(1.55, 0.72, abs(uv.x)) * 0.09;
      }

      float edgeVignette = smoothstep(1.65, 0.45, length(uv));
      float verticalFade = smoothstep(1.05, -0.85, uv.y);

      vec3 lime = vec3(0.518, 0.8, 0.086);
      vec3 limeLight = vec3(0.639, 0.902, 0.208);
      vec3 dusk = vec3(0.1, 0.2, 0.02);

      vec3 color = vec3(0.0);
      color += dusk * (halo * 0.9 + secondaryHalo * 0.55);
      color += limeLight * (contour * 0.16 + halo * 0.26 + frame);
      color += lime * (halo * 0.34 + pointerHalo * 0.4 + dust * 0.45);

      float alpha = (halo * 0.75 + contour * 0.16 + secondaryHalo * 0.42 + pointerHalo * 0.32 + dust * 0.22 + frame);
      alpha *= edgeVignette * verticalFade;
      alpha = clamp(alpha * (0.72 + uIntensity * 0.22), 0.0, 0.72);

      gl_FragColor = vec4(color, alpha);
    }
  `;

  useFrame((state, delta) => {
    const plane = planeRef.current;
    const material = materialRef.current;
    if (!plane || !material) {
      return;
    }

    pointer.current.lerp(state.pointer, reducedMotion ? 0.02 : 0.06);
    material.uniforms.uPointer.value.copy(pointer.current);
    material.uniforms.uTime.value += delta * (reducedMotion ? 0.18 : 1);
    plane.scale.set(viewport.width, viewport.height, 1);
  });

  return (
    <>
      <mesh ref={planeRef} position={[0, 0, -2]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial
          ref={materialRef}
          depthTest={false}
          depthWrite={false}
          fragmentShader={fragmentShader}
          transparent
          uniforms={uniforms}
          vertexShader={vertexShader}
        />
      </mesh>
      <DarkMatterMotes reducedMotion={reducedMotion} variant={variant} />
    </>
  );
}
