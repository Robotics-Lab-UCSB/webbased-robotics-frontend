import React from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three';

// Grid component with cube
const Grid: React.FC = () => {
  const texture = useLoader(TextureLoader, '/wood_texture.jpg');

  return (
    <>
      {/* Grid Helper */}
      <gridHelper args={[100, 100, 0xFFCF9D, 0xFFCF9D]} rotation={[Math.PI, 0, 0]} position={[0, 0, 0]} />
      
      {/* Ground Box */}
      <mesh position={[0, -6, 0]}>
        <boxGeometry args={[100, 10, 100]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </>
  );
};

export default Grid;