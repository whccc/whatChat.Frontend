import { useContext } from "react";
import { useMutation, useQuery } from "react-query";
import modalConfirmContext from "../../../context/modalConfirmContext";
import { getUserByEmail, postRegister } from "./api/apiLogin";

const dataUseContext = () => {
  const dataUseContext = useContext(modalConfirmContext);

  return { ...dataUseContext };
};

//Registarse en el sistema
export const useMutateRegisterLogin = () => {
  const { handleChangeDataModalConfirm } = dataUseContext();
  return useMutation(postRegister, {
    onError: () => {
      handleChangeDataModalConfirm(
        true,
        "Error",
        "Error en el servidor.",
        "Error"
      );
    },
  });
};

//Obtener usuario por email
export const useGetUserByEmail = (email: string) => {
  const { handleChangeDataModalConfirm } = dataUseContext();
  return useQuery(["userByEmail"], () => getUserByEmail(email), {
    enabled: false,
    onError: () => {
      handleChangeDataModalConfirm(
        true,
        "Error",
        "Error en el servidor.",
        "Error"
      );
    },
  });
};
