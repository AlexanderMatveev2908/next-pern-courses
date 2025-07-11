export const formatDate = (date: Date | string | number) => {
  const param =
    date instanceof Date
      ? date
      : /^\d{10,}n?$/.test(date + "")
        ? +date
        : new Date(date);

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",

    hour12: true,
  }).format(param);
};

export const capt = (str?: string) =>
  str ? str?.[0]?.toUpperCase() + str?.slice(1) : "";

export const captAll = (str?: string) =>
  !str
    ? ""
    : str
        .split(" ")
        .filter(Boolean)
        .map((el) => capt(el))
        .join(" ");

export const formatMinutes = (num: number) => {
  const hours = Math.floor(num / 60);
  const minutes = num % 60;

  const str: string[] = [];

  if (hours) str.push(`${hours}h`);

  if ((hours && minutes) || !hours) str.push(`${minutes}min`);

  return str.join(", ");
};
