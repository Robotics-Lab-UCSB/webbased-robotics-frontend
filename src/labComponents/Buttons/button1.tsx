import React, { useRef, useEffect, useState } from "react"
import * as THREE from "three"
import { useLoader, useFrame } from "@react-three/fiber"
import { PLYLoader } from "three-stdlib"

interface buttonProps {
  position: [number, number, number] // Position prop for placement in the scene
  rotation: [number, number, number]
  onClick?: () => void
  unique_id: string
}

const Button1: React.FC<buttonProps> = ({
  position,
  rotation,
  onClick,
  unique_id,
}) => {
  const dialRef = useRef<THREE.Mesh>(null!) // Using a ref for the needle
  const groupRef = useRef<THREE.Group | null>(null)
  const [currentPosition] = useState<[number, number, number]>(position)
  const [isMovingForward, setIsMovingForward] = useState(false)
  const [isMovingBack, setIsMovingBack] = useState(false)

  useEffect(() => {
    const loader1 = new PLYLoader()
    loader1.load("/Button1.ply", (geometry) => {
      geometry.computeVertexNormals()
      if (dialRef.current) {
        dialRef.current.geometry = geometry // Set the loaded geometry for the needle
        dialRef.current.userData.unique_id = unique_id
        dialRef.current.userData.handleIntersect = handleIntersect
      }
    }) 
  }, [])

  const handleIntersect = () => {
    handleClick()
  }

  useFrame(() => {
    if (isMovingForward && groupRef.current) {
      // Move forward by 5 units on the Z-axis
      const newPosZ = THREE.MathUtils.lerp(
        groupRef.current.position.z,
        currentPosition[2] - 0.5,
        0.1,
      )
      groupRef.current.position.set(
        currentPosition[0],
        currentPosition[1],
        newPosZ,
      )

      // Stop moving forward once it reaches the target position
      if (Math.abs(newPosZ - (currentPosition[2] - 0.5)) < 0.01) {
        setIsMovingForward(false)
        setTimeout(() => {
          setIsMovingBack(true) // Trigger moving back after 1 second
        }, 300)
      }
    }

    if (isMovingBack && groupRef.current) {
      // Move back to the original position
      const newPosZ = THREE.MathUtils.lerp(
        groupRef.current.position.z,
        currentPosition[2],
        0.1,
      )
      groupRef.current.position.set(
        currentPosition[0],
        currentPosition[1],
        newPosZ,
      )

      // Stop moving back once it reaches the original position
      if (Math.abs(newPosZ - currentPosition[2]) < 0.01) {
        setIsMovingBack(false) // Stop moving
      }
    }
  })

  const handleClick = () => {
    if (!isMovingForward) {
      setIsMovingForward(true) // Start moving forward on click
    }
  }

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <mesh ref={dialRef} scale={[0.07, 0.07, 0.07]}>
        <meshPhongMaterial
          color={0xff3333}
          shininess={100}
          specular={0xffffff}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

export default Button1
