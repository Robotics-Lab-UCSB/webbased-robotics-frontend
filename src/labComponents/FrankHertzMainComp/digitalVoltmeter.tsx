import React, { useRef, useState, useEffect } from "react"
import * as THREE from "three"
import { useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three-stdlib"
import CircularTherm from "../SmallInstruments/circularTherm/ThermometerMainComponent"

interface FrankHertzMainProps {
  position: [number, number, number] // Position prop
  rotation?: [number, number, number] // Optional rotation prop
  unique_id: string
  scale?: [number, number, number]
}

const FrankHertzMain: React.FC<FrankHertzMainProps> = ({
  position,
  rotation = [Math.PI / 2, 0, 0], // Default to 90 degrees around the Y-axis
  unique_id,
  scale = [0.5, 0.5, 0.5],
}) => {
  const gltf = useLoader(GLTFLoader, "/dcv/dcv23.glb")
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
          mesh.userData.type = "dcv"
        }
      })

      setModel(clonedScene)
    }
  }, [gltf, unique_id])

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {model && <primitive object={model}/>}
    </group>
  )
}

export default FrankHertzMain
