import { v4 } from "uuid";
import { formatMinutes } from "@shared/first/lib/formatters.js";
import { CourseType } from "@/features/courses/types/courses";
import { ConceptType } from "@/features/concepts/types";

export const genRowsInfoCourse = (course: CourseType) =>
  [
    {
      label: "Difficulty",
      val: course.grade,
    },
    {
      label: "Stack",
      val: course.stack,
    },
    {
      label: "Tech",
      val: course.tech,
    },
    {
      label: "Time estimated",
      val: formatMinutes(course.estimatedTime),
    },
    {
      label: "Points gained",
      val: course.pointsGained,
    },
    {
      label: "Concepts available",
      val: course.conceptsStats!.conceptsCount,
    },
  ].map((el) => ({ ...el, id: v4() }));

export const genLinksCard = (...arg: string[]) =>
  arg.map((el) => ({
    href: el,
    id: v4(),
  }));

export const linkCourseActions = (courseID: string) => [
  {
    label: "Add Concept",
    href: `/concepts/post/${courseID}`,
  },
];

export const genRowsInfoConcept = (cpt: ConceptType) => [
  {
    label: "Time estimated",
    val: formatMinutes(cpt.estimatedTime),
  },
  {
    label: "Points gained",
    val: cpt.pointsGained,
  },
];
