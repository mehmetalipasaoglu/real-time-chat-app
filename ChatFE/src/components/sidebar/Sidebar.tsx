import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import styles from './Sidebar.module.css';

interface SidebarProps {
  rooms: string[];
  joinRoom: (room: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ rooms, joinRoom }) => {
  // Bir odaya katılma işlevi, `joinRoom` fonksiyonunu çağırır
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleJoinRoom =(room: string) => {
    joinRoom(room);
  }
  
  return (
    <div className={styles.sidebar}>
      <List>
        {rooms.map((room) => (
          <ListItem button key={room} onClick={() => handleJoinRoom(room)} className={styles.listItem}>
            <ListItemText primary={room} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
