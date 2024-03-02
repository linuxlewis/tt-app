import { createContext } from "react";
import { Socket } from "socket.io-client";

import { socket } from "../socket";

const WebSocketContext = createContext<{ socket: Socket }>({ socket });

const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WebSocketContext.Provider value={{ socket }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export { WebSocketContext, WebSocketProvider };
