import React from "react";
import { Socket } from "socket.io-client";

const callOrAnswerContext = React.createContext({
  callUser: {
    incomingCall: false,
    callChat: false,
  },
  dataUserToCall: {
    idUniqueOtherUser: null,
  },
  answerUser: {
    answerCall: false,
    dataOfUserCall: {
      idUnique: null,
      name: null,
    },
  },
  listenerIncomingCall: (_socketIO: Socket) => {},
  onCallChat: (_socketIO: Socket, _stream: MediaStream, _to: string) => {},
  onSetCallChat: (_value: boolean) => {},
  onSetIdUniqueOtherUser: (_value: string) => {},
  onSetAnswerCall: (_value: boolean) => {},
  onAnswerCall: (_stream: MediaStream, _socketIO: Socket, _to: string) => {},
  onSetIncomingCall: (_value: boolean) => {},
  streamToAnswerCall: null,
});

export default callOrAnswerContext;
