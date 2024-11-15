import React, { useRef, useEffect} from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { PLYLoader } from 'three-stdlib';
import { ThreeEvent } from '@react-three/fiber';

interface SmallKnobProps {
  position: [number, number, number]; // Position prop for placement in the scene
  rotation :[number, number, number];
  onPointerDown?: (event: ThreeEvent<MouseEvent>) => void;
  onPointerMove?: (event: ThreeEvent<MouseEvent>) => void; 
  onPointerUp?: (event: ThreeEvent<MouseEvent>) => void;
  onPointerover?: (event: ThreeEvent<MouseEvent>) => void;
  onPointerOut?: (event: ThreeEvent<MouseEvent>) => void;
  name: string;
  type: string; 
}

const SmallKnob: React.FC<SmallKnobProps> = ({position, rotation, onPointerDown, onPointerMove, onPointerUp, onPointerover, onPointerOut, name, type}) => {
  const dialRef = useRef<THREE.Mesh>(null!); // Using a ref for the needle
  const groupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
      const loader1 = new PLYLoader();
      loader1.load('/smallKnob.ply', (geometry) => {
          geometry.computeVertexNormals();
          if (dialRef.current) {
              dialRef.current.geometry = geometry; // Set the loaded geometry for the needle
              dialRef.current.userData.moveKnob = backendUpdate; // Add the moveKnob function to userData
          }
      });
  }, []);

  const backendUpdate = () => {
      console.log("moveKnob function called"); // Stub for future logic
  };

  return (
      <group ref={groupRef} position={position} rotation={rotation}>
          <mesh
              name={name}
              userData={{ type, backendUpdate }}
              ref={dialRef}
              scale={[0.1, 0.1, 0.1]}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerOver={onPointerover}
              onPointerOut={onPointerOut}
          >
              <meshStandardMaterial color={0x808080} side={THREE.DoubleSide} />
          </mesh>
      </group>
  );
};

export default SmallKnob;
