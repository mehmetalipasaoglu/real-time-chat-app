import React, { useState } from 'react';
import { TextField, Box, Button } from '@mui/material';

interface Props {
  joinChatRoom: (userName: string, chatRoom: string) => void;
}

const WaitingRoom: React.FC<Props> = ({ joinChatRoom }) => {
  const [userName, setUserName] = useState('');
  const [chatRoom, setChatRoom] = useState('');

  const handleJoin = () => {
    if (userName.trim() !== '' && chatRoom.trim() !== '') {
      joinChatRoom(userName, chatRoom);
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
        label="Username"
        variant="outlined"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <TextField
        label="Chat Room"
        variant="outlined"
        value={chatRoom}
        onChange={(e) => setChatRoom(e.target.value)}
      />

      <Button
        sx={{
          border: '1px solid black',
          borderRadius: '2rem'
        }}
        onClick={handleJoin}
      >
        Join
      </Button>
    </Box>
  );
};

export default WaitingRoom;
