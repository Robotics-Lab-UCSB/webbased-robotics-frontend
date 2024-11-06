import React, { useEffect } from "react";
import { STLLoader } from "three-stdlib";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

interface TriangleButtonProps {
    position: [number, number, number];
    rotation?: [number, number, number]; 
    scale?: [number, number, number]; 
    onClick?: () => void;
}

const TriangleButton: React.FC<TriangleButtonProps> = ({ position, scale = [1, 1, 1], onClick }) => {
    const geometry = useLoader(STLLoader, "/triangle_button.stl");
    const groupRef = useRef<THREE.Group | null>(null);
    const bodyTexture = useLoader(THREE.TextureLoader, "/metal.jpg"); 
    const [currentPosition] = useState<[number, number, number]>(position);
    const [isMovingBack, setIsMovingBack] = useState(false);
    const [isMovingForward, setIsMovingForward] = useState(false);  

    useEffect(() => {
        geometry.center();
    }, [geometry]);

    useFrame(() => {
        if (groupRef.current) {
            if (isMovingBack) {
                const newPosZ = THREE.MathUtils.lerp(groupRef.current.position.z, currentPosition[2] + 0.5, 0.1); 
                groupRef.current.position.set(currentPosition[0], currentPosition[1], newPosZ);

                if (Math.abs(newPosZ - (currentPosition[2] + 0.5)) < 0.01) {
                    setIsMovingBack(false); 
                    setIsMovingForward(true); 
                }
            } else if (isMovingForward) {
                const newPosZ = THREE.MathUtils.lerp(groupRef.current.position.z, currentPosition[2], 0.1);
                groupRef.current.position.set(currentPosition[0], currentPosition[1], newPosZ);

                if (Math.abs(newPosZ - currentPosition[2]) < 0.01) {
                    setIsMovingForward(false);
                }
            }
        }
    });

    const handleClick = () => {
        // Ensure that the button only starts moving if it is not currently moving
        if (!isMovingBack && !isMovingForward) {
            setIsMovingBack(true); // Start moving backward on click
        }
        if (onClick) {
            onClick(); // Trigger any additional onClick functionality passed as a prop
        }
    };

    return (
        <group ref={groupRef} position={position} onClick={handleClick} >
            <mesh geometry={geometry} scale={scale} >
                <meshStandardMaterial map={bodyTexture} />
            </mesh>
        </group>
    );
}

export default TriangleButton;