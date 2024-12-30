import React, { useState } from "react";
import "./taskbar.css";
import ScrollableBlock from "./chatbox/slidableWindow";
import ChatInput from "./textSend";
import MessageComponent from "./chatbox/messageBubble";
import { useCameraState } from '../contexts/cameraPositionContext';

interface ChatMessage {
  message: string;
  sender: string;
}

interface LabHelperMainProps {}

const LabHelperMain: React.FC<LabHelperMainProps> = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { setPosition } = useCameraState();

  const handleSendMessage = async (newMessage: string) => {
    const newChatMessage: ChatMessage = { message: newMessage, sender: "user" };
  
    // Update the local message list immediately
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, newChatMessage];
      // Keep only the last 20 messages
      if (updatedMessages.length > 20) {
        updatedMessages.shift(); // Remove the oldest message
      }
      return updatedMessages;
    });
  
    // Call the Django API
    try {
      const response = await fetch("http://127.0.0.1:8000/chat/predict_intentions/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: newMessage }),
      });
  
      if (!response.ok) {
        console.error("Failed to send message:", response.statusText);
        return;
      }
  
      const data = await response.json();
      if (data.general_intention === "where") {
        console.error("Pointing to the object: ", data.object_intention);
        setPosition(data.object_intention);
      }
      const botMessage: ChatMessage = {
        message: `General Intention: ${data.general_intention} (${data.general_confidence})\nObject Intention: ${data.object_intention} (${data.object_confidence})`,
        sender: "bot",
      };
  
      // Add the bot's response to the messages
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, botMessage];
        // Keep only the last 20 messages
        if (updatedMessages.length > 20) {
          updatedMessages.shift(); // Remove the oldest message
        }
        return updatedMessages;
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };  

  return (
    <>
      <div className="page-background">
        <ScrollableBlock>
          {messages.map((msg, index) => (
            <MessageComponent key={index} message={msg.message} sender={msg.sender} />
          ))}
        </ScrollableBlock>
        <ChatInput onSend={handleSendMessage} />
      </div>
      <p className="ai-helper-footer">
        AI Helper trained with our own intention model + FastText
      </p>
    </>
  );  
};

export default LabHelperMain;
