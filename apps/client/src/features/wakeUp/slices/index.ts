/* eslint-disable @typescript-eslint/no-explicit-any */
import { TagsAPI, UnwrappedResAPI } from "@/common/types/api";
import { api } from "@/core/store/api";
import { isObjOK } from "@shared/first/lib/dataStructure";
import { __cg } from "@shared/first/lib/logger";

const BASE_URL = "/wake-up";

export const wakeUpSliceAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    wakeUpFly: builder.query<UnwrappedResAPI<void>, void>({
      query: () => ({
        url: BASE_URL,
        method: "GET",
      }),

      providesTags: (res) => {
        __cg("provide tags res", res);

        return [
          ...(isObjOK(res)
            ? [
                {
                  type: TagsAPI.WAKE_UP,
                  id: "LIST",
                },
              ]
            : []),
        ];
      },

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async onQueryStarted(args, { dispatch: _, queryFulfilled }) {
        try {
          const res = await queryFulfilled;

          __cg("res async query started", res);
        } catch (err: any) {
          __cg("err async query started", err);
        }
      },
    }),
  }),
});
