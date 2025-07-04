import { FastifyReply, FastifyRequest } from "fastify";

export const checkPostCourse = async (
  req: FastifyRequest,
  res: FastifyReply,
) => {
  const { myFormData } = req;

  if (!myFormData) return res.res422({ msg: "missing form at all" });

  const { fields, files } = myFormData;

  const normalized = {
    fields: {
      ...fields,
      tags: Array.isArray(fields.tags)
        ? fields.tags.map((tag) => JSON.parse(tag)).filter(Boolean)
        : [],
    },
    images: files.filter((f) => f.mimetype.startsWith("image/")),
    video: files.find((f) => f.mimetype.startsWith("video/")),
  };

  normalized.fields.tags.map((el) => console.log(el));
};
