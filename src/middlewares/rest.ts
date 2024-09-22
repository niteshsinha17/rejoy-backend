import { nconf } from "@/conf";
import { IApiRequestData, IApiRequestOutput } from "@/models/rest.inerface";
import { localStorageTransaction } from "@/utils";
import axios from "axios";

export const getApi = async <D, E = string>(
  data: IApiRequestData
): Promise<IApiRequestOutput<D, E>> => {
  let token = null;

  if (typeof window !== "undefined") {
    token = localStorageTransaction.getItem("userToken");
  }

  return await axios
    .get(`${data.baseUrl || nconf.get("BACK_END_HOST")}/${data.endpoint}`, {
      headers: {
        ...data.headers,
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
      return {
        success: true,
        data: res.data?.data as D,
      };
    })
    .catch((error) => {
      return {
        success: false,
        error: error as E,
      };
    });
};

export const postApi = async <D, E = string>(
  data: IApiRequestData
): Promise<IApiRequestOutput<D, E>> => {
  const token = localStorageTransaction.getItem("userToken");

  return await axios
    .post(
      `${data.baseUrl || nconf.get("BACK_END_HOST")}/${data.endpoint}`,
      data.data,
      {
        headers: {
          ...data.headers,
          Authorization: `Token ${token}`,
        },
      }
    )
    .then((res) => {
      return {
        success: true,
        data: res.data?.data as D,
      };
    })
    .catch((error) => {
      return {
        success: false,
        error: error as E,
      };
    });
};

export const putApi = async <D, E = string>(
  data: IApiRequestData
): Promise<IApiRequestOutput<D, E>> => {
  const token = localStorageTransaction.getItem("userToken");

  return await axios
    .put(
      `${data.baseUrl || nconf.get("BACK_END_HOST")}/${data.endpoint}`,
      data.data,
      {
        headers: {
          ...data.headers,
          Authorization: `Token ${token}`,
        },
      }
    )
    .then((res) => {
      return {
        success: true,
        data: res.data?.data as D,
      };
    })
    .catch((error) => {
      return {
        success: false,
        error: error as E,
      };
    });
};

export const delApi = async <D, E = string>(
  data: IApiRequestData
): Promise<IApiRequestOutput<D, E>> => {
  const token = localStorageTransaction.getItem("userToken");

  return await axios
    .delete(`${data.baseUrl || nconf.get("BACK_END_HOST")}/${data.endpoint}`, {
      headers: {
        ...data.headers,
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
      return {
        success: true,
        data: res.data?.data as D,
      };
    })
    .catch((error) => {
      return {
        success: false,
        error: error as E,
      };
    });
};
