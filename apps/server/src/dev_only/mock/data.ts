import { __cg } from "@shared/first/lib/logger.js";
import { chain_path } from "@src/lib/system/index.js";
import fs from "fs";

export const getExistingMock = async () => {
  const dir = chain_path("assets/images");

  const listTech = await fs.promises.readdir(dir, {
    encoding: "utf-8",
  });

  const obj: Record<string, string> = {};

  for (const t of listTech) {
    const stat = await fs.promises.stat(chain_path(`assets/images/${t}`));

    if (!stat.isDirectory())
      throw new Error(
        `${chain_path(`assets/images/${t}`)} is not a directory 😡`,
      );
    // await fs.promises.unlink(chain_path(`assets/images/${t}`));

    obj[t] = t;
  }

  return obj;
};
