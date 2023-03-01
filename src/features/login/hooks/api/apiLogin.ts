//Peticiones HTTP modulo Login

import axios from "axios";
import { IApiResponse } from "../../../shared/models/shared.model";
import { IRegisterUser, IUser } from "../../models/login.model";

//Registro de un usuario nuevo
export const postRegister = async (
  dataUser: IRegisterUser
): Promise<IApiResponse<IRegisterUser>> => {
  const { data } = await axios.post(
    "https://192.168.20.5:5000/api/auth/register",
    {
      dataUser,
    }
  );
  return data;
};

//Obtener usuario por email
export const getUserByEmail = async (
  email: string
): Promise<IApiResponse<IUser>> => {
  const { data } = await axios.post(
    `https://192.168.20.5:5000/api/auth/login`,
    {
      email,
    }
  );

  return data;
};
