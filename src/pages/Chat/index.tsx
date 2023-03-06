import React, { memo, useContext, useEffect, useRef } from "react";
import ChatPage from "../../features/chat/pages/chat-page";
import conectionSocketIOContext from "../../context/conectionSocketContext";
import chatsContext from "../../context/chatsContext";
import chatOpenContext from "../../context/chatOpenContext";
import useValidAuth from "../../hooks/useAuth";
import useSocket from "../../hooks/useSocket";
import useChatOpen from "../../features/chat/hooks/useChatOpen";
import useChats from "../../features/chat/hooks/useChats";
import { Toast } from "primereact/toast";
import { WrapperToastMessage } from "../../features/chat/pages/chat-page/styles";
import useCallOrAnswer from "../../features/chat/hooks/useCallOrAnswer";
import callOrAnswerContext from "../../context/callOrAnswerContext";

const chatsPage = () => {
  const toast = useRef<Toast>(null);
  const audio = useRef<HTMLAudioElement>(null);

  const { validIfTokenExits, loadAuth } = useValidAuth();
  const { socket, conectionSocket } = useSocket();
  const { chat, updateChatOpen, updateMessageChatOpen } = useChatOpen();
  const chats = useChats();
  const callOrAnswer = useCallOrAnswer();

  useEffect(() => {
    validIfTokenExits();
    const socket = conectionSocket();
    return () => {
      socket.disconnect();
    };
  }, []);

  return loadAuth ? (
    <div>loadding..</div>
  ) : (
    <>
      <conectionSocketIOContext.Provider value={socket}>
        <chatOpenContext.Provider
          value={{
            data: chat,
            updateChatOpen,
            updateMessageChatOpen,
          }}
        >
          <chatsContext.Provider value={chats}>
            <callOrAnswerContext.Provider value={callOrAnswer}>
              <div>
                <ChatPage />
              </div>
            </callOrAnswerContext.Provider>
          </chatsContext.Provider>
        </chatOpenContext.Provider>
      </conectionSocketIOContext.Provider>
      <>
        <WrapperToastMessage>
          <Toast ref={toast} />
        </WrapperToastMessage>
        <audio ref={audio} src="/message.mp3"></audio>
      </>
    </>
  );
};

export default React.memo(chatsPage);
