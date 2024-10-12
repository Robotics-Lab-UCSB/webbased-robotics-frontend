import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { PLYLoader } from 'three-stdlib';

interface KnobOvenProps {
  position: [number, number, number]; // Position prop
}

const KnobOven: React.FC<KnobOvenProps> = ({ position }) => {
  const [needleGeometry, setNeedleGeometry] = useState<THREE.BufferGeometry | null>(null); 
  const metalTexture = useLoader(THREE.TextureLoader, '/leather.jpg');
  const dialMaterial = new THREE.MeshStandardMaterial({ map: metalTexture });

  // Load the .ply file asynchronously using useEffect
  useEffect(() => {
    const loader = new PLYLoader();
    loader.load('/labknob3.ply', (geometry) => {
      geometry.computeVertexNormals();
      setNeedleGeometry(geometry); // Set loaded geometry to state
    });
  }, []);

  return (
    <group position={position}>
      {needleGeometry && (
        <mesh geometry={needleGeometry} material={dialMaterial} scale={[4.2, 4.2, 4.2]} rotation={[-Math.PI / 2, 0, 0]} />
      )}
    </group>
  );
};

export default KnobOven;