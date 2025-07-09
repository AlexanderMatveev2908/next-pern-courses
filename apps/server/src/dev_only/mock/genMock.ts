import { Grade, TechStack, Tools } from "@prisma/client";
import { DEL_ALL } from "../danger.js";
import { __cg } from "@shared/first/lib/logger.js";
import { getValidSubCat, pickRandomObjKey, repeatKey } from "./utils.js";
import { addAssetsToCourse, readMarkdown } from "./assetsHandlers.js";
import { existingMock } from "./data.js";
import db from "@src/conf/db.js";
import { GradePkg, ToolsPkg } from "@shared/first/constants/categories.js";
import { genIpsum } from "@shared/first/lib/etc.js";

export const genMock = async () => {
  const start = performance.now();
  let seconds = 0;

  const interval = setInterval(() => {
    seconds++;
    __cg(`doing stuff 🛠️ => ${seconds}`);
  }, 1000);

  await DEL_ALL();

  try {
    const md = await readMarkdown("assets/markdown/eg.md");

    for (const k in existingMock) {
      const v: string = existingMock[k];

      const newCourse = await db.course.create({
        data: {
          title: `Awesome course about ${v}`,
          description: genIpsum(10),
          grade: pickRandomObjKey(GradePkg) as Grade,
          techStack: v as TechStack,
          tools: getValidSubCat(ToolsPkg, v as keyof typeof ToolsPkg) as Tools,
          markdown: md,
        },
      });

      await addAssetsToCourse(newCourse.id, v);
    }
  } catch (err) {
    await DEL_ALL();

    clearInterval(interval);

    __cg("ops i forgot something", err);
  }

  clearInterval(interval);

  const end = performance.now();
  __cg(`done doing stuff 👻 => ${end - start}`);
};
