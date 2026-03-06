"use client";

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

export function InteractiveCamera() {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    mouseRef.current.x += (state.pointer.x - mouseRef.current.x) * 0.03;
    mouseRef.current.y += (state.pointer.y - mouseRef.current.y) * 0.03;
    
    camera.position.x = mouseRef.current.x * 1.2;
    camera.position.y = mouseRef.current.y * 0.6;
    camera.lookAt(0, 0, 0);
  });

  return null;
}
