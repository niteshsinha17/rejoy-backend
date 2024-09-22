import { isServer } from "@/conf";
import { HttpResponseStatus, ROUTES } from "@/enum";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ApiObject } from ".";

export const baseQuery = async <D = any, E = any>(apiObject: ApiObject) => {
  const options = await apiObject.serialize();
  const res = await axios({
    method: options.method,
    url: options.endpoint,
    data: options.data,
    params: options.params,
    headers: {
      ...options.headers,
      Authorization: `Token ${options.token}`,
      Timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    ...options.otherConfig,
  })
    .then((res) => {
      return {
        data: res.data.data as D,
      };
    })
    .catch((err: AxiosError) => {
      const errStatus = err.response?.status || -1;
      const errorResponse: any = err.response?.data;
      return {
        error: {
          status: errStatus as HttpResponseStatus,
          errors: errorResponse?.errors as E,
          message: errorResponse?.message || (err.message as string),
        },
      };
    });

  if ("error" in res) {
    const errStatus = res.error.status;
    switch (errStatus) {
      case HttpResponseStatus.UNAUTHORIZED: {
        if (!options.doNotRedirect) {
          if (!isServer()) {
            toast.error("Session Expired");
            localStorage.removeItem("token");
          }
          window.location.assign(ROUTES.LOGIN);
        }
        break;
      }
      default:
        break;
    }
  }
  return res;
};

interface IErrorResponse<E = any> {
  status: HttpResponseStatus;
  errors: E;
  message: string;
}

export const baseApiQuery = <D = any, E = any>(apiObject: ApiObject) => {
  let onSuccessCallback: ((data: D) => void) | null = null;
  let onErrorCallback: ((error: IErrorResponse<E>) => void) | null = null;
  let finallyCallback: (() => void) | null = null;

  const options = {
    onSuccess: (callback: (data: D) => void) => {
      onSuccessCallback = callback;
      return options;
    },
    onError: (callback: (error: IErrorResponse<E>) => void) => {
      onErrorCallback = callback;
      return options;
    },
    finally: (callback: () => void) => {
      finallyCallback = callback;
      return options;
    },
    execute: () => {
      baseQuery<D, E>(apiObject).then((res) => {
        if ("data" in res) {
          onSuccessCallback && onSuccessCallback(res.data);
        } else {
          onErrorCallback && onErrorCallback(res.error);
        }
        finallyCallback && finallyCallback();
      });
    },
  };
  return options;
};
