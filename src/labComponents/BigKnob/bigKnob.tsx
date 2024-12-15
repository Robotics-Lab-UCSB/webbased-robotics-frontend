import React, { useRef, useEffect } from "react"
import { useLoader } from "@react-three/fiber"
import { STLLoader } from "three-stdlib"
import * as THREE from "three"

interface BigKnobProps {
  position: [number, number, number]
  rotation: [number, number, number]
  onClick?: () => void
}

const BigKnob: React.FC<BigKnobProps> = ({ position, rotation }) => {
  const geometry = useLoader(STLLoader, "/bigKnob1.stl")
  const groupRef = useRef<THREE.Group | null>(null)
  const bodyTexture = useLoader(THREE.TextureLoader, "/aquametal.jpg")

  useEffect(() => {
    geometry.center()
  }, [geometry])

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <mesh
        geometry={geometry}
        scale={[0.3, 0.3, 0.3]}
        userData={{ type: "top_knob" }} // Add userData with type
      >
        <meshStandardMaterial map={bodyTexture} />
      </mesh>
    </group>
  )
}

export default BigKnob
