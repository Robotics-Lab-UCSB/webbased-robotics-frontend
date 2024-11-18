import React, { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { useLoader } from "@react-three/fiber"
import { STLLoader } from "three-stdlib"

interface SwitchProps {
  position: [number, number, number] // Position prop
  scale?: [number, number, number]
}

const Switch: React.FC<SwitchProps> = ({ position, scale = [1, 1, 1] }) => {
  const [rotation, setRotation] = useState(new THREE.Euler(0, 0, 0)) // need to fix this, put this as a prop
  const groupRef = useRef<THREE.Group | null>(null)
  const geometry = useLoader(STLLoader, "/switch.stl")
  const bodyTexture = useLoader(THREE.TextureLoader, "/metal.jpg")

  useEffect(() => {
    geometry.center()
  }, [geometry])

  const handleClick = () => {
    setRotation(
      (prevRotation) =>
        new THREE.Euler(
          prevRotation.x === 0 ? Math.PI : 0,
          prevRotation.y,
          prevRotation.z === 0 ? Math.PI : 0,
        ),
    )
  }

  return (
    <group ref={groupRef} position={position}>
      <mesh
        geometry={geometry}
        rotation={rotation}
        onClick={handleClick}
        scale={scale}
      >
        <meshStandardMaterial map={bodyTexture} />
      </mesh>
    </group>
  )
}

export default Switch
