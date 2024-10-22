import React, { useRef } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { STLLoader } from "three-stdlib";
import Switch from "./switch";

interface SwitchCasingProps {
  position: [number, number, number]; // Position prop
}

const SwitchCasing: React.FC<SwitchCasingProps> = ({ position }) => {
  const groupRef = useRef<THREE.Group | null>(null);

  const geometry = useLoader(STLLoader, "../../public/switch casing (1).stl");

  const metalTexture = useLoader(THREE.TextureLoader, "/leather.jpg");

  return (
    <group ref={groupRef} position={position}>
      <mesh geometry={geometry} rotation={[Math.PI / 2, 0, 0]}>
        <Switch position={[10.5, -2, 7.5]} />
        <meshStandardMaterial map={metalTexture} />
      </mesh>
    </group>
  );
};

export default SwitchCasing;
