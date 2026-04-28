import { useState, useEffect } from 'react';

export default function ChatWorkspace() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:26800/ws/1');
    setSocket(newSocket);

    newSocket.onmessage = (event) => {
      setMessages(prev => [...prev, event.data]);
    };

    return () => newSocket.close();
  }, []);

  const sendMessage = () => {
    if (socket && message) {
      socket.send(message);
      setMessage('');
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4 h-[600px]">
      <div className="col-span-1 bg-gray-100 p-4 rounded">
        <h2 className="font-bold mb-4">Каналы</h2>
      </div>
      <div className="col-span-3 bg-gray-100 p-4 rounded flex flex-col">
        <div className="flex-grow space-y-2 overflow-y-auto">
          {messages.map((msg, i) => (
            <div key={i} className="p-2 rounded bg-white">
              {msg}
            </div>
          ))}
        </div>
        <div className="mt-4 flex">
          <input 
            type="text" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            className="border p-2 w-full rounded"
          />
          <button onClick={sendMessage} className="bg-blue-500 text-white p-2 rounded ml-2">Send</button>
        </div>
      </div>
    </div>
  );
}
