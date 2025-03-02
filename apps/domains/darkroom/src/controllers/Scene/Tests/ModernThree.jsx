import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  Html,
  Environment,
  useTexture,
} from '@react-three/drei';
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
} from '@react-three/postprocessing';
import { gsap } from 'gsap';
import './modernThree.css';

// Sample images
const IMAGES = [
  'https://picsum.photos/id/1015/800/600',
  'https://picsum.photos/id/1016/800/600',
  'https://picsum.photos/id/1018/800/600',
];

export default function DarkroomWebsite() {
  return (
    <div className="container">
      <Header />
      <Canvas camera={{ position: [0, 2, 8], fov: 45 }} shadows dpr={[1, 1.5]}>
        {/* Lighting */}
        <ambientLight intensity={0.2} />
        <spotLight
          position={[5, 10, 5]}
          intensity={1.5}
          angle={0.3}
          penumbra={1}
          castShadow
        />

        {/* 3D Scene */}
        <Scene />

        {/* Post-processing effects */}
        <EffectComposer>
          <Bloom
            intensity={0.5}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.1}
          />
          <Noise opacity={0.05} />
          <Vignette eskil={false} offset={0.2} darkness={1.2} />
        </EffectComposer>

        {/* Camera Controls */}
        <OrbitControls enableZoom={false} />
      </Canvas>

      <Footer />
    </div>
  );
}

// HEADER - Minimalist Logo & Navigation
function Header() {
  return (
    <header className="header">
      <div className="logo">DARKROOM</div>
      <nav>
        <a href="#">Gallery</a>
        <a href="#">Exhibits</a>
        <a href="#">Contact</a>
      </nav>
    </header>
  );
}

// FOOTER - Call-to-Action
function Footer() {
  return (
    <div className="footer">
      <button className="cta-button">Explore the Archive</button>
    </div>
  );
}

// 3D SCENE - Film Strips Hanging
function Scene() {
  return (
    <group>
      <Environment preset="studio" />
      <HangingPrint position={[-2, 2, -3]} image={IMAGES[0]} />
      <HangingPrint position={[0, 2.2, -3]} image={IMAGES[1]} />
      <HangingPrint position={[2, 2, -3]} image={IMAGES[2]} />
      <Lightbox position={[0, -1, 0]} />
    </group>
  );
}

// HANGING PRINT - Interactive Film Strip
function HangingPrint({ position, image }) {
  const meshRef = useRef();
  const texture = useTexture(image);

  // Subtle sway animation
  useFrame(({ clock }) => {
    meshRef.current.rotation.z = 0.02 * Math.sin(clock.getElapsedTime() * 1.5);
  });

  return (
    <group position={position}>
      <mesh ref={meshRef} castShadow>
        <planeGeometry args={[1.5, 2]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </group>
  );
}

// LIGHTBOX - Subtle glowing table
function Lightbox({ position }) {
  return (
    <mesh position={position} receiveShadow>
      <boxGeometry args={[3, 0.2, 2]} />
      <meshStandardMaterial color="#222" metalness={0.2} roughness={0.8} />
    </mesh>
  );
}
