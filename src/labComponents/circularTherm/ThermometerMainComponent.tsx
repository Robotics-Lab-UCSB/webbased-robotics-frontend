import React, { useRef } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import RadioDial from "./radioDial";
import { useState, useEffect } from "react";
import { GLTFLoader } from "three-stdlib";

interface CircularThermProps {
  wiperAngle: () => number; // Function to get the angle value from the backend
  position: [number, number, number]; // Position prop
  unique_id: string;
  scale?: [number, number, number];
}

const CircularTherm: React.FC<CircularThermProps> = ({
  wiperAngle,
  position,
  unique_id,
  scale = [1, 1, 1], // Default scale
}) => {
  const [radioDialPosition, setRadioDialPosition] = useState<
    [number, number, number]
  >([0, 0, 0]);
  const gltf = useLoader(GLTFLoader, "/thermometer/thermometer_frame1.glb");
  const [model, setModel] = useState<THREE.Object3D | null>(null);

  useEffect(() => {
    if (gltf.scene) {
      const clonedScene = gltf.scene.clone();

      clonedScene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.userData.unique_id = unique_id;
          // mesh.userData.handleIntersect = handleClick;
        }
      });

      setModel(clonedScene); // Store the cloned model in state
    }
  }, [gltf, unique_id]);

  useEffect(() => {
    setRadioDialPosition([position[0], position[1] - 8, position[2] - 1.2]);
  }, [position]);

  const groupRef = useRef<THREE.Group | null>(null);

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {model && <primitive object={model} />} {/* Conditional rendering */}
      <mesh
        position={[-0.1, 0, -1.01]}
        rotation={[Math.PI, 0, 2.38]}
        userData={{ type: "thermometer" }}
      >
      </mesh>
      <RadioDial wiperAngle={wiperAngle} position={radioDialPosition} />
    </group>
  );
};

export default CircularTherm;
