import { useContext } from "react";
import callOrAnswerContext from "../../../../context/callOrAnswerContext";
import conectionSocketIOContext from "../../../../context/conectionSocketContext";
import { WrapperCallUser } from "./styles";

const IncomingCall = ({ stream }: any) => {
  const {
    onSetAnswerCall,
    answerUser,
    onAnswerCall,
    onSetIncomingCall,
    onLeaveCall,
  } = useContext(callOrAnswerContext);
  const { idUnique, name } = answerUser.dataOfUserCall;
  const socketIO = useContext(conectionSocketIOContext);

  const onSetAnswerCallAction = () => {
    onSetIncomingCall(false);
    onSetAnswerCall(true);
    onAnswerCall(stream, socketIO!, idUnique!);
  };

  const endCall = () => {
    socketIO?.emit("endCall", idUnique);
    onLeaveCall();
  };
  return (
    <WrapperCallUser>
      <div>
        <h1>Llamada entrante...</h1>
        <h1>{name}</h1>
        <hr />
        <div className="wrapper-icons-call-user">
          <i
            aria-label="icon-close"
            className="pi pi-times"
            onClick={endCall}
          ></i>
          <i
            aria-label="icon-answer"
            className="pi pi-phone"
            onClick={onSetAnswerCallAction}
          ></i>
        </div>
      </div>
    </WrapperCallUser>
  );
};

export default IncomingCall;
