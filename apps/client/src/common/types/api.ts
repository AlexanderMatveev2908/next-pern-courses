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

export type ResAPI<T extends Record<string, any> | void> = {
  data: {
    msg: string;
    status: number;
  } & T;
};

export type UnwrappedResAPI<T extends Record<string, any> | void> = {
  msg: string;
  status: number;
} & T;

export type ErrAPI<T extends Record<string, any> | void> = {
  data: { msg: string; status: number };
} & T;
