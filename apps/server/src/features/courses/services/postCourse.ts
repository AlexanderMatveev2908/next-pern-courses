import { CloudAsset, Course, EntityType, TypeAsset } from "@prisma/client";
import db from "@src/conf/db.js";
import { isArrOK, isObjOK } from "@shared/first/lib/dataStructure.js";
import { capt } from "@shared/first/lib/formatters.js";
import { AppFile } from "@src/types/fastify.js";
import { ServerSideFormCourse } from "../controllers/post.js";
import { boolObj } from "@shared/first/lib/etc.js";
import { wrapServiceCleanCloud } from "@src/lib/assetsHOF.js";

export const postCourseService = async ({
  fields,
  imagesUploaded,
  videoUploaded,
  videoFile,
}: {
  fields: ServerSideFormCourse;
  imagesUploaded: Partial<CloudAsset>[];
  videoUploaded: Partial<CloudAsset> | null;
  videoFile?: AppFile;
}): Promise<Course> =>
  await wrapServiceCleanCloud(
    { imagesUploaded, videoFile, videoUploaded },
    async () => {
      const course = await db.$transaction(async (trx) => {
        const course = await trx.course.create({
          data: {
            ...fields,
            title: capt(fields.title),
            rootLanguage: boolObj[
              fields.rootLanguage as unknown as keyof typeof boolObj
            ] as boolean,
          } as Course,
        });

        if (isArrOK(imagesUploaded))
          await trx.cloudAsset.createMany({
            data: imagesUploaded.map(
              (img) =>
                ({
                  ...img,
                  entityType: EntityType.COURSE,
                  entityID: course.id,
                  type: TypeAsset.IMAGE,
                }) as CloudAsset,
            ),
          });

        if (isObjOK(videoUploaded))
          await trx.cloudAsset.create({
            data: {
              ...videoUploaded,
              entityType: EntityType.COURSE,
              entityID: course.id,
              type: TypeAsset.VIDEO,
            } as CloudAsset,
          });

        return course;
      });

      return course;
    },
  );
