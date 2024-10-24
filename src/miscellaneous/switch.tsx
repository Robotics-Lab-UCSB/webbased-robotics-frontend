import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { STLLoader } from "three-stdlib";

interface SwitchProps {
  position: [number, number, number]; // Position prop
  scale: [number, number, number];
}

const Switch: React.FC<SwitchProps> = ({ position, scale }) => {
  const [rotation, setRotation] = useState([0, 0, 0]);
  const groupRef = useRef<THREE.Group | null>(null);
  const geometry = useLoader(STLLoader, "../../public/switch.stl");
  const bodyTexture = useLoader(THREE.TextureLoader, "/metal.jpg");

  useEffect(() => {
    geometry.center();
  }, [geometry]);

  const handleClick = () => {
    setRotation((prevRotation) => [
      prevRotation[0] === 0 ? Math.PI : 0,
      prevRotation[1],
      prevRotation[2] === 0 ? Math.PI : 0,
    ]);
  };

  return (
    <group ref={groupRef} position={position}>
      <mesh
        geometry={geometry}
        rotation={rotation}
        onClick={handleClick}
        scale={scale}
      >
        <meshStandardMaterial map={bodyTexture} />
      </mesh>
    </group>
  );
};

export default Switch;
