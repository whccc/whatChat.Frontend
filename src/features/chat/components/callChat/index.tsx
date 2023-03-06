import { useContext, useEffect, useRef, useState } from "react";
import callOrAnswerContext from "../../../../context/callOrAnswerContext";
import conectionSocketIOContext from "../../../../context/conectionSocketContext";
import { WrapperCallUser } from "./styles";

const CallChat = ({ stream }: any) => {
  const socketIO = useContext(conectionSocketIOContext);
  const myVideo = useRef<HTMLVideoElement>(null);
  const { onCallChat, dataUserToCall, onSetCallChat, answerUser, onLeaveCall } =
    useContext(callOrAnswerContext);
  const { name, idUnique } = answerUser.dataOfUserCall;

  useEffect(() => {
    onCallChat(socketIO!, stream!, dataUserToCall.idUniqueOtherUser!);
  }, []);

  useEffect(() => {
    if (!myVideo || !myVideo.current) {
      return;
    }
    myVideo.current.srcObject = stream;
  }, [myVideo]);

  const endCall = () => {
    socketIO?.emit("endCall", idUnique);
    onLeaveCall();
  };

  //Llamando
  return (
    <WrapperCallUser>
      <div>
        <h1>Llamando a {name}...</h1>
        <hr />
        <video
          playsInline
          ref={myVideo}
          autoPlay
          style={{ width: "200px", height: "auto" }}
          muted
        />
        <hr />
        <div className="wrapper-icons-call-user" onClick={endCall}>
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
