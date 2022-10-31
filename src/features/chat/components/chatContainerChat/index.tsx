import { useContext, useEffect } from "react";
import chatOpenContext from "../../../../context/chatOpenContext";
import chatsContext from "../../../../context/chatsContext";
import { InputTwo } from "../../../../styles/styles.inputsmain";
import CardMessage from "../cardMessage";
import {
  Container,
  ContainerHeader,
  ContainerSendMessage,
  ContainerMessage,
} from "./styles";

const chatContainerChat = ({ socketIO }) => {
  const { data, setUpdateOpenChat } = useContext(chatOpenContext);

  return (
    <Container>
      <button
        onClick={() => {
          setUpdateOpenChat(
            (data: { header: null; message: Array<string> }) => {
              return { header: null, messages: [...data.messages, "e"] };
            }
          );
        }}
      >
        Cambio
      </button>
      {/* Header */}
      <ContainerHeader>
        <div>
          <div>
            <img src="/yo.jpg" />
          </div>
          <div>
            <label>Wilson Castro</label>
          </div>
        </div>

        <div>
          <div>
            <i className="pi pi-briefcase"></i>
          </div>

          <div>
            <i className="pi pi-briefcase"></i>
          </div>

          <div>
            <i className="pi pi-briefcase"></i>
          </div>
        </div>
      </ContainerHeader>

      {/* Mensajes */}
      <ContainerMessage>
        {data.messages.map((message, index) => (
          <CardMessage key={index} message={message} />
        ))}
      </ContainerMessage>

      {/* Envio de Mensajes */}
      <ContainerSendMessage>
        <div>
          <i className="pi pi-briefcase"></i>
        </div>
        <div>
          <InputTwo type="text" placeholder="Escriba un mensaje..." />
        </div>

        <div>
          <i className="pi pi-briefcase"></i>
        </div>
      </ContainerSendMessage>
    </Container>
  );
};

export default chatContainerChat;
