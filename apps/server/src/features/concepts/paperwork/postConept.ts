import { schemaPostConcept } from "@shared/first/paperwork/concepts/schema.post.js";
import { serverFilesValidation } from "@src/paperwork/files.js";
import z from "zod";

export const schemaConceptServer = schemaPostConcept
  .omit({
    images: true,
    video: true,
  })
  .extend(serverFilesValidation());

export type ServerConceptFormType = z.infer<typeof schemaConceptServer>;
