import { isServer } from "@/conf";
import { ApiVersion, RestApiMethod } from "@/enum";
import { localStorageTransaction } from "@/utils";
import { AxiosRequestConfig } from "axios";

export class ApiObject {
  _method: RestApiMethod = RestApiMethod.GET;
  _version: ApiVersion = ApiVersion.V1;
  _data: AxiosRequestConfig["data"] = {};
  _params: AxiosRequestConfig["params"] = {};
  _headers: AxiosRequestConfig["headers"] = {};
  _url = "";
  _baseUrl = "http://localhost:8000";
  _routeParams: Record<string, string> = {};
  _doNotRedirect = false;
  _token: string | null = null;
  _otherConfig: AxiosRequestConfig = {};

  v1() {
    this._version = ApiVersion.V1;
    return this;
  }

  v2() {
    this._version = ApiVersion.V1;
    return this;
  }
  get() {
    this._method = RestApiMethod.GET;
    return this;
  }

  post(data?: AxiosRequestConfig["data"]) {
    this._method = RestApiMethod.POST;
    this._data = data;
    return this;
  }

  put(data: AxiosRequestConfig["data"]) {
    this._method = RestApiMethod.PUT;
    this._data = data;
    return this;
  }
  token(token: string | null) {
    this._token = token;
    return this;
  }
  delete() {
    this._method = RestApiMethod.DELETE;
    return this;
  }

  params(params: AxiosRequestConfig["params"]) {
    this._params = params;
    return this;
  }

  headers(headers: AxiosRequestConfig["headers"]) {
    this._headers = headers;
    return this;
  }
  url(url: string) {
    this._url = url;
    return this;
  }
  doNotRedirect() {
    this._doNotRedirect = true;
    return this;
  }

  baseUrl(baseUrl: string) {
    this._baseUrl = baseUrl;
    return this;
  }

  otherConfig(otherConfig: AxiosRequestConfig) {
    this._otherConfig = otherConfig;
    return this;
  }

  async serialize() {
    if (!this._url) throw new Error("url is not defined");
    let token = this._token;
    if (!token) {
      if (!isServer()) token = localStorageTransaction.getItem("userToken") || "";
    }

    return {
      endpoint: `${this._baseUrl}/api/${this._version}/${this._url}`,
      method: this._method,
      data: this._data,
      params: this._params,
      headers: this._headers,
      doNotRedirect: this._doNotRedirect,
      token: token,
      otherConfig: this.otherConfig,
    };
  }
}

export type IApiOptions = ReturnType<ApiObject["serialize"]>;

export const apiObject = (url: string) => new ApiObject().url(url);

export default apiObject;
