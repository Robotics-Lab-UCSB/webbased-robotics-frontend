import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import CornerText from '../shared/2dText';
import ChatComponent from '../Assisstant/alltogether';
import CircularTherm from '../labComponents/circularTherm/ThermometerMainComponent';
import SmallKnob from '../labComponents/SmallKnob/smallKnob';
import Button1 from '../labComponents/Buttons/button1';
import Button2 from '../labComponents/Buttons/button2';
import VVR from '../labComponents/VariableVoltageRegulator/mainframe';
import Grid from './grid';
import { ThreeEvent } from '@react-three/fiber';
import RaycastingComponent from '../raycaster/lab1Raycaster';

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
      <Canvas
        gl={{ antialias: true }}
        style={{ background: '#004225' }} // Setting background color here
      >
        {/* Raycasting Component */}
        <RaycastingComponent />

        {/* Camera Component */}
        <Camera key={key} xN={position.x} yN={position.y} zN={position.z} />

        {/* Lights */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 10, 0]} intensity={1} />

        {/* Grid and Ground */}
        <Grid />

        {/* Controls */}
        <OrbitControls enableDamping dampingFactor={0.1} rotateSpeed={0.4} zoomSpeed={0.5} mouseButtons={{ MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.ROTATE }} />

        {/* Thermometer and Regulator Components */}
        <CircularTherm wiperAngle={fetchWiperAngleFromBackend} position={[0, 8, 0]} />
        <VVR position={[10, 8, 0]} />

        {/* Small Knob Component */}
        <SmallKnob type="lab1smallknob" name="smallKnob" position={[-10, 5, 0]} rotation={[Math.PI, 0, 0]} />
        <SmallKnob type="lab1smallknob" name="smallKnob" position={[-22, 5, 0]} rotation={[Math.PI / 2, 0, 0]} />

        {/* Button Components */}
        <Button1 position={[-30, 5, 0]} rotation={[Math.PI, 0, 0]} onClick={() => console.log('i am clicked')} />
        <Button2 position={[-35, 5, 0]} rotation={[Math.PI, 0, 0]} onClick={() => console.log('i am clicked')} />
      </Canvas>
    </div>
  );
};

export default GraphPaperComponent;