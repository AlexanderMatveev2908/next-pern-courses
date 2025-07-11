import { v4 } from "uuid";
import { CourseType } from "../../types/courses";
import { formatMinutes } from "@shared/first/lib/formatters.js";

export const genRowsInfo = (course: CourseType) =>
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
  ].map((el) => ({ ...el, id: v4() }));

export const genLinksCard = (...arg: string[]) =>
  arg.map((el) => ({
    href: el,
    id: v4(),
  }));
