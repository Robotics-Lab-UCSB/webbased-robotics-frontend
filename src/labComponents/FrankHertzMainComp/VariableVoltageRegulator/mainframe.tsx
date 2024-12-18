import React, { useRef, useEffect, useState } from "react"
import { useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three-stdlib"
import * as THREE from "three"
import OvenKnob from "./knob"

interface VVRProps {
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: [number, number, number]
}

const VVR: React.FC<VVRProps> = ({
  position,
  rotation = [0, 3 * Math.PI / 2, 0],
  scale = [0.6, 0.6, 0.6],
}) => {
  const groupRef = useRef<THREE.Group | null>(null)

  // Load GLTF
  const gltf = useLoader(GLTFLoader, "/vvr/vvr6.glb")
  const [model, setModel] = useState<THREE.Object3D | null>(null)

  useEffect(() => {
    if (gltf.scene) {
      const clonedScene = gltf.scene.clone()

      clonedScene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh
          mesh.userData.type = "vvr"
        }
      })

      setModel(clonedScene)
    }
  }, [gltf])

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {model && <primitive object={model} />}
      <OvenKnob rotation={[0, Math.PI / 2.7, 0]} position={[5, 20.5, -7]} unique_id="oven_knob_1" scale={[0.9, 0.9, 0.9]}/>
    </group>
  )
}

export default VVR; 
