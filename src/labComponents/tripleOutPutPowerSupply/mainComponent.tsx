import React, { useRef } from "react"
import * as THREE from "three"
import { useLoader } from "@react-three/fiber"
import { useState, useEffect } from "react"
import { GLTFLoader } from "three-stdlib"

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
  const gltf = useLoader(GLTFLoader, "/triple_output_power_supply/tops4.glb")
  const [model, setModel] = useState<THREE.Object3D | null>(null)

  useEffect(() => {
    if (gltf.scene) {
      const clonedScene = gltf.scene.clone()

      clonedScene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh
          mesh.userData.unique_id = unique_id
        }
      })

      setModel(clonedScene)
    }
  }, [gltf, unique_id])

  const groupRef = useRef<THREE.Group | null>(null)

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {model && <primitive object={model} scale={[1.25, 1.25, 1.25]} />}{" "}
      {/* Conditional rendering */}
    </group>
  )
}

export default TripleOutput
