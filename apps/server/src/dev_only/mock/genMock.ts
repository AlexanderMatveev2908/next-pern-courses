import { Grade, Tech } from "@prisma/client";
import { DEL_ALL } from "../danger.js";
import { __cg } from "@shared/first/lib/logger.js";
import { pickRandomObjKey } from "./utils.js";
import { addAssetsToCourse, readMarkdown } from "./assetsHandlers.js";
import db from "@src/conf/db.js";
import { GradePkg, TechPkg } from "@shared/first/constants/categories.js";
import { genIpsum } from "@shared/first/lib/etc.js";
import { getExistingMock } from "./data.js";

export const genMock = async () => {
  const start = performance.now();
  let seconds = 0;

  const interval = setInterval(() => {
    seconds++;
    __cg(`doing stuff 🛠️ => ${seconds}`);
  }, 1000);

  await DEL_ALL();

  try {
    const objMock = await getExistingMock();
    const md = await readMarkdown("assets/markdown/eg.md");

    for (const k in objMock) {
      const v: string = objMock[k];

      const newCourse = await db.course.create({
        data: {
          title: `Awesome course about ${v}`,
          description: genIpsum(10),
          grade: pickRandomObjKey(GradePkg) as Grade,
          stack: TechPkg[v as keyof typeof TechPkg].stack,
          tech: v as Tech,
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
