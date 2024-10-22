import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const RaycastingComponent: React.FC = () => {
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const { camera, scene, gl } = useThree();
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [selectedObject, setSelectedObject] = useState<THREE.Object3D | null>(null);
  const currentAngleRef = useRef<number>(0); // Track current angle
  const previousAngleRef = useRef<number>(-1); // Initialize with -1 for first-time tracking

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

  useFrame(() => {
    if (isMouseDown) {
      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects(scene.children, true);
      if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;
  
        if (intersectedObject.userData.type === "lab1smallknob") {
          setSelectedObject(intersectedObject);
          const intersectionPoint = intersects[0].point;
          const localPoint = intersectedObject.worldToLocal(intersectionPoint.clone());
          const angle = Math.atan2(localPoint.x, localPoint.z);

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
            selectedObject.rotation.y -= deltaAngle * 0.4;
          }

          previousAngleRef.current = currentAngleRef.current;
        } else {
          resetAngles();
        }
      }
    } else {
      resetAngles();
    }
  });

  const resetAngles = () => {
    previousAngleRef.current = -1;
    setSelectedObject(null);
  };

  return null;
};

export default RaycastingComponent;