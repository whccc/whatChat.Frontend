import axios from "axios";
import { IApiResponse } from "../../../shared/models/shared.model";

//Buscar usuario en el Sistema
export const getUserSearch = async (
  userSearch: string
): Promise<IApiResponse<Array<any>>> => {
  const { data } = await axios.get(
    `http://localhost:5000/api/user/user-by-name/${userSearch}`
  );
  return data;
};
