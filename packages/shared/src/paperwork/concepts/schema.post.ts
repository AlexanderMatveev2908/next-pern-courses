import z from "zod";
import {
  defaultItemObjSchema,
  schemaDescription,
  schemaGenericTxt,
  schemaImages,
  schemaInteger,
  schemaMarkdown,
  schemaTitle,
  schemaVideo,
} from "../shared/schema.js";

type OpErr = "gte" | "lte";

const objRanges = {
  pointsGained: {
    min: 25,
    max: 200,
  },
  estimatedTime: {
    min: 5,
    max: 30,
  },
  questions: {
    min: 3,
    max: 10,
  },
  variants: {
    min: 5,
    max: 5,
  },
};

const errMsgHandler = {
  autoComplete: {
    gte: "least",
    lte: "most",
  },
  externalKeyAccess: {
    gte: "min",
    lte: "max",
  },
};

const checkRange = (formV: string, objK: keyof typeof objRanges, op: OpErr) =>
  op === "lte" ? +formV <= objRanges[objK].max : +formV >= objRanges[objK].min;

export const buildMsg = (
  label: string,
  objK: keyof typeof objRanges,
  op: OpErr,
) =>
  `${label} field must be at ${errMsgHandler["autoComplete"][op]} ${objRanges[objK][errMsgHandler["externalKeyAccess"][op] as "min" | "max"]}`;

const schemaAnswer = z.object({
  id: z.string(),
  field: z.string(),
  answer: defaultItemObjSchema().extend({
    val: schemaGenericTxt(250, "Answer"),
  }),
  isCorrect: defaultItemObjSchema().extend({
    val: z.boolean(),
  }),
});

export const schemaQuizItem = z
  .object({
    id: z.string(),
    field: z.string(),
    title: defaultItemObjSchema().extend({
      val: schemaTitle("Question title"),
    }),

    question: defaultItemObjSchema().extend({
      val: schemaGenericTxt(500, "Question"),
    }),
    variants: z
      .array(schemaAnswer)
      .min(
        objRanges.variants.min,
        `You must include at least ${objRanges.variants.min} variants for each question`,
      )
      .max(
        objRanges.variants.max,
        `You can include at most ${objRanges.variants.max} variants for each question`,
      ),
  })
  .superRefine((data, ctx) => {
    const { variants } = data;

    let countOK = 0;
    const counterSize = new Set();
    let i = 0;

    while (i < variants.length) {
      const curr = variants[i];

      if (curr.isCorrect.val) countOK++;
      counterSize.add(curr.answer.val);

      i++;
    }

    if (!countOK)
      ctx.addIssue({
        code: "custom",
        path: ["variants"],
        message: "One of answers provided must be true",
      });

    if (countOK > 1)
      ctx.addIssue({
        code: "custom",
        path: ["variants"],
        message: "Only one on answers provided can be true",
      });

    if (counterSize.size < 5)
      ctx.addIssue({
        code: "custom",
        path: ["variants"],
        message: "Every answer must be different",
      });
  });

export const schemaPostConcept = z.object({
  title: schemaTitle("Concept"),
  description: schemaDescription("Concept"),

  images: schemaImages(),
  video: schemaVideo(),

  markdown: schemaMarkdown(),

  pointsGained: schemaInteger("Points Gained")
    .refine((v) => checkRange(v, "pointsGained", "gte"), {
      message: buildMsg("Points", "pointsGained", "gte"),
    })
    .refine((v) => checkRange(v, "pointsGained", "lte"), {
      message: buildMsg("Points", "pointsGained", "lte"),
    }),
  estimatedTime: schemaInteger("Estimated Time")
    .refine((v) => checkRange(v, "estimatedTime", "gte"), {
      message: buildMsg("Time estimated", "estimatedTime", "gte"),
    })
    .refine((v) => checkRange(v, "estimatedTime", "lte"), {
      message: buildMsg("Time estimated", "estimatedTime", "lte"),
    }),

  order: schemaInteger("Order"),

  quiz: z
    .array(schemaQuizItem)
    .min(
      objRanges.questions.min,
      `A concept must include at least ${objRanges.questions.min} questions`,
    )
    .max(
      objRanges.questions.max,
      `A concept can include at most ${objRanges.questions.max} questions`,
    ),
});

export type FormConceptType = z.infer<typeof schemaPostConcept>;
