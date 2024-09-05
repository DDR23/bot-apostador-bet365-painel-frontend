import { TypeConfig } from "../types/TypeConfig";
import GetSocket from "./GetSocket";
import ProviderNotification from "./ProviderNotification";

//TODO - essa função deve emitir e ouvir evento de BOT não de CONFIG
export default function ProviderInitBot(config: TypeConfig) {
  const socket = GetSocket();
  const handleConfigPutRes = (response: { title: string, message: string }) => {
    const { title } = response;
    const message = 'bot iniciado'
    ProviderNotification({ title, message });

    socket.off('CONFIG_PUT_RES', handleConfigPutRes);
  };
  socket.on('CONFIG_PUT_RES', handleConfigPutRes);

  socket.emit('CONFIG_PUT', config._id, { CONFIG_STATUS: !config.CONFIG_STATUS });
}
