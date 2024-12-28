import React, { createContext, useContext, useState } from "react";

interface CameraPosition {
  x: number;
  y: number;
  z: number;
}

interface CameraState {
  currentPosition: CameraPosition;
  setPosition: (objectIntention: string) => void;
}

const CameraContext = createContext<CameraState | null>(null);

export const CameraProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Dictionary for predefined positions
  const initialPositions: Record<string, CameraPosition> = {
    circular_thermometer: { x: -15, y: 120, z: -10 },
    dcv: { x: -80, y: 40, z: 5 },
    VVR_knob: { x: 4, y: 5, z: 6 },
    vvr: { x: -80, y: 35, z: 5 },
    frank_hertz_chasis: { x: 10, y: 11, z: 12 },
  };

  // State to track only the current camera position
  const [currentPosition, setCurrentPosition] = useState<CameraPosition>({
    x: 0,
    y: 50,
    z: 80, // Default starting position
  });

  const setPosition = (objectIntention: string) => {
    const position = initialPositions[objectIntention];
    if (!position) {
      console.warn(`No camera position found for object: ${objectIntention}`);
      return;
    }
    const randomOffset = Math.random() * 0.001 + 0.001; // Random value between 0.001 and 0.002
    position.x += randomOffset;

    // Update the current camera position
    setCurrentPosition(position);
    console.log(`Camera updated to position for ${objectIntention}:`, position);
  };

  return (
    <CameraContext.Provider value={{ currentPosition, setPosition }}>
      {children}
    </CameraContext.Provider>
  );
};

export const useCameraState = () => {
  const context = useContext(CameraContext);
  if (!context) {
    throw new Error("useCameraState must be used within a CameraProvider");
  }
  return context;
};
