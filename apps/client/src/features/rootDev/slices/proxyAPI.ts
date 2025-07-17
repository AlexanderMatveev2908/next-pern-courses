/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "@/core/constants/axios";
import { envApp } from "@/core/constants/env";
import { api } from "@/core/store/api";
import { __cg } from "@shared/first/lib/logger.js";
import axios from "axios";
import jsZIP from "jszip";

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

    grabAssetsZip: builder.query<any, any>({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async queryFn(_, appAPI, extraOpt, baseQueryWrapper) {
        try {
          const { data: blobData } = await axiosInstance.get("/proxy/zip", {
            responseType: "blob",
          });

          const zip = await jsZIP.loadAsync(blobData);
          const parsedFiles: Record<string, any> = {};

          for (const k of Object.keys(zip.files)) {
            const file = zip.files[k];

            if (k.endsWith(".json")) {
              parsedFiles[k] = JSON.parse(await file.async("text"));
            } else if (["txt", "md"].some((ext) => k.endsWith(`.${ext}`))) {
              parsedFiles[k] = await file.async("text");
            } else {
              const blob = await file.async("blob");
              parsedFiles[k] = URL.createObjectURL(blob);
            }
          }

          return { data: parsedFiles };
        } catch (err: any) {
          __cg("zip err", err);

          throw err;
        }
      },
    }),
  }),
});
