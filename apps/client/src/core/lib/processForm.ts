import { isObjOK } from "@shared/first/lib/dataStructure";

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

          formData.append(k, curr.val);
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
