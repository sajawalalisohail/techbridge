"use client";

import { useEffect, useMemo, useRef } from "react";
import { Html } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useInView, useReducedMotion } from "framer-motion";
import * as THREE from "three";
import StudioEyebrow from "@/components/shared/StudioEyebrow";
import {
  ABOUT_GLOBE_ARCS,
  ABOUT_GLOBE_COAST_DOTS,
  ABOUT_GLOBE_LAND_DOTS,
  ABOUT_GLOBE_NODES,
  type GlobeNode,
} from "@/data/about-globe";
import { gsap } from "@/lib/gsap";
import { STUDIO_TYPE } from "@/lib/type-system";

const GLOBE_RADIUS = 1.6;
const LOOP_SECONDS = 7.4;
const MARKER_RED = "#ff4658";

function seededNoise(seed: number) {
  const value = Math.sin(seed * 141.137) * 43758.5453;
  return value - Math.floor(value);
}

function latLonToVector3(latitude: number, longitude: number, radius: number) {
  const phi = THREE.MathUtils.degToRad(90 - latitude);
  const theta = THREE.MathUtils.degToRad(longitude + 180);

  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function createPointTexture() {
  if (typeof document === "undefined") {
    return null;
  }

  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;

  const context = canvas.getContext("2d");
  if (!context) {
    return null;
  }

  const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.28, "rgba(255,255,255,0.8)");
  gradient.addColorStop(0.55, "rgba(255,255,255,0.18)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");

  context.fillStyle = gradient;
  context.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createDotGeometry(
  dots: readonly [number, number][],
  radius: number,
  colorA: string,
  colorB: string,
  offsetRange: [number, number],
) {
  const start = new THREE.Color(colorA);
  const end = new THREE.Color(colorB);
  const positions = new Float32Array(dots.length * 3);
  const colors = new Float32Array(dots.length * 3);

  dots.forEach(([latitude, longitude], index) => {
    const base = index * 3;
    const radialOffset = offsetRange[0] + seededNoise(index * 8.7) * (offsetRange[1] - offsetRange[0]);
    const position = latLonToVector3(latitude, longitude, radius + radialOffset);
    const color = start.clone().lerp(end, seededNoise(index * 14.3));

    positions[base] = position.x;
    positions[base + 1] = position.y;
    positions[base + 2] = position.z;

    colors[base] = color.r;
    colors[base + 1] = color.g;
    colors[base + 2] = color.b;
  });

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  return geometry;
}

function createFocusQuaternion(target: THREE.Vector3, yTilt = 0) {
  const front = new THREE.Vector3(0.08, 0.1, 1).normalize();
  const base = new THREE.Quaternion().setFromUnitVectors(target.clone().normalize(), front);
  const tilt = new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.12, yTilt, 0));
  return base.multiply(tilt);
}

function MarkerNode({
  node,
  position,
  align,
}: {
  node: GlobeNode;
  position: THREE.Vector3;
  align: "left" | "right";
}) {
  const labelOffset = align === "left" ? [-0.12, 0.06, 0] : [0.12, 0.01, 0];

  return (
    <group position={position.toArray() as [number, number, number]}>
      <mesh position={[0, -0.045, 0]}>
        <cylinderGeometry args={[0.005, 0.005, 0.065, 10]} />
        <meshBasicMaterial color={MARKER_RED} opacity={0.82} transparent toneMapped={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.024, 20, 20]} />
        <meshBasicMaterial color={MARKER_RED} toneMapped={false} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.038, 0.048, 36]} />
        <meshBasicMaterial color="#ff8895" opacity={0.55} transparent toneMapped={false} />
      </mesh>
      <group position={labelOffset as [number, number, number]}>
        <Html transform center occlude style={{ pointerEvents: "none" }} distanceFactor={8.6}>
          <div className={align === "left" ? "min-w-[3.5rem] -translate-x-full text-right" : "min-w-[3.5rem] text-left"}>
            <p className="text-[8px] font-medium tracking-[-0.02em] text-white/72">
              {node.location}
            </p>
          </div>
        </Html>
      </group>
    </group>
  );
}

