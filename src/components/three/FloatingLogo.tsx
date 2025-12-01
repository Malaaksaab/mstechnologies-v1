import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text3D, Center, Float } from '@react-three/drei';
import * as THREE from 'three';

export const FloatingLogo = () => {
  const meshRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (ringRef.current) {
      ringRef.current.rotation.x = time * 0.5;
      ringRef.current.rotation.y = time * 0.3;
    }
    
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -time * 0.4;
      ring2Ref.current.rotation.z = time * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={meshRef}>
        {/* Outer ring */}
        <mesh ref={ringRef}>
          <torusGeometry args={[2.5, 0.03, 16, 100]} />
          <meshStandardMaterial
            color="#00d4ff"
            emissive="#00d4ff"
            emissiveIntensity={2}
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Inner ring */}
        <mesh ref={ring2Ref}>
          <torusGeometry args={[2, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#00ffd4"
            emissive="#00ffd4"
            emissiveIntensity={2}
            transparent
            opacity={0.6}
          />
        </mesh>

        {/* Center hexagon */}
        <mesh>
          <cylinderGeometry args={[1.2, 1.2, 0.2, 6]} />
          <meshStandardMaterial
            color="#0a1628"
            emissive="#00d4ff"
            emissiveIntensity={0.3}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* MS Text */}
        <Center>
          <Text3D
            font="/fonts/Orbitron_Regular.json"
            size={0.8}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
          >
            MS
            <meshStandardMaterial
              color="#00d4ff"
              emissive="#00d4ff"
              emissiveIntensity={1}
              metalness={0.8}
              roughness={0.2}
            />
          </Text3D>
        </Center>
      </group>
    </Float>
  );
};
