import { useMutation, useQueryClient } from "react-query";
import { postRegister } from "./api/apiLogin";

//Registarse en el sistema
export const useMutateRegisterLogin = () => {
  return useMutation(postRegister);
};
