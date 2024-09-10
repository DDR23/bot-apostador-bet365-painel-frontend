import { TypeConfig } from "../types/TypeConfig";
import GetSocket from "./GetSocket";
import ProviderNotification from "./ProviderNotification";

export default function ProviderStopBot(config: TypeConfig) {
  const socket = GetSocket();

  const handleConfigPutRes = (response: { title: string, message: string, data: TypeConfig }) => {
    const { title, message, data } = response;
    console.log('bot parado', data)
    if (title === 'Erro') ProviderNotification({ title, message })
    ProviderNotification({ title, message: 'Bot foi parado!' });

    // if (title === 'Sucesso') {
    //   const handleEntryPostRes = (response: { title: string, message: string }) => {
    //     const { title, message } = response;
    //     ProviderNotification({ title, message });
    
    //     socket.off('ENTRY_POST_RES', handleEntryPostRes);
    //   };
    //   socket.on('ENTRY_POST_RES', handleEntryPostRes);
    
    //   socket.emit('ENTRY_POST', data);
    // }

    socket.off('CONFIG_PUT_RES', handleConfigPutRes);
  };
  socket.on('CONFIG_PUT_RES', handleConfigPutRes);

  socket.emit('CONFIG_PUT', config._id, { CONFIG_STATUS: false });
}
