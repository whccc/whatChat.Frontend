import { useRef, useState } from "react";
import ModalCapturePicture from "../login-modal-capture-picture";
import { CardContainer } from "../../../../styles/styles.cardmain";
import { ContainerRegister, ImgRegister } from "./styles";
import { Input } from "../../../../styles/styles.inputsmain";
import { ButtonPrimary } from "../../../../styles/styles.buttonsmain";
import { LabelForm } from "../../../../styles/styles.labelsmain";
import { useMutateRegisterLogin } from "../../hooks/useLogin";
import { Toast } from "primereact/toast";
import { message } from "../../../../../messageFront";
import { useRouter } from "next/dist/client/router";

const registerComponent = () => {
  const [showModalCapture, setShowModalCapture] = useState(false);
  const [uriImgPicture, setUriImgPicture] = useState("/Avatar.png");
  const useImg = useRef(null);
  const toast = useRef<any>(null);

  //Hook
  const { mutate } = useMutateRegisterLogin();
  const router = useRouter();

  //Formulario registro
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");

  //Capturando foto tomada
  const capturePicture = async (dataPictureBased64: string) => {
    setUriImgPicture(dataPictureBased64);
  };

  //Registrar usuario
  const onRegisterUser = () => {
    mutate(
      {
        email,
        password: uriImgPicture,
        userName,
      },
      {
        onSuccess: (successData) => {
          if (!toast || !toast.current) {
            return;
          }
          toast.current.show({
            severity: "success",
            detail: message.successRegister.replace(
              "DATA_USER",
              successData.data.userName
            ),
          });
          setUserName("");
          setEmail("");
          setUriImgPicture("/Avatar.png");

          setTimeout(() => {
            router.push("/Login");
          }, 2000);
        },
        onError: () => {
          if (!toast || !toast.current) {
            return;
          }
          toast.current.show({
            severity: "error",
            detail: message.failOperation,
          });
        },
      }
    );
  };
  return (
    <>
      <ContainerRegister>
        <Toast ref={toast} />
        <CardContainer>
          <LabelForm>Email</LabelForm>
          <Input
            type="text"
            placeholder="Usuario"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
          />
          <LabelForm>Nombre</LabelForm>
          <Input
            type={"text"}
            placeholder="Nombre"
            value={userName}
            onChange={(e) => setUserName(e.target.value.trim())}
          />

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
            <ButtonPrimary onClick={() => router.push("/Login")}>
              Cancelar
            </ButtonPrimary>{" "}
            <ButtonPrimary onClick={onRegisterUser}>Registrar</ButtonPrimary>
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
