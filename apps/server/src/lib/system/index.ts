import fs from "fs";
import path from "path";
import "dotenv/config";

export const app_dir = path.resolve(
  path.join(path.dirname(import.meta.url)),
  "../../../"
);

export const read_file = (p: string, type: "utf-8" | "hex") =>
  fs.readFileSync(path.join(app_dir, p), type);

export const readCA = () => {
  const hex = process.env.DB_CA;
  return Buffer.from(hex!, "hex").toString("utf-8");
};
