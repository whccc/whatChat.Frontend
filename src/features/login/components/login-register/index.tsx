import { useContext, useRef, useState } from "react";
import {
  CardContainer,
  ContainerGrid,
} from "../../../../styles/styles.cardmain";
import { ContainerRegister } from "./styles";
import { Input } from "../../../../styles/styles.inputsmain";
import {
  ButtonPrimary,
  ButtonTernary,
} from "../../../../styles/styles.buttonsmain";
import {
  LabelForm,
  LabelFormError,
} from "../../../../styles/styles.labelsmain";
import { useMutateRegisterLogin } from "../../hooks/useLogin";
import { Toast } from "primereact/toast";
import { message } from "../../../../../messageFront";
import { useRouter } from "next/dist/client/router";
import { domainCode } from "../../../../constants/domainApi";
import modalConfirmContext from "../../../../context/modalConfirmContext";

const registerComponent = () => {
  const toast = useRef<any>(null);
  const { handleChangeDataModalConfirm } = useContext(modalConfirmContext);

  //Hook
  const { mutate } = useMutateRegisterLogin();
  const router = useRouter();

  //Formulario registro
  const [email, setEmail] = useState({ value: null || "", showError: false });
  const [userName, setUserName] = useState({
    value: null || "",
    showError: false,
  });

  //Registrar usuario
  const onRegisterUser = () => {
    if (!email.value) {
      setEmail({ ...email, showError: true });
      return;
    }
    if (!userName.value) {
      setUserName({ ...userName, showError: true });
      return;
    }

    mutate(
      {
        email: email.value,
        userName: userName.value,
      },
      {
        onSuccess: ({ operation }) => {
          if (operation.code === domainCode.BUSINESS) {
            showMessage("Registro", operation.message, "Error");
            return;
          }
          successRegister(operation.message);
        },
      }
    );
  };

  const successRegister = (message: string) => {
    if (!toast || !toast.current) {
      return;
    }
    showMessage("Registro", message, "Success");
    setUserName({ ...userName, value: "" });
    setEmail({ ...email, value: "" });
  };

  const showMessage = (
    tittle: string,
    message: string,
    typeMessage: string
  ) => {
    handleChangeDataModalConfirm(true, tittle, message, typeMessage);
  };

  return (
    <>
      <ContainerRegister>
        <Toast ref={toast} />
        <CardContainer>
          <h2 className="text-left">Registro</h2>
          <hr />
          <ContainerGrid>
            <div>
              <LabelForm>Email</LabelForm>
              <Input
                type="email"
                placeholder="Email"
                value={email.value}
                onChange={(e) => {
                  setEmail({ value: e.target.value.trim(), showError: false });
                }}
                showError={email.showError}
              />
              {email.showError && (
                <LabelFormError>Este campo es requerido.</LabelFormError>
              )}
            </div>
            <div>
              <LabelForm>Nombre</LabelForm>
              <Input
                type="text"
                placeholder="Nombre"
                value={userName.value}
                onChange={(e) => {
                  setUserName({ value: e.target.value, showError: false });
                }}
                showError={userName.showError}
              />
              {userName.showError && (
                <LabelFormError>Este campo es requerido.</LabelFormError>
              )}
            </div>
          </ContainerGrid>
          <hr />

          <div className="text-right">
            <ButtonTernary
              onClick={() => router.push("/Login")}
              className="margin-right"
            >
              Iniciar Sesión
            </ButtonTernary>
            <ButtonPrimary onClick={onRegisterUser}>Registrar</ButtonPrimary>
          </div>
        </CardContainer>
      </ContainerRegister>
    </>
  );
};

export default registerComponent;
