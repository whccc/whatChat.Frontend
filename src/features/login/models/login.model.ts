//Interface register user
export interface IRegisterUser {
  id?: number;
  email: string;
  userName: string;
  imgBase64?: string;
}

export interface IUser {
  comment: string;
  createdAt: string;
  dataChat: any;
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
