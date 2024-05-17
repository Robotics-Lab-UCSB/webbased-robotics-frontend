// GrayCubeButton.tsx
import React, { useRef, useState } from 'react';
import { useFrame, MeshProps } from '@react-three/fiber';
import { Mesh } from 'three';

// Define the props type
interface GrayCubeButtonProps {
  position: [number, number, number];
  onClickCallback: () => void;
}

const GrayCubeButton: React.FC<GrayCubeButtonProps> = ({ position, onClickCallback }) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHover] = useState(false);
  const [clicked, setClick] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = meshRef.current.rotation.y += 0.01;
    }
  });

  // Handle click and run the callback function
  const handleClick = () => {
    setClick(!clicked);
    onClickCallback();
  };

  return (
    <mesh
      ref={meshRef}
      scale={clicked ? 1.2 : 1}
      onClick={handleClick}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      position={position}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={hovered ? 'lightgrey' : 'grey'} />
    </mesh>
  );
};

export default GrayCubeButton;
