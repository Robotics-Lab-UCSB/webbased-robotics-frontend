import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { PLYLoader, STLLoader } from 'three-stdlib';
import Button1 from '../Buttons/button1';
import ParentComponent from '../Buttons/parentButton';

interface boxProp {
  position: [number, number, number]; // Position prop for placement in the scene
  rotation: [number, number, number];
  onClick?: () => void;
}

const Box: React.FC<boxProp> = ({ position, rotation, onClick }) => {
  const dialRef = useRef<THREE.Mesh>(null!); // Using a ref for the needle
  const geometry = useLoader(STLLoader, "Box.stl");
  const groupRef = useRef<THREE.Group | null>(null);

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <ParentComponent></ParentComponent>
      <mesh ref={dialRef} scale={[0.1, 0.1, 0.1]} onClick={onClick} geometry={geometry}>
        <meshStandardMaterial />
      </mesh>
    </group>
  );
};

export default Box;
