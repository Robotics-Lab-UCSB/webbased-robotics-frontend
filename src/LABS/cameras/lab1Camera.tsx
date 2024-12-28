import React, { useEffect, useRef } from "react";
import { useMemo } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber"
import { useCameraState } from "../../contexts/cameraPositionContext";
import ControlsComponent from "../../miscellaneous/controls/cameracontrol";

const Lab1Camera: React.FC = () => {
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null); // Create a ref for the camera
    const { currentPosition } = useCameraState(); // Access currentPosition from context

    const raycasterRef = useRef(new THREE.Raycaster())
    const intersectsRef = useRef<THREE.Intersection[]>([]);
    const { scene } = useThree();

    const setCameraRef = (camera: THREE.PerspectiveCamera | null) => {
        if (camera) {
          cameraRef.current = camera;
        }
    };

    const objectDictionaryRef = useRef<Record<string, THREE.Object3D>>({});

    const glow = (object: THREE.Object3D, glowColor: THREE.ColorRepresentation = 0xfff000) => {
        if (object instanceof THREE.Mesh) {
          // Check if the object is already glowing
          if (object.userData.glowMesh) {
            console.warn("The object is already glowing.");
            return;
          }
      
          // Create a glow material
          const glowMaterial = new THREE.MeshBasicMaterial({
            color: glowColor,
            transparent: true,
            opacity: 0.45, // Adjust for intensity
          });
      
          // Clone the object's geometry for the glow effect
          const glowGeometry = object.geometry.clone();
          const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
      
          // Scale the glow mesh slightly larger than the object
            glowMesh.position.copy(object.position);
          glowMesh.rotation.copy(object.rotation);
      
          // Add the glow mesh to the scene or as a child of the object
          object.add(glowMesh);
      
          // Store the glow mesh in the userData
          object.userData.glowMesh = glowMesh;
      
          // Remove the glow effect after 3 seconds
          setTimeout(() => {
            if (object.userData.glowMesh) {
              object.remove(object.userData.glowMesh);
              object.userData.glowMesh = null;
            }
          }, 3000);
        } else {
          console.warn("The object is not a Mesh.");
        }
      };
      

    useEffect(() => {
        const updateRaycaster = async () => {
          if (cameraRef.current) {
            // Update the camera position
            // cameraRef.current.position.set(currentPosition.x, currentPosition.y, currentPosition.z);
            cameraRef.current.lookAt(currentPosition.x, currentPosition.y, currentPosition.z);
            // Update the raycaster from the camera's perspective
            raycasterRef.current.setFromCamera(new THREE.Vector2(0, 0), cameraRef.current);
    
            // Update raycaster settings
            raycasterRef.current.params.Points.threshold = 0.1;
    
            // Find intersections
            intersectsRef.current = raycasterRef.current.intersectObjects(scene.children, true);
    
            // Log the first intersected object, if any
            if (intersectsRef.current.length > 0) {
              console.log("First object in view:", intersectsRef.current[0].object.userData.type);
              glow(intersectsRef.current[0].object);
            } else {
              console.log("No objects in view.");
            }
          }
        };
    
        updateRaycaster();
      }, [currentPosition, scene]);

    return (
        <>
            <PerspectiveCamera
                ref={setCameraRef} // Attach the callback ref to ensure proper synchronization
                makeDefault
                position={[currentPosition.x, currentPosition.y, currentPosition.z]} // Initial position
                fov={75}
                aspect={window.innerWidth / window.innerHeight}
                near={0.1}
                far={1000}
            />
            <ControlsComponent />
        </>
    );
};

export default Lab1Camera;
