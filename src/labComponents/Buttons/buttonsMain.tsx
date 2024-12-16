import React from "react"
import Button2 from "./button2"
import Button1 from "./circle_button"
import TriangleButton from "./triangleButton"

interface Button {
  id: string
  unique_id: string
  position: [number, number, number]
  rotation: [number, number, number]
  scale: [number, number, number]
  type: string
}

interface ButtonComponentProps {
  buttons: Button[] // The array of button data to render
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({ buttons }) => {
  return (
    <>
      {buttons.map((button) => {
        if (button.type === "type1") {
          return (
            <Button1
              unique_id={button.unique_id}
              key={button.id}
              position={button.position}
              rotation={[Math.PI / 2, Math.PI / 2, 0]} // Force a 90-degree rotation for testing
              scale={button.scale}
            />
          )
        } else if (button.type === "type2") {
          return (
            <Button2
              unique_id={button.unique_id}
              key={button.id}
              position={button.position}
              rotation={button.rotation}
              scale={button.scale}
            />
          )
        } else if (button.type === "type3") {
          return (
            <TriangleButton
              key={button.id}
              position={button.position}
              rotation={button.rotation}
              scale={button.scale}
            />
          )
        }
        return null
      })}
    </>
  )
}

export default ButtonComponent
