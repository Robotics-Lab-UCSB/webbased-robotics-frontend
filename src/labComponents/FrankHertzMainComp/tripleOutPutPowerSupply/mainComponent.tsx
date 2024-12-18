import React, { useRef } from "react"
import * as THREE from "three"
import { useLoader } from "@react-three/fiber"
import { useState, useEffect } from "react"
import { GLTFLoader } from "three-stdlib"
import LightSwitch from "../../../clickables/VVR_switch/switchAndCasing"

interface TripleOutputProps {
  position: [number, number, number] // Position prop
  unique_id?: string
  scale?: [number, number, number]
}

const TripleOutput: React.FC<TripleOutputProps> = ({
  position,
  unique_id = "triple_output_supply",
  scale = [1, 1, 1],
}) => {
  const gltf = useLoader(GLTFLoader, "/triple_output_power_supply/tops8.glb")
  const [model, setModel] = useState<THREE.Object3D | null>(null)

  useEffect(() => {
    if (gltf.scene) {
      const clonedScene = gltf.scene.clone()

      clonedScene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh
          mesh.userData.unique_id = unique_id
          mesh.userData.type = "triple_output_power_supply"
        }
      })

      setModel(clonedScene)
    }
  }, [gltf, unique_id])

  const groupRef = useRef<THREE.Group | null>(null)

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {model && <primitive object={model} scale={[1.25, 1.25, 1.25]} />}{" "}
      <LightSwitch position={[20, 17, 0.6]} unique_id = "triple_output_switch1" />
      <LightSwitch position={[-22, 17, 0.6]} unique_id = "triple_output_switch1" />
    </group>
  )
}

export default TripleOutput
