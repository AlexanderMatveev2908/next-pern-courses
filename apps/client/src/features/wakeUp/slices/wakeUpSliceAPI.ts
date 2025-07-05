import { TagsAPI, UnwrappedResAPI } from "@/common/types/api";
import { api } from "@/core/store/api";
import { isObjOK } from "@shared/first/lib/dataStructure";
import { formatDate } from "@shared/first/lib/formatters";

const BASE_URL = "/wake-up";

export const wakeUpSliceAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    wakeUpFly: builder.query<
      UnwrappedResAPI<{
        when: number;
      }>,
      void
    >({
      query: () => ({
        url: BASE_URL,
        method: "GET",
      }),

      providesTags: (res) => {
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

      // async onQueryStarted(args, { dispatch, queryFulfilled }) {
      //   try {
      //     const res = await queryFulfilled;

      //     const { data } = res;

      //     if (isStr(data?.msg)) dispatch(wakeUpSlice.actions.setIsWakeUp(true));

      //     // __cg("res async query started", res);
      //   } catch (err: any) {
      //     __cg("err async query started", err);
      //   }
      // },
    }),

    sendSomething: builder.mutation<UnwrappedResAPI<void>, void>({
      query: () => ({
        url: BASE_URL,
        method: "POST",
        data: {
          date: formatDate(Date.now()),
        },
      }),
    }),
  }),
});
