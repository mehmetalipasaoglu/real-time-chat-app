import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import styles from './Sidebar.module.css';

interface SidebarProps {
  rooms: string[];
  joinRoom: (room: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ rooms, joinRoom }) => {
  return (
    <div className={styles.sidebar}>
      <List>
        {rooms.map((room) => (
          <ListItem button key={room} onClick={() => joinRoom(room)} className={styles.listItem} >
            <ListItemText primary={room} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
