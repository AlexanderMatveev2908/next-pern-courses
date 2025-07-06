import fs, { readFile, readFileSync } from "fs";
import path from "path";
import "dotenv/config";
import { fileURLToPath } from "url";

export const app_dir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../",
);

export const read_file_app = (p: string, type: "utf-8" | "hex") =>
  fs.readFileSync(path.join(app_dir, p), { encoding: type });

export const readCA = () => {
  const hex = process.env.DB_CA;
  return Buffer.from(hex!, "hex").toString("utf-8");
};

export const chain_path = (p: string) => path.resolve(app_dir, p);

export const getPathENV = () => {
  try {
    const p = chain_path(".env");

    readFileSync(p, "utf-8");

    return p;
  } catch (err) {
    console.log(err);

    return;
  }
};

export const readSQL = (p: string) =>
  read_file_app(path.join("sql", `${p}.sql`), "utf-8");
