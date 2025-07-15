import { TagsAPI, UnwrappedResAPI } from "@/common/types/api";
import { api } from "@/core/store/api";
import { CourseType } from "@/features/courses/types/courses";
import { ConceptType } from "../types";
import { FormQuizType } from "@shared/first/paperwork/concepts/schema.quiz.js";

const BASE_URL = "/concepts";

export const conceptsSliceAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    grabStatsCourse: builder.query<
      UnwrappedResAPI<{ course: Partial<CourseType> }>,
      string
    >({
      query: (courseID) => ({
        url: `${BASE_URL}/course-stats/${courseID}`,
        method: "GET",
      }),
    }),

    addConcept: builder.mutation<
      { concept: ConceptType },
      { data: FormData; courseID: string }
    >({
      query: ({ data, courseID }) => ({
        url: `${BASE_URL}/${courseID}`,
        method: "POST",
        data,
      }),
      invalidatesTags: (res, err, arg) => {
        return [
          TagsAPI.COURSE_PAGE,
          {
            type: TagsAPI.COURSES_LIST,
            id: arg.courseID,
          },
        ];
      },
    }),

    getConceptByID: builder.query<
      UnwrappedResAPI<{ concept: ConceptType }>,
      string
    >({
      query: (conceptID) => ({
        url: `${BASE_URL}/${conceptID}`,
        method: "GET",
      }),
      providesTags: [TagsAPI.CONCEPT_PAGE],
    }),

    checkQuizAnswers: builder.mutation<
      UnwrappedResAPI<{ result: unknown }>,
      { data: FormQuizType; conceptID: string }
    >({
      query: ({ data, conceptID }) => ({
        url: `${BASE_URL}/check/${conceptID}`,
        method: "POST",
        data,
      }),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      invalidatesTags: (res, err, arg) => {
        return [TagsAPI.CONCEPT_PAGE];
      },
    }),
  }),
});
