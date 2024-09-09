import { TypeConfig } from "../types/TypeConfig";
import GetSocket from "./GetSocket";
import ProviderNotification from "./ProviderNotification";

export default function ProviderInitBot(config: TypeConfig) {
  const socket = GetSocket();

  const handleEntryPostRes = (response: { title: string, message: string }) => {
    const { title, message } = response;
    ProviderNotification({ title, message });

    socket.off('ENTRY_POST_RES', handleEntryPostRes);
  };
  socket.on('ENTRY_POST_RES', handleEntryPostRes);

  socket.emit('ENTRY_POST', config);
}
