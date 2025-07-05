/* eslint-disable @typescript-eslint/no-explicit-any */
export enum TagsAPI {
  TEST = "TEST",
  WAKE_UP = "WAKE_UP",
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
  } & T;
};

export type UnwrappedResAPI<T extends void | Record<string, any>> =
  T extends void
    ? { msg: string; status: number }
    : { msg: string; status: number } & T;

export type ErrAPI<T> = {
  data: { msg: string; status: number };
} & T;
