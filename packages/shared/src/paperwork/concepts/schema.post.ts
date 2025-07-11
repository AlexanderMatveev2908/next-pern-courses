import z from "zod";
import {
  schemaDescription,
  schemaImages,
  schemaInteger,
  schemaMarkdown,
  schemaTitle,
  schemaVideo,
} from "../shared/schema.js";


const schemaQuestion = 

const RANGE_POINTS = {
  min: 25,
  max: 100,
};

const TIME_REQUIRED = {
  min: 5,
  max: 20,
};

export const schemaPostConcept = z.object({
  title: schemaTitle("Concept"),
  description: schemaDescription("Concept"),

  images: schemaImages(),
  video: schemaVideo(),

  markdown: schemaMarkdown(),

  pointsGained: schemaInteger("Points Gained")
    .refine((v) => +v > RANGE_POINTS.min, {
      message: `Points must be at least ${RANGE_POINTS.min}`,
    })
    .refine((v) => +v < RANGE_POINTS.max, {
      message: `Points must be at least ${RANGE_POINTS.max}`,
    }),
  estimatedTime: schemaInteger("Estimated Time")
    .refine((v) => +v < TIME_REQUIRED.min, {
      message: `Time required must be at least ${TIME_REQUIRED.min}`,
    })
    .refine((v) => +v < TIME_REQUIRED.max, {
      message: `Time required must be at most ${TIME_REQUIRED.max}`,
    }),

  order: schemaInteger("Order"),

});
