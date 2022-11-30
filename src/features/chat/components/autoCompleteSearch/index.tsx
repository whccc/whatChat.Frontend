import useUser from "../../../../hooks/useUser";
import { IChat, IUser } from "../../../login/models/login.model";
import { Container } from "./styles";
import { v4 as uuid } from "uuid";
import chatsContext from "../../../../context/chatsContext";
import { useContext } from "react";
const autoCompleteSearch = ({
  dataUsers,
  socketIO,
  updatetUserSearchInput,
}: {
  dataUsers: Array<IUser>;
  socketIO: any;
  updatetUserSearchInput: (value: string) => void;
}) => {
  const { updateAddNewChat } = useContext(chatsContext);
  const { getUserLogin, createChatUser, createJsonChatUser } = useUser();
  const userLogin = getUserLogin();

  const filter = (dataUsers: Array<IUser>) => {
    return dataUsers.filter((u) => u.idUnique !== userLogin?.idUnique);
  };

  const createChatSocket = (chat: IChat) => {
    socketIO.emit("createChat", {
      idUserCreation: userLogin?.idUnique,
      chat: {
        ...chat,
        members: chat.members.map((m) => m.idUnique),
      },
    });
  };

  const addNewChatTypeOneToOne = (userOther: IUser) => {
    const chat = createJsonChatUser(uuid(), userOther);
    updateAddNewChat(chat);
    createChatSocket(chat);
    createChatUser(chat);
    updatetUserSearchInput("");
  };

  return (
    <Container>
      <div>
        {filter(dataUsers).length === 0 && (
          <ul>
            <li>No se encontrarón resultados.</li>
          </ul>
        )}
        <ul>
          {filter(dataUsers).map((data, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  addNewChatTypeOneToOne(data);
                }}
              >
                <img src={data.picture || "/yo.jpg"} />
                {data.userName}
              </li>
            );
          })}
        </ul>
      </div>
    </Container>
  );
};
export default autoCompleteSearch;
