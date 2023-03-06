import { useContext, useState } from "react";
import chatsContext from "../../../context/chatsContext";
import { IChat } from "../../login/models/login.model";
import { IChatOf, IChatWriting } from "../models/chat.model";

const useChats = () => {
  const [chats, setChats] = useState<Array<IChat>>([]);

  const updateAddNewChat = (chatNew: IChat) => {
    setChats((odlData) => [...odlData, chatNew]);
    console.log(chatNew, "creando nuevo chat", chats.length);
  };

  const addNewMessageChat = (message: string, idChat: string, of: IChatOf) => {
    const chat = chats.find((c) => c.idChat === idChat);
    console.log(chats, "ol chta");
    if (chat) {
      const chatsOrder = orderChat([...chats], idChat, message, of);
      console.log(chatsOrder, "chatss");
      setChats(chatsOrder);
    }
  };

  const orderChat = (
    chats: Array<IChat>,
    idChat: string,
    message: string,
    of: IChatOf
  ) => {
    for (const [i, chat] of chats.entries()) {
      chat.order = i + 1;
      if (chat.idChat === idChat) {
        chat.order = 0;
        chat.messages.push({ message, of });
      }
    }
    return chats;
  };

  const chatByIdHookChatsHookChats = (idChat: string) => {
    console.log(chats.length, "desde el hook", chats, chats);
    return chats.find((c) => c.idChat === idChat);
  };

  const writingChat = (data: IChatWriting) => {
    const chatIndex = chats.findIndex((c) => c.idChat === data.idChat);
    console.log(chatIndex, chats, "writting");
    if (chatIndex >= 0) {
      const newChats = [...chats];
      newChats[chatIndex].isWriting = data.writing;
      setChats(newChats);
    }
  };

  return {
    chats,
    updateAddNewChat,
    addNewMessageChat,
    chatByIdHookChatsHookChats,
    writingChat,
  };
};

export default useChats;
