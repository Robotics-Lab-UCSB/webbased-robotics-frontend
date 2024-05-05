import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';
import CornerText from '../shared/2dText';
import CircleButton from '../Assisstant /assiantIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlask } from '@fortawesome/free-solid-svg-icons';
import ChatComponent from '../Assisstant /alltogether';

const GraphPaperComponent: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera>();
    const controlsRef = useRef<OrbitControls>();

    useEffect(() => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x004225);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(50, 130, 50);
        camera.lookAt(0, 0, 0);
        cameraRef.current = camera; 

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current?.appendChild(renderer.domElement);

        // Grid
        const gridHelper = new THREE.GridHelper(100, 100, 0xFFCF9D, 0xFFCF9D);
        gridHelper.position.y = 0;
        gridHelper.rotation.x = Math.PI;
        scene.add(gridHelper);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(0, 1, 0);
        scene.add(directionalLight);

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.rotateSpeed = 0.5;
        controls.zoomSpeed = 0.3;
        controlsRef.current = controls;

        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            scene.remove(gridHelper);
            renderer.dispose();
            controls.dispose();
            mountRef.current?.removeChild(renderer.domElement);
        };
    }, []);

    const handleStubMessageClick = () => {
        if (cameraRef.current && controlsRef.current) {
            const { current: camera } = cameraRef;
            // const { current: controls } = controlsRef;

            // Define a random point to look at
            const randomPoint = new THREE.Vector3(
                Math.random() * 100 - 50, // X coordinate
                Math.random() * 100,     // Y coordinate
                Math.random() * 100 - 50 // Z coordinate
            );

            // Move the camera and controls to look at the new point
            // controls.target.copy(randomPoint);
            camera.position.set(randomPoint.x, randomPoint.y + 50, randomPoint.z + 50);
            camera.lookAt(randomPoint);
            // controls.update();
        }
    };

    return (
        <div style={{ position: 'relative' }} ref={mountRef}>
            <CornerText position="top-left" text="Franck-Hertz" />
            <ChatComponent onMessageClicked={handleStubMessageClick} />
        </div>
    );
};

export default GraphPaperComponent;
