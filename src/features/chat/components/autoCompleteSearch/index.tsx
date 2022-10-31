import useUser from "../../../../hooks/useUser";
import { IUser } from "../../../login/models/login.model";
import { Container } from "./styles";
import { v4 as uuid } from "uuid";
const autoCompleteSearch = ({
  dataUsers,
  socketIO,
}: {
  dataUsers: Array<any>;
  socketIO: any;
}) => {
  const createChat = (dataUserChat: IUser) => {
    const userLogin = useUser().getUserLogin();
    socketIO.emit("createChat", {
      userCreate: userLogin?.uuid,
      chatId: uuid(),
      members: [userLogin?.uuid, dataUserChat.uuid],
    });
  };

  return (
    <Container>
      {dataUsers.length === 0 && (
        <ul>
          <li>No se encontrarón resultados.</li>
        </ul>
      )}
      <ul>
        {dataUsers.map((data, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                createChat(data);
              }}
            >
              <img src="/yo.jpg" />
              {data.userName}
            </li>
          );
        })}
      </ul>
    </Container>
  );
};
export default autoCompleteSearch;