function TetherGlobeScene({
  prefersReducedMotion,
}: {
  prefersReducedMotion: boolean;
}) {
  const globeGroupRef = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.Mesh>(null);
  const trailRefs = useRef<THREE.Mesh[]>([]);
  const pointTexture = useMemo(() => createPointTexture(), []);
  const transitionQuaternion = useMemo(() => new THREE.Quaternion(), []);

  const nodesById = useMemo(
    () => Object.fromEntries(ABOUT_GLOBE_NODES.map((node) => [node.id, node])) as Record<GlobeNode["id"], GlobeNode>,
    [],
  );

  const landGeometry = useMemo(
    () => createDotGeometry(ABOUT_GLOBE_LAND_DOTS, GLOBE_RADIUS, "#5c8f55", "#a7c27d", [0.004, 0.012]),
    [],
  );

  const coastGeometry = useMemo(
    () => createDotGeometry(ABOUT_GLOBE_COAST_DOTS, GLOBE_RADIUS, "#d8d1a1", "#efe7bf", [0.01, 0.018]),
    [],
  );

  const nodePositions = useMemo(() => {
    const positions = {} as Record<GlobeNode["id"], THREE.Vector3>;

    ABOUT_GLOBE_NODES.forEach((node) => {
      positions[node.id] = latLonToVector3(node.latitude, node.longitude, GLOBE_RADIUS + 0.09);
    });

    return positions;
  }, []);

  const arcCurve = useMemo(() => {
    const connection = ABOUT_GLOBE_ARCS[0];
    const fromNode = nodesById[connection.from];
    const toNode = nodesById[connection.to];
    const start = latLonToVector3(fromNode.latitude, fromNode.longitude, GLOBE_RADIUS + 0.045);
    const end = latLonToVector3(toNode.latitude, toNode.longitude, GLOBE_RADIUS + 0.045);
    const midpoint = start.clone().add(end).normalize().multiplyScalar(connection.height);
    const controlStart = start.clone().lerp(midpoint, 0.62);
    const controlEnd = end.clone().lerp(midpoint, 0.62);

    return new THREE.CubicBezierCurve3(start, controlStart, controlEnd, end);
  }, [nodesById]);

  const arcGeometry = useMemo(
    () => new THREE.TubeGeometry(arcCurve, 160, 0.01, 12, false),
    [arcCurve],
  );

  const startQuaternion = useMemo(
    () => createFocusQuaternion(nodePositions.morgantown, -0.1),
    [nodePositions],
  );
  const endQuaternion = useMemo(
    () => createFocusQuaternion(nodePositions.lahore, 0.1),
    [nodePositions],
  );

  useFrame((state) => {
    if (!globeGroupRef.current || !pulseRef.current) {
      return;
    }

    const cycleLength = prefersReducedMotion ? LOOP_SECONDS * 1.55 : LOOP_SECONDS;
    const cycle = (state.clock.getElapsedTime() % cycleLength) / cycleLength;
    const launchStart = 0.1;
    const launchEnd = 0.74;
    const travel = THREE.MathUtils.clamp((cycle - launchStart) / (launchEnd - launchStart), 0, 1);
    const focus = THREE.MathUtils.smootherstep(cycle, 0.05, 0.86);
    const point = arcCurve.getPointAt(travel);
    const trailVisible = travel > 0.001 && travel < 0.999;

    transitionQuaternion.slerpQuaternions(startQuaternion, endQuaternion, focus);
    globeGroupRef.current.quaternion.copy(transitionQuaternion);

    pulseRef.current.position.copy(point);
    pulseRef.current.visible = trailVisible || prefersReducedMotion;
    pulseRef.current.scale.setScalar(prefersReducedMotion ? 0.9 : 0.92 + Math.sin(state.clock.getElapsedTime() * 12) * 0.18);

    trailRefs.current.forEach((trail, index) => {
      if (!trail) {
        return;
      }

      const trailProgress = THREE.MathUtils.clamp(travel - index * 0.03, 0, 1);
      const trailPoint = arcCurve.getPointAt(trailProgress);
      trail.position.copy(trailPoint);
      trail.visible = trailVisible && trailProgress > 0;
      trail.scale.setScalar(Math.max(0.2, 0.9 - index * 0.11));
    });
  });

  return (
    <>
      <ambientLight intensity={0.72} />
      <directionalLight position={[1.8, 1.1, 2.4]} intensity={0.34} color="#f3f5f8" />
      <directionalLight position={[-1.6, -0.7, -2.1]} intensity={0.12} color="#9fb9d4" />

      <group ref={globeGroupRef} quaternion={startQuaternion}>
        <mesh>
          <sphereGeometry args={[GLOBE_RADIUS, 80, 80]} />
          <meshStandardMaterial
            color="#2d6da0"
            metalness={0.03}
            roughness={0.82}
            emissive="#173753"
            emissiveIntensity={0.1}
          />
        </mesh>

        <points geometry={landGeometry}>
          <pointsMaterial
            map={pointTexture ?? undefined}
            alphaTest={0.02}
            depthWrite={false}
            opacity={0.94}
            size={0.074}
            sizeAttenuation
            transparent
            vertexColors
          />
        </points>

        <points geometry={coastGeometry}>
          <pointsMaterial
            map={pointTexture ?? undefined}
            alphaTest={0.02}
            depthWrite={false}
            opacity={1}
            size={0.09}
            sizeAttenuation
            transparent
            vertexColors
          />
        </points>

        <mesh geometry={arcGeometry}>
          <meshBasicMaterial color="#d8172d" opacity={0.78} toneMapped={false} transparent />
        </mesh>

        <mesh geometry={arcGeometry} scale={[1.0012, 1.0012, 1.0012]}>
          <meshBasicMaterial color="#ff586a" opacity={0.18} toneMapped={false} transparent />
        </mesh>

        <mesh ref={pulseRef}>
          <sphereGeometry args={[0.048, 22, 22]} />
          <meshBasicMaterial color="#ff4f5f" toneMapped={false} />
        </mesh>

        {Array.from({ length: 6 }).map((_, index) => (
          <mesh
            key={`trail-${index}`}
            ref={(node) => {
              if (node) {
                trailRefs.current[index] = node;
              }
            }}
          >
            <sphereGeometry args={[0.033 - index * 0.0032, 16, 16]} />
            <meshBasicMaterial
              color={index === 0 ? "#ff7d89" : "#ff4f5f"}
              opacity={0.34 - index * 0.045}
              toneMapped={false}
              transparent
            />
          </mesh>
        ))}

        <MarkerNode
          node={nodesById.morgantown}
          position={nodePositions.morgantown}
          align="left"
        />
        <MarkerNode
          node={nodesById.lahore}
          position={nodePositions.lahore}
          align="right"
        />
      </group>
    </>
  );
}

