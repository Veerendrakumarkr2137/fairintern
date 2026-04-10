import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.2;
    meshRef.current.rotation.y = time * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.4}>
        <MeshDistortMaterial
          color="#0f172a"
          speed={4}
          distort={0.4}
          radius={1}
        />
      </Sphere>
    </Float>
  );
}

function FloatingOrbs() {
  return (
    <>
      <Float speed={5} rotationIntensity={2} floatIntensity={5}>
        <mesh position={[-4, 2, -2]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={2} />
        </mesh>
      </Float>
      <Float speed={4} rotationIntensity={2} floatIntensity={4}>
        <mesh position={[4, -2, -1]}>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshStandardMaterial color="#2dd4bf" emissive="#2dd4bf" emissiveIntensity={2} />
        </mesh>
      </Float>
    </>
  );
}

export function Hero3D() {
  return (
    <div className="w-full h-[500px] absolute inset-0 -z-10 opacity-40">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6366f1" />
        <AnimatedSphere />
        <FloatingOrbs />
      </Canvas>
    </div>
  );
}
