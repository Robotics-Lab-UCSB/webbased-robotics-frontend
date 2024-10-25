import React, { useRef } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { STLLoader } from "three-stdlib";
import Switch from "./switch";

interface SwitchCasingProps {
  position: [number, number, number]; // Position prop
  scaleMultiplier: number; // scaleMultiplier prop
}

const SwitchCasing: React.FC<SwitchCasingProps> = ({
  position,
  scaleMultiplier,
}) => {
  const groupRef = useRef<THREE.Group | null>(null);

  const geometry = useLoader(STLLoader, "../../public/switch casing (1).stl");

  const metalTexture = useLoader(THREE.TextureLoader, "/leather.jpg");

  // components scale at different rates so set scale based on those
  const defaultScale = [1, 1, 1];
  const casingScale = defaultScale.map((scale) => scale * scaleMultiplier);
  const switchScale = casingScale.map((scale) => scale * (1 / scaleMultiplier));

  return (
    <group ref={groupRef} position={position}>
      <mesh
        geometry={geometry}
        rotation={[Math.PI / 2, 0, 0]}
        scale={casingScale}
      >
        <Switch position={[10.5, -2, 7.5]} scale={switchScale} />
        <meshStandardMaterial map={metalTexture} />
      </mesh>
    </group>
  );
};

export default SwitchCasing;
