import { CloudAsset, Course } from "@prisma/client";
import db from "src/conf/db.js";
import { CourseFormServerType } from "../paperwork/postCourse.js";
import { isArrOK } from "@shared/first/lib/dataStructure.js";
import { capt } from "@shared/first/lib/formatters.js";
import { __cg } from "@shared/first/lib/logger.js";
import { clearAssets } from "../lib/etc.js";

export const postCourseService = async ({
  fields,
  images,
  video,
}: {
  fields: Omit<
    CourseFormServerType,
    "images" | "video" | "imageFiles" | "videoFile"
  >;
  images: Partial<CloudAsset>[];
  video: Partial<CloudAsset> | null;
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
          tags: normalizedTags,
        },
      });

      return course;
    });

    return course;
  } catch (err) {
    __cg("err transaction", err);

    await clearAssets(images, video);

    throw err;
  }
};
