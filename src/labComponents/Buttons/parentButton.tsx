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

const ParentComponent: React.FC<ParentComponentProps> = ({xPos = 15, yPos = 10, zPos = -2.7, distanceBetweenSmallButton = 2, distanceBetweenBigButton = 4, rot = [0, 0, 0], position = [0, 0, 0], scale = [1,1,1]}) => {
  const [buttons, setButtons] = useState<Button[]>([]);
  
  useEffect(() => {
    // Create small buttons
    const smallButtons = Array.from({ length: 8 }, (_, i) => ({
      id: `smallButton${i + 1}`,
      position: [xPos + distanceBetweenSmallButton * (i + 1), yPos + 5, zPos] as [number, number, number],
      rotation: rot,
      type: 'type1'
    }));

    // Create big buttons in two rows (yPos and yPos - 5)
    const bigButtonsRow1 = Array.from({ length: 4 }, (_, i) => ({
      id: `bigButton${i + 1}`,
      position: [xPos + distanceBetweenBigButton * (i + 1), yPos, zPos] as [number, number, number],
      rotation: rot,
      type: 'type2'
    }));

    const bigButtonsRow2 = Array.from({ length: 4 }, (_, i) => ({
      id: `bigButton${i + 5}`,
      position: [xPos + distanceBetweenBigButton * (i + 1), yPos - 5, zPos] as [number, number, number],
      rotation: rot,
      type: 'type2'
    }));

    // Combine all buttons
    setButtons([...smallButtons, ...bigButtonsRow1, ...bigButtonsRow2]);
  }, [xPos, yPos, zPos, distanceBetweenSmallButton, distanceBetweenBigButton, rot]);

  return (
    <mesh position={position} scale={scale}>
      <ButtonComponent buttons={buttons} />
    </mesh>
  );
};

export default ParentComponent;
