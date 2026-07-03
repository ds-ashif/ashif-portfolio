"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function GlobeMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.LineSegments>(null);
  const ringsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y += 0.003;
      wireRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z += 0.005;
      ringsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  const orbitParticles = useMemo(() => {
    const count = 60;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 1.8 + Math.random() * 0.3;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.2;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return positions;
  }, []);

  return (
    <group>
      {/* Core sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshPhongMaterial
          color="#0a0a1a"
          emissive="#1a0a3a"
          specular="#8b5cf6"
          shininess={100}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Wireframe overlay */}
      <lineSegments ref={wireRef}>
        <edgesGeometry args={[new THREE.SphereGeometry(1.21, 16, 16)]} />
        <lineBasicMaterial color="#8b5cf6" transparent opacity={0.3} />
      </lineSegments>

      {/* Glow rings */}
      <group ref={ringsRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.6, 0.02, 8, 64]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.6} />
        </mesh>
        <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[1.8, 0.015, 8, 64]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.4} />
        </mesh>
        <mesh rotation={[Math.PI / 6, Math.PI / 3, 0]}>
          <torusGeometry args={[2.0, 0.01, 8, 64]} />
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.3} />
        </mesh>
      </group>

      {/* Orbit particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[orbitParticles, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.04} color="#67e8f9" transparent opacity={0.8} />
      </points>

      {/* Atmospheric glow */}
      <mesh>
        <sphereGeometry args={[1.35, 32, 32]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.05} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

export default function FloatingGlobe() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 45 }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#8b5cf6" />
      <pointLight position={[-5, -3, -5]} intensity={0.5} color="#3b82f6" />
      <pointLight position={[0, -5, 3]} intensity={0.3} color="#06b6d4" />
      <GlobeMesh />
    </Canvas>
  );
}
