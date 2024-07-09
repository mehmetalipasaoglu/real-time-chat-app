import React, { useState } from 'react';
import { TextField, Box, Button } from '@mui/material';

interface Props {
  sendMessage: (message: string) => void;
}

const SentMessagForm: React.FC<Props> = ({ sendMessage }) => {
  const [message, setMessage] = useState('');

  const onSubmit = () => {
    if (message.trim() !== '') {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}
    >
      <TextField
        label="Message"
        variant="outlined"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <Button
        variant="outlined"
        onClick={onSubmit}
        sx={{
          border: '1px solid black',
          borderRadius: '2rem'
        }}
      >
        Send
      </Button>
    </Box>
  );
};

export default SentMessagForm;
