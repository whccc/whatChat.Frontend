import { Container, ContainerMessage } from "./styles";

const cardMessage = ({ message }: { message: string }) => {
  return (
    <Container>
      <ContainerMessage>{message}</ContainerMessage>
    </Container>
  );
};

export default cardMessage;
