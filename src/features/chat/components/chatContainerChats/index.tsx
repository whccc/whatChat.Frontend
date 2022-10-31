import { useContext, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import chatOpenContext from "../../../../context/chatOpenContext";
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
  const userQuery = useQueryClient();
  const [user, setUser] = useState("");
  const { data, refetch } = userSearch(user);
  const [userData, setUserData] = useState<IUser | null>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData") || "");
    setUserData(user);
  }, []);

  useEffect(() => {
    if (user === "") {
      userQuery.setQueriesData(["userSearchChat"], null);
      return;
    }
    refetch();
  }, [user]);

  return (
    <Container>
      <ContainerSectionOne>
        <div>
          <img src={userData?.person?.picture || "./Avatar.png"} />
          <label>{userData?.userName}</label>
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
          <input
            type="text"
            placeholder="Busca un chat o inicia uno nuevo"
            onChange={(e) => setUser(e.target.value)}
          />
          {data && (
            <AutoCompleteSearch dataUsers={data?.data!} socketIO={socketIO} />
          )}
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
