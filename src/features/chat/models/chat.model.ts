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

export interface IChatOf {
  idUnique: string;
  picture: string;
  userName: string;
}

export interface ICallUser {
  signal: any;
  from: string;
  name: string;
}
