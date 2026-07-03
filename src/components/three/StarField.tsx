"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Stars({ count = 3000 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorPalette = [
      new THREE.Color("#ffffff"),
      new THREE.Color("#60a5fa"),
      new THREE.Color("#a78bfa"),
      new THREE.Color("#67e8f9"),
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 200;
      positions[i3 + 1] = (Math.random() - 0.5) * 200;
      positions[i3 + 2] = (Math.random() - 0.5) * 200;

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    return [positions, colors];
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = state.clock.elapsedTime * 0.02;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.3}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

function ShootingStars() {
  const groupRef = useRef<THREE.Group>(null);

  const stars = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      startX: (Math.random() - 0.5) * 100,
      startY: Math.random() * 30 + 10,
      startZ: (Math.random() - 0.5) * 50,
      speed: Math.random() * 2 + 1,
      offset: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      const star = stars[i];
      const t = ((state.clock.elapsedTime * star.speed + star.offset) % (Math.PI * 2));
      const progress = t / (Math.PI * 2);
      child.position.x = star.startX + progress * 60;
      child.position.y = star.startY - progress * 30;
      child.position.z = star.startZ;
      (child as THREE.Mesh).material &&
        ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity !== undefined &&
        (((child as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity =
          Math.sin(t) * 0.8);
    });
  });

  return (
    <group ref={groupRef}>
      {stars.map((star) => (
        <mesh key={star.id} position={[star.startX, star.startY, star.startZ]}>
          <sphereGeometry args={[0.08, 4, 4]} />
          <meshBasicMaterial color="#a78bfa" transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function NebulaParticles() {
  const mesh = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 500;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 40 + 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.3;
      pos[i3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.005;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.5}
        color="#8b5cf6"
        transparent
        opacity={0.15}
        sizeAttenuation
      />
    </points>
  );
}

export default function StarField() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 30], fov: 75 }}
        style={{ background: "transparent" }}
      >
        <Stars count={2500} />
        <ShootingStars />
        <NebulaParticles />
      </Canvas>
    </div>
  );
}
