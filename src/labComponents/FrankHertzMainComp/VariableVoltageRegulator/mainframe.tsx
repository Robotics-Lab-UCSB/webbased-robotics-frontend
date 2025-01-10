import React, { useRef, useEffect, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { useLoader } from "@react-three/fiber"
import { GLTFLoader, PLYLoader } from 'three-stdlib';
import * as THREE from "three"
import OvenKnob from "./knob"
import { useWebSocket } from "../../../contexts/websocketContext"

interface VVRProps {
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: [number, number, number]
}

const VVR: React.FC<VVRProps> = ({
  position,
  rotation = [0, 3 * Math.PI / 2, 0],
  scale = [0.6, 0.6, 0.6],
}) => {
  const groupRef = useRef<THREE.Group | null>(null)

  // Load GLTF
  const gltf = useLoader(GLTFLoader, "/vvr/vvr6.glb")
  const [model, setModel] = useState<THREE.Object3D | null>(null)
  const { sendMessage, registerHandler } = useWebSocket(); // Use WebSocket context
  const [angle, setAngle] = useState<number>(0);
  const cooldownRef = useRef(0); // Time accumulator for cooldown
  
  useEffect(() => {
    if (gltf.scene) {
      const clonedScene = gltf.scene.clone()

      clonedScene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh
          mesh.userData.type = "vvr"
        }
      })

      setModel(clonedScene)
    }
  }, [gltf])

  // useEffect(() => {
  //   registerHandler("dial_vvr_1_angle", (payload) => {
  //     console.log('received payload', payload)
  //     setAngle(payload.angle);
  //     console.log(payload.id)
  //   });
  // }, []);

  // useFrame((_, delta) => {
    // cooldownRef.current += delta; // Increment by elapsed time since last frame
    // if (cooldownRef.current >= 1) { // 1-second cooldown
      // sendMessage({ type: "dial_vvr_1_angle", payload: { get: true } });
      // cooldownRef.current = 0; // Reset cooldown accumulator
    // }
  // });


  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {model && <primitive object={model} />}
      <OvenKnob rotation={[0, 0, 0]} position={[5, 20.5, -7]} unique_id="oven_knob_1" scale={[0.9, 0.9, 0.9]}/>
    </group>
  )
}

export default VVR; 
