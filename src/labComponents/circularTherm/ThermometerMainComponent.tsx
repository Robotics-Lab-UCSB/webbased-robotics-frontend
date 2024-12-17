import React, { useRef, useState, useEffect } from "react"
import * as THREE from "three"
import { useFrame, useLoader } from "@react-three/fiber"
import RadioDial from "./radioDial"
import { GLTFLoader } from "three-stdlib"

interface CircularThermProps {
  position: [number, number, number]
  unique_id?: string
  scale?: [number, number, number]
}

const CircularTherm: React.FC<CircularThermProps> = ({
  position,
  unique_id = "circular_therm",
  scale = [1, 1, 1],
}) => {
  const [radioDialPosition, setRadioDialPosition] = useState<
    [number, number, number]
  >([position[0], position[1] - 8, position[2] - 1.2])

  const gltf = useLoader(GLTFLoader, "/thermometer/thermometer3.glb")
  const [model, setModel] = useState<THREE.Object3D | null>(null)
  const groupRef = useRef<THREE.Group | null>(null)

  const fetchPosition = async () => {
    try {
      // Mock API call logic (replace with real API)
      const data = { x: position[0], y: position[1] - 8, z: position[2] - 1.2 }
      setRadioDialPosition([data.x, data.y, data.z])
    } catch (error) {
      console.error(`Error fetching position for ${unique_id}:`, error)
    }
  }

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

  useFrame(() => {
    // fetchPosition();
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {model && <primitive object={model} scale={[5, 4, 5]} />}
      <RadioDial
        wiperAngle={radioDialPosition[2]}
        position={radioDialPosition}
      />
    </group>
  )
}

export default CircularTherm
