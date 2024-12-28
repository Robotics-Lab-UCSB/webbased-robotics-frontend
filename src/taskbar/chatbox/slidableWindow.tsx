import React, { useEffect, useRef } from 'react';
import './chatBox.css';

interface ScrollableBlockProps {
    children: React.ReactNode; // Accepts TSX elements as children
}

const ScrollableBlock: React.FC<ScrollableBlockProps> = ({ children }) => {
    const scrollRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [children]); // Re-scrolls when children change

    return (
        <div className="scrollable-block" ref={scrollRef}>
            {children}
            <div className="bottom-padding" /> {/* Spacer for padding */}
        </div>
    );
};

export default ScrollableBlock;
