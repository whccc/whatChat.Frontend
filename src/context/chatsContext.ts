import * as React from "react";

const conectionSocketIOContext = React.createContext({
  chats: [],
  setChats: (_data: string) => {},
});

export default conectionSocketIOContext;
