import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { PLYLoader } from 'three-stdlib';

interface KnobOvenProps {
  position: [number, number, number]; // Position prop
}

const KnobOven: React.FC<KnobOvenProps> = ({ position }) => {
  const { scene } = useThree();
  const groupRef = useRef<THREE.Group | null>(null);
  const needleRef = useRef<THREE.Object3D | null>(null);
  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    const metalTexture = textureLoader.load('/leather.jpg');
    const dialMaterial = new THREE.MeshStandardMaterial({ map: metalTexture });

    const group = new THREE.Group();

    if (!needleRef.current) {
      const loader = new PLYLoader();
      loader.load('/labknob3.ply', (geometry) => {
        geometry.computeVertexNormals();
        const needle = new THREE.Mesh(geometry, dialMaterial);
        needle.scale.set(4.2, 4.2, 4.2) 
        needleRef.current = needle;
        needleRef.current.rotation.x = - Math.PI / 2;
        needleRef.current.position.set(2.53, -0.5, 0.1); 


        group.add(needle);
      });
    } else {
      group.add(needleRef.current);
    }
  
    
    group.position.set(...position);

    scene.add(group);
    groupRef.current = group;

    return () => {
      if (groupRef.current) {
        scene.remove(groupRef.current);
      }
    };
  }, [scene, position]);

  
  return (
    <group ref={groupRef} position={position} onClick={() => console.log("SDFOij")}>

    </group>
  )
  return null;
};

export default KnobOven;
