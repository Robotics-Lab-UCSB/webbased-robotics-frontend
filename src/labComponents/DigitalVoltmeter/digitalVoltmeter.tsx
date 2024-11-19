import React, { useRef } from "react"
import * as THREE from "three"
import { useLoader } from "@react-three/fiber"
import { useState, useEffect } from "react"
import { PLYLoader } from "three-stdlib"

interface DVMProps {
  voltage?: () => number // Function to get the angle value from the backend
  position: [number, number, number] // Position prop
  scale: number // Scale parameter
  rotationX?: number
  rotationZ?: number
  rotationY?: number
}

const DVM: React.FC<DVMProps> = ({
  voltage,
  position,
  scale,
  rotationX = 0,
  rotationZ = 0,
  rotationY = 0,
}) => {
  const [dvmGeometry, setDVMGeometry] = useState<THREE.BufferGeometry | null>(
    null,
  )

  useEffect(() => {
    const loader = new PLYLoader()
    loader.load("/digital_voltmeter.ply", (geometry) => {
      setDVMGeometry(geometry)
    })
  }, [])

  const groupRef = useRef<THREE.Group | null>(null)

  const dvmTexture = useLoader(THREE.TextureLoader, "/dvm.jpg")
  const dvmMaterial = new THREE.MeshStandardMaterial({ map: dvmTexture })

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={[rotationX, rotationY, rotationZ]}
    >
      {dvmGeometry && (
        <mesh
          geometry={dvmGeometry}
          material={dvmMaterial}
          scale={[scale, scale, scale]}
        />
      )}
    </group>
  )
}

export default DVM
