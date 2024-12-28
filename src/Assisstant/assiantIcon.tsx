import React from "react"
import { faUserTie } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./style.css" // Import the external CSS file

interface CircleButtonProps {
  onClick: () => void // Function to call on button click
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" // Positioning prop
}

const CircleButton: React.FC<CircleButtonProps> = ({
  onClick,
  position = "bottom-right",
}) => {
  const getPositionStyles = () => {
    switch (position) {
      case "top-left":
        return { top: "20px", left: "20px" }
      case "top-right":
        return { top: "20px", right: "20px" }
      case "bottom-left":
        return { bottom: "20px", left: "20px" }
      case "bottom-right":
      default:
        return { bottom: "20px", right: "20px" }
    }
  }

  return (
    <div
      className="circle-button"
      onClick={onClick}
      style={getPositionStyles()}
    >
      <FontAwesomeIcon
        icon={faUserTie}
        style={{ fontSize: "2em", color: "rgba(0, 0, 0, 0.5)" }} // Customize icon style here
      />
    </div>
  )
}

export default CircleButton
