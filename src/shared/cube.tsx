import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { DragControls } from 'three-stdlib';

const DraggableCube: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cubeRef = useRef<THREE.Mesh>();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current! });
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 5;

    // Load a texture
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x0057D9 }); // Electric blue color
    const cube = new THREE.Mesh(geometry, material);
    cubeRef.current = cube;
    scene.add(cube);

    // Setup drag controls
    const controls = new DragControls([cube], camera, renderer.domElement);

    controls.addEventListener('drag', function (event) {
      const object = (event as any).object as THREE.Object3D; // Type assertion here
    });

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      controls.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default DraggableCube;
