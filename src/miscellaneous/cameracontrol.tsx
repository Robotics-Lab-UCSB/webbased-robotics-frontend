import React, { useRef, useEffect } from 'react';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const ControlsComponent = () => {
//   const controlsRef = useRef<THREE.OrbitControls>(null);

//   useEffect(() => {
//     if (controlsRef.current) {
//       // Update the controls' target
//       controlsRef.current.target.set(1, 2, 3); // Example: set to position (1, 2, 3)
//       controlsRef.current.update(); // Update the controls to reflect the new target
//     }
//   }, []);

  return (
    <OrbitControls
      enableDamping
      dampingFactor={0.1}
      rotateSpeed={0.4}
      zoomSpeed={0.5}
      mouseButtons={{ MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.ROTATE }}
      onUpdate={(self) => {
        self.target.set(0, 35, 0); // Update target to position (1, 2, 3)
        self.update();
      }}
    />
  );
};

export default ControlsComponent;
