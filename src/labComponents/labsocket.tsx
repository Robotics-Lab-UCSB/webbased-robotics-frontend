import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';

const WebSocketComponent: React.FC = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        const ws = new WebSocket('ws://127.0.0.1:8083/');

        ws.onopen = () => {
            console.log('WebSocket connection established');
        };

        ws.onmessage = (event: MessageEvent) => {
            setMessages((prevMessages) => [...prevMessages, event.data]);
            console.log('Message from server:', event.data);
        };

        ws.onerror = (error: Event) => {
            console.error('WebSocket error:', error);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        setSocket(ws);

        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.close();
            }
        };
    }, []);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (socket && message) {
            socket.send(message);
            setMessage('');
        }
    };

    return (
        <div>
            <h1>WebSocket Test</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={message}
                    onChange={handleChange}
                    placeholder="Type a message"
                />
                <button type="submit">Send</button>
            </form>
            <div>
                <h2>Messages:</h2>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default WebSocketComponent;
