import { __cg } from "@shared/first/lib/logger.js";
import { clearLocalAssets, grabVideo } from "@src/lib/etc.js";
import { FastifyReply, FastifyRequest, preHandlerHookHandler } from "fastify";
import { normalizeForm } from "@src/middleware/multipart/normalize.js";
import { AppFile } from "@src/types/fastify.js";
import { checkZod } from "@src/middleware/validators/zodCheck.js";
import { schemaConceptServer } from "../paperwork/postConept.js";
import { genFancyForm } from "@src/middleware/multipart/genFancyForm.js";

export const postConceptMdw: preHandlerHookHandler = async (
  req: FastifyRequest,
  res: FastifyReply,
) => {
  let videoFile: AppFile | null = grabVideo(req);
  try {
    // for (const k in fancyForm) {
    //   if (k === "quiz") {
    //     const arg = fancyForm[k];
    //     for (const el of arg) {
    //       for (const variant of el.variants) {
    //         __cg("el", variant);
    //       }
    //     }
    //   }
    // }

    const { normalized } = await normalizeForm(req);

    const { isOK, fancyErrsList, msg } = await checkZod(normalized, {
      schema: schemaConceptServer,
    });

    if (!isOK) return res.err422({ msg, fancyErrsList });

    genFancyForm(req, normalized);
  } catch (err: any) {
    __cg("err parse multipart", err?.message);

    await clearLocalAssets(videoFile);

    throw err;
  }
};
