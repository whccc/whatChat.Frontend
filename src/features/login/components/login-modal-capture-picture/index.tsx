import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
const modalCapturePicture = () => {
  const handleTakePhoto = (dataUri: any) => {
    console.log("foto", dataUri);
  };

  return (
    <div>
      <label>Captura de Rostro</label>
      <Camera
        onTakePhoto={(dataUri) => {
          handleTakePhoto(dataUri);
        }}
      />
    </div>
  );
};

export default modalCapturePicture;
