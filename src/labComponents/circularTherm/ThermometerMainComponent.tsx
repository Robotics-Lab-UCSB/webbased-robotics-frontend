import React, { useRef } from "react"
import * as THREE from "three"
import { useLoader } from "@react-three/fiber"
import RadioDial from "./radioDial"
import { useState, useEffect } from "react"

interface CircularThermProps {
  wiperAngle: () => number // Function to get the angle value from the backend
  position: [number, number, number] // Position prop
}

const CircularTherm: React.FC<CircularThermProps> = ({
  wiperAngle,
  position,
}) => {
  const [radioDialPosition, setRadioDialPosition] = useState<
    [number, number, number]
  >([0, 0, 0])

  useEffect(() => {
    setRadioDialPosition([position[0], position[1] - 8, position[2] - 1.2])
  }, [position])

  const groupRef = useRef<THREE.Group | null>(null)

  const topTexture = useLoader(
    THREE.TextureLoader,
    "/waybetterdial-modified.png",
  )
  const sideTexture = useLoader(THREE.TextureLoader, "/metal2.jpg")

  return (
    <group ref={groupRef} position={position}>
      <mesh rotation={[Math.PI / 2, 0.85, 0]}>
        <cylinderGeometry args={[2.5, 4.5, 2, 64]} />
        <meshBasicMaterial map={sideTexture} />
      </mesh>
      <mesh position={[-0.1, 0, -1.01]} rotation={[Math.PI, 0, 2.38]}>
        <circleGeometry args={[4.5, 64]} />
        <meshBasicMaterial map={topTexture} />
      </mesh>
      <RadioDial wiperAngle={wiperAngle} position={radioDialPosition} />
    </group>
  )
}

export default CircularTherm
