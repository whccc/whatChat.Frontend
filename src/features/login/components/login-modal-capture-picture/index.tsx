import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import {
  ContainerModal,
  ContainerModalData,
  ContainerModalCamera,
} from "../../../../styles/styles.modalmain";
const modalCapturePicture = ({
  showStateModal,
  capturePicture,
  setShowModalCapture,
}: {
  showStateModal: boolean;
  capturePicture: (data: string) => void;
  setShowModalCapture: (data: boolean) => void;
}) => {
  const handleTakePhoto = (dataUri: any) => {
    if (dataUri) {
      capturePicture(dataUri);
      setShowModalCapture(false);
    }
  };

  return showStateModal ? (
    <ContainerModal>
      <ContainerModalData>
        <label>Captura de Rostro</label>
        <ContainerModalCamera>
          <Camera
            onTakePhoto={(dataUri) => {
              handleTakePhoto(dataUri);
            }}
            sizeFactor={0.5}
          />
        </ContainerModalCamera>
        <button onClick={() => setShowModalCapture(false)}>Cancelar</button>
      </ContainerModalData>
    </ContainerModal>
  ) : null;
};

export default modalCapturePicture;
