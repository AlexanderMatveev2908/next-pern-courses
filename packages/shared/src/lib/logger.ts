import { formatDate } from "./formatters.js";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const __cg = (title: string, ...args: any[]) => {
  console.group(title.toUpperCase());

  for (const el of args) {
    console.log(el);
  }

  console.groupEnd();

  const trace = new Error();
  const traces = trace.stack?.split("\n");

  const firstTrace = traces?.[2];

  const path = firstTrace?.split("src")?.[1];

  console.log(`=> ${path} ℹ️ \n ${formatDate(Date.now())} ⏰`);
};
