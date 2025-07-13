import { isStr } from "@shared/first/lib/dataStructure.js";
import { grabErrMsgZOD } from "@shared/first/lib/etc.js";
import fs from "fs";
import { __cg } from "@shared/first/lib/logger.js";
import { ZodSchema } from "zod";

export const checkZod = async <T extends ZodSchema>(
  data: any,
  { schema }: { schema: T },
) => {
  const result = schema.safeParse(data);

  if (result.success)
    return {
      isOK: true,
    };

  const { fancyErrsList, msg } = grabErrMsgZOD(result) ?? {};

  if (isStr(data.videoFile?.path))
    try {
      await fs.promises.unlink(data!.videoFile!.path!);

      __cg("success local delete");
    } catch (err) {
      __cg("fail local delete", err);
    }

  return {
    fancyErrsList,
    msg,
    isOK: false,
  };
};
