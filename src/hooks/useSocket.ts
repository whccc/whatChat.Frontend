import { useState } from "react";
import socketIOClient, { Socket } from "socket.io-client";
import useUser from "./useUser";
const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const user = useUser().getUserLogin();

  const conectionSocket = () => {
    console.log("sockerttt,assa");
    const conection = socketIOClient("https://192.168.20.5:4000", {
      query: { idUser: user!.idUnique },
    });
    setSocket(conection as Socket);
    return conection;
  };

  return { socket, conectionSocket };
};

export default useSocket;
