import React, { useRef, useEffect, useContext } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { PLYLoader } from "three-stdlib"
import { useFrontFaceContext } from "../../hooks/useFrontFaceContext"

interface RadioDialProps {
  wiperAngle: () => number
  position: [number, number, number] // Position prop
}

const RadioDial: React.FC<RadioDialProps> = ({ wiperAngle, position }) => {
  const { isFrontFaceVisible } = useFrontFaceContext()
  const needleRef = useRef<THREE.Mesh>(null!) // Using a ref for the needle
  const groupRef = useRef<THREE.Group>(null!) // Using a ref for the group

  useEffect(() => {
    const loader = new PLYLoader()
    loader.load("/stanfordOne.ply", (geometry) => {
      geometry.computeVertexNormals()
      if (needleRef.current) {
        needleRef.current.geometry = geometry // Set the loaded geometry for the needle
      }
    })
  }, [])

  useFrame(() => {
    if (groupRef.current) {
      if (isFrontFaceVisible) {
        groupRef.current.rotation.z = wiperAngle() // Rotate the group based on wiperAngle
      }
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Needle */}
      <mesh ref={needleRef} scale={[0.3, 0.3, 0.3]}>
        <meshStandardMaterial color={0xff3333} />
      </mesh>

      {/* Dot */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color={0xff3333} />
      </mesh>
    </group>
  )
}

export default RadioDial
