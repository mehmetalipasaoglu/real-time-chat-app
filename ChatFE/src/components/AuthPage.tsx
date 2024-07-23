import React, { useState } from 'react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

const AuthPage = ({ setIsAuthenticated, setUsername }: { setIsAuthenticated: (value: boolean) => void, setUsername: (value: string) => void }) => {
  const [authMode, setAuthMode] = useState('login');

  return (
    <div className="auth-page-container">
      {authMode === 'login' ? (
        <LoginForm setAuthMode={setAuthMode} setIsAuthenticated={setIsAuthenticated} setUsername={setUsername} />
      ) : (
        <RegisterForm setAuthMode={setAuthMode} />
      )}
    </div>
  );
};

export default AuthPage;
