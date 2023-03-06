import axios from "axios";
import { ApiResponse } from "../../../../constants/api.response";
import { IUser } from "../../../login/models/login.model";

export const updateSettingApi = async (
  dataForm: any
): Promise<ApiResponse<IUser>> => {
  const { id, name, idUnique, phone, comment, file, changePhoto } = dataForm;
  const form = new FormData();
  form.append("id", id);
  form.append("name", name);
  form.append("idUnique", idUnique);
  form.append("phone", phone);
  form.append("comment", comment);
  form.append("changePhoto", changePhoto);
  form.append("file", file);
  const { data } = await axios.post(
    `https://192.168.20.5:5000/api/user/update-data-setting`,
    form,
    {
      headers: {
        "Content-Type": "multipart/form-data;",
      },
    }
  );
  return data;
};
