import { CloudAsset, Course, EntityType, TypeAsset } from "@prisma/client";
import db from "@src/conf/db.js";
import { isArrOK, isObjOK } from "@shared/first/lib/dataStructure.js";
import { capt } from "@shared/first/lib/formatters.js";
import { __cg } from "@shared/first/lib/logger.js";
import { AppFile } from "@src/types/fastify.js";
import { clearAssets, clearLocalAssets } from "@src/lib/etc.js";
import { ServerSideFormCourse } from "../controllers/post.js";

export const postCourseService = async ({
  fields,
  images,
  video,
  videoFile,
}: {
  fields: ServerSideFormCourse;
  images: Partial<CloudAsset>[];
  video: Partial<CloudAsset> | null;
  videoFile?: AppFile;
}): Promise<Course> => {
  try {
    const course = await db.$transaction(async (trx) => {
      const course = await trx.course.create({
        data: {
          ...fields,
          title: capt(fields.title),
        } as Course,
      });

      if (isArrOK(images))
        await trx.cloudAsset.createMany({
          data: images.map(
            (img) =>
              ({
                ...img,
                entityType: EntityType.COURSE,
                entityID: course.id,
                type: TypeAsset.IMAGE,
              }) as CloudAsset,
          ),
        });

      if (isObjOK(video))
        await trx.cloudAsset.create({
          data: {
            ...video,
            entityType: EntityType.COURSE,
            entityID: course.id,
            type: TypeAsset.VIDEO,
          } as CloudAsset,
        });

      return course;
    });

    return course;
  } catch (err) {
    __cg("err transaction", err);

    await clearLocalAssets(videoFile);
    await clearAssets(images, video);

    throw err;
  }
};
