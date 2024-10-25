import React from 'react';
import './style.css'; // Import the external CSS

interface MessageBubbleProps {
  text: string;
  id: number;
  onClick: () => void;
  backgroundColor?: string; // Optional background color prop
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ text, onClick, backgroundColor = '#FFB000' }) => {
  return (
    <div
      className="message-bubble clickable"
      onClick={onClick}
      style={{ backgroundColor }}
    >
      {text}
    </div>
  );
};

export default MessageBubble;