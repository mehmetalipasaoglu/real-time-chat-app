import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import styles from './ChatRoom.module.css';
import SentMessageForm from './SentMessageForm';

interface Props {
  messages: { userName: string; message: string; timestamp: string }[];
  sendMessage: (message: string) => void;
  joinRoom: (room: string) => void;
  currentRoom: string;
  uploadFile: (file: File) => Promise<void>;
}

const ChatRoom: React.FC<Props> = ({ messages, sendMessage, uploadFile }) => {
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const isFileMessage = (message: string) => {
    return message.startsWith('File uploaded: ') && message.includes('(')&& message.includes(')');
  };

  const renderMessageContent = (message: string) => {
    if (isFileMessage(message)) {
      const fileMessage = message.replace('File uploaded: ', '');
      const fileName = fileMessage.split(' (')[0];
      const fileUrl = fileMessage.split(' (')[1].replace(')', '');
      return (
        <Box className={styles.fileMessage}>
          <span>{fileName}</span>
          <a href={fileUrl} download={fileName} className={styles.downloadButton}>Download</a>
        </Box>
      );
    }
    return message;
  };
  return (
    <Box className={styles.chatRoom}>
      <Box className={styles.messageContainer}>
        {messages.map((msg, index) => (
          <Box key={index} className={styles.message}>
            <strong>{msg.userName}</strong>: {renderMessageContent(msg.message)} <span className={styles.timestamp}>{msg.timestamp}</span>
          </Box>
        ))}
        <div ref={messageEndRef}></div>
      </Box>
      <SentMessageForm sendMessage={sendMessage} uploadFile={uploadFile}/>
    </Box>
  );
};

export default ChatRoom;
