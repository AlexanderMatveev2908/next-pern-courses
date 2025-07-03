import { ResAPI } from "@/common/types/api";
import { api } from "@/core/store/api";

const BASE_URL = "/courses";

export const coursesSliceAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    postCourse: builder.mutation<ResAPI<{ msg: string }>, { msg: "test" }>({
      query: (data) => ({
        url: BASE_URL,
        method: "POST",
        data: { msg: "test" },
      }),
    }),
  }),
});
