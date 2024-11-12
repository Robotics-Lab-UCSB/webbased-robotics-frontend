import React from 'react';
import './style.css'; // Import the external CSS

interface MessageBubbleProps {
  text: string;
  id: number;
  isUser: boolean
  onClick: () => void;
  backgroundColor?: string; // Optional background color prop
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ text, onClick, isUser, backgroundColor = '#FFB000' }) => {
  return (
    <div
      className={isUser ? 'message-bubble' : 'message-bubble response'}
      onClick={onClick}
      style={{ backgroundColor }}
    >
      {text}
    </div>
  );
};

export default MessageBubble;