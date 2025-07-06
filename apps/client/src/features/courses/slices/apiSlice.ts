import { PaginatedResAPI, ResAPI } from "@/common/types/api";
import { api } from "@/core/store/api";
import { CourseType } from "../types/courses";

const BASE_URL = "/courses";

export const coursesSliceAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    postCourse: builder.mutation<ResAPI<{ msg: string }>, FormData>({
      query: (data) => ({
        url: BASE_URL,
        method: "POST",
        data,
      }),
    }),

    getCourses: builder.query<
      PaginatedResAPI<{ courses: CourseType[] }>,
      { vals: string }
    >({
      query: ({ vals }) => ({
        url: `${BASE_URL}?${vals}`,
        method: "GET",
      }),
    }),
  }),
});
