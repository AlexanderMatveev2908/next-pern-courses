/* eslint-disable @typescript-eslint/no-explicit-any */
export enum TagsAPI {
  TEST = "TEST",
}

export enum ApiEventType {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
}

export type ResAPI<T extends Record<string, any>> = {
  data: {
    msg: string;
    status: number;
  } & T;
};

export type ErrAPI<T extends Record<string, any>> = {
  data: {
    msg: string;
    status: number;
  } & T;
};
