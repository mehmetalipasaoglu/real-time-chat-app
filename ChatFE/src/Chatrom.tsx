import React from "react";
import { Box } from "@mui/material";
import MessageContainer from "./MessageContainer";
import SentMessageForm from "./SentMessagForm"; // Renamed SentMessagForm to SentMessageForm for consistency

interface Props {
  messages: { userName: string; message: string }[];
  sendMessage: (message: string) => void; // Corrected prop name sendmessage to sendMessage
}

const Chatrom: React.FC<Props> = ({ messages, sendMessage }) => {
  return (
    <Box>
      <SentMessageForm sendMessage={sendMessage} /> {/* Corrected prop name sendmessage to sendMessage */}
      <MessageContainer messages={messages} />
    </Box>
  );
};

export default Chatrom;
