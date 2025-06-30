export const envApp = {
  ENV: process.env.NEXT_PUBLIC_ENV,
  BACK_URL:
    process.env.NEXT_PUBLIC_ENV === "development"
      ? process.env.NEXT_PUBLIC_BACK_URL_DEV
      : process.env.NEXT_PUBLIC_BACK_URL,
};
