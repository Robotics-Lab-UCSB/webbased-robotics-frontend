import React, { useRef, useEffect, useState } from "react"
import { useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three-stdlib"
import * as THREE from "three"

interface OvenKnobProps {
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: [number, number, number]
  unique_id: string
}

const OvenKnob: React.FC<OvenKnobProps> = ({
  position,
  rotation = [0, 0, 0],
  unique_id,
  scale = [1, 1, 1],
}) => {
  const groupRef = useRef<THREE.Group | null>(null)

  // Load GLTF
  const gltf = useLoader(GLTFLoader, "/knobs/vvrKnob22.glb")
  const [model, setModel] = useState<THREE.Object3D | null>(null)

  useEffect(() => {
    if (gltf.scene) {
      const clonedScene = gltf.scene.clone()

      clonedScene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          console.log(child)
          const mesh = child as THREE.Mesh
          mesh.userData.unique_id = unique_id
          mesh.userData.type = "VVR_knob"
        }
      })

      setModel(clonedScene)
    }
  }, [gltf, unique_id])

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {model && <primitive object={model} />}
    </group>
  )
}

export default OvenKnob;
