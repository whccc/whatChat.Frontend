export interface IOtherMember {
  idUnique: string;
  userName: string;
  picture: string;
}

export interface IDataMessage {
  of: {
    idUnique: string;
    userName: string;
    picture: string;
  };
  to: string;
  message: string;
  idChat: string;
}

export interface IChatWriting {
  to: string;
  idChat: string;
  writing: boolean;
}
