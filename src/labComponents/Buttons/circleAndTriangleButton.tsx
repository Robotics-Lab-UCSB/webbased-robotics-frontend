import React, { useRef, useEffect, useState } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three-stdlib";
import * as THREE from "three";

interface ButtonProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  unique_id: string;
  typeGen: string;
}

const Button1: React.FC<ButtonProps> = ({
  position,
  rotation = [0, Math.PI, 0],
  scale = [1, 1, 1],
  unique_id,
  typeGen,
}) => {
  const groupRef = useRef<THREE.Group | null>(null);
  const [isMovingForward, setIsMovingForward] = useState(false);
  const [isMovingBack, setIsMovingBack] = useState(false);
  const [model, setModel] = useState<THREE.Object3D | null>(null);

  // Dynamically load GLB model based on `typeGen`
  const gltf = useLoader(
    GLTFLoader,
    typeGen === "triangleButton"
      ? "/current_instrument_buttons/triangle_button.glb"
      : "/current_instrument_buttons/circle_button5.glb"
  );

  // Clone and configure the GLTF model on load
  useEffect(() => {
    if (gltf?.scene) {
      const clonedScene = gltf.scene.clone();

      // Add unique ID and click behavior
      clonedScene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.userData.unique_id = unique_id;
          mesh.userData.handleIntersect = handleClick;
        }
      });

      setModel(clonedScene);
    }
  }, [gltf, unique_id]);

  // Animation logic
  useFrame(() => {
    if (groupRef.current) {
      const posY = groupRef.current.position.y;

      if (isMovingForward) {
        const targetY = position[1] - 0.5;
        groupRef.current.position.y = THREE.MathUtils.lerp(posY, targetY, 0.1);

        if (Math.abs(posY - targetY) < 0.01) {
          setIsMovingForward(false);
          setTimeout(() => setIsMovingBack(true), 300);
        }
      }

      if (isMovingBack) {
        const targetY = position[1];
        groupRef.current.position.y = THREE.MathUtils.lerp(posY, targetY, 0.1);

        if (Math.abs(posY - targetY) < 0.01) {
          setIsMovingBack(false);
        }
      }
    }
  });

  // Handle click event
  const handleClick = () => {
    if (!isMovingForward && !isMovingBack) {
      setIsMovingForward(true);
    }
  };

  // Render nothing until the model is ready
  if (!model) return null;

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <primitive object={model} />
    </group>
  );
};

export default Button1;
