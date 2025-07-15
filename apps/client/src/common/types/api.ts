import { BaseQueryType } from "@/core/store/confAPI/baseQuery";
import {
  TypedLazyQueryTrigger,
  TypedUseLazyQueryStateResult,
} from "@reduxjs/toolkit/query/react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export enum TagsAPI {
  TEST = "TEST",
  WAKE_UP = "WAKE_UP",
  DUMMY_TAG_LIST = "DUMMY_TAG_LIST",
  COURSES_LIST = "COURSES_LIST",
  COURSE_PAGE = "COURSE_PAGE",
  CONCEPT_PAGE = "CONCEPT_PAGE",
}

export enum ApiEventType {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  INFO = "INFO",
}

export type ResAPI<T> = {
  data: {
    msg: string;
    status: number;
    blob?: Blob;
  } & T;
};

export type UnwrappedResAPI<T extends void | Record<string, any>> =
  T extends void
    ? { msg: string; status: number; blob?: Blob }
    : { msg: string; status: number; blob?: Blob } & T;

export type ErrAPI<T> = {
  data: { msg: string; status: number };
} & T;

export type PaginatedResAPI<T extends Record<string, any>> =
  UnwrappedResAPI<T> & {
    pages: number;
    nHits: number;
  };

export type ServerModel<T> = {
  id: string;
  createdAt: number;
  deletedAt: number | null;
} & T;

export type TriggerTypeRTK<T, K> = TypedLazyQueryTrigger<T, K, BaseQueryType>;
export type ResultTypeRTK<T, K> = TypedUseLazyQueryStateResult<
  T,
  K,
  BaseQueryType
>;

export type ReqSearchAPI = {
  vals: string;
  _?: number;
};

export type NextParamPageType<T> = {
  params: {} & Promise<T>;
};

export type PropsDOM = {
  children: React.ReactNode;
};
