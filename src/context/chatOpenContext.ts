import React from "react";
import { IChat } from "../features/login/models/login.model";

const chatOpenContext = React.createContext({
  data: {
    idChat: null,
    members: [],
    messages: [],
    typeChat: null,
  } as IChat,
  updateChatOpen: (_dataMessage: IChat) => {},
  updateMessageChatOpen: (_message: string) => {},
});

export default chatOpenContext;
