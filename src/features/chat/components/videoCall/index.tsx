import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import Peer from "simple-peer";

const VideoCall = ({ socketIO }: { socketIO: Socket | null }) => {
  const [stream, setStream] = useState<MediaStream>();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const myVideo = useRef<HTMLVideoElement>(null);
  const userVideo = useRef<HTMLVideoElement>(null);
  const connectionRef = useRef<any>();

  useEffect(() => {
    if (!socketIO || !myVideo) {
      return;
    }
    navigator.mediaDevices?.getUserMedia({ audio: true }).then((stream) => {
      setStream(stream);

      if (!myVideo || !myVideo.current) {
        return;
      }
      console.log("ss");
      myVideo.current.srcObject = stream;
    });

    socketIO.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
      console.log("holaa call user", data.signal);
    });
  }, []);

  const callUser = () => {
    if (!socketIO) {
      return;
    }
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socketIO.emit("callUser", {
        userToCall: "otro user",
        signalData: data,
        from: "f",
        name: "Wilson 1",
        to: "4aa5edf1-4a3a-42a4-a0c4-8f5a8b",
      });
    });
    peer.on("stream", (stream) => {
      if (!userVideo || !userVideo.current) {
        return;
      }
      userVideo.current.srcObject = stream;
    });
    socketIO.on("callAccepted", (signal) => {
      setCallAccepted(true);
      console.log("callAccepted", signal);
      peer.signal(signal);
    });
    console.log("holaa llamando");
    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      if (!socketIO) {
        return;
      }
      socketIO.emit("answerCall", {
        signal: data,
        to: "d797751e-93d8-49f8-a862-fc17cc",
      });
    });
    peer.on("stream", (stream) => {
      if (!userVideo || !userVideo.current) {
        return;
      }
      console.log("stream", stream);
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal || "");
    connectionRef.current = peer;

    console.log("holaa respondio", peer);
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current?.destroy();
  };

  return (
    <>
      <h1 style={{ textAlign: "center", color: "#fff" }}>Zoomish</h1>
      <div className="container">
        <div className="video-container">
          <div className="video">
            {stream && (
              <>
                video1
                <video
                  playsInline
                  ref={myVideo}
                  autoPlay
                  style={{ width: "300px", border: "1px solid red" }}
                  muted
                />
              </>
            )}
          </div>
          <div className="video">
            {callAccepted && !callEnded ? (
              <>
                video2
                <video
                  playsInline
                  ref={userVideo}
                  autoPlay
                  style={{ width: "300px", border: "1px solid blue" }}
                />
              </>
            ) : null}
          </div>
        </div>
        <div className="myId">
          <div className="call-button">
            {callAccepted && !callEnded ? (
              <button onClick={leaveCall}>End Call</button>
            ) : (
              <button onClick={() => callUser()}>llamar</button>
            )}
            {idToCall}
          </div>
        </div>
        <div>
          {receivingCall && !callAccepted ? (
            <div className="caller">
              <h1>{name} is calling...</h1>
              <button onClick={answerCall}>Answer</button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default VideoCall;
