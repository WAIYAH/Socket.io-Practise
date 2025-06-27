import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:3000');

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    socket.on('receive-message', ({ username, message }) => {
      setMessages((prev) => [...prev, `${username}: ${message}`]);
    });

    socket.on('user-joined', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on('user-left', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('receive-message');
      socket.off('user-joined');
      socket.off('user-left');
    };
  }, []);

  const joinRoom = () => {
    if (username && room) {
      socket.emit('join-room', { room, username });
      setIsJoined(true);
    }
  };

  const sendMessage = () => {
    if (message) {
      socket.emit('send-message', { room, message, username });
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Real-Time Chat App</h1>
      {!isJoined ? (
        <div>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            placeholder="Room name"
          />
          <button onClick={joinRoom}>Join Room</button>
        </div>
      ) : (
        <div>
          <h3>Room: {room}</h3>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
          />
          <button onClick={sendMessage}>Send</button>
          <ul>
            {messages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;