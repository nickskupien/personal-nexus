// App.jsx
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  OrbitControls,
  useTexture,
  Html,
  SoftShadows,
  Environment,
} from '@react-three/drei';
import {
  EffectComposer,
  Bloom,
  DepthOfField,
  ChromaticAberration,
  SSAO,
  Vignette,
  Noise,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import gsap from 'gsap';
import FilmStrip from './FilmStrip';

/**
 * SAMPLE IMAGES
 * Replace these with your own images for the hanging prints.
 */
const IMAGES = [
  {
    src: 'https://picsum.photos/id/1015/800/600',
    title: 'Ocean Cliffs',
    description: 'Foggy cliffs at sunrise...',
  },
  {
    src: 'https://picsum.photos/id/1016/800/600',
    title: 'Mountain Trails',
    description: 'Exploring winding mountain paths...',
  },
  {
    src: 'https://picsum.photos/id/1018/800/600',
    title: 'City Lights',
    description: 'Nighttime shots in a bustling metropolis...',
  },
  {
    src: 'https://picsum.photos/id/1020/800/600',
    title: 'Desert Dunes',
    description: 'Golden hour across endless sands...',
  },
  // Add more as needed
];

// A texture for the contact sheet on the table
const CONTACT_SHEET_SRC = 'https://picsum.photos/id/1010/600/400';

const IMAGES_PER_PAGE = 3;

export default function App({ ...passthroughProps }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  // Pagination logic
  const startIndex = currentPage * IMAGES_PER_PAGE;
  const endIndex = startIndex + IMAGES_PER_PAGE;
  const imagesToDisplay = IMAGES.slice(startIndex, endIndex);

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage((p) => p - 1);
  };
  const handleNext = () => {
    if (endIndex < IMAGES.length) setCurrentPage((p) => p + 1);
  };

  return (
    <Canvas
      {...passthroughProps}
      shadows
      // Start the camera a bit further back so we can animate in
      camera={{ position: [0, 4, 15], fov: 35 }}
      dpr={1} // Min 1, max 1.5 (or 1.0 if you want to force standard DPI)
      gl={{ powerPreference: 'high-performance' }} // Force high-performance GPU
    >
      {/* Optional: Soft Shadows can add realism */}
      {/* <SoftShadows
        frustum={3.75}
        size={0.005}
        near={9.5}
        samples={30}
        rings={11}
      /> */}

      <Scene images={imagesToDisplay} onSelectImage={setSelectedImage} />
    </Canvas>
  );
}

/**
 * Core Darkroom Scene
 * - Adds HDR environment, SSR reflections, camera animation, etc.
 */
