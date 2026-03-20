'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

// ─── Shader sources (inlined) ────────────────────────────────

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uState;
uniform float uCurrentShape;
uniform float uShapeProgress;
uniform vec2 uMouse;
uniform float uJellyStrength;

attribute vec3 aRandomPos;
attribute float aRandom;
attribute vec3 aShape0;
attribute vec3 aShape1;
attribute vec3 aShape2;
attribute vec3 aShape3;
attribute vec3 aShape4;
attribute vec3 aShape5;

varying vec3 vColor;
varying float vAlpha;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

vec3 getShape(float idx) {
  float i = floor(idx + 0.001);
  if (i < 0.5) return aShape0;
  if (i < 1.5) return aShape1;
  if (i < 2.5) return aShape2;
  if (i < 3.5) return aShape3;
  if (i < 4.5) return aShape4;
  return aShape5;
}

void main() {
  float state = clamp(uState, 0.0, 1.0);
  
  // Theme Blue color
  vec3 themeBlue = vec3(0.231, 0.510, 0.965);

  // 1) Compute Ambient State (always computed for smooth mixing)
  float noiseVal = snoise(aRandomPos * 0.4 + uTime * 0.15);
  vec3 noiseVec = vec3(
    snoise(aRandomPos * 0.5 + uTime * 0.1),
    snoise(aRandomPos * 0.5 + uTime * 0.1 + 100.0),
    snoise(aRandomPos * 0.5 + uTime * 0.1 + 200.0)
  );
  vec3 ambientPos = aRandomPos + noiseVec * 0.5;

  vec2 toMouseAmb = ambientPos.xy - uMouse * 6.0;
  float distMouseAmb = length(toMouseAmb);
  if (distMouseAmb < 3.0) {
    ambientPos.xy += normalize(toMouseAmb) * (3.0 - distMouseAmb) * 0.2;
  }

  // Density control: Only 30% of particles visible in ambient state
  float isAmbientVisibleStep = step(aRandom, 0.3);

  vec3 ambientColor = vec3(0.4, 0.4, 0.6) * (0.8 + noiseVal * 0.2);
  float ambientAlpha = (0.3 + noiseVal * 0.2) * isAmbientVisibleStep;
  float ambientSize = 4.0;

  // 2) Compute Morph/Shape State
  int currentIdx = int(floor(uCurrentShape));
  int nextIdx = currentIdx + 1;
  if (nextIdx > 5) nextIdx = 5;
  float shapeMorphT = fract(uCurrentShape);

  vec3 currentTarget = getShape(float(currentIdx));
  vec3 nextTarget = getShape(float(nextIdx));
  vec3 shapeTarget = mix(currentTarget, nextTarget, smoothstep(0.0, 1.0, shapeMorphT));

  // Offset shape to left side of viewport, vertically centered with the cards
  shapeTarget.x -= 6.0;
  shapeTarget.y -= 1.3;

  // Jelly mouse interaction for shape
  vec2 mouseWorld = uMouse * 5.0;
  vec2 toMouseShape = shapeTarget.xy - mouseWorld;
  float distShape = length(toMouseShape);
  float influenceRadius = 3.0;

  vec3 displacement = vec3(0.0);
  if (distShape < influenceRadius) {
    float strength = (influenceRadius - distShape) / influenceRadius;
    vec2 pushDir = normalize(toMouseShape);
    displacement.xy = pushDir * strength * uJellyStrength * 1.2;

    float wobbleFreq = 4.0 + strength * 3.0;
    float wobbleAmp = 0.15 * strength;

    displacement.x += sin(uTime * wobbleFreq) * wobbleAmp;
    displacement.y += cos(uTime * wobbleFreq * 0.8) * wobbleAmp;
    displacement.z += sin(uTime * wobbleFreq * 1.2) * wobbleAmp * 0.5;
  }

  vec3 shapePos = shapeTarget + displacement;

  vec3 shapeColor = themeBlue * 1.5; // Glowing Theme Blue
  float shapeAlpha = 0.85;
  float shapeSize = 6.0;

  // 3) Continuous mixing based on uState
  // Since we scaled uState from 0.0 to 0.1 in JS, gatherProgress = uState * 10
  float gatherProgress = clamp(state * 10.0, 0.0, 1.0);
  
  vec3 finalPos = mix(ambientPos, shapePos, gatherProgress);
  vec3 finalColor = mix(ambientColor, shapeColor, gatherProgress);
  float finalAlpha = mix(ambientAlpha, shapeAlpha, gatherProgress);
  float finalSize = mix(ambientSize, shapeSize, gatherProgress);

  vColor = finalColor;
  vAlpha = finalAlpha;

  // Final transform
  vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = finalSize * (10.0 / -mvPosition.z);
}
`;

const fragmentShader = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;

void main() {
  vec2 center = gl_PointCoord - vec2(0.5);
  float dist = length(center);
  if (dist > 0.5) discard;

  float glow = 1.0 - (dist * 2.0);
  glow = pow(glow, 1.3);

  vec3 finalColor = vColor * (1.0 + glow * 0.5);
  float alpha = glow * vAlpha;

  gl_FragColor = vec4(finalColor, alpha);
}
`;

