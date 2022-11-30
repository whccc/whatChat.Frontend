import { useState } from "react";
import { IChat } from "../../login/models/login.model";

const useChatOpen = () => {
  const [chat, setChat] = useState<IChat>({
    idChat: null,
    members: [],
    messages: [],
    typeChat: null,
    order: 0,
    isWriting: false,
  });

  const updateChatOpen = (chatOpen: IChat) => {
    setChat({ ...chatOpen });
  };

  const updateMessageChatOpen = (message: string) => {
    setChat({ ...chat, messages: [...chat.messages, message] });
  };

  return { chat, updateChatOpen, updateMessageChatOpen };
};

export default useChatOpen;
