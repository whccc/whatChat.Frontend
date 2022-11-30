import { Toast } from "primereact/toast";
import { useContext, useEffect, useRef } from "react";
import chatsContext from "../../../../context/chatsContext";
import conectionSocketIOContext from "../../../../context/conectionSocketContext";
import useUser from "../../../../hooks/useUser";
import { IChat, IUser } from "../../../login/models/login.model";
import ChatContainerChat from "../../components/chatContainerChat";
import ChatContainerChats from "../../components/chatContainerChats";
import { IDataMessage } from "../../models/chat.model";
import { Container, WrapperToastMessage } from "./styles";

const chatPage = () => {
  const toast = useRef<Toast>(null);
  const audio = useRef<HTMLAudioElement>(null);

  const socketIO = useContext(conectionSocketIOContext);
  const { chatByIdHookChatsHookChats, chats } = useContext(chatsContext);
  const { addNewMessageChatUser, getUserLogin, createJsonChatUser } = useUser();
  const { updateAddNewChat, addNewMessageChat } = useContext(chatsContext);

  useEffect(() => {
    console.log("useEff", chats.length);
    listeningToMessages();
    return () => {
      socketIO?.off("listeningToMessages");
    };
  }, []);

  const listeningToMessages = () => {
    socketIO!.on("listeningToMessages", (data: IDataMessage) => {
      console.log(chats.length, "lenggt");
      toast?.current?.show({
        severity: "success",
        summary: "Tiene un mensaje nuevo",
        detail: data.message,
      });
      audio.current?.play();
      addMessage(data);
    });
  };

  const createChatSocket = (chat: IChat) => {
    const { idUnique } = getUserLogin()!;
    socketIO!.emit("createChat", {
      idUserCreation: idUnique,
      chat: {
        ...chat,
        members: chat.members.map((m) => m.idUnique),
      },
    });
  };

  const addMessage = (dataMessage: IDataMessage) => {
    const { idChat, message } = dataMessage;
    if (!chatByIdHookChatsHookChats(idChat)) {
      const dataChat = createJsonChatUser(idChat, dataMessage.of as IUser);
      dataChat.order = -1;
      dataChat.messages.push(message);
      updateAddNewChat(dataChat);
    }
    setTimeout(() => {
      // addNewMessageChat(message, idChat);
      // addNewMessageChatUser(message, idChat);
      console.log("hook");
    }, 10000);
  };

  const p = () => {
    const dataChat = createJsonChatUser(
      "1b2882fa-f6d9-4286-9d19-b612c76d989c",
      {
        idUnique: "4aa5edf1-4a3a-42a4-a0c4-8f5a8b",
        userName: "s",
        picture: null,
      } as IUser
    );
    //  dataChat.messages.push(message);
    updateAddNewChat(dataChat);
    setTimeout(() => {
      console.log(chats.length, "bu");
    }, 10000);
  };
  return (
    <Container>
      <ChatContainerChats socketIO={socketIO} />
      <ChatContainerChat socketIO={socketIO} />
      <>
        <WrapperToastMessage>
          <Toast ref={toast} />
        </WrapperToastMessage>
        <audio ref={audio} src="/message.mp3"></audio>
      </>
      <button onClick={p}>s</button>
    </Container>
  );
};

export default chatPage;
