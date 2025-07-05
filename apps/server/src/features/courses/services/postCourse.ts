import { CloudAsset, Course, EntityType, TypeAsset } from "@prisma/client";
import db from "@src/conf/db.js";
import { CourseFormServerType } from "../paperwork/postCourse.js";
import { isArrOK, isObjOK } from "@shared/first/lib/dataStructure.js";
import { capt } from "@shared/first/lib/formatters.js";
import { __cg } from "@shared/first/lib/logger.js";
import { clearAssets, clearLocalAssets } from "../lib/etc.js";
import { AppFile } from "@src/types/fastify.js";

export const postCourseService = async ({
  fields,
  images,
  video,
  videoFile,
}: {
  fields: Omit<
    CourseFormServerType,
    "images" | "video" | "imageFiles" | "videoFile"
  >;
  images: Partial<CloudAsset>[];
  video: Partial<CloudAsset> | null;
  videoFile?: AppFile;
}): Promise<Course> => {
  try {
    const course = await db.$transaction(async (trx) => {
      const fallBackTags: CourseFormServerType["tags"] = isArrOK(
        fields.tags,
        (val) => typeof val === "string",
      )
        ? fields.tags.map((tag: string) => JSON.parse(tag))
        : [];

      const normalizedTags: string[] = fallBackTags.map(
        (tag: CourseFormServerType["tags"][number]) => capt(tag.val),
      );

      const course = await trx.course.create({
        data: {
          ...(fields as Course),
          title: capt(fields.title),
          tags: normalizedTags,
        },
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
