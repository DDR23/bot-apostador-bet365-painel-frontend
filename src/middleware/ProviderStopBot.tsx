import { TypeConfig } from "../types/TypeConfig";
import GetSocket from "../utils/GetSocket";
import ProviderNotification from "../utils/ProviderNotification";

export default function ProviderStopBot(config: TypeConfig) {
  const socket = GetSocket();

  const handleConfigPutRes = (response: { title: string, message: string, data: TypeConfig }) => {
    const { title, message, data } = response;
    if (title === 'Erro') ProviderNotification({ title, message });
    if (title === 'Sucesso') socket.emit('SCRAPER_STOP', data);
    socket.off('CONFIG_PUT_RES', handleConfigPutRes);
  };
  socket.on('CONFIG_PUT_RES', handleConfigPutRes);

  socket.emit('CONFIG_PUT', config._id, { CONFIG_STATUS: false });
}







// ESSA PARTE DE BAIXO DEVE SER OUVIDA NAS PAGES

//   const handleEntryPostRes = (response: { title: string, message: string }) => {
//     const { title, message } = response;
//     ProviderNotification({ title, message });

//     socket.off('ENTRY_POST_RES', handleEntryPostRes);
//   };
//   socket.on('ENTRY_POST_RES', handleEntryPostRes);