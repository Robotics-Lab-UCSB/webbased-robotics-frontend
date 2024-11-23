import React from "react";
import { useLoader } from "@react-three/fiber"
import { STLLoader } from "three-stdlib"
import * as THREE from "three"


interface BoxWithHoleProps {
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
}


  
const BoxWithHole: React.FC<BoxWithHoleProps> = ({ position, rotation, scale}) => {
    const geometry = useLoader(STLLoader, "/theboxwithhole.stl");
    const bodyTexture = useLoader(THREE.TextureLoader, "/metal.jpg")

    return (
        <group position={position} rotation={rotation} scale={scale}>
            <mesh geometry={geometry}> 
                <meshStandardMaterial map={bodyTexture} />
            </mesh>
        </group>
    );
};

export default BoxWithHole;