"use client";

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

export function InteractiveCamera() {
  const { camera } = useThree();

  useFrame(() => {
    // Fixed camera — no cursor interaction
    camera.position.x = 0;
    camera.position.y = 0;
    camera.lookAt(0, 0, 0);
  });

  return null;
}
