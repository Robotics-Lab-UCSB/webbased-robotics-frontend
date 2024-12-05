import React from "react"
import { useLoader } from "@react-three/fiber"
import { TextureLoader } from "three"

// Grid component with cube
const Grid: React.FC = () => {
  const texture = useLoader(TextureLoader, "/wood_texture.jpg")

  return (
    <>
      {/* Grid Helper */}
      <gridHelper
        args={[100, 100, 0xffcf9d, 0xffcf9d]}
        rotation={[Math.PI, 0, 0]}
        position={[0, 0, 0]}
      />

      {/* Ground Box */}
      <mesh position={[0, -6, 0]}>
        <boxGeometry args={[100, 10, 100]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </>
  )
}

export default Grid
