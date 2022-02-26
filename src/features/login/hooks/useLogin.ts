import { useMutation, useQuery, useQueryClient } from "react-query";
import { getUserByEmail, postRegister } from "./api/apiLogin";

//Registarse en el sistema
export const useMutateRegisterLogin = () => {
  return useMutation(postRegister);
};

//Obtener usuario por email
export const useGetUserByEmail = (email: string) => {
  return useQuery(["userByEmail"], () => getUserByEmail(email), {
    enabled: false,
  });
};
