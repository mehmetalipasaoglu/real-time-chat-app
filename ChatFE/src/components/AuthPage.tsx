import React, { useState } from 'react';
import RegisterForm from './register/RegisterForm';
import LoginForm from './login/LoginForm';
import { Box } from '@mui/material';

// Kimlik doğrulama sayfası bileşeni
const AuthPage = ({ setIsAuthenticated, setUsername }: { setIsAuthenticated: (value: boolean) => void, setUsername: (value: string) => void }) => {
  // Başlangıçta 'login' modunda olan durum değişkeni
  const [authMode, setAuthMode] = useState('login');

  return (
    <Box className="auth-page-container">
      {authMode === 'login' ? (
        <LoginForm setAuthMode={setAuthMode} setIsAuthenticated={setIsAuthenticated} setUsername={setUsername} />
      ) : (
        <RegisterForm setAuthMode={setAuthMode} />
      )}
    </Box>
  );
};

export default AuthPage;
