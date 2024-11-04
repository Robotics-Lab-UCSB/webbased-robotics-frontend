import React, { useEffect } from 'react';
import { useState, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp,faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Rnd } from 'react-rnd';
import './style.css'; // Import the external CSS
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
  onMessageClick: () => void; // New function prop for handling message click
}

const ChatBox: React.FC<ChatBoxProps> = ({ color, t_width, t_height, isOpen, toggleChatBox, onMessageClick }) => {
  const contentRef = useRef<HTMLDivElement>(null) // For the content box displayed
  const theInput = useRef<HTMLInputElement>(null); // For the input content
  const [theHeight, setHeight] = useState<string>((parseInt(t_height)-50).toString()+"px");
  const [messages, setMessages] = useState<Message[]>([]); // State to store messages

  const SendMessage = (event: React.FormEvent) => {
    event.preventDefault();
    const message = theInput.current?.value.trim(); // Get the input value directly
    if (message) {
      setMessages((prevMessages) => [...messages, {text: message, isUser: true}]); // Add the new message to the list
      if(theInput.current) theInput.current.value = ''; // Clear the input field
    }
  };

  useEffect(()=>{
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight; // Scroll to bottom
    }
  }, [messages]);

  useEffect(()=>{
    if (messages.length > 0 && messages[messages.length - 1].isUser) {
        setMessages((prevMessages) => [...prevMessages, { text: "Response", isUser: false }]);
     } 
  }, [messages]);

  return (
    <Rnd
    className="resize-container"
    minWidth={t_width}
    minHeight={t_height}
    default={{ x : window.innerWidth - parseInt(t_width, 10) - 20, y: 600, width: t_width, height: t_height}}
    enableResizing={{ top: true, bottom: true, left: false, right: false, topLeft: false, topRight: false, bottomLeft: false, bottomRight: false }}
    onResize={(e, direction, ref) => {
      setHeight((parseInt(ref.style.height)-50).toString()+"px")
    }}
    dragHandleClassName='drag-handle'
    >
      <div className={`chat-box ${isOpen ? 'open' : ''}`} style={{ backgroundColor: color, width: t_width, height: "100%"}}>
        <div className="drag-handle">
          <div className="close-btn" onClick={toggleChatBox}>
            <FontAwesomeIcon icon={faCircleXmark} /> Ask Questions
          </div>
        </div>
        {isOpen && (
          <div className='contentAndInput' style={{height:theHeight}}>
            <div className="content" ref={contentRef}>
              {messages.map((message, index) => (
                <MessageBubble
                id={index}
                text={message.text}
                onClick={onMessageClick}
                isUser={message.isUser}
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