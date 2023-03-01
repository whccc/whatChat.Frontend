import useUser from "../../../../hooks/useUser";
import { IChatOf } from "../../models/chat.model";
import { Container, ContainerMessage } from "./styles";

const cardMessage = ({ message, of }: { message: string; of: IChatOf }) => {
  const { getUserLogin } = useUser();
  const user = getUserLogin();
  return (
    <Container direction={user?.idUnique === of.idUnique}>
      <ContainerMessage>{message}</ContainerMessage>
    </Container>
  );
};

export default cardMessage;
