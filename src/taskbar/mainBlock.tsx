import React, { useState, useCallback, useMemo } from "react";
import "./taskbar.css";
import Bar from "./bar";
import LabHelperMain from "./labHelper";
import SettingsPage from "./settingsPage";
import LabManual from "./labManual";

interface FloatingSquareProps {
  width?: string;
  height?: string;
  color?: string;
  x?: string; // Horizontal position (e.g., "50%", "100px")
  y?: string; // Vertical position (e.g., "50%", "200px")
}

const FloatingSquare: React.FC<FloatingSquareProps> = ({
  width = "50%",
  height = "80%",
  x = "121%",
  y = "50%",
}) => {
    const [hide, setHide] = useState<boolean>(true);
    const [clickedTabNumber, setClickedTabNumber] = useState(0);
    
    const moveCenter = useCallback((value: boolean) => {
        setHide(value);
    }, []);

    const displayChange = useCallback((value: number) => {
        setClickedTabNumber(value);
    }, []);
 
    const labHelperComponent = useMemo(() => <LabHelperMain />, []);
    const labManualComponent = useMemo(() => <LabManual />, []);
    const settingsPageComponent = useMemo(() => <SettingsPage />, []);

    return (
        <div
        className="floating-square"
        style={{
            width,
            height,
            left: hide ? x : "50%",
            top: hide ? y : "50%",
        }}
        >
        <Bar moveCenter={moveCenter} displayChange={displayChange}/>
        <div style={{ display: clickedTabNumber === 1 ? "block" : "none" }}>
            {labHelperComponent}
        </div>
        <div style={{ display: clickedTabNumber === 0 ? "block" : "none" }}>
            {labManualComponent}
        </div>
        <div style={{ display: clickedTabNumber === 2 ? "block" : "none" }}>
            {settingsPageComponent}
        </div>
        </div>
    );
};

export default FloatingSquare;
