import { isObjOK, isStr } from "@shared/first/lib/dataStructure";
import { __cg } from "@shared/first/lib/logger.js";

export const genFormData = <T>(data: T) => {
  const formData = new FormData();

  for (const k in data) {
    const v = data[k as keyof T];

    if (!v) continue;

    if (Array.isArray(v)) {
      let i = 0;

      if (!v.length) continue;

      while (i < v.length) {
        const curr = v[i];

        if (curr instanceof File) {
          formData.append(k, curr);
        } else if (typeof curr === "string") {
          formData.append(k, curr);
        } else if (
          typeof curr === "object" &&
          curr !== null &&
          /^\w+\.\d+\.\w+$/.test(curr.name)
        ) {
          if (!isObjOK(curr)) continue;

          formData.append(k, JSON.stringify(curr));
        }

        i++;
      }
    } else if (v instanceof File || typeof v === "string") {
      formData.append(k, v);
    }
  }

  // for (const [key, val] of formData.entries()) {
  //   if (val instanceof File) {
  //     console.log(`📁 ${key}:`, val.name, val.size);
  //   } else {
  //     console.log(`📄 ${key}:`, val);
  //   }
  // }

  return formData;
};

export const genURLSearchParams = <T>(obj: T): string => {
  const urlParams = new URLSearchParams();

  for (const k in obj) {
    const v = obj[k as keyof T];

    if ([undefined, null].some((t) => t === v)) continue;

    if (["string", "number", "boolean"].some((t) => t === typeof v)) {
      urlParams.append(k, v + "");
    } else if (typeof v === "object" && !Array.isArray(v)) {
      urlParams.append(k, JSON.stringify(v));
    } else if (Array.isArray(v)) {
      if (!v.length) continue;

      let i = 0;

      while (i < v.length) {
        const curr = v[i];

        if (typeof curr === "string") {
          urlParams.append(k, curr);
        } else if (typeof curr === "object" && isStr(curr.val)) {
          urlParams.append(k, JSON.stringify(curr));
        }
        i++;
      }
    }
  }

  for (const [k, v] of urlParams.entries()) {
    __cg("📄", k, v);
  }

  return urlParams + "";
};
