export enum TagsAPI {
  TEST = "TEST",
}

export enum ApiEventType {
  success = "success",
  error = "error",
  info = "info",
}

export type ResAPI<T> = {
  data: {
    msg: string;
  } & T;
  status: number;
};

export type ErrAPI<T> = {
  data: {
    msg: string;
  } & T;
};
