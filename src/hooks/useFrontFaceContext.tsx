import { FrontFaceContext } from "../contexts/frontFaceContext";
import { useContext } from "react";

export const useFrontFaceContext = () => {
  const context = useContext(FrontFaceContext);

  if (!context) {
    throw Error("useFrontFaceContext must be used inside an FrontFaceContextProvider");
  }

  return context;
};