// ─── Shape generators ────────────────────────────────────────

function generateSphere(count: number): Float32Array {
    const arr = new Float32Array(count * 3);
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2;
        const radius = Math.sqrt(1 - y * y) * 2.5;
        const theta = phi * i;
        arr[i * 3] = Math.cos(theta) * radius;
        arr[i * 3 + 1] = y * 2.5;
        arr[i * 3 + 2] = Math.sin(theta) * radius;
    }
    return arr;
}

function generateCube(count: number): Float32Array {
    const arr = new Float32Array(count * 3);
    const ppf = Math.floor(count / 6);
    const size = 3.0;
    const s = size / 2;
    for (let i = 0; i < count; i++) {
        const face = Math.min(Math.floor(i / ppf), 5);
        const u = Math.random();
        const v = Math.random();
        let x: number, y: number, z: number;
        switch (face) {
            case 0: x = s; y = (u - 0.5) * size; z = (v - 0.5) * size; break;
            case 1: x = -s; y = (u - 0.5) * size; z = (v - 0.5) * size; break;
            case 2: x = (u - 0.5) * size; y = s; z = (v - 0.5) * size; break;
            case 3: x = (u - 0.5) * size; y = -s; z = (v - 0.5) * size; break;
            case 4: x = (u - 0.5) * size; y = (v - 0.5) * size; z = s; break;
            default: x = (u - 0.5) * size; y = (v - 0.5) * size; z = -s; break;
        }
        arr[i * 3] = x;
        arr[i * 3 + 1] = y;
        arr[i * 3 + 2] = z;
    }
    return arr;
}

function generateTorusKnot(count: number): Float32Array {
    const arr = new Float32Array(count * 3);
    const p = 2, q = 3;
    const radius = 2.0;
    const tube = 0.6;
    for (let i = 0; i < count; i++) {
        const t = (i / count) * Math.PI * 2 * q;
        const r = Math.cos(q * t) + tube;
        arr[i * 3] = r * Math.cos(p * t) * radius;
        arr[i * 3 + 1] = r * Math.sin(p * t) * radius;
        arr[i * 3 + 2] = -Math.sin(q * t) * radius;
    }
    return arr;
}

function generateCross(count: number): Float32Array {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const axis = i % 3;
        const t = (Math.random() - 0.5) * 4;
        const s = (Math.random() - 0.5) * 0.8;
        if (axis === 0) {
            arr[i * 3] = t; arr[i * 3 + 1] = s; arr[i * 3 + 2] = s;
        } else if (axis === 1) {
            arr[i * 3] = s; arr[i * 3 + 1] = t; arr[i * 3 + 2] = s;
        } else {
            arr[i * 3] = s; arr[i * 3 + 1] = s; arr[i * 3 + 2] = t;
        }
    }
    return arr;
}

function generateNeural(count: number): Float32Array {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 2.0 + Math.random() * 1.0;
        arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
}

