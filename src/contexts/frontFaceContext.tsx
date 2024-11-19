import { createContext, useState, ReactNode } from "react";
type RenderState = {
    isFrontFaceVisible: boolean;
    setFrontFaceVisibility: (visible: boolean) => void;
  };

export const FrontFaceContext = createContext<RenderState | undefined>(undefined);

export const FrontFaceContextProvider = ({ children }: { children: ReactNode }) => {

    const [isFrontFaceVisible, setFrontFaceVisibility] = useState(true);

  return (
    <FrontFaceContext.Provider value={{isFrontFaceVisible, setFrontFaceVisibility}}>
      {children}
    </FrontFaceContext.Provider>
  );
};