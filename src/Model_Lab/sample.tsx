import React from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import { OBJLoader, MTLLoader } from 'three-stdlib';
import { Group } from 'three';

interface ModelComponentProps {
    modelPath: string;
    mtlPath: string;
}

const ModelComponent: React.FC<ModelComponentProps> = ({ modelPath, mtlPath }) => {
    const { scene } = useThree();

    // Load materials and configure them before loading the model
    const materials = useLoader(MTLLoader, mtlPath);
    materials.preload();

    // Load the model and apply materials
    const obj = useLoader(OBJLoader, modelPath, (loader) => {
        (loader as any).setMaterials(materials);
    });

    // Apply basic transformations (optional)
    obj.scale.set(100, 100, 100);  // Adjust scale as necessary
    obj.position.set(0, 0, 0);     // Optionally, position the model

    // Add loaded object to the scene
    if (!scene.getObjectById(obj.id)) {
        scene.add(obj);
    }

    return <primitive object={obj as unknown as Group} />;
};

export default ModelComponent;

