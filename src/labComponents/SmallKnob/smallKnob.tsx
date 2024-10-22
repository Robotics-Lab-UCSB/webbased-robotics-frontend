import React, { useRef, useEffect} from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { PLYLoader } from 'three-stdlib';

interface SmallKnobProps {
  position: [number, number, number]; // Position prop for placement in the scene
  rotation :[number, number, number];
  onClick?: () => void;
}



  const SmallKnob: React.FC<SmallKnobProps> = ({position, rotation, onClick}) => {
  const dialRef = useRef<THREE.Mesh>(null!); // Using a ref for the needle
  
    
    
    useEffect(() => {
        const loader1 = new PLYLoader();
        loader1.load('/smallKnob.ply', (geometry) => {
          geometry.computeVertexNormals();
          if (dialRef.current) {
            dialRef.current.geometry = geometry; // Set the loaded geometry for the needle
          }
        });
      }, []);  
    const groupRef = useRef<THREE.Group | null>(null);

    return (
      <group ref={groupRef} position={position} rotation={rotation}>

        <mesh ref={dialRef} scale={[0.1, 0.1, 0.1]} onClick={onClick}>
            
            <meshStandardMaterial color={0x808080} side={THREE.DoubleSide}/>

        </mesh>
      
    </group>
  );
};

export default SmallKnob;
