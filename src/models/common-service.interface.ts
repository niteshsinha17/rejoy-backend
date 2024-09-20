export interface IErrorResponse<E = undefined> {
  errors: E;
  message: string;
}
