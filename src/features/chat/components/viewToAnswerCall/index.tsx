import { useContext, useEffect, useRef } from "react";
import { WrapperVideo, WrapperViewToAnswerCall } from "./styles";
import callOrAnswerContext from "../../../../context/callOrAnswerContext";

const viewToAnswerCall = ({ stream }: any) => {
  const myVideo = useRef<HTMLVideoElement>(null);
  const userVideo = useRef<HTMLVideoElement>(null);
  const { streamToAnswerCall } = useContext(callOrAnswerContext);
  useEffect(() => {
    if (!myVideo || !myVideo.current) return;
    myVideo.current.srcObject = stream;
  }, [myVideo]);

  useEffect(() => {
    if (!userVideo || !userVideo.current) return;
    if (!streamToAnswerCall) return;
    userVideo.current.srcObject = streamToAnswerCall;
  }, [userVideo, streamToAnswerCall]);
  return (
    <WrapperViewToAnswerCall>
      <div>
        <div>
          dddd
          <div>
            <h1>Usuario 1</h1>
            <WrapperVideo>
              <video
                playsInline
                ref={myVideo}
                autoPlay
                style={{ width: "300px", height: "300px" }}
                muted
              />
            </WrapperVideo>
          </div>
          <div>
            <h1>Usuario 2</h1>
            <WrapperVideo>
              <video
                playsInline
                ref={userVideo}
                autoPlay
                style={{ width: "300px", height: "300px" }}
              />
            </WrapperVideo>
          </div>
        </div>
        <div>
          <button title="close">
            <i className="pi pi-phone"></i>
          </button>
        </div>
      </div>
    </WrapperViewToAnswerCall>
  );
};

export default viewToAnswerCall;
