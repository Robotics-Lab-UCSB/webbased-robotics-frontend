import React, { useRef, useState, useEffect } from "react"
import * as THREE from "three"
import { useLoader } from "@react-three/fiber"
import ParentComponent from "../Buttons/parentButton"
import { GLTFLoader } from "three-stdlib"

interface CurrentInstrumentProps {
  position: [number, number, number]
  rotation?: [number, number, number]
  unique_id?: string
}

const CurrentInstrument: React.FC<CurrentInstrumentProps> = ({
  position,
  rotation,
  unique_id = "current_instrument",
}) => {
  const groupRef = useRef<THREE.Group | null>(null)

  // Load the STL geometry and texture
  const gltf = useLoader(GLTFLoader, "/current_instrument/ci3.glb")
  const [model, setModel] = useState<THREE.Object3D | null>(null)

  useEffect(() => {
    if (gltf.scene) {
      // Clone the GLTF scene to avoid conflicts
      const clonedScene = gltf.scene.clone()

      // Add unique ID and interaction behavior to the clone
      clonedScene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh
          mesh.userData.unique_id = unique_id
          mesh.userData.type = "current_instrument"
          // mesh.userData.handleIntersect = handleClick;
        }
      })

      setModel(clonedScene) // Store the cloned model in state
    }
  }, [gltf, unique_id])

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {model && <primitive object={model} scale={[0.25, 0.25, 0.25]} />}
      <ParentComponent position={position} />
    </group>
  )
}

export default CurrentInstrument
