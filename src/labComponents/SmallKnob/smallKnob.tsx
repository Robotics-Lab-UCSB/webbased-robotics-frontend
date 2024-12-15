<<<<<<< HEAD
import React, { useRef } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { PLYLoader } from "three-stdlib";
=======
import React, { useRef, useEffect } from "react"
import * as THREE from "three"
import { PLYLoader } from "three-stdlib"
import { ThreeEvent } from "@react-three/fiber"
>>>>>>> d0a0f758fed86bf0be948de2b0faeeea4bc348bf

interface SmallKnobProps {
  position: [number, number, number]; // Position prop for placement in the scene
  rotation: [number, number, number];
  name: string;
  type: string;
}

const SmallKnob: React.FC<SmallKnobProps> = ({ position, rotation, name, type }) => {
  const dialRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group | null>(null);

  const geometry = useLoader(PLYLoader, "/smallKnob.ply");
  geometry.computeVertexNormals();

  const backendUpdate = () => {
    console.log("moveKnob function called"); // Stub for future logic
  };

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <mesh
        name={name}
        userData={{ type, backendUpdate }}
        ref={dialRef}
        geometry={geometry} // Assign the loaded geometry
        scale={[0.1, 0.1, 0.1]}
      >
        <meshStandardMaterial color={0x808080} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

export default SmallKnob;
