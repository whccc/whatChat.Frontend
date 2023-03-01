import { useContext, useEffect, useRef, useState } from "react";
import callOrAnswerContext from "../../../../context/callOrAnswerContext";
import conectionSocketIOContext from "../../../../context/conectionSocketContext";
import { WrapperCallUser } from "./styles";

const CallChat = ({ stream }: any) => {
  const socketIO = useContext(conectionSocketIOContext);
  const myVideo = useRef<HTMLVideoElement>(null);
  const { onCallChat, dataUserToCall, onSetCallChat } =
    useContext(callOrAnswerContext);

  useEffect(() => {
    onCallChat(socketIO!, stream!, dataUserToCall.idUniqueOtherUser!);
  }, []);

  useEffect(() => {
    if (!myVideo || !myVideo.current) return;
    myVideo.current.srcObject = stream;
  }, [myVideo]);

  //Llamando
  return (
    <WrapperCallUser>
      <div>
        <h1>Llamando a usuario 2...</h1>
        <video
          playsInline
          ref={myVideo}
          autoPlay
          style={{ width: "300px", height: "300px" }}
          muted
        />
        <div className="wrapper-icons-call-user">
          <i
            aria-label="icon-close"
            className="pi pi-phone"
            onClick={() => onSetCallChat(false)}
          ></i>
        </div>
      </div>
    </WrapperCallUser>
  );
};

export default CallChat;
