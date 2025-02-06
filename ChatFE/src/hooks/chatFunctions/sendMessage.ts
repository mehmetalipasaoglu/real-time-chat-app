import { HubConnection } from '@microsoft/signalr';

export const sendMessage = async (connection: HubConnection, message: string) => {
  if (connection) {
    await connection.invoke('SendMessage', message);
  } else {
    console.error('Cannot send data if the connection is not in the "Connected" state.');
  }
};
