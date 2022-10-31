import {
  ButtonPrimary,
  ButtonTernary,
} from "../../../../styles/styles.buttonsmain";
import {
  CardContainer,
  ContainerGrid,
} from "../../../../styles/styles.cardmain";
import { Input } from "../../../../styles/styles.inputsmain";
import {
  LabelForm,
  LabelFormError,
} from "../../../../styles/styles.labelsmain";
import { ContainerLogin } from "./styles";
import { useRouter } from "next/dist/client/router";
import { useContext, useEffect, useRef, useState } from "react";
import { useGetUserByEmail } from "../../hooks/useLogin";
import { Toast } from "primereact/toast";
import { domainCode } from "../../../../helpers/domainApi";
import modalConfirmContext from "../../../../context/modalConfirmContext";
import { IApiResponse } from "../../../shared/models/shared.model";
import { IRegisterUser, IUser } from "../../models/login.model";

const loginComponent = () => {
  const { handleChangeDataModalConfirm } = useContext(modalConfirmContext);
  const [email, setEmail] = useState({
    value: null || "",
    showError: false,
  });
  const router = useRouter();
  const toast = useRef<any>(null);

  //Hooks
  const { refetch } = useGetUserByEmail(email.value);

  const dataUserFetch = ({ data, operation }: IApiResponse<IUser>) => {
    if (!data) {
      return;
    }
    if (operation.code === domainCode.BUSINESS) {
      handleChangeDataModalConfirm(
        true,
        "No existe",
        operation.message,
        "Error"
      );
      return;
    }
    localStorage.setItem("token", JSON.stringify(data.token));
    document.cookie = `token=${data.token}; path=/`;
    delete data["token"];
    localStorage.setItem("userData", JSON.stringify(data));
    router.push("/Chat");
  };

  const getUserByEmail = async () => {
    if (!email.value) {
      setEmail({ ...email, showError: true });
      return;
    }
    const data = await refetch();
    if (data && data.data) {
      dataUserFetch(data.data);
    }
  };
  return (
    <>
      <Toast ref={toast} />
      <ContainerLogin>
        <CardContainer>
          <h2>Login</h2>
          <hr />
          <ContainerGrid>
            <div>
              <LabelForm>Email</LabelForm>
              <Input
                type={"text"}
                placeholder="Email"
                value={email.value}
                onChange={(e) =>
                  setEmail({ value: e.target.value.trim(), showError: false })
                }
                showError={email.showError}
              />
              {email.showError && (
                <LabelFormError>Este campo es requerido.</LabelFormError>
              )}
            </div>
          </ContainerGrid>
          <hr />

          <div className="text-right">
            <ButtonTernary
              className="margin-right"
              onClick={() => router.push("/Login/Register")}
            >
              Registro
            </ButtonTernary>
            <ButtonPrimary
              onClick={() => {
                getUserByEmail();
              }}
            >
              Iniciar Sesión
            </ButtonPrimary>
          </div>
        </CardContainer>
      </ContainerLogin>
    </>
  );
};

export default loginComponent;
