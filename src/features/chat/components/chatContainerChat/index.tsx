import { useContext, useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import chatOpenContext from "../../../../context/chatOpenContext";
import chatsContext from "../../../../context/chatsContext";
import useUser from "../../../../hooks/useUser";
import { InputTwo } from "../../../../styles/styles.inputsmain";
import { IChatOf, IDataMessage, IOtherMember } from "../../models/chat.model";
import CardMessage from "../cardMessage";
import {
  Container,
  ContainerHeader,
  ContainerSendMessage,
  ContainerMessage,
  ContainerImgInitial,
} from "./styles";
import CallUser from "../incomingCall";
import callOrAnswerContext from "../../../../context/callOrAnswerContext";

const chatContainerChat = ({ socketIO }: { socketIO: Socket | null }) => {
  const messageWrapperRef = useRef<HTMLDivElement>(null);
  const [otherUser, setOtherUser] = useState<IOtherMember | null>(null);
  const [message, setMessage] = useState("");
  const { onSetCallChat, onSetIdUniqueOtherUser } =
    useContext(callOrAnswerContext);

  const { data, updateChatOpen } = useContext(chatOpenContext);
  const { addNewMessageChat } = useContext(chatsContext);
  const { getUserLogin, addNewMessageChatUser } = useUser();

  const filterUserLogin = () => {
    const user = getUserLogin();
    const ohterMember = data.members.filter(
      (u) => u.idUnique !== user?.idUnique
    );
    setOtherUser(ohterMember[0]);
  };

  const closeChatOpen = () => {
    updateChatOpen({
      idChat: null,
      members: [],
      messages: [],
      typeChat: null,
      isWriting: false,
      order: 0,
    });
    notWritingChat();
  };
  const scrollToBottom = () => {
    messageWrapperRef.current?.scrollTo({
      behavior: "smooth",
      top: messageWrapperRef.current?.scrollHeight + 56,
    });
  };
  const addMessage = () => {
    if (data && data.idChat) {
      const { idUnique, userName, picture } = getUserLogin()!;

      const of: IChatOf = {
        idUnique,
        picture,
        userName,
      };

      sendEmitMessage(message);
      addNewMessageChat(message, data.idChat, of);
      addNewMessageChatUser(message, data.idChat, of);
      setMessage("");
    }
  };

  const sendEmitMessage = (message: string) => {
    const { idUnique, userName, picture } = getUserLogin()!;
    const dataMessage = {
      of: {
        idUnique,
        userName,
        picture,
      },
      to: otherUser!.idUnique,
      message,
      idChat: data.idChat,
    } as IDataMessage;
    socketIO!.emit("message", dataMessage);
  };

  const writingChat = () => {
    socketIO?.emit("writingChat", {
      idChat: data.idChat,
      writing: true,
      to: otherUser?.idUnique,
    });
  };

  const notWritingChat = () => {
    console.log("desmontaron");
    socketIO?.emit("notWritingChat", {
      idChat: data.idChat,
      writing: false,
      to: otherUser?.idUnique,
    });
  };

  const onCallChat = () => {
    onSetCallChat(true);
    onSetIdUniqueOtherUser(otherUser?.idUnique!);
  };

  useEffect(() => {
    filterUserLogin();
  }, [data]);

  useEffect(() => {
    scrollToBottom();
  }, [data.messages]);
  console.log(data, "ss");
  return data.idChat ? (
    <Container>
      <ContainerHeader>
        <div>
          <div>
            <img src={otherUser?.picture || "/yo.jpg"} />
          </div>
          <div>
            <label>{otherUser?.userName}</label>
          </div>
        </div>

        <div>
          <div style={{ marginRight: "10px" }} onClick={onCallChat}>
            <i className="pi pi-phone"></i>
          </div>
          <div onClick={closeChatOpen}>
            <i className="pi pi-times"></i>
          </div>
        </div>
      </ContainerHeader>

      <ContainerMessage ref={messageWrapperRef}>
        {data.messages.map((data, index) => (
          <CardMessage key={index} message={data.message} of={data.of} />
        ))}
      </ContainerMessage>

      <ContainerSendMessage>
        <div>
          <i className="pi pi-briefcase"></i>
        </div>
        <div>
          <InputTwo
            type="text"
            placeholder="Escriba un mensaje..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              writingChat();
            }}
          />
        </div>

        <div>
          <i className="pi pi-send" onClick={addMessage}></i>
        </div>
      </ContainerSendMessage>
    </Container>
  ) : (
    <ContainerImgInitial>
      <div>
        <h1>Chat Whc</h1>
        <img src="/chat.png" />
      </div>
    </ContainerImgInitial>
  );
};

export default chatContainerChat;
