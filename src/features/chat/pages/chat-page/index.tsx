import { Toast } from "primereact/toast";
import { useContext, useEffect, useRef } from "react";
import chatsContext from "../../../../context/chatsContext";
import conectionSocketIOContext from "../../../../context/conectionSocketContext";
import useUser from "../../../../hooks/useUser";
import { IChat, IUser } from "../../../login/models/login.model";
import CallUser from "../../components/incomingCall";
import ViewToAnswerCall from "../../components/viewToAnswerCall";
import ChatContainerChat from "../../components/chatContainerChat";
import ChatContainerChats from "../../components/chatContainerChats";
import VideoCall from "../../components/videoCall";
import { IChatWriting, IDataMessage } from "../../models/chat.model";
import { Container, WrapperToastMessage } from "./styles";
import CallOrAnswer from "../../components/callOrAnswer";
import CallChat from "../../components/callChat";

const chatPage = () => {
  const toast = useRef<Toast>(null);
  const audio = useRef<HTMLAudioElement>(null);

  const socketIO = useContext(conectionSocketIOContext);
  const { chatByIdHookChatsHookChats, chats, writingChat } =
    useContext(chatsContext);
  const { addNewMessageChatUser, getUserLogin, createJsonChatUser } = useUser();
  const { updateAddNewChat, addNewMessageChat } = useContext(chatsContext);

  useEffect(() => {
    listeningWritingChat();
    listeningToMessages();
    listeningNotWritingChat();
    return () => {
      socketIO?.off("listeningToMessages");
      socketIO?.off("sendWritingChat");
      socketIO?.off("sendNotWritingChat");
    };
  }, [chats]);

  const listeningToMessages = () => {
    socketIO!.on("listeningToMessages", (data: IDataMessage) => {
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
    if (!chatByIdHookChatsHookChats(idChat)) {
      const dataChat = createJsonChatUser(idChat, dataMessage.of as IUser);
      dataChat.order = -1;
      dataChat.messages.push({ message, of });
      updateAddNewChat(dataChat);
    }
    addNewMessageChat(message, idChat, of);
    addNewMessageChatUser(message, idChat, of);
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

export default chatPage;
