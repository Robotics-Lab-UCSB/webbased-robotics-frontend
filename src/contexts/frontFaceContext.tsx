import { createContext, useRef, ReactNode } from "react";
type RenderState = {
    isFrontFaceVisible: boolean;
    setFrontFaceVisibility: (visible: boolean) => void;
  };

export const FrontFaceContext = createContext<RenderState | undefined>(undefined);

export const FrontFaceContextProvider = ({ children }: { children: ReactNode }) => {

    const isFrontFaceVisible = useRef(true);

  // Function to update the value in the ref
  const setFrontFaceVisibility = (visible: boolean) => {
    isFrontFaceVisible.current = visible;
  };

  return (
    <FrontFaceContext.Provider value={{ isFrontFaceVisible: isFrontFaceVisible.current, setFrontFaceVisibility }}>
      {children}
    </FrontFaceContext.Provider>
  );
};