import React, { useRef } from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import RadioDial from './radioDial';

interface CircularThermProps {
  wiperAngle: () => number; // Function to get the angle value from the backend
  position: [number, number, number]; // Position prop
}

const CircularTherm: React.FC<CircularThermProps> = ({ wiperAngle, position }) => {
  const groupRef = useRef<THREE.Group | null>(null);

  // Load the textures
  const topTexture = useLoader(THREE.TextureLoader, '/waybetterdial-modified.png');
  const sideTexture = useLoader(THREE.TextureLoader, '/metal2.jpg');

  return (
    <group ref={groupRef} position={position}>
      {/* Base of the pizza with different textures */}
      <mesh rotation={[Math.PI / 2, 0.85, 0]}>
        <cylinderGeometry args={[2.5, 4.5, 2, 64]} />
        <meshBasicMaterial map={sideTexture} />
      </mesh>
      <mesh position={[-0.1, 0, -1.01]} rotation={[Math.PI, 0, 2.38]}>
        <circleGeometry args={[4.5, 64]} />
        <meshBasicMaterial map={topTexture} />
      </mesh>
      <RadioDial wiperAngle={wiperAngle} position={position} />
    </group>
  );
};

export default CircularTherm;
