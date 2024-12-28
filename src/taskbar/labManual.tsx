import React from "react";
import "./taskbar.css";
import ScrollableBlock from "./chatbox/slidableWindow";

interface LabManualProps {}

const LabManual: React.FC<LabManualProps> = () => {
  return (
    <div className="page-background">
      <ScrollableBlock>
        lab manual implementation
      </ScrollableBlock>
    </div>
  );
};

export default LabManual;
