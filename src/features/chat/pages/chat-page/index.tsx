import { useContext } from "react";
import conectionSocketIOContext from "../../../../context/conectionSocketContext";
import ChatContainerChat from "../../components/chatContainerChat";
import ChatContainerChats from "../../components/chatContainerChats";
import { Container } from "./styles";

const chatPage = () => {
  const socketIO = useContext(conectionSocketIOContext);

  return (
    <Container>
      <ChatContainerChats socketIO={socketIO} />
      <ChatContainerChat socketIO={socketIO} />
    </Container>
  );
};

export default chatPage;
