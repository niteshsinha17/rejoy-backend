export interface IErrorResponse<E = undefined> {
  errors: E;
  message: string;
}

export interface IPaginatedResponse<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}
