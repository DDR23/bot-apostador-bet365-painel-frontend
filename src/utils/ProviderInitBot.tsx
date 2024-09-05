import { TypeConfig } from "../types/TypeConfig";
import GetSocket from "./GetSocket";


export default function ProviderInitBot( config: TypeConfig) {
  const socket = GetSocket();
  socket.emit('CONFIG_PUT', config._id, { CONFIG_STATUS: !config.CONFIG_STATUS} )
}