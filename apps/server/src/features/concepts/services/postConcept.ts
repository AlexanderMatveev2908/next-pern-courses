import { CloudAsset, Concept, EntityType, TypeAsset } from "@prisma/client";
import db from "@src/conf/db.js";
import { AppFile } from "@src/types/fastify.js";
import { ServerConceptFormType } from "../paperwork/postConept.js";
import { __cg } from "@shared/first/lib/logger.js";
import { wrapServiceCleanCloud } from "@src/lib/assetsHOF.js";
import { isArrOK, isObjOK } from "@shared/first/lib/dataStructure.js";

export const postConceptSvc = async ({
  data,
  imagesUploaded,
  videoUploaded,
  videoFile,
  courseID,
}: {
  data: ServerConceptFormType;
  imagesUploaded: Partial<CloudAsset>[];
  videoUploaded?: CloudAsset | null;
  videoFile?: AppFile | null;
  courseID: string;
}): Promise<Concept> =>
  await wrapServiceCleanCloud(
    { imagesUploaded, videoUploaded, videoFile },
    async () => {
      const concept = await db.$transaction(async (trx) => {
        const course = await trx.course.findUniqueOrThrow({
          where: { id: courseID },
        });

        const newConcept = await trx.concept.create({
          data: {
            title: data.title,
            description: data.description,
            markdown: data.markdown,
            // ? i already parsed my vals in a middleware so i am sure if data come until here the structure is correct and i can just cast
            estimatedTime: data.estimatedTime as unknown as number,
            pointsGained: data.pointsGained as unknown as number,
            order: data.order as unknown as number,
            courseID: course.id,
          },
        });

        const updatedCourseStats = await trx.course.update({
          where: {
            id: course.id,
          },
          data: {
            estimatedTime: {
              increment: newConcept.estimatedTime,
            },
            pointsGained: newConcept.pointsGained,
          },
          select: {
            id: true,
            estimatedTime: true,
            pointsGained: true,
          },
        });

        __cg("stats", updatedCourseStats);

        await Promise.all(
          data.quiz.map(async (q) => {
            const newQuiz = await trx.question.create({
              data: {
                title: q.title.val,
                question: q.question.val,
                conceptID: newConcept.id,
              },
              select: {
                id: true,
              },
            });

            await trx.variant.createMany({
              data: q.variants.map((v) => ({
                answer: v.answer.val,
                isCorrect: v.isCorrect.val,
                questionID: newQuiz.id,
              })),
            });
          }),
        );

        if (isArrOK(imagesUploaded))
          await trx.cloudAsset.createMany({
            data: imagesUploaded.map((img) => ({
              entityType: EntityType.CONCEPT,
              entityID: newConcept.id,
              type: TypeAsset.IMAGE,

              url: img.url!,
              publicID: img.publicID!,
            })),
          });

        if (isObjOK(videoUploaded))
          await trx.cloudAsset.create({
            data: {
              entityID: newConcept.id,
              entityType: EntityType.CONCEPT,
              type: TypeAsset.VIDEO,

              url: videoUploaded!.url!,
              publicID: videoUploaded!.publicID!,
            },
          });

        const joined = await trx.concept.findUniqueOrThrow({
          where: {
            id: newConcept.id,
          },
          include: {
            questions: {
              include: {
                variants: true,
              },
            },
          },
        });

        return joined;
      });

      return concept;
    },
  );
