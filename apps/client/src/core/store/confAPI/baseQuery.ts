/* eslint-disable @typescript-eslint/no-explicit-any */

import { ErrAPI, ResAPI } from "@/common/types/api";
import { axiosInstance } from "@/core/constants/axios";
import { isStr } from "@shared/first/lib/dataStructure";
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
}): Promise<ResAPI<any> | ErrAPI<any>> => {
  try {
    const { data, status } = await axiosInstance({
      url,
      method,
      data: argData,
      params,
      responseType,
    });

    __cg("axios res", data);

    return responseType === "blob"
      ? {
          data: {
            blob: data,
            status,
          },
        }
      : {
          data: {
            ...data,
            status,
          },
        };
  } catch (err: any) {
    const { response } = err ?? {};

    __cg("axios err", err);
    let errData: any = response?.data ?? {};

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
          data: argData instanceof FormData ? JSON.stringify(argData) : argData,
          params,
          responseType,
        },

        data: {
          ...(isStr(errData?.msg)
            ? errData
            : { ...errData, msg: errData?.message }),
          status: response?.status ?? 500,
        },
      },
    };
  }
};
