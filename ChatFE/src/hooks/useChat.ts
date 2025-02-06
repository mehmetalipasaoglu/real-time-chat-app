import { useState, useEffect, useRef } from 'react';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { joinRoom } from './chatFunctions/joinRoom';
import { sendMessage } from './chatFunctions/sendMessage';
import { uploadFile } from './chatFunctions/uploadFile';

interface Message {
  userName: string;
  message: string;
  timestamp: string;
  content: string;
}

const useChat = (initialRoom: string, username: string, isAuthenticated: boolean) => {
  console.log("useChat called");

  // State hook'ları
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentRoom, setCurrentRoom] = useState(initialRoom);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const initialRender = useRef(true);
  // useEffect ile SignalR bağlantısını kur
  useEffect(() => {
    console.log("useEffect triggered");

    if (!isAuthenticated || connection) return; // Kullanıcı oturum açmamışsa veya zaten bağlantı varsa kurma

    const connect = async () => {
      console.log("Connecting to SignalR");
      const conn = new HubConnectionBuilder()
        .withUrl('http://localhost:5207/chat')
        .configureLogging(LogLevel.Information)
        .build();

      conn.on('ReceiveSpecificMessage', (userName: string, message: string, timestamp: string, content: string) => {
        console.log("Message received:", message);
        setMessages((prevMessages) => [...prevMessages, { userName, message, timestamp, content }]);
      });

      conn.on('UpdateUserList', (users: string[]) => {
        setOnlineUsers(users);
      });

      conn.onclose(error => {
        console.error('Connection closed with error:', error);
      });

      await conn.start();
      setConnection(conn);
      console.log("SignalR connected");
    };

    connect();

    return () => {
      if (connection) {
        console.log("Stopping SignalR connection");
        connection.stop();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    console.log("messages updated:", messages);
  }, [messages]);


  return {
    messages,
    sendMessage: (message: string) => {
      if (connection) {
        console.log("Sending message:");
        sendMessage(connection, message);
      }
    },
    joinRoom: (room: string) => {
      if (connection) {
        console.log("Joining room:", room);
        joinRoom(connection, room, username, setCurrentRoom, setMessages);
      }
    },
    currentRoom,
    onlineUsers,
    uploadFile: (file: File) => {
      if (connection) {
        console.log("Uploading file:");
        uploadFile(connection, file);
      }
    },
  };
};

export default useChat;
