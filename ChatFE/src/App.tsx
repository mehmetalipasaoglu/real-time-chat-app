import React, { useState } from 'react';
import ChatRoom from './components/Chatroom';
import AuthPage from './components/AuthPage';
import useChat from './hooks/useChat';
import Sidebar from './components/Sidebar';
import { Box } from '@mui/material';
import styles from './App.module.css';
import Navbar from './components/Navbar';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const { messages, sendMessage, joinRoom, currentRoom, onlineUsers, uploadFile } = useChat('', username);
  const rooms = ['General', 'Tech', 'Gaming', 'Music', 'Movies', 'Sports', 'News', 'Travel', 'Food', 'Random'];

  return (
    <Box className={styles.app}>
      {isAuthenticated ? (
      <>
          <Navbar title="Chat Application" currentRoom={currentRoom} onlineUsers={onlineUsers} />        <Box className={styles.container}>
          <Sidebar rooms={rooms} joinRoom={joinRoom} />
          <Box className={styles.chatContainer}>
            <ChatRoom
              messages={messages}
              sendMessage={sendMessage}
              joinRoom={joinRoom}
              currentRoom={currentRoom}
              uploadFile={uploadFile}
              />
          </Box>
        </Box>
      </>
      ) : (
        <AuthPage setIsAuthenticated={setIsAuthenticated} setUsername={setUsername} />
      )}
    </Box>
  );
};

export default App;
