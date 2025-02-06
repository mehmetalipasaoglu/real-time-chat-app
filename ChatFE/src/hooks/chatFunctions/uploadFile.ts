import { HubConnection } from '@microsoft/signalr';
import axios from 'axios';
import { sendMessage } from './sendMessage';

export const uploadFile = async (connection: HubConnection, file: File): Promise<void> => {
  const formData = new FormData();
  formData.append('file', file);
  try {
    const response = await axios.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    const fileUrl = response.data.url;
    const fileName = file.name;
    if (fileUrl) {
      await sendMessage(connection, `File uploaded: ${fileName} (${fileUrl})`); // Dosya URL'sini mesaj olarak gönder
    } else {
      console.error('File URL is undefined');
    }
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};
