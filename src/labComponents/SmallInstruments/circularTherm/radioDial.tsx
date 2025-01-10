import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three-stdlib";

interface RadioDialProps {
  position: [number, number, number];
  unique_id: string;
  scale?: [number, number, number];
  rotation?: [number, number, number];
  updateRotation?: (degrees: number) => void; // Optional function for external rotation control
}

const RadioDial: React.FC<RadioDialProps> = ({
  position,
  unique_id,
  scale = [1, 1, 1],
  rotation = [0, 0, 0], // Default rotation
  updateRotation,
}) => {
  const gltf = useLoader(GLTFLoader, "/dials/dial_thermometer5.glb");
  const [model, setModel] = useState<THREE.Object3D | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (gltf.scene) {
      const clonedScene = gltf.scene.clone();

      clonedScene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.userData.unique_id = unique_id;
          mesh.userData.type = "thermometer_dial";
        }
      });

      setModel(clonedScene);
    }
  }, [gltf, unique_id]);

  return (
    <group
      ref={groupRef}
      position={position}
      scale={scale}
      rotation={rotation} // Apply rotation prop directly
    >
      {model && <primitive object={model} />}
    </group>
  );
};

export default RadioDial;
