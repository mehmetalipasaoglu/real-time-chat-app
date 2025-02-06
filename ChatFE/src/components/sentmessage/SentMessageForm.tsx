import React, { useState, useRef } from 'react';
import { TextField, Box, Button } from '@mui/material';
import styles from './SentMessageForm.module.css';

interface Props {
  sendMessage: (message: string) => void;
  uploadFile: (file: File) => Promise<void>;
}

const SentMessageForm: React.FC<Props> = ({ sendMessage, uploadFile }) => {
  const [message, setMessage] = useState(''); // Mesaj durumunu tutar
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Dosya girişi için referans

  //Form gönderildiğinde çağrılan işlev
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) { // Mesaj boş değilse
      sendMessage(message); // Mesajı gönder
      setMessage('');
    }
    if (fileInputRef.current && fileInputRef.current.files && fileInputRef.current.files[0]) {
      const file = fileInputRef.current.files[0];
      await uploadFile(file); // Dosyayı yükle
      fileInputRef.current.value = ''; // Dosya giriş alanını sıfırlamak için
    }
  }

  return (
    <Box component="form" onSubmit={onSubmit} className={styles.formContainer}>
      <TextField
        label="Message"
        variant="outlined"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className={styles.textField}
        InputProps={{ style: { color: 'white' } }}
        InputLabelProps={{ style: { color: 'white' } }}
        fullWidth
      />
      <input
        type="file"
        ref={fileInputRef}
        className={styles.fileInput}
      />
      <Button type="submit" className={styles.button}>
        <span className={styles.buttonText}>Send</span>
      </Button>
    </Box>
  );
};

export default SentMessageForm;
