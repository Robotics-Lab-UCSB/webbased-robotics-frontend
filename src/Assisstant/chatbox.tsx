import React, { useEffect } from 'react';
import { useState, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp,faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Rnd } from 'react-rnd';
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
  const contentRef = useRef<HTMLDivElement>(null)
  const theInput = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<string[]>([]); // State to store messages

  const SendMessage = (event: React.FormEvent) => {
    event.preventDefault();
    const message = theInput.current?.value.trim(); // Get the input value directly
    if (message) {
      setMessages([...messages, message]); // Add the new message to the list
      if(theInput.current) theInput.current.value = ''; // Clear the input field
    }
  };

  useEffect(()=>{
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight; // Scroll to bottom
    }
  }, [messages]);

  return (
    <Rnd
    className="resize-container"
    minWidth={t_width}
    minHeight={t_height}
    default={{ x : 100, y: 100, width: t_width, height: t_height}}
    dragHandleClassName='drag-handle'
    >
      <div className={`chat-box ${isOpen ? 'open' : ''}`} style={{ backgroundColor: color, width: t_width, height: t_height}}>
        <div className="drag-handle">
          <div className="close-btn" onClick={toggleChatBox}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </div>
        </div>
        {isOpen && (
          <div className='contentAndInput'>
            <div className="content" ref={contentRef}>
              {messages.map((message, index) => (
                <MessageBubble
                id={index}
                text={message}
                onClick={onMessageClick}
                />
              ))}
            </div>
            <form className="input-area" onSubmit={SendMessage}>
              <input
                className="chat-input"
                type="text"
                ref={theInput}                  
                placeholder="Type a message..."
              />
              <button type="submit" className="send-btn">
                <FontAwesomeIcon icon={faArrowUp} />
              </button>
            </form>
          </div>
          )}
        </div>
    </Rnd>
  );
};

export default ChatBox;