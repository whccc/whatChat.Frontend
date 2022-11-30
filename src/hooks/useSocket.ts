import { useState } from "react";
import socketIOClient, { Socket } from "socket.io-client";
import useUser from "./useUser";
const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const user = useUser().getUserLogin();

  const conectionSocket = () => {
    const conection = socketIOClient("http://localhost:4000", {
      query: { idUser: user!.idUnique },
    });
    setSocket(conection as Socket);
    return conection;
  };

  return { socket, conectionSocket };
};

export default useSocket;
