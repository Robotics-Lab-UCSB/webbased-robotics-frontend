import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import CornerText from '../shared/2dText';
import ChatComponent from '../Assisstant/alltogether';
import CircularTherm from '../labComponents/circularTherm/ThermometerMainComponent';
import VVR from '../labComponents/VariableVoltageRegulator/mainframe';
import Grid from './grid';

interface CameraProps {
  xN: number;
  yN: number;
  zN: number;
}

const Camera: React.FC<CameraProps> = ({ xN, yN, zN }) => {
  return (
    <PerspectiveCamera
      makeDefault
      position={[xN, yN, zN]}
      fov={75}
      aspect={window.innerWidth / window.innerHeight}
      near={0.1}
      far={1000}
    />
  );
};

const GraphPaperComponent: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 50, z: 80 });
  const [key, setKey] = useState(0);

  const handleStubMessageClick = () => {
    setPosition({ x: 10, y: 10, z: 10 });
    setKey((prev) => prev + 1);
  };

  const fetchWiperAngleFromBackend = () => {
    return Math.random() * 2 * Math.PI;
  };

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <CornerText position="top-left" text="Photoelectric Effects" />
      <ChatComponent onMessageClicked={handleStubMessageClick} />
      <Canvas gl={{ antialias: true }}>
        {/* Camera Component */}
        <Camera key={key} xN={position.x} yN={position.y} zN={position.z} />

        {/* Lights */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 10, 0]} intensity={1} />

        {/* Grid and Ground */}
        <Grid />

        {/* Controls */}
        <OrbitControls enableDamping dampingFactor={0.1} rotateSpeed={0.5} zoomSpeed={0.5} />

        {/* Thermometer and Regulator Components */}
        <CircularTherm wiperAngle={fetchWiperAngleFromBackend} position={[0, 8, 0]} />
        <VVR position={[10, 8, 0]} />
      </Canvas>
    </div>
  );
};

export default GraphPaperComponent;