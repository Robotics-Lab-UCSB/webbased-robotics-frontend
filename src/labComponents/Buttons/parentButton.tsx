import React from 'react';
import ButtonComponent from './buttonsMain.tsx'; // Import your ButtonComponent

const ParentComponent: React.FC = () => {
  // Create an array of buttons with different types
  const xPos = 15;
  const yPos = 10;
  const zPos=-2.7;
  const distanceBetweenSmallButton = 3;
  const distanceBetweenBigButton = 5.5;
  const buttons = [
    {id: 'smallButton1', position: [xPos + distanceBetweenSmallButton, yPos+5, zPos], rotation: [0, 0, 0], type: 'type1'},
    {id: 'smallButton2', position: [xPos + distanceBetweenSmallButton*2, yPos+5, zPos], rotation: [0, 0, 0], type: 'type1'},
    {id: 'smallButton3', position: [xPos + distanceBetweenSmallButton*3, yPos+5, zPos], rotation: [0, 0, 0], type: 'type1'},
    {id: 'smallButton4', position: [xPos + distanceBetweenSmallButton*4, yPos+5, zPos], rotation: [0, 0, 0], type: 'type1'},
    {id: 'smallButton5', position: [xPos + distanceBetweenSmallButton*5, yPos+5, zPos], rotation: [0, 0, 0], type: 'type1'},
    {id: 'smallButton6', position: [xPos + distanceBetweenSmallButton*6, yPos+5, zPos], rotation: [0, 0, 0], type: 'type1'},
    {id: 'smallButton7', position: [xPos + distanceBetweenSmallButton*7, yPos+5, zPos], rotation: [0, 0, 0], type: 'type1'},
    {id: 'smallButton8', position: [xPos + distanceBetweenSmallButton*8, yPos+5, zPos], rotation: [0, 0, 0], type: 'type1'},
    {id: 'bigButton1', position: [xPos + distanceBetweenBigButton, yPos, zPos], rotation: [0, 0, 0], type: 'type2'},
    {id: 'bigButton2', position: [xPos + distanceBetweenBigButton*2, yPos, zPos], rotation: [0, 0, 0], type: 'type2'},
    {id: 'bigButton3', position: [xPos + distanceBetweenBigButton*3, yPos, zPos], rotation: [0, 0, 0], type: 'type2'},
    {id: 'bigButton4', position: [xPos + distanceBetweenBigButton*4, yPos, zPos], rotation: [0, 0, 0], type: 'type2'},
    {id: 'bigButton5', position: [xPos + distanceBetweenBigButton, yPos-5, zPos], rotation: [0, 0, 0], type: 'type2'},
    {id: 'bigButton6', position: [xPos + distanceBetweenBigButton*2, yPos-5, zPos], rotation: [0, 0, 0], type: 'type2'},
    {id: 'bigButton7', position: [xPos + distanceBetweenBigButton*3, yPos-5, zPos], rotation: [0, 0, 0], type: 'type2'},
    {id: 'bigButton8', position: [xPos + distanceBetweenBigButton*4, yPos-5, zPos], rotation: [0, 0, 0], type: 'type2'},
  ];

  return (
      <ButtonComponent buttons={buttons} />
  );
};

export default ParentComponent;
