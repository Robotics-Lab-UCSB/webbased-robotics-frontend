import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { PLYLoader, STLLoader } from 'three-stdlib';
import Button1 from '../Buttons/button1';

interface boxProp {
  position: [number, number, number]; // Position prop for placement in the scene
  rotation: [number, number, number];
  onClick?: () => void;
}

const Box: React.FC<boxProp> = ({ position, rotation, onClick }) => {
  const dialRef = useRef<THREE.Mesh>(null!); // Using a ref for the needle
  const geometry = useLoader(STLLoader, "../../public/Box.stl");
  const metalTexture = useLoader(THREE.TextureLoader, '/metal.jpg');
  const boxMaterial = new THREE.MeshStandardMaterial({ map: metalTexture, side: THREE.DoubleSide });

  useEffect(() => {
    // Loading the PLY file
    const loader1 = new PLYLoader();
    loader1.load('/BoxNew.ply', (geometry) => {
      geometry.computeVertexNormals();
      if (dialRef.current) {
        dialRef.current.geometry = geometry; // Set the loaded geometry for the needle
      }
    });
  }, []);

  const groupRef = useRef<THREE.Group | null>(null);

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <mesh ref={dialRef} scale={[0.1, 0.1, 0.1]} onClick={onClick} material={boxMaterial} />
    </group>
  );
};

export default Box;
