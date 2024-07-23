import React, { useState } from 'react';
import axios from 'axios';
import styles from './LoginForm.module.css';

interface Props {
  setAuthMode: (mode: string) => void;
  setIsAuthenticated: (value: boolean) => void;
  setUsername: (value: string) => void;
}

const LoginForm: React.FC<Props> = ({ setAuthMode, setIsAuthenticated, setUsername }) => {
  const [username, setUsernameLocal] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { username, password });
      alert(response.data);
      setIsAuthenticated(true); // Başarılı girişten sonra kullanıcıyı oturum açmış olarak işaretle
      setUsername(username); // Kullanıcı adını ayarla
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data || error.message);
        alert('Login failed: ' + (error.response?.data || error.message));
      } else if (error instanceof Error) {
        console.error(error.message);
        alert('Login failed: ' + error.message);
      } else {
        console.error('Unexpected error', error);
        alert('Login failed: An unexpected error occurred');
      }
    }
  };

  return (
    <div className={styles.authFormContainer}>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsernameLocal(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <p onClick={() => setAuthMode('register')}>Don't have an account? Register</p>
      </form>
    </div>
  );
};

export default LoginForm;
