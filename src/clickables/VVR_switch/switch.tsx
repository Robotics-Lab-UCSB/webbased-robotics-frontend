import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three-stdlib";

interface SwitchProps {
  position: [number, number, number]; // Position prop
  scale?: [number, number, number];
  rotation?: [number, number, number]; // Optional rotation prop
  unique_id: string;
}

const Switch: React.FC<SwitchProps> = ({
  position,
  scale = [1, 1, 1],
  rotation = [0, 0, 0],
  unique_id,
}) => {
  const [isOn, setIsOn] = useState(false); // State for the switch position
  const groupRef = useRef<THREE.Group | null>(null);

  // Load the "on" and "off" models
  const onModelGLTF = useLoader(GLTFLoader, "/switch/switch_button2.glb");
  const offModelGLTF = useLoader(GLTFLoader, "/switch/switch_button_off.glb");

  const [onModel, setOnModel] = useState<THREE.Object3D | null>(null);
  const [offModel, setOffModel] = useState<THREE.Object3D | null>(null);

  useEffect(() => {
    const handleClick = () => {
      setIsOn((prevState) => !prevState);
    };

    // Add interaction handlers to the models
    const applyUserData = (model: THREE.Object3D, type_switch: string) => {
      const clonedScene = model.clone();
      clonedScene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.userData.unique_id = unique_id;
          mesh.userData.handleIntersect = handleClick;
          mesh.userData.type = "switch_button";
        }
      });
      if (type_switch == "on") {
        setOnModel(clonedScene);
      } else {
        setOffModel(clonedScene);
      }
    };

    if (onModelGLTF.scene) applyUserData(onModelGLTF.scene, "on");
    if (offModelGLTF.scene) applyUserData(offModelGLTF.scene, "off");

  }, [onModelGLTF, offModelGLTF, unique_id]);

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {isOn ? (
        onModel && <primitive object={onModel} position={[-20.8, -14.9, -1]} />
      ) : (
        offModel && (
          <primitive
            object={offModel}
            rotation={[0, 0, Math.PI]} 
          />
        )
      )}
    </group>
  );  
};

export default Switch;
