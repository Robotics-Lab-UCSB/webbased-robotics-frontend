import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useLoader, useFrame } from "@react-three/fiber";
import { PLYLoader } from "three-stdlib";

interface ButtonProps {
  position: [number, number, number]; // Position prop for placement in the scene
  rotation: [number, number, number];
  onClick?: () => void;
  unique_id: string;
}

const Button1: React.FC<ButtonProps> = ({
  position,
  rotation,
  onClick,
  unique_id,
}) => {
  const dialRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group | null>(null);
  const buttonMaterial = new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,
  });

  const [movementState, setMovementState] = useState<"idle" | "forward" | "back">("idle");

  useEffect(() => {
    const loader1 = new PLYLoader();
    loader1.load("/Button2.ply", (geometry) => {
      geometry.computeVertexNormals();
      if (dialRef.current) {
        dialRef.current.geometry = geometry;
        dialRef.current.userData.unique_id = unique_id;
        dialRef.current.userData.handleIntersect = handleIntersect;
      }
    });
  }, [unique_id]);

  const handleIntersect = () => {
    handleClick();
  };

  useFrame(() => {
    if (groupRef.current) {
      const targetZ = movementState === "forward" ? position[2] - 0.5 : position[2];
      const newPosZ = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.1);
      groupRef.current.position.set(position[0], position[1], newPosZ);

      if (Math.abs(newPosZ - targetZ) < 0.01) {
        if (movementState === "forward") {
          setMovementState("back");
          setTimeout(() => setMovementState("idle"), 300); // Delay before moving back to idle
        } else if (movementState === "back") {
          setMovementState("idle");
        }
      }
    }
  });

  const handleClick = () => {
    if (movementState === "idle") {
      setMovementState("forward"); // Start moving forward on click
    }
  };

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <mesh ref={dialRef} scale={[0.07, 0.07, 0.07]}>
        <meshPhongMaterial
          color={0xff3333}
          shininess={100}
          specular={0xffffff}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

export default Button1;
