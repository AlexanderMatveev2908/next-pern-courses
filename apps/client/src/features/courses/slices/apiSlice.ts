import { PaginatedResAPI, ResAPI, TagsAPI } from "@/common/types/api";
import { api } from "@/core/store/api";
import { CourseType } from "../types/courses";
import { isArrOK } from "@shared/first/lib/dataStructure.js";
import { wrapCondAssignTags } from "@/core/lib/api";

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
      providesTags: (res) =>
        wrapCondAssignTags(isArrOK(res?.courses))([
          ...res!.courses.map((el) => ({
            type: TagsAPI.COURSES_LIST,
            id: el.id,
          })),
          {
            type: TagsAPI.COURSES_LIST,
            id: "LIST",
          },
        ]),
    }),
  }),
});
