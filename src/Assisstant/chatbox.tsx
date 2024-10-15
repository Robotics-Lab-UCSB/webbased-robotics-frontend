import React from 'react';
import Draggable from 'react-draggable';
import './style.css'; // Import the external CSS
import MessageBubble from './messageBubble';

interface ChatBoxProps {
  color: string;
  size: string;
  isOpen: boolean;
  toggleChatBox: () => void;
  onMessageClick: () => void; // New function prop for handling message click
}

const ChatBox: React.FC<ChatBoxProps> = ({ color, size, isOpen, toggleChatBox, onMessageClick }) => {
  return (
    <Draggable handle=".drag-handle">
      <div
        className={`chat-box ${isOpen ? 'open' : ''}`}
        style={{ backgroundColor: color, width: size }}
      >
        <div className="drag-handle">
          <div className="close-btn" onClick={toggleChatBox}>
            &#x25CF;
          </div>
        </div>
        {isOpen && (
          <div className="content">
            <MessageBubble
              text="Let me show you where the oven is. Click on this message to navigate to it."
              onClick={onMessageClick}
            />
          </div>
        )}
        {!isOpen && (
          <button className="toggle-btn" onClick={toggleChatBox}>
            Open
          </button>
        )}
      </div>
    </Draggable>
  );
};

export default ChatBox;