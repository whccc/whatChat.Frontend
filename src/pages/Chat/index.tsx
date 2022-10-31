import { useEffect, useState } from "react";
import ChatPage from "../../features/chat/pages/chat-page";
import socketIOClient from "socket.io-client";
import conectionSocketIOContext from "../../context/conectionSocketContext";
import chatsContext from "../../context/chatsContext";
import chatOpenContext from "../../context/chatOpenContext";
import useUser from "../../hooks/useUser";
import useValidAuth from "../../hooks/useAuth";

const chatsPage = () => {
  const user = useUser().getUserLogin();
  const [socketIO, setSocketIO] = useState(user?.uuid as any);
  const [userLoginChat, setUserLoginChat] = useState(user?.dataChat as any);
  const { validIfTokenExits, loadAuth } = useValidAuth();
  const [chatOpen, setUpdateOpenChat] = useState({
    header: null,
    messages: [],
  });

  const validToken = () => {
    validIfTokenExits();
  };

  useEffect(() => {
    validToken();
    const socket = socketIOClient("http://localhost:4000", {
      query: { id: user?.uuid },
    });

    //window.addEventListener("focus", (e) => window.location.reload());
    return () => {
      socket.disconnect();
    };
  }, []);

  return loadAuth ? (
    <div>loadding..</div>
  ) : (
    <conectionSocketIOContext.Provider value={socketIO}>
      <chatsContext.Provider
        value={{ chats: userLoginChat, setChats: setUserLoginChat }}
      >
        <chatOpenContext.Provider value={{ data: chatOpen, setUpdateOpenChat }}>
          <div>
            <ChatPage />
          </div>
        </chatOpenContext.Provider>
      </chatsContext.Provider>
    </conectionSocketIOContext.Provider>
  );
};

export default chatsPage;
