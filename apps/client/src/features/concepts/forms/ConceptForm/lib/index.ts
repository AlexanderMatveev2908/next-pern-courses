import { genIpsum } from "@/core/lib/etc";
import { grabQuestionShape } from "../uiFactory";

export const grabPlaceholderConcept = () => ({
  title: "concept for taught cookies",
  description: genIpsum(5),
  order: 0 + "",
  pointsGained: 100 + "",
  estimatedTime: 15 + "",
  quiz: Array.from({ length: 3 }).map((_, i) => {
    const item = grabQuestionShape();

    return {
      ...item,
      title: {
        ...item.title,
        val: `Title of question ${i}`,
      },
      question: {
        ...item.question,
        val: `Hard question num ${i}`,
      },
      variants: item.variants.map((v, idx) => ({
        ...v,
        answer: {
          ...v.answer,
          val: `Answer n ${idx} (outer is ${i})`,
        },
        isCorrect: {
          ...v.isCorrect,
          val: !idx,
        },
      })),
    };
  }),
});
