import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import { ParticleField } from './ParticleField';

const HeroContent = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
      
      {/* Ambient lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      
      {/* Background stars */}
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
      
      {/* Particle field */}
      <ParticleField count={800} color="#00d4ff" />
      <ParticleField count={400} color="#00ffd4" />
      
      {/* Grid floor */}
      <gridHelper args={[40, 40, '#00d4ff', '#00d4ff']} position={[0, -5, 0]} />
    </>
  );
};

export const HeroScene = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas>
        <Suspense fallback={null}>
          <HeroContent />
        </Suspense>
      </Canvas>
    </div>
  );
};
