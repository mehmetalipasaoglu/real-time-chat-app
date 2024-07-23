import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import styles from './RegisterForm.module.css';

interface Props {
  setAuthMode: (mode: string) => void;
}

const RegisterForm: React.FC<Props> = ({ setAuthMode }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/register', { username, password });
      alert(response.data);
      setAuthMode('login');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error response:', error.response);
        alert('Registration failed: ' + (error.response?.data || error.message));
      } else {
        console.error('Error:', error);
        alert('Registration failed: ' + error);
      }
    }
  };

  return (
    <div className={styles.authFormContainer}>
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
        <p onClick={() => setAuthMode('login')}>Already have an account? Login</p>
      </form>
    </div>
  );
};

export default RegisterForm;
