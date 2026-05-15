import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Diamond() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1.5, 0]} />
        <MeshDistortMaterial
          envMapIntensity={2}
          clearcoat={1}
          clearcoatRoughness={0}
          metalness={0.9}
          roughness={0.1}
          color="#C5A059"
          distort={0.2}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

export function Luxury3DElement() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 opacity-40 mix-blend-screen">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#fff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#C5A059" />
        <Diamond />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
