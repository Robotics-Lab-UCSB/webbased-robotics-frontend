import React from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components';
import MessageBubble from './messageBubble';

interface ChatBoxProps {
  color: string;
  size: string;
  isOpen: boolean;
  toggleChatBox: () => void;
  onMessageClick: () => void; // New function prop for handling message click
}

const StyledChatBox = styled.div<{ color: string; size: string; isOpen: boolean }>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: width 0.3s;
  display: ${(props) => (props.isOpen ? 'block' : 'none')};

  background-color: ${(props) => props.color};
  width: ${(props) => props.size};

  .drag-handle {
    background-color: #FFCF9D;
    padding: 8px;
    color: #000;
    user-select: none;
  }

  .content {
    padding: 16px;
  }

  .toggle-btn {
    background-color: #ffffff;
    border: none;
    padding: 8px;
    cursor: pointer;
    width: 100%;
    z-index: 1001;
  }

  .close-btn {
    display: inline-block;
    color: red;
    cursor: pointer;
    margin-left: 5px;
  }
`;

const ChatBox: React.FC<ChatBoxProps> = ({ color, size, isOpen, toggleChatBox, onMessageClick }) => {
  return (
    <Draggable handle=".drag-handle">
      <StyledChatBox color={color} size={size} isOpen={isOpen}>
        <div className="drag-handle">
          <div className="close-btn" onClick={toggleChatBox}>&#x25CF;</div>
        </div>
        {isOpen && (
          <div className="content">
            <MessageBubble text="Let me show you where the oven is. Click on this message to navigate to it." onClick={onMessageClick} />
          </div>
        )}
        {!isOpen && (
          <button className="toggle-btn" onClick={toggleChatBox}>
            Open
          </button>
        )}
      </StyledChatBox>
    </Draggable>
  );
};

export default ChatBox;
