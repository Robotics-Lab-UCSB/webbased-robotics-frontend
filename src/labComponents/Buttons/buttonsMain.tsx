import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { PLYLoader } from 'three-stdlib';
import Button1 from '../Buttons/button1';
import Button2 from './button2';

interface ButtonData {
    id: string;
    position: [number, number, number];
    rotation: [number, number, number];
    type: 'type1' | 'type2'; // Type field to differentiate buttons
  }
  
  interface ButtonComponentProps {
    buttons: ButtonData[]; // The array of button data to render
  }
  
  const ButtonComponent: React.FC<ButtonComponentProps> = ({ buttons }) => {
    return (
      <>
        {buttons.map((button) => {
          if (button.type === 'type1') {
            return <Button1 key={button.id} position={button.position} rotation={button.rotation} />;
          } else if (button.type === 'type2') {
            return <Button2 key={button.id} position={button.position} rotation={button.rotation} />;
          }
          return null;
        })}
      </>
    );
  };
  
  export default ButtonComponent;