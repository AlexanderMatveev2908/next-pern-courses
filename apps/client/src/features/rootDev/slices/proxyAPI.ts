/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/core/store/api";

export const proxySliceAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    grabServerAssets: builder.query<any, any>({
      query: () => ({
        url: "/proxy",
        method: "GET",
      }),
    }),
  }),
});
