import React from "react"
import { useLoader } from "@react-three/fiber"
import { TextureLoader } from "three"
import { useEffect, useState } from "react"
import { GLTFLoader } from "three-stdlib"
import * as THREE from "three"

// Grid component with cube
const OakPlank: React.FC = () => {
  const gltf = useLoader(GLTFLoader, "/wood_planks/oak_plank2.glb");
  const [model, setModel] = useState<THREE.Object3D | null>(null);

  useEffect(() => {
    if (gltf.scene) {
      // Clone the GLTF scene to avoid conflicts
      const clonedScene = gltf.scene.clone()

      // Add unique ID and interaction behavior to the clone
      clonedScene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh
          mesh.userData.unique_id = "light_oak_wood_plank"
        }
      })

      setModel(clonedScene) // Store the cloned model in state
    }
  }, [gltf])

  return (
    <>
      {model && (
        <primitive object={model} scale={[1.2, 2, 1]} position={[2, 23.7, 0]} />
      )}
    </>
  )
}

export default OakPlank
