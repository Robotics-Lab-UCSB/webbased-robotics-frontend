import React, { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const RaycastingComponent: React.FC = () => {
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const { camera, scene, gl } = useThree();
  const [isMouseDown, setIsMouseDown] = useState(false);

  const spinningObject = useRef<THREE.Object3D | null>(null);
  const currentAngleRef = useRef<number>(0);
  const previousAngleRef = useRef<number>(-1);
  const previousSpinning = useRef<THREE.Object3D | null>(null);

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

    gl.domElement.addEventListener("mousemove", handleMouseMove);
    gl.domElement.addEventListener("mousedown", handleMouseDown);
    gl.domElement.addEventListener("mouseup", handleMouseUp);

    return () => {
      gl.domElement.removeEventListener("mousemove", handleMouseMove);
      gl.domElement.removeEventListener("mousedown", handleMouseDown);
      gl.domElement.removeEventListener("mouseup", handleMouseUp);
    };
  }, [gl]);

  useFrame(() => {
    if (isMouseDown) {
      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects(
        scene.children,
        true
      );
      const intersectedObject = intersects[0].object;
      if (intersectedObject.userData && intersectedObject.userData.unique_id) {
        console.log("Unique ID:", intersectedObject.userData.unique_id);
      } else {
        console.log("No unique_id found on this object.");
      }
      if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;
        const intersectionPoint = intersects[0].point;
        const localPoint = intersectedObject.worldToLocal(
          intersectionPoint.clone()
        );
        let angle = 0;
        if (intersectedObject.userData.type === "VVRKnob") {
          // KEEP ADDING HERE FOR NEW COMPONENTS
          angle = Math.atan2(localPoint.x, localPoint.y);
        } else if (intersectedObject.userData.type === "lab1smallknob") {
          angle = Math.atan2(localPoint.x, localPoint.z);
        }

        let deltaAngle;
        if (previousSpinning.current !== intersectedObject) {
          previousAngleRef.current = angle;
          deltaAngle = 0;
          previousSpinning.current = intersectedObject;
        } else {
          currentAngleRef.current = angle;
          deltaAngle = previousAngleRef.current - currentAngleRef.current;
          previousAngleRef.current = currentAngleRef.current;
        }

        if (deltaAngle > Math.PI) {
          deltaAngle -= 2 * Math.PI;
        } else if (deltaAngle < -Math.PI) {
          deltaAngle += 2 * Math.PI;
        }
        if (intersectedObject.userData.type === "lab1smallknob") {
          // CHECK FOR DIFFERENT ADDING ANGLE IMPLEMENTATIONS
          if (intersectedObject) {
            intersectedObject.rotation.y -= deltaAngle * 0.34;
          }
        } else if (intersectedObject.userData.type === "VVRKnob") {
          if (spinningObject) {
            intersectedObject.rotation.z += deltaAngle * 0.4;
          }
        } else {
          previousSpinning.current = null;
        }
      }
    } else {
      previousSpinning.current = null;
    }
  });

  return null;
};

export default RaycastingComponent;
