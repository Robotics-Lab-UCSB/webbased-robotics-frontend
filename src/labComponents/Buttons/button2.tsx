import React, { useRef, useEffect, useState} from 'react';
import * as THREE from 'three';
import { useLoader, useFrame } from '@react-three/fiber';
import { PLYLoader } from 'three-stdlib';

interface SmallKnobProps {
  position: [number, number, number]; // Position prop for placement in the scene
  rotation :[number, number, number];
  onClick?: () => void;
}



const Button2: React.FC<SmallKnobProps> = ({position, rotation, onClick}) => {
    const dialRef = useRef<THREE.Mesh>(null!); // Using a ref for the needle
    const groupRef = useRef<THREE.Group | null>(null);
    const [currentPosition] = useState<[number, number, number]>(position);
    const [isMovingForward, setIsMovingForward] = useState(false);
    const [isMovingBack, setIsMovingBack] = useState(false);  
    
    
    useEffect(() => {
        const loader1 = new PLYLoader();
        loader1.load('/Button2.ply', (geometry) => {
          geometry.computeVertexNormals();
          if (dialRef.current) {
            dialRef.current.geometry = geometry; // Set the loaded geometry for the needle
          }
        });
      }, []);  

      useFrame(() => {
        if (isMovingForward && groupRef.current) {
          // Move forward by 5 units on the Z-axis
          const newPosZ = THREE.MathUtils.lerp(groupRef.current.position.z, currentPosition[2] - 0.5, 0.1); 
          groupRef.current.position.set(currentPosition[0], currentPosition[1], newPosZ);
    
          // Stop moving forward once it reaches the target position
          if (Math.abs(newPosZ - (currentPosition[2] - 0.5)) < 0.01) {
            setIsMovingForward(false);
            setTimeout(() => {
              setIsMovingBack(true); // Trigger moving back after 1 second
            }, 300);
          }
        }
    
        if (isMovingBack && groupRef.current) {
          // Move back to the original position
          const newPosZ = THREE.MathUtils.lerp(groupRef.current.position.z, currentPosition[2], 0.1); 
          groupRef.current.position.set(currentPosition[0], currentPosition[1], newPosZ);
    
          // Stop moving back once it reaches the original position
          if (Math.abs(newPosZ - currentPosition[2]) < 0.01) {
            setIsMovingBack(false); // Stop moving
          }
        }
      });

      const handleClick = () => {
        if(isMovingBack == false){
            setIsMovingForward(true); // Start moving forward on click
        }
        if (onClick) {
          onClick(); // Trigger any additional onClick functionality passed as a prop
        }
      };


    

    return (
      <group ref={groupRef} position={position} rotation={rotation} onClick={handleClick}>

        <mesh ref={dialRef} scale={[0.1, 0.1, 0.1]}>
                        <meshPhongMaterial
              color={0xff3333} // Bright red color
              shininess={100} // Higher value for shinier surface
              specular={0xffffff} // White specular highlights
              side={THREE.DoubleSide}
    />

        </mesh>
      
    </group>
  );
};

export default Button2;
