import { useRef, useState } from "react";
import ModalCapturePicture from "../login-modal-capture-picture";
import { CardContainer } from "../../../../styles/styles.cardmain";
import { ContainerRegister, ImgRegister } from "./styles";
import { Input } from "../../../../styles/styles.inputsmain";
import { ButtonPrimary } from "../../../../styles/styles.buttonsmain";
import { LabelForm } from "../../../../styles/styles.labelsmain";
const registerComponent = () => {
  const [showModalCapture, setShowModalCapture] = useState(false);
  const [uriImgPicture, setUriImgPicture] = useState("/Avatar.png");
  const useImg = useRef(null);

  //Capturando foto tomada
  const capturePicture = async (dataPictureBased64: string) => {
    setUriImgPicture(dataPictureBased64);
  };

  return (
    <>
      <ContainerRegister>
        <CardContainer>
          <LabelForm>Usuario</LabelForm>
          <Input type="text" placeholder="Usuario" />
          <hr />
          <div>
            <div>
              <ImgRegister src={uriImgPicture} ref={useImg} />
            </div>
            <ButtonPrimary onClick={() => setShowModalCapture(true)}>
              Contraseña foto
            </ButtonPrimary>
          </div>
          <hr />
          <div>
            <ButtonPrimary>Registrar</ButtonPrimary>
          </div>
        </CardContainer>
      </ContainerRegister>{" "}
      <ModalCapturePicture
        showStateModal={showModalCapture}
        capturePicture={(data) => capturePicture(data)}
        setShowModalCapture={(data) => setShowModalCapture(data)}
      />
    </>
  );
};

export default registerComponent;
