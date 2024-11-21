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

interface ComponentData {
  id: string
  type: string
  position: Position
  attributes: Record<string, any>
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
            style={{ ...style, backgroundColor: attributes.color }}
          >
            {attributes.text}
          </button>
        )
      case "Image":
        return (
          <img
            key={id}
            style={style}
            src={attributes.src}
            alt={attributes.alt || ""}
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
