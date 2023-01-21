import { useContext, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import chatOpenContext from "../../../../context/chatOpenContext";
import chatsContext from "../../../../context/chatsContext";
import { sortArrayJson } from "../../../../helpers/helpers";
import useUser from "../../../../hooks/useUser";
import { IUser } from "../../../login/models/login.model";
import { userSearch } from "../../hooks/useChat";
import AutoCompleteSearch from "../autoCompleteSearch";
import CardChat from "../cardChat";
import {
  Container,
  ContainerSectionOne,
  ContainerSectionTwo,
  ContainerSectionTwoChats,
} from "./styles";

const chatContainerChats = ({ socketIO }: { socketIO: any }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [userSearchInput, setUserSearchInput] = useState("");
  const useQueryClientHook = useQueryClient();

  const { data, refetch } = userSearch(userSearchInput);
  const { getUserLogin, deleteUserLogin } = useUser();

  const { updateChatOpen } = useContext(chatOpenContext);
  const { chats, updateAddNewChat } = useContext(chatsContext);

  /**************************/
  /******** METODOS *********/
  /**************************/
  const getChats = () => {
    const user = getUserLogin();
    if (!user) {
      return;
    }
    setUser(user);
    addChatsOfUser(user);
  };

  const addChatsOfUser = (user: IUser) => {
    for (const [order, data] of user.dataChats.entries()) {
      updateAddNewChat({ ...data, order, isWriting: false });
    }
  };
  console.log(user, chats.length);
  const getUserBySearch = async () => {
    if (userSearchInput === "") {
      useQueryClientHook.setQueriesData(["userSearchChat"], null);
      return;
    }
    refetch();
  };

  useEffect(() => {
    getChats();
  }, []);

  useEffect(() => {
    getUserBySearch();
  }, [userSearchInput]);
  console.log("fuera del hook", chats);
  return (
    <Container>
      <ContainerSectionOne>
        <div>
          <img src={user?.picture || "./Avatar.png"} />
          <label>{user?.userName}</label>
        </div>

        <div>
          <div>
            <i className="pi pi-briefcase"></i>
          </div>

          <div>
            <i className="pi pi-briefcase"></i>
          </div>

          <div>
            <i className="pi pi-sign-out" onClick={deleteUserLogin}></i>
          </div>
        </div>
      </ContainerSectionOne>
      {/* Container de Chats */}
      <ContainerSectionTwo>
        <div className="wrapper-serch-user">
          <div>
            <i className="pi pi-search"></i>
            <input
              value={userSearchInput}
              type="search"
              placeholder="Busca un chat o inicia uno nuevo"
              onChange={(e) => setUserSearchInput(e.target.value)}
            />
          </div>
        </div>
        {data && user && (
          <AutoCompleteSearch
            dataUsers={data.data}
            socketIO={socketIO}
            updatetUserSearchInput={(value: string) => {
              setUserSearchInput(value);
            }}
          />
        )}
        <ContainerSectionTwoChats>
          {chats.length === 0 && <p>No tiene chats</p>}
          {chats &&
            user &&
            chats
              .sort((a, b) => sortArrayJson(a, b, "order"))
              .map((data, i) => {
                return (
                  <CardChat
                    key={i}
                    dataChat={data}
                    userIdUniqueLogin={user.idUnique}
                    updateChatOpen={updateChatOpen}
                    socketIO={socketIO}
                  />
                );
              })}
        </ContainerSectionTwoChats>
      </ContainerSectionTwo>
    </Container>
  );
};

export default chatContainerChats;
