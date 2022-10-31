export interface IApiResponse<T> {
  data: T;
  operation: {
    code: string;
    message: string;
  };
}

export interface IModalConfirm {
  tittle: string;
  message: string;
  close: () => void;
  showModal: boolean;
  typeMessage: string;
}
