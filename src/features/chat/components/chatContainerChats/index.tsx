import CardChat from "../cardChat";
import {
  Container,
  ContainerSectionOne,
  ContainerSectionTwo,
  ContainerSectionTwoChats,
} from "./styles";

const chatContainerChats = () => {
  return (
    <Container>
      <ContainerSectionOne>
        <div>
          <img src="/yo.jpg" />
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
      </ContainerSectionOne>
      {/* Container de Chats */}
      <ContainerSectionTwo>
        <div>
          <i className="pi pi-search"></i>
          <input type="text" placeholder="Busca un chat o inicia uno nuevo" />
        </div>
        <ContainerSectionTwoChats>
          {[1, 2, 3, 4, 7, 8, 9, 9, 6, 5].map((index) => {
            return <CardChat key={index} />;
          })}
        </ContainerSectionTwoChats>
      </ContainerSectionTwo>
    </Container>
  );
};

export default chatContainerChats;
