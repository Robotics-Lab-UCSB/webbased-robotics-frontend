import React from 'react';
import './chatBox.css';

interface messageComponentProps {
  message: string;
  sender: 'bot' | 'user';
}

const MessageComponent: React.FC<messageComponentProps> = ({ message, sender }) => {
  return (
    <div className={`resizable-rectangle ${sender}`}>
      {message}
    </div>
  );
};

export default MessageComponent;
