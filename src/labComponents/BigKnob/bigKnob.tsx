import React, { useRef, useEffect } from "react"
import { useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three-stdlib"
import * as THREE from "three"

interface BigKnobProps {
  position: [number, number, number]
  rotation: [number, number, number]
  onClick?: () => void
}

const BigKnob: React.FC<BigKnobProps> = ({ position, rotation }) => {
  const groupRef = useRef<THREE.Group | null>(null)

  // Load GLTF
  const gltf = useLoader(GLTFLoader, "/topKnob/nice.glb")

  useEffect(() => {
    // Traverse the GLTF scene to set userData for raycasting
    gltf.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.userData.unique_id = "topKnob" // Add your unique ID here
        mesh.userData.handleIntersect = () => {
        }
      }
    })
  }, [gltf])

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <primitive object={gltf.scene} scale={[0.3, 0.3, 0.3]} />
    </group>
  )
}

export default BigKnob
