import React from "react"
import { useLoader } from "@react-three/fiber"
import { TextureLoader } from "three"
import { useEffect, useState } from "react"
import { GLTFLoader } from "three-stdlib"
import * as THREE from "three";

// Grid component with cube
const Grid: React.FC = () => {
  const gltf = useLoader(GLTFLoader, "/wood_planks/oak_plank2.glb");
  const [model, setModel] = useState<THREE.Object3D | null>(null);

  useEffect(() => {
      if (gltf.scene) {
        // Clone the GLTF scene to avoid conflicts
        const clonedScene = gltf.scene.clone();
  
        // Add unique ID and interaction behavior to the clone
        clonedScene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.userData.unique_id = "wood_plank";
          }
        });
  
        setModel(clonedScene); // Store the cloned model in state
      }
    }, [gltf]);
  

  return (
    <>
      {/* Grid Helper */}
      {/* <gridHelper
        args={[100, 100, 0xffcf9d, 0xffcf9d]}
        rotation={[Math.PI, 0, 0]}
        position={[0, 0, 0]}
      /> */}

      {/* Ground Box */}
      {model && <primitive object={model} scale={[2, 3, 2.5]} position={[0, -3.5, 0]}/>}
    </>
  )
}

export default Grid
