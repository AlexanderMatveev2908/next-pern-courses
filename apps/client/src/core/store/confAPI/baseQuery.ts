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
    const res = await axiosInstance({
      url,
      method,
      data: argData,
      params,
      responseType,
    });

    const result =
      responseType === "blob"
        ? {
            blob: res.data,
            status: res.status,
          }
        : {
            data: res.data,
            status: res.status,
          };

    return {
      data: result,
    };
  } catch (err: any) {
    let errData = err?.response?.data;
    const status: number = err?.response?.status ?? 500;

    if (errData instanceof Blob && errData.type === "application/json") {
      try {
        const txt = await errData.text();
        errData = JSON.parse(txt);
      } catch (err: any) {
        __cg("blob parse err", err);
      }
    }

    __cg("axios err", errData, status);

    return {
      error: {
        config: {
          url,
          method,
          data: argData,
          params,
          responseType,
        },
        status,
        data: errData,
      },
    };
  }
};
