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

const handleRangeMinMax = (vForm: string, vRange: number, sign: "<" | ">") =>
  sign === "<" ? +vForm <= vRange : +vForm >= vRange;

const objSign = {
  autoComplete: { "<": "least", ">": "most" },
  externalKey: {
    "<": "min",
    ">": "max",
  },
};

const extractMsgErrRange = (
  label: string,
  sign: "<" | ">",
  objRange: Record<string, any>,
) =>
  `${label} must be at ${objSign.autoComplete[sign]} ${objRange[objSign.externalKey[sign]]}`;

const RANGE_POINTS = {
  min: 25,
  max: 100,
};

const TIME_REQUIRED = {
  min: 5,
  max: 20,
};

const MIN_QUESTIONS = 3;
const MAX_QUESTIONS = 10;

const MIN_VARIANTS = 5;

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

const schemaQuizItem = z
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
        MIN_VARIANTS,
        `You must include at least ${MIN_VARIANTS} for each question`,
      ),
  })
  .superRefine((data, ctx) => {
    const { variants } = data;

    let countOK = 0;
    let i = 0;

    while (i < variants.length) {
      const curr = variants[i];

      if (curr.isCorrect) countOK++;

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
  });

export const schemaPostConcept = z.object({
  title: schemaTitle("Concept"),
  description: schemaDescription("Concept"),

  images: schemaImages(),
  video: schemaVideo(),

  markdown: schemaMarkdown(),

  pointsGained: schemaInteger("Points Gained")
    .refine((v) => handleRangeMinMax(v, RANGE_POINTS.min, ">"), {
      message: extractMsgErrRange("Points", "<", RANGE_POINTS),
    })
    .refine((v) => handleRangeMinMax(v, RANGE_POINTS.max, "<"), {
      message: extractMsgErrRange("Points", ">", RANGE_POINTS),
    }),
  estimatedTime: schemaInteger("Estimated Time")
    .refine((v) => handleRangeMinMax(v, TIME_REQUIRED.min, ">"), {
      message: extractMsgErrRange("Time estimated", "<", TIME_REQUIRED),
    })
    .refine((v) => handleRangeMinMax(v, TIME_REQUIRED.max, "<"), {
      message: extractMsgErrRange("Time estimated", ">", TIME_REQUIRED),
    }),

  order: schemaInteger("Order"),

  quiz: z
    .array(schemaQuizItem)
    .min(
      MIN_QUESTIONS,
      `A concepts must include at least ${MIN_QUESTIONS} question`,
    )
    .max(MAX_QUESTIONS, `A concept can include at most ${MAX_QUESTIONS}`),
});

export type FormConceptType = z.infer<typeof schemaPostConcept>;
