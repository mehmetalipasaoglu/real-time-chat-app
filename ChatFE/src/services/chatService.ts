import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

export const createConnection = async (url: string): Promise<HubConnection> => {
  const connection = new HubConnectionBuilder()
    .withUrl(url)
    .configureLogging(LogLevel.Information)
    .build();

  try {
    await connection.start();
    console.log('Connected to the SignalR server.');
  } catch (error) {
    console.error('Error establishing connection:', error);
  }

  return connection;
};
