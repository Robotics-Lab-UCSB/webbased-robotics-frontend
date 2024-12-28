import React, { useEffect, useRef, useState } from "react";
import "./taskbar.css";
import TabComponent from "./tabs";
import LabHelperMain from "./labHelper";

interface BarProps {
    height?: string; 
    moveCenter: (hide: boolean) => void; 
    displayChange: (value: number) => void;
}

const Bar: React.FC<BarProps> = ({
        height = "10%",
        moveCenter,
        displayChange, 
}) => {
        const clickTime = useRef<number | null>(null); 
        const hide = useRef<boolean>(true); 
        const componentRef = useRef<HTMLDivElement | null>(null); 
        const [clickedTabNumber, setClickedTabNumber] = useState(0);

        const switchTab = (tabNumber: number) => {
            setClickedTabNumber(tabNumber);
            displayChange(tabNumber); 
        };

        useEffect(() => {
            const handleClick = (event: MouseEvent) => {
                if (componentRef.current && componentRef.current.contains(event.target as Node)) {
                    const now = Date.now();

                    if (clickTime.current && now - clickTime.current <= 400) {
                    if (hide.current) {
                            moveCenter(false);
                            hide.current = false;
                    } else {
                            hide.current = true;
                            moveCenter(true);
                    }
                            clickTime.current = null;
                    } else {
                            clickTime.current = now;
                    }
                }
            };
            const disableContextMenu = (event: MouseEvent) => {
                event.preventDefault();
            };
            const componentElement = componentRef.current;
            componentElement?.addEventListener("click", handleClick);
            document.addEventListener('contextmenu', disableContextMenu);

            return () => {
                componentElement?.removeEventListener("click", handleClick);
                document.removeEventListener('contextmenu', disableContextMenu);
            };
        }, [moveCenter]); 

    return (
        <div
            ref={componentRef}
            className="bar"
            style={{
                height,
            }}
        >
            <div className="tabs-container">
                <TabComponent selected={clickedTabNumber === 0} updateRef={switchTab} iconType={0} name="Lab Manual" clickTime={clickTime} />
                <TabComponent selected={clickedTabNumber === 1} updateRef={switchTab} iconType={1} name="Lab Helper©" clickTime={clickTime} />
                <TabComponent selected={clickedTabNumber === 2} updateRef={switchTab} iconType={2} name="Lab Settings" clickTime={clickTime} />
            </div>
        </div>

    );
};

export default Bar;
