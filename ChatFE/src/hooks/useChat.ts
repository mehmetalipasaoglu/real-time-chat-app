import { useState, useEffect } from 'react';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import axios from 'axios';

interface Message {
  userName: string;
  message: string;
  timestamp: string;
}

const useChat = (initialRoom: string, username: string) => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentRoom, setCurrentRoom] = useState(initialRoom);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    const connect = async () => {
      const connection = new HubConnectionBuilder()
        .withUrl('http://localhost:5207/chat')
        .configureLogging(LogLevel.Information)
        .build();

      connection.on('ReceiveSpecificMessage', (userName: string, message: string, timestamp: string) => {
        setMessages((prevMessages) => [...prevMessages, { userName, message, timestamp }]);
      });

      connection.on('UpdateUserList', (users: string[]) => {
        setOnlineUsers(users);
      });

      connection.onclose(error => {
        console.error('Connection closed with error:', error);
      });

      await connection.start();
      setConnection(connection);

      if (initialRoom) {
        await connection.invoke('JoinSpecificChatRoom', { username: username, chatRoom: initialRoom });
      }
    };

    connect();

    return () => {
      if (connection) {
        connection.stop();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialRoom, username]);

  const joinRoom = async (room: string) => {
    if (connection) {
      await connection.invoke('JoinSpecificChatRoom', { username: username, chatRoom: room });
      setCurrentRoom(room);
      setMessages([]);
    }
  };

  const sendMessage = async (message: string) => {
    if (connection) {
      await connection.invoke('SendMessage', message);
    } else {
      console.error('Cannot send data if the connection is not in the "Connected" state.');
    }
  };

  const uploadFile = async (file: File): Promise<void> => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const fileUrl = response.data.url;
      const fileName = file.name;
      if (fileUrl) {
        await sendMessage(`File uploaded: ${fileName} (${fileUrl})`);
      } else {
        console.error('File URL is undefined');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  
  return { messages, sendMessage, joinRoom, currentRoom, onlineUsers, uploadFile };
};

export default useChat;
