import { PaginatedResAPI, ResAPI, TagsAPI } from "@/common/types/api";
import { api } from "@/core/store/api";
import { CourseType } from "../types/courses";
import { isArrOK } from "@shared/first/lib/dataStructure.js";

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
      providesTags: (res) => [
        ...(!isArrOK(res?.courses)
          ? [
              {
                type: TagsAPI.COURSES_LIST,
                id: "LIST",
              },
            ]
          : [
              ...res!.courses.map((c) => ({
                type: TagsAPI.COURSES_LIST,
                id: c.id,
              })),
              {
                type: TagsAPI.COURSES_LIST,
                id: "LIST",
              },
            ]),
      ],
    }),
  }),
});
