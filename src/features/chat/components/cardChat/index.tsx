import { IChat } from "../../../login/models/login.model";
import { Container } from "./styles";

const cardChat = ({
  dataChat,
  userIdUniqueLogin,
  updateChatOpen,
}: {
  dataChat: IChat;
  userIdUniqueLogin: string;
  updateChatOpen: (chat: IChat) => void;
}) => {
  const filterUserLogin = dataChat.members.filter(
    (m) => m.idUnique !== userIdUniqueLogin
  );

  const changeChatOpen = () => {
    updateChatOpen(dataChat);
  };
  return (
    <Container onClick={changeChatOpen}>
      <div>
        <img src={filterUserLogin[0].picture || "/yo.jpg"} />
      </div>

      <div>{filterUserLogin[0].userName}</div>
    </Container>
  );
};

export default cardChat;
