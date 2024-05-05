import React from 'react';
import { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlask } from '@fortawesome/free-solid-svg-icons';

interface CornerTextProps {
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    text: string;
  }

const CornerText: React.FC<CornerTextProps> = ({ position, text }) => {
  return (
    <>
        <style>
        {`
            .corner-text {
            position: fixed;
            color: #FFCF9D;
            font-size: 20px;
            font-family: 'Arial', sans-serif;
            font-weight: bold;
            z-index: 1000;
            bottom: 30px;  // Increased from a smaller value or set to push the text up
            right: 10px;  
            user-select: none;
            }
            .top-left {
            margin-top: 10px;
            margin-right: 40px;
            margin-bottom: 5px;
            margin-left: 15px;
            top: 0;
            left: 0;
            }
            .top-right {
            top: 0;
            right: 0;
            }
            .bottom-left {
            bottom: 0;
            left: 0;
            }
            .bottom-right {
            bottom: 0;
            right: 0;
            }

            @media (max-width: 768px) {
            .corner-text {
                font-size: 16px; // Smaller font size for smaller screens
                padding: 15px; // Slightly less padding for smaller screens
            }
            }
        `}
        </style>

      <div className={`corner-text ${position}`}>
        <FontAwesomeIcon icon={faFlask} />
        {" " + text}
      </div>
    </>
  );
};

export default CornerText;
