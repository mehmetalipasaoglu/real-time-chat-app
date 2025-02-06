// src/components/MainApp.tsx
import React from 'react';
import { Box } from '@mui/material';
import styles from './MainApp.module.css'
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import ChatRoom from './components/chatroom/Chatroom';
import useChat from './hooks/useChat';

interface MainAppProps {
  username: string;
}

const MainApp: React.FC<MainAppProps> = ({ username }) => {
  const { messages, sendMessage, joinRoom, currentRoom, onlineUsers, uploadFile } = useChat('', username, true);
  const rooms = ['Local 1', 'Local 2', 'Local 3', 'Local 4', 'Local 5', 'Local 6', 'Local 7', 'Local 8', 'Local 9'];

  return (
    <Box className={styles.mainApp}>
      <Navbar title="Chat Application" currentRoom={currentRoom} onlineUsers={onlineUsers} />
      <Box className={styles.container}>
        <Sidebar rooms={rooms} joinRoom={joinRoom} />
        <Box className={styles.chatContainer}>
          <ChatRoom
            messages={messages}
            sendMessage={sendMessage}
            currentRoom={currentRoom}
            uploadFile={uploadFile}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default MainApp;
