import React, { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { useLoader } from "@react-three/fiber"
import { PLYLoader } from "three-stdlib"
import KnobOven from "./knob"

interface VVRProps {
  position: [number, number, number] // Position prop
}

const VVR: React.FC<VVRProps> = ({ position }) => {
  const groupRef = useRef<THREE.Group | null>(null)
  const [nobGeoemtry, setNobGeometry] = useState<THREE.BufferGeometry | null>(
    null,
  )
  const [nobPosition, setNobPosition] = useState<[number, number, number]>([
    0, 0, 0,
  ])

  const topTexture = useLoader(THREE.TextureLoader, "/tkm.png")
  const bodyTexture = useLoader(THREE.TextureLoader, "/metal.jpg")
  const dialMaterial = new THREE.MeshStandardMaterial({ map: bodyTexture })

  useEffect(() => {
    const loader = new PLYLoader()
    loader.load("/labknob_base.ply", (geometry) => {
      geometry.computeVertexNormals()
      setNobGeometry(geometry)
    })
  }, [])

  useEffect(() => {
    setNobPosition([position[0] - 7.3, position[1] - 8, position[2] - 0])
  }, [position])

  return (
    <group ref={groupRef} position={position}>
      {/* Circle Mesh 1 */}
      <mesh position={[2.5, 3.6, 0]} rotation={[-Math.PI / 2, 0, 2.0]}>
        <circleGeometry args={[4, 64]} />
        <meshBasicMaterial map={topTexture} />
      </mesh>

      {/* Circle Mesh 2 */}
      <mesh position={[2.52, 3.61, 0.1]} rotation={[-Math.PI / 2, 0, 2.0]}>
        <circleGeometry args={[2.57, 64]} />
        <meshBasicMaterial map={bodyTexture} />
      </mesh>

      {/* Add Needle Mesh when loaded */}
      {nobGeoemtry && (
        <mesh
          geometry={nobGeoemtry}
          material={dialMaterial}
          position={[2.5, 0, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[4, 4, 4]}
          userData={{ type: "voltage_regulator" }}
        />
      )}

      {/* Knob Component */}
      <KnobOven type="VVRKnob" position={nobPosition} />
    </group>
  )
}

export default VVR
