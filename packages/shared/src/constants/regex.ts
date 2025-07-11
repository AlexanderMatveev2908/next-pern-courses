export const REG_TITLE = /^[\p{L}\d\s\-'",:().!?#+]*$/u;
export const REG_DESCRIPTION = /^[^<>]*$/;
export const REG_ID =
  /^([a-f0-9]{8})-([a-f0-9]{4})-4[a-f0-9]{3}-([a-f0-9]{4})-([a-f0-9]{12})$/;
export const REG_CLOUD_URL = /^https:\/\/res.cloudinary.com\/.*$/;
export const REG_INTEGER = /^\d+$/;
export const REG_FLOAT = /(^\d+(\.\d{1,2})?$)|(^\.\d{1,2}$)/;
