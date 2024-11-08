import React, { useEffect, useState } from 'react';
import ButtonComponent from './buttonsMain';

interface Button {
  id: string;
  position: [number, number, number];
  rotation: [number, number, number];
  type: string;
}

interface ParentComponentProps {
  xPos?: number;
  yPos?: number;
  zPos?: number;
  distanceBetweenSmallButton?: number;
  distanceBetweenBigButton?: number;
  rot?: [number, number, number];
  position?: [number, number, number];
  scale?: [number, number, number];
}

const ParentComponent: React.FC<ParentComponentProps> = ({distanceBetweenSmallButton = 1.7, distanceBetweenBigButton = 3.5, rot = [0, 0, 0], position = [33.08, -1.3, 2.5], scale = [0.8,0.8,0.8]}) => {
  const [buttons, setButtons] = useState<Button[]>([]);
  useEffect(() => {
    // Create small buttons
    const smallButtons = Array.from({ length: 8 }, (_, i) => ({
      id: `smallButton${i + 1}`,
      position: [position[0] + distanceBetweenSmallButton * (i + 1) + 1, position[1] + 1.5, position[2]] as [number, number, number],
      rotation: rot,
      type: 'type1'
    }));

    // Create big buttons in two rows (yPos and yPos - 5)
    const bigButtonsRow1 = Array.from({ length: 4 }, (_, i) => ({
      id: `bigButton${i + 1}`,
      position: [position[0] + distanceBetweenBigButton * (i + 1), position[1], position[2]] as [number, number, number],
      rotation: rot,
      type: 'type2'
    }));

    const bigButtonsRow2 = Array.from({ length: 4 }, (_, i) => ({
      id: `bigButton${i + 5}`,
      position: [position[0] + distanceBetweenBigButton * (i + 1), position[1] - 1.2, position[2]] as [number, number, number],
      rotation: rot,
      type: 'type2'
    }));

    // Combine all buttons
    setButtons([...smallButtons, ...bigButtonsRow1, ...bigButtonsRow2]);
  }, []);

  return (
    <mesh position={position} scale={scale} rotation={[Math.PI / 2, 0, 0]}>
      <ButtonComponent buttons={buttons} />
    </mesh>
  );
  
};

export default ParentComponent;
