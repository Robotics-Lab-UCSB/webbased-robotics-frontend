import React from "react"

// Sample JSON data (you can also import this from a separate file)
const jsonData = [
  {
    id: "component-1",
    type: "Button",
    position: { x: 100, y: 200 },
    attributes: { text: "Click Me", color: "blue" },
  },
  {
    id: "component-2",
    type: "Image",
    position: { x: 300, y: 400 },
    attributes: { src: "image.png", alt: "Example Image" },
  },
]

// Define an interface for type safety
interface Position {
  x: number
  y: number
}

interface ButtonAttributes {
  text: string
  color: string
}

interface ImageAttributes {
  src: string
  alt?: string
}

type ComponentAttributes = ButtonAttributes | ImageAttributes

interface ComponentData {
  id: string
  type: string
  position: Position
  attributes: ComponentAttributes
}

// Main React Component
const DynamicRenderer: React.FC = () => {
  const renderComponent = (component: ComponentData) => {
    const { id, type, position, attributes } = component
    const style = {
      position: "absolute" as const,
      left: `${position.x}px`,
      top: `${position.y}px`,
    }

    switch (type) {
      case "Button":
        return (
          <button
            key={id}
            style={{
              ...style,
              backgroundColor: (attributes as ButtonAttributes).color,
            }}
          >
            {(attributes as ButtonAttributes).text}
          </button>
        )
      case "Image":
        return (
          <img
            key={id}
            style={style}
            src={(attributes as ImageAttributes).src}
            alt={(attributes as ImageAttributes).alt || ""}
          />
        )
      default:
        return (
          <div key={id} style={style}>
            Unknown Component
          </div>
        )
    }
  }

  return <div>{jsonData.map((component) => renderComponent(component))}</div>
}

export default DynamicRenderer
