import { ButtonPrimary } from "../../../../styles/styles.buttonsmain";
import { CardContainer } from "../../../../styles/styles.cardmain";
import { Input } from "../../../../styles/styles.inputsmain";
import { LabelForm } from "../../../../styles/styles.labelsmain";
import Link from "next/link";
import Camera from "react-html5-camera-photo";
import { ContainerLogin } from "./styles";
import { ContainerModalCamera } from "../../../../styles/styles.modalmain";
import { useRouter } from "next/dist/client/router";
const loginComponent = () => {
  const router = useRouter();
  //Obtener foto
  const handledTakePicture = (pictureBase64: string) => {};

  return (
    <>
      <ContainerLogin>
        <CardContainer>
          <h3>Login - WhcChat</h3>
          <hr />
          <LabelForm>Email</LabelForm>
          <Input type={"text"} placeholder="Email" />
          <LabelForm>Contraseña Rostro</LabelForm>
          <ContainerModalCamera>
            <Camera sizeFactor={1} onTakePhoto={(imgBase64: string) => {}} />
          </ContainerModalCamera>
          <hr />
          <ButtonPrimary>Iniciar Sesión</ButtonPrimary>{" "}
          <ButtonPrimary onClick={() => router.push("/Login/Register")}>
            Registro
          </ButtonPrimary>
        </CardContainer>
      </ContainerLogin>
    </>
  );
};

export default loginComponent;
