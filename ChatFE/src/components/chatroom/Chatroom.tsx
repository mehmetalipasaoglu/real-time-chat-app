import { Box } from '@mui/material';
import styles from './ChatRoom.module.css';
import SentMessageForm from '../sentmessage/SentMessageForm';
import React from 'react';

interface Props {
  messages: { userName: string; message: string; timestamp: string; content: string }[];
  sendMessage: (message: string) => void;
  currentRoom: string;
  uploadFile: (file: File) => Promise<void>;
}

// Sohbet odası bileşeni
const ChatRoom: React.FC<Props> = ({ messages, sendMessage, uploadFile }) => {

  const renderMessageContent = (message: string) => {
    console.log('renderMessageContent triggered');

    // Mesajın dosya mesajı olup olmadığını kontrol eden mantık
    if (message && message.startsWith('File uploaded: ') && message.includes('(') && message.includes(')')) {
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
    else{return <span>{message}</span>;}
    
  };

  return (
    <Box className={styles.chatRoom}>
      <Box className={styles.messageContainer}>
        {messages && messages.length > 0 ? (
          messages.map((msg, index) => (
            <Box key={index} className={styles.message}>
              <strong>{msg.userName}</strong>: {renderMessageContent(msg.message)} 
              <span className={styles.content}>{msg.content}</span> 
              <span className={styles.timestamp}>{msg.timestamp}</span>
            </Box>
          ))
        ) : (
          <Box className={styles.noMessages}></Box>
        )}

      </Box>
      <SentMessageForm sendMessage={sendMessage} uploadFile={uploadFile} />
    </Box>
  );
};

export default React.memo(ChatRoom);
