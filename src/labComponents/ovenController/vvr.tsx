import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThree, useLoader } from '@react-three/fiber';
import { PLYLoader } from 'three-stdlib';
import KnobOven from './knob';
import { useState } from 'react';

interface VVRProps {
  position: [number, number, number]; // Position prop
}

const VVR: React.FC<VVRProps> = ({ position }) => {
  const { scene } = useThree();
  const groupRef = useRef<THREE.Group | null>(null);
  const needleRef = useRef<THREE.Object3D | null>(null);
  const topTexture = useLoader(THREE.TextureLoader, '/tkm.png');

  // Load the textures
  const bodyTexture = useLoader(THREE.TextureLoader, '/metal.jpg');
  const dialMaterial = new THREE.MeshStandardMaterial({ map: bodyTexture });

  useEffect(() => {
    const group = new THREE.Group();
    if (!needleRef.current) {
      const loader = new PLYLoader();
      loader.load('/labknob_base.ply', (geometry) => {
        geometry.computeVertexNormals();
        const needle = new THREE.Mesh(geometry, dialMaterial);
        needle.rotation.x = Math.PI / 2; // Rotate the needle upwards
        needle.scale.set(4, 4, 4);
        needle.position.set(2.5, 0, 0);
        needleRef.current = needle;
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
  }, [scene, position, dialMaterial]);

  return (
    <group ref={groupRef} position={position}>
        <mesh
        position={[2.5, 3.6, 0]}
        rotation={[-Math.PI / 2, 0, 2.0]}
        >
            <circleGeometry args={[4, 64]} />
            <meshBasicMaterial map={topTexture} />
        </mesh>
        <mesh position={[2.52, 3.61, 0.1]} rotation={[-Math.PI / 2, 0, 2.0]}>
            <circleGeometry args={[2.57, 64]} />
            <meshBasicMaterial map={bodyTexture} />
        </mesh>
          <KnobOven position={position} />
    </group>
  );
};

export default VVR;
