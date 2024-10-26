import React, { useRef } from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { useState, useEffect } from 'react';
import { PLYLoader } from 'three-stdlib';

interface DVMProps {
  voltage: () => number; // Function to get the angle value from the backend
  position: [number, number, number]; // Position prop
}

const DVM: React.FC<DVMProps> = ({ voltage, position }) => {
  const [dvmGeometry, setDVMGeometry] = useState<THREE.BufferGeometry | null>(null); 

  useEffect(() => {
    const loader = new PLYLoader();
    loader.load('/digital_voltmeter.ply', (geometry) => {
      //geometry.computeVertexNormals();
      setDVMGeometry(geometry); // Set loaded geometry to state
    });
  }, []);

  const groupRef = useRef<THREE.Group | null>(null);

  const dvmTexture = useLoader(THREE.TextureLoader, '/dvm.jpg');
  const dvmMaterial = new THREE.MeshStandardMaterial({ map: dvmTexture });

  return (
    <group ref={groupRef} position={position}>
      {dvmGeometry && <mesh 
          geometry={dvmGeometry} 
          material={dvmMaterial} 
          scale={[1.0, 1.0, 1.0]} 
        />}
    </group>
  );
};

export default DVM;
