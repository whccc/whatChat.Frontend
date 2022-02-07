export interface IApiResponse<T> {
  data: T;
  operation: {
    code: string;
    message: string;
  };
}
