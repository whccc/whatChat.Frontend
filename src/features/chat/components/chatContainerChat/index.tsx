import { InputTwo } from "../../../../styles/styles.inputsmain";
import CardMessage from "../cardMessage";
import {
  Container,
  ContainerHeader,
  ContainerSendMessage,
  ContainerMessage,
} from "./styles";

const chatContainerChat = () => {
  return (
    <Container>
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
        {[1, 3, 4, 5, 6, 7, 8, 9, 0, 6, 4, 3, 4, 5, 5, 6, 7, 8, 7].map(() => (
          <CardMessage />
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
