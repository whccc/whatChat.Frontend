import { useContext, useEffect, useRef } from "react";
import { WrapperVideo, WrapperViewToAnswerCall } from "./styles";
import callOrAnswerContext from "../../../../context/callOrAnswerContext";
import useUser from "../../../../hooks/useUser";
import conectionSocketIOContext from "../../../../context/conectionSocketContext";

const viewToAnswerCall = ({ stream }: any) => {
  const myVideo = useRef<HTMLVideoElement>(null);
  const userVideo = useRef<HTMLVideoElement>(null);
  const { streamToAnswerCall, onLeaveCall } = useContext(callOrAnswerContext);
  const { answerUser } = useContext(callOrAnswerContext);
  const { name, idUnique } = answerUser.dataOfUserCall;
  const { getUserLogin } = useUser();
  const userData = getUserLogin();
  const socketIO = useContext(conectionSocketIOContext);
  useEffect(() => {
    if (!myVideo || !myVideo.current) {
      return;
    }
    myVideo.current.srcObject = stream;
  }, [myVideo]);

  useEffect(() => {
    if (!userVideo || !userVideo.current) {
      return;
    }
    if (!streamToAnswerCall) {
      return;
    }
    userVideo.current.srcObject = streamToAnswerCall;
  }, [userVideo, streamToAnswerCall]);

  const endCall = () => {
    socketIO?.emit("endCall", idUnique);
    onLeaveCall();
  };
  return (
    <WrapperViewToAnswerCall>
      <div>
        <div>
          <div>
            <h1>{userData?.userName}</h1>
            <hr />
            <WrapperVideo>
              <video
                playsInline
                ref={myVideo}
                autoPlay
                style={{ width: "200px", height: "auto" }}
                muted
              />
            </WrapperVideo>
            <hr />
          </div>
          <div>
            <h1>{name}</h1>
            <hr />
            <WrapperVideo>
              <video
                playsInline
                ref={userVideo}
                autoPlay
                style={{ width: "200px", height: "auto" }}
              />
            </WrapperVideo>
            <hr />
          </div>
        </div>
        <div>
          <button title="close">
            <i className="pi pi-phone" onClick={endCall}></i>
          </button>
        </div>
      </div>
    </WrapperViewToAnswerCall>
  );
};

export default viewToAnswerCall;
