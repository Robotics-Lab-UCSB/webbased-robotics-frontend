import React, { useRef, useEffect, useState } from "react"
import { useLoader, useFrame } from "@react-three/fiber"
import { GLTFLoader } from "three-stdlib"
import * as THREE from "three"

interface buttonProps {
  position: [number, number, number] // Position prop for placement in the scene
  rotation: [number, number, number]
  scale?: [number, number, number]
  onClick?: () => void
  unique_id: string
}

const Button1: React.FC<buttonProps> = ({
  position,
  rotation = [0, Math.PI, 0],
  unique_id,
  scale = [1, 1, 1],
}) => {
  const groupRef = useRef<THREE.Group | null>(null)
  const [currentPosition] = useState<[number, number, number]>(position)
  const [isMovingForward, setIsMovingForward] = useState(false)
  const [isMovingBack, setIsMovingBack] = useState(false)

  // Load GLB model
  const gltf = useLoader(GLTFLoader, "/circle_button/testwrapFixed.glb")
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
          mesh.userData.handleIntersect = handleClick
        }
      })

      setModel(clonedScene) // Store the cloned model in state
    }
  }, [gltf, unique_id])

  useFrame(() => {
    if (isMovingForward && groupRef.current) {
      // Move downward by 0.5 units on the Y-axis
      const newPosY = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        currentPosition[1] - 0.5, // Target position is below the original
        0.1,
      )
      groupRef.current.position.set(
        currentPosition[0],
        newPosY,
        currentPosition[2],
      )

      // Stop moving forward once it reaches the target position
      if (Math.abs(newPosY - (currentPosition[1] - 0.5)) < 0.01) {
        setIsMovingForward(false)
        setTimeout(() => {
          setIsMovingBack(true) // Trigger moving back after 0.3 seconds
        }, 300)
      }
    }

    if (isMovingBack && groupRef.current) {
      // Move back to the original position
      const newPosY = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        currentPosition[1], // Return to the original position
        0.1,
      )
      groupRef.current.position.set(
        currentPosition[0],
        newPosY,
        currentPosition[2],
      )

      // Stop moving back once it reaches the original position
      if (Math.abs(newPosY - currentPosition[1]) < 0.01) {
        setIsMovingBack(false) // Stop moving
      }
    }
  })

  const handleClick = () => {
    if (!isMovingForward) {
      setIsMovingForward(true) // Start moving forward on click
    }
  }

  if (!model) {
    return null // Render nothing until the model is fully loaded
  }

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Render the cloned GLTF model */}
      <primitive object={model} />
    </group>
  )
}

export default Button1
