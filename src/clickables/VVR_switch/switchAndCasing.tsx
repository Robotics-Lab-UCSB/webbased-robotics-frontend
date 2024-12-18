import React, { useRef, useEffect, useState } from "react"
import * as THREE from "three"
import { useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three-stdlib"
import Switch from "./switch"

interface LightSwitchProps {
  position: [number, number, number] // Position prop
  rotation?: [number, number, number] // Optional rotation prop
  unique_id: string
  scale?: [number, number, number]
}

const LightSwitch: React.FC<LightSwitchProps> = ({
  position,
  rotation = [Math.PI, Math.PI, Math.PI / 2], // Default to 90 degrees around the Y-axis
  unique_id,
  scale = [0.2, 0.2, 0.2],
}) => {
  const gltf = useLoader(GLTFLoader, "/switch/switch_casing1.glb")
  const [model, setModel] = useState<THREE.Object3D | null>(null)
  const groupRef = useRef<THREE.Group | null>(null)

  // Clone and prepare the model
  useEffect(() => {
    if (gltf.scene) {
      const clonedScene = gltf.scene.clone()

      clonedScene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh
          mesh.userData.unique_id = unique_id
          mesh.userData.type = "switch_casing"
        }
      })

      setModel(clonedScene)
    }
  }, [gltf, unique_id])

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {model && <primitive object={model}/>}
      <Switch position={[20.85,14.9,1.2]} unique_id={"tops_switch_1"} />
    </group>
  )
}

export default LightSwitch
