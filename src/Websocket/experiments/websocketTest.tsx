import React, { useEffect, useState } from 'react';

const WebSocketComponent: React.FC = () => {
    const [message, setMessage] = useState<string>(''); // Message received from the server
    const [input, setInput] = useState<string>(''); // Message to send to the server
    const [ws, setWs] = useState<WebSocket | null>(null); // WebSocket instance

    useEffect(() => {
        // Create a new WebSocket connection
        const websocket = new WebSocket('ws://localhost:8080');
        setWs(websocket);

        // Event handler for when the connection opens
        websocket.onopen = () => {
            console.log('Connected to WebSocket server');
        };

        // Event handler for when a message is received from the server
        websocket.onmessage = (event) => {
            console.log('Message from server:', event.data);
            setMessage(event.data); // Update state with the server message
        };

        // Event handler for errors
        websocket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        // Cleanup on component unmount
        return () => {
            websocket.close();
            console.log('WebSocket connection closed');
        };
    }, []); // Empty dependency array to only run on mount/unmount

    // Handler for sending a message to the server
    const sendMessage = () => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(input); // Send the input message to the server
            setInput(''); // Clear the input field
        } else {
            console.log('WebSocket is not open.');
        }
    };

    return (
        <div>
            <h1>WebSocket Connection</h1>
            <p>Message from server: {message}</p>

            <div>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)} // Update input as user types
                    placeholder="Enter a message"
                />
                <button onClick={sendMessage}>Send Message</button>
            </div>
        </div>
    );
};

export default WebSocketComponent;
