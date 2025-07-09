import { TagsAPI } from "@/common/types/api";
import { TagDescription } from "@reduxjs/toolkit/query";
import { __cg } from "@shared/first/lib/logger.js";

export const wrapCallSSR = async <T>(cb: () => Promise<T>) => {
  try {
    const res = await cb();

    // __cg("resCallSSR", res);

    return res;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    __cg("errCallSSR", err);

    throw err;
  }
};

export const wrapCondAssignTags =
  <T extends TagDescription<TagsAPI>>(cond: boolean) =>
  (successArg: T[]) =>
    cond ? successArg : [];
