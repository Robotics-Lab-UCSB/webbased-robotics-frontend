import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import RadioDial from "./radioDial";
import { GLTFLoader } from "three-stdlib";
import { useWebSocket } from "../../../contexts/websocketContext";

interface CircularThermProps {
  position: [number, number, number];
  unique_id?: string;
  scale?: [number, number, number];
}

const CircularTherm: React.FC<CircularThermProps> = ({
  position,
  unique_id = "circular_therm",
  scale = [1, 1, 1],
}) => {
  const gltf = useLoader(GLTFLoader, "/thermometer/thermometer11.glb");
  const [model, setModel] = useState<THREE.Object3D | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const [angle, setAngle] = useState<number>(0);
  const cooldownRef = useRef(0); // Time accumulator for cooldown

  const { sendMessage, registerHandler } = useWebSocket(); // Use WebSocket context

  useEffect(() => {
    if (gltf.scene) {
      const clonedScene = gltf.scene.clone();

      clonedScene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.userData.unique_id = unique_id;
          mesh.userData.type = "circular_thermometer";
        }
      });

      setModel(clonedScene);
    }
  }, [gltf, unique_id]);

  // Register WebSocket handler for updates
  useEffect(() => {
    registerHandler("circular_thermometer_angle", (payload) => {
      if (payload.id === unique_id) {
        setAngle(payload.angle);
      }
    });
  }, [unique_id]);

  // Request updates in useFrame
  useFrame((_, delta) => {
    cooldownRef.current += delta; // Increment by elapsed time since last frame

    if (cooldownRef.current >= 1) { // 1-second cooldown
      sendMessage({ type: "get_component_angle", payload: { id: unique_id } });
      cooldownRef.current = 0; // Reset cooldown accumulator
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {model && <primitive object={model} scale={[5, 4, 5]} />}
      <RadioDial
        unique_id="frank_hertz_thermometer_1"
        scale={[0.65, 0.3, 0.65]}
        position={[3, 5.64, 0]}
        rotation={[0, angle * (Math.PI / 180), 0]} // Use the angle received from WebSocket
      />
    </group>
  );
};

export default CircularTherm;
