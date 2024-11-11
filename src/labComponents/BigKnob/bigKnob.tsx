import React, { useRef } from "react";
import { STLLoader } from "three/examples/jsm/Addons.js";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect } from "react";


interface BigKnobProps {
    position: [number, number, number];
    rotation: [number, number, number];
    onClick?: () => void;
}

const BigKnob: React.FC<BigKnobProps> = ({position, rotation}) => {
    const geometry = useLoader(STLLoader, "/bigknob.stl");
    const groupRef = useRef<THREE.Group | null > (null);
    const bodyTexture = useLoader(THREE.TextureLoader, "/metal.jpg"); 

    useEffect(() => {
    geometry.center();
    }, [geometry]);

    return (
        < group ref = {groupRef} position = {position} rotation = {rotation}>
            <mesh geometry={geometry} scale={[0.01, 0.01, 0.01]} >
                <meshStandardMaterial map={bodyTexture} />

            </mesh>
        </group>
    
); 
};

export default BigKnob;