import React, { useRef, useEffect, useState } from 'react';
import { load } from '@loaders.gl/core';
import { PLYLoader } from '@loaders.gl/ply';
import * as THREE from 'three';

interface PLYModelProps {
  path: string;
  scale?: number | THREE.Vector3;
}

const PLYModel: React.FC<PLYModelProps> = ({ path, scale = 0.2 }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);

  useEffect(() => {
    let active = true;

    async function loadPLY() {
      try {
        const data = await load(path, PLYLoader);

        // Type assertion to ensure data structure
        const plyData = data as {
          attributes: {
            POSITION?: { value: number[] };
            COLOR_0?: { value: number[] };
          };
          indices?: { value: number[] };
        };
        
        const geometry = new THREE.BufferGeometry();

        if (plyData.attributes?.POSITION) {
          const vertices = new Float32Array(plyData.attributes.POSITION.value);
          geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        }

        if (plyData.attributes?.COLOR_0) {
          const colors = new Float32Array(plyData.attributes.COLOR_0.value);
          for (let i = 0; i < colors.length; i++) {
            colors[i] /= 255;  // Normalize colors if necessary
          }
          geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        }

        if (plyData.indices?.value) {
          const faces = new Uint32Array(plyData.indices.value);
          geometry.setIndex(new THREE.BufferAttribute(faces, 1));
        }

        geometry.computeVertexNormals();

        if (active) {
          setGeometry(geometry);
        }
      } catch (error) {
        console.error('Failed to load PLY model:', error);
      }
    }

    loadPLY();

    return () => {
      active = false;
      geometry?.dispose();
    };
  }, [path]);

  useEffect(() => {
    if (geometry && meshRef.current) {
      meshRef.current.geometry = geometry;

      if (typeof scale === 'number') {
        meshRef.current.scale.set(scale, scale, scale);
      } else {
        meshRef.current.scale.set(scale.x, scale.y, scale.z);
      }
    }
  }, [geometry, scale]);

  return (
    <mesh ref={meshRef}>
      {geometry && (
        <meshStandardMaterial vertexColors={THREE.VertexColors} /> 
      )}
    </mesh>
  );};

export default PLYModel;
