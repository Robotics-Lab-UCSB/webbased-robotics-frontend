import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  PropsWithChildren,
} from "react";

interface WebSocketContextType {
  sendMessage: (message: { type: string; payload?: any }) => void;
  registerHandler: (type: string, handler: (payload: any) => void) => void;
}

// Create a WebSocket context
const WebSocketContext = createContext<WebSocketContextType | null>(null);

interface WebSocketProviderProps {
  url: string;
  labID: string; 
}

export const WebSocketProvider: React.FC<PropsWithChildren<WebSocketProviderProps>> = ({
  url,
  labID, 
  children,
}) => {
  const socketRef = useRef<WebSocket | null>(null);
  const handlersRef = useRef<Map<string, (payload: any) => void>>(new Map());

  useEffect(() => {
    const ws = new WebSocket(url);
    socketRef.current = ws;

    ws.onopen = async () => {
      try {
        // Make a request to the Django endpoint to get verification token and email
        const response = await fetch("http://127.0.0.1:8000/auth/get_email_and_verification/", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ lab_id: labID }),
        });
    
        if (!response.ok) {
          throw new Error(`Django request failed: ${response.statusText}`);
        }
    
        const data = await response.json();

        ws.send(
          JSON.stringify({
            type: "initial_message",
            payload: {
              verification_token: data.verification_token,
              user_email: data.user_email,
              lab_id: data.lab_id,
            },
          })
        );

      } catch (error) {
        console.error("Error fetching verification token and email:", error);
      }
    };

    ws.onmessage = (event) => {
      try {
        if (!event.data || event.data === "null") { // Check if the message is null or empty
          console.log("state change")
          return;
        }
        const { type, payload } = JSON.parse(event.data);
        const handler = handlersRef.current.get(type);
        if (handler) {
          handler(payload); // Call the registered handler
        } else {
          console.warn(`No handler found for type: ${type}`);
        }
      } catch (err) {
        console.error("Error parsing WebSocket message:", err);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed. Attempting to reconnect...");
      setTimeout(() => {
        const newWs = new WebSocket(url);
        socketRef.current = newWs;
      }, 3000);
    };

    return () => {
      ws.close();
    };
  }, [url]);

  const sendMessage = (message: { type: string; payload?: any }) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    } else {
      console.error("WebSocket not connected.");
    }
  };

  const registerHandler = (type: string, handler: (payload: any) => void) => {
    handlersRef.current.set(type, handler); // Update the ref directly
  };

  return (
    <WebSocketContext.Provider value={{ sendMessage, registerHandler }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
