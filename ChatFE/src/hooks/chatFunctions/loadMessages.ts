import axios from 'axios';

interface Message {
  userName: string;
  message: string;
  timestamp: string;
  content: string;
}

export const loadMessages = async (room: string,
  setMessages: (messages: Message[]) => void
): Promise<void> => {
  try {
    const response = await axios.get(`/api/messages/${room}`);
    const fetchedMessages: Message[] = response.data;
    setMessages(fetchedMessages); // Mesajları state'e kaydet
  } catch (error) {
    console.error('Error loading messages:', error);
  }
};
