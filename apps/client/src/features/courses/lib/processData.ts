export const genFormData = <T>(data: T) => {
  const formData = new FormData();

  for (const k in data) {
    const v = data[k as keyof T];

    if (!v) continue;

    if (Array.isArray(v)) {
      let i = 0;

      while (i < v.length) {
        const curr = v[i];

        if (curr instanceof File) formData.append(k, curr);
        else formData.append(`${k}[]`, curr);

        i++;
      }
    } else if (v instanceof File || typeof v === "string") {
      formData.append(k, v);
    }

    return formData;
  }
};
