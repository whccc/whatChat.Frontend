import { Socket } from "socket.io-client";
import { IChat } from "../../../login/models/login.model";
import {
  Container,
  NewMessage,
  WrapperMessage,
  Wrapper,
  WrapperWriting,
} from "./styles";

const cardChat = ({
  dataChat,
  userIdUniqueLogin,
  updateChatOpen,
  socketIO,
}: {
  dataChat: IChat;
  userIdUniqueLogin: string;
  updateChatOpen: (chat: IChat) => void;
  socketIO: Socket;
}) => {
  const filterUserLogin = dataChat.members.filter(
    (m) => m.idUnique !== userIdUniqueLogin
  );

  const changeChatOpen = () => {
    updateChatOpen(dataChat);
    socketIO?.emit("notWritingChat", {
      idChat: dataChat.idChat,
      writing: false,
      to: filterUserLogin[0].idUnique,
    });
  };
  return (
    <Wrapper title={dataChat.messages.at(-1)?.message}>
      <Container onClick={changeChatOpen}>
        <div>
          <img src={filterUserLogin[0].picture || "/Avatar.png"} />
        </div>

        <div>
          {filterUserLogin[0].userName}

          <WrapperMessage>{dataChat.messages.at(-1)?.message}</WrapperMessage>
        </div>
      </Container>
    </Wrapper>
  );
};

export default cardChat;