function Scene({ images, onSelectImage }) {
  const groupRef = useRef();
  const { camera } = useThree();

  // Animate the camera from a further position to the final position
  useEffect(() => {
    gsap.to(camera.position, {
      x: 0,
      y: 1,
      z: 12,
      duration: 3,
      ease: 'power2.inOut',
    });
  }, [camera]);

  // Subtle group sway or rotation
  // useFrame(({ clock }) => {
  //   if (!groupRef.current) return;
  //   groupRef.current.rotation.y = 0.03 * Math.sin(clock.getElapsedTime() * 0.5);
  // });

  return (
    <group ref={groupRef}>
      {/* Environment: use an HDR map for realistic reflections */}
      {/* <Environment
        files="/hdr/studio_small.hdr" // put your HDR in public/hdr/studio_small.hdr
        background={false} // keep background black
        blur={0}
      /> */}

      {/* Lights */}
      {/* Slightly reduced intensities to rely more on environment lighting */}
      <ambientLight intensity={1} color={'#464055'} />
      <directionalLight position={[0, 10, 5]} intensity={0.2} color="#FF8787" />
      <spotLight
        position={[0, 5, 5]}
        intensity={100}
        penumbra={0.5}
        angle={1.5}
        color="#FF0000"
        target-position={[0, 0, 0]}
      />
      <spotLight
        position={[0, 5, 5]}
        intensity={70}
        penumbra={0.8}
        angle={0.9}
        color="#FFBF95"
        castShadow
        target-position={[0, 0, 0]}
      />
      <spotLight
        position={[0, 5, 5]}
        intensity={70}
        penumbra={1}
        angle={0.7}
        color="#FBD0B3"
        castShadow
        target-position={[0, 0, 0]}
      />
      {/* <pointLight position={[5, 2, -5]} color="#FFEBE4" intensity={10} /> */}

      {/* Camera & Controls */}
      <OrbitControls
        maxDistance={15}
        minDistance={10}
        enablePan={false}
        enableZoom={false}
        // enableRotate={false}
        enableDamping
        dampingFactor={0.08}
      />

      {/* Postprocessing */}
      <EffectComposer enableNormalPass>
        {/* SSR for reflections */}
        {/* <SSR
          intensity={0.45}
          exponent={1}
          distance={10}
          fade={10}
          roughnessFade={1}
          thickness={10}
          ior={0.45}
          maxDepthDifference={10}
          blend={0.9}
          correction={1}
          reflection={0.8}
          refraction={0.2}
          depthBlur={0.5}
          depthBlurKernel={1}
          depthBlurStrength={1}
          blur={0}
          // debug={true} // uncomment to debug reflections
        /> */}
        {/* Cinematic Bloom */}
        <Bloom
          intensity={0.3}
          kernelSize={1}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.05}
        />
        {/* Depth of Field */}
        <DepthOfField focusDistance={0.01} focalLength={0.03} bokehScale={8} />
        {/* Subtle Chromatic Aberration */}
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.002, 0.001]}
          opacity={0.3}
        />
        {/* <SSAO
          blendFunction={BlendFunction.MULTIPLY} // blend mode
          samples={30} // amount of samples per pixel (shouldn't be a multiple of the ring count)
          rings={4} // amount of rings in the occlusion sampling pattern
          distanceThreshold={1.0} // global distance threshold at which the occlusion effect starts to fade out. min: 0, max: 1
          distanceFalloff={0.0} // distance falloff. min: 0, max: 1
          rangeThreshold={0.5} // local occlusion range threshold at which the occlusion starts to fade out. min: 0, max: 1
          rangeFalloff={0.1} // occlusion range falloff. min: 0, max: 1
          luminanceInfluence={0.9} // how much the luminance of the scene influences the ambient occlusion
          radius={20} // occlusion sampling radius
          scale={0.5} // scale of the ambient occlusion
          bias={0.5} // occlusion bias
        /> */}
        <Vignette eskil={false} offset={0.1} darkness={0.8} />
        <Noise opacity={0.02} />
      </EffectComposer>

      {/* Floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -3.5, 0]}
        receiveShadow
      >
        <planeGeometry args={[120, 60]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          // roughness={1}
          // metalness={0.3}
          // clearcoat={0.1}
          // clearcoatRoughness={1}
        />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 1, -2]} receiveShadow>
        <planeGeometry args={[60, 15]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          roughness={0.7}
          metalness={0.1}
          reflectivity={0.1}
        />
      </mesh>

      {/* Board */}
      {/* <mesh position={[0, 0.5, -1]} castShadow>
        <boxGeometry args={[10, 5, 0.1]} />
        <meshPhysicalMaterial
          color="#000000"
          roughness={0.7}
          metalness={0.1}
          reflectivity={0.1}
        />
      </mesh> */}

      {/* <FilmStrip
        numSquares={5}
        warpAmount={0}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
      ></FilmStrip> */}

      {/* Dust Particles */}
      <DustParticles count={350} range={15} />
    </group>
  );
}

/**
 * HangingPhoto: Displays a single photo, slightly swinging, with PBR materials.
 */
function HangingPhoto({
  image,
  index,
  total,
  onSelect,
  offsetZ = -4.9,
  offsetY = 1.5,
}) {
  const meshRef = useRef();
  const texture = useTexture(image.src); // from @react-three/drei

  const gap = 3.0;
  const offsetX = (index - (total - 1) / 2) * gap;

  // useFrame(({ clock }) => {
  //   if (!meshRef.current) return;
  //   const t = clock.getElapsedTime();
  //   // Subtle sway
  //   meshRef.current.rotation.z = 0.05 * Math.sin(t + index);
  // });

  return (
    <group position={[offsetX, offsetY, offsetZ]}>
      {/* Clip Bar */}
      <mesh position={[0, 1.0, 0]}>
        <boxGeometry args={[2, 0.1, 0.05]} />
        <meshPhysicalMaterial
          color="#322626"
          roughness={0.6}
          metalness={0.2}
          reflectivity={0.2}
        />
        <Html position={[0, 0, 0.06]} style={htmlClickable}>
          {/* Transparent div to capture clicks */}
          <div
            style={{ width: '110px', height: '20px', cursor: 'pointer' }}
            onClick={() => onSelect(image)}
          />
        </Html>
      </mesh>

      {/* Photo Plane */}
      <mesh
        ref={meshRef}
        position={[0, 0, 0]}
        castShadow
        onClick={() => onSelect(image)}
      >
        <planeGeometry args={[2, 1.4]} />
        <meshPhysicalMaterial
          map={texture}
          reflectivity={0.1}
          roughness={0.9}
        />
      </mesh>
    </group>
  );
}

