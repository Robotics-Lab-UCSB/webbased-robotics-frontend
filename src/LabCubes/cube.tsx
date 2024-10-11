import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Canvas, useThree, useLoader } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import CornerText from '../shared/2dText';
import ChatComponent from '../Assisstant /alltogether';
import { PLYLoader } from 'three-stdlib';
import CircularTherm from '../labComponents/circularTherm/circularTherm';
import VVR from '../labComponents/ovenController/vvr';
import KnobOven from '../labComponents/ovenController/knob';

interface CameraProps {
  xN: number;
  yN: number;
  zN: number;
}

const Camera: React.FC<CameraProps> = ({ xN, yN, zN }) => {
  const [position, setPosition] = useState({ x: 0, y: 50, z: 80 });

  useEffect(() => {
    setPosition({ x: xN, y: yN, z: zN });
  }, [xN, yN, zN]);

  return (
    <PerspectiveCamera
      makeDefault
      position={[position.x, position.y, position.z]}
      fov={75}
      aspect={window.innerWidth / window.innerHeight}
      near={0.1}
      far={1000}
    />
  );
};

const Grid: React.FC = () => {
  const { scene } = useThree();

  const texture = useLoader(TextureLoader, '/wood_texture.jpg');

  React.useEffect(() => {
    const gridHelper = new THREE.GridHelper(100, 100, 0xFFCF9D, 0xFFCF9D);
    gridHelper.position.y = 0;
    gridHelper.rotation.x = Math.PI;
    scene.add(gridHelper);

    const geometry = new THREE.BoxGeometry(100, 10, 100);
    const material = new THREE.MeshStandardMaterial({ map: texture });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.y = -6;
    scene.add(cube);

    return () => {
      scene.remove(gridHelper);
      scene.remove(cube);
    };
  }, [scene]);

  return null;
};

const GraphPaperComponent: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 50, z: 80 });
  const [key, setKey] = useState(0);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null); // Ref for the camera
  const sceneRef = useRef<THREE.Scene>(null); // Ref for the scene

  const handleStubMessageClick = () => {
    setPosition({ x: 10, y: 10, z: 10 });
    setKey((prev) => prev + 1);
  };

  const fetchWiperAngleFromBackend = () => {
    return Math.random() * 2 * Math.PI;
  };

  return (
    <div
      style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}
    >
      <CornerText position="top-left" text="Photoelectric Effects" />
      <ChatComponent onMessageClicked={handleStubMessageClick} />
      <Canvas
        gl={{ antialias: true }}
      >
        <Camera key={key} xN={position.x} yN={position.y} zN={position.z} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 10, 0]} intensity={1} />
        <Grid />
        <OrbitControls
          enableDamping={true}
          dampingFactor={0.1}
          rotateSpeed={0.5}
          zoomSpeed={0.5}
        />
        <CircularTherm wiperAngle={fetchWiperAngleFromBackend} position={[0, 8, 0]} />
        <VVR position={[10, 8, 0]} />
      </Canvas>
    </div>
  );
};

export default GraphPaperComponent;
