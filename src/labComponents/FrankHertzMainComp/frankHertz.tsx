import React, { useRef, useState, useEffect } from "react"
import * as THREE from "three"
import { useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three-stdlib"
import CircularTherm from "../SmallInstruments/circularTherm/ThermometerMainComponent"

interface FrankHertzMainProps {
  position: [number, number, number] // Position prop
  rotation?: [number, number, number] // Optional rotation prop
  unique_id?: string
  scale?: [number, number, number]
}

const FrankHertzMain: React.FC<FrankHertzMainProps> = ({
  position,
  rotation = [0, Math.PI / 2, 0], // Default to 90 degrees around the Y-axis
  unique_id = "frank_hertz_main",
  scale = [1, 1.2, 1],
}) => {
  const gltf = useLoader(GLTFLoader, "/frank_hertz/frank_main3.glb")
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
          mesh.userData.type = "frank_hertz_chasis"
        }
      })

      setModel(clonedScene)
    }
  }, [gltf, unique_id])

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {model && <primitive object={model} scale={[0.65, 0.65, 0.65]} />}
      <CircularTherm position={[2, 53.5, -15]} />
    </group>
  )
}

export default FrankHertzMain
