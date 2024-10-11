import React, { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { PLYLoader } from 'three-stdlib';

interface RadioDialProps {
  wiperAngle: () => number; 
  position: [number, number, number]; // Position prop
}

const RadioDial: React.FC<RadioDialProps> = ({ wiperAngle, position }) => {
  const { scene } = useThree();
  const groupRef = useRef<THREE.Group | null>(null);
  const needleRef = useRef<THREE.Object3D | null>(null);

  useEffect(() => {
    const dialMaterial = new THREE.MeshStandardMaterial({ color: 0xff3333 }); // Red color for dial
    const dotMaterial = new THREE.MeshStandardMaterial({ color: 0xff3333 }); // Red color for dot

    const group = new THREE.Group();

    if (!needleRef.current) {
      const loader = new PLYLoader();
      loader.load('/stanfordOne.ply', (geometry) => {
        geometry.computeVertexNormals();
        const needle = new THREE.Mesh(geometry, dialMaterial);
 // Rotate the needle 45 degrees around the Y axis
        needle.scale.set(0.3, 0.3, 0.3); 
        needle.position.set(0, 0, -1.08);
        needleRef.current = needle;
        group.add(needle);
      });
    } else {
      group.add(needleRef.current);
    }

    const dotGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const dot = new THREE.Mesh(dotGeometry, dotMaterial);

    group.add(dot);

    dot.position.set(0, 0, -0.9); // Center dot slightly above the dial

    group.position.set(...position); // Use spread operator to set position

    scene.add(group);
    groupRef.current = group;

    return () => {
      if (groupRef.current) {
        scene.remove(groupRef.current);
      }
    };
  }, [scene, position]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (groupRef.current) {
        groupRef.current.rotation.z = wiperAngle();
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [wiperAngle]);

  return null;
};

export default RadioDial;
