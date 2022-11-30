import { useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import chatOpenContext from "../../../../context/chatOpenContext";
import chatsContext from "../../../../context/chatsContext";
import useUser from "../../../../hooks/useUser";
import { InputTwo } from "../../../../styles/styles.inputsmain";
import { IDataMessage, IOtherMember } from "../../models/chat.model";
import CardMessage from "../cardMessage";
import {
  Container,
  ContainerHeader,
  ContainerSendMessage,
  ContainerMessage,
  ContainerImgInitial,
} from "./styles";

const chatContainerChat = ({ socketIO }: { socketIO: Socket | null }) => {
  const [otherUser, setOtherUser] = useState<IOtherMember | null>(null);
  const [message, setMessage] = useState("");

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
  };

  const addMessage = () => {
    if (data && data.idChat) {
      sendEmitMessage(message);
      addNewMessageChat(message, data.idChat);
      addNewMessageChatUser(message, data.idChat);
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

  useEffect(() => {
    filterUserLogin();
  }, [data]);

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
          <div onClick={closeChatOpen}>
            <i className="pi pi-times"></i>
          </div>
        </div>
      </ContainerHeader>

      <ContainerMessage>
        {data.messages.map((message, index) => (
          <CardMessage key={index} message={message} />
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
            onChange={(e) => setMessage(e.target.value)}
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
