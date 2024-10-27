import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const RaycastingComponent: React.FC = () => {
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const { camera, scene, gl } = useThree();
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [selectedObject, setSelectedObject] = useState<THREE.Object3D | null>(null);
  const currentAngleRef = useRef<number>(0);
  const previousAngleRef = useRef<number>(-1);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handleMouseDown = (event: MouseEvent) => {
      if (event.button === 0) setIsMouseDown(true);
    };

    const handleMouseUp = (event: MouseEvent) => {
      if (event.button === 0) setIsMouseDown(false);
    };

    gl.domElement.addEventListener('mousemove', handleMouseMove);
    gl.domElement.addEventListener('mousedown', handleMouseDown);
    gl.domElement.addEventListener('mouseup', handleMouseUp);

    return () => {
      gl.domElement.removeEventListener('mousemove', handleMouseMove);
      gl.domElement.removeEventListener('mousedown', handleMouseDown);
      gl.domElement.removeEventListener('mouseup', handleMouseUp);
    };
  }, [gl]);

  function calculateAngle(localPoint: THREE.Vector3, isYAxis: boolean = true): number {
    return isYAxis ? Math.atan2(localPoint.x, localPoint.z) : Math.atan2(localPoint.x, localPoint.y);
  }
  
  function handleRotation(localPoint: THREE.Vector3, rotationAxis: 'x' | 'y' | 'z' = 'y'): void {
    const angle = calculateAngle(localPoint, rotationAxis === 'y');

    if (previousAngleRef.current === -1) {
      previousAngleRef.current = angle;
      currentAngleRef.current = angle;
      return;
    }

    currentAngleRef.current = angle;
    let deltaAngle = previousAngleRef.current - currentAngleRef.current;

    if (deltaAngle > Math.PI) {
      deltaAngle -= 2 * Math.PI;
    } else if (deltaAngle < -Math.PI) {
      deltaAngle += 2 * Math.PI;
    }

    if (selectedObject) {
      selectedObject.rotation[rotationAxis] += deltaAngle * 0.4;
    }

    previousAngleRef.current = currentAngleRef.current;
  }

  const resetAngles = () => {
    previousAngleRef.current = -1;
    setSelectedObject(null);
  };

  useFrame(() => {
    if (isMouseDown) {
      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;
        const objectType = intersectedObject.userData.type;

        if (objectType === "lab1smallknob" || objectType === "VVRKnob") {
          setSelectedObject(intersectedObject);
          const intersectionPoint = intersects[0].point;
          const localPoint = intersectedObject.worldToLocal(intersectionPoint.clone());

          if (objectType === "VVRKnob") {
            console.log(`Mouse relative coordinates on VVRKnob: x=${localPoint.x}, y=${localPoint.y}, z=${localPoint.z}`);
          }

          const rotationAxis = objectType === "lab1smallknob" ? 'y' : 'z';
          handleRotation(localPoint, rotationAxis);
        } else {
          resetAngles();
        }
      } else {
        resetAngles();
      }
    }
  });

  return null;
};

export default RaycastingComponent;
