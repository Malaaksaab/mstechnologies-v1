import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  color?: string;
}

export const ParticleField = ({ count = 500, color = "#00d4ff" }: ParticleFieldProps) => {
  const mesh = useRef<THREE.Points>(null);
  const light = useRef<THREE.PointLight>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      scales[i] = Math.random();
    }

    return { positions, scales };
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (mesh.current) {
      mesh.current.rotation.y = time * 0.05;
      mesh.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    }

    if (light.current) {
      light.current.position.x = Math.sin(time * 0.7) * 3;
      light.current.position.y = Math.cos(time * 0.5) * 4;
      light.current.position.z = Math.cos(time * 0.3) * 3;
    }
  });

  return (
    <group>
      <pointLight ref={light} distance={40} intensity={8} color={color} />
      <points ref={mesh}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={particles.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-scale"
            count={count}
            array={particles.scales}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color={color}
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};
