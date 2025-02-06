import { useState } from 'react';
import AuthPage from './components/AuthPage';
import { Box } from '@mui/material';
import styles from './App.module.css';
import MainApp from './MainApp';

// Uygulamanın ana bileşeni
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  return ( 
    <Box className={styles.app}>
      {isAuthenticated ? ( console.log("isAuthenticated:true"),
        <MainApp username={username} />
      ) : (
        <AuthPage setIsAuthenticated={setIsAuthenticated} setUsername={setUsername} />
      )}
    </Box>
  );
};

export default App;
