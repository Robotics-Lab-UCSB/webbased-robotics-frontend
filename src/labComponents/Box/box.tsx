import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { PLYLoader } from 'three-stdlib';
import Button1 from '../Buttons/button1';

// Component class definition
class Component {
  id: string;
  position: [number, number, number];
  rotation: [number, number, number];

  constructor(id: string, position: [number, number, number], rotation: [number, number, number]) {
    this.id = id;
    this.position = position;
    this.rotation = rotation;
  }
}

interface boxProp {
  position: [number, number, number]; // Position prop for placement in the scene
  rotation: [number, number, number];
  onClick?: () => void;
}

const Box: React.FC<boxProp> = ({ position, rotation, onClick }) => {
  const [buttons, setButtons] = useState<Component[]>([]);
  const dialRef = useRef<THREE.Mesh>(null!); // Using a ref for the needle
  const metalTexture = useLoader(THREE.TextureLoader, '/leather.jpg');
  const boxMaterial = new THREE.MeshStandardMaterial({ map: metalTexture, side: THREE.DoubleSide });

  useEffect(() => {
    // Initializing buttons
    const componentsArray = [
      new Component('button1', [1, 2, 3], [0, 0, 0]),
      new Component('button2', [2, 3, 4], [0, 0, 0]),
      new Component('button3', [3, 4, 5], [0, 0, 0]),
    ];
    setButtons(componentsArray);

    // Loading the PLY file
    const loader1 = new PLYLoader();
    loader1.load('/Box.ply', (geometry) => {
      geometry.computeVertexNormals();
      if (dialRef.current) {
        dialRef.current.geometry = geometry; // Set the loaded geometry for the needle
      }
    });
  }, []);

  const groupRef = useRef<THREE.Group | null>(null);

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {buttons.map((button) => (
        <Button1
          position={button.position}
          rotation={button.rotation}        />
      ))}

      <mesh ref={dialRef} scale={[0.1, 0.1, 0.1]} onClick={onClick} material={boxMaterial} />
    </group>
  );
};

export default Box;
