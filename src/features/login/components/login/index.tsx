import { ButtonPrimary } from "../../../../styles/styles.buttonsmain";
import { CardContainer } from "../../../../styles/styles.cardmain";
import { Input } from "../../../../styles/styles.inputsmain";
import { LabelForm } from "../../../../styles/styles.labelsmain";
import Link from "next/link";
import Camera from "react-html5-camera-photo";
import { ContainerImgMatch, ContainerLogin } from "./styles";
import { ContainerModalCamera } from "../../../../styles/styles.modalmain";
import { useRouter } from "next/dist/client/router";
import { useEffect, useRef, useState } from "react";
import { useGetUserByEmail } from "../../hooks/useLogin";
import { QueryClient, useQueryClient } from "react-query";
import { Toast } from "primereact/toast";
import { getFullFaceDescription, loadModels } from "../../../faceapi/face";
import { domainCode } from "../../../helpers/domainApi";

const loginComponent = () => {
  const [pictureBase64, setPictureBase64] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const imgRefUser = useRef(null);
  const toast = useRef<any>(null);
  //Hooks
  const { data, refetch } = useGetUserByEmail(email);
  const queryClient = useQueryClient();
  //Cargando modelos de detección de cara
  useEffect(() => {
    loadModels();
  }, []);

  //Validando macth entre imagenes
  const validImgsUser = async () => {
    console.log(data, "dataa");
    if (data?.operation.code === domainCode.FAIL) {
      toast.current.show({
        severity: "success",
        summary: "Success Message",
        detail: "Order submitted",
      });
      queryClient.setQueriesData("userByEmail", null);
      return;
    }
    //Validando fotos clave usuario
    const valid = await getFullFaceDescription(
      imgRefUser.current,
      data!.data.imgBase64
    );
    if (!valid) {
      queryClient.setQueriesData("userByEmail", null);
    }

    if (valid <= 0.5) {
      alert("bienvenido");
    }
  };
  //Obtener foto
  const handledTakePicture = (pictureBase64: string): void => {
    setPictureBase64(pictureBase64);
  };

  //Obtener usuario por email
  const getUserByEmail = () => {
    refetch();
  };

  useEffect(() => {
    if (!data) {
      return;
    }
    validImgsUser();
  }, [data]);

  return (
    <>
      <Toast ref={toast} />
      <ContainerLogin>
        <CardContainer>
          <h3>Login - WhcChat</h3>
          <hr />
          <LabelForm>Email</LabelForm>
          <Input
            type={"text"}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
          />
          <LabelForm>Contraseña Rostro</LabelForm>
          {pictureBase64 ? (
            <ContainerImgMatch>
              <img src={pictureBase64} ref={imgRefUser} />
              <ButtonPrimary
                onClick={() => {
                  setPictureBase64("");
                }}
              >
                Cancelar
              </ButtonPrimary>
            </ContainerImgMatch>
          ) : (
            <ContainerModalCamera>
              <Camera
                sizeFactor={1}
                onTakePhoto={(imgBase64: string) => {
                  handledTakePicture(imgBase64);
                }}
              />
            </ContainerModalCamera>
          )}
          <hr />
          <ButtonPrimary onClick={() => getUserByEmail()}>
            Iniciar Sesión
          </ButtonPrimary>{" "}
          <ButtonPrimary onClick={() => router.push("/Login/Register")}>
            Registro
          </ButtonPrimary>
        </CardContainer>
      </ContainerLogin>
    </>
  );
};

export default loginComponent;
