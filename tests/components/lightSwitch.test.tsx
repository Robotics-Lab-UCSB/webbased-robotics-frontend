import React from "react"
import { render } from "@testing-library/react"
import { Canvas } from "@react-three/fiber"
import { expect, describe, it } from "vitest"
import LightSwitch from "../../src/miscellaneous/switchAndCasing"

// Mock the loaders to prevent actual file loading during tests
jest.mock("three/examples/jsm/loaders/STLLoader", () => ({
  STLLoader: jest.fn(() => ({
    load: jest.fn((url, onLoad) => onLoad({})), // Mock geometry
  })),
}))

jest.mock("three", () => ({
  TextureLoader: jest.fn(() => ({
    load: jest.fn((url, onLoad) => onLoad({})), // Mock texture
  })),
}))

describe("LightSwitch Component", () => {
  it("renders without crashing", () => {
    // Render the LightSwitch component inside a Canvas
    const { container } = render(
      <Canvas>
        <LightSwitch position={[0, 0, 0]} scale={[1, 1, 1]} />
      </Canvas>,
    )

    // Check if the canvas is rendered
    expect(container.querySelector("canvas")).toBeInTheDocument()
  })
})
