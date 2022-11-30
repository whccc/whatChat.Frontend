import * as React from "react";
import { Socket } from "socket.io-client";

const conectionSocketIOContext = React.createContext<Socket | null>(null);

export default conectionSocketIOContext;
