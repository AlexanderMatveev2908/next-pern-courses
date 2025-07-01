export const isStr = (val?: string | null): boolean =>
  typeof val === "string" && !!val.trim().length;