export default function AboutTetherGlobe() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-90px" });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView || !sectionRef.current || prefersReducedMotion) {
      return;
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      timeline
        .fromTo(
          globeRef.current,
          { opacity: 0, scale: 0.92, y: 28 },
          { opacity: 1, scale: 1, y: 0, duration: 1.05 },
        )
        .fromTo(
          "[data-tether-copy]",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
          "-=0.82",
        );
    }, sectionRef);

    return () => context.revert();
  }, [isInView, prefersReducedMotion]);

  return (
    <div
      ref={sectionRef}
      className="mt-20 grid gap-10 xl:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] xl:items-center"
    >
      <div className={prefersReducedMotion ? "" : "opacity-0"} data-tether-copy="true">
        <StudioEyebrow className="mb-4">the digital tether</StudioEyebrow>
        <h3 className={`max-w-4xl ${STUDIO_TYPE.section}`}>
          US strategy, visibly tethered to engineering execution.
        </h3>
        <p className={`mt-5 max-w-2xl ${STUDIO_TYPE.lead}`}>
          Architecture decisions originate in Morgantown, move through Hamza&apos;s engineering office
          in Lahore, and stay inside one coordinated delivery rhythm. The globe is intentionally clean:
          one route, two cities, one operating surface.
        </p>

        <div className="mt-8 max-w-xl space-y-4">
          {ABOUT_GLOBE_NODES.map((node, index) => (
            <div
              key={node.id}
              data-tether-copy="true"
              className="flex items-start gap-4 border-b border-white/8 pb-4 last:border-b-0 last:pb-0"
            >
              <span
                className={`mt-2 h-2 w-2 flex-none rounded-full ${index === 0 ? "bg-brand-accent-light" : "bg-red-400"}`}
              />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                  {node.role}
                </p>
                <p className="mt-2 text-lg font-medium tracking-[-0.03em] text-white">
                  {node.location}
                </p>
                <p className="mt-1 text-sm leading-6 text-zinc-400">{node.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        ref={globeRef}
        className={`relative mx-auto h-[25rem] w-full max-w-[40rem] sm:h-[31rem] lg:h-[35rem] ${
          prefersReducedMotion ? "" : "opacity-0"
        }`}
      >
        <Canvas
          camera={{ position: [0, 0, 5.05], fov: 34 }}
          dpr={prefersReducedMotion ? [1, 1.2] : [1, 1.7]}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          style={{ background: "transparent", pointerEvents: "none" }}
        >
          <TetherGlobeScene prefersReducedMotion={Boolean(prefersReducedMotion)} />
        </Canvas>
      </div>
    </div>
  );
}
