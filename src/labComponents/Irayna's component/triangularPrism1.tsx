////how chatGPT wrote it: 
// import React, { useRef, useEffect } from 'react';
// import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
// import * as THREE from 'three';

// interface TriangularPrismProps {
//     position: [number, number, number]; // Position prop for placement in the scene
// }

// const TriangularPrism: React.FC<TriangularPrismProps> = ({ position }) => {
//     const dialRef = useRef<THREE.Mesh>(null!);

//     useEffect(() => {
//         const loader = new STLLoader();
//         loader.load('/Part Studio 5 - triangle (1).stl', (geometry) => {
//             if (dialRef.current) {
//                 dialRef.current.geometry = geometry; // Assign the loaded geometry
//                 dialRef.current.material = new THREE.MeshStandardMaterial({ color: 0x808080 });
//             }
//         });
//     }, []);

//     return (
//         <group position={position}>
//             <mesh ref={dialRef} scale={[0.1, 0.1, 0.1]}>
//                 {/* Geometry will be set in the useEffect */}
//             </mesh>
//         </group>
//     );
// };

// export default TriangularPrism;