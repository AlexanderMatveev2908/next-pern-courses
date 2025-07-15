import { EntityType, Grade, Tech, Variant } from "@prisma/client";
import { DEL_ALL } from "../danger.js";
import { __cg } from "@shared/first/lib/logger.js";
import { genRandomByMinMax, pickRandomObjKey } from "./utils.js";
import { addCloudAssetsModel, readMarkdown } from "./assetsHandlers.js";
import db from "@src/conf/db.js";
import { GradePkg, TechPkg } from "@shared/first/constants/categories.js";
import { genIpsum } from "@shared/first/lib/etc.js";
import { getExistingMock } from "./data.js";

export const genMock = async () => {
  const start = performance.now();
  let seconds = 0;

  const interval = setInterval(() => {
    seconds++;
    console.log(`doing stuff 🛠️ => ${seconds}s`);
  }, 1000);

  await DEL_ALL();

  try {
    const objMock = await getExistingMock();
    const md = await readMarkdown("assets/markdown/eg.md");

    // ? k and v are the same so function could be simplified if u want
    for (const k in objMock) {
      const v: string = objMock[k];

      const newCourse = await db.course.create({
        data: {
          title: `Awesome course about ${v}`,
          description: genIpsum(10),
          markdown: md,
          grade: pickRandomObjKey(GradePkg) as Grade,
          stack: TechPkg[v as keyof typeof TechPkg].stack,
          tech: v as Tech,
          rootLanguage: TechPkg[v as keyof typeof TechPkg].rootLanguage,
        },
      });

      await addCloudAssetsModel({
        entityID: newCourse.id,
        nameFolder: v,
        entityType: EntityType.COURSE,
        maxImages: 3,
      });

      await Promise.all(
        Array.from({ length: 10 }).map(async (_, cptIdx) => {
          __cg(`working on cpt idx ${cptIdx}... 🛠️`);

          const estimatedTime = genRandomByMinMax(5, 30);
          const pointsGained = genRandomByMinMax(25, 200);
          const newCpt = await db.concept.create({
            data: {
              estimatedTime,
              pointsGained,
              order: cptIdx,
              title: `This is concept idx ${cptIdx} for course about ${v}`,
              description: genIpsum(10),
              markdown: md,
              courseID: newCourse.id,
              createdAt: new Date(Date.now() + cptIdx * 100),
            },
          });

          await addCloudAssetsModel({
            entityID: newCpt.id,
            entityType: EntityType.CONCEPT,
            nameFolder: v,
            maxImages: 1,
          });

          await await db.course.update({
            where: {
              id: newCourse.id,
            },
            data: {
              estimatedTime: {
                increment: estimatedTime,
              },
              pointsGained: {
                increment: pointsGained,
              },
            },
          });

          await Promise.all(
            Array.from({ length: 4 }).map(async (_, quizIdx) => {
              const newQuiz = await db.question.create({
                data: {
                  title: `question idx ${quizIdx} for concept idx ${cptIdx} for course about ${v}`,
                  question: genIpsum(2),
                  conceptID: newCpt.id,
                  createdAt: new Date(Date.now() + quizIdx * 100),
                },
              });

              await db.variant.createMany({
                data: Array.from({ length: 5 }).map((_, varIdx) => ({
                  answer: `Answer idx ${varIdx} for quiz idx ${quizIdx} for concept ${cptIdx} for course about ${v} (${!varIdx ? "correct" : "false"})`,
                  isCorrect: !varIdx,
                  questionID: newQuiz.id,
                  createdAt: new Date(Date.now() + varIdx * 100),
                })),
              });
            }),
          );
        }),
      );
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
