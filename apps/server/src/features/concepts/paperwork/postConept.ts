import { schemaPostConcept } from "@shared/first/paperwork/concepts/schema.post.js";
import { serverFilesValidation } from "@src/paperwork/files.js";
import z from "zod";

export const schemaConceptServer = schemaPostConcept
  .omit({
    images: true,
    video: true,
  })
  .extend({
    ...serverFilesValidation(),
    dummyField: z
      .string({
        required_error: "Your must send a dummy string",
      })
      .regex(/^dummy[\s_]field$/, "Invalid field ☢️")
      .optional(),
  });

export type ServerConceptFormType = z.infer<typeof schemaConceptServer>;
