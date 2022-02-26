//Peticiones HTTP modulo Login

import axios from "axios";
import { IApiResponse } from "../../../shared/models/shared.model";
import { IRegisterUser } from "../../models/login.model";

//Registro de un usuario nuevo
export const postRegister = async (
  dataUser: IRegisterUser
): Promise<IApiResponse<IRegisterUser>> => {
  const { data } = await axios.post("http://localhost:5000/api/user", dataUser);
  return data;
};

//Obtener usuario por email
export const getUserByEmail = async (
  email: string
): Promise<IApiResponse<IRegisterUser>> => {
  console.log("apiii");
  const { data } = await axios.get(
    `http://localhost:5000/api/user/by-email/${email}`
  );
  return data;
};
