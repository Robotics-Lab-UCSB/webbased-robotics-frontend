import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFlask } from "@fortawesome/free-solid-svg-icons"

interface CornerTextProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  text: string
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
            user-select: none;
          }
          .top-left {
            top: 10px;
            left: 15px;
          }
          .top-right {
            top: 10px;
            right: 15px;
          }
          .bottom-left {
            bottom: 10px;
            left: 15px;
          }
          .bottom-right {
            bottom: 10px;
            right: 15px;
          }

          @media (max-width: 768px) {
            .corner-text {
              font-size: 16px; // Smaller font size for smaller screens
            }
          }
        `}
      </style>

      <div className={`corner-text ${position}`}>
        <FontAwesomeIcon icon={faFlask} />
        {" " + text}
      </div>
    </>
  )
}

export default CornerText
