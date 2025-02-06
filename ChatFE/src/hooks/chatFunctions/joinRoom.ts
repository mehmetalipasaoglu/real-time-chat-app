import { HubConnection } from '@microsoft/signalr';
import { loadMessages } from './loadMessages';

export const joinRoom = async (
  connection: HubConnection,
  room: string,
  username: string,
  setCurrentRoom: (room: string) => void,
  setMessages: (messages: { userName: string; message: string; timestamp: string; content: string }[]) => void
): Promise<void> => {
  if (connection) {
    setMessages([]); // Odaya katıldığında mevcut mesajları temizle
    await connection.invoke('JoinSpecificChatRoom', { username: username, chatRoom: room });
    setCurrentRoom(room);
    await loadMessages(room, setMessages); // Oda mesajlarını yükle
  }
};
