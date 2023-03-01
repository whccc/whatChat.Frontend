import { useRouter } from "next/router";
import { TypesChat } from "../constants/typesChat";
import { IChatOf } from "../features/chat/models/chat.model";
import { IChat, IUser } from "../features/login/models/login.model";

export default function useUser() {
  const router = useRouter();
  //Obtener Usuario Logueado
  const getUserLogin = (): IUser | null => {
    if (typeof localStorage === "undefined") {
      return null;
    }

    return localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData") || "")
      : null;
  };
  //Crear usuario logueado
  const setUserLogin = (valueItem: IUser): void => {
    localStorage.setItem("userData", JSON.stringify(valueItem));
  };

  const createChatUser = (chatData: IChat) => {
    const user = JSON.parse(localStorage.getItem("userData") || "") as IUser;
    const chat = user.dataChats;
    chat.push(chatData);
    setUserLogin(user);
  };

  const getCountChatsOfUser = () => {
    const user = JSON.parse(localStorage.getItem("userData") || "") as IUser;
    return user.dataChats.length;
  };

  const addNewMessageChatUser = (
    message: string,
    idChat: string,
    of: IChatOf
  ) => {
    const user = JSON.parse(localStorage.getItem("userData") || "") as IUser;
    const chat = user.dataChats;
    if (chat) {
      const chatsOrder = orderChat(chat, idChat, message, of);
      user.dataChats = chatsOrder;
      setUserLogin(user);
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

  const deleteUserLogin = () => {
    localStorage.removeItem("userData");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/Login");
  };

  const createJsonChatUser = (idChat: string, userOther: IUser) => {
    const user = JSON.parse(localStorage.getItem("userData") || "") as IUser;
    const { idUnique, userName, picture } = user;
    return {
      idChat,
      members: [
        {
          idUnique,
          userName,
          picture,
        },
        {
          idUnique: userOther.idUnique,
          userName: userOther.userName,
          picture: userOther.picture,
        },
      ],
      messages: [],
      typeChat: TypesChat.oneToOne,
      order: getCountChatsOfUser(),
      isWriting: false,
    } as IChat;
  };
  return {
    getUserLogin,
    setUserLogin,
    deleteUserLogin,
    addNewMessageChatUser,
    createChatUser,
    getCountChatsOfUser,
    createJsonChatUser,
  };
}
