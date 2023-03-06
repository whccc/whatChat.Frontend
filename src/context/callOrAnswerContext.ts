import React from "react";
import { Socket } from "socket.io-client";

const CallOrAnswerContext = React.createContext({
  callUser: {
    incomingCall: false,
    callChat: false,
  },
  dataUserToCall: {
    idUniqueOtherUser: "",
  },
  answerUser: {
    answerCall: false,
    dataOfUserCall: {
      idUnique: null,
      name: null,
    },
  },
  streamToAnswerCall: null,
  listenerIncomingCall: (_socketIO: Socket) => {},
  onCallChat: (_socketIO: Socket, _stream: MediaStream, _to: string) => {},
  onSetCallChat: (_value: boolean) => {},
  onSetIdUniqueOtherUser: (_value: string) => {},
  onSetAnswerCall: (_value: boolean) => {},
  onAnswerCall: (_stream: MediaStream, _socketIO: Socket, _to: string) => {},
  onSetIncomingCall: (_value: boolean) => {},
  onSetDataOfUserCall: (_name: string, _idUnique: string) => {},
  onLeaveCall: () => {},
} as any);

export default CallOrAnswerContext;
