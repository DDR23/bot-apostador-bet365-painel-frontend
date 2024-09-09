import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

const GetSocket = () => {
  if (!socket) socket = io(`${import.meta.env.VITE_URL_BACKEND}`);
  if (!socket) throw new Error('Falha ao criar a conexão com socket');
  return socket;
};

export default GetSocket;
