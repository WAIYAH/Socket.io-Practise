import { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

function App() {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  return <h1>Socket.IO Test</h1>;
}

export default App;