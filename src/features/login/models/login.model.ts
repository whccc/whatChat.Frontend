import { TypesChat } from "../../../constants/typesChat";
import { IChatOf } from "../../chat/models/chat.model";

//Interface register user
export interface IRegisterUser {
  id?: number;
  email: string;
  userName: string;
  imgBase64?: string;
}

export interface IChat {
  idChat: string | null;
  members:
    | Array<{
        idUnique: string;
        userName: string;
        picture: string;
      }>
    | [];
  messages: Array<{ message: string; of: IChatOf }>;
  typeChat: TypesChat | null;
  order: number;
  isWriting: boolean;
}
export interface IUser {
  comment: string;
  createdAt: string;
  dataChats: Array<IChat>;
  email: string;
  id: string;
  idUnique: string;
  password: string;
  phone: string;
  picture: string;
  token?: string;
  updateAt: string;
  userName: string;
}