function generateHexGrid(count: number): Float32Array {
    const arr = new Float32Array(count * 3);
    const hexR = 2.5;
    const spacing = 0.35;
    const cols = 30;
    for (let i = 0; i < count; i++) {
        const row = Math.floor(i / cols);
        const col = i % cols;
        const x = col * spacing + (row % 2) * spacing * 0.5;
        const z = row * spacing * 0.866;
        const xOff = x - (cols * spacing) / 2;
        const zOff = z - (count / cols * spacing * 0.866) / 2;
        if (Math.sqrt(xOff * xOff + zOff * zOff) > hexR) {
            arr[i * 3] = (Math.random() - 0.5) * 0.1;
            arr[i * 3 + 1] = 0;
            arr[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
        } else {
            arr[i * 3] = xOff;
            arr[i * 3 + 1] = Math.sin(xOff * 2) * Math.cos(zOff * 2) * 0.5;
            arr[i * 3 + 2] = zOff;
        }
    }
    return arr;
}

// ─── Inner R3F component ─────────────────────────────────────

interface JellyMorphFieldProps {
    count: number;
    scrollProgressRef: React.RefObject<number>;
}

function JellyMorphField({ count, scrollProgressRef }: JellyMorphFieldProps) {
    const pointsRef = useRef<THREE.Points>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const { mouse } = useThree();

    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();

        const positions = new Float32Array(count * 3);
        const randomPos = new Float32Array(count * 3);
        const randoms = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            randomPos[i * 3] = (Math.random() - 0.5) * 20;
            randomPos[i * 3 + 1] = (Math.random() - 0.5) * 20;
            randomPos[i * 3 + 2] = (Math.random() - 0.5) * 10;

            randoms[i] = Math.random();

            positions[i * 3] = randomPos[i * 3];
            positions[i * 3 + 1] = randomPos[i * 3 + 1];
            positions[i * 3 + 2] = randomPos[i * 3 + 2];
        }

        const shape0 = generateSphere(count);
        const shape1 = generateCube(count);
        const shape2 = generateTorusKnot(count);
        const shape3 = generateCross(count);
        const shape4 = generateNeural(count);
        const shape5 = generateHexGrid(count);

        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setAttribute('aRandomPos', new THREE.BufferAttribute(randomPos, 3));
        geo.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));
        geo.setAttribute('aShape0', new THREE.BufferAttribute(shape0, 3));
        geo.setAttribute('aShape1', new THREE.BufferAttribute(shape1, 3));
        geo.setAttribute('aShape2', new THREE.BufferAttribute(shape2, 3));
        geo.setAttribute('aShape3', new THREE.BufferAttribute(shape3, 3));
        geo.setAttribute('aShape4', new THREE.BufferAttribute(shape4, 3));
        geo.setAttribute('aShape5', new THREE.BufferAttribute(shape5, 3));

        return geo;
    }, [count]);

    // Animation loop
    useFrame((state) => {
        if (!materialRef.current) return;

        const { clock } = state;
        const mat = materialRef.current;

        mat.uniforms.uTime.value = clock.getElapsedTime();

        // Smooth mouse follow
        const targetX = mouse.x;
        const targetY = mouse.y;
        mat.uniforms.uMouse.value.x += (targetX - mat.uniforms.uMouse.value.x) * 0.05;
        mat.uniforms.uMouse.value.y += (targetY - mat.uniforms.uMouse.value.y) * 0.05;

        // Read scroll progress from shared ref (0 to 1)
        const scroll = scrollProgressRef.current ?? 0;
        const totalCards = 6;
        let targetState = 0;
        let targetShape = 0;

        if (scroll <= 0) {
            targetState = 0;
            targetShape = 0;
        } else if (scroll < 0.1) {
            // Gathering transition at the start
            targetState = (scroll / 0.1) * 0.1; // 0.0 to 0.1
            targetShape = 0;
        } else if (scroll <= 0.9) {
            // Fully formed, smoothly morphing shapes based on progress
            targetState = 0.1;
            // Map 0.1 to 0.9 scrub into 0.0 to 5.0 (totalCards - 1)
            targetShape = ((scroll - 0.1) / 0.8) * (totalCards - 1);
        } else if (scroll < 1.0) {
            // Exiting back to ambient state
            targetState = 0.1 - ((scroll - 0.9) / 0.1) * 0.1; // 0.1 down to 0.0
            targetShape = totalCards - 1;
        } else {
            targetState = 0;
            targetShape = totalCards - 1;
        }

        // Smooth lerp to target values
        mat.uniforms.uState.value += (targetState - mat.uniforms.uState.value) * 0.08;
        mat.uniforms.uCurrentShape.value += (targetShape - mat.uniforms.uCurrentShape.value) * 0.05;
    });

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uState: { value: 0 },
        uCurrentShape: { value: 0 },
        uShapeProgress: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uJellyStrength: { value: 0.8 },
    }), []);

    return (
        <points ref={pointsRef} geometry={geometry}>
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

// ─── Post-processing ─────────────────────────────────────────

function JellyMorphPostProcessing() {
    return (
        <EffectComposer>
            <Bloom
                luminanceThreshold={0.2}
                luminanceSmoothing={0.9}
                intensity={0.8}
                mipmapBlur
            />
        </EffectComposer>
    );
}

// ─── Exported Canvas wrapper ─────────────────────────────────

export interface JellyMorphCanvasProps {
    scrollProgressRef: React.RefObject<number>;
}

export function JellyMorphCanvas({ scrollProgressRef }: JellyMorphCanvasProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(
            typeof navigator !== 'undefined' &&
            (navigator.maxTouchPoints > 0 || window.innerWidth < 768)
        );
    }, []);

    const count = isMobile ? 400 : 800;

    return (
        <Canvas
            camera={{ position: [0, 0, 8], fov: 65 }}
            gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
            dpr={isMobile ? 1 : [1, 1.5]}
            style={{ background: 'transparent', pointerEvents: 'none' }}
        >
            <group scale={1}>
                <JellyMorphField count={count} scrollProgressRef={scrollProgressRef} />
            </group>
            {!isMobile && <JellyMorphPostProcessing />}
        </Canvas>
    );
}
