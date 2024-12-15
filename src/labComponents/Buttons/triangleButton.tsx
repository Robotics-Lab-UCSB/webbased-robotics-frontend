import React, { useEffect, useRef, useState } from "react"
import { STLLoader } from "three-stdlib"
import { useLoader, useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface TriangleButtonProps {
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: [number, number, number]
}

const TriangleButton: React.FC<TriangleButtonProps> = ({
  position,
  rotation = [Math.PI / 2, 0, 0],
  scale = [1, 1, 1],
}) => {
  const geometry = useLoader(STLLoader, "/triangle_button.stl")
  const groupRef = useRef<THREE.Group | null>(null)
  const bodyTexture = useLoader(THREE.TextureLoader, "/metal.jpg")
  const [isMovingBack, setIsMovingBack] = useState(false)
  const [isMovingForward, setIsMovingForward] = useState(false)

  useEffect(() => {
    geometry.center() // Center geometry only once
  }, [geometry])

  useFrame(() => {
    if (groupRef.current) {
      if (isMovingBack) {
        const newPosZ = THREE.MathUtils.lerp(
          groupRef.current.position.z,
          position[2] + 0.5,
          0.1,
        )
        groupRef.current.position.set(position[0], position[1], newPosZ)

        if (Math.abs(newPosZ - (position[2] + 0.5)) < 0.01) {
          setIsMovingBack(false)
          setIsMovingForward(true)
        }
      } else if (isMovingForward) {
        const newPosZ = THREE.MathUtils.lerp(
          groupRef.current.position.z,
          position[2],
          0.1,
        )
        groupRef.current.position.set(position[0], position[1], newPosZ)

        if (Math.abs(newPosZ - position[2]) < 0.01) {
          setIsMovingForward(false)
        }
      }
    }
  })

  const handleClick = () => {
    if (!isMovingBack && !isMovingForward) {
      setIsMovingBack(true) // Start moving backward on click
    }
  }

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onClick={handleClick}
    >
      <mesh geometry={geometry} scale={scale} userData={{ type: "triangle_button" }}>
        <meshStandardMaterial map={bodyTexture} />
      </mesh>
    </group>
  )
}

export default TriangleButton
