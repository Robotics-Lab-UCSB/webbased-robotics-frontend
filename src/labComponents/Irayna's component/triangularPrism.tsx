
import React, { useRef, useEffect } from 'react';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import * as THREE from 'three';

interface TriangularPrism {
    position: [number, number, number]; // Position prop for placement in the scene
}

// need to learn about dialref, and geometry, mesh
const TriangularPrism: React.FC<TriangularPrism> = ({ position }) => {
    const dialRef = useRef<THREE.Mesh>(null!); 
  
    console.log('TriangularPrism component is rendering');

    useEffect(() => {
        console.log('useEffect is running'); 
        const loader1 = new STLLoader();
        loader1.load('/triangle.stl', (geometry) => {
            if (dialRef.current) {
                dialRef.current.geometry = geometry; // Assign the loaded geometry
                dialRef.current.material = new THREE.MeshStandardMaterial({ color: 0x808080 });
                // dialRef allows me to interact with mesh directly
                // mesh is object that represents 3D shape 
                console.log('Geometry loaded', geometry); // Log the loaded geometry
            }
        });
    }, []);
    
    return (
        <group position={position}>
            <mesh ref={dialRef} scale={[1, 1, 1]}>
                {/* The geometry will be set in the useEffect */} 
            </mesh>
        </group>
    );
};

export default TriangularPrism;
 
