import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

const getSocket = () => {
  if (!socket) socket = io('http://localhost:8080');
  if (!socket) throw new Error('Falha ao criar a conexão com socket');
  return socket;
};

export default getSocket;
