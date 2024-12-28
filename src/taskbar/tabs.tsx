import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faRobot, faCog } from '@fortawesome/free-solid-svg-icons';

interface TabProps {
    name: string;
    clickTime: React.MutableRefObject<number | null>;
    iconType: 0 | 1 | 2; // Define the allowed values
    updateRef: (tabNumber: number) => void; // Function to update the ref
    selected: boolean;
}

const TabComponent: React.FC<TabProps> = ({ name, clickTime, iconType, updateRef, selected }) => {
    const getIcon = () => {
        switch (iconType) {
            case 0:
                return faBookOpen; // Manual Icon
            case 1:
                return faRobot; // AI Person Icon
            case 2:
                return faCog; // Gear Icon
            default:
                return faBookOpen; // Fallback to Manual Icon
        }
    };

    return (
        <div
            className={`tab${selected ? '-selected' : ''}`} // Dynamically add hover class
            onClick={() => {
                clickTime.current = null;
                updateRef(iconType); // Call the function to update the ref
            }}
        >
            <FontAwesomeIcon icon={getIcon()} className="tab-icon" />
            <span className="tab-name">{name}</span>
        </div>
    );
};

export default TabComponent;
