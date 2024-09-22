import { IMap } from "./common.interface";

export interface IApiRequestData {
  endpoint: string;
  data?: any;
  baseUrl?: string;
  customErr?: boolean;
  headers?: IMap<string | number>;
  options?: IMap<any>;
  query?: IMap<any>;
}

export interface IApiRequestOutput<D, E> {
  success: boolean;
  data?: D;
  error?: E;
}
