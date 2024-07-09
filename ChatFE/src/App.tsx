import { useState, useEffect } from "react";
import { Typography, Stack } from "@mui/material";
import WaitingRoom from "./WaitingRoom";
import { HubConnectionBuilder, LogLevel, HubConnection } from "@microsoft/signalr";
import Chatrom from "./Chatrom";

interface Message {
  userName: string;
  message: string;
}

function App() {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const joinChatRoom = async (userName: string, chatRoom: string) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("http://localhost:5207/chat")
        .configureLogging(LogLevel.Information)
        .build();

      // Set up handler for receiving messages
      connection.on("JoinSpecificChatRoom", (userName: string, message: string) => {
        console.log(userName, message);
      });

      connection.on("ReceiveSpecificMessage", (userName: string, message: string) => {
        setMessages((messages) => [...messages, { userName, message }]);
      });

      await connection.start();
      console.log("Connection started");

      await connection.invoke("JoinSpecificChatRoom", { username: userName, chatRoom });
      console.log("JoinSpecificChatRoom invoked");

      setConnection(connection);
    } catch (e) {
      console.log(e);
    }
  };

  const sendMessage = async (message: string) => {
    try {
      await connection?.invoke("SendMessage", message);
    } catch (error) {
      console.log(error)
    }
  }

  // Cleanup connection on component unmount
  useEffect(() => {
    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, [connection]);

  return (
    <Stack
      direction="column"
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          fontFamily: "sans-serif",
          fontStyle: "italic",
          padding: "10px",
        }}
      >
        Hello Chat App
      </Typography>
        { !connection
        ?<WaitingRoom joinChatRoom={joinChatRoom} />
        : 
          <Chatrom messages={messages} sendMessage={sendMessage}></Chatrom>
        }
      
    </Stack>
  );
}

export default App;
