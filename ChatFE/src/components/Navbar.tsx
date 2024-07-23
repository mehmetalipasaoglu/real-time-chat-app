import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import styles from './Navbar.module.css';

interface NavbarProps {
  title: string;
  currentRoom: string;
  onlineUsers: string[];
}

const Navbar: React.FC<NavbarProps> = ({ title, currentRoom, onlineUsers }) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <Box className={styles.navbar}>
      <Typography variant="h5" className={styles.title}>
        {title}
      </Typography>
      <Typography variant="h6" className={styles.currentRoom}>
        {currentRoom}
      </Typography>
      <Button onClick={toggleDropdown} className={styles.onlineButton}>
        Online Users
      </Button>
      {isDropdownOpen && (
        <Box className={styles.dropdown}>
          {onlineUsers.length > 0 ? (
            onlineUsers.map((user, index) => (
              <Typography key={index} className={styles.user}>
                {user}
              </Typography>
            ))
          ) : (
            <Typography className={styles.noUsers}>No users online</Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
