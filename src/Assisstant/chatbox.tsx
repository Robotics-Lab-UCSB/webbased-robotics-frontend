import React from 'react';
import { useState } from 'react';
import Draggable from 'react-draggable';
import './style.css'; // Import the external CSS
import MessageBubble from './messageBubble';

interface ChatBoxProps {
  color: string;
  t_width: string;
  t_height: string;
  isOpen: boolean;
  toggleChatBox: () => void;
  onMessageClick: () => void; // New function prop for handling message click
}

const ChatBox: React.FC<ChatBoxProps> = ({ color, t_width, t_height, isOpen, toggleChatBox, onMessageClick }) => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<string[]>([]); // State to store messages

  const SendMessage = () => {
    if (inputText.trim() !== '') {
      setMessages([...messages, inputText]); // Add the new message to the list
      setInputText(''); // Clear the input field
      
    }
  };

  return (
      <Draggable handle=".drag-handle">
          <div
            className={`chat-box ${isOpen ? 'open' : ''}`}
            style={{ backgroundColor: color, width: t_width, height: t_height}}
          >
            <div className="drag-handle">
              <div className="close-btn" onClick={toggleChatBox}>
                X
              </div>
            </div>
            {isOpen && (
              <div className='contentAndInput'>
                <div className="content">
                  {messages.map((message, index) => (
                    <MessageBubble
                    id={index}
                    text={message}
                    onClick={onMessageClick}
                    />
                  ))}
                  </div>
                <div className="input-area">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type a message..."
                  className="chat-input"
                />
                <button onClick={SendMessage} className="send-btn">
                  Send
                </button>
              </div>
              </div>
            )}
          </div>
      </Draggable>
  );
};

export default ChatBox;