import React, { useState } from 'react';
import CircleButton from './assiantIcon';
import ChatBox from './chatbox';

interface ChatComponentProps {
    onMessageClicked: () => void; // Function to call on button click
  }

const ChatComponent: React.FC<ChatComponentProps> = ({onMessageClicked}) => {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);

  const toggleChatBox = () => {
    setChatBoxOpen((prev) => !prev);
  };

  return (
    <div>
      <CircleButton onClick={toggleChatBox} />
      <ChatBox color="#F5F5DC" size="300px" isOpen={chatBoxOpen} toggleChatBox={toggleChatBox} onMessageClick={onMessageClicked} />
    </div>
  );
};

export default ChatComponent;
