import { useContext } from "react";
import { useMutation } from "react-query";
import modalConfirmContext from "../../../context/modalConfirmContext";
import { updateSettingApi } from "./api/apiSetting";
const dataUseContext = () => {
  const dataUseContext = useContext(modalConfirmContext);

  return { ...dataUseContext };
};
export const updateSetting = () => {
  const { handleChangeDataModalConfirm } = dataUseContext();
  return useMutation(updateSettingApi, {
    onError: () =>
      handleChangeDataModalConfirm(
        true,
        "Error",
        "Error en el servidor.",
        "Error"
      ),
  });
};
