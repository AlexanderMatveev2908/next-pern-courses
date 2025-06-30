import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./confAPI/baseQuery";
import { TagsAPI } from "@/clientShared/types/api";

export const api = createApi({
  baseQuery: axiosBaseQuery,
  tagTypes: Object.values(TagsAPI),
  reducerPath: "api",
  endpoints: () => ({}),
});
