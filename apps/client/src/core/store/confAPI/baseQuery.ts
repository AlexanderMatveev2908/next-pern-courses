/* eslint-disable @typescript-eslint/no-explicit-any */

import { axiosInstance } from "@/core/constants/axios";
import { __cg } from "@shared/first/lib/logger.js";

export const axiosBaseQuery = async ({
  url,
  method,
  data: argData,
  params,
  responseType,
}: {
  url: string;
  method: string;
  data?: any;
  params?: any;
  responseType?: any;
}): Promise<any> => {
  try {
    const { data, status } = await axiosInstance({
      url,
      method,
      data: argData,
      params,
      responseType,
    });

    return responseType === "blob"
      ? {
          data: {
            blob: data,
            status,
          },
        }
      : {
          data: {
            data,
            status,
          },
        };
  } catch (err: any) {
    const { response } = err ?? {};

    let errData: any = response?.data;

    __cg("axios err", errData);

    if (errData instanceof Blob && errData.type === "application/json") {
      try {
        const text = await errData.text();
        errData = JSON.parse(text);
      } catch (parseErr: any) {
        __cg("Failed parse blob error", parseErr);
        errData = { msg: "Invalid JSON in blob response" };
      }
    }

    return {
      error: {
        config: {
          url,
          method,
          data: argData,
          params,
          responseType,
        },

        data: {
          ...errData,
          status: response?.status ?? 500,
        },
      },
    };
  }
};
