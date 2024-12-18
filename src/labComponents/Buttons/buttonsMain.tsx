import React from "react"
import Button2 from "./longButton"
import Button1 from "./circleAndTriangleButton"

interface Button {
  id: string
  unique_id: string
  position: [number, number, number]
  rotation: [number, number, number]
  scale: [number, number, number]
  type: string
  key: string
  typeGen?: string | null;
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
              rotation={button.rotation}
              scale={button.scale}
              typeGen={button.typeGen ?? "circleButton"} 
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
        }
        return null
      })}
    </>
  )
}

export default ButtonComponent
