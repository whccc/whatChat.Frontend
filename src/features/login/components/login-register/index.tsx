import { useState } from "react";
import ModalCapturePicture from "../login-modal-capture-picture";
import { CardContainer } from "../../../../styles/styles.cardmain";
const registerComponent = () => {
  const [showModalCapture, setShowModalCapture] = useState(false);
  const [uriImgPicture, setUriImgPicture] = useState("");

  //Capturando foto tomada
  const capturePicture = (dataPictureBased64: string) => {
    setUriImgPicture(dataPictureBased64);
  };

  return (
    <CardContainer>
      <div>
        <label>Usuario</label>
        <input type="text" />
        <hr />
        <div>
          <div>
            <img src={uriImgPicture} />
          </div>
          <button onClick={() => setShowModalCapture(true)}>Tomar foto</button>
        </div>
        <div>
          <button>Registrar</button>
        </div>
      </div>

      <ModalCapturePicture
        showStateModal={showModalCapture}
        capturePicture={(data) => capturePicture(data)}
        setShowModalCapture={(data) => setShowModalCapture(data)}
      />
    </CardContainer>
  );
};

export default registerComponent;
