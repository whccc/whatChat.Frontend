import { useContext, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import conectionSocketIOContext from "../../../context/conectionSocketContext";
import { ICallUser } from "../models/chat.model";
import Peer from "simple-peer";
import { Stream } from "stream";
import useUser from "../../../hooks/useUser";

export const useCallOrAnswer = () => {
  const [incomingCall, setIncomingCall] = useState(false);
  const [callerSignal, setCallerSignal] = useState(null);
  const [streamToAnswerCall, setStreamToAnswerCall] =
    useState<MediaStream | null>(null);
  const [answerCall, setAnswerCall] = useState(false);
  const [idUniqueOtherUser, setIdUniqueOtherUser] = useState<string | null>(
    null
  );
  const [callChat, setCallChat] = useState(false);
  const [dataOfUserCall, setDataOfUserCall] = useState<{
    idUnique: string | null;
    name: string | null;
  }>({
    idUnique: null,
    name: null,
  });
  const { getUserLogin } = useUser();
  const connectionRef = useRef<any>();

  const onSetCallChat = (value: boolean) => {
    setCallChat(value);
  };

  const onSetAnswerCall = (value: boolean) => {
    setAnswerCall(value);
  };
  const onSetIdUniqueOtherUser = (value: string) => {
    setIdUniqueOtherUser(value);
  };
  const onSetIncomingCall = (value: boolean) => {
    setIncomingCall(value);
  };
  //Escuchando llamadas entrantes
  const listenerIncomingCall = (socketIO: Socket) => {
    socketIO?.on("callUser", ({ signal, name, from }: ICallUser) => {
      setIncomingCall(true);
      setCallerSignal(signal);
      setDataOfUserCall({
        idUnique: from,
        name,
      });
    });
  };

  //Llamando a un usuario
  const onCallChat = (socketIO: Socket, stream: MediaStream, to: string) => {
    const { idUnique, userName } = getUserLogin()!;
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });
    peer.on("signal", (data) => {
      socketIO.emit("callUser", {
        signalData: data,
        from: idUnique,
        userName,
        to,
      });
    });
    peer.on("stream", (stream) => {
      setStreamToAnswerCall(stream);
    });
    socketIO.on("callAccepted", (signal) => {
      peer.signal(signal);
      onSetCallChat(false);
      onSetAnswerCall(true);
    });
    connectionRef.current = peer;
  };

  //Respondiendo Llamada entrante
  const onAnswerCall = (stream: MediaStream, socketIO: Socket, to: string) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });
    peer.on("signal", (data) => {
      socketIO.emit("answerCall", {
        signal: data,
        to,
      });
    });
    peer.on("stream", (stream) => {
      setStreamToAnswerCall(stream);
    });

    peer.signal(callerSignal!);
    connectionRef.current = peer;
  };

  return {
    callUser: {
      incomingCall,
      callChat,
    },
    dataUserToCall: {
      idUniqueOtherUser,
    },
    answerUser: {
      answerCall,
      dataOfUserCall,
    },
    streamToAnswerCall,
    listenerIncomingCall,
    onCallChat,
    onSetCallChat,
    onSetIdUniqueOtherUser,
    onSetAnswerCall,
    onAnswerCall,
    onSetIncomingCall,
  };
};

export default useCallOrAnswer;
