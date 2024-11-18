import React, { useRef } from "react"
import * as THREE from "three"
import { useLoader } from "@react-three/fiber"
import { STLLoader } from "three-stdlib"
import ParentComponent from "../Buttons/parentButton"
import { TextureLoader } from "three"

interface BoxProp {
  position: [number, number, number]
  rotation: [number, number, number]
  onClick?: () => void
}

const Box: React.FC<BoxProp> = ({ position, rotation, onClick }) => {
  const dialRef = useRef<THREE.Mesh>(null!)
  const groupRef = useRef<THREE.Group | null>(null)

  // Load the STL geometry and texture
  const geometry = useLoader(STLLoader, "Box.stl")
  const texture = useLoader(TextureLoader, "/wood_texture.jpg")

  // Ensure the texture maps directly without any alterations
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(1, 1)

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <mesh
        ref={dialRef}
        scale={[0.1, 0.1, 0.1]}
        onClick={onClick}
        geometry={geometry}
      >
        {/* Standard material with texture map */}
        <meshStandardMaterial map={texture} />
      </mesh>
      {/* Additional components, if any */}
      <ParentComponent />
    </group>
  )
}

export default Box
