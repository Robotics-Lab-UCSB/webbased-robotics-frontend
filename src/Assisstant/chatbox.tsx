import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import './style.css';
import MessageBubble from './messageBubble';

interface Message {
  text: string;
  isUser: boolean;
}

interface ChatBoxProps {
  color: string;
  t_width: string;
  t_height: string;
  isOpen: boolean;
  toggleChatBox: () => void;
  onMessageClick: () => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ color, t_width, t_height, isOpen, toggleChatBox, onMessageClick }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const theInput = useRef<HTMLInputElement>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  
  // Store previous position as a ref so it persists without re-rendering
  const previousPosition = useRef({ x: 0, y: 0 });
  const objectcenterPosition = useRef({ x: 0, y: 0 });
  // const [position, setPosition] = useState(previousPosition.current);

  const sendMessage = (event: React.FormEvent) => {
    event.preventDefault();
    const message = theInput.current?.value.trim();
    if (message) {
      setMessages((prevMessages) => [...prevMessages, { text: message, isUser: true }]);
      if (theInput.current) theInput.current.value = '';
    }
  };

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].isUser) {
      const timer = setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, { text: "Response", isUser: false }]);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    console.log("Center X:", centerX, "Center Y:", centerY);

    previousPosition.current = {
      x: e.clientX,
      y: e.clientY,
    };

  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !chatBoxRef.current) return;
  
    const changeX = e.clientX - previousPosition.current.x;
    const changeY = e.clientY - previousPosition.current.y;
  
    // Update the current position of the chat box with the new calculated changes
    objectcenterPosition.current.x = objectcenterPosition.current.x + changeX;
    objectcenterPosition.current.y = objectcenterPosition.current.y + changeY;    

    // Apply the transformation
    chatBoxRef.current.style.transform = `translate(${objectcenterPosition.current.x}px, ${objectcenterPosition.current.y}px)`;

    // Update the position state and set previousPosition to the new mouse coordinates
    previousPosition.current = { x: e.clientX, y: e.clientY };
};

  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={chatBoxRef}
      className={`chat-box ${isOpen ? 'open' : ''}`}
      style={{
        backgroundColor: color,
        width: t_width,
        height: t_height,
        position: 'absolute',
        // top: position.y,
        // left: position.x,
      }}
    >
      <div className="drag-handle" onMouseDown={handleMouseDown}>
        <div className="close-btn" onClick={toggleChatBox}>
          <FontAwesomeIcon icon={faCircleXmark} /> Ask Questions
        </div>
      </div>
      {isOpen && (
        <div className="contentAndInput" style={{ height: `calc(100% - 50px)` }}>
          <div className="content" ref={contentRef}>
            {messages.map((message, index) => (
              <MessageBubble
                key={index}
                id={index}
                text={message.text}
                onClick={onMessageClick}
                isUser={message.isUser}
              />
            ))}
          </div>
          <form className="input-area" onSubmit={sendMessage}>
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
  );
};

export default ChatBox;
