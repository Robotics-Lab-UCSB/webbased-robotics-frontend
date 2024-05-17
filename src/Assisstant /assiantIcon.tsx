import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons'; 

interface CircleButtonProps {
  onClick: () => void; // Function to call on button click
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'; // Positioning prop
}

const CircleButton: React.FC<CircleButtonProps> = ({ onClick, position = 'bottom-right' }) => {
  const getPositionStyles = () => {
    switch (position) {
      case 'top-left':
        return { top: '20px', left: '20px' };
      case 'top-right':
        return { top: '20px', right: '20px' };
      case 'bottom-left':
        return { bottom: '20px', left: '20px' };
      case 'bottom-right':
      default:
        return { bottom: '20px', right: '20px' };
    }
  };

  const assistantIcon = (
    <FontAwesomeIcon
      icon={faUserTie} // You can change this to faUserSecret or another appropriate icon
      style={{ fontSize: '2em', color: 'rgba(0, 0, 0, 0.5)' }} // Customize color and opacity here
    />
  );
  
  
  return (
    <div className="circle-button" onClick={onClick} style={getPositionStyles()}>
      {assistantIcon}
      <style>
        {`
          .circle-button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #FFCF9D;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            position: fixed;
            z-index: 1000; // High z-index to stay on top
          }
          .circle-button:hover, .circle-button:focus {
            background-color: #FFCF9D;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
          }
        `}
      </style>
    </div>
  );
};

export default CircleButton;