/**
 * FilmReel: Using meshPhysicalMaterial for subtle reflections.
 */
function FilmReel({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const reelRef = useRef();
  useFrame(() => {
    if (reelRef.current) reelRef.current.rotation.y += 0.0005;
  });

  return (
    <group ref={reelRef} position={position} rotation={rotation}>
      {/* Outer ring */}
      <mesh castShadow>
        <cylinderGeometry args={[0.7, 0.7, 0.2, 32]} />
        <meshPhysicalMaterial
          color="#443232"
          metalness={0.5}
          roughness={0.4}
          reflectivity={0.5}
        />
      </mesh>
      {/* Inner hole */}
      <mesh position={[0, 0, 0.11]}>
        <cylinderGeometry args={[0.3, 0.3, 0.22, 32]} />
        <meshPhysicalMaterial color="#000" roughness={0.8} />
      </mesh>
    </group>
  );
}

/**
 * LightboxTable: A glowing rectangular table for contact sheets, with PBR.
 */
function LightboxTable({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      {/* Table base */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[10, 0.2, 3]} />
        <meshPhysicalMaterial
          color="#453333"
          metalness={0.2}
          roughness={0.6}
          reflectivity={0.2}
        />
      </mesh>

      {/* Glowing top panel */}
      <mesh position={[0, 0.11, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow>
        <planeGeometry args={[2.6, 1.6]} />
        <meshPhysicalMaterial
          color="#ddbbbb"
          emissive="#ffffff"
          emissiveIntensity={0.3}
          roughness={0.9}
        />
      </mesh>

      {/* Table legs */}
      <mesh position={[-4, -1, 0.8]}>
        <cylinderGeometry args={[0.09, 0.09, 2, 16]} />
        <meshPhysicalMaterial color="#442222" roughness={0.7} metalness={0.2} />
      </mesh>
      <mesh position={[4, -1, 0.8]}>
        <cylinderGeometry args={[0.09, 0.09, 2, 16]} />
        <meshPhysicalMaterial color="#442222" roughness={0.7} metalness={0.2} />
      </mesh>
      <mesh position={[-4, -1, -0.8]}>
        <cylinderGeometry args={[0.09, 0.09, 2, 16]} />
        <meshPhysicalMaterial color="#442222" roughness={0.7} metalness={0.2} />
      </mesh>
      <mesh position={[4, -1, -0.8]}>
        <cylinderGeometry args={[0.09, 0.09, 2, 16]} />
        <meshPhysicalMaterial color="#442222" roughness={0.7} metalness={0.2} />
      </mesh>
    </group>
  );
}

/**
 * ContactSheetTexture: A plane with a contact-sheet-like texture
 * on top of the Lightbox table to simulate usage.
 */
function ContactSheetTexture({ position = [0, 0, 0] }) {
  const sheetTexture = useTexture(CONTACT_SHEET_SRC);
  return (
    <mesh position={[position[0], position[1], position[2] + 0.01]} castShadow>
      <planeGeometry args={[2, 1.2]} />
      <meshPhysicalMaterial
        map={sheetTexture}
        roughness={0.9}
        reflectivity={0.1}
      />
    </mesh>
  );
}

/**
 * DustParticles: Adds floating dust for atmosphere.
 */
function DustParticles({ count = 50, range = 5 }) {
  const particlesRef = useRef();

  // Generate random positions once
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * range;
      arr[i * 3 + 1] = (Math.random() - 0.5) * range;
      arr[i * 3 + 2] = (Math.random() - 0.5) * range;
    }
    return arr;
  }, [count, range]);

  useFrame(({ clock }) => {
    if (!particlesRef.current) return;

    const geometry = particlesRef.current.geometry;
    if (!geometry) return;

    const positionAttribute = geometry.attributes.position;
    if (!positionAttribute) return;

    const posArray = positionAttribute.array;
    const time = clock.getElapsedTime();

    // Gentle float upward
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      posArray[idx + 1] += 0.0005 * Math.sin(time + i);
    }

    positionAttribute.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#ffffff"
        transparent
        opacity={0.5}
        depthWrite={false}
      />
    </points>
  );
}
