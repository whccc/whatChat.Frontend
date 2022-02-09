import { useEffect, useRef } from "react";
import Camera from "react-html5-camera-photo";
import {
  ContainerModal,
  ContainerModalData,
  ContainerModalCamera,
} from "../../../../styles/styles.modalmain";
import { ButtonPrimary } from "../../../../styles/styles.buttonsmain";
import { loadModels, getFullFaceDescription } from "../../../faceapi/face";
const modalCapturePicture = ({
  showStateModal,
  capturePicture,
  setShowModalCapture,
}: {
  showStateModal: boolean;
  capturePicture: (data: string) => void;
  setShowModalCapture: (data: boolean) => void;
}) => {
  const videoImg: any = useRef();
  let interval: any = null;

  //Capturando foto tomada por el componente
  const handleTakePhoto = (dataUri: string) => {
    if (dataUri) {
      capturePicture(dataUri);
      setShowModalCapture(false);
    }
  };

  //Cargando modelos de detección de cara
  useEffect(() => {
    loadModels();
  }, []);

  //Inicializando detección de la carafacial
  const initialDetectionFacial = () => {
    interval = setInterval(async () => {
      if (!videoImg.current) return;
      const arrayFace = await getFullFaceDescription(
        videoImg.current.children[0].children[2]
      );
      console.log(arrayFace);
      if (arrayFace.length !== 0) {
        /* videoImg.current.children[0].children[3].children[0].click();
        clearInterval(interval);
        setTimeout(() => {
          setShowModalCapture(false);
        }, 1000);*/
      }
    }, 100);
  };

  return showStateModal ? (
    <ContainerModal>
      <ContainerModalData>
        <label>Captura de Rostro</label>
        <ContainerModalCamera ref={videoImg}>
          <Camera
            onTakePhoto={(dataUri) => {
              handleTakePhoto(dataUri);
            }}
            sizeFactor={0.5}
          />
        </ContainerModalCamera>
        <ButtonPrimary
          onClick={() => {
            clearInterval(interval);
            setShowModalCapture(false);
          }}
        >
          Cancelar
        </ButtonPrimary>
      </ContainerModalData>
    </ContainerModal>
  ) : null;
};

export default modalCapturePicture;
