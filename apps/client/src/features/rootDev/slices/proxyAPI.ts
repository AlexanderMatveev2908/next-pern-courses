/* eslint-disable @typescript-eslint/no-explicit-any */
import { envApp } from "@/core/constants/env";
import { api } from "@/core/store/api";
import { __cg } from "@shared/first/lib/logger.js";
import axios from "axios";

const BASE_URL = "/proxy";

export const proxySliceAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    grabServerAssets: builder.query<any, any>({
      query: () => ({
        url: BASE_URL,
        method: "GET",
      }),
    }),

    grabBlobAssets: builder.query<any, void>({
      // query: () => ({
      //   url: "/proxy/blob",
      //   method: "GET",
      //   responseType: "blob",
      // }),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async queryFn(_, appAPI, extraOpt, baseQueryWrapper) {
        try {
          const { data: blobData, status } = await axios.get(
            `${BASE_URL}/blob`,
            {
              responseType: "blob",
              baseURL: envApp.BACK_URL,
            },
          );

          return {
            data: {
              blob: blobData,
              status,
            },
          };
        } catch (err: any) {
          __cg("err blob", err);

          throw err;
        }
      },
    }),

    grabServerMd: builder.query<any, void>({
      query: () => ({
        url: `${BASE_URL}/markdown`,
        method: "GET",
      }),
    }),
  }),
});
