import React, { useEffect, useRef, useState } from "react"
import { useLoader } from "@react-three/fiber"
import * as THREE from "three"
import { GLTFLoader } from "three-stdlib"

interface testObjectGLTFProps {
  position: [number, number, number] // Position prop
  scale?: [number, number, number]
  initialRotation?: [number, number, number] // Optional rotation prop
}

const TestObjectGLTF: React.FC<testObjectGLTFProps> = ({
  position,
  scale = [1, 1, 1],
  initialRotation = [0, 0, 0],
}) => {
  const [rotation, setRotation] = useState<THREE.Euler>(
    new THREE.Euler(...initialRotation),
  )

  const groupRef = useRef<THREE.Group | null>(null)

  // Load glTF model
  const gltf = useLoader(GLTFLoader, "/car_test/scene.gltf")

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <primitive object={gltf.scene} rotation={rotation} />
    </group>
  )
}

export default TestObjectGLTF
