import { Toast } from "primereact/toast";
import React, { useContext, useEffect, useRef } from "react";
import chatsContext from "../../../../context/chatsContext";
import conectionSocketIOContext from "../../../../context/conectionSocketContext";
import useUser from "../../../../hooks/useUser";
import { IChat, IUser } from "../../../login/models/login.model";
import ChatContainerChat from "../../components/chatContainerChat";
import ChatContainerChats from "../../components/chatContainerChats";
import { IChatWriting, IDataMessage } from "../../models/chat.model";
import { Container, WrapperToastMessage } from "./styles";
import CallOrAnswer from "../../components/callOrAnswer";
import CallOrAnswerContext from "../../../../context/callOrAnswerContext";

const chatPage = () => {
  const toast = useRef<Toast>(null);
  const audio = useRef<HTMLAudioElement>(null);

  const socketIO = useContext(conectionSocketIOContext);
  const { chatByIdHookChatsHookChats, chats, writingChat } =
    useContext(chatsContext);
  const { onLeaveCall } = useContext(CallOrAnswerContext);
  const {
    addNewMessageChatUser,
    getUserLogin,
    createJsonChatUser,
    createChatUser,
  } = useUser();
  const { updateAddNewChat, addNewMessageChat } = useContext(chatsContext);

  useEffect(() => {
    listeningToMessages();
    endCallSocket();
    return () => {
      socketIO?.off("listeningToMessages");
      socketIO?.off("endCall");
    };
  }, [chats]);

  const listeningToMessages = () => {
    console.log("listeningToMessages");
    socketIO!.on("listeningToMessages", (data: IDataMessage) => {
      console.log("me llego mensaje listeningToMessages", data);
      toast?.current?.show({
        severity: "success",
        summary: "Tiene un mensaje nuevo",
        detail: data.message,
      });
      audio.current?.play();
      addMessage(data);
    });
  };

  const listeningNotWritingChat = () => {
    socketIO?.on("sendNotWritingChat", (data: IChatWriting) => {
      console.log("Estan escribiendo", data);
      writingChat(data);
    });
  };

  const listeningWritingChat = () => {
    socketIO?.on("sendWritingChat", (data: IChatWriting) => {
      console.log("Estan escribiendo", data);
      writingChat(data);
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
    const { idChat, message, of } = dataMessage;
    console.log(
      chatByIdHookChatsHookChats(idChat),
      "validando id chat",
      dataMessage
    );
    if (!chatByIdHookChatsHookChats(idChat)) {
      const dataChat = createJsonChatUser(idChat, dataMessage.of as IUser);
      dataChat.order = -1;
      dataChat.messages.push({ message, of });
      updateAddNewChat(dataChat);
      createChatUser(dataChat);
    } else {
      addNewMessageChatUser(message, idChat, of);
      addNewMessageChat(message, idChat, of);
    }
  };

  const endCallSocket = () => {
    socketIO?.on("endCall", (d) => {
      onLeaveCall();
    });
  };

  return (
    <Container>
      <ChatContainerChats socketIO={socketIO} />
      <ChatContainerChat socketIO={socketIO} />
      {/*<VideoCall socketIO={socketIO} />*/}
      <>
        <WrapperToastMessage>
          <Toast ref={toast} />
        </WrapperToastMessage>
        <audio ref={audio} src="/message.mp3"></audio>
        <CallOrAnswer />
      </>
    </Container>
  );
};

export default React.memo(chatPage);
