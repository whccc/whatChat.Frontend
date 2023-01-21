import * as React from "react";
import { IChatWriting } from "../features/chat/models/chat.model";
import { IChat } from "../features/login/models/login.model";

const chatsContext = React.createContext({
  chats: [] as Array<IChat>,
  updateAddNewChat: (_data: IChat) => {},
  addNewMessageChat: (_message: string, _idChat: string) => {},
  chatByIdHookChatsHookChats: (_idChat: string): IChat | undefined => {
    return {} as IChat;
  },
  writingChat: (_data: IChatWriting) => {},
});

export default chatsContext;
