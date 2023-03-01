import { useContext, useEffect, useState } from "react";
import callOrAnswerContext from "../../../../context/callOrAnswerContext";
import conectionSocketIOContext from "../../../../context/conectionSocketContext";
import CallChat from "../callChat";
import IncomingCall from "../incomingCall";
import ViewToAnswerCall from "../viewToAnswerCall";

const CallOrAnswer = () => {
  //Persona que contesta
  const socketIO = useContext(conectionSocketIOContext);
  const { listenerIncomingCall, callUser, answerUser } =
    useContext(callOrAnswerContext);
  const [stream, setStream] = useState<MediaStream | null>(null);
  useEffect(() => {
    if (!socketIO) {
      return;
    }
    listenerIncomingCall(socketIO);
    return () => {
      socketIO?.off("callUser");
      socketIO?.off("callAccepted");
    };
  }, []);

  //Iniciar Conexión de Video y Audio
  const videoAndAudio = async () => {
    const stream = await navigator.mediaDevices?.getUserMedia({
      audio: true,
      video: true,
    });
    setStream(stream);
  };

  useEffect(() => {
    const { incomingCall, callChat } = callUser;
    if (!callChat && !incomingCall) return;

    videoAndAudio();
  }, [callUser.incomingCall, callUser.callChat]);

  return (
    <div>
      {callUser.incomingCall && <IncomingCall stream={stream} />}
      {callUser.callChat && stream && <CallChat stream={stream} />}
      {answerUser.answerCall && stream && <ViewToAnswerCall stream={stream} />}
    </div>
  );
};

export default CallOrAnswer;
