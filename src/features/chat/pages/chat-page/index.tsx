import ChatContainerChat from "../../components/chatContainerChat";
import ChatContainerChats from "../../components/chatContainerChats";
import { Container } from "./styles";

const chatPage = () => {
  return (
    <Container>
      <ChatContainerChats />
      <ChatContainerChat />
    </Container>
  );
};

export default chatPage;
