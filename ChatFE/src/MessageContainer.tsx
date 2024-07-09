import React from 'react';
import { Box, Typography } from '@mui/material';

interface Message {
  userName: string;
  message: string;
}

interface Props {
  messages: Message[];
}

const MessageContainer: React.FC<Props> = ({ messages }) => {
  return (
    <Box sx={{ maxWidth: '600px', width: '100%', margin: '0 auto', padding: '1rem' }}>
      {messages.map((message, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginBottom: '1rem',
            padding: '0.5rem',
            borderRadius: '8px',
            backgroundColor: '#f1f1f1',
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#007bff' }}>
            {message.userName}
          </Typography>
          <Typography variant="body1" sx={{ marginLeft: '0.5rem' }}>
            {message.message}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default MessageContainer;
