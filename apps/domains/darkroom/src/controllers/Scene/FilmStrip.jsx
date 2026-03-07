import React, { useMemo } from 'react';
import * as THREE from 'three';

// FilmStrip component that creates a single square of 35mm film
// Can be tiled to create a film reel with controllable warping
const FilmStrip = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  numSquares = 1, // Number of film squares to tile
  warpAmount = 0, // Amount of warping to apply (0 = flat, 1 = max warp)
  filmColor = '#3e2723', // Color of the film strip
}) => {
  // Constants for film strip dimensions (in mm, converted to scene units)
  const SCALE = 0.1;
  const FILM_WIDTH = SCALE * 35;
  const FILM_HEIGHT = SCALE * 35; // Making it square as per requirements
  const PERF_WIDTH = SCALE * 1.85; // Width of perforations
  const PERF_HEIGHT = SCALE * 2.5; // Height of perforations
  const PERF_MARGIN = SCALE * 2.5; // Margin from edge to perforation
  const PERF_SPACING = SCALE * 4.75; // Spacing between perforations

  // Create the film strip geometry
  const { filmGeometry, perforationPositions } = useMemo(() => {
    // Create the base plane for the film strip
    const geometry = new THREE.PlaneGeometry(
      FILM_WIDTH,
      FILM_HEIGHT * numSquares,
      10,
      10 * numSquares
    );

    // Apply warping to the geometry if needed
    if (warpAmount > 0) {
      const positionAttribute = geometry.attributes.position;
      const vertices = positionAttribute.array;

      for (let i = 0; i < vertices.length; i += 3) {
        const x = vertices[i];
        const y = vertices[i + 1];
        const z = vertices[i + 2];

        // Calculate warping based on position and parameter
        // This creates a wave-like effect along the film length
        const warpFactor = Math.sin(y * 0.2) * warpAmount * 2;
        vertices[i + 2] = z + warpFactor;
      }

      positionAttribute.needsUpdate = true;
    }

    // Calculate positions for the perforations
    const perfs = [];
    const perfsPerSide = Math.floor(FILM_HEIGHT / PERF_SPACING);

    for (let square = 0; square < numSquares; square++) {
      const yOffset = square * FILM_HEIGHT;

      for (let i = 0; i < perfsPerSide; i++) {
        // Left side perforations
        perfs.push({
          position: [
            -FILM_WIDTH / 2 + PERF_MARGIN + PERF_WIDTH / 2,
            -FILM_HEIGHT / 2 + PERF_SPACING / 2 + i * PERF_SPACING + yOffset,
            0.1,
          ],
          size: [PERF_WIDTH, PERF_HEIGHT],
        });

        // Right side perforations
        perfs.push({
          position: [
            FILM_WIDTH / 2 - PERF_MARGIN - PERF_WIDTH / 2,
            -FILM_HEIGHT / 2 + PERF_SPACING / 2 + i * PERF_SPACING + yOffset,
            0.1,
          ],
          size: [PERF_WIDTH, PERF_HEIGHT],
        });
      }
    }

    return { filmGeometry: geometry, perforationPositions: perfs };
  }, [FILM_WIDTH, FILM_HEIGHT, numSquares, warpAmount]);

  return (
    <group position={position} rotation={rotation}>
      {/* Main film strip */}
      <mesh geometry={filmGeometry}>
        <meshStandardMaterial
          color={filmColor}
          side={THREE.DoubleSide}
          roughness={0.5}
          metalness={0.2}
        />
      </mesh>

      {/* Perforations */}
      {perforationPositions.map((perf, index) => (
        <mesh key={index} position={perf.position}>
          <planeGeometry args={[perf.size[0], perf.size[1]]} />
          <meshBasicMaterial
            color="white"
            transparent
            opacity={1}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
};

// FilmReel component that creates a complete film reel
export const FilmReel = ({
  numSquares = 10,
  warpAmount = 0.2,
  rotation = [0, 0, 0],
  position = [0, 0, 0],
}) => {
  return (
    <group position={position} rotation={rotation}>
      <FilmStrip numSquares={numSquares} warpAmount={warpAmount} />
    </group>
  );
};

export default FilmStrip;
