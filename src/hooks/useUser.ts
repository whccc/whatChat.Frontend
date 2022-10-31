import { IUser } from "../features/login/models/login.model";

export default function useUser() {
  //Obtener Usuario Logueado
  const getUserLogin = (): IUser | null => {
    if (typeof localStorage === "undefined") {
      return null;
    }
    return JSON.parse(localStorage.getItem("userData") || "");
  };
  //Crear usuario logueado
  const setUserLogin = (valueItem: string): void => {
    localStorage.setItem("userWhc", valueItem);
  };
  return { getUserLogin, setUserLogin };
}
