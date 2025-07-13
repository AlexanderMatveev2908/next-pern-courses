import { CloudAsset, Concept } from "@prisma/client";
import db from "@src/conf/db.js";
import { AppFile } from "@src/types/fastify.js";
import { ServerConceptFormType } from "../paperwork/postConept.js";
import { __cg } from "@shared/first/lib/logger.js";
import { wrapServiceCleanCloud } from "@src/lib/assetsHOF.js";

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
}) =>
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

        const quizzes = await trx.quiz.createMany({
          data: data.quiz.map((q) => ({
            title: q.title.val,
            question: q.question.val,
            conceptID: newConcept.id,
          })),
        });
      });

      return concept;
    },
  );
