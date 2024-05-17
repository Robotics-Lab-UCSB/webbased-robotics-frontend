import React from 'react';
import { Canvas, useThree, useLoader } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import CornerText from '../shared/2dText';
import ChatComponent from '../Assisstant /alltogether';
import { useRef, useEffect, useState } from 'react';
import GrayCubeButton from '../labComponents/labButton1';
import ModelComponent from '../Model_Lab/sample';
import PLYModel from '../Model_Lab/plyviewer';

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

    const texture = useLoader(TextureLoader, '/public/wood_texture.jpg');

    React.useEffect(() => {
        // Create and add the grid helper
        const gridHelper = new THREE.GridHelper(100, 100, 0xFFCF9D, 0xFFCF9D);
        gridHelper.position.y = 0;  // Position at ground level
        gridHelper.rotation.x = Math.PI;  // Rotate to lie flat
        scene.add(gridHelper);

        // Create and add a cube below the grid
        const geometry = new THREE.BoxGeometry(100, 10, 100);
        const material = new THREE.MeshStandardMaterial({ 
            map: texture  
        });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.y = -6;  // Position the cube below the grid
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
    const [key, setKey] = useState(0); // Adding a key to force re-rendering

    const handleStubMessageClick = () => {
        // Update the position in a distinct manner
        setPosition({ x: 10, y: 10, z: 10 });
        // Increment the key to force the Camera component to remount
        setKey(prev => prev + 1);
    };

    const handleButtonClick = () => {
        console.log("Cube Button Clicked!");
    };
    
    return (
        <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
            <CornerText position="top-left" text="Photoeletric Effects" />
            <ChatComponent onMessageClicked={handleStubMessageClick} />
            <Canvas 
                gl={{ antialias: true }}
                onCreated={({ gl }) => {
                    gl.setClearColor('#004225');
                }}
            >
                <Camera key={key} xN={position.x} yN={position.y} zN={position.z} />
                <ambientLight intensity={0.5} />
                <directionalLight position={[0, 10, 0]} intensity={1} />
                <Grid />
                <OrbitControls 
                    enableDamping={true}
                    dampingFactor={0.1}  // Higher dampingFactor makes the movement smoother
                    rotateSpeed={0.5}    // Reduced rotateSpeed for slower rotation
                    zoomSpeed={0.5}      // Reduced zoomSpeed for slower zoom
                />
                <GrayCubeButton position={[0, 0, 0]} onClickCallback={handleButtonClick} />
                <ModelComponent modelPath="/light.obj" mtlPath='./9ecbd8b73892_a_physics_lab_explo.mtl'/>
                <PLYModel path="/airplane.ply" />
            </Canvas>
        </div>
    );
};

export default GraphPaperComponent;
