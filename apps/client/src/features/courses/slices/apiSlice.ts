import {
  PaginatedResAPI,
  ReqSearchAPI,
  ResAPI,
  TagsAPI,
  UnwrappedResAPI,
} from "@/common/types/api";
import { api } from "@/core/store/api";
import { CourseType } from "../types/courses";
import { isArrOK } from "@shared/first/lib/dataStructure.js";

const BASE_URL = "/courses";

export const coursesSliceAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    postCourse: builder.mutation<ResAPI<void>, FormData>({
      query: (data) => ({
        url: BASE_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [{ type: TagsAPI.COURSES_LIST, id: "LIST" }],
    }),

    getCourses: builder.query<
      PaginatedResAPI<{ courses: CourseType[] }>,
      ReqSearchAPI
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

    getCourseByID: builder.query<
      UnwrappedResAPI<{ course: CourseType }>,
      string
    >({
      query: (id) => ({
        url: `${BASE_URL}/${id},`,
        method: "GET",
      }),
      providesTags: [TagsAPI.COURSE_ITEM],
    }),
  }),
});
