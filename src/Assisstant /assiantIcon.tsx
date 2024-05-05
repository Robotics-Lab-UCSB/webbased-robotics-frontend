import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'; 

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

  const questionIcon = <FontAwesomeIcon icon={faQuestionCircle} /> 

  return (
    <div className="circle-button" onClick={onClick} style={getPositionStyles()}>
      {questionIcon}
      <style>
        {`
          .circle-button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50px;
            height: 50px;
            border: 1px solid white;
            border-radius: 50%;
            background-color: ##5fbdd1;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            transition: background-color 0.3s, box-shadow 0.3s;
            position: fixed;
            z-index: 1000; // High z-index to stay on top
          }
          .circle-button:hover, .circle-button:focus {
            background-color: #FFCF9D;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            border: 1px solid white;
          }
        `}
      </style>
    </div>
  );
};

export default CircleButton;
